'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { Sparkles, Droplets, ShieldCheck, Clock } from 'lucide-react'

const tips = [
  { icon: Sparkles, title: 'Daily Care', desc: 'Remove jewelry before bathing, swimming, or exercising. Apply perfume and cosmetics before putting on your pieces.' },
  { icon: Droplets, title: 'Cleaning', desc: 'Gently clean with warm soapy water and a soft brush. Rinse thoroughly and pat dry with a lint-free cloth.' },
  { icon: ShieldCheck, title: 'Storage', desc: 'Store each piece separately in a soft pouch or lined jewelry box to prevent scratching. Keep away from direct sunlight.' },
  { icon: Clock, title: 'Professional Service', desc: 'We recommend professional cleaning and inspection every 12 months. This service is complimentary for all gallery acquisitions.' },
]

export function GalleryCare() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <MuseumCaption align="center">Preservation</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Jewelry Care
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7 }}>
          Proper care ensures your pieces maintain their brilliance for generations. Follow these guidelines to preserve their beauty.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 140px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 48 }}>
          {tips.map((tip, i) => (
            <div key={i} style={{ padding: 32, background: G.surface, border: `1px solid ${G.border}` }}>
              <div style={{ width: 44, height: 44, border: `1px solid ${G.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <tip.icon size={18} color={G.accent} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', fontWeight: 400, color: G.text, margin: '0 0 10px' }}>{tip.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary, lineHeight: 1.7, margin: 0 }}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </GalleryLayout>
  )
}
