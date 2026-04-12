'use client'

import { type ReactNode } from 'react'
import { MinimalNav } from './MinimalNav'
import { MinimalFooter } from './MinimalFooter'

interface MinimalLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function MinimalLayout({ children, hideNav = false, hideFooter = false }: MinimalLayoutProps) {
  return (
    <>
      {/* Override the global dark background for Minimal Machine */}
      <style>{`
        html, body {
          background: #FFFFFF !important;
          color: #050505 !important;
        }
      `}</style>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          color: '#050505',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.7,
          minHeight: '100vh',
        }}
      >
        {!hideNav && <MinimalNav />}
        <main>{children}</main>
        {!hideFooter && <MinimalFooter />}
      </div>
    </>
  )
}
