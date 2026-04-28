'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, Shield, Truck, RotateCcw, Lock, Award, Fingerprint } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import BlurUpImage from '../ui/BlurUpImage'
import { CreditCardForm, type CardState, type CardValidity } from '@/components/ui/credit-card-form'
import { PaymentSummary } from '@/components/ui/payment'
import { CreditCard } from 'lucide-react'

type Step = 'info' | 'shipping' | 'payment' | 'review'

const F = "'Inter', 'Helvetica Neue', sans-serif"

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  type?: string
  error?: string
}

function Field({ label, value, onChange, required = false, placeholder = '', type = 'text', error }: FieldProps) {
  const [touched, setTouched] = useState(false)
  const showError = error && touched

  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: 8,
          fontFamily: F,
          fontSize: 13,
          color: '#6B6B6B',
          fontWeight: 500,
        }}
      >
        {label}
        {required && <span style={{ color: '#050505', marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 16px',
          border: showError ? '1.5px solid #050505' : '1px solid #E5E5E5',
          background: '#FFFFFF',
          color: '#050505',
          fontFamily: F,
          fontSize: 14,
          outline: 'none',
          transition: 'border-color 150ms',
        }}
      />
      {showError && (
        <span style={{
          display: 'block',
          marginTop: 6,
          fontFamily: F,
          fontSize: 12,
          color: '#050505',
          opacity: 0,
          animation: 'fadeIn 150ms ease forwards',
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  return digits
}

export function MinimalCheckout() {
  const router = useRouter()
  const prefersReducedMotion = useReducedMotionPreference()
  const formTopRef = useRef<HTMLDivElement | null>(null)
  const { items, getTotal, clearCart } = useCartStore()

  const [step, setStep] = useState<Step>('info')
  const [isProcessing, setIsProcessing] = useState(false)
  const [done, setDone] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  })

  const total = getTotal()
  const discount = promoApplied ? Math.round(total * 0.1) : 0
  const shipping = total > 500 ? 0 : 25
  const tax = Math.round((total - discount) * 0.08)
  const finalTotal = total - discount + shipping + tax

  const steps: Array<{ id: Step; label: string }> = [
    { id: 'info', label: 'Details' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
    { id: 'review', label: 'Review' },
  ]

  const currentIndex = steps.findIndex((item) => item.id === step)

  useEffect(() => {
    if (!formTopRef.current) return
    formTopRef.current.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [step, prefersReducedMotion])

  // Memoized callback to prevent infinite re-render loop.
  // CreditCardForm's useEffect has `onChange` in its deps array —
  // an inline arrow would get a new ref every render → setForm → re-render → loop.
  const handleCardChange = useCallback((state: CardState) => {
    setForm((prev) => ({
      ...prev,
      cardNumber: state.number,
      cardName: state.holder,
      cardExpiry: state.month && state.year ? `${state.month} / ${state.year.slice(-2)}` : prev.cardExpiry,
      cardCvc: state.cvv,
    }))
  }, [])

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
    if (errors[field]) {
      setErrors((previous) => {
        const next = { ...previous }
        delete next[field]
        return next
      })
    }
  }

  const validateInfo = (): boolean => {
    const nextErrors: Record<string, string> = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Valid email is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validateShipping = (): boolean => {
    const nextErrors: Record<string, string> = {}
    if (!form.address.trim()) nextErrors.address = 'Address is required'
    if (!form.city.trim()) nextErrors.city = 'City is required'
    if (!form.state.trim()) nextErrors.state = 'State is required'
    if (!form.zip.trim()) nextErrors.zip = 'ZIP code is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validatePayment = (): boolean => {
    const nextErrors: Record<string, string> = {}
    if (form.cardNumber.replace(/\s/g, '').length < 15) nextErrors.cardNumber = 'Valid card number required'
    if (!form.cardName.trim()) nextErrors.cardName = 'Cardholder name is required'
    if (form.cardExpiry.replace(/\D/g, '').length < 4) nextErrors.cardExpiry = 'Valid expiry required'
    if (form.cardCvc.length < 3) nextErrors.cardCvc = 'Valid CVC required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const placeOrder = () => {
    setIsProcessing(true)
    window.setTimeout(() => {
      setIsProcessing(false)
      setDone(true)
      window.setTimeout(() => {
        clearCart()
        router.push(`/minimal/checkout/confirmation?orderId=MIN-${Date.now().toString(36).toUpperCase()}`)
      }, 1200)
    }, 1600)
  }

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const deliveryString = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  if (items.length === 0 && !done) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', padding: 40 }}>
        <div style={{ width: 80, height: 80, background: '#E5E5E5', border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Lock size={30} color="#9B9B9B" />
        </div>
        <h2 style={{ fontFamily: F, fontSize: 26, color: '#050505', marginBottom: 8, fontWeight: 400, letterSpacing: '-0.02em' }}>Your bag is empty</h2>
        <p style={{ fontFamily: F, fontSize: 15, color: '#9B9B9B', marginBottom: 32 }}>Add items to begin checkout</p>
        <Link href="/minimal/collections" style={{ fontFamily: F, fontSize: 14, color: '#FFFFFF', textDecoration: 'none', background: '#050505', padding: '14px 40px', letterSpacing: '0.08em', fontWeight: 500, textTransform: 'uppercase' }}>
          Shop Collection
        </Link>
      </div>
    )
  }

  const stepPanelBaseStyle = {
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    padding: '40px 36px',
  }

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', color: '#050505' }}>
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E5E5', padding: '24px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} style={{ display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  if (index < currentIndex) {
                    setErrors({})
                    setStep(stepItem.id)
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: 'none',
                  cursor: index < currentIndex ? 'pointer' : 'default',
                  padding: 0,
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: index < currentIndex ? '#050505' : '#FFFFFF',
                    border: index < currentIndex ? '1px solid #050505' : index === currentIndex ? '2px solid #050505' : '1px solid #E5E5E5',
                    color: index < currentIndex ? '#FFFFFF' : index === currentIndex ? '#050505' : '#9B9B9B',
                    transition: prefersReducedMotion ? 'none' : 'background-color 180ms ease, border-color 180ms ease, color 180ms ease',
                  }}
                >
                  {index < currentIndex ? <Check size={14} strokeWidth={2.5} /> : <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600 }}>{index + 1}</span>}
                </span>
                <span
                  style={{
                    fontFamily: F,
                    fontSize: 11,
                    color: index <= currentIndex ? '#050505' : '#9B9B9B',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stepItem.label}
                </span>
              </button>
              {index < steps.length - 1 && <span style={{ width: 52, height: 1, background: index < currentIndex ? '#050505' : '#E5E5E5', margin: '0 8px 22px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="minimal-checkout-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px', alignItems: 'start' }}>
        <div ref={formTopRef}>
          <div key={step} className={prefersReducedMotion ? undefined : 'minimal-checkout-step-panel'} style={stepPanelBaseStyle}>
            {step === 'info' && (
              <>
                <div style={{ marginBottom: 30 }}>
                  <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 6px' }}>Contact Details</h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B', margin: 0 }}>We&apos;ll use this to send your order confirmation.</p>
                </div>

                <div className="vm-checkout-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <Field label="First Name" value={form.firstName} onChange={(value) => updateField('firstName', value)} required error={errors.firstName} />
                  <Field label="Last Name" value={form.lastName} onChange={(value) => updateField('lastName', value)} required error={errors.lastName} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <Field label="Email" value={form.email} onChange={(value) => updateField('email', value)} required error={errors.email} placeholder="you@example.com" type="email" />
                </div>

                <div style={{ marginBottom: 26 }}>
                  <Field label="Phone" value={form.phone} onChange={(value) => updateField('phone', value)} placeholder="+1 (555) 000-0000" type="tel" />
                </div>

                <button
                  type="button"
                  onClick={() => validateInfo() && setStep('shipping')}
                  style={{
                    width: '100%',
                    height: 52,
                    border: 'none',
                    background: '#050505',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: F, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Continue to Shipping</span>
                  <ArrowRight size={16} />
                </button>
              </>
            )}

            {step === 'shipping' && (
              <>
                <div style={{ marginBottom: 30 }}>
                  <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 6px' }}>Shipping Address</h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B', margin: 0 }}>Where should we deliver your order?</p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <Field label="Street Address" value={form.address} onChange={(value) => updateField('address', value)} required error={errors.address} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <Field label="Apartment, Suite, etc." value={form.apt} onChange={(value) => updateField('apt', value)} placeholder="Optional" />
                </div>

                <div className="vm-checkout-city-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <Field label="City" value={form.city} onChange={(value) => updateField('city', value)} required error={errors.city} />
                  <Field label="State" value={form.state} onChange={(value) => updateField('state', value)} required error={errors.state} />
                  <Field label="ZIP" value={form.zip} onChange={(value) => updateField('zip', value)} required error={errors.zip} />
                </div>

                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontFamily: F, fontSize: 13, color: '#6B6B6B', fontWeight: 500 }}>Country</label>
                  <select
                    value={form.country}
                    onChange={(event) => updateField('country', event.target.value)}
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #E5E5E5', background: '#FFFFFF', color: '#050505', fontFamily: F, fontSize: 14 }}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Japan</option>
                    <option>India</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setErrors({})
                      setStep('info')
                    }}
                    style={{
                      padding: '16px 24px',
                      background: '#FFFFFF',
                      border: '1px solid #E5E5E5',
                      color: '#050505',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500 }}>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => validateShipping() && setStep('payment')}
                    style={{
                      flex: 1,
                      maxWidth: 280,
                      padding: '16px 36px',
                      background: '#050505',
                      border: 'none',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    <span style={{ fontFamily: F, fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Continue to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}

            {step === 'payment' && (
              <>
                <div style={{ marginBottom: 30 }}>
                  <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 6px' }}>Payment</h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B', margin: 0 }}>All transactions are secure and encrypted.</p>
                </div>

                {/* 21st.dev CreditCardForm — interactive 3D flip card */}
                <CreditCardForm
                  defaultHolder={form.cardName}
                  maskMiddle
                  showSubmit={false}
                  onChange={handleCardChange}
                  className="mb-6"
                />

                {/* Security assurance strip */}
                <div style={{ border: '1px solid #E5E5E5', marginBottom: 26 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', borderBottom: '1px solid #E5E5E5' }}>
                    <Lock size={14} color="#050505" />
                    <span style={{ fontFamily: F, fontSize: 13, color: '#050505', fontWeight: 500 }}>Encrypted Checkout</span>
                    <span style={{ fontFamily: F, fontSize: 12, color: '#9B9B9B', marginLeft: 'auto' }}>256-bit SSL</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 14px' }}>
                    <span style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Accepted</span>
                    {/* Monochrome payment method text badges */}
                    {['Visa', 'Mastercard', 'Amex', 'Apple Pay'].map((m) => (
                      <span key={m} style={{ fontFamily: F, fontSize: 11, color: '#6B6B6B', fontWeight: 500, letterSpacing: '0.02em' }}>{m}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setErrors({})
                      setStep('shipping')
                    }}
                    style={{
                      padding: '16px 24px',
                      background: '#FFFFFF',
                      border: '1px solid #E5E5E5',
                      color: '#050505',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500 }}>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => validatePayment() && setStep('review')}
                    style={{
                      flex: 1,
                      maxWidth: 280,
                      padding: '16px 36px',
                      background: '#050505',
                      border: 'none',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    <span style={{ fontFamily: F, fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Review Order</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}

            {step === 'review' && (
              <>
                <div style={{ marginBottom: 30 }}>
                  <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 6px' }}>Review Your Order</h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B', margin: 0 }}>Please confirm everything looks correct.</p>
                </div>

                {[
                  { title: 'Contact', value: `${form.firstName} ${form.lastName}\n${form.email}`, step: 'info' as Step },
                  { title: 'Ship to', value: `${form.address}${form.apt ? `, ${form.apt}` : ''}\n${form.city}, ${form.state} ${form.zip}`, step: 'shipping' as Step },
                  { title: 'Payment', value: `Card ending in ${form.cardNumber.slice(-4)}\n${form.cardName}`, step: 'payment' as Step },
                ].map((section) => (
                  <div key={section.title} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, border: '1px solid #E5E5E5', padding: '16px 18px', marginBottom: 10 }}>
                    <div>
                      <span style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
                        {section.title}
                      </span>
                      {section.value.split('\n').map((line, index) => (
                        <span key={`${section.title}-${index}`} style={{ display: 'block', fontFamily: F, fontSize: 14, color: '#050505', lineHeight: 1.4 }}>
                          {line}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(section.step)}
                      style={{ background: 'none', border: 'none', color: '#050505', cursor: 'pointer', fontFamily: F, fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      Change
                    </button>
                  </div>
                ))}

                <div style={{ margin: '22px 0 26px' }}>
                  <span style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>
                    Estimated Delivery
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #E5E5E5', padding: '12px 14px' }}>
                    <Truck size={15} color="#050505" />
                    <span style={{ fontFamily: F, fontSize: 13, color: '#6B6B6B' }}>{deliveryString}</span>
                  </div>
                </div>

                {!done ? (
                  <button
                    type="button"
                    onClick={placeOrder}
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      height: 54,
                      border: 'none',
                      background: isProcessing ? '#6B6B6B' : '#050505',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      cursor: isProcessing ? 'default' : 'pointer',
                    }}
                  >
                    {isProcessing ? (
                      <span style={{ fontFamily: F, fontSize: 14, letterSpacing: '0.06em' }}>Processing...</span>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span style={{ fontFamily: F, fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          Place Order — ${finalTotal.toLocaleString()}
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
                    <div style={{ width: 58, height: 58, margin: '0 auto 16px', border: '1px solid #050505', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={24} color="#FFFFFF" strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontFamily: F, fontSize: 22, fontWeight: 400, color: '#050505', marginBottom: 8 }}>Order Confirmed</h3>
                    <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B', margin: 0 }}>Redirecting to confirmation...</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Trust guarantee strip — text-based per Stripe pattern */}
          <div style={{ marginTop: 32, padding: '20px 0', borderTop: '1px solid #E5E5E5' }}>
            <p style={{ fontFamily: F, fontSize: 12, color: '#9B9B9B', textAlign: 'center', margin: '0 0 12px', letterSpacing: '0.02em', lineHeight: 1.6 }}>
              Your payment is encrypted end-to-end with 256-bit SSL. We never store your card details on our servers.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
              {['Free shipping on orders $500+', '30-day returns', 'GIA certified diamonds', 'Lifetime authenticity guarantee'].map((text) => (
                <span key={text} style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B', letterSpacing: '0.02em' }}>{text}</span>
              ))}
            </div>
          </div>

          {/* Policy links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
            {[
              { label: 'Privacy Policy', href: '/minimal/privacy' },
              { label: 'Terms of Service', href: '/minimal/terms' },
              { label: 'Shipping & Returns', href: '/minimal/shipping' },
              { label: 'Authenticity', href: '/minimal/authenticity' },
            ].map((link) => (
              <Link key={link.label} href={link.href} style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B', textDecoration: 'none', letterSpacing: '0.02em' }} className="minimal-link-underline">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', padding: '28px 24px' }}>
            <h3 style={{ fontFamily: F, fontSize: 16, fontWeight: 600, color: '#050505', marginBottom: 20, letterSpacing: '0.02em' }}>Order Summary</h3>

            <div style={{ marginBottom: 20 }}>
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${idx}`} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 56, height: 68, position: 'relative', overflow: 'hidden', background: '#E5E5E5', flexShrink: 0 }}>
                    <BlurUpImage src={item.product.images[0]} alt={item.product.name} containerStyle={{ width: '100%', height: '100%' }} />
                    <div style={{ position: 'absolute', top: -4, right: -4, width: 20, height: 20, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: F, fontSize: 10, color: '#FFFFFF', fontWeight: 600 }}>{item.quantity}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: '#050505', marginBottom: 2 }}>{item.product.name}</p>
                    <p style={{ fontFamily: F, fontSize: 12, color: '#9B9B9B' }}>{item.product.material || item.product.category}</p>
                  </div>
                  <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: '#050505' }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="Promo code"
                  disabled={promoApplied}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    border: promoApplied ? '1px solid #050505' : '1px solid #E5E5E5',
                    background: '#FFFFFF',
                    color: '#050505',
                    fontFamily: F,
                    fontSize: 13,
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (promoCode.toUpperCase() === 'VAULT10') setPromoApplied(true)
                  }}
                  disabled={promoApplied}
                  style={{
                    padding: '12px 20px',
                    background: '#050505',
                    border: 'none',
                    color: '#FFFFFF',
                    fontFamily: F,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: promoApplied ? 'default' : 'pointer',
                  }}
                >
                  {promoApplied ? <Check size={14} /> : 'Apply'}
                </button>
              </div>
              {promoApplied && <span style={{ fontFamily: F, fontSize: 12, color: '#050505', marginTop: 6, display: 'block' }}>VAULT10 applied — 10% off</span>}
            </div>

            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: 16 }}>
              {[
                { label: 'Subtotal', value: `$${total.toLocaleString()}` },
                ...(promoApplied ? [{ label: 'Discount (10%)', value: `-$${discount.toLocaleString()}` }] : []),
                { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping}` },
                { label: 'Tax', value: `$${tax.toLocaleString()}` },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>{row.label}</span>
                  <span style={{ fontFamily: F, fontSize: 14, color: '#050505', fontWeight: row.label.includes('Discount') ? 500 : 400 }}>{row.value}</span>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1.5px solid #050505', marginTop: 8 }}>
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#050505' }}>Total</span>
                <span style={{ fontFamily: F, fontSize: 22, fontWeight: 400, color: '#050505', letterSpacing: '-0.02em' }}>${finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sidebar security footer */}
          <div style={{ marginTop: 16, padding: '14px 0', borderTop: '1px solid #E5E5E5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
              <Lock size={12} color="#9B9B9B" />
              <span style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B' }}>Secured by 256-bit SSL encryption</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <span style={{ fontFamily: F, fontSize: 10, color: '#BFBFBF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PCI DSS Compliant</span>
              <span style={{ color: '#E5E5E5' }}>|</span>
              <span style={{ fontFamily: F, fontSize: 10, color: '#BFBFBF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Fully Insured Delivery</span>
            </div>
          </div>

          {/* 21st.dev PaymentSummary — animated payment details */}
          {step === 'review' && (
            <div style={{ marginTop: 20 }}>
              <PaymentSummary
                title="Payment Details"
                paymentMethod={{
                  icon: <CreditCard size={16} color="#050505" />,
                  name: form.cardNumber ? `•••• ${form.cardNumber.slice(-4)}` : 'Card',
                }}
                items={[
                  { label: 'Subtotal', value: `$${total.toLocaleString()}` },
                  ...(promoApplied ? [{ label: 'Discount', value: `-$${discount.toLocaleString()}` }] : []),
                  { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping}` },
                  { label: 'Tax', value: `$${tax.toLocaleString()}` },
                ]}
                total={{ label: 'Total', value: `$${finalTotal.toLocaleString()}` }}
                className="w-full max-w-full"
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .minimal-checkout-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 48px;
        }

        .minimal-checkout-step-panel {
          animation: minimalCheckoutStepIn 220ms ease-out;
        }

        @keyframes minimalCheckoutStepIn {
          from {
            transform: translateY(10px);
            opacity: 0.92;
          }
          to {
            transform: translateY(0px);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .minimal-checkout-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .minimal-checkout-step-panel,
          .minimal-checkout-grid > div:first-child > div {
            padding: 24px 20px !important;
          }
        }

        /* Collapse form grid rows on small mobile */
        @media (max-width: 480px) {
          .vm-checkout-name-row {
            grid-template-columns: 1fr !important;
          }
          .vm-checkout-city-row {
            grid-template-columns: 1fr !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .minimal-checkout-step-panel {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
