'use client'
import React from 'react'
import Link from 'next/link'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

const sampleItems = [
  { name: 'Celestial Solitaire Ring', artisan: 'Elena M.', price: 4200, qty: 1, material: '18K White Gold, 1.2ct Diamond' },
  { name: 'Heritage Chain Necklace', artisan: 'Thomas A.', price: 2800, qty: 1, material: '18K Yellow Gold' },
]

export function AtelierCart() {
  const subtotal = sampleItems.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <AtelierLayout>
      <AtelierSection style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
              Workshop Bag
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 8px' }}>
              Your Selections
            </h1>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, marginBottom: 40 }}>
              {sampleItems.length} piece{sampleItems.length !== 1 ? 's' : ''} selected from our workshop
            </p>
          </RevealSection>

          {sampleItems.map((item, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '28px 24px', marginBottom: 16,
                background: A.surface,
                border: `1px dashed ${A.sketch}`, borderRadius: 2,
                boxShadow: `inset 0 1px 2px ${A.shadow}`,
              }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div style={{
                    width: 80, height: 80, background: A.workshop, borderRadius: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px dashed ${A.sketch}`,
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={A.sketch} strokeWidth="1"><path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: A.ink }}>{item.name}</div>
                    <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold, marginBottom: 4 }}>Crafted by {item.artisan}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.textSoft }}>{item.material}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 500, color: A.accent }}>
                    £{item.price.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.textSoft, marginTop: 4 }}>
                    Qty: {item.qty}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}

          <RevealSection delay={300}>
            <WarmDivider style={{ maxWidth: '100%', margin: '24px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft }}>Subtotal</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink }}>£{subtotal.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <AtelierButton variant="secondary" href="/atelier/collections">Continue Browsing</AtelierButton>
              <AtelierButton href="/atelier/checkout" style={{ flex: 1 }}>Proceed to Checkout</AtelierButton>
            </div>

            {/* Trust signals */}
            <div style={{
              marginTop: 40, padding: '20px 24px',
              background: 'rgba(139,105,20,0.03)',
              border: `1px dashed ${A.gold}30`, borderRadius: 2,
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center',
            }}>
              {[
                { icon: '✦', text: 'Complimentary gift wrapping' },
                { icon: '◇', text: 'Certificate of authenticity' },
                { icon: '♡', text: 'Lifetime care guarantee' },
              ].map((t, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: A.gold, marginBottom: 4 }}>{t.icon}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.textSoft, letterSpacing: '0.04em' }}>{t.text}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
