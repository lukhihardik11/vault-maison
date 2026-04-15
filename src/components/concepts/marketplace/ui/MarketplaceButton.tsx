'use client'
import React from 'react'
import Link from 'next/link'
import { MK } from '../MarketplaceLayout'

interface MarketplaceButtonProps {
  children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary' | 'ghost' | 'urgent'; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean; style?: React.CSSProperties; onClick?: () => void
}

export function MarketplaceButton({ children, href, variant = 'primary', size = 'md', fullWidth, style, onClick }: MarketplaceButtonProps) {
  const sizeMap = { sm: { px: 14, py: 7, fs: '0.65rem' }, md: { px: 20, py: 10, fs: '0.7rem' }, lg: { px: 28, py: 13, fs: '0.75rem' } }
  const s = sizeMap[size]
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center',
    fontFamily: "'DM Sans', sans-serif", fontSize: s.fs, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    padding: `${s.py}px ${s.px}px`, border: 'none', cursor: 'pointer', textDecoration: 'none', borderRadius: 3,
    width: fullWidth ? '100%' : undefined,
    ...(variant === 'primary' ? { background: MK.accent, color: MK.text } :
       variant === 'urgent' ? { background: MK.urgent, color: MK.text } :
       variant === 'secondary' ? { background: 'transparent', color: MK.accent, border: `1px solid ${MK.accent}60` } :
       { background: 'transparent', color: MK.accent, border: 'none' }),
    ...style,
  }
  if (href) return <Link href={href} className="marketplace-btn-hover" style={baseStyle}>{children}</Link>
  return <button className="marketplace-btn-hover" style={baseStyle} onClick={onClick}>{children}</button>
}
