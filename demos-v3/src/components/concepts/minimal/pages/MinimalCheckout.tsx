'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'

type Step = 'information' | 'shipping' | 'payment' | 'confirmation'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  border: 'none',
  borderBottom: '1px solid #E5E5E5',
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: 'inherit',
  color: '#050505',
  backgroundColor: 'transparent',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontWeight: 400,
  color: '#050505',
  opacity: 0.4,
  display: 'block',
  marginBottom: '4px',
}

export function MinimalCheckout() {
  const [step, setStep] = useState<Step>('information')
  const { items, getTotal, clearCart } = useCartStore()
  const [orderNumber] = useState(() => `VM-${Date.now().toString(36).toUpperCase()}`)

  if (step === 'confirmation') {
    return (
      <MinimalLayout hideFooter>
        <section style={{ padding: '120px 5vw', maxWidth: '600px' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '24px' }}>
            Order Confirmed
          </p>
          <h1 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '12px' }}>Thank you.</h1>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.6, marginBottom: '32px' }}>
            Order {orderNumber} has been placed. You will receive a confirmation email shortly.
          </p>
          <Link
            href="/minimal"
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 400,
              color: '#050505',
              textDecoration: 'none',
              opacity: 0.6,
            }}
          >
            Return Home &rarr;
          </Link>
        </section>
      </MinimalLayout>
    )
  }

  const steps: Step[] = ['information', 'shipping', 'payment']

  return (
    <MinimalLayout hideFooter>
      <section style={{ padding: '80px 5vw 120px' }} className="minimal-checkout">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1100px' }} className="minimal-checkout-grid">
          {/* Left: Form */}
          <div>
            {/* Step Indicator */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '48px' }}>
              {steps.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontWeight: step === s ? 400 : 300,
                    opacity: step === s ? 1 : 0.3,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {step === 'information' && (
              <form
                onSubmit={(e) => { e.preventDefault(); setStep('shipping') }}
                style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input type="text" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input type="text" required style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Address</label>
                  <input type="text" required style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input type="text" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <input type="text" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Zip</label>
                    <input type="text" required style={inputStyle} />
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '14px 40px',
                    border: '1px solid #050505',
                    backgroundColor: '#050505',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontWeight: 400,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    marginTop: '8px',
                  }}
                >
                  Continue to Shipping
                </button>
              </form>
            )}

            {step === 'shipping' && (
              <form
                onSubmit={(e) => { e.preventDefault(); setStep('payment') }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                {[
                  { label: 'Standard Shipping', desc: '5–7 business days', price: 'Free' },
                  { label: 'Express Shipping', desc: '2–3 business days', price: '$25' },
                  { label: 'Priority Insured', desc: 'Next business day', price: '$75' },
                ].map((opt, i) => (
                  <label
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 0',
                      borderBottom: '1px solid #E5E5E5',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        name="shipping"
                        defaultChecked={i === 0}
                        style={{ accentColor: '#050505' }}
                      />
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 400 }}>{opt.label}</p>
                        <p style={{ fontSize: '11px', fontWeight: 300, opacity: 0.4 }}>{opt.desc}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 300 }}>{opt.price}</span>
                  </label>
                ))}
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setStep('information')}
                    style={{
                      padding: '14px 32px',
                      border: '1px solid #E5E5E5',
                      backgroundColor: 'transparent',
                      color: '#050505',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 400,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '14px 40px',
                      border: '1px solid #050505',
                      backgroundColor: '#050505',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 400,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form
                onSubmit={(e) => { e.preventDefault(); clearCart(); setStep('confirmation') }}
                style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
              >
                <div>
                  <label style={labelStyle}>Card Number</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>Expiry</label>
                    <input type="text" required placeholder="MM/YY" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>CVC</label>
                    <input type="text" required placeholder="000" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Name on Card</label>
                  <input type="text" required style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    style={{
                      padding: '14px 32px',
                      border: '1px solid #E5E5E5',
                      backgroundColor: 'transparent',
                      color: '#050505',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 400,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '14px 40px',
                      border: '1px solid #050505',
                      backgroundColor: '#050505',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 400,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary */}
          <div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '24px' }}>
              Order Summary
            </p>
            {items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '16px',
                  alignItems: 'center',
                }}
              >
                <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0, backgroundColor: '#F5F5F5' }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} sizes="48px" />
                  {item.quantity > 1 && (
                    <span style={{
                      position: 'absolute', top: '-6px', right: '-6px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      backgroundColor: '#050505', color: '#FFFFFF',
                      fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.quantity}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 300 }}>{item.product.name}</p>
                </div>
                <p style={{ fontSize: '13px', fontWeight: 300 }}>{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Subtotal</span>
                <span style={{ fontSize: '13px', fontWeight: 300 }}>{formatPrice(getTotal())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Shipping</span>
                <span style={{ fontSize: '13px', fontWeight: 300, opacity: 0.4 }}>Calculated</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #050505', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: 400 }}>Total</span>
              <span style={{ fontSize: '13px', fontWeight: 400 }}>{formatPrice(getTotal())}</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-checkout { padding: 60px 20px 80px !important; }
          .minimal-checkout-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
