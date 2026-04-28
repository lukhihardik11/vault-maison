import { NextRequest, NextResponse } from 'next/server'
import { validateUUID } from '@/lib/security/validate'

// ── Demo mode guard ──────────────────────────────────────────────────
const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Accept both UUID format (from Supabase) and MIN-xxx format (from demo checkout)
function isValidOrderId(id: string): boolean {
  if (validateUUID(id)) return true
  // Demo order IDs: MIN- followed by alphanumeric characters
  return /^MIN-[A-Z0-9]{6,12}$/i.test(id)
}

/**
 * GET /api/orders/[id] — Fetch a single order by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!isValidOrderId(id)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 })
    }

    // Demo mode: return a mock order when Supabase is not configured
    if (!isSupabaseConfigured) {
      return NextResponse.json({
        order: {
          id,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          total: 0,
          order_items: [],
          demo: true,
        },
      })
    }

    const { createServerSupabaseClient } = await import('@/lib/supabase/server')
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ order: data })
  } catch (err) {
    console.error('Order detail API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
