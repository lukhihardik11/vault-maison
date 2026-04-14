'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { ProcessTimeline } from '../ui/ProcessTimeline'
import { AtelierButton } from '../ui/AtelierButton'

const techniques = [
  { title: 'Lost-Wax Casting', desc: 'A 6,000-year-old technique. We carve each piece in wax, invest it in plaster, then replace the wax with molten metal. The result is a one-of-a-kind casting with extraordinary detail.', hours: '8–16 hours' },
  { title: 'Hand Engraving', desc: 'Using traditional burins and gravers, our engravers cut decorative patterns directly into metal. No two engravings are identical — each carries the artisan\'s personal touch.', hours: '12–40 hours' },
  { title: 'Micro-Pavé Setting', desc: 'Stones as small as 0.8mm are individually set under 10x magnification. Each stone is held by tiny beads of metal raised from the surface — invisible to the naked eye.', hours: '20–60 hours' },
  { title: 'Forging & Forming', desc: 'Some pieces begin as a solid bar of metal, heated and hammered on the anvil. This ancient technique creates a density and strength that casting alone cannot achieve.', hours: '4–12 hours' },
  { title: 'Polishing & Finishing', desc: 'Multiple stages of hand-polishing — from coarse emery to rouge — bring each surface to its final lustre. Mirror, satin, or brushed: the finish defines the character.', hours: '2–8 hours' },
  { title: 'Quality Inspection', desc: 'Every piece undergoes a 47-point inspection under strong light and magnification. Stone security, surface quality, symmetry, and weight are all verified before release.', hours: '1–2 hours' },
]

const steps = [
  { number: '01', title: 'Consultation', description: 'Share your vision. We listen, sketch, and explore possibilities together.', duration: '1–2 hours' },
  { number: '02', title: 'Design', description: 'Detailed renderings and 3D models bring your concept to life on paper.', duration: '1–2 weeks' },
  { number: '03', title: 'Wax Model', description: 'A precise wax replica is carved for your approval before casting.', duration: '1 week' },
  { number: '04', title: 'Crafting', description: 'Master artisans bring the design to life with hours of focused handwork.', duration: '4–8 weeks' },
  { number: '05', title: 'Setting', description: 'Stones are individually placed and secured with microscopic precision.', duration: '1–2 weeks' },
  { number: '06', title: 'Unveiling', description: 'Your finished piece is presented in a private ceremony.', duration: 'Your moment' },
]

export function AtelierCraftsmanship() {
  return (
    <AtelierLayout>
      {/* Hero */}
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Our Craft
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>
            The Art of Making
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            Every technique we use has been refined over centuries. We honour tradition while pushing the boundaries of what&apos;s possible.
          </p>
        </div>
      </section>

      {/* Techniques */}
      <section style={{ padding: '0 32px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {techniques.map((t, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32, alignItems: 'start',
              padding: '32px 0',
              borderBottom: i < techniques.length - 1 ? `1px solid ${A.border}` : 'none',
            }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: A.accent, opacity: 0.25 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.sketch, marginTop: 4 }}>
                  ~ {t.hours}
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, margin: '0 0 8px' }}>
                  {t.title}
                </h3>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7 }}>
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section style={{ padding: '80px 32px', background: A.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ProcessTimeline steps={steps} title="The Commission Journey" subtitle="From Vision to Masterpiece" />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, marginBottom: 16 }}>
          Ready to Begin?
        </h2>
        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, marginBottom: 32 }}>
          Every masterpiece starts with a conversation.
        </p>
        <AtelierButton href="/atelier/bespoke">Start Your Commission</AtelierButton>
      </section>
    </AtelierLayout>
  )
}
