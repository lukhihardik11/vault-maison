'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AtelierLayout, A } from './atelier/AtelierLayout'
import { AtelierButton } from './atelier/ui/AtelierButton'
import { AtelierCard } from './atelier/ui/AtelierCard'
import { ArtisanCard } from './atelier/ui/ArtisanCard'
import { ProcessTimeline } from './atelier/ui/ProcessTimeline'
import { SketchToggle } from './atelier/ui/SketchToggle'
import { getBestsellers } from '@/data/products'

const artisans = [
  { name: 'Elena Marchetti', title: 'Master Stone Setter', specialty: 'Specializes in invisible settings and micro-pavé. 22 years at the bench.', years: 22, signature: 'E. Marchetti' },
  { name: 'Thomas Ashworth', title: 'Master Engraver', specialty: 'Hand-engraving specialist. Third-generation craftsman from Sheffield.', years: 18, signature: 'T. Ashworth' },
  { name: 'Yuki Tanaka', title: 'Sculptural Designer', specialty: 'Trained in Tokyo and Florence. Known for bold, architectural forms.', years: 15, signature: 'Y. Tanaka' },
]

const steps = [
  { number: '01', title: 'Consultation', description: 'Share your vision over tea. We listen, sketch, and dream together.', duration: '1–2 hours' },
  { number: '02', title: 'Design', description: 'Detailed renderings and wax models bring your concept to life.', duration: '1–2 weeks' },
  { number: '03', title: 'Sourcing', description: 'We hand-select the finest stones and metals for your piece.', duration: '1–3 weeks' },
  { number: '04', title: 'Crafting', description: 'Master artisans bring the design to life with focused handwork.', duration: '4–8 weeks' },
  { number: '05', title: 'Finishing', description: 'Final polishing, setting, and quality inspection.', duration: '1 week' },
  { number: '06', title: 'Unveiling', description: 'Your finished piece is presented in a private ceremony.', duration: 'Your moment' },
]

const journalEntries = [
  { title: 'The Art of Lost-Wax Casting', tag: 'Technique', date: 'March 2024' },
  { title: 'Sourcing Burmese Rubies', tag: 'Sourcing', date: 'February 2024' },
  { title: 'Meet Elena: 22 Years at the Bench', tag: 'Artisan', date: 'January 2024' },
]

export function AtelierHome() {
  const featured = getBestsellers().slice(0, 4)
  const artisanNames = ['Elena M.', 'Thomas A.', 'Yuki T.', 'Marie D.']

  return (
    <AtelierLayout>
      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 32px 80px', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${A.bg} 0%, ${A.workshop} 50%, ${A.bg} 100%)`,
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 0L20 40M0 20L40 20\' stroke=\'%238B6914\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.accent, marginBottom: 24 }}>
            Welcome to The Atelier
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 400, color: A.ink, margin: '0 0 24px', lineHeight: 1.15 }}>
            Where Every Piece<br />Begins as a Conversation
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 40px' }}>
            Since 1987, our Hatton Garden workshop has been a place where extraordinary jewelry is born from extraordinary conversations. Every piece is handcrafted, every detail considered.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <AtelierButton href="/atelier/collections">Explore the Workshop</AtelierButton>
            <AtelierButton variant="secondary" href="/atelier/bespoke">Begin a Commission</AtelierButton>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS TIMELINE ═══ */}
      <section style={{ padding: '100px 32px', background: A.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ProcessTimeline steps={steps} title="From Sketch to Masterpiece" subtitle="The Making Process" />
        </div>
      </section>

      {/* ═══ FEATURED PIECES ═══ */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
              From the Bench
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
              Workshop Favourites
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {featured.map((p, i) => (
              <AtelierCard
                key={p.slug}
                title={p.name}
                subtitle={p.category.replace(/-/g, ' ')}
                price={`£${p.price.toLocaleString()}`}
                image={p.images?.[0]}
                href={`/atelier/product/${p.slug}`}
                artisan={artisanNames[i % artisanNames.length]}
                badge={p.isNew ? 'New from the bench' : p.isBestseller ? 'Workshop favourite' : undefined}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <AtelierButton variant="secondary" href="/atelier/collections">View All Pieces</AtelierButton>
          </div>
        </div>
      </section>

      {/* ═══ SKETCH TOGGLE SHOWCASE ═══ */}
      <section style={{ padding: '80px 32px', background: A.surface }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <SketchToggle title="Celestial Solitaire" style={{ maxWidth: 400 }} />
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
              Design to Reality
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>
              See the Journey
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, marginBottom: 24 }}>
              Toggle between the original design sketch and the finished piece. Every creation in our workshop begins as a hand-drawn concept before becoming reality.
            </p>
            <AtelierButton variant="ghost" href="/atelier/craftsmanship">
              Learn About Our Process →
            </AtelierButton>
          </div>
        </div>
      </section>

      {/* ═══ ARTISANS ═══ */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
              The Makers
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
              Meet Our Artisans
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {artisans.map((a, i) => (
              <ArtisanCard key={i} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section style={{ padding: '80px 32px', background: A.surface }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 40, height: 1, background: A.accent, margin: '0 auto 32px', opacity: 0.4 }} />
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: A.ink, lineHeight: 1.6, fontStyle: 'italic' }}>
            &ldquo;Every piece that leaves our atelier bears the invisible signature of the artisan who created it. We celebrate the human touch — the warmth of handwork, the soul that no machine can replicate.&rdquo;
          </p>
          <div style={{ width: 40, height: 1, background: A.accent, margin: '32px auto 0', opacity: 0.4 }} />
        </div>
      </section>

      {/* ═══ WORKBENCH JOURNAL ═══ */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
              From the Bench
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
              Workbench Journal
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {journalEntries.map((entry, i) => (
              <Link key={i} href="/atelier/journal" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2,
                  padding: 28, transition: 'border-color 0.3s', cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = A.accent }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = A.border }}
                >
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: 13, color: A.accent, marginBottom: 8 }}>{entry.tag}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: A.ink, margin: '0 0 8px' }}>{entry.title}</h3>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.sketch }}>{entry.date}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <AtelierButton variant="ghost" href="/atelier/journal">Read All Entries →</AtelierButton>
          </div>
        </div>
      </section>

      {/* ═══ COMMISSION CTA ═══ */}
      <section style={{ padding: '80px 32px', background: A.ink, textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
            Bespoke
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: A.workshop, margin: '0 0 16px', lineHeight: 1.3 }}>
            Begin Your Commission
          </h2>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: 'rgba(232,226,216,0.7)', lineHeight: 1.7, marginBottom: 32 }}>
            Every masterpiece starts with a conversation. Our 6-step commission process guides you from inspiration to unveiling.
          </p>
          <AtelierButton href="/atelier/bespoke" style={{ background: A.gold, color: A.ink }}>
            Start Your Journey
          </AtelierButton>
        </div>
      </section>
    </AtelierLayout>
  )
}
