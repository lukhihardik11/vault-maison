'use client'

import { useState, useEffect } from 'react'

interface BackToTopProps {
  accentColor?: string
  bgColor?: string
}

export function BackToTop({ accentColor = '#D4AF37', bgColor = '#1A1A1A' }: BackToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-[9998] w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${accentColor}40`,
        color: accentColor,
      }}
      aria-label="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 16V4M10 4L4 10M10 4L16 10" />
      </svg>
    </button>
  )
}
