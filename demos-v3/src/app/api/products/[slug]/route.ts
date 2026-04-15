import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { validateSlug } from '@/lib/security/validate'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!validateSlug(slug)) {
      return NextResponse.json(
        { error: 'Invalid product slug' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Fetch reviews for this product
    const { data: reviews } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', data.id)
      .order('created_at', { ascending: false })
      .limit(10)

    return NextResponse.json({
      product: data,
      reviews: reviews || [],
    })
  } catch (err) {
    console.error('Product detail API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
