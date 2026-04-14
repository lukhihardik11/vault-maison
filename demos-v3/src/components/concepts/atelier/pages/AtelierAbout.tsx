'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { ArtisanCard } from '../ui/ArtisanCard'
import { ProcessTimeline } from '../ui/ProcessTimeline'

const values = [
  { title: 'The Hand', desc: 'Every piece is shaped by human hands. We believe the slight imperfections of handwork are what give jewelry its soul.', icon: '✦' },
  { title: 'The Process', desc: 'We don\'t rush mastery. Each commission unfolds at the pace it deserves — 40 to 200 hours of focused craft.', icon: '◇' },
  { title: 'The Material', desc: 'We source metals and stones with the same care a chef sources ingredients. Provenance matters.', icon: '○' },
  { title: 'The Story', desc: 'Every piece carries a narrative — the client\'s vision, the artisan\'s interpretation, the moment it was made for.', icon: '♡' },
]

const artisans = [
  { name: 'Elena Marchetti', title: 'Master Stone Setter', specialty: 'Specializes in invisible settings and micro-pavé. Her work has been featured in Vogue and Harper\'s Bazaar.', years: 22, signature: 'E. Marchetti', image: '/images/atelier/female-jeweler.jpg', quote: 'Each stone has a voice — my job is to let it sing.' },
  { name: 'Thomas Ashworth', title: 'Master Engraver', specialty: 'Hand-engraving specialist with expertise in Victorian and Art Nouveau motifs. Third-generation craftsman.', years: 18, signature: 'T. Ashworth', image: '/images/atelier/artisan-portrait-1.jpg', quote: 'The chisel remembers what the hand forgets.' },
  { name: 'Yuki Tanaka', title: 'Sculptural Designer', specialty: 'Trained in Tokyo and Florence. Known for bold, architectural forms that challenge traditional conventions.', years: 15, signature: 'Y. Tanaka', image: '/images/atelier/artisan-portrait-2.jpg', quote: 'I sculpt light as much as metal.' },
  { name: 'Marie Dubois', title: 'Wax Modeller', specialty: 'Creates the initial wax models that become finished pieces. Her precision is legendary among London\'s jewelers.', years: 20, signature: 'M. Dubois', image: '/images/atelier/artisan-portrait-3.jpg', quote: 'Wax is where dreams first take shape.' },
]

const steps = [
  { number: '01', title: 'Consultation', description: 'Share your vision over tea in our workshop. We listen, sketch, and dream together.', duration: '1–2 hours', image: '/images/atelier/atelier-interior.jpg' },
  { number: '02', title: 'Design', description: 'Our designers create detailed renderings and wax models for your approval.', duration: '1–2 weeks', image: '/images/atelier/jewelry-sketch.jpg' },
  { number: '03', title: 'Sourcing', description: 'We hand-select the finest stones and metals for your piece.', duration: '1–3 weeks', image: '/images/atelier/gemstone-inspection.jpg' },
  { number: '04', title: 'Crafting', description: 'Master artisans bring your design to life with 40–200 hours of handwork.', duration: '4–8 weeks', image: '/images/atelier/goldsmith-crafting.jpg' },
  { number: '05', title: 'Finishing', description: 'Final polishing, setting, and quality inspection by our master jeweler.', duration: '1 week', image: '/images/atelier/hand-engraving.jpg' },
  { number: '06', title: 'Unveiling', description: 'Your finished piece is presented in a private ceremony at the workshop.', duration: 'Your moment', image: '/images/atelier/workshop-interior.jpg' },
]

