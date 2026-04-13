'use client'
import { type ReactNode } from 'react'
import { ScrollAwareHeader } from './ui/ScrollAwareHeader'
import { CinematicFooter } from './ui/CinematicFooter'
import { FloatingNavbar } from './ui/FloatingNavbar'

interface VaultLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function VaultLayout({ children, hideNav = false, hideFooter = false }: VaultLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A', color: '#EAEAEA', fontFamily: 'Inter, sans-serif' }}>
      {!hideNav && <ScrollAwareHeader />}
      <main>{children}</main>
      {!hideFooter && <CinematicFooter />}
      <FloatingNavbar />
    </div>
  )
}
