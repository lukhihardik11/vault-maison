'use client'
import React, { useState } from 'react'
import { AR } from '../ArchiveLayout'

export interface Period {
  id: string
  label: string
  years: string
  count?: number
}

interface PeriodSelectorProps {
  periods: Period[]
  selected?: string
  onSelect?: (id: string) => void
  style?: React.CSSProperties
}

export function PeriodSelector({ periods, selected, onSelect, style = {} }: PeriodSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, ...style }}>
      {periods.map((period) => {
        const isActive = selected === period.id
        const isHovered = hoveredId === period.id
        return (
          <button
            key={period.id}
            onClick={() => onSelect?.(period.id)}
            onMouseEnter={() => setHoveredId(period.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              padding: '10px 20px',
              background: isActive ? AR.accent : isHovered ? AR.accentSoft : 'transparent',
              border: `1px solid ${isActive ? AR.accent : AR.border}`,
              color: isActive ? '#1E1614' : AR.text,
              cursor: 'pointer',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}
          >
            <span style={{ fontWeight: 600 }}>{period.label}</span>
            <span style={{
              fontSize: '0.55rem', color: isActive ? '#1E1614aa' : AR.textSecondary,
              letterSpacing: '0.06em',
            }}>
              {period.years}
              {period.count !== undefined && ` · ${period.count} pieces`}
            </span>
          </button>
        )
      })}
    </div>
  )
}
