'use client'
import React from 'react'
import { TH } from '../TheaterLayout'

interface ActCounterProps {
  items: { value: string; label: string }[]
}

export function ActCounter({ items }: ActCounterProps) {
  return (
    <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
      {items.map((item, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 300, color: TH.gold, lineHeight: 1 }}>
            {item.value}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: TH.textSecondary, marginTop: 8 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}
