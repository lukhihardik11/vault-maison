'use client'

import { type ReactNode } from 'react'
import { type ConceptConfig } from '@/data/concepts'
import { LuxuryNav } from './luxury-nav'
import { LuxuryFooter } from './luxury-footer'
import { CartDrawer } from './cart-drawer'
import { AuthModal } from './auth-modal'
import { ToastNotifications } from './toast-notifications'

interface ConceptLayoutProps {
  concept: ConceptConfig
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function ConceptLayout({ concept, children, hideNav = false, hideFooter = false }: ConceptLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: concept.palette.bg,
        color: concept.palette.text,
        fontFamily: concept.fonts.body,
      }}
    >
      {!hideNav && <LuxuryNav concept={concept} />}
      <CartDrawer concept={concept} />
      <AuthModal concept={concept} />
      <ToastNotifications concept={concept} />
      <main>{children}</main>
      {!hideFooter && <LuxuryFooter concept={concept} />}
    </div>
  )
}
