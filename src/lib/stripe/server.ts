import Stripe from 'stripe'

/**
 * Stripe server-side client.
 * 
 * When STRIPE_SECRET_KEY is not set (e.g., demo/development mode),
 * we create a dummy instance. API routes that use Stripe will check
 * for the key and return appropriate errors.
 */

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY

export const stripe = STRIPE_KEY
  ? new Stripe(STRIPE_KEY, { typescript: true })
  : null

export function getStripeOrThrow(): Stripe {
  if (!stripe) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local')
  }
  return stripe
}
