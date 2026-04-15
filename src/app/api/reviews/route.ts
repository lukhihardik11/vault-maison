import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { validateUUID, sanitize } from '@/lib/security/validate'

/**
 * GET /api/reviews — Fetch reviews for a product
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

    if (!productId || !validateUUID(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    const { data, error, count } = await supabase
      .from('reviews')
      .select('*, profile:profiles(full_name, avatar_url)', { count: 'exact' })
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (error) {
      console.error('Reviews fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }

    // Calculate average rating
    const { data: avgData } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)

    const avgRating = avgData && avgData.length > 0
      ? avgData.reduce((sum, r) => sum + r.rating, 0) / avgData.length
      : 0

    return NextResponse.json({
      reviews: data || [],
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: count || 0,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (err) {
    console.error('Reviews GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/reviews — Create a new review
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, rating, title, reviewBody } = body

    // Validate inputs
    if (!productId || !validateUUID(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Check if user already reviewed this product
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', user.id)
      .single()

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 409 }
      )
    }

    // Check if user has purchased this product (for verified_purchase flag)
    const { data: purchaseData } = await supabase
      .from('order_items')
      .select('id, order:orders!inner(user_id, status)')
      .eq('product_id', productId)

    const verifiedPurchase = purchaseData?.some(
      (item: Record<string, unknown>) => {
        const order = item.order as Record<string, unknown> | null
        return order && order.user_id === user.id && order.status !== 'cancelled'
      }
    ) || false

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: productId,
        user_id: user.id,
        rating,
        title: title ? sanitize(title) : null,
        body: reviewBody ? sanitize(reviewBody) : null,
        verified_purchase: verifiedPurchase,
      })
      .select()
      .single()

    if (error) {
      console.error('Review create error:', error)
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
    }

    return NextResponse.json({ review: data }, { status: 201 })
  } catch (err) {
    console.error('Reviews POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
