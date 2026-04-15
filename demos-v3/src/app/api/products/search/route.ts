import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { sanitize } from '@/lib/security/validate'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const rawQuery = searchParams.get('q') || ''
    const query = sanitize(rawQuery).toLowerCase()

    if (!query || query.length < 2) {
      return NextResponse.json({
        products: [],
        totalCount: 0,
        query: rawQuery,
        suggestions: [],
      })
    }

    // Search by name, description, category, and material
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,material.ilike.%${query}%`)
      .order('is_bestseller', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Search error:', error)
      return NextResponse.json(
        { error: 'Search failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      products: data || [],
      totalCount: data?.length || 0,
      query: rawQuery,
      suggestions: [],
    })
  } catch (err) {
    console.error('Search API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
