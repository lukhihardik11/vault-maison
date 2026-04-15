'use client'
import React from 'react'
import { MK } from '../MarketplaceLayout'
import { Gem, Shield, Award } from 'lucide-react'

interface RarityBadgeProps {
  level: 'rare' | 'exceptional' | 'museum' | 'unique'; style?: React.CSSProperties
}

export function RarityBadge({ level, style }: RarityBadgeProps) {
  const config = {
    rare: { label: 'Rare', icon: <Gem size={10} />, color: MK.accent },
    exceptional: { label: 'Exceptional', icon: <Award size={10} />, color: MK.amber },
    museum: { label: 'Museum Grade', icon: <Shield size={10} />, color: '#DA3633' },
    unique: { label: 'One of a Kind', icon: <Gem size={10} />, color: '#A371F7' },
  }
  const c = config[level]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: c.color, background: `${c.color}15`, border: `1px solid ${c.color}30`,
      padding: '3px 8px', borderRadius: 2, ...style,
    }}>
      {c.icon} {c.label}
    </span>
  )
}
