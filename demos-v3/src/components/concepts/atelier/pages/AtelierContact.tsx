'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { AtelierInput } from '../ui/AtelierInput'

export function AtelierContact() {
  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          {/* Left: Form */}
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
              Get in Touch
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>
              Visit the Workshop
            </h1>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 40 }}>
              Whether you&apos;re interested in a bespoke commission, a workshop visit, or simply have a question about our craft, we&apos;d love to hear from you.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <AtelierInput label="Name" placeholder="Your name" required />
              <AtelierInput label="Email" placeholder="your@email.com" type="email" required />
            </div>
            <AtelierInput label="Subject" placeholder="What brings you to the workshop?" />
            <AtelierInput label="Message" placeholder="Tell us about your vision, question, or visit request..." multiline rows={5} />
            <AtelierButton style={{ marginTop: 8 }}>Send Message</AtelierButton>
          </div>

          {/* Right: Info */}
          <div>
            <div style={{ background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2, padding: 40, marginBottom: 32 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: A.accent, marginBottom: 20 }}>
                The Workshop
              </div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.ink, lineHeight: 1.8 }}>
                42 Hatton Garden<br />London EC1N 8EB<br />United Kingdom
              </p>
              <div style={{ width: '100%', height: 1, background: A.border, margin: '20px 0' }} />
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.8 }}>
                <strong style={{ color: A.ink }}>Hours</strong><br />
                Monday – Friday: 9am – 6pm<br />
                Saturday: 10am – 4pm<br />
                Sunday: By appointment
              </p>
              <div style={{ width: '100%', height: 1, background: A.border, margin: '20px 0' }} />
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.8 }}>
                <strong style={{ color: A.ink }}>Contact</strong><br />
                atelier@vaultmaison.com<br />
                +44 (0)20 7242 1987
              </p>
            </div>

            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: A.sketch, textAlign: 'center', padding: '16px 0' }}>
              Workshop visits by appointment preferred — we want to give you our full attention.
            </div>
          </div>
        </div>
      </section>
    </AtelierLayout>
  )
}
