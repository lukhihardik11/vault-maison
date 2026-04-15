import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { validateUUID, sanitize } from '@/lib/security/validate'

/**
 * GET /api/addresses — Fetch the authenticated user's addresses
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Addresses fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 })
    }

    return NextResponse.json({ addresses: data || [] })
  } catch (err) {
    console.error('Addresses GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/addresses — Add a new address
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { label, fullName, line1, line2, city, state, postalCode, country, phone, isDefault } = body

    // Validate required fields
    if (!fullName || !line1 || !city || !postalCode) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, line1, city, postalCode' },
        { status: 400 }
      )
    }

    // If setting as default, unset other defaults first
    if (isDefault) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        label: sanitize(label || 'Home'),
        full_name: sanitize(fullName),
        line1: sanitize(line1),
        line2: line2 ? sanitize(line2) : null,
        city: sanitize(city),
        state: state ? sanitize(state) : null,
        postal_code: sanitize(postalCode),
        country: sanitize(country || 'US'),
        phone: phone || null,
        is_default: isDefault || false,
      })
      .select()
      .single()

    if (error) {
      console.error('Address create error:', error)
      return NextResponse.json({ error: 'Failed to create address' }, { status: 500 })
    }

    return NextResponse.json({ address: data }, { status: 201 })
  } catch (err) {
    console.error('Addresses POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PUT /api/addresses — Update an existing address
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id || !validateUUID(id)) {
      return NextResponse.json({ error: 'Invalid address ID' }, { status: 400 })
    }

    // Sanitize string fields
    const sanitizedUpdates: Record<string, unknown> = {}
    const stringFields = ['label', 'full_name', 'line1', 'line2', 'city', 'state', 'postal_code', 'country', 'phone']
    for (const field of stringFields) {
      if (updates[field] !== undefined) {
        sanitizedUpdates[field] = typeof updates[field] === 'string' ? sanitize(updates[field]) : updates[field]
      }
    }
    if (updates.is_default !== undefined) {
      sanitizedUpdates.is_default = updates.is_default
    }

    // If setting as default, unset other defaults first
    if (sanitizedUpdates.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
    }

    const { data, error } = await supabase
      .from('addresses')
      .update(sanitizedUpdates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Address update error:', error)
      return NextResponse.json({ error: 'Failed to update address' }, { status: 500 })
    }

    return NextResponse.json({ address: data })
  } catch (err) {
    console.error('Addresses PUT error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/addresses — Delete an address
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id || !validateUUID(id)) {
      return NextResponse.json({ error: 'Invalid address ID' }, { status: 400 })
    }

    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Address delete error:', error)
      return NextResponse.json({ error: 'Failed to delete address' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Addresses DELETE error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
