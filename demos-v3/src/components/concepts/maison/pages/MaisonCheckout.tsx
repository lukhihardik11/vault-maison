'use client'
import React from 'react'
import { MS, MaisonSection, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton, MaisonInput } from '../ui'
import { Shield, Lock } from 'lucide-react'

export function MaisonCheckout() {
  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Secure Checkout" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: MS.text }}>Checkout</h1>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48 }}>
          <div>
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: MS.text, margin: '0 0 16px' }}>Shipping Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MaisonInput label="First Name" placeholder="First name" />
                <MaisonInput label="Last Name" placeholder="Last name" />
              </div>
              <MaisonInput label="Email" placeholder="your@email.com" type="email" />
              <MaisonInput label="Address" placeholder="Street address" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <MaisonInput label="City" placeholder="City" />
                <MaisonInput label="State" placeholder="State" />
                <MaisonInput label="ZIP" placeholder="ZIP" />
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: MS.text, margin: '0 0 16px' }}>Payment</h2>
              <MaisonInput label="Card Number" placeholder="1234 5678 9012 3456" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MaisonInput label="Expiry" placeholder="MM/YY" />
                <MaisonInput label="CVC" placeholder="123" />
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, padding: 28, position: 'sticky', top: 100 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: MS.text, margin: '0 0 20px' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary }}>2 items</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MS.text }}>$24,500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary }}>Shipping</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.success }}>Complimentary</span>
              </div>
              <GoldDivider style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, color: MS.text }}>Total</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.3rem', fontWeight: 600, color: MS.accent }}>$24,500</span>
              </div>
              <MaisonButton fullWidth size="lg"><Lock size={14} /> Complete Order</MaisonButton>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 12 }}>
                <Shield size={12} color={MS.accent} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MS.textSecondary }}>Secure checkout • SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </MaisonSection>
    </>
  )
}
