'use client'
import React, { useState } from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { AtelierInput } from '../ui/AtelierInput'

export function AtelierCheckout() {
  const [step, setStep] = useState<'details' | 'payment' | 'confirm'>('details')
  const stepOrder = ['details', 'payment', 'confirm'] as const

  return (
    <AtelierLayout>
      <AtelierSection style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64 }}>
          {/* Left: Form */}
          <RevealSection>
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                Checkout
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 32px' }}>
                Complete Your Order
              </h1>

              {/* Progress */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
                {stepOrder.map((s, i) => (
                  <div key={s} style={{ flex: 1 }}>
                    <div style={{
                      height: 3, borderRadius: 1, transition: 'background 0.4s', marginBottom: 8,
                      background: stepOrder.indexOf(step) >= i ? A.accent : A.border,
                    }} />
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: stepOrder.indexOf(step) >= i ? A.accent : A.textSoft,
                    }}>
                      {s === 'details' ? '01 Details' : s === 'payment' ? '02 Payment' : '03 Confirm'}
                    </div>
                  </div>
                ))}
              </div>

              {step === 'details' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <AtelierInput label="First Name" placeholder="First name" required />
                    <AtelierInput label="Last Name" placeholder="Last name" required />
                  </div>
                  <AtelierInput label="Email" placeholder="your@email.com" type="email" required />
                  <AtelierInput label="Phone" placeholder="+44 (0)20 1234 5678" />
                  <AtelierInput label="Address" placeholder="Street address" required />
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                    <AtelierInput label="City" placeholder="City" required />
                    <AtelierInput label="Postcode" placeholder="Postcode" required />
                  </div>
                  <AtelierInput label="Special Instructions" placeholder="Gift message, delivery preferences..." multiline rows={3} />
                  <AtelierButton onClick={() => setStep('payment')} style={{ marginTop: 16 }}>Continue to Payment</AtelierButton>
                </div>
              )}

              {step === 'payment' && (
                <div>
                  <AtelierInput label="Card Number" placeholder="1234 5678 9012 3456" required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <AtelierInput label="Expiry" placeholder="MM/YY" required />
                    <AtelierInput label="CVC" placeholder="123" required />
                  </div>
                  <AtelierInput label="Name on Card" placeholder="As it appears on your card" required />
                  <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                    <AtelierButton variant="ghost" onClick={() => setStep('details')}>← Back</AtelierButton>
                    <AtelierButton onClick={() => setStep('confirm')} style={{ flex: 1 }}>Place Order</AtelierButton>
                  </div>
                </div>
              )}

              {step === 'confirm' && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(139,105,20,0.08)',
                    border: `1px dashed ${A.gold}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={A.accent} strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, marginBottom: 12 }}>
                    Order Confirmed
                  </h2>
                  <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 8 }}>
                    Your piece is being prepared by our artisans with the utmost care.
                  </p>
                  <p style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: A.gold, marginBottom: 32 }}>
                    You&apos;ll receive a confirmation email with tracking details shortly.
                  </p>
                  <AtelierButton href="/atelier">Return to Workshop</AtelierButton>
                </div>
              )}
            </div>
          </RevealSection>

          {/* Right: Order Summary */}
          <RevealSection delay={200}>
            <div style={{
              background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
              padding: '32px 28px', boxShadow: `inset 0 1px 2px ${A.shadow}`,
              position: 'sticky', top: 100,
            }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: A.accent, marginBottom: 20 }}>
                Order Summary
              </div>
              {[
                { name: 'Celestial Solitaire Ring', artisan: 'Elena M.', price: 4200 },
                { name: 'Heritage Chain Necklace', artisan: 'Thomas A.', price: 2800 },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px dashed ${A.sketch}30` }}>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 500, color: A.ink }}>{item.name}</div>
                    <div style={{ fontFamily: 'Caveat, cursive', fontSize: 13, color: A.gold }}>{item.artisan}</div>
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: A.accent }}>£{item.price.toLocaleString()}</div>
                </div>
              ))}
              <WarmDivider style={{ maxWidth: '100%', margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft }}>Subtotal</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: A.ink }}>£7,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft }}>Shipping</span>
                <span style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold }}>Complimentary</span>
              </div>
              <WarmDivider style={{ maxWidth: '100%', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: A.ink }}>Total</span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 400, color: A.ink }}>£7,000</span>
              </div>

              <div style={{ marginTop: 24, padding: '16px', background: 'rgba(139,105,20,0.03)', border: `1px dashed ${A.gold}30`, borderRadius: 2 }}>
                {[
                  'Certificate of authenticity',
                  'Complimentary gift wrapping',
                  'Insured delivery',
                  'Lifetime care guarantee',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 0' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={A.gold} strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.textSoft }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
