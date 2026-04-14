'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { CommissionWizard } from '../ui/CommissionWizard'
import { AtelierButton } from '../ui/AtelierButton'

const testimonials = [
  { text: 'The commission process was extraordinary. Elena understood my vision from the very first sketch and created something beyond my imagination.', name: 'Sarah L.', piece: 'Bespoke Engagement Ring', location: 'London' },
  { text: 'Working with The Atelier was a deeply personal experience. Every step was transparent, and the final piece brought tears to my eyes.', name: 'James & Claire M.', piece: 'Wedding Band Set', location: 'Edinburgh' },
  { text: 'I wanted to redesign my grandmother\'s brooch. Thomas preserved its soul while giving it a completely new life. Masterful work.', name: 'Priya K.', piece: 'Heritage Redesign', location: 'Mumbai' },
]

export function AtelierBespoke() {
  return (
    <AtelierLayout>
      {/* ═══ HERO with workshop photo ═══ */}
      <section style={{
        position: 'relative', minHeight: '50vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/jewelry-sketch.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.4)' }} />
        <div style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '72px 32px 60px' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
            Bespoke Commission
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 300, color: '#FEFCF8', margin: '0 0 20px', lineHeight: 1.15 }}>
            Your Piece, Your Story
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'rgba(232,226,216,0.8)', lineHeight: 1.8 }}>
            Every masterpiece begins with a conversation. Walk through our 6-step commission process and let our master artisans bring your vision to life.
          </p>
        </div>
      </section>

      {/* ═══ COMMISSION WIZARD ═══ */}
      <AtelierSection style={{ padding: '80px 32px 100px' }}>
        <RevealSection>
          <CommissionWizard />
        </RevealSection>
      </AtelierSection>

      {/* ═══ TESTIMONIALS ═══ */}
      <AtelierSection alt style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                Client Stories
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 400, color: A.ink, margin: 0 }}>
                Words from Our Clients
              </h2>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{
                  padding: '32px 28px', background: A.surface,
                  border: `1px dashed ${A.sketch}`, borderRadius: 2,
                  boxShadow: `inset 0 1px 2px ${A.shadow}`,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={A.gold} strokeWidth="0.8" style={{ marginBottom: 16, opacity: 0.5 }}>
                    <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
                  </svg>
                  <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.text, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <WarmDivider style={{ maxWidth: '100%', margin: '0 0 16px' }} />
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: A.ink, marginBottom: 4 }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold }}>
                    {t.piece} · {t.location}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </AtelierSection>

      {/* ═══ TRUST SIGNALS ═══ */}
      <AtelierSection dark style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {[
            { num: '500+', label: 'Bespoke pieces delivered' },
            { num: '37', label: 'Years of craft expertise' },
            { num: '98%', label: 'Client satisfaction rate' },
            { num: '4–12', label: 'Weeks typical timeline' },
          ].map((s, i) => (
            <StaggerItem key={i} index={i}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: A.gold, marginBottom: 8 }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,226,216,0.6)' }}>
                  {s.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </AtelierSection>

      {/* ═══ CONTACT CTA ═══ */}
      <AtelierSection style={{ padding: '80px 32px' }}>
        <RevealSection>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, marginBottom: 16 }}>
              Prefer to Talk in Person?
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 28 }}>
              Visit our Hatton Garden workshop for a private consultation with one of our master artisans.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <AtelierButton href="/atelier/contact">Book a Visit</AtelierButton>
              <AtelierButton variant="secondary" href="/atelier/craftsmanship">Our Process</AtelierButton>
            </div>
          </div>
        </RevealSection>
      </AtelierSection>
    </AtelierLayout>
  )
}