export function AtelierAbout() {
  return (
    <AtelierLayout>
      {/* ═══ HERO with workshop photo ═══ */}
      <section style={{
        position: 'relative', minHeight: '60vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/atelier-interior.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.4)' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '72px 32px 80px' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
            Est. 1987 — Hatton Garden
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 300, color: '#FEFCF8', margin: '0 0 24px', lineHeight: 1.15 }}>
            Where Craft Meets<br />Conversation
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'rgba(232,226,216,0.8)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>
            Since 1987, our Hatton Garden workshop has been a sanctuary where extraordinary jewelry is born from extraordinary conversations. Every piece begins with listening.
          </p>
        </div>
      </section>

      {/* ═══ STORY — split image + text ═══ */}
      <AtelierSection style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div style={{
                position: 'relative', border: `1px dashed ${A.sketch}`, borderRadius: 2, overflow: 'hidden',
              }}>
                <div style={{
                  paddingTop: '110%',
                  backgroundImage: 'url(/images/atelier/jewelry-making-hands.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div style={{
                  position: 'absolute', bottom: 16, left: 16,
                  padding: '8px 16px', background: 'rgba(254,252,248,0.92)',
                  backdropFilter: 'blur(8px)', border: `1px dashed ${A.sketch}`,
                  fontFamily: 'Caveat, cursive', fontSize: 14, color: A.accent,
                }}>
                  Hands that shape dreams
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
                  Our Story
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 20px', lineHeight: 1.25 }}>
                  Three Decades of<br />Devoted Craftsmanship
                </h2>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, marginBottom: 16 }}>
                  Founded by master jeweler James Whitfield in 1987, The Atelier began as a single bench in a shared workshop on Hatton Garden. What started as one man&apos;s passion for handcraft has grown into a collective of three master artisans, each bringing decades of specialized expertise.
                </p>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, marginBottom: 24 }}>
                  We remain deliberately small — because scale is the enemy of craft. Every piece that leaves our workshop has been touched by human hands at every stage, from the first sketch to the final polish.
                </p>
                <WarmDivider style={{ maxWidth: 200, margin: '0 0 20px' }} />
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: A.gold, fontStyle: 'italic' }}>
                  &ldquo;Scale is the enemy of craft.&rdquo;
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══ VALUES ═══ */}
      <AtelierSection alt style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                What We Believe
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
                Four Pillars of Our Craft
              </h2>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{
                  padding: '32px 24px', background: A.surface,
                  border: `1px dashed ${A.sketch}`, borderRadius: 2,
                  boxShadow: `inset 0 1px 2px ${A.shadow}`,
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: A.accent, marginBottom: 16, opacity: 0.5 }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, marginBottom: 12 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7 }}>
                    {v.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </AtelierSection>

      {/* ═══ PROCESS TIMELINE ═══ */}
      <AtelierSection style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <ProcessTimeline steps={steps} title="From Vision to Masterpiece" subtitle="The Making Process" />
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══ ARTISANS with portraits ═══ */}
      <AtelierSection alt style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                The Makers
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 8px' }}>
                Meet Our Master Artisans
              </h2>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, maxWidth: 500, margin: '0 auto' }}>
                Each artisan brings decades of specialized expertise, trained in the world&apos;s finest ateliers.
              </p>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {artisans.map((a, i) => (
              <StaggerItem key={i} index={i}>
                <ArtisanCard {...a} />
              </StaggerItem>
            ))}
          </div>
        </div>
      </AtelierSection>

      {/* ═══ QUOTE with backdrop ═══ */}
      <section style={{ position: 'relative', padding: '72px 32px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/workshop-interior.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.5)' }} />
        <RevealSection>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={A.gold} strokeWidth="0.8" style={{ marginBottom: 24, opacity: 0.6 }}>
              <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#FEFCF8', lineHeight: 1.6, fontStyle: 'italic' }}>
              &ldquo;Every piece that leaves our atelier bears the invisible signature of the artisan who created it. We celebrate the human touch — the warmth of handwork, the soul that no machine can replicate.&rdquo;
            </p>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: A.gold, marginTop: 20 }}>
              — James Whitfield, Founder
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ═══ VISIT CTA ═══ */}
      <AtelierSection style={{ padding: '80px 32px' }}>
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
              By Appointment
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, marginBottom: 16 }}>
              Visit the Workshop
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 32 }}>
              We welcome visitors by appointment. Come see the craft in action, meet our artisans, and discover the magic of handmade jewelry.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <AtelierButton href="/atelier/contact">Book a Visit</AtelierButton>
              <AtelierButton variant="secondary" href="/atelier/bespoke">Begin a Commission</AtelierButton>
            </div>
          </div>
        </RevealSection>
      </AtelierSection>
    </AtelierLayout>
  )
}
