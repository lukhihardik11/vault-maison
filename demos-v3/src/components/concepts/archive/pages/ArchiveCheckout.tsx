'use client'
import React, { useState } from 'react'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'
import { ArchiveButton, ArchiveInput } from '../ui'
import { Shield, Lock, FileText } from 'lucide-react'

import { formatPrice } from '@/data/products'

export function ArchiveCheckout() {
  const total = 17000
  const items = [
    { name: 'Art Deco Diamond Solitaire', price: 12800 },
    { name: 'Victorian Gold Locket Necklace', price: 4200 },
  ]
  const [step, setStep] = useState(0)
  const steps = ['Shipping', 'Payment', 'Confirmation']

  return (
    <>
      <section style={{ background: AR.bg, padding: '48px 32px 24px', borderBottom: `1px solid ${AR.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>
            SECURE ACQUISITION
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text, marginBottom: 24 }}>
            Checkout
          </h1>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 32 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i <= step ? AR.accent : 'transparent',
                  border: `1px solid ${i <= step ? AR.accent : AR.border}`,
                  color: i <= step ? '#1E1614' : AR.textSecondary,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', fontWeight: 600,
                }}>
                  {i + 1}
                </div>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.08em',
                  color: i <= step ? AR.accent : AR.textSecondary,
                }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48 }}>
          <div>
            {step === 0 && (
              <RevealSection>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 500, color: AR.text, marginBottom: 24 }}>
                  Shipping Information
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <ArchiveInput label="First Name" placeholder="First name" />
                    <ArchiveInput label="Last Name" placeholder="Last name" />
                  </div>
                  <ArchiveInput label="Address" placeholder="Street address" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <ArchiveInput label="City" placeholder="City" />
                    <ArchiveInput label="State" placeholder="State" />
                    <ArchiveInput label="Zip Code" placeholder="Zip" />
                  </div>
                  <ArchiveInput label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
                  <ArchiveButton onClick={() => setStep(1)}>Continue to Payment</ArchiveButton>
                </div>
              </RevealSection>
            )}
            {step === 1 && (
              <RevealSection>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 500, color: AR.text, marginBottom: 24 }}>
                  Payment Details
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <ArchiveInput label="Card Number" placeholder="4242 4242 4242 4242" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <ArchiveInput label="Expiry" placeholder="MM/YY" />
                    <ArchiveInput label="CVC" placeholder="123" />
                  </div>
                  <ArchiveInput label="Name on Card" placeholder="Full name" />
                  <div style={{ display: 'flex', gap: 12 }}>
                    <ArchiveButton variant="secondary" onClick={() => setStep(0)}>Back</ArchiveButton>
                    <ArchiveButton onClick={() => setStep(2)} style={{ flex: 1 }}>Complete Acquisition</ArchiveButton>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                  <Lock size={14} color={AR.accent} />
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.textSecondary }}>
                    256-bit SSL encrypted transaction
                  </span>
                </div>
              </RevealSection>
            )}
            {step === 2 && (
              <RevealSection>
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(76,175,80,0.1)', border: '2px solid #4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Shield size={28} color="#4CAF50" />
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text, marginBottom: 12 }}>
                    Acquisition Complete
                  </h2>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, marginBottom: 24 }}>
                    Your authenticated pieces will be prepared with full documentation and shipped via insured courier.
                  </p>
                  <ArchiveButton href="/archive">Return to Archive</ArchiveButton>
                </div>
              </RevealSection>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '24px', alignSelf: 'start' }}>
            <h3 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>
              ORDER SUMMARY
            </h3>
            {items.map((item) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${AR.border}` }}>
                <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.text }}>{item.name}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: AR.text }}>{formatPrice(item.price)}</span>
              </div>
            ))}
            <GoldRule style={{ margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", color: AR.text }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: AR.accent, fontWeight: 600 }}>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16 }}>
              <FileText size={12} color={AR.accent} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: AR.textSecondary }}>
                Certificate of authenticity included
              </span>
            </div>
          </div>
        </div>
      </ArchiveSection>
    </>
  )
}
