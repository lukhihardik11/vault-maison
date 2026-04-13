'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'

const grades = [
  { letter: 'Cut', desc: 'The most critical factor in a diamond\'s beauty. We select only Ideal and Excellent cuts that maximize brilliance and fire.' },
  { letter: 'Color', desc: 'Our collection ranges from D (colorless) to G (near-colorless). Each stone is evaluated under controlled lighting by our gemologists.' },
  { letter: 'Clarity', desc: 'We curate diamonds from FL (Flawless) to VS2 (Very Slightly Included). Every inclusion is mapped and documented.' },
  { letter: 'Carat', desc: 'Weight is considered alongside the other three Cs. A well-cut smaller diamond will always outperform a poorly cut larger stone.' },
]

export function GalleryGrading() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 650, margin: '0 auto' }}>
        <MuseumCaption align="center">Education</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Diamond Grading
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7 }}>
          Understanding the Four Cs is essential to appreciating the artistry and value of each diamond in our collection.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {grades.map((g, i) => (
            <div key={i} style={{ padding: 40, background: G.surface, border: `1px solid ${G.border}` }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '2rem', color: G.accent, display: 'block', marginBottom: 16 }}>
                {g.letter}
              </span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary, lineHeight: 1.8, margin: 0 }}>{g.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <GalleryButton href="/gallery/collections">View Our Collection</GalleryButton>
        </div>
      </section>
    </GalleryLayout>
  )
}
