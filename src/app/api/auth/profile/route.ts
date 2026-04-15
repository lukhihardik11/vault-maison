import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { sanitize, validateEmail, validatePhone } from '@/lib/security/validate'

/**
 * GET /api/auth/profile — Fetch the authenticated user's profile
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json({ profile: data })
  } catch (err) {
    console.error('Profile GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PUT /api/auth/profile — Update the authenticated user's profile
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { fullName, phone, preferredConcept, avatarUrl } = body

    // Validate inputs
    const updates: Record<string, unknown> = {}

    if (fullName !== undefined) {
      updates.full_name = sanitize(fullName)
    }

    if (phone !== undefined) {
      if (phone && !validatePhone(phone)) {
        return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
      }
      updates.phone = phone || null
    }

    if (preferredConcept !== undefined) {
      const validConcepts = ['minimal', 'vault', 'gallery', 'atelier', 'observatory', 'theater', 'salon', 'maison', 'marketplace', 'archive']
      if (!validConcepts.includes(preferredConcept)) {
        return NextResponse.json({ error: 'Invalid concept' }, { status: 400 })
      }
      updates.preferred_concept = preferredConcept
    }

    if (avatarUrl !== undefined) {
      updates.avatar_url = avatarUrl
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Profile update error:', error)
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    // Audit log
    await supabase.from('audit_log').insert({
      user_id: user.id,
      action: 'profile_updated',
      entity_type: 'profile',
      entity_id: user.id,
      metadata: { updatedFields: Object.keys(updates) },
    })

    return NextResponse.json({ profile: data })
  } catch (err) {
    console.error('Profile PUT error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
