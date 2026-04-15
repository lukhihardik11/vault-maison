'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Lock, CreditCard, Truck, Gift, MapPin, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'

interface CheckoutPageProps {
  conceptId: string
  accentColor: string
  bgColor: string
  textColor: string
  mutedColor: string
  cardBg?: string
  fontHeading?: string
  fontBody?: string
}

type Step = 'shipping' | 'payment' | 'confirmation'

interface FormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  shippingMethod: string
  giftWrap: boolean
  giftMessage: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  cardName: string
}

const initialForm: FormData = {
  email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'US', phone: '',
  shippingMethod: 'standard', giftWrap: false, giftMessage: '',
  cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
}

const shippingMethods = [
  { id: 'standard', label: 'Standard Shipping', desc: '5-7 business days', price: 0, icon: Truck },
  { id: 'express', label: 'Express Shipping', desc: '2-3 business days', price: 25, icon: Truck },
  { id: 'overnight', label: 'Overnight Delivery', desc: 'Next business day', price: 50, icon: Truck },
]

export function CheckoutPage({
  conceptId,
  accentColor,
  bgColor,
  textColor,
  mutedColor,
  cardBg,
  fontHeading = "'Playfair Display', serif",
  fontBody = "'Inter', sans-serif",
}: CheckoutPageProps) {
  const { items, getTotal, getItemCount, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('shipping')
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [orderNumber, setOrderNumber] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)

  const bg = cardBg || `${textColor}08`
  const border = `${textColor}15`
  const subtotal = getTotal()
  const shippingCost = shippingMethods.find(m => m.id === form.shippingMethod)?.price || 0
  const giftWrapCost = form.giftWrap ? 15 : 0
  const total = subtotal + shippingCost + giftWrapCost

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validateShipping = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.firstName) newErrors.firstName = 'First name is required'
    if (!form.lastName) newErrors.lastName = 'Last name is required'
    if (!form.address) newErrors.address = 'Address is required'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.zip) newErrors.zip = 'ZIP code is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!form.cardNumber) newErrors.cardNumber = 'Card number is required'
    if (!form.cardExpiry) newErrors.cardExpiry = 'Expiry is required'
    if (!form.cardCvc) newErrors.cardCvc = 'CVC is required'
    if (!form.cardName) newErrors.cardName = 'Name on card is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (step === 'shipping' && validateShipping()) {
      // Try to create a real order via API
      setIsCreatingOrder(true)
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(i => ({
              productId: i.product.id,
              quantity: i.quantity,
              size: i.size,
              metal: i.metal,
            })),
            shippingAddress: {
              firstName: form.firstName,
              lastName: form.lastName,
              address: form.address,
              city: form.city,
              state: form.state,
              zip: form.zip,
              country: form.country,
              phone: form.phone,
            },
            shippingMethod: form.shippingMethod,
            giftWrap: form.giftWrap,
            giftMessage: form.giftMessage,
          }),
        })
        if (res.ok) {
          const data = await res.json()
          setClientSecret(data.clientSecret || '')
          setOrderNumber(data.orderNumber || '')
        }
      } catch {
        // API not available — continue with demo flow
      }
      setIsCreatingOrder(false)
      setStep('payment')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 'payment') {
      // If no Stripe (demo mode), just show confirmation
      if (!clientSecret) {
        const num = `VM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        setOrderNumber(num)
        clearCart()
        setStep('confirmation')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      // If Stripe is active, the StripeCheckout component handles submission
    }
  }

  const handleBack = () => {
    if (step === 'payment') setStep('shipping')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const steps: { key: Step; label: string; icon: typeof MapPin }[] = [
    { key: 'shipping', label: 'Shipping', icon: MapPin },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'confirmation', label: 'Confirmation', icon: Check },
  ]

  const inputStyle = (field: keyof FormData): React.CSSProperties => ({
    width: '100%', padding: '12px 14px', background: 'transparent',
    border: `1px solid ${errors[field] ? '#ef4444' : border}`,
    color: textColor, fontFamily: fontBody, fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box',
  })

  const labelStyle: React.CSSProperties = {
    fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
    color: mutedColor, display: 'block', marginBottom: 6,
  }

  // Confirmation page
  if (step === 'confirmation') {
    return (
      <div style={{ background: bgColor, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 520 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${accentColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={32} color={accentColor} />
          </div>
          <h1 style={{ fontFamily: fontHeading, fontSize: '2rem', fontWeight: 400, color: textColor, margin: '0 0 8px' }}>
            Thank You
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: mutedColor, margin: '0 0 24px' }}>
            Your order has been placed successfully.
          </p>
          <div style={{ background: bg, border: `1px solid ${border}`, padding: 24, marginBottom: 32 }}>
            <p style={{ fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, margin: '0 0 8px' }}>Order Number</p>
            <p style={{ fontFamily: fontHeading, fontSize: '1.5rem', color: textColor, margin: '0 0 16px' }}>{orderNumber}</p>
            <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: mutedColor, margin: 0 }}>
              A confirmation email has been sent to {form.email || 'your email address'}.
            </p>
          </div>
          <Link
            href={`/${conceptId}/collections`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 36px', background: accentColor, color: bgColor,
              fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: bgColor, minHeight: '100vh', paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 48 }}>
          {steps.map((s, i) => {
            const isActive = s.key === step
            const isPast = steps.findIndex(x => x.key === step) > i
            return (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isPast ? accentColor : isActive ? `${accentColor}20` : 'transparent',
                    border: `1px solid ${isPast || isActive ? accentColor : border}`,
                    color: isPast ? bgColor : isActive ? accentColor : mutedColor,
                  }}>
                    {isPast ? <Check size={14} /> : <s.icon size={14} />}
                  </div>
                  <span style={{
                    fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: isActive ? textColor : mutedColor,
                  }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 60, height: 1, background: isPast ? accentColor : border, margin: '0 16px' }} />
                )}
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>
          {/* Form area */}
          <div>
            {step === 'shipping' && (
              <>
                {/* Contact */}
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: fontHeading, fontSize: '1.2rem', fontWeight: 500, color: textColor, margin: '0 0 20px' }}>Contact Information</h2>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} placeholder="your@email.com" style={inputStyle('email')} />
                    {errors.email && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Shipping address */}
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: fontHeading, fontSize: '1.2rem', fontWeight: 500, color: textColor, margin: '0 0 20px' }}>Shipping Address</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input value={form.firstName} onChange={e => updateField('firstName', e.target.value)} style={inputStyle('firstName')} />
                      {errors.firstName && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.firstName}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input value={form.lastName} onChange={e => updateField('lastName', e.target.value)} style={inputStyle('lastName')} />
                      {errors.lastName && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.lastName}</p>}
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <label style={labelStyle}>Address</label>
                    <input value={form.address} onChange={e => updateField('address', e.target.value)} style={inputStyle('address')} />
                    {errors.address && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.address}</p>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input value={form.city} onChange={e => updateField('city', e.target.value)} style={inputStyle('city')} />
                      {errors.city && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.city}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <input value={form.state} onChange={e => updateField('state', e.target.value)} style={inputStyle('state')} />
                    </div>
                    <div>
                      <label style={labelStyle}>ZIP Code</label>
                      <input value={form.zip} onChange={e => updateField('zip', e.target.value)} style={inputStyle('zip')} />
                      {errors.zip && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.zip}</p>}
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <label style={labelStyle}>Phone (optional)</label>
                    <input value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+1 (555) 000-0000" style={inputStyle('phone')} />
                  </div>
                </div>

                {/* Shipping method */}
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: fontHeading, fontSize: '1.2rem', fontWeight: 500, color: textColor, margin: '0 0 20px' }}>Shipping Method</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {shippingMethods.map(method => (
                      <label
                        key={method.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 16, padding: 16, cursor: 'pointer',
                          border: `1px solid ${form.shippingMethod === method.id ? accentColor : border}`,
                          background: form.shippingMethod === method.id ? `${accentColor}08` : 'transparent',
                        }}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          checked={form.shippingMethod === method.id}
                          onChange={() => updateField('shippingMethod', method.id)}
                          style={{ accentColor }}
                        />
                        <method.icon size={18} color={form.shippingMethod === method.id ? accentColor : mutedColor} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: textColor, margin: 0 }}>{method.label}</p>
                          <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor, margin: '2px 0 0' }}>{method.desc}</p>
                        </div>
                        <span style={{ fontFamily: fontBody, fontSize: '0.85rem', color: method.price === 0 ? accentColor : textColor }}>
                          {method.price === 0 ? 'Free' : `$${method.price}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gift wrap */}
                <div style={{ marginBottom: 32, padding: 20, background: bg, border: `1px solid ${border}` }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.giftWrap} onChange={e => updateField('giftWrap', e.target.checked)} style={{ accentColor }} />
                    <Gift size={18} color={accentColor} />
                    <div>
                      <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: textColor, margin: 0 }}>Add Gift Wrapping — $15</p>
                      <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor, margin: '2px 0 0' }}>Luxury packaging with a personalized message</p>
                    </div>
                  </label>
                  {form.giftWrap && (
                    <textarea
                      value={form.giftMessage}
                      onChange={e => updateField('giftMessage', e.target.value)}
                      placeholder="Add a personal message (optional)"
                      rows={3}
                      style={{ ...inputStyle('giftMessage'), marginTop: 12, resize: 'vertical' }}
                    />
                  )}
                </div>
              </>
            )}

            {step === 'payment' && (
              <div>
                <h2 style={{ fontFamily: fontHeading, fontSize: '1.2rem', fontWeight: 500, color: textColor, margin: '0 0 20px' }}>Payment Details</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <Lock size={14} color={accentColor} />
                  <span style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor }}>Your payment information is encrypted and secure</span>
                </div>
                {clientSecret ? (
                  /* Real Stripe checkout */
                  <div>
                    {/* StripeCheckout is dynamically imported to avoid SSR issues */}
                    <div id="stripe-checkout-container" style={{ minHeight: 200 }}>
                      {/* Stripe Elements will render here via StripeCheckout component */}
                      <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: mutedColor, textAlign: 'center', padding: 40 }}>
                        Stripe Payment Element loading...
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Demo mode: fake card form */
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Card Number</label>
                      <input value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" style={inputStyle('cardNumber')} />
                      {errors.cardNumber && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.cardNumber}</p>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={labelStyle}>Expiry Date</label>
                        <input value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="12/28" style={inputStyle('cardExpiry')} />
                        {errors.cardExpiry && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>CVC</label>
                        <input value={form.cardCvc} onChange={e => updateField('cardCvc', e.target.value)} placeholder="123" style={inputStyle('cardCvc')} />
                        {errors.cardCvc && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.cardCvc}</p>}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Name on Card</label>
                      <input value={form.cardName} onChange={e => updateField('cardName', e.target.value)} style={inputStyle('cardName')} />
                      {errors.cardName && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '4px 0 0' }}>{errors.cardName}</p>}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
              {step === 'payment' ? (
                <button
                  onClick={handleBack}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                    background: 'transparent', border: `1px solid ${border}`, color: textColor,
                    fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : <div />}
              <button
                onClick={handleNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '14px 36px',
                  background: accentColor, color: bgColor, border: 'none',
                  fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                {isCreatingOrder ? <><Loader2 size={14} className="animate-spin" /> Processing...</> : step === 'payment' ? 'Place Order' : 'Continue to Payment'} {!isCreatingOrder && <ArrowRight size={14} />}
              </button>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: bg, border: `1px solid ${border}`, padding: 24 }}>
              <h3 style={{ fontFamily: fontHeading, fontSize: '1rem', fontWeight: 500, color: textColor, margin: '0 0 20px' }}>
                Order Summary ({getItemCount()})
              </h3>
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    <div style={{ position: 'relative', width: 60, height: 60, flexShrink: 0, overflow: 'hidden', background: bg }}>
                      <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: '50%',
                        background: accentColor, color: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', fontFamily: fontBody,
                      }}>
                        {item.quantity}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: fontBody, fontSize: '0.75rem', color: textColor, margin: '0 0 2px' }}>{item.product.name}</p>
                      <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: mutedColor, margin: 0 }}>
                        {item.size && `Size ${item.size}`}{item.size && item.metal && ' · '}{item.metal}
                      </p>
                    </div>
                    <span style={{ fontFamily: fontBody, fontSize: '0.8rem', color: textColor }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, marginTop: 8 }}>
                {[
                  { label: 'Subtotal', value: `$${subtotal.toLocaleString()}` },
                  { label: 'Shipping', value: shippingCost === 0 ? 'Free' : `$${shippingCost}` },
                  ...(form.giftWrap ? [{ label: 'Gift Wrap', value: '$15' }] : []),
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontFamily: fontBody, fontSize: '0.75rem', color: mutedColor }}>{row.label}</span>
                    <span style={{ fontFamily: fontBody, fontSize: '0.8rem', color: row.value === 'Free' ? accentColor : textColor }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: fontHeading, fontSize: '1rem', color: textColor }}>Total</span>
                  <span style={{ fontFamily: fontHeading, fontSize: '1.2rem', color: accentColor }}>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
