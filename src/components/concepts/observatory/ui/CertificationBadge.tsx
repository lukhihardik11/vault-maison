'use client'
import React from 'react'
import { OB } from '../ObservatoryLayout'
import { Shield, Award, CheckCircle } from 'lucide-react'

interface CertificationBadgeProps {
  type: 'gia' | 'ags' | 'observatory' | 'custom'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export function CertificationBadge({ type, label, size = 'md', style = {} }: CertificationBadgeProps) {
  const sizeMap = { sm: 32, md: 48, lg: 64 }
  const dim = sizeMap[size]
  const iconSize = dim * 0.4

  const configs = {
    gia: { label: 'GIA Certified', icon: <Shield size={iconSize} />, color: OB.accent },
    ags: { label: 'AGS Ideal', icon: <Award size={iconSize} />, color: OB.success },
    observatory: { label: 'Observatory Verified', icon: <CheckCircle size={iconSize} />, color: OB.accent },
    custom: { label: label || 'Certified', icon: <Shield size={iconSize} />, color: OB.warning },
  }

  const config = configs[type]

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
      <div style={{
        width: dim, height: dim, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${config.color}10`, border: `1px solid ${config.color}30`,
        color: config.color,
      }}>
        {config.icon}
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: size === 'sm' ? '0.55rem' : '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: config.color }}>
        {config.label}
      </span>
    </div>
  )
}
