'use client'

import { CheckoutPage } from '@/components/shared/checkout-page'

export function MinimalCheckout() {
  return (
    <CheckoutPage
      conceptId="minimal"
      accentColor="#050505"
      bgColor="#FFFFFF"
      textColor="#050505"
      mutedColor="#E5E5E5"
      cardBg="#F5F5F5"
      fontHeading="'Helvetica Neue', sans-serif"
      fontBody="'Helvetica Neue', sans-serif"
    />
  )
}
