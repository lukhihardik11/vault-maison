'use client'
import React, { useState, useEffect } from 'react'
import { OB } from '../ObservatoryLayout'

interface DataTickerProps {
  items: { label: string; value: string }[]
  speed?: number
  style?: React.CSSProperties
}

export function DataTicker({ items, speed = 3000, style = {} }: DataTickerProps) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIdx(i => (i + 1) % items.length), speed)
    return () => clearInterval(interval)
  }, [items.length, speed])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '8px 16px', background: OB.surface,
      border: `1px solid ${OB.border}`, ...style,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: OB.success, boxShadow: `0 0 8px ${OB.success}` }} />
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: OB.textSecondary }}>
        {items[idx].label}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: OB.accent, fontWeight: 500 }}>
        {items[idx].value}
      </div>
    </div>
  )
}
