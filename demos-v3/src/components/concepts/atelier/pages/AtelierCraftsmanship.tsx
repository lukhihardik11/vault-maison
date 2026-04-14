'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { ProcessTimeline } from '../ui/ProcessTimeline'
import { AtelierButton } from '../ui/AtelierButton'

const techniques = [
  { title: 'Lost-Wax Casting', desc: 'A 6,000-year-old technique. We carve each piece in wax, invest it in plaster, then replace the wax with molten metal. The result is a one-of-a-kind casting with extraordinary detail.', hours: '8–16 hours', image: '/images/atelier/wax-carving.jpg' },
  { title: 'Hand Engraving', desc: 'Using traditional burins and gravers, our engravers cut decorative patterns directly into metal. No two engravings are identical — each carries the artisan\'s personal touch.', hours: '12–40 hours', image: '/images/atelier/hand-engraving.jpg' },
  { title: 'Micro-Pavé Setting', desc: 'Stones as small as 0.8mm are individually set under 10x magnification. Each stone is held by tiny beads of metal raised from the surface — invisible to the naked eye.', hours: '20–60 hours', image: '/images/atelier/gemstone-inspection.jpg' },
  { title: 'Forging & Forming', desc: 'Some pieces begin as a solid bar of metal, heated and hammered on the anvil. This ancient technique creates a density and strength that casting alone cannot achieve.', hours: '4–12 hours', image: '/images/atelier/molten-gold.jpg' },
  { title: 'Polishing & Finishing', desc: 'Multiple stages of hand-polishing — from coarse emery to rouge — bring each surface to its final lustre. Mirror, satin, or brushed: the finish defines the character.', hours: '2–8 hours', image: '/images/atelier/goldsmith-crafting.jpg' },
  { title: 'Quality Inspection', desc: 'Every piece undergoes a 47-point inspection under strong light and magnification. Stone security, surface quality, symmetry, and weight are all verified before release.', hours: '1–2 hours', image: '/images/atelier/engraving-closeup.jpg' },
]

const steps = [
  { number: '01', title: 'Consultation', description: 'Share your vision. We listen, sketch, and explore possibilities together.', duration: '1–2 hours', image: '/images/atelier/atelier-interior.jpg' },
  { number: '02', title: 'Design', description: 'Detailed renderings and 3D models bring your concept to life on paper.', duration: '1–2 weeks', image: '/images/atelier/jewelry-sketch.jpg' },
  { number: '03', title: 'Wax Model', description: 'A precise wax replica is carved for your approval before casting.', duration: '1 week', image: '/images/atelier/wax-carving.jpg' },
  { number: '04', title: 'Crafting', description: 'Master artisans bring the design to life with hours of focused handwork.', duration: '4–8 weeks', image: '/images/atelier/goldsmith-crafting.jpg' },
  { number: '05', title: 'Setting', description: 'Stones are individually placed and secured with microscopic precision.', duration: '1–2 weeks', image: '/images/atelier/gemstone-inspection.jpg' },
  { number: '06', title: 'Unveiling', description: 'Your finished piece is presented in a private ceremony.', duration: 'Your moment', image: '/images/atelier/workshop-interior.jpg' },
]

export function AtelierCraftsmanship() {
  return (
    <AtelierLayout>
      {/* ═══ HERO with workshop photo ═══ */}
      <section style={{
        position: 'relative', minHeight: '55vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/goldsmith-crafting.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.4)' }} />
        <div style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '100px 32px 80px' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
            Our Craft
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 300, color: '#FEFCF8', margin: '0 0 20px', lineHeight: 1.15 }}>
            The Art of Making
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'rgba(232,226,216,0.8)', lineHeight: 1.8 }}>
            Every technique we use has been refined over centuries. We honour tradition while pushing the boundaries of what&apos;s possible by hand.
          </p>
        </div>
      </section>

      {/* ═══ TECHNIQUES — alternating image/text rows ═══ */}
      <AtelierSection style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                Workshop Techniques
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
                Six Disciplines of Mastery
              </h2>
            </div>
          </RevealSection>
          {techniques.map((t, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.5fr' : '1.5fr 1fr',
                gap: 40, alignItems: 'center',
                padding: '40px 0',
                borderBottom: i < techniques.length - 1 ? `1px dashed ${A.sketch}` : 'none',
              }}>
                {i % 2 === 0 ? (
                  <>
                    <div style={{
                      height: 260, borderRadius: 2,
                      backgroundImage: `url(${t.image})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      border: `1px dashed ${A.sketch}`,
                    }} />
                    <TechniqueText t={t} i={i} />
                  </>
                ) : (
                  <>
                    <TechniqueText t={t} i={i} />
                    <div style={{
                      height: 260, borderRadius: 2,
                      backgroundImage: `url(${t.image})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      border: `1px dashed ${A.sketch}`,
                    }} />
                  </>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </AtelierSection>

      {/* ═══ PROCESS TIMELINE ═══ */}
      <AtelierSection alt style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <ProcessTimeline steps={steps} title="The Commission Journey" subtitle="From Vision to Masterpiece" />
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══ CTA with backdrop ═══ */}
      <section style={{ position: 'relative', padding: '80px 32px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/hand-engraving.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.5)' }} />
        <RevealSection>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 300, color: '#FEFCF8', marginBottom: 16 }}>
              Ready to Begin?
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: 'rgba(232,226,216,0.7)', lineHeight: 1.7, marginBottom: 32 }}>
              Every masterpiece starts with a conversation. Our 6-step commission process guides you from inspiration to unveiling.
            </p>
            <AtelierButton href="/atelier/bespoke" style={{ background: A.gold, color: A.ink }}>
              Start Your Commission
            </AtelierButton>
          </div>
        </RevealSection>
      </section>
    </AtelierLayout>
  )
}

function TechniqueText({ t, i }: { t: typeof techniques[0]; i: number }) {
  return (
    <div>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: `${A.accent}30`, lineHeight: 1, marginBottom: 8 }}>
        {String(i + 1).padStart(2, '0')}
      </div>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 500, color: A.ink, margin: '0 0 12px' }}>
        {t.title}
      </h3>
      <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, marginBottom: 12 }}>
        {t.desc}
      </p>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 15, color: A.gold }}>
        Typical duration: {t.hours}
      </div>
    </div>
  )
}

// Need to export the techniques type for the TechniqueText component
type TechniqueType = typeof techniques
