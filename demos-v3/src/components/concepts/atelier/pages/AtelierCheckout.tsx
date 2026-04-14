'use client'
import React, { useState } from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { AtelierInput } from '../ui/AtelierInput'

export function AtelierCheckout() {
  const [step, setStep] = useState<'details' | 'payment' | 'confirm'>('details')

  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Checkout
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 40px' }}>
            Complete Your Order
          </h1>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 48 }}>
            {(['details', 'payment', 'confirm'] as const).map((s, i) => (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 3, background: ['details', 'payment', 'confirm'].indexOf(step) >= i ? A.accent : A.border, borderRadius: 1, transition: 'background 0.4s', marginBottom: 8 }} />
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: ['details', 'payment', 'confirm'].indexOf(step) >= i ? A.accent : A.textSoft }}>
                  {s === 'details' ? 'Details' : s === 'payment' ? 'Payment' : 'Confirm'}
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
              <AtelierInput label="Address" placeholder="Street address" required />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <AtelierInput label="City" placeholder="City" required />
                <AtelierInput label="Postcode" placeholder="Postcode" required />
              </div>
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
              <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                <AtelierButton variant="ghost" onClick={() => setStep('details')}>← Back</AtelierButton>
                <AtelierButton onClick={() => setStep('confirm')}>Place Order</AtelierButton>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(139,105,20,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={A.accent} strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, marginBottom: 12 }}>Order Confirmed</h2>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
                Your piece is being prepared by our artisans. You&apos;ll receive a confirmation email shortly.
              </p>
              <AtelierButton href="/atelier" style={{ marginTop: 32 }}>Return to Workshop</AtelierButton>
            </div>
          )}
        </div>
      </section>
    </AtelierLayout>
  )
}
