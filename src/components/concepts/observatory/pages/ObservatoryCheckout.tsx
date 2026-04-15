'use client'

import { CheckoutPage } from '@/components/shared/checkout-page'

export function ObservatoryCheckout() {
  return (
    <CheckoutPage
      conceptId="observatory"
      accentColor="#00E5FF"
      bgColor="#0D1B2A"
      textColor="#FFFFFF"
      mutedColor="#1B3A5C"
      cardBg="#112240"
      fontHeading="'IBM Plex Mono', monospace"
      fontBody="'Inter', sans-serif"
    />
  )
}
