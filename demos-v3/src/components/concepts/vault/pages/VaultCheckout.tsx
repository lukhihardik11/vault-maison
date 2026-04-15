'use client'

import { CheckoutPage } from '@/components/shared/checkout-page'

export function VaultCheckout() {
  return (
    <CheckoutPage
      conceptId="vault"
      accentColor="#D4AF37"
      bgColor="#0A0A0A"
      textColor="#EAEAEA"
      mutedColor="#333333"
      cardBg="#141414"
      fontHeading="'Cinzel', serif"
      fontBody="'Inter', sans-serif"
    />
  )
}
