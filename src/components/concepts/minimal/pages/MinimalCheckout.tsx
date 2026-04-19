'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, Shield, Truck, RotateCcw, Lock, CreditCard, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'

/* ─── Types ─── */
type Step = 'info' | 'shipping' | 'payment' | 'review'

interface AddressSuggestion {
  display: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

/* ─── Address Autocomplete Hook ─── */
function useAddressAutocomplete() {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getSuggestions = useCallback((query: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (query.length < 3) { setSuggestions([]); return }

    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      const mockSuggestions: AddressSuggestion[] = [
        { display: `${query}, New York, NY 10001`, street: query, city: 'New York', state: 'NY', zip: '10001', country: 'US' },
        { display: `${query}, Los Angeles, CA 90001`, street: query, city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
        { display: `${query}, Chicago, IL 60601`, street: query, city: 'Chicago', state: 'IL', zip: '60601', country: 'US' },
        { display: `${query}, San Francisco, CA 94102`, street: query, city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' },
        { display: `${query}, Miami, FL 33101`, street: query, city: 'Miami', state: 'FL', zip: '33101', country: 'US' },
      ]
      setSuggestions(mockSuggestions)
      setIsLoading(false)
    }, 300)
  }, [])

  const clear = useCallback(() => setSuggestions([]), [])

  return { suggestions, isLoading, getSuggestions, clear }
}

/* ─── Shared Styles ─── */
const F = "'Inter', 'Helvetica Neue', sans-serif"

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '15px 18px',
  background: '#FAFAFA',
  border: '1.5px solid #E5E5E5',
  color: '#050505',
  fontFamily: F,
  fontSize: 15,
  outline: 'none',
  transition: 'all 0.2s ease',
  WebkitAppearance: 'none',
}

const inputFocusStyle: React.CSSProperties = {
  ...inputBase,
  borderColor: '#050505',
  background: '#FFF',
  boxShadow: '0 0 0 3px rgba(5,5,5,0.06)',
}

const labelBase: React.CSSProperties = {
  fontFamily: F,
  fontSize: 13,
  fontWeight: 500,
  color: '#6B6B6B',
  marginBottom: 8,
  display: 'block',
  letterSpacing: '0.01em',
}

/* ─── Input Component with Focus State ─── */
function FormInput({ label, value, onChange, type = 'text', placeholder = '', required = false, autoComplete = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; autoComplete?: string
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const hasError = required && !focused && hasValue && value.length < 2

  return (
    <div>
      <label style={labelBase}>
        {label}
        {required && <span style={{ color: '#050505', marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          ...inputBase,
          ...(focused ? inputFocusStyle : {}),
          ...(hasError ? { borderColor: '#050505', background: '#FAFAFA' } : {}),
          ...(hasValue && !hasError && !focused ? { borderColor: '#C8C8C8' } : {}),
        }}
      />
      {hasError && (
        <span style={{ fontFamily: F, fontSize: 12, color: '#050505', marginTop: 4, display: 'block' }}>
          Please enter a valid {label.toLowerCase()}
        </span>
      )}
    </div>
  )
}

/* ─── Card Number Formatting ─── */
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2)
  return digits
}

function getCardBrand(number: string): string {
  const d = number.replace(/\D/g, '')
  if (d.startsWith('4')) return 'Visa'
  if (d.startsWith('5') || d.startsWith('2')) return 'Mastercard'
  if (d.startsWith('3')) return 'Amex'
  return ''
}

