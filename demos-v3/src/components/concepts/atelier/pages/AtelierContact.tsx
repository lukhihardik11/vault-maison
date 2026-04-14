'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { AtelierInput } from '../ui/AtelierInput'

export function AtelierContact() {
  return (
    <AtelierLayout>
      {/* ═══ HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '40vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/atelier-interior.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.4)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '72px 32px 60px' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
            Get in Touch
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#FEFCF8', margin: '0 0 16px' }}>
            Visit the Workshop
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'rgba(232,226,216,0.8)', lineHeight: 1.7 }}>
            We welcome conversations about bespoke commissions, workshop visits, or simply the art of making.
          </p>
        </div>
      </section>

      {/* ═══ FORM + INFO ═══ */}
      <AtelierSection style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80 }}>
          {/* Left: Form */}
          <RevealSection>
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                Send a Message
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, margin: '0 0 8px' }}>
                We&apos;d Love to Hear from You
              </h2>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7, marginBottom: 32 }}>
                Whether you&apos;re interested in a bespoke commission, a workshop visit, or simply have a question about our craft.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <AtelierInput label="Name" placeholder="Your name" required />
                <AtelierInput label="Email" placeholder="your@email.com" type="email" required />
              </div>
              <AtelierInput label="Subject" placeholder="What brings you to the workshop?" />
              <AtelierInput label="Message" placeholder="Tell us about your vision, question, or visit request..." multiline rows={5} />
              <AtelierButton style={{ marginTop: 8 }}>Send Message</AtelierButton>
            </div>
          </RevealSection>

          {/* Right: Info */}
          <RevealSection delay={200}>
            <div>
              <div style={{
                background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
                overflow: 'hidden', boxShadow: `inset 0 1px 2px ${A.shadow}`,
                marginBottom: 24,
              }}>
                {/* Workshop photo */}
                <div style={{
                  height: 180,
                  backgroundImage: 'url(/images/atelier/workshop-interior.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  borderBottom: `1px dashed ${A.sketch}`,
                }} />
                <div style={{ padding: '28px 32px' }}>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
                    The Workshop
                  </div>
                  <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.ink, lineHeight: 1.8 }}>
                    42 Hatton Garden<br />London EC1N 8EB<br />United Kingdom
                  </p>
                  <WarmDivider style={{ maxWidth: '100%', margin: '16px 0' }} />
                  <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.8 }}>
                    <strong style={{ color: A.ink }}>Hours</strong><br />
                    Monday – Friday: 9am – 6pm<br />
                    Saturday: 10am – 4pm<br />
                    Sunday: By appointment
                  </p>
                  <WarmDivider style={{ maxWidth: '100%', margin: '16px 0' }} />
                  <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.8 }}>
                    <strong style={{ color: A.ink }}>Contact</strong><br />
                    atelier@vaultmaison.com<br />
                    +44 (0)20 7242 1987
                  </p>
                </div>
              </div>

              <div style={{
                padding: '16px 20px', background: 'rgba(139,105,20,0.04)',
                border: `1px dashed ${A.gold}40`, borderRadius: 2,
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: A.gold }}>
                  Workshop visits by appointment preferred — we want to give you our full attention.
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
