'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
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
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>The 4Cs</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>Diamond Grading</h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            Understanding quality is the first step in choosing the right stone. Here&apos;s how our gemologists evaluate every diamond that enters the workshop.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 32px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {grades.map((g, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, padding: '32px 0', borderBottom: i < grades.length - 1 ? `1px solid ${A.border}` : 'none' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.accent }}>{g.grade}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.8 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '40px 32px 80px', textAlign: 'center', background: A.surface }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: A.accent, marginBottom: 16 }}>Every stone tells a story</div>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 24 }}>
            Our gemologists are happy to walk you through the grading of any stone in our collection. Book a consultation to learn more.
          </p>
          <AtelierButton href="/atelier/contact">Book a Consultation</AtelierButton>
        </div>
      </section>
    </AtelierLayout>
  )
}
