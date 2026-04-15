'use client'
import React from 'react'
import Image from 'next/image'
import { TH, TheaterSection, RevealSection, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton } from '../ui'
import { getBestsellers } from '@/data/products'
import { Minus, Plus, X } from 'lucide-react'

export function TheaterCart() {
  const items = getBestsellers().slice(0, 2)
  const subtotal = items.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <ActLabel label="Your Selection" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text }}>Shopping Cart</h1>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
          <div>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 24, padding: '24px 0', borderBottom: `1px solid ${TH.border}`, alignItems: 'center' }}>
                <div style={{ position: 'relative', height: 120, background: TH.card, overflow: 'hidden' }}>
                  <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, color: TH.text, margin: '0 0 4px' }}>{item.name}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.textSecondary, margin: '0 0 12px' }}>{item.subtitle}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: TH.card, border: `1px solid ${TH.border}`, color: TH.text, cursor: 'pointer' }}><Minus size={12} /></button>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.text }}>1</span>
                    <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: TH.card, border: `1px solid ${TH.border}`, color: TH.text, cursor: 'pointer' }}><Plus size={12} /></button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: TH.gold, marginBottom: 8 }}>${item.price.toLocaleString()}</div>
                  <button style={{ background: 'none', border: 'none', color: TH.textSecondary, cursor: 'pointer' }}><X size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: TH.card, border: `1px solid ${TH.border}`, padding: 32 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: TH.text, margin: '0 0 24px' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary }}>Subtotal</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', color: TH.text }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary }}>Insured Shipping</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.gold }}>Complimentary</span>
            </div>
            <GoldRule style={{ margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: TH.text }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: TH.gold }}>${subtotal.toLocaleString()}</span>
            </div>
            <TheaterButton href="/theater/checkout" fullWidth size="lg">Proceed to Checkout</TheaterButton>
          </div>
        </div>
      </TheaterSection>
    </>
  )
}
