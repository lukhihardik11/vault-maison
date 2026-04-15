'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { GalleryAboutSection } from '../ui/GalleryAboutSection'
import { GalleryTimeline } from '../ui/GalleryTimeline'

const values = [
  { title: 'Curation', desc: 'Every piece is hand-selected by our gemologists, chosen not only for quality but for artistic merit and emotional resonance.' },
  { title: 'Provenance', desc: 'We trace the journey of every stone, ensuring ethical sourcing and transparent supply chains from mine to gallery.' },
  { title: 'Craftsmanship', desc: 'Our artisans combine centuries-old techniques with modern precision, creating pieces that transcend time.' },
  { title: 'Exhibition', desc: 'We believe jewelry deserves the same reverence as fine art — presented with context, space, and intention.' },
]

export function GalleryAbout() {
  return (
    <GalleryLayout>
      {/* About Section with Parallax, Services Grid, Animated Stats */}
      <GalleryAboutSection />

      <section style={{ padding: '160px 32px 100px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
        <MuseumCaption align="center">About the Gallery</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: G.text, margin: '16px 0 24px', lineHeight: 1.2 }}>
          Our Story
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.textSecondary, lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
          Founded on the belief that extraordinary diamonds deserve extraordinary presentation, Vault Maison reimagines the jewelry experience as an art exhibition — where each piece is a masterwork deserving of contemplation.
        </p>
      </section>

      {/* Editorial image + text */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', background: '#F8F6F2', border: `1px solid ${G.border}`, overflow: 'hidden' }}>
            <img src="/images/diamond-facets-1.jpg" alt="Our Philosophy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <MuseumCaption>Founded 2020</MuseumCaption>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 400, color: G.text, margin: '12px 0 20px', lineHeight: 1.3 }}>
              Where Art Meets Adornment
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
              Vault Maison was born from a simple observation: the world&apos;s finest jewelry was being sold in environments that failed to honor its artistry. We set out to change that — creating a gallery experience where each piece is presented with the reverence it deserves.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.8 }}>
              Our curators are third-generation gemologists who combine deep knowledge of stones with a modern vision for luxury retail. Every diamond in our collection is hand-selected, examined for exceptional brilliance, fire, and scintillation.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 32px', borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <MuseumCaption align="center">Our Principles</MuseumCaption>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, color: G.text, margin: '12px 0 0' }}>
              The Gallery Philosophy
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
            {values.map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '2rem', color: G.border, display: 'block', marginBottom: 20 }}>
                  0{i + 1}
                </span>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', fontWeight: 400, color: G.text, margin: '0 0 12px' }}>{v.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: G.textSecondary, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Timeline */}
      <section style={{ padding: '80px 32px', background: G.surface }}>
        <div style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center' }}>
          <MuseumCaption align="center">Our Heritage</MuseumCaption>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 400, color: G.text, margin: '16px 0 60px' }}>
            A Legacy of Extraordinary Craft
          </h2>
          <GalleryTimeline
            events={[
              { year: '1987', title: 'The Beginning', description: 'Founded in a small London atelier with a vision to create jewelry as art.' },
              { year: '1995', title: 'First Exhibition', description: 'Debuted at the Victoria & Albert Museum, establishing our gallery approach.' },
              { year: '2008', title: 'Maison Expansion', description: 'Opened our flagship salon on New Bond Street, London.' },
              { year: '2019', title: 'Digital Gallery', description: 'Launched our online exhibition space, bringing the gallery experience worldwide.' },
              { year: '2024', title: 'The Vault Collection', description: 'Introduced our most exclusive line of one-of-a-kind masterpieces.' },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 32px', textAlign: 'center', borderTop: `1px solid ${G.border}` }}>
        <MuseumCaption align="center">Visit Us</MuseumCaption>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 400, color: G.text, margin: '12px 0 24px' }}>
          Experience the Gallery in Person
        </h2>
        <GalleryButton href="/gallery/contact">Schedule a Private Viewing</GalleryButton>
      </section>
    </GalleryLayout>
  )
}
