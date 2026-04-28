import { getStripeOrThrow } from '@/lib/stripe/server'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/security/rate-limit'

/**
 * POST /api/checkout — Create a Stripe PaymentIntent and a pending order.
 * 
 * This is the primary checkout endpoint. It:
 * 1. Validates all items exist and are in stock (server-side)
 * 2. Calculates the total server-side (NEVER trusts client prices)
 * 3. Creates a Stripe PaymentIntent
 * 4. Creates a pending order in the database
 * 5. Returns the clientSecret for Stripe Elements to complete payment
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limit checkout attempts (stricter: 10 per minute per IP)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip, 10, 60_000)) {
      return NextResponse.json(
        { error: 'Too many checkout attempts. Please try again later.' },
        { status: 429 }
      )
    }

    // Demo mode guard — graceful fallback when Supabase is not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Checkout unavailable in demo mode — Supabase not configured' },
        { status: 503 }
      )
    }

    const { createServerSupabaseClient } = await import('@/lib/supabase/server')
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress, shippingMethod, giftWrap, giftMessage, concept } = body

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    if (!shippingAddress || !shippingAddress.line1 || !shippingAddress.city) {
      return NextResponse.json({ error: 'Valid shipping address required' }, { status: 400 })
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

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        )
      }

      if (product.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for: ${product.name}` },
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
    const tax = subtotal * 0.08 // Simplified — use TaxJar or similar in production
    const giftWrapCost = giftWrap ? 25 : 0
    const total = subtotal + shippingCost + tax + giftWrapCost

    // Create Stripe PaymentIntent
    const stripeClient = getStripeOrThrow()
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe uses cents
      currency: 'usd',
      metadata: {
        userId: user.id,
        itemCount: items.length.toString(),
      },
      // Enable 3D Secure for high-value orders (per SECURITY-ARCHITECTURE.md)
      payment_method_options: {
        card: {
          request_three_d_secure: total > 500 ? 'any' : 'automatic',
        },
      },
    })

    // Create order in database (status: pending)
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
        stripe_payment_intent_id: paymentIntent.id,
        concept: concept || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Checkout order create error:', error)
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
      action: 'checkout_initiated',
      entity_type: 'order',
      entity_id: order.id,
      metadata: { orderNumber, total, itemCount: items.length },
      ip_address: ip,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
      orderNumber,
      total,
    })
  } catch (err) {
    console.error('Checkout API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
