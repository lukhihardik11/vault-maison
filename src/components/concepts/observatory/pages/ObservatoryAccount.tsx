'use client'

import { AccountPage } from '@/components/shared/account-page'

export function ObservatoryAccount() {
  return (
    <AccountPage
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
