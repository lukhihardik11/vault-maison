'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonInput } from '../ui/SalonInput'
import { SalonButton } from '../ui/SalonButton'
import { useCartStore } from '@/store/cart'
import { Shield, Lock } from 'lucide-react'

export function SalonCheckout() {
  const { items, getTotal } = useCartStore()

  return (
    <SalonLayout>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 32px 100px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: S.text, margin: '0 0 40px', textAlign: 'center' }}>Checkout</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: S.text, margin: '0 0 24px' }}>Delivery Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <SalonInput label="First Name" placeholder="Your first name" required />
              <SalonInput label="Last Name" placeholder="Your last name" required />
            </div>
            <SalonInput label="Email" type="email" placeholder="your@email.com" required />
            <SalonInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            <SalonInput label="Address" placeholder="Street address" required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <SalonInput label="City" placeholder="City" required />
              <SalonInput label="Postal Code" placeholder="Postal code" required />
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: S.text, margin: '32px 0 24px' }}>Payment</h2>
            <SalonInput label="Card Number" placeholder="1234 5678 9012 3456" required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <SalonInput label="Expiry" placeholder="MM/YY" required />
              <SalonInput label="CVC" placeholder="123" required />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.textSecondary }}>
              <Lock size={14} color={S.accent} /> Your payment is secured with 256-bit encryption
            </div>
          </div>

          {/* Order summary */}
          <div style={{ background: S.warmPanel, borderRadius: S.radiusLg, padding: '28px', position: 'sticky', top: 120, height: 'fit-content' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: S.text, margin: '0 0 20px' }}>Your Order</h3>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: S.radiusSm, overflow: 'hidden', background: S.surface, flexShrink: 0 }}>
                  <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: S.text, margin: '0 0 2px' }}>{item.product.name}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.textSecondary, margin: 0 }}>Qty: {item.quantity}</p>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: S.text }}>{item.product.priceDisplay}</p>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 16, marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary }}>
                <span>Subtotal</span><span>${getTotal().toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary }}>
                <span>Delivery</span><span>Complimentary</span>
              </div>
              <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: 500, color: S.text }}>
                <span>Total</span><span>${getTotal().toLocaleString()}</span>
              </div>
            </div>
            <SalonButton fullWidth style={{ marginTop: 24 }}>Place Order</SalonButton>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: S.textSecondary }}>
              <Shield size={12} color={S.accent} /> Secure & Encrypted
            </div>
          </div>
        </div>
      </section>
    </SalonLayout>
  )
}
