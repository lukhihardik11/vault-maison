'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { VaultLayout } from '../VaultLayout'
import { Shield, Lock, Check } from 'lucide-react'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.03)',
  border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 14, outline: 'none',
}

export function VaultCheckout() {
  const { items, getTotal } = useCartStore()
  const [step, setStep] = useState(1)

  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '100px 24px 80px' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 400, color: TEXT, marginBottom: 40 }}>Checkout</h1>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 32, marginBottom: 48 }}>
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: step > i + 1 ? GOLD : step === i + 1 ? 'rgba(212,175,55,0.15)' : 'transparent',
                border: step >= i + 1 ? `1px solid ${GOLD}` : `1px solid ${MUTED}`,
                color: step > i + 1 ? BG : step === i + 1 ? GOLD : 'rgba(234,234,234,0.3)',
                fontSize: 12, fontWeight: 600,
              }}>
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 13, color: step >= i + 1 ? TEXT : 'rgba(234,234,234,0.3)', letterSpacing: '0.05em' }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60 }}>
          {/* Form */}
          <div>
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 500, color: TEXT, marginBottom: 24 }}>Shipping Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>First Name</label><input style={inputStyle} placeholder="First name" /></div>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Last Name</label><input style={inputStyle} placeholder="Last name" /></div>
                </div>
                <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Email</label><input style={inputStyle} placeholder="Email address" type="email" /></div>
                <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Phone</label><input style={inputStyle} placeholder="Phone number" type="tel" /></div>
                <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Address</label><input style={inputStyle} placeholder="Street address" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>City</label><input style={inputStyle} placeholder="City" /></div>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>State</label><input style={inputStyle} placeholder="State" /></div>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Zip</label><input style={inputStyle} placeholder="Zip code" /></div>
                </div>
                <button onClick={() => setStep(2)} style={{ marginTop: 32, padding: '16px 40px', backgroundColor: GOLD, color: BG, border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Continue to Payment
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 500, color: TEXT, marginBottom: 24 }}>Payment Details</h2>
                <div style={{ padding: 20, border: `1px solid ${MUTED}`, borderRadius: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><Lock size={14} color={GOLD} /><span style={{ fontSize: 12, color: 'rgba(234,234,234,0.5)' }}>Encrypted & Secure</span></div>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Card Number</label><input style={inputStyle} placeholder="1234 5678 9012 3456" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                    <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Expiry</label><input style={inputStyle} placeholder="MM/YY" /></div>
                    <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>CVC</label><input style={inputStyle} placeholder="123" /></div>
                  </div>
                  <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Name on Card</label><input style={inputStyle} placeholder="Full name" /></div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <button onClick={() => setStep(1)} style={{ padding: '16px 32px', backgroundColor: 'transparent', border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 13, cursor: 'pointer' }}>Back</button>
                  <button onClick={() => setStep(3)} style={{ padding: '16px 40px', backgroundColor: GOLD, color: BG, border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>Review Order</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 500, color: TEXT, marginBottom: 24 }}>Review Your Order</h2>
                {items.map((item) => (
                  <div key={item.product.id} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: `1px solid ${MUTED}` }}>
                    <div style={{ width: 80, height: 80, borderRadius: 6, overflow: 'hidden', backgroundColor: SURFACE }}>
                      <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: TEXT }}>{item.product.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontSize: 14, fontFamily: 'Cinzel, serif', color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                  <button onClick={() => setStep(2)} style={{ padding: '16px 32px', backgroundColor: 'transparent', border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 13, cursor: 'pointer' }}>Back</button>
                  <button style={{ padding: '16px 40px', backgroundColor: GOLD, color: BG, border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>Place Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{ padding: 32, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)', height: 'fit-content', position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, color: TEXT, marginBottom: 24 }}>Summary</h3>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)' }}>{item.product.name} x{item.quantity}</span>
                <span style={{ fontSize: 13, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${MUTED}`, paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.5)' }}>Shipping</span>
              <span style={{ fontSize: 14, color: GOLD }}>Complimentary</span>
            </div>
            <div style={{ borderTop: `1px solid ${MUTED}`, paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: TEXT }}>Total</span>
              <span style={{ fontSize: 20, fontFamily: 'Cinzel, serif', color: TEXT }}>${getTotal().toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
              <Shield size={14} color={GOLD} />
              <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.4)' }}>256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
