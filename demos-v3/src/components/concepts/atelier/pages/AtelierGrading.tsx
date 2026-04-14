'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

const grades = [
  { grade: 'Cut', desc: 'The most important factor in a diamond\'s beauty. We select only Excellent and Ideal cuts that maximize brilliance, fire, and scintillation. Our artisans assess each stone\'s proportions, symmetry, and polish by eye before accepting it into the workshop.' },
  { grade: 'Colour', desc: 'We work primarily with D–G colour grades — the near-colourless to colourless range. For fancy colour diamonds, we source vivid and intense grades. Each stone is evaluated against master stones in controlled lighting.' },
  { grade: 'Clarity', desc: 'Our minimum clarity standard is VS2, with most pieces featuring VS1 or higher. Every stone is examined under 10x magnification to ensure inclusions are invisible to the naked eye and don\'t affect brilliance.' },
  { grade: 'Carat', desc: 'Weight is important but secondary to cut quality. We\'d rather offer a perfectly cut 0.95ct stone than a poorly proportioned 1.00ct. Our artisans help you understand the visual impact of different carat weights.' },
]

export function AtelierGrading() {
  return (
    <AtelierLayout>
      {/* ═══ HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '40vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/gemstone-inspection.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.4)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '100px 32px 60px' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>The 4Cs</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#FEFCF8', margin: '0 0 16px' }}>Diamond Grading</h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'rgba(232,226,216,0.8)', lineHeight: 1.7 }}>
            Understanding quality is the first step in choosing the right stone. Here&apos;s how our gemologists evaluate every diamond that enters the workshop.
          </p>
        </div>
      </section>

      {/* ═══ GRADES ═══ */}
      <AtelierSection style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {grades.map((g, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div style={{
                display: 'grid', gridTemplateColumns: '140px 1fr', gap: 32,
                padding: '36px 28px', marginBottom: 20,
                background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
                boxShadow: `inset 0 1px 2px ${A.shadow}`,
              }}>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 42, fontWeight: 300, color: A.accent, lineHeight: 1 }}>{g.grade}</div>
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold, marginTop: 4 }}>Grade {i + 1} of 4</div>
                </div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8 }}>{g.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </AtelierSection>

      {/* ═══ CTA ═══ */}
      <AtelierSection dark style={{ padding: '64px 32px' }}>
        <RevealSection>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: A.gold, marginBottom: 16 }}>Every stone tells a story</div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: 'rgba(232,226,216,0.7)', lineHeight: 1.7, marginBottom: 28 }}>
              Our gemologists are happy to walk you through the grading of any stone in our collection. Book a consultation to learn more.
            </p>
            <AtelierButton href="/atelier/contact" style={{ background: A.gold, color: A.ink }}>Book a Consultation</AtelierButton>
          </div>
        </RevealSection>
      </AtelierSection>
    </AtelierLayout>
  )
}
