import { getStripeOrThrow } from '@/lib/stripe/server'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'

/**
 * Stripe Webhook Handler
 * 
 * Uses the Supabase service role key (not the anon key) because
 * webhooks have no user context — they come from Stripe's servers.
 * 
 * IMPORTANT: This route must NOT use the standard createServerSupabaseClient
 * because there is no authenticated user in a webhook request.
 */

// Use service role for webhook (no user context, bypasses RLS)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase admin not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }
  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    let event: Stripe.Event
    try {
      const stripeClient = getStripeOrThrow()
      event = stripeClient.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Stripe webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent

        // Update order status to confirmed
        const { error } = await getSupabaseAdmin()
          .from('orders')
          .update({
            status: 'confirmed',
            stripe_charge_id: pi.latest_charge as string,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', pi.id)

        if (error) {
          console.error('Failed to update order on payment success:', error)
        }

        // Audit log
        await getSupabaseAdmin().from('audit_log').insert({
          user_id: pi.metadata.userId || null,
          action: 'payment_succeeded',
          entity_type: 'payment_intent',
          entity_id: pi.id,
          metadata: { amount: pi.amount, currency: pi.currency },
        })

        // TODO: Send confirmation email via SendGrid/Resend
        // TODO: Deduct stock quantities
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent

        await getSupabaseAdmin()
          .from('orders')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', pi.id)

        // Audit log
        await getSupabaseAdmin().from('audit_log').insert({
          user_id: pi.metadata.userId || null,
          action: 'payment_failed',
          entity_type: 'payment_intent',
          entity_id: pi.id,
          metadata: {
            amount: pi.amount,
            failureMessage: pi.last_payment_error?.message,
          },
        })
        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute

        // Fraud alert — log and notify
        await getSupabaseAdmin().from('audit_log').insert({
          action: 'dispute_created',
          entity_type: 'charge',
          entity_id: dispute.id,
          metadata: {
            amount: dispute.amount,
            reason: dispute.reason,
            chargeId: dispute.charge,
          },
        })

        // TODO: Send urgent notification to admin
        console.error('⚠️ DISPUTE CREATED:', dispute.id, dispute.reason)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        // Update order status
        await getSupabaseAdmin()
          .from('orders')
          .update({
            status: 'refunded',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_charge_id', charge.id)

        // Audit log
        await getSupabaseAdmin().from('audit_log').insert({
          action: 'charge_refunded',
          entity_type: 'charge',
          entity_id: charge.id,
          metadata: { amount: charge.amount_refunded },
        })
        break
      }

      default:
        // Unhandled event type — log but don't error
        console.log(`Unhandled Stripe event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
