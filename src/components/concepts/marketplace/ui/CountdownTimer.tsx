'use client'
import React from 'react'
import { MK } from '../MarketplaceLayout'

interface CountdownTimerProps {
  days: number; hours: number; minutes: number; seconds: number; label?: string
}

export function CountdownTimer({ days, hours, minutes, seconds, label }: CountdownTimerProps) {
  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Min' },
    { value: seconds, label: 'Sec' },
  ]
  return (
    <div style={{ textAlign: 'center' }}>
      {label && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: MK.textSecondary, marginBottom: 12 }}>{label}</div>}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {units.map((u, i) => (
          <div key={i} style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: '10px 14px', minWidth: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: MK.accent }}>{String(u.value).padStart(2, '0')}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.45rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MK.textSecondary }}>{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
