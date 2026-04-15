'use client'
import React from 'react'
import { MK, MarketplaceSection, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton, MarketplaceInput } from '../ui'
import { Shield, Lock } from 'lucide-react'

export function MarketplaceCheckout() {
  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Secure Checkout" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text }}>Checkout</h1>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48 }}>
          <div>
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Shipping Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MarketplaceInput label="First Name" placeholder="First name" />
                <MarketplaceInput label="Last Name" placeholder="Last name" />
              </div>
              <MarketplaceInput label="Email" placeholder="your@email.com" type="email" />
              <MarketplaceInput label="Address" placeholder="Street address" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <MarketplaceInput label="City" placeholder="City" />
                <MarketplaceInput label="State" placeholder="State" />
                <MarketplaceInput label="ZIP" placeholder="ZIP" />
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Payment</h2>
              <MarketplaceInput label="Card Number" placeholder="1234 5678 9012 3456" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MarketplaceInput label="Expiry" placeholder="MM/YY" />
                <MarketplaceInput label="CVC" placeholder="123" />
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 28, position: 'sticky', top: 100 }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: MK.text, margin: '0 0 20px' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary }}>2 items</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text }}>$24,500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary }}>Insured Shipping</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.success }}>Complimentary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary }}>Buyer&apos;s Premium (15%)</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text }}>$3,675</span>
              </div>
              <LotDivider style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: MK.text }}>Total</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: MK.accent }}>$28,175</span>
              </div>
              <MarketplaceButton fullWidth size="lg"><Lock size={14} /> Complete Purchase</MarketplaceButton>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 12 }}>
                <Shield size={12} color={MK.accent} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MK.textSecondary }}>256-bit SSL • Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>
      </MarketplaceSection>
    </>
  )
}
