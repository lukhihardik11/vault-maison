'use client'

import React from 'react'
import { S } from '../SalonLayout'

interface SalonButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  fullWidth?: boolean
  style?: React.CSSProperties
}

export function SalonButton({ children, variant = 'primary', size = 'md', onClick, href, fullWidth, style }: SalonButtonProps) {
  const sizes = {
    sm: { padding: '8px 20px', fontSize: '0.65rem' },
    md: { padding: '13px 32px', fontSize: '0.7rem' },
    lg: { padding: '16px 40px', fontSize: '0.75rem' },
  }

  const variants = {
    primary: {
      background: S.accent, color: '#FFFFFF', border: 'none',
      hoverBg: S.accentHover,
    },
    secondary: {
      background: 'transparent', color: S.text, border: `1.5px solid ${S.border}`,
      hoverBg: S.warmPanel,
    },
    ghost: {
      background: 'transparent', color: S.accent, border: 'none',
      hoverBg: S.accentSoft,
    },
  }

  const v = variants[variant]
  const s = sizes[size]

  const baseStyle: React.CSSProperties = {
    ...s,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: v.background,
    color: v.color,
    border: v.border,
    borderRadius: S.radius,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: fullWidth ? '100%' : undefined,
    ...style,
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    el.style.background = v.hoverBg
    el.style.transform = 'translateY(-1px)'
    el.style.boxShadow = `0 4px 16px ${S.shadow}`
  }
  const handleMouseLeave = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    el.style.background = v.background
    el.style.transform = 'translateY(0)'
    el.style.boxShadow = 'none'
  }

  if (href) {
    return (
      <a href={href} style={baseStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </a>
    )
  }

  return (
    <button style={baseStyle} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </button>
  )
}
