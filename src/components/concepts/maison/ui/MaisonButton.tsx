'use client'
import React from 'react'
import Link from 'next/link'
import { MS } from '../MaisonLayout'

interface MaisonButtonProps {
  children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean; style?: React.CSSProperties; onClick?: () => void
}

export function MaisonButton({ children, href, variant = 'primary', size = 'md', fullWidth, style, onClick }: MaisonButtonProps) {
  const sizes = { sm: { px: 16, py: 8, fs: '0.6rem' }, md: { px: 24, py: 11, fs: '0.65rem' }, lg: { px: 32, py: 14, fs: '0.7rem' } }
  const s = sizes[size]
  const variants = {
    primary: { background: MS.accent, color: '#fff', border: 'none' },
    secondary: { background: 'transparent', color: MS.accent, border: `1px solid ${MS.accent}` },
    ghost: { background: 'transparent', color: MS.accent, border: 'none' },
  }
  const v = variants[variant]
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: `${s.py}px ${s.px}px`,
    fontFamily: "'DM Sans', sans-serif", fontSize: s.fs, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
    borderRadius: 3, cursor: 'pointer', width: fullWidth ? '100%' : 'auto', justifyContent: fullWidth ? 'center' : 'flex-start',
    ...v, ...style,
  }
  if (href) return <Link href={href} className="maison-btn-hover" style={base}>{children}</Link>
  return <button className="maison-btn-hover" style={base} onClick={onClick}>{children}</button>
}
