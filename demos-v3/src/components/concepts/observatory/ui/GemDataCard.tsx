'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { OB } from '../ObservatoryLayout'

interface GemDataCardProps {
  image: string
  title: string
  subtitle?: string
  metrics?: { label: string; value: string }[]
  href?: string
  badge?: string
  style?: React.CSSProperties
}

export function GemDataCard({ image, title, subtitle, metrics = [], href, badge, style = {} }: GemDataCardProps) {
  const content = (
    <div className="observatory-card-hover" style={{
      background: OB.card, border: `1px solid ${OB.border}`,
      overflow: 'hidden', cursor: href ? 'pointer' : 'default',
      transition: 'all 0.3s ease', ...style,
    }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <Image src={image} alt={title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(10,14,26,0.8))' }} />
        {badge && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: OB.accent, color: OB.bg,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 10px', fontWeight: 600,
          }}>
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, margin: '0 0 16px' }}>
            {subtitle}
          </p>
        )}

        {/* Metrics */}
        {metrics.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`, gap: 12, borderTop: `1px solid ${OB.border}`, paddingTop: 12 }}>
            {metrics.map((m, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.textSecondary }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: OB.accent, fontWeight: 500, marginTop: 2 }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (href) return <Link href={href} style={{ textDecoration: 'none' }}>{content}</Link>
  return content
}
