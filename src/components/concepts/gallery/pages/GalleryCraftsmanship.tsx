'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { GalleryImageCompare } from '../ui/GalleryImageCompare'

const processes = [
  { num: '01', title: 'Stone Selection', desc: 'Our master gemologists examine thousands of diamonds to find the rare few that meet our exacting standards for brilliance, fire, and scintillation.' },
  { num: '02', title: 'Design & CAD', desc: 'Each setting is designed to maximize the stone\'s natural beauty, using advanced 3D modeling to perfect every angle and proportion.' },
  { num: '03', title: 'Wax Carving', desc: 'A wax model is hand-carved to test the design in three dimensions, allowing for final refinements before casting.' },
  { num: '04', title: 'Casting', desc: 'The lost-wax casting process transforms the design into precious metal, creating the foundation for the finished piece.' },
  { num: '05', title: 'Setting', desc: 'Master setters secure each stone by hand, ensuring perfect alignment and maximum light return through precise prong placement.' },
  { num: '06', title: 'Finishing', desc: 'Hours of hand-polishing bring the metal to its final luster, while quality control ensures every detail meets our gallery standards.' },
]

export function GalleryCraftsmanship() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 650, margin: '0 auto' }}>
        <MuseumCaption align="center">The Process</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Craftsmanship
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7 }}>
          Every piece in our gallery represents hundreds of hours of skilled artistry, combining centuries-old techniques with modern precision.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 120px' }}>
        {processes.map((p, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, padding: '40px 0', borderBottom: `1px solid ${G.border}` }}>
            <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.5rem', color: G.border }}>{p.num}</span>
            <div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 10px' }}>{p.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary, lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <GalleryButton href="/gallery/bespoke">Commission a Piece</GalleryButton>
        </div>
      </section>

      {/* Before & After Comparison */}
      <section style={{ padding: '80px 32px', background: G.surface }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <MuseumCaption align="center">The Transformation</MuseumCaption>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 400, color: G.text, margin: '16px 0 40px' }}>
            From Raw Stone to Masterpiece
          </h2>
          <GalleryImageCompare
            beforeImage="/images/products/loose-round-diamond.jpg"
            afterImage="/images/products/diamond-solitaire-ring.jpg"
            beforeLabel="Raw Diamond"
            afterLabel="Finished Ring"
          />
        </div>
      </section>
    </GalleryLayout>
  )
}
