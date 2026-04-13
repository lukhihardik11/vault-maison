'use client'

import React, { useState } from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'

function GInput({ label, placeholder, type = 'text', required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent, marginBottom: 8 }}>
        {label}{required && ' *'}
      </label>
      <input type={type} placeholder={placeholder} required={required}
        style={{
          width: '100%', padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
          color: G.text, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 0,
          outline: 'none', transition: 'border-color 0.3s',
        }} />
    </div>
  )
}

export function GalleryCheckout() {
  const { items, getTotal } = useCartStore()
  const [step, setStep] = useState(1)

  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 140px', maxWidth: 1100, margin: '0 auto' }}>
        <MuseumCaption>Secure Checkout</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, color: G.text, margin: '12px 0 48px' }}>
          Complete Your Acquisition
        </h1>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 32, marginBottom: 48 }}>
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <button key={s} onClick={() => setStep(i + 1)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0',
                fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: step === i + 1 ? G.accent : G.caption,
                borderBottom: step === i + 1 ? `2px solid ${G.accent}` : '2px solid transparent',
                transition: 'all 0.3s',
              }}>
              {i + 1}. {s}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 64 }}>
          {/* Form */}
          <div>
            {step === 1 && (
              <>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 24px' }}>Shipping Address</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <GInput label="First Name" placeholder="First name" required />
                  <GInput label="Last Name" placeholder="Last name" required />
                </div>
                <GInput label="Email" placeholder="email@example.com" type="email" required />
                <GInput label="Address" placeholder="Street address" required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <GInput label="City" placeholder="City" required />
                  <GInput label="State" placeholder="State" />
                  <GInput label="Postal Code" placeholder="Zip" required />
                </div>
                <div style={{ marginTop: 16 }}>
                  <GalleryButton onClick={() => setStep(2)}>Continue to Payment</GalleryButton>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 24px' }}>Payment Details</h2>
                <GInput label="Card Number" placeholder="1234 5678 9012 3456" required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <GInput label="Expiry" placeholder="MM / YY" required />
                  <GInput label="CVV" placeholder="123" required />
                </div>
                <GInput label="Name on Card" placeholder="Full name" required />
                <div style={{ marginTop: 16 }}>
                  <GalleryButton onClick={() => setStep(3)}>Review Order</GalleryButton>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 24px' }}>Review Your Order</h2>
                {items.map((item) => (
                  <div key={item.product.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${G.border}` }}>
                    <div style={{ width: 60, height: 60, background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={item.product.images[0]} alt={item.product.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.85rem', color: G.text, margin: 0 }}>{item.product.name}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: G.textSecondary, margin: '4px 0 0' }}>Qty: {item.quantity}</p>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.text }}>{item.product.priceDisplay}</p>
                  </div>
                ))}
                <div style={{ marginTop: 32 }}>
                  <GalleryButton>Place Order</GalleryButton>
                </div>
              </>
            )}
          </div>

          {/* Order summary sidebar */}
          <div style={{ padding: 32, background: G.surface, border: `1px solid ${G.border}`, alignSelf: 'start' }}>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.95rem', fontWeight: 400, color: G.text, margin: '0 0 24px' }}>Order Summary</h3>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.textSecondary }}>{item.product.name} × {item.quantity}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.text }}>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
            <div style={{ height: 1, background: G.border, margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.textSecondary }}>Shipping</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.accent }}>Complimentary</span>
            </div>
            <div style={{ height: 1, background: G.border, margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.95rem', color: G.text }}>Total</span>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', color: G.text }}>{formatPrice(getTotal())}</span>
            </div>
          </div>
        </div>
      </section>
    </GalleryLayout>
  )
}
