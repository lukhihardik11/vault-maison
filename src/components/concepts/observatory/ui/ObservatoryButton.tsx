'use client'
import React from 'react'
import Link from 'next/link'
import { OB } from '../ObservatoryLayout'

interface ObservatoryButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  style?: React.CSSProperties
}

export function ObservatoryButton({ children, href, onClick, variant = 'primary', size = 'md', fullWidth = false, style = {} }: ObservatoryButtonProps) {
  const sizeMap = { sm: { px: 16, py: 8, fs: '0.6rem' }, md: { px: 24, py: 12, fs: '0.65rem' }, lg: { px: 32, py: 16, fs: '0.7rem' } }
  const s = sizeMap[size]

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: "'IBM Plex Mono', monospace", fontSize: s.fs, fontWeight: 500,
    letterSpacing: '0.15em', textTransform: 'uppercase' as const, textDecoration: 'none',
    padding: `${s.py}px ${s.px}px`, cursor: 'pointer', transition: 'all 0.3s ease',
    width: fullWidth ? '100%' : 'auto',
    ...(variant === 'primary' ? {
      background: OB.accent, color: OB.bg, border: 'none',
      boxShadow: `0 0 20px ${OB.glow}`,
    } : variant === 'secondary' ? {
      background: 'transparent', color: OB.accent, border: `1px solid ${OB.accent}`,
    } : {
      background: 'transparent', color: OB.textSecondary, border: `1px solid ${OB.border}`,
    }),
    ...style,
  }

  if (href) {
    return <Link href={href} className="observatory-btn-press" style={baseStyle}>{children}</Link>
  }
  return <button onClick={onClick} className="observatory-btn-press" style={baseStyle}>{children}</button>
}
