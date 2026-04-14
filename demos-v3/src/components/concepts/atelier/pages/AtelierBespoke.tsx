'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { CommissionWizard } from '../ui/CommissionWizard'

export function AtelierBespoke() {
  return (
    <AtelierLayout>
      {/* Hero */}
      <section style={{ padding: '80px 32px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Bespoke Commission
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 16px', lineHeight: 1.2 }}>
            Your Piece, Your Story
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            Every masterpiece begins with a conversation. Walk through our commission process and let our master artisans bring your vision to life.
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section style={{ padding: '0 32px 100px' }}>
        <CommissionWizard />
      </section>

      {/* Trust Signals */}
      <section style={{ padding: '60px 32px 80px', background: A.surface }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { num: '500+', label: 'Bespoke pieces delivered' },
            { num: '37', label: 'Years of craft expertise' },
            { num: '98%', label: 'Client satisfaction rate' },
            { num: '4–12', label: 'Weeks typical timeline' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.accent, marginBottom: 4 }}>
                {s.num}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', color: A.textSoft }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AtelierLayout>
  )
}
