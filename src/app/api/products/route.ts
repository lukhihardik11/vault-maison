import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category')
    const material = searchParams.get('material')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const isNew = searchParams.get('isNew')
    const isBestseller = searchParams.get('isBestseller')

    // Validate sort field to prevent injection
    const allowedSorts = ['created_at', 'base_price', 'name', 'category']
    const safeSort = allowedSorts.includes(sort) ? sort : 'created_at'
    const safeOrder = order === 'asc' ? 'asc' : 'desc'

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_active', true)

    if (category) query = query.eq('category', category)
    if (material) query = query.eq('material', material)
    if (minPrice) query = query.gte('base_price', parseFloat(minPrice))
    if (maxPrice) query = query.lte('base_price', parseFloat(maxPrice))
    if (isNew === 'true') query = query.eq('is_new', true)
    if (isBestseller === 'true') query = query.eq('is_bestseller', true)

    query = query
      .order(safeSort, { ascending: safeOrder === 'asc' })
      .range((page - 1) * limit, page * limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Products fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      products: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (err) {
    console.error('Products API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
