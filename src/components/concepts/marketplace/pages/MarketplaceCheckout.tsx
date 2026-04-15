'use client'

import { CheckoutPage } from '@/components/shared/checkout-page'

export function MarketplaceCheckout() {
  return (
    <CheckoutPage
      conceptId="marketplace"
      accentColor="#FF3B30"
      bgColor="#1A1A1A"
      textColor="#F2F2F2"
      mutedColor="#333333"
      cardBg="#242424"
      fontHeading="'Space Grotesk', sans-serif"
      fontBody="'Space Grotesk', sans-serif"
    />
  )
}
