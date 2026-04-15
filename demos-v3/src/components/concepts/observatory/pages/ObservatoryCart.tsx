'use client'
import React from 'react'
import Image from 'next/image'
import { OB, ObservatorySection, RevealSection, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton, CertificationBadge } from '../ui'
import { getBestsellers } from '@/data/products'
import { Trash2, Plus, Minus, Shield, Truck } from 'lucide-react'

export function ObservatoryCart() {
  const cartItems = getBestsellers().slice(0, 2)
  const subtotal = cartItems.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>YOUR COLLECTION</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: '12px 0 0' }}>Cart ({cartItems.length})</h1>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          <div>
            {cartItems.map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 24, padding: '24px 0', borderBottom: `1px solid ${OB.border}`, alignItems: 'center' }}>
                  <div style={{ position: 'relative', height: 120, background: OB.card }}>
                    <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>{item.name}</h3>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, margin: '0 0 8px' }}>{item.subtitle}</p>
                    <CertificationBadge type="observatory" size="sm" />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 600, color: OB.accent }}>${item.price.toLocaleString()}</div>
                    <button style={{ background: 'none', border: 'none', color: OB.textSecondary, cursor: 'pointer', marginTop: 8 }}><Trash2 size={14} /></button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200}>
            <div style={{ background: OB.surface, border: `1px solid ${OB.border}`, padding: 32, position: 'sticky', top: 96 }}>
              <ScanLine label="Order Summary" style={{ marginBottom: 24 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary }}>Subtotal</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: OB.text }}>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary }}>Shipping</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.success }}>Complimentary</span>
              </div>
              <div style={{ height: 1, background: OB.border, margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text }}>Total</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: OB.accent }}>${subtotal.toLocaleString()}</span>
              </div>
              <ObservatoryButton href="/observatory/checkout" fullWidth size="lg">Proceed to Checkout</ObservatoryButton>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, justifyContent: 'center' }}>
                <Shield size={12} color={OB.success} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>Secure & Insured Transaction</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </ObservatorySection>
    </>
  )
}
