'use client'

import React from 'react'
import Link from 'next/link'
import { G } from '../GalleryLayout'

interface GalleryButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export function GalleryButton({ children, href, onClick, variant = 'primary', className }: GalleryButtonProps) {
  const isPrimary = variant === 'primary'

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 36px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    borderRadius: 0,
    border: isPrimary ? 'none' : `1px solid ${G.border}`,
    background: isPrimary ? G.accent : 'transparent',
    color: isPrimary ? '#FFFFFF' : G.text,
    transition: 'all 0.3s ease',
  }

  const handleEnter = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    if (isPrimary) {
      el.style.background = G.accentHover
    } else {
      el.style.borderColor = G.accent
      el.style.color = G.accent
    }
  }

  const handleLeave = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    if (isPrimary) {
      el.style.background = G.accent
    } else {
      el.style.borderColor = G.border
      el.style.color = G.text
    }
  }

  if (href) {
    return (
      <Link href={href} style={style} className={className}
        onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {children}
      </Link>
    )
  }

  return (
    <button style={style} onClick={onClick} className={className}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </button>
  )
}
