'use client'
import React from 'react'
import { OB } from '../ObservatoryLayout'

interface SpectrumChartProps {
  data: { label: string; value: number; max?: number }[]
  title?: string
  style?: React.CSSProperties
}

export function SpectrumChart({ data, title, style = {} }: SpectrumChartProps) {
  const maxVal = Math.max(...data.map(d => d.max || d.value))

  return (
    <div style={{ background: OB.surface, border: `1px solid ${OB.border}`, padding: 24, ...style }}>
      {title && (
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OB.accent, marginBottom: 20 }}>
          {title}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary }}>{item.label}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', color: OB.text, fontWeight: 500 }}>{item.value}%</span>
            </div>
            <div style={{ height: 4, background: OB.card, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${(item.value / maxVal) * 100}%`,
                background: `linear-gradient(90deg, ${OB.accent}, ${OB.accentDim})`,
                transition: 'width 1s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