/* ─── Main Checkout Component ─── */
export function MinimalCheckout() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('info')
  const [isProcessing, setIsProcessing] = useState(false)
  const [done, setDone] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { suggestions, getSuggestions, clear: clearSuggestions } = useAddressAutocomplete()
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', apt: '', city: '', state: '', zip: '', country: 'United States',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
    saveInfo: true, sameAsBilling: true,
  })

  const total = getTotal()
  const discount = promoApplied ? Math.round(total * 0.1) : 0
  const shipping = total > 500 ? 0 : 25
  const tax = Math.round((total - discount) * 0.08)
  const finalTotal = total - discount + shipping + tax

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'info', label: 'Details', icon: <span style={{ fontSize: 11 }}>1</span> },
    { id: 'shipping', label: 'Shipping', icon: <span style={{ fontSize: 11 }}>2</span> },
    { id: 'payment', label: 'Payment', icon: <span style={{ fontSize: 11 }}>3</span> },
    { id: 'review', label: 'Review', icon: <span style={{ fontSize: 11 }}>4</span> },
  ]
  const currentIdx = steps.findIndex(s => s.id === step)

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
  }

  const validateInfo = (): boolean => {
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateShipping = (): boolean => {
    const errs: Record<string, string> = {}
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!form.city.trim()) errs.city = 'City is required'
    if (!form.state.trim()) errs.state = 'State is required'
    if (!form.zip.trim()) errs.zip = 'ZIP code is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validatePayment = (): boolean => {
    const errs: Record<string, string> = {}
    if (form.cardNumber.replace(/\s/g, '').length < 15) errs.cardNumber = 'Valid card number required'
    if (!form.cardName.trim()) errs.cardName = 'Cardholder name is required'
    if (form.cardExpiry.replace(/\D/g, '').length < 4) errs.cardExpiry = 'Valid expiry required'
    if (form.cardCvc.length < 3) errs.cardCvc = 'Valid CVC required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleAddressChange = (value: string) => {
    updateField('address', value)
    getSuggestions(value)
    setShowSuggestions(true)
  }

  const selectSuggestion = (s: AddressSuggestion) => {
    setForm(prev => ({ ...prev, address: s.street, city: s.city, state: s.state, zip: s.zip }))
    setShowSuggestions(false)
    clearSuggestions()
  }

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'VAULT10') {
      setPromoApplied(true)
    }
  }

  const placeOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setDone(true)
      setTimeout(() => {
        clearCart()
        router.push('/minimal/checkout/confirmation?orderId=MIN-' + Date.now().toString(36).toUpperCase())
      }, 2000)
    }, 2000)
  }

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Estimated delivery date (5-7 business days from now)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const deliveryStr = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  /* ─── Empty Cart ─── */
  if (items.length === 0 && !done) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', padding: 40 }}>
        <div style={{ width: 80, height: 80, background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <CreditCard size={32} color="#9B9B9B" />
        </div>
        <h2 style={{ fontFamily: F, fontSize: 26, color: '#050505', marginBottom: 8, fontWeight: 300, letterSpacing: '-0.02em' }}>Your bag is empty</h2>
        <p style={{ fontFamily: F, fontSize: 15, color: '#9B9B9B', marginBottom: 32 }}>Add items to begin checkout</p>
        <Link href="/minimal/collections" style={{
          fontFamily: F, fontSize: 14, color: '#FFF', textDecoration: 'none',
          background: '#050505', padding: '14px 40px',
          letterSpacing: '0.08em', fontWeight: 500, textTransform: 'uppercase' as const,
        }}>
          Shop Collection
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', color: '#050505' }}>

      {/* ─── Progress Bar ─── */}
      <div style={{ background: '#FFF', borderBottom: '1px solid #E5E5E5', padding: '24px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i < currentIdx ? 'pointer' : 'default' }}
                onClick={() => i < currentIdx && setStep(s.id)}
              >
                <div style={{
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i < currentIdx ? '#050505' : i === currentIdx ? '#FFF' : '#F5F5F5',
                  border: i === currentIdx ? '2px solid #050505' : i < currentIdx ? 'none' : '1.5px solid #E5E5E5',
                  transition: 'all 0.3s ease',
                }}>
                  {i < currentIdx
                    ? <Check size={14} color="#FFF" strokeWidth={2.5} />
                    : <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: i === currentIdx ? '#050505' : '#9B9B9B' }}>{i + 1}</span>
                  }
                </div>
                <span style={{
                  fontFamily: F, fontSize: 11, fontWeight: i === currentIdx ? 600 : 400,
                  color: i <= currentIdx ? '#050505' : '#9B9B9B',
                  letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: 56, height: 2,
                  background: i < currentIdx ? '#050505' : '#E5E5E5',
                  margin: '0 8px', marginBottom: 22,
                  transition: 'background 0.3s ease',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="minimal-checkout-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px', alignItems: 'start' }}>

        {/* ─── Left: Form Steps ─── */}
        <div>

          {/* ═══ Step 1: Contact Details ═══ */}
          {step === 'info' && (
            <div style={{ background: '#FFF', padding: '40px 36px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 4 }}>Contact Details</h2>
                <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>We&apos;ll use this to send your order confirmation</p>
              </div>

              {/* Express Checkout */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {['Apple Pay', 'Google Pay', 'PayPal'].map(method => (
                    <button key={method} type="button" style={{
                      padding: '14px 16px', background: '#FFF', border: '1.5px solid #E5E5E5',
                      cursor: 'pointer', fontFamily: F, fontSize: 13,
                      fontWeight: 500, color: '#050505', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}>
                      {method === 'Apple Pay' && <span style={{ fontSize: 16 }}></span>}
                      {method === 'Google Pay' && <span style={{ fontSize: 14 }}>G</span>}
                      {method === 'PayPal' && <span style={{ fontSize: 14, fontWeight: 700, color: '#050505' }}>P</span>}
                      {method}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
                  <div style={{ flex: 1, height: 1, background: '#E5E5E5' }} />
                  <span style={{ fontFamily: F, fontSize: 12, color: '#9B9B9B', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>or continue below</span>
                  <div style={{ flex: 1, height: 1, background: '#E5E5E5' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <FormInput label="First Name" value={form.firstName} onChange={v => updateField('firstName', v)} required autoComplete="given-name" />
                <FormInput label="Last Name" value={form.lastName} onChange={v => updateField('lastName', v)} required autoComplete="family-name" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <FormInput label="Email Address" value={form.email} onChange={v => updateField('email', v)} type="email" required placeholder="you@example.com" autoComplete="email" />
              </div>
              <div style={{ marginBottom: 28 }}>
                <FormInput label="Phone Number" value={form.phone} onChange={v => updateField('phone', v)} type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" />
              </div>

              {/* Save info checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 32 }}>
                <div style={{
                  width: 20, height: 20, border: form.saveInfo ? 'none' : '1.5px solid #E5E5E5',
                  background: form.saveInfo ? '#050505' : '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}>
                  {form.saveInfo && <Check size={12} color="#FFF" strokeWidth={3} />}
                </div>
                <span style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>Save my information for faster checkout</span>
              </label>

              {Object.keys(errors).length > 0 && (
                <div style={{ marginBottom: 16, padding: '12px 16px', background: '#FAFAFA', border: '1px solid #E5E5E5' }}>
                  <p style={{ fontFamily: F, fontSize: 13, color: '#050505', fontWeight: 500, margin: 0 }}>Please correct the following:</p>
                  {Object.values(errors).map((err, i) => (
                    <p key={i} style={{ fontFamily: F, fontSize: 12, color: '#6B6B6B', margin: '4px 0 0' }}>{err}</p>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => validateInfo() && setStep('shipping')}
                style={{
                  width: '100%', padding: '16px 36px', background: '#050505', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 10, color: '#FFF', transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Continue to Shipping</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ═══ Step 2: Shipping Address ═══ */}
          {step === 'shipping' && (
            <div style={{ background: '#FFF', padding: '40px 36px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 4 }}>Shipping Address</h2>
                <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>Where should we deliver your order?</p>
              </div>

              {/* Address with autocomplete */}
              <div style={{ marginBottom: 20, position: 'relative' }} ref={suggestionsRef}>
                <label style={labelBase}>
                  Street Address <span style={{ color: '#050505', marginLeft: 3 }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => handleAddressChange(e.target.value)}
                  onFocus={() => form.address.length >= 3 && setShowSuggestions(true)}
                  placeholder="Start typing your address..."
                  autoComplete="street-address"
                  style={inputBase}
                />
                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
                    background: '#FFF', marginTop: 4,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #E5E5E5',
                    overflow: 'hidden',
                  }}>
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => selectSuggestion(s)}
                        style={{
                          width: '100%', padding: '14px 18px', background: 'transparent',
                          border: 'none', borderBottom: i < suggestions.length - 1 ? '1px solid #F5F5F5' : 'none',
                          cursor: 'pointer', textAlign: 'left', fontFamily: F, fontSize: 14,
                          color: '#050505', transition: 'background 0.15s ease',
                          display: 'flex', alignItems: 'center', gap: 10,
                        }}
                      >
                        <span style={{ color: '#9B9B9B', flexShrink: 0 }}>&#9679;</span>
                        {s.display}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 20 }}>
                <FormInput label="Apartment, Suite, etc." value={form.apt} onChange={v => updateField('apt', v)} placeholder="Apt 4B (optional)" autoComplete="address-line2" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                <FormInput label="City" value={form.city} onChange={v => updateField('city', v)} required autoComplete="address-level2" />
                <FormInput label="State" value={form.state} onChange={v => updateField('state', v)} required autoComplete="address-level1" />
                <FormInput label="ZIP Code" value={form.zip} onChange={v => updateField('zip', v)} required autoComplete="postal-code" />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelBase}>Country</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={form.country}
                    onChange={e => updateField('country', e.target.value)}
                    style={{ ...inputBase, appearance: 'none' as const, paddingRight: 40, cursor: 'pointer' }}
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
                  <ChevronDown size={16} color="#9B9B9B" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Shipping method */}
              <div style={{ marginBottom: 32 }}>
                <label style={{ ...labelBase, marginBottom: 12 }}>Shipping Method</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Standard Shipping', desc: '5\u20137 business days', price: total > 500 ? 'Free' : '$25' },
                    { label: 'Express Shipping', desc: '2\u20133 business days', price: '$45' },
                    { label: 'Overnight', desc: 'Next business day', price: '$75' },
                  ].map((m, i) => (
                    <label key={m.label} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
                      background: i === 0 ? '#FAFAFA' : '#FFF', border: i === 0 ? '1.5px solid #050505' : '1.5px solid #E5E5E5',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}>
                      <div style={{
                        width: 18, height: 18,
                        border: i === 0 ? '5px solid #050505' : '1.5px solid #E5E5E5',
                        background: '#FFF', flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: '#050505' }}>{m.label}</span>
                        <span style={{ fontFamily: F, fontSize: 13, color: '#9B9B9B', marginLeft: 8 }}>{m.desc}</span>
                      </div>
                      <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: '#050505' }}>{m.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => { setErrors({}); setStep('info') }}
                  style={{
                    padding: '16px 28px', background: 'transparent', border: '1.5px solid #E5E5E5',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#050505',
                    transition: 'all 0.2s ease', minHeight: 52,
                  }}
                >
                  <ArrowLeft size={16} />
                  <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500 }}>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => validateShipping() && setStep('payment')}
                  style={{
                    flex: 1, maxWidth: 280, padding: '16px 36px', background: '#050505', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 10, color: '#FFF', transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Continue to Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ═══ Step 3: Payment ═══ */}
          {step === 'payment' && (
            <div style={{ background: '#FFF', padding: '40px 36px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 4 }}>Payment</h2>
                <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>All transactions are secure and encrypted</p>
              </div>

              {/* Payment method tabs */}
              <div style={{ display: 'flex', gap: 0, marginBottom: 28, overflow: 'hidden', border: '1.5px solid #E5E5E5' }}>
                {['Credit Card', 'Debit Card'].map((tab, i) => (
                  <button key={tab} style={{
                    flex: 1, padding: '14px 16px', background: i === 0 ? '#050505' : '#FFF',
                    border: 'none', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 500,
                    color: i === 0 ? '#FFF' : '#6B6B6B', transition: 'all 0.2s ease',
                    borderRight: i === 0 ? '1px solid #E5E5E5' : 'none',
                  }}>
                    {tab}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelBase}>
                  Card Number <span style={{ color: '#050505', marginLeft: 3 }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={e => updateField('cardNumber', formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    autoComplete="cc-number"
                    style={{ ...inputBase, paddingRight: 80 }}
                  />
                  {getCardBrand(form.cardNumber) && (
                    <span style={{
                      position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                      fontFamily: F, fontSize: 12, fontWeight: 600, color: '#6B6B6B',
                      background: '#F5F5F5', padding: '3px 8px',
                    }}>
                      {getCardBrand(form.cardNumber)}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <FormInput label="Cardholder Name" value={form.cardName} onChange={v => updateField('cardName', v)} required placeholder="Name as it appears on card" autoComplete="cc-name" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                <div>
                  <label style={labelBase}>
                    Expiry Date <span style={{ color: '#050505', marginLeft: 3 }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.cardExpiry}
                    onChange={e => updateField('cardExpiry', formatExpiry(e.target.value))}
                    placeholder="MM / YY"
                    autoComplete="cc-exp"
                    style={inputBase}
                  />
                </div>
                <div>
                  <label style={labelBase}>
                    Security Code <span style={{ color: '#050505', marginLeft: 3 }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      value={form.cardCvc}
                      onChange={e => updateField('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="CVC"
                      autoComplete="cc-csc"
                      style={inputBase}
                    />
                    <Lock size={14} color="#9B9B9B" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
              </div>

              {/* Billing same as shipping */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 32 }}>
                <div style={{
                  width: 20, height: 20, border: form.sameAsBilling ? 'none' : '1.5px solid #E5E5E5',
                  background: form.sameAsBilling ? '#050505' : '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}>
                  {form.sameAsBilling && <Check size={12} color="#FFF" strokeWidth={3} />}
                </div>
                <span style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>Billing address same as shipping</span>
              </label>

              {/* Security trust bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '14px 18px',
                background: '#FAFAFA', marginBottom: 28,
                border: '1px solid #E5E5E5',
              }}>
                <Shield size={16} color="#050505" />
                <span style={{ fontFamily: F, fontSize: 13, color: '#6B6B6B' }}>256-bit SSL encrypted. Your payment info is secure.</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => { setErrors({}); setStep('shipping') }}
                  style={{
                    padding: '16px 28px', background: 'transparent', border: '1.5px solid #E5E5E5',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#050505',
                    transition: 'all 0.2s ease', minHeight: 52,
                  }}
                >
                  <ArrowLeft size={16} />
                  <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500 }}>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => validatePayment() && setStep('review')}
                  style={{
                    flex: 1, maxWidth: 280, padding: '16px 36px', background: '#050505', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 10, color: '#FFF', transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Review Order</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ═══ Step 4: Review & Place Order ═══ */}
          {step === 'review' && (
            <div style={{ background: '#FFF', padding: '40px 36px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 4 }}>Review Your Order</h2>
                <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>Please confirm everything looks correct</p>
              </div>

              {/* Summary cards */}
              {[
                { title: 'Contact', value: `${form.firstName} ${form.lastName}\n${form.email}`, editStep: 'info' as Step },
                { title: 'Ship to', value: `${form.address}${form.apt ? ', ' + form.apt : ''}\n${form.city}, ${form.state} ${form.zip}`, editStep: 'shipping' as Step },
                { title: 'Payment', value: `Card ending in ${form.cardNumber.slice(-4)}\n${form.cardName}`, editStep: 'payment' as Step },
              ].map(section => (
                <div key={section.title} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '18px 20px', background: '#FAFAFA',
                  marginBottom: 12, border: '1px solid #E5E5E5',
                }}>
                  <div>
                    <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: '#9B9B9B', letterSpacing: '0.06em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6 }}>
                      {section.title}
                    </span>
                    {section.value.split('\n').map((line, i) => (
                      <span key={i} style={{ fontFamily: F, fontSize: 14, color: '#050505', display: 'block', lineHeight: 1.5 }}>{line}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(section.editStep)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      fontFamily: F, fontSize: 13, color: '#050505', textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    Change
                  </button>
                </div>
              ))}

              {/* Items */}
              <div style={{ marginTop: 28, marginBottom: 28 }}>
                <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: '#9B9B9B', letterSpacing: '0.06em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 16 }}>
                  Items ({items.length})
                </span>
                {items.map(item => (
                  <div key={item.product.id} style={{
                    display: 'flex', gap: 16, padding: '14px 0',
                    borderBottom: '1px solid #F5F5F5',
                  }}>
                    <div style={{ width: 64, height: 80, position: 'relative', flexShrink: 0, overflow: 'hidden', background: '#F5F5F5' }}>
                      <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: '#050505', marginBottom: 2 }}>{item.product.name}</p>
                      <p style={{ fontFamily: F, fontSize: 13, color: '#9B9B9B' }}>Qty: {item.quantity}</p>
                    </div>
                    <span style={{ fontFamily: F, fontSize: 15, fontWeight: 500, color: '#050505', flexShrink: 0 }}>
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Estimated delivery */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px',
                background: '#FAFAFA', marginBottom: 32,
                border: '1px solid #E5E5E5',
              }}>
                <Truck size={18} color="#050505" />
                <div>
                  <span style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: '#050505', display: 'block' }}>Estimated Delivery</span>
                  <span style={{ fontFamily: F, fontSize: 13, color: '#6B6B6B' }}>{deliveryStr}</span>
                </div>
              </div>

              {!done ? (
                <div>
                  <button
                    onClick={placeOrder}
                    disabled={isProcessing}
                    style={{
                      width: '100%', padding: '18px 36px',
                      background: isProcessing ? '#6B6B6B' : '#050505',
                      border: 'none', cursor: isProcessing ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      color: '#FFF', transition: 'all 0.3s ease',
                    }}
                  >
                    {isProcessing ? (
                      <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, letterSpacing: '0.06em' }}>Processing...</span>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
                          Place Order — ${finalTotal.toLocaleString()}
                        </span>
                      </>
                    )}
                  </button>
                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button
                      onClick={() => setStep('payment')}
                      style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        fontFamily: F, fontSize: 13, color: '#6B6B6B', textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      Go back to payment
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{
                    width: 64, height: 64, margin: '0 auto 20px',
                    background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={28} color="#FFF" strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontFamily: F, fontSize: 22, fontWeight: 400, color: '#050505', marginBottom: 8 }}>Order Confirmed</h3>
                  <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>Redirecting to confirmation...</p>
                </div>
              )}
            </div>
          )}

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32, padding: '0 20px' }}>
            {[
              { icon: <Shield size={16} color="#9B9B9B" />, label: 'Secure Checkout' },
              { icon: <Truck size={16} color="#9B9B9B" />, label: 'Free Shipping 500+' },
              { icon: <RotateCcw size={16} color="#9B9B9B" />, label: '30-Day Returns' },
            ].map(badge => (
              <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {badge.icon}
                <span style={{ fontFamily: F, fontSize: 12, color: '#9B9B9B' }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right: Order Summary ─── */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{
            background: '#FFF', padding: '28px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{ fontFamily: F, fontSize: 16, fontWeight: 600, color: '#050505', marginBottom: 20, letterSpacing: '0.02em' }}>Order Summary</h3>

            {/* Items */}
            <div style={{ marginBottom: 20 }}>
              {items.map(item => (
                <div key={item.product.id} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 68, position: 'relative', flexShrink: 0,
                    overflow: 'hidden', background: '#F5F5F5',
                  }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                    {/* Quantity badge */}
                    <div style={{
                      position: 'absolute', top: -4, right: -4, width: 20, height: 20,
                      background: '#050505', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: F, fontSize: 10, color: '#FFF', fontWeight: 600 }}>{item.quantity}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: '#050505', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.product.name}
                    </p>
                    <p style={{ fontFamily: F, fontSize: 12, color: '#9B9B9B' }}>{item.product.material || item.product.category}</p>
                  </div>
                  <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: '#050505', flexShrink: 0 }}>
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  disabled={promoApplied}
                  style={{
                    ...inputBase, flex: 1, padding: '12px 14px', fontSize: 13,
                    ...(promoApplied ? { background: '#FAFAFA', borderColor: '#050505', color: '#050505' } : {}),
                  }}
                />
                <button
                  onClick={applyPromo}
                  disabled={promoApplied}
                  style={{
                    padding: '12px 20px', background: '#050505',
                    border: 'none', cursor: promoApplied ? 'default' : 'pointer',
                    fontFamily: F, fontSize: 13, fontWeight: 500, color: '#FFF',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {promoApplied ? <Check size={14} /> : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <span style={{ fontFamily: F, fontSize: 12, color: '#050505', marginTop: 6, display: 'block' }}>
                  VAULT10 applied — 10% off
                </span>
              )}
            </div>

            {/* Totals */}
            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: 16 }}>
              {[
                { label: 'Subtotal', value: `$${total.toLocaleString()}` },
                ...(promoApplied ? [{ label: 'Discount (10%)', value: `-$${discount.toLocaleString()}` }] : []),
                { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping}` },
                { label: 'Tax', value: `$${tax.toLocaleString()}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B' }}>{row.label}</span>
                  <span style={{
                    fontFamily: F, fontSize: 14,
                    color: '#050505',
                    fontWeight: row.label.includes('Discount') ? 500 : 400,
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div style={{
                display: 'flex', justifyContent: 'space-between', paddingTop: 16,
                borderTop: '1.5px solid #050505', marginTop: 8,
              }}>
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#050505' }}>Total</span>
                <span style={{ fontFamily: F, fontSize: 22, fontWeight: 400, color: '#050505', letterSpacing: '-0.02em' }}>
                  ${finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Estimated delivery */}
            <div style={{
              marginTop: 20, padding: '14px 16px', background: '#FAFAFA',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Truck size={16} color="#6B6B6B" />
              <div>
                <span style={{ fontFamily: F, fontSize: 12, color: '#6B6B6B', display: 'block' }}>Estimated Delivery</span>
                <span style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: '#050505' }}>{deliveryStr}</span>
              </div>
            </div>
          </div>

          {/* Payment security note */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 }}>
            <Lock size={12} color="#9B9B9B" />
            <span style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B' }}>Secured by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>

      <style>{`
        .minimal-checkout-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 48px;
        }
        @media (max-width: 768px) {
          .minimal-checkout-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .minimal-checkout-grid > div:first-child > div {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </div>
  )
}
