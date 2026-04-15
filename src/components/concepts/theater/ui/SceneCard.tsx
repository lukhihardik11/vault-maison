'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TH } from '../TheaterLayout'

interface SceneCardProps {
  image: string; title: string; subtitle: string; price?: number; href: string; act?: string
}

export function SceneCard({ image, title, subtitle, price, href, act }: SceneCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="theater-card-hover" style={{ background: TH.card, border: `1px solid ${TH.border}`, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'relative', height: 280 }}>
          <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(12,10,13,0.9))' }} />
          {act && (
            <div style={{ position: 'absolute', top: 12, left: 12, background: `${TH.accent}e0`, padding: '4px 10px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: TH.text }}>{act}</span>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: TH.text, margin: '0 0 4px' }}>{title}</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.textSecondary, margin: 0 }}>{subtitle}</p>
          </div>
        </div>
        {price && (
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${TH.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: TH.gold }}>${price.toLocaleString()}</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TH.accent }}>ENTER SCENE →</span>
          </div>
        )}
      </div>
    </Link>
  )
}
