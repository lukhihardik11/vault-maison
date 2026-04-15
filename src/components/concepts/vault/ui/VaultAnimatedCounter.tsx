'use client'

import React from 'react'

interface VaultAnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
}

export function VaultAnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  label,
  decimals = 0,
}: VaultAnimatedCounterProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '2.8rem',
        fontWeight: 400,
        color: '#D4AF37',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}>
        {prefix}{end.toFixed(decimals)}{suffix}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.65rem',
        fontWeight: 400,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        marginTop: 8,
      }}>
        {label}
      </div>
    </div>
  )
}
