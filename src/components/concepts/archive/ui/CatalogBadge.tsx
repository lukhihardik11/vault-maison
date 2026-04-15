'use client'
import React from 'react'
import { AR } from '../ArchiveLayout'
import { Shield, Award, Star } from 'lucide-react'

interface CatalogBadgeProps {
  number: string
  level?: 'standard' | 'premium' | 'museum'
  style?: React.CSSProperties
}

export function CatalogBadge({ number, level = 'standard', style = {} }: CatalogBadgeProps) {
  const levelConfig = {
    standard: { icon: <Shield size={12} />, label: 'Cataloged', color: AR.accent },
    premium: { icon: <Award size={12} />, label: 'Premium', color: '#C19A49' },
    museum: { icon: <Star size={12} />, label: 'Museum Grade', color: '#D4AD5C' },
  }

  const config = levelConfig[level]

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: "'IBM Plex Mono', monospace",
      ...style,
    }}>
      <span style={{
        fontSize: '0.65rem', letterSpacing: '0.1em',
        color: config.color, background: `${config.color}15`,
        padding: '4px 12px', border: `1px solid ${config.color}33`,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        {config.icon}
        <span>CAT. {number}</span>
      </span>
      {level !== 'standard' && (
        <span style={{
          fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase',
          color: config.color, fontWeight: 600,
        }}>
          {config.label}
        </span>
      )}
    </div>
  )
}
