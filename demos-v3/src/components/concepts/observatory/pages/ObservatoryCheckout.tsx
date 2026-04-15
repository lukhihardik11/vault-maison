'use client'
import React from 'react'
import { OB, ObservatorySection, RevealSection, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton, ObservatoryInput } from '../ui'
import { Shield, Lock, CreditCard } from 'lucide-react'

export function ObservatoryCheckout() {
  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>SECURE CHECKOUT</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: '12px 0 0' }}>Complete Your Acquisition</h1>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <RevealSection>
              <ScanLine label="Shipping Information" style={{ marginBottom: 24 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <ObservatoryInput label="First Name" placeholder="First name" />
                <ObservatoryInput label="Last Name" placeholder="Last name" />
              </div>
              <ObservatoryInput label="Email" type="email" placeholder="your@email.com" />
              <ObservatoryInput label="Address" placeholder="Street address" />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
                <ObservatoryInput label="City" placeholder="City" />
                <ObservatoryInput label="State" placeholder="State" />
                <ObservatoryInput label="ZIP" placeholder="ZIP" />
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <ScanLine label="Payment Method" style={{ marginBottom: 24, marginTop: 32 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '12px 16px', background: OB.card, border: `1px solid ${OB.border}` }}>
                <CreditCard size={16} color={OB.accent} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.text }}>Credit / Debit Card</span>
              </div>
              <ObservatoryInput label="Card Number" placeholder="4242 4242 4242 4242" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <ObservatoryInput label="Expiry" placeholder="MM/YY" />
                <ObservatoryInput label="CVC" placeholder="123" />
              </div>
            </RevealSection>
          </div>

          <RevealSection delay={300}>
            <div style={{ background: OB.surface, border: `1px solid ${OB.border}`, padding: 32, position: 'sticky', top: 96 }}>
              <ScanLine label="Order Review" style={{ marginBottom: 24 }} />
              <div style={{ padding: '16px 0', borderBottom: `1px solid ${OB.border}`, marginBottom: 16 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: OB.text }}>Celestial Solitaire Ring</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary }}>1.50ct, D/VS1, Excellent Cut</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 600, color: OB.accent, marginTop: 4 }}>$12,500</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary }}>Subtotal</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: OB.text }}>$12,500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary }}>Insured Shipping</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.success }}>Free</span>
              </div>
              <div style={{ height: 1, background: OB.border, margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 500, color: OB.text }}>Total</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', fontWeight: 600, color: OB.accent }}>$12,500</span>
              </div>
              <ObservatoryButton fullWidth size="lg">
                <Lock size={14} /> Complete Acquisition
              </ObservatoryButton>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 16 }}>
                <Shield size={12} color={OB.success} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.textSecondary }}>256-bit SSL Encrypted</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </ObservatorySection>
    </>
  )
}
