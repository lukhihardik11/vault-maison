'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'

const shippingInfo = [
  { region: 'United Kingdom', time: '1–2 business days', cost: 'Complimentary', method: 'Royal Mail Special Delivery, fully insured' },
  { region: 'Europe', time: '3–5 business days', cost: 'Complimentary over £1,000', method: 'DHL Express, fully insured' },
  { region: 'United States & Canada', time: '5–7 business days', cost: 'Complimentary over £2,000', method: 'FedEx International Priority, fully insured' },
  { region: 'Rest of World', time: '7–14 business days', cost: 'Calculated at checkout', method: 'DHL Express, fully insured' },
]

export function AtelierShipping() {
  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>Delivery</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>Shipping & Delivery</h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            Every piece leaves our workshop in bespoke packaging, fully insured and tracked from bench to doorstep.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {shippingInfo.map((s, i) => (
            <div key={i} style={{ padding: '24px 0', borderBottom: i < shippingInfo.length - 1 ? `1px solid ${A.border}` : 'none', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500, color: A.ink }}>{s.region}</div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft, marginTop: 4 }}>{s.method}</div>
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: A.textSoft }}>{s.time}</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, color: A.accent, textAlign: 'right' }}>{s.cost}</div>
            </div>
          ))}
          <div style={{ marginTop: 40, padding: 24, background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2 }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: A.accent, marginBottom: 8 }}>A note on packaging</div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7 }}>
              Each piece is presented in our signature linen-wrapped workshop box, accompanied by a certificate of authenticity, care guide, and a handwritten note from your artisan.
            </p>
          </div>
        </div>
      </section>
    </AtelierLayout>
  )
}
