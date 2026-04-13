'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { VaultLayout } from '../VaultLayout'
import { Shield, Lock, Check } from 'lucide-react'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultCheckout() {
  const { items, getTotal } = useCartStore()
  const [step, setStep] = useState(1)

  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '100px 24px 100px' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Secure Checkout</span>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 3.5vw, 34px)', fontWeight: 400, color: TEXT, marginTop: 8, marginBottom: 40 }}>Checkout</h1>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 32, marginBottom: 48 }}>
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: step > i + 1 ? GOLD : step === i + 1 ? 'rgba(212,175,55,0.1)' : 'transparent',
                border: step >= i + 1 ? `1px solid rgba(212,175,55,0.3)` : '1px solid rgba(212,175,55,0.08)',
                color: step > i + 1 ? BG : step === i + 1 ? GOLD : 'rgba(234,234,234,0.25)',
                fontSize: 12, fontWeight: 600,
                transition: 'all 0.4s ease',
              }}>
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 12, color: step >= i + 1 ? TEXT : 'rgba(234,234,234,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.3s' }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60 }}>
          {/* Form */}
          <div>
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Shipping Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>First Name</label><DarkNeumorphicInput placeholder="First name" /></div>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Last Name</label><DarkNeumorphicInput placeholder="Last name" /></div>
                </div>
                <div style={{ marginTop: 20 }}><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Email</label><DarkNeumorphicInput placeholder="Email address" type="email" /></div>
                <div style={{ marginTop: 20 }}><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Phone</label><DarkNeumorphicInput placeholder="Phone number" type="tel" /></div>
                <div style={{ marginTop: 20 }}><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Address</label><DarkNeumorphicInput placeholder="Street address" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20 }}>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>City</label><DarkNeumorphicInput placeholder="City" /></div>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>State</label><DarkNeumorphicInput placeholder="State" /></div>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Zip</label><DarkNeumorphicInput placeholder="Zip code" /></div>
                </div>
                <div style={{ marginTop: 36 }}><SparkleGlowButton onClick={() => setStep(2)}>Continue to Payment</SparkleGlowButton></div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Payment Details</h2>
                <div style={{ padding: 28, border: '1px solid rgba(212,175,55,0.1)', borderRadius: 10, marginBottom: 20, backgroundColor: 'rgba(212,175,55,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}><Lock size={14} color={GOLD} /><span style={{ fontSize: 11, color: 'rgba(234,234,234,0.4)', letterSpacing: '0.1em' }}>Encrypted & Secure</span></div>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Card Number</label><DarkNeumorphicInput placeholder="1234 5678 9012 3456" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
                    <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Expiry</label><DarkNeumorphicInput placeholder="MM/YY" /></div>
                    <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>CVC</label><DarkNeumorphicInput placeholder="123" /></div>
                  </div>
                  <div style={{ marginTop: 20 }}><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Name on Card</label><DarkNeumorphicInput placeholder="Full name" /></div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <button onClick={() => setStep(1)} style={{ padding: '16px 32px', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.12)', borderRadius: 6, color: TEXT, fontSize: 12, cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>Back</button>
                  <SparkleGlowButton onClick={() => setStep(3)}>Review Order</SparkleGlowButton>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Review Your Order</h2>
                {items.map((item) => (
                  <div key={item.product.id} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', backgroundColor: SURFACE, border: '1px solid rgba(212,175,55,0.06)' }}>
                      <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 400, color: TEXT }}>{item.product.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', marginTop: 4 }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontSize: 14, fontFamily: 'Cinzel, serif', color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 16, marginTop: 36 }}>
                  <button onClick={() => setStep(2)} style={{ padding: '16px 32px', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.12)', borderRadius: 6, color: TEXT, fontSize: 12, cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>Back</button>
                  <SparkleGlowButton>Place Order</SparkleGlowButton>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{ padding: 36, backgroundColor: SURFACE, borderRadius: 10, border: '1px solid rgba(212,175,55,0.08)', height: 'fit-content', position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Summary</h3>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: 'rgba(234,234,234,0.45)' }}>{item.product.name} x{item.quantity}</span>
                <span style={{ fontSize: 13, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.45)' }}>Shipping</span>
              <span style={{ fontSize: 14, color: GOLD }}>Complimentary</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: 18, marginTop: 18, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: TEXT }}>Total</span>
              <span style={{ fontSize: 22, fontFamily: 'Cinzel, serif', color: TEXT }}>${getTotal().toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
              <Shield size={14} color={GOLD} />
              <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.35)', letterSpacing: '0.05em' }}>256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
