'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { SlideTextButton } from '../ui'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

type Step = 'information' | 'shipping' | 'payment' | 'confirmation'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  border: 'none',
  borderBottom: '1px solid #E5E5E5',
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: font,
  color: '#050505',
  backgroundColor: 'transparent',
  outline: 'none',
  transition: 'border-color 300ms ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontWeight: 400,
  color: '#050505',
  opacity: 0.35,
  display: 'block',
  marginBottom: '4px',
}

const allSteps: Step[] = ['information', 'shipping', 'payment']

export function MinimalCheckout() {
  const [step, setStep] = useState<Step>('information')
  const { items, getTotal, clearCart } = useCartStore()
  const [orderNumber] = useState(() => `VM-${Date.now().toString(36).toUpperCase()}`)

  const stepIndex = allSteps.indexOf(step)

  if (step === 'confirmation') {
    return (
      <MinimalLayout hideFooter>
        <section style={{ padding: '120px 5vw', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              width: '48px', height: '48px', border: '1px solid #050505',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <span style={{ fontFamily: font, fontSize: '18px', fontWeight: 200 }}>✓</span>
            </div>
            <p style={{ fontFamily: font, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', opacity: 0.35, marginBottom: '16px' }}>
              Order Confirmed
            </p>
            <h1 style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, color: '#050505', marginBottom: '12px' }}>
              Thank you.
            </h1>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#050505', opacity: 0.6, marginBottom: '32px' }}>
              Order {orderNumber} has been placed. You will receive a confirmation email with tracking details shortly.
            </p>
            <SlideTextButton text="Return Home" hoverText="Home" href="/minimal" />
          </motion.div>
        </section>
      </MinimalLayout>
    )
  }

  return (
    <MinimalLayout hideFooter>
      <section style={{ padding: '80px 5vw 120px' }} className="minimal-checkout">
        {/* Step Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '1100px', marginBottom: '48px' }}
        >
          <div style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
            {allSteps.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => i < stepIndex ? setStep(s) : undefined}
                  style={{
                    fontFamily: font,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontWeight: step === s ? 400 : 300,
                    color: '#050505',
                    opacity: step === s ? 1 : i < stepIndex ? 0.5 : 0.25,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: i < stepIndex ? 'pointer' : 'default',
                    padding: 0,
                    transition: 'opacity 300ms ease',
                  }}
                >
                  {s}
                </button>
                {i < allSteps.length - 1 && (
                  <span style={{ margin: '0 16px', fontFamily: font, fontSize: '10px', opacity: 0.15 }}>—</span>
                )}
              </div>
            ))}
          </div>
          {/* Progress bar */}
          <div style={{ height: '1px', backgroundColor: '#E5E5E5', marginTop: '16px', position: 'relative' }}>
            <motion.div
              animate={{ width: `${((stepIndex + 1) / allSteps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ height: '1px', backgroundColor: '#050505', position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '80px', maxWidth: '1100px' }} className="minimal-checkout-grid">
          {/* Left: Form */}
          <div>
            <AnimatePresence mode="wait">
              {step === 'information' && (
                <motion.form
                  key="info"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => { e.preventDefault(); setStep('shipping') }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Address</label>
                    <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px' }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                    <div>
                      <label style={labelStyle}>Zip</label>
                      <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      alignSelf: 'flex-start',
                      padding: '14px 48px',
                      border: '1px solid #050505',
                      backgroundColor: '#050505',
                      color: '#FFFFFF',
                      fontFamily: font,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 400,
                      cursor: 'pointer',
                      marginTop: '8px',
                    }}
                  >
                    Continue to Shipping
                  </motion.button>
                </motion.form>
              )}

              {step === 'shipping' && (
                <motion.form
                  key="ship"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => { e.preventDefault(); setStep('payment') }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
                >
                  {[
                    { label: 'Standard Shipping', desc: '5–7 business days · Fully insured', price: 'Free' },
                    { label: 'Express Shipping', desc: '2–3 business days · Signature required', price: '$25' },
                    { label: 'Priority Insured', desc: 'Next business day · White glove delivery', price: '$75' },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 0',
                        borderBottom: '1px solid #E5E5E5',
                        cursor: 'pointer',
                        transition: 'background-color 200ms ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input type="radio" name="shipping" defaultChecked={i === 0} style={{ accentColor: '#050505' }} />
                        <div>
                          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#050505' }}>{opt.label}</p>
                          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#050505', opacity: 0.4 }}>{opt.desc}</p>
                        </div>
                      </div>
                      <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{opt.price}</span>
                    </label>
                  ))}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                    <button
                      type="button"
                      onClick={() => setStep('information')}
                      style={{
                        padding: '14px 32px',
                        border: '1px solid #E5E5E5',
                        backgroundColor: 'transparent',
                        color: '#050505',
                        fontFamily: font,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontWeight: 400,
                        cursor: 'pointer',
                      }}
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      style={{
                        padding: '14px 48px',
                        border: '1px solid #050505',
                        backgroundColor: '#050505',
                        color: '#FFFFFF',
                        fontFamily: font,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontWeight: 400,
                        cursor: 'pointer',
                      }}
                    >
                      Continue to Payment
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {step === 'payment' && (
                <motion.form
                  key="pay"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => { e.preventDefault(); clearCart(); setStep('confirmation') }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                >
                  <div>
                    <label style={labelStyle}>Card Number</label>
                    <input type="text" required placeholder="0000 0000 0000 0000" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                      <label style={labelStyle}>Expiry</label>
                      <input type="text" required placeholder="MM/YY" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                    <div>
                      <label style={labelStyle}>CVC</label>
                      <input type="text" required placeholder="000" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Name on Card</label>
                    <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
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
                        fontFamily: font,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontWeight: 400,
                        cursor: 'pointer',
                      }}
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      style={{
                        padding: '14px 48px',
                        border: '1px solid #050505',
                        backgroundColor: '#050505',
                        color: '#FFFFFF',
                        fontFamily: font,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontWeight: 400,
                        cursor: 'pointer',
                      }}
                    >
                      Place Order
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <p style={{ fontFamily: font, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#050505', opacity: 0.35, marginBottom: '24px' }}>
              Order Summary
            </p>
            {items.map((item) => (
              <div
                key={item.product.id}
                style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}
              >
                <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0, backgroundColor: '#F5F5F5' }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} sizes="56px" unoptimized />
                  {item.quantity > 1 && (
                    <span style={{
                      position: 'absolute', top: '-6px', right: '-6px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      backgroundColor: '#050505', color: '#FFFFFF',
                      fontFamily: font, fontSize: '9px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.quantity}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{item.product.name}</p>
                </div>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: font, fontSize: '12px', color: '#050505', opacity: 0.4 }}>Subtotal</span>
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{formatPrice(getTotal())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: font, fontSize: '12px', color: '#050505', opacity: 0.4 }}>Shipping</span>
                <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#050505', opacity: 0.4 }}>Calculated</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #050505', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#050505' }}>Total</span>
              <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#050505' }}>{formatPrice(getTotal())}</span>
            </div>
          </motion.div>
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
