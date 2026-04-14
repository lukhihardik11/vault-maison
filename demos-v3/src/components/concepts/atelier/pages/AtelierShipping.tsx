'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'

const shippingInfo = [
  { region: 'United Kingdom', time: '1–2 business days', cost: 'Complimentary', method: 'Royal Mail Special Delivery, fully insured' },
  { region: 'Europe', time: '3–5 business days', cost: 'Complimentary over £1,000', method: 'DHL Express, fully insured' },
  { region: 'United States & Canada', time: '5–7 business days', cost: 'Complimentary over £2,000', method: 'FedEx International Priority, fully insured' },
  { region: 'Rest of World', time: '7–14 business days', cost: 'Calculated at checkout', method: 'DHL Express, fully insured' },
]

export function AtelierShipping() {
  return (
    <AtelierLayout>
      <AtelierSection style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>Delivery</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 12px' }}>Shipping & Delivery</h1>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
              Every piece leaves our workshop in bespoke packaging, fully insured and tracked from bench to doorstep.
            </p>
          </div>
        </RevealSection>
      </AtelierSection>

      <AtelierSection alt style={{ padding: '48px 32px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {shippingInfo.map((s, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div style={{
                padding: '28px 24px', marginBottom: 16,
                background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
                boxShadow: `inset 0 1px 2px ${A.shadow}`,
                display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 16, alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: A.ink }}>{s.region}</div>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft, marginTop: 4 }}>{s.method}</div>
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: A.textSoft }}>{s.time}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, color: A.accent, textAlign: 'right' }}>{s.cost}</div>
              </div>
            </RevealSection>
          ))}

          <RevealSection delay={400}>
            <div style={{
              marginTop: 32, padding: '28px 32px',
              background: 'rgba(139,105,20,0.03)',
              border: `1px dashed ${A.gold}30`, borderRadius: 2,
            }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: A.gold, marginBottom: 8 }}>A note on packaging</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7 }}>
                Each piece is presented in our signature linen-wrapped workshop box, accompanied by a certificate of authenticity, care guide, and a handwritten note from your artisan.
              </p>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
