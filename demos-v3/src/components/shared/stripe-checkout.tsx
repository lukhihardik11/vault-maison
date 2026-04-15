'use client'

import { useState } from 'react'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe/client'
import { useCartStore } from '@/store/cart'

function CheckoutForm({
  clientSecret,
  orderNumber,
  concept,
}: {
  clientSecret: string
  orderNumber: string
  concept: string
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const clearCart = useCartStore((s) => s.clearCart)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || 'Validation failed')
      setIsProcessing(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/${concept}/checkout/confirmation?order=${orderNumber}`,
      },
    })

    if (confirmError) {
      setError(confirmError.message || 'Payment failed')
      setIsProcessing(false)
    } else {
      clearCart()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
          defaultValues: { billingDetails: { address: { country: 'US' } } },
        }}
      />
      {error && (
        <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full py-4 rounded-lg font-medium transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          text-white tracking-wider text-sm uppercase"
        style={{ backgroundColor: 'var(--concept-accent, #C4A265)' }}
      >
        {isProcessing ? 'Processing...' : 'Complete Order'}
      </button>
    </form>
  )
}

export function StripeCheckout({
  clientSecret,
  orderNumber,
  concept,
}: {
  clientSecret: string
  orderNumber: string
  concept: string
}) {
  const stripePromise = getStripe()
  if (!stripePromise) {
    return (
      <div className="p-6 text-center opacity-60">
        <p className="text-sm">Stripe is not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local</p>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: 'var(--concept-accent, #C4A265)',
            borderRadius: '8px',
            fontFamily: 'Inter, system-ui, sans-serif',
          },
        },
      }}
    >
      <CheckoutForm
        clientSecret={clientSecret}
        orderNumber={orderNumber}
        concept={concept}
      />
    </Elements>
  )
}
