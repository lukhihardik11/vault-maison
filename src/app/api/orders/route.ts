import { NextRequest, NextResponse } from 'next/server'

// ── Demo mode guard ──────────────────────────────────────────────────
const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * GET /api/orders — Fetch the authenticated user's orders
 */
export async function GET(request: NextRequest) {
  try {
    // Demo mode: return empty orders when Supabase is not configured
    if (!isSupabaseConfigured) {
      return NextResponse.json({
        orders: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        demo: true,
      })
    }

    const { createServerSupabaseClient } = await import('@/lib/supabase/server')
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

    let query = supabase
      .from('orders')
      .select('*, order_items(*)', { count: 'exact' })
      .eq('user_id', user.id)

    if (status) {
      query = query.eq('status', status)
    }

    query = query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Orders fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    return NextResponse.json({
      orders: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (err) {
    console.error('Orders GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/orders — Create a new order (used by checkout)
 * Note: For production, use /api/checkout which creates the order AND the Stripe PaymentIntent.
 * This endpoint is for order creation without payment (e.g., admin use).
 */
export async function POST(request: NextRequest) {
  try {
    // Demo mode: return a mock order when Supabase is not configured
    if (!isSupabaseConfigured) {
      const body = await request.json()
      const orderNumber = `VM-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
      return NextResponse.json({
        order: {
          id: orderNumber,
          order_number: orderNumber,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          total: 0,
          demo: true,
        },
        orderNumber,
      }, { status: 201 })
    }

    const { createServerSupabaseClient } = await import('@/lib/supabase/server')
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress, shippingMethod, giftWrap, giftMessage, concept } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address required' }, { status: 400 })
    }

    // Server-side price validation — NEVER trust client-side prices
    let subtotal = 0
    const validatedItems = []

    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('id, name, base_price, images, stock_quantity')
        .eq('id', item.productId)
        .single()

      if (!product || product.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Product unavailable: ${item.productId}` },
          { status: 400 }
        )
      }

      subtotal += product.base_price * item.quantity
      validatedItems.push({
        ...item,
        unitPrice: product.base_price,
        productName: product.name,
        productImage: product.images?.[0] || null,
      })
    }

    const shippingCost = shippingMethod === 'express' ? 15 : shippingMethod === 'overnight' ? 30 : 0
    const tax = subtotal * 0.08 // Simplified — use tax API in production
    const total = subtotal + shippingCost + tax + (giftWrap ? 25 : 0)

    const orderNumber = `VM-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        status: 'pending',
        subtotal,
        shipping_cost: shippingCost,
        tax,
        total,
        shipping_address: shippingAddress,
        shipping_method: shippingMethod || 'standard',
        gift_wrap: giftWrap || false,
        gift_message: giftMessage || null,
        concept: concept || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Order create error:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Insert order items
    const orderItems = validatedItems.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_image: item.productImage,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      size: item.size || null,
      metal: item.metal || null,
      total_price: item.unitPrice * item.quantity,
    }))

    await supabase.from('order_items').insert(orderItems)

    // Audit log
    await supabase.from('audit_log').insert({
      user_id: user.id,
      action: 'order_created',
      entity_type: 'order',
      entity_id: order.id,
      metadata: { orderNumber, total, itemCount: items.length },
    })

    return NextResponse.json({
      order,
      orderNumber,
    }, { status: 201 })
  } catch (err) {
    console.error('Orders POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
