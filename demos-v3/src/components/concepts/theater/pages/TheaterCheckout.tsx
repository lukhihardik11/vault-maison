'use client'
import React from 'react'
import { TH, TheaterSection, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton, TheaterInput } from '../ui'
import { Shield, Lock } from 'lucide-react'

export function TheaterCheckout() {
  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <ActLabel label="Secure Checkout" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text }}>Checkout</h1>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48 }}>
          <div>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, color: TH.text, margin: '0 0 20px' }}>Shipping Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <TheaterInput label="First Name" placeholder="First name" />
                <TheaterInput label="Last Name" placeholder="Last name" />
              </div>
              <TheaterInput label="Email" placeholder="your@email.com" type="email" />
              <TheaterInput label="Address" placeholder="Street address" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <TheaterInput label="City" placeholder="City" />
                <TheaterInput label="State" placeholder="State" />
                <TheaterInput label="ZIP" placeholder="ZIP" />
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, color: TH.text, margin: '0 0 20px' }}>Payment</h2>
              <TheaterInput label="Card Number" placeholder="1234 5678 9012 3456" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <TheaterInput label="Expiry" placeholder="MM/YY" />
                <TheaterInput label="CVC" placeholder="123" />
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: TH.card, border: `1px solid ${TH.border}`, padding: 32, position: 'sticky', top: 100 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: TH.text, margin: '0 0 24px' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary }}>2 items</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', color: TH.text }}>$24,500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary }}>Insured Shipping</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.gold }}>Complimentary</span>
              </div>
              <GoldRule style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: TH.text }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: TH.gold }}>$24,500</span>
              </div>
              <TheaterButton fullWidth size="lg"><Lock size={14} /> Complete Purchase</TheaterButton>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                <Shield size={12} color={TH.gold} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.textSecondary }}>256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </TheaterSection>
    </>
  )
}
