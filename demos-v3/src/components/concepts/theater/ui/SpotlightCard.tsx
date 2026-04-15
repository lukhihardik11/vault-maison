'use client'
import React from 'react'
import Image from 'next/image'
import { TH } from '../TheaterLayout'

interface SpotlightCardProps {
  image: string; title: string; description: string; badge?: string
}

export function SpotlightCard({ image, title, description, badge }: SpotlightCardProps) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: `radial-gradient(ellipse at center top, ${TH.glow} 0%, ${TH.card} 70%)`,
      border: `1px solid ${TH.borderGold}40`, padding: 0,
    }}>
      <div style={{ position: 'relative', height: 200 }}>
        <Image src={image} alt={title} fill style={{ objectFit: 'cover', opacity: 0.7 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${TH.accent}20 0%, transparent 70%)` }} />
        {badge && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: TH.gold, padding: '3px 10px' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TH.bg, fontWeight: 600 }}>{badge}</span>
          </div>
        )}
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, color: TH.text, margin: '0 0 8px' }}>{title}</h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.textSecondary, lineHeight: 1.6, margin: 0 }}>{description}</p>
      </div>
    </div>
  )
}
