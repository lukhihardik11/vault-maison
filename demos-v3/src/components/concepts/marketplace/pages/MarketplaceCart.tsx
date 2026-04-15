'use client'
import React from 'react'
import Image from 'next/image'
import { MK, MarketplaceSection, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton } from '../ui'
import { getBestsellers } from '@/data/products'
import { Minus, Plus, X, Shield } from 'lucide-react'

export function MarketplaceCart() {
  const items = getBestsellers().slice(0, 2)
  const subtotal = items.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Your Cart" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text }}>Shopping Cart</h1>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
          <div>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 20, padding: '20px 0', borderBottom: `1px solid ${MK.border}`, alignItems: 'center' }}>
                <div style={{ position: 'relative', height: 100, borderRadius: 4, overflow: 'hidden' }}>
                  <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MK.text, margin: '0 0 4px' }}>{item.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, margin: '0 0 10px' }}>{item.subtitle}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: MK.surface, border: `1px solid ${MK.border}`, borderRadius: 3, color: MK.text, cursor: 'pointer' }}><Minus size={12} /></button>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.text }}>1</span>
                    <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: MK.surface, border: `1px solid ${MK.border}`, borderRadius: 3, color: MK.text, cursor: 'pointer' }}><Plus size={12} /></button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: MK.accent, marginBottom: 8 }}>${item.price.toLocaleString()}</div>
                  <button style={{ background: 'none', border: 'none', color: MK.textSecondary, cursor: 'pointer' }}><X size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 28 }}>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: MK.text, margin: '0 0 20px' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary }}>Subtotal</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary }}>Insured Shipping</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.success }}>Complimentary</span>
            </div>
            <LotDivider style={{ margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: MK.text }}>Total</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: MK.accent }}>${subtotal.toLocaleString()}</span>
            </div>
            <MarketplaceButton href="/marketplace/checkout" fullWidth size="lg">Proceed to Checkout</MarketplaceButton>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 12 }}>
              <Shield size={12} color={MK.accent} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MK.textSecondary }}>Buyer Protection Guaranteed</span>
            </div>
          </div>
        </div>
      </MarketplaceSection>
    </>
  )
}
