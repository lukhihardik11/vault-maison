'use client'
import { type ReactNode } from 'react'
import { VaultNav } from './VaultNav'
import { VaultFooter } from './VaultFooter'

interface VaultLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function VaultLayout({ children, hideNav = false, hideFooter = false }: VaultLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A', color: '#EAEAEA', fontFamily: 'Inter, sans-serif' }}>
      {!hideNav && <VaultNav />}
      <main>{children}</main>
      {!hideFooter && <VaultFooter />}
    </div>
  )
}
