'use client'
import React from 'react'
import Image from 'next/image'
import { MS, MaisonSection, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton } from '../ui'
import { getBestsellers } from '@/data/products'
import { Minus, Plus, X, Shield, Gift } from 'lucide-react'

export function MaisonCart() {
  const items = getBestsellers().slice(0, 2)
  const subtotal = items.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Shopping" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: MS.text }}>Your Collection</h1>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
          <div>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 20, padding: '20px 0', borderBottom: `1px solid ${MS.border}`, alignItems: 'center' }}>
                <div style={{ position: 'relative', height: 100, borderRadius: 4, overflow: 'hidden' }}>
                  <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: MS.text, margin: '0 0 4px' }}>{item.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MS.textSecondary, margin: '0 0 10px' }}>{item.subtitle}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: MS.bgAlt, border: `1px solid ${MS.border}`, borderRadius: 3, color: MS.text, cursor: 'pointer' }}><Minus size={12} /></button>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.text }}>1</span>
                    <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: MS.bgAlt, border: `1px solid ${MS.border}`, borderRadius: 3, color: MS.text, cursor: 'pointer' }}><Plus size={12} /></button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', fontWeight: 600, color: MS.accent, marginBottom: 8 }}>${item.price.toLocaleString()}</div>
                  <button style={{ background: 'none', border: 'none', color: MS.textSecondary, cursor: 'pointer' }}><X size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, padding: 28 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: MS.text, margin: '0 0 20px' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary }}>Subtotal</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MS.text }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary }}>Shipping</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.success }}>Complimentary</span>
            </div>
            <GoldDivider style={{ margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, color: MS.text }}>Total</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.2rem', fontWeight: 600, color: MS.accent }}>${subtotal.toLocaleString()}</span>
            </div>
            <MaisonButton href="/maison/checkout" fullWidth size="lg">Proceed to Checkout</MaisonButton>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 12 }}>
              <Gift size={12} color={MS.accent} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MS.textSecondary }}>Complimentary gift wrapping</span>
            </div>
          </div>
        </div>
      </MaisonSection>
    </>
  )
}
