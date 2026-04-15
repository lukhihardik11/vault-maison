'use client'
import React from 'react'
import { AR } from '../ArchiveLayout'
import { Shield, Check, Lock } from 'lucide-react'

interface AuthenticationStampProps {
  status: 'verified' | 'pending' | 'certified'
  certifier?: string
  date?: string
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export function AuthenticationStamp({ status, certifier, date, size = 'md', style = {} }: AuthenticationStampProps) {
  const sizes = {
    sm: { outer: 64, inner: 48, icon: 18, font: '0.45rem', labelFont: '0.4rem' },
    md: { outer: 96, inner: 72, icon: 24, font: '0.55rem', labelFont: '0.45rem' },
    lg: { outer: 128, inner: 96, icon: 32, font: '0.65rem', labelFont: '0.5rem' },
  }

  const s = sizes[size]

  const statusConfig = {
    verified: { color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.1)', icon: <Check size={s.icon} />, label: 'VERIFIED' },
    pending: { color: AR.accent, bg: AR.accentSoft, icon: <Shield size={s.icon} />, label: 'PENDING' },
    certified: { color: AR.accent, bg: AR.accentSoft, icon: <Lock size={s.icon} />, label: 'CERTIFIED' },
  }

  const config = statusConfig[status]

  return (
    <div style={{ textAlign: 'center', ...style }}>
      {/* Outer ring */}
      <div style={{
        width: s.outer, height: s.outer, borderRadius: '50%',
        border: `2px solid ${config.color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto',
        background: config.bg,
        boxShadow: `0 0 20px ${config.color}22`,
      }}>
        {/* Inner circle */}
        <div style={{
          width: s.inner, height: s.inner, borderRadius: '50%',
          border: `1px dashed ${config.color}66`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: config.color,
        }}>
          {config.icon}
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: s.font,
            letterSpacing: '0.15em', marginTop: 4, fontWeight: 600,
          }}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Certifier info */}
      {certifier && (
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: s.labelFont,
          letterSpacing: '0.1em', color: AR.textSecondary,
          marginTop: 8, textTransform: 'uppercase',
        }}>
          {certifier}
        </p>
      )}
      {date && (
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: s.labelFont,
          color: AR.textSecondary + 'aa', marginTop: 2,
        }}>
          {date}
        </p>
      )}
    </div>
  )
}
