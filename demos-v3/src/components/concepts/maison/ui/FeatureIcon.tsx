'use client'
import React from 'react'
import { MS } from '../MaisonLayout'

interface FeatureIconProps {
  icon: React.ReactNode; title: string; description: string
}

export function FeatureIcon({ icon, title, description }: FeatureIconProps) {
  return (
    <div style={{ textAlign: 'center', padding: 16 }}>
      <div style={{
        width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${MS.accent}10`, border: `1px solid ${MS.accent}20`, margin: '0 auto 14px', color: MS.accent,
      }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: MS.text, margin: '0 0 6px' }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MS.textSecondary, lineHeight: 1.6, margin: 0 }}>{description}</p>
    </div>
  )
}
