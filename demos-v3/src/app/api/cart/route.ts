import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { validateUUID, validatePositiveInt } from '@/lib/security/validate'

/**
 * GET /api/cart — Fetch the authenticated user's cart items
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('carts')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Cart fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
    }

    return NextResponse.json({ items: data || [] })
  } catch (err) {
    console.error('Cart GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/cart — Add an item to the cart
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity = 1, size, metal } = body

    if (!productId || !validateUUID(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    if (!validatePositiveInt(quantity) || quantity > 10) {
      return NextResponse.json({ error: 'Invalid quantity (1-10)' }, { status: 400 })
    }

    // Verify product exists and is in stock
    const { data: product } = await supabase
      .from('products')
      .select('id, stock_quantity')
      .eq('id', productId)
      .eq('is_active', true)
      .single()

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (product.stock_quantity < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
    }

    // Upsert cart item (increment quantity if exists)
    const { data, error } = await supabase
      .from('carts')
      .upsert(
        {
          user_id: user.id,
          product_id: productId,
          quantity,
          size: size || null,
          metal: metal || null,
        },
        { onConflict: 'user_id,product_id,size,metal' }
      )
      .select()
      .single()

    if (error) {
      console.error('Cart add error:', error)
      return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
    }

    return NextResponse.json({ item: data }, { status: 201 })
  } catch (err) {
    console.error('Cart POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PUT /api/cart — Update a cart item's quantity
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { cartItemId, quantity } = body

    if (!cartItemId || !validateUUID(cartItemId)) {
      return NextResponse.json({ error: 'Invalid cart item ID' }, { status: 400 })
    }

    if (!validatePositiveInt(quantity) || quantity > 10) {
      return NextResponse.json({ error: 'Invalid quantity (1-10)' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('carts')
      .update({ quantity })
      .eq('id', cartItemId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Cart update error:', error)
      return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
    }

    return NextResponse.json({ item: data })
  } catch (err) {
    console.error('Cart PUT error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/cart — Remove a cart item
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const cartItemId = searchParams.get('id')

    if (!cartItemId || !validateUUID(cartItemId)) {
      return NextResponse.json({ error: 'Invalid cart item ID' }, { status: 400 })
    }

    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('id', cartItemId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Cart delete error:', error)
      return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Cart DELETE error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
