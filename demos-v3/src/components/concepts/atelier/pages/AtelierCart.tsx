'use client'
import React from 'react'
import Link from 'next/link'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

const sampleItems = [
  { name: 'Celestial Solitaire Ring', artisan: 'Elena M.', price: 4200, qty: 1 },
  { name: 'Heritage Chain Necklace', artisan: 'Thomas A.', price: 2800, qty: 1 },
]

export function AtelierCart() {
  const subtotal = sampleItems.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Workshop Bag
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 40px' }}>
            Your Selections
          </h1>

          {sampleItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '24px 0', borderBottom: `1px solid ${A.border}`,
            }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ width: 80, height: 80, background: A.workshop, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={A.sketch} strokeWidth="1"><path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500, color: A.ink }}>{item.name}</div>
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: 13, color: A.sketch }}>Crafted by {item.artisan}</div>
                </div>
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 500, color: A.accent }}>
                £{item.price.toLocaleString()}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', marginTop: 16 }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft }}>Subtotal</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 500, color: A.ink }}>£{subtotal.toLocaleString()}</span>
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
            <AtelierButton variant="secondary" href="/atelier/collections">Continue Browsing</AtelierButton>
            <AtelierButton href="/atelier/checkout">Proceed to Checkout</AtelierButton>
          </div>
        </div>
      </section>
    </AtelierLayout>
  )
}
