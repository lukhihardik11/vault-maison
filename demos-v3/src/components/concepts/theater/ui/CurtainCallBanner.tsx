'use client'
import React from 'react'
import { TH } from '../TheaterLayout'
import { TheaterButton } from './TheaterButton'

interface CurtainCallBannerProps {
  title: string; subtitle: string; ctaLabel: string; ctaHref: string
}

export function CurtainCallBanner({ title, subtitle, ctaLabel, ctaHref }: CurtainCallBannerProps) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${TH.accent}15, ${TH.bg}, ${TH.gold}10)`,
      border: `1px solid ${TH.borderGold}40`, padding: '48px 40px', textAlign: 'center',
    }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>{title}</h3>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, marginBottom: 24 }}>{subtitle}</p>
      <TheaterButton href={ctaHref}>{ctaLabel}</TheaterButton>
    </div>
  )
}
