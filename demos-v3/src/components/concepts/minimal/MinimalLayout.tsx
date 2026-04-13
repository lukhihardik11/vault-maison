'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { MinimalNav } from './MinimalNav'
import { MinimalFooter } from './MinimalFooter'

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
          background: #FAFAF8 !important;
          color: #1A1A1A !important;
        }
      `}</style>
      {/* Scroll progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${scrollProgress}%`,
          backgroundColor: '#C4A265',
          zIndex: 9999,
          transition: 'width 100ms linear',
        }}
      />
      <div
        style={{
          backgroundColor: '#FAFAF8',
          color: '#1A1A1A',
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
