'use client'
import React from 'react'
import Link from 'next/link'
import { TH } from '../TheaterLayout'

interface TheaterButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  style?: React.CSSProperties
  onClick?: () => void
}

export function TheaterButton({ children, href, variant = 'primary', size = 'md', fullWidth, style, onClick }: TheaterButtonProps) {
  const sizeMap = { sm: { px: 16, py: 8, fs: '0.65rem' }, md: { px: 24, py: 12, fs: '0.7rem' }, lg: { px: 32, py: 16, fs: '0.75rem' } }
  const s = sizeMap[size]

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center',
    fontFamily: "'Cormorant Garamond', serif", fontSize: s.fs, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    padding: `${s.py}px ${s.px}px`, border: 'none', cursor: 'pointer', textDecoration: 'none',
    width: fullWidth ? '100%' : undefined,
    ...(variant === 'primary' ? {
      background: `linear-gradient(135deg, ${TH.accent}, #8B0000)`, color: TH.text,
      boxShadow: `0 4px 20px ${TH.accent}30`,
    } : variant === 'secondary' ? {
      background: 'transparent', color: TH.gold, border: `1px solid ${TH.gold}60`,
    } : {
      background: 'transparent', color: TH.gold, border: 'none',
    }),
    ...style,
  }

  if (href) return <Link href={href} className="theater-btn-press" style={baseStyle}>{children}</Link>
  return <button className="theater-btn-press" style={baseStyle} onClick={onClick}>{children}</button>
}
