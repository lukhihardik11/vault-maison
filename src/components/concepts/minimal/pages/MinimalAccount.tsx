'use client'

import { AccountPage } from '@/components/shared/account-page'

export function MinimalAccount() {
  return (
    <AccountPage
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
