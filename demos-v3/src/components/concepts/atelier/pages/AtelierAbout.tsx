'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { ArtisanCard } from '../ui/ArtisanCard'
import { ProcessTimeline } from '../ui/ProcessTimeline'

const values = [
  { title: 'The Hand', desc: 'Every piece is shaped by human hands. We believe the slight imperfections of handwork are what give jewelry its soul.' },
  { title: 'The Process', desc: 'We don\'t rush mastery. Each commission unfolds at the pace it deserves — 40 to 200 hours of focused craft.' },
  { title: 'The Material', desc: 'We source metals and stones with the same care a chef sources ingredients. Provenance matters.' },
  { title: 'The Story', desc: 'Every piece carries a narrative — the client\'s vision, the artisan\'s interpretation, the moment it was made for.' },
]

const artisans = [
  { name: 'Elena Marchetti', title: 'Master Stone Setter', specialty: 'Specializes in invisible settings and micro-pavé. Her work has been featured in Vogue and Harper\'s Bazaar.', years: 22, signature: 'E. Marchetti' },
  { name: 'Thomas Ashworth', title: 'Master Engraver', specialty: 'Hand-engraving specialist with expertise in Victorian and Art Nouveau motifs. Third-generation craftsman.', years: 18, signature: 'T. Ashworth' },
  { name: 'Yuki Tanaka', title: 'Sculptural Designer', specialty: 'Trained in Tokyo and Florence. Known for bold, architectural forms that challenge traditional jewelry conventions.', years: 15, signature: 'Y. Tanaka' },
  { name: 'Marie Dubois', title: 'Wax Modeller', specialty: 'Creates the initial wax models that become finished pieces. Her precision is legendary among London\'s jewelers.', years: 20, signature: 'M. Dubois' },
]

const steps = [
  { number: '01', title: 'Consultation', description: 'Share your vision over tea in our workshop. We listen, sketch, and dream together.', duration: '1–2 hours' },
  { number: '02', title: 'Design', description: 'Our designers create detailed renderings and wax models for your approval.', duration: '1–2 weeks' },
  { number: '03', title: 'Sourcing', description: 'We hand-select the finest stones and metals for your piece.', duration: '1–3 weeks' },
  { number: '04', title: 'Crafting', description: 'Master artisans bring your design to life with 40–200 hours of handwork.', duration: '4–8 weeks' },
  { number: '05', title: 'Finishing', description: 'Final polishing, setting, and quality inspection by our master jeweler.', duration: '1 week' },
  { number: '06', title: 'Unveiling', description: 'Your finished piece is presented in a private ceremony at the workshop.', duration: 'Your moment' },
]

export function AtelierAbout() {
  return (
    <AtelierLayout>
      {/* Hero */}
      <section style={{ padding: '80px 32px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Our Workshop
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: A.ink, margin: '0 0 24px', lineHeight: 1.2 }}>
            Where Craft Meets<br />Conversation
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft, lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>
            Since 1987, our Hatton Garden workshop has been a place where extraordinary jewelry is born from extraordinary conversations. Every piece begins with listening.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
            {values.map((v, i) => (
              <div key={i} style={{ padding: '32px 24px', background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2 }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 300, color: A.accent, opacity: 0.3, marginBottom: 8 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, marginBottom: 8 }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 32px', background: A.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ProcessTimeline steps={steps} title="From Vision to Masterpiece" subtitle="The Making Process" />
        </div>
      </section>

      {/* Artisans */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
              The Makers
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
              Meet Our Master Artisans
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {artisans.map((a, i) => (
              <ArtisanCard key={i} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding: '80px 32px', background: A.surface }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 40, height: 1, background: A.accent, margin: '0 auto 32px', opacity: 0.4 }} />
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: A.ink, lineHeight: 1.6, fontStyle: 'italic' }}>
            &ldquo;Every piece that leaves our atelier bears the invisible signature of the artisan who created it. We celebrate the human touch — the warmth of handwork, the soul that no machine can replicate.&rdquo;
          </p>
          <div style={{ width: 40, height: 1, background: A.accent, margin: '32px auto 0', opacity: 0.4 }} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, marginBottom: 16 }}>
            Visit the Workshop
          </h2>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 32 }}>
            We welcome visitors by appointment. Come see the craft in action.
          </p>
          <AtelierButton href="/atelier/contact">Book a Visit</AtelierButton>
        </div>
      </section>
    </AtelierLayout>
  )
}
