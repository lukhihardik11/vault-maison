'use client'

import { AuthModal } from '@/components/shared/auth-modal'
import { ToastNotifications } from '@/components/shared/toast-notifications'
import { getConcept } from '@/data/concepts'
import { type ReactNode, useEffect, useState } from 'react'
import { MinimalNav } from './MinimalNav'
import { MinimalFooter } from './MinimalFooter'
import { MINIMAL } from './design-tokens'
import Toolbar from './ui/Toolbar'
import '@/styles/minimal.css'

interface MinimalLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function MinimalLayout({ children, hideNav = false, hideFooter = false }: MinimalLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        html, body {
          background: ${MINIMAL.colors.bg} !important;
          color: ${MINIMAL.colors.text} !important;
        }
      `}</style>
      {/* Scroll progress bar — monochrome black */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${scrollProgress}%`,
          backgroundColor: MINIMAL.colors.text,
          zIndex: 9999,
          transition: 'width 100ms linear',
        }}
      />
      <div
        className="mn-page mn-page-enter"
        style={{
          backgroundColor: MINIMAL.colors.bg,
          color: MINIMAL.colors.text,
          fontFamily: MINIMAL.font,
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.7,
          minHeight: '100vh',
        }}
      >
        {!hideNav && <MinimalNav />}
        <AuthModal concept={getConcept('minimal')!} />
        <ToastNotifications concept={getConcept('minimal')!} />
        <main>{children}</main>
        {!hideFooter && <MinimalFooter />}
        {!hideNav && <Toolbar />}
      </div>
    </>
  )
}
