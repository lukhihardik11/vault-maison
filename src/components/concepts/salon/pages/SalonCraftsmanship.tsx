'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonButton } from '../ui/SalonButton'

const steps = [
  { num: '01', title: 'Sourcing', desc: 'We personally select each gemstone, traveling to ethical mines and trusted suppliers to find stones with exceptional character.' },
  { num: '02', title: 'Design', desc: 'Our designers sketch each piece by hand before creating detailed 3D models, ensuring every angle is considered.' },
  { num: '03', title: 'Setting', desc: 'Master setters place each stone with precision, using techniques passed down through generations of artisans.' },
  { num: '04', title: 'Finishing', desc: 'Hours of hand-polishing bring each piece to its final, luminous state. No shortcuts, no compromises.' },
  { num: '05', title: 'Quality Check', desc: 'Every piece undergoes rigorous inspection by our head gemologist before it earns The Salon name.' },
  { num: '06', title: 'Presentation', desc: 'Carefully placed in our signature packaging, each piece is prepared for its moment of unveiling.' },
]

export function SalonCraftsmanship() {
  return (
    <SalonLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Our Process</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>The Art of Craftsmanship</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          Every piece that leaves our atelier carries the dedication of hands that have spent decades perfecting their art.
        </p>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 100px' }}>
        {steps.map((step, i) => (
          <div key={step.num} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, marginBottom: i < steps.length - 1 ? 40 : 0, position: 'relative' }}>
            {i < steps.length - 1 && (
              <div style={{ position: 'absolute', left: 30, top: 48, bottom: -20, width: 1, background: `linear-gradient(to bottom, ${S.accent}40, ${S.border})` }} />
            )}
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: S.accent, fontWeight: 400, position: 'relative', zIndex: 1 }}>
              {step.num}
            </div>
            <div style={{ paddingTop: 8 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: S.text, margin: '0 0 8px' }}>{step.title}</h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: '60px 32px 80px', background: S.warmPanel, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Interested in a Custom Piece?</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>Our artisans can bring your vision to life.</p>
        <SalonButton href="/salon/bespoke">Start Your Custom Journey</SalonButton>
      </section>
    </SalonLayout>
  )
}
