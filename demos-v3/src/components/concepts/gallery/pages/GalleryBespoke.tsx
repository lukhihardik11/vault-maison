'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'

const steps = [
  { num: '01', title: 'Consultation', desc: 'Begin with a private conversation about your vision, preferences, and the story you wish your piece to tell.' },
  { num: '02', title: 'Design', desc: 'Our artisans create detailed sketches and 3D renderings, refining every detail until the design resonates perfectly.' },
  { num: '03', title: 'Stone Selection', desc: 'Hand-select your diamond or gemstone from our curated collection of exceptional stones, each certified and ethically sourced.' },
  { num: '04', title: 'Crafting', desc: 'Master jewelers bring your design to life using a blend of traditional techniques and modern precision.' },
  { num: '05', title: 'Presentation', desc: 'Your finished piece is presented in our gallery, accompanied by full documentation and certification.' },
]

export function GalleryBespoke() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 650, margin: '0 auto' }}>
        <MuseumCaption align="center">Commission</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Bespoke Commissions
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7 }}>
          Create a one-of-a-kind masterpiece. Our bespoke service transforms your vision into an heirloom that transcends generations.
        </p>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 120px' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, padding: '36px 0', borderBottom: `1px solid ${G.border}` }}>
            <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.5rem', color: G.border }}>{step.num}</span>
            <div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.05rem', fontWeight: 400, color: G.text, margin: '0 0 8px' }}>{step.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <GalleryButton href="/gallery/contact">Begin Your Commission</GalleryButton>
        </div>
      </section>
    </GalleryLayout>
  )
}
