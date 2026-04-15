'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MS } from '../MaisonLayout'

interface ElegantCardProps {
  image: string; title: string; subtitle: string; price?: number; href: string; badge?: string
}

export function ElegantCard({ image, title, subtitle, price, href, badge }: ElegantCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="maison-card-hover" style={{ background: MS.card, borderRadius: 4, overflow: 'hidden', border: `1px solid ${MS.borderLight}` }}>
        <div style={{ position: 'relative', height: 300 }}>
          <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
          {badge && (
            <div style={{ position: 'absolute', top: 12, left: 12, background: `${MS.accent}e8`, padding: '4px 10px', borderRadius: 2 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>{badge}</span>
            </div>
          )}
        </div>
        <div style={{ padding: 18 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: MS.text, margin: '0 0 4px' }}>{title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MS.textSecondary, margin: '0 0 10px' }}>{subtitle}</p>
          {price && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MS.accent }}>${price.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  )
}
