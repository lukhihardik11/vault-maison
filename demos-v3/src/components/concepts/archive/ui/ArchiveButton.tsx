'use client'
import React from 'react'
import { AR } from '../ArchiveLayout'

interface ArchiveButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'document'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  style?: React.CSSProperties
  disabled?: boolean
}

export function ArchiveButton({ children, variant = 'primary', size = 'md', onClick, href, style = {}, disabled }: ArchiveButtonProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 20px', fontSize: '0.65rem' },
    md: { padding: '12px 32px', fontSize: '0.7rem' },
    lg: { padding: '16px 44px', fontSize: '0.75rem' },
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: AR.accent,
      color: '#1E1614',
      border: `1px solid ${AR.accent}`,
    },
    secondary: {
      background: 'transparent',
      color: AR.accent,
      border: `1px solid ${AR.accent}`,
    },
    document: {
      background: AR.docBg,
      color: AR.docText,
      border: `1px solid ${AR.docBorder}`,
    },
  }

  const baseStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    opacity: disabled ? 0.5 : 1,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (disabled) return
    const el = e.currentTarget as HTMLElement
    if (variant === 'primary') {
      el.style.background = AR.accentHover
      el.style.boxShadow = `0 4px 20px ${AR.accent}44`
    } else if (variant === 'secondary') {
      el.style.background = AR.accentSoft
      el.style.boxShadow = `0 4px 20px ${AR.accent}22`
    }
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    el.style.background = variantStyles[variant].background as string
    el.style.boxShadow = 'none'
  }

  if (href) {
    return (
      <a href={href} style={baseStyle} className="archive-btn-press"
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} style={baseStyle} className="archive-btn-press"
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </button>
  )
}
