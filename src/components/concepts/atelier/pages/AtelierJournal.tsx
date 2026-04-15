'use client'
import React from 'react'
import Link from 'next/link'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

const featured = {
  title: 'The Art of Lost-Wax Casting',
  excerpt: 'A 6,000-year-old technique that remains the gold standard for fine jewelry. From the first wax carving to the moment molten gold fills the mould — we walk through our ancient process step by step, revealing the alchemy that transforms an idea into precious metal.',
  date: 'March 2024', tag: 'Technique',
  image: '/images/atelier/wax-carving.jpg',
  readTime: '8 min read',
}

const entries = [
  { title: 'Sourcing Burmese Rubies', excerpt: 'Our latest trip to Mogok Valley, where we hand-selected stones that will become the heart of our next collection.', date: 'February 2024', tag: 'Sourcing', image: '/images/atelier/gemstone-appraisal.jpg' },
  { title: 'Meet Elena: 22 Years at the Bench', excerpt: 'Our master stone setter shares her journey from apprentice to one of London\'s most respected craftspeople.', date: 'January 2024', tag: 'Artisan', image: '/images/atelier/female-jeweler.jpg' },
  { title: 'The Geometry of a Perfect Setting', excerpt: 'Why millimeters matter: the mathematical precision behind invisible settings and tension mounts.', date: 'December 2023', tag: 'Craft', image: '/images/atelier/gemstone-inspection.jpg' },
  { title: 'Sustainable Gold: Our Commitment', excerpt: 'How we source recycled and Fairmined gold, and why it matters for the future of fine jewelry.', date: 'November 2023', tag: 'Ethics', image: '/images/atelier/molten-gold.jpg' },
  { title: 'A Bespoke Journey: The Laurent Commission', excerpt: 'From first sketch to final unveiling — following one client\'s custom engagement ring through every stage.', date: 'October 2023', tag: 'Commission', image: '/images/atelier/jewelry-sketch.jpg' },
]

export function AtelierJournal() {
  return (
    <AtelierLayout>
      {/* ═══ HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '45vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/workshop-interior.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.4)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '72px 32px 60px' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
            From the Bench
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#FEFCF8', margin: '0 0 16px' }}>
            Workbench Journal
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'rgba(232,226,216,0.8)', lineHeight: 1.7 }}>
            Stories of craft, sourcing, and the people behind every piece.
          </p>
        </div>
      </section>

      {/* ═══ FEATURED ARTICLE ═══ */}
      <AtelierSection style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center',
              background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', minHeight: 360,
                backgroundImage: `url(${featured.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{ padding: '40px 40px 40px 0' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.accent, padding: '2px 10px', border: `1px dashed ${A.accent}`, borderRadius: 1 }}>
                    {featured.tag}
                  </span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.sketch }}>{featured.date}</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.sketch }}>·</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.sketch }}>{featured.readTime}</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 400, color: A.ink, margin: '0 0 16px', lineHeight: 1.25 }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, marginBottom: 24 }}>
                  {featured.excerpt}
                </p>
                <AtelierButton variant="ghost">Read Full Article →</AtelierButton>
              </div>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══ ALL ENTRIES ═══ */}
      <AtelierSection alt style={{ padding: '60px 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
                All Entries
              </div>
              <WarmDivider style={{ maxWidth: '100%', margin: 0 }} />
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {entries.map((entry, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{
                  background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
                  overflow: 'hidden', cursor: 'pointer',
                  boxShadow: `inset 0 1px 2px ${A.shadow}`,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = A.accent;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${A.shadowMd}`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = A.sketch;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `inset 0 1px 2px ${A.shadow}`
                }}
                >
                  <div style={{
                    height: 200,
                    backgroundImage: `url(${entry.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }} />
                  <div style={{ padding: '20px 22px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.accent }}>{entry.tag}</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.sketch }}>{entry.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, margin: '0 0 8px', lineHeight: 1.3 }}>
                      {entry.title}
                    </h3>
                    <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.6, margin: '0 0 12px' }}>
                      {entry.excerpt}
                    </p>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.accent }}>
                      Read More →
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
