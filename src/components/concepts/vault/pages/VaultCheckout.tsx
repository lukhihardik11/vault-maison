'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Lock, Fingerprint, ArrowRight, ArrowLeft, Check, MapPin, CreditCard, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'
const MUTED = '#888'
const BORDER = '#222'
const FONT = "'Cinzel', serif"
const BODY = "'Inter', sans-serif"

type VaultStep = 'identity' | 'delivery' | 'seal'

export function VaultCheckout() {
  const router = useRouter()
  const { items, getTotal, getItemCount, clearCart } = useCartStore()
  const [step, setStep] = useState<VaultStep>('identity')
  const [sealProgress, setSealProgress] = useState(0)
  const [sealed, setSealed] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  })

  const subtotal = getTotal()
  const insurance = subtotal > 1000 ? 0 : Math.round(subtotal * 0.02)
  const total = subtotal + insurance

  const steps: { id: VaultStep; label: string; icon: typeof Shield }[] = [
    { id: 'identity', label: 'Identity Verification', icon: Fingerprint },
    { id: 'delivery', label: 'Secure Delivery', icon: MapPin },
    { id: 'seal', label: 'Vault Seal', icon: Lock },
  ]

  const currentIdx = steps.findIndex(s => s.id === step)

  const startSeal = () => {
    let progress = 0
    const timer = setInterval(() => {
      progress += 1
      setSealProgress(Math.min(progress, 100))
      if (progress >= 100) {
        clearInterval(timer)
        setSealed(true)
        setTimeout(() => {
          clearCart()
          router.push('/vault/checkout/confirmation?orderId=VM-' + Date.now().toString(36).toUpperCase())
        }, 1500)
      }
    }, 40)
  }

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const inputStyle = {
    width: '100%', padding: '14px 16px', background: SURFACE, border: `1px solid ${BORDER}`,
    color: TEXT, fontFamily: BODY, fontSize: 14, outline: 'none',
  }

  const labelStyle = {
    fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
    color: MUTED, marginBottom: 8, display: 'block',
  }

  if (items.length === 0 && !sealed) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Lock size={32} color={MUTED} />
        <h2 style={{ fontFamily: FONT, fontSize: 24, color: TEXT, marginTop: 24, marginBottom: 12 }}>No Items to Secure</h2>
        <Link href="/vault/collections" style={{ fontFamily: FONT, fontSize: 13, color: GOLD, textDecoration: 'none', borderBottom: `1px solid ${GOLD}`, paddingBottom: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Return to Vault
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      {/* Step Indicator */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: i < currentIdx ? 'pointer' : 'default' }}
                onClick={() => i < currentIdx && setStep(s.id)}>
                <div style={{
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${i <= currentIdx ? GOLD : BORDER}`,
                  background: i < currentIdx ? GOLD : 'transparent',
                }}>
                  {i < currentIdx ? <Check size={14} color={BG} /> : <s.icon size={14} color={i === currentIdx ? GOLD : MUTED} />}
                </div>
                <span style={{
                  fontFamily: BODY, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: i === currentIdx ? GOLD : i < currentIdx ? TEXT : MUTED,
                }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 60, height: 1, background: i < currentIdx ? GOLD : BORDER, margin: '0 16px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        {/* Form Area */}
        <div>
          {step === 'identity' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <Fingerprint size={20} color={GOLD} />
                <h2 style={{ fontFamily: FONT, fontSize: 24, color: TEXT }}>Identity Verification</h2>
              </div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>
                For your security, we verify the identity of every client before processing high-value transactions.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input style={inputStyle} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} placeholder="Enter first name" />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input style={inputStyle} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} placeholder="Enter last name" />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => updateField('email', e.target.value)} placeholder="your@email.com" />
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
              </div>

              <button onClick={() => setStep('delivery')} style={{
                padding: '16px 40px', background: GOLD, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto',
              }}>
                <span style={{ fontFamily: FONT, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: BG }}>Continue</span>
                <ArrowRight size={14} color={BG} />
              </button>
            </div>
          )}

          {step === 'delivery' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <MapPin size={20} color={GOLD} />
                <h2 style={{ fontFamily: FONT, fontSize: 24, color: TEXT }}>Secure Delivery</h2>
              </div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>
                All Vault shipments are insured, require signature, and are delivered in tamper-evident packaging.
              </p>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Street Address</label>
                <input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} placeholder="123 Main Street" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input style={inputStyle} value={form.city} onChange={e => updateField('city', e.target.value)} placeholder="New York" />
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <input style={inputStyle} value={form.state} onChange={e => updateField('state', e.target.value)} placeholder="NY" />
                </div>
                <div>
                  <label style={labelStyle}>ZIP</label>
                  <input style={inputStyle} value={form.zip} onChange={e => updateField('zip', e.target.value)} placeholder="10001" />
                </div>
              </div>

              <div style={{ marginTop: 40, marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <CreditCard size={20} color={GOLD} />
                  <h3 style={{ fontFamily: FONT, fontSize: 20, color: TEXT }}>Payment Method</h3>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input style={inputStyle} value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)}
                      placeholder="4242 4242 4242 4242" type={showCard ? 'text' : 'password'} />
                    <button onClick={() => setShowCard(!showCard)} style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: MUTED,
                    }}>
                      {showCard ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Expiry</label>
                    <input style={inputStyle} value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="MM/YY" />
                  </div>
                  <div>
                    <label style={labelStyle}>CVC</label>
                    <input style={inputStyle} value={form.cardCvc} onChange={e => updateField('cardCvc', e.target.value)} placeholder="123" type="password" />
                  </div>
                  <div>
                    <label style={labelStyle}>Name on Card</label>
                    <input style={inputStyle} value={form.cardName} onChange={e => updateField('cardName', e.target.value)} placeholder="Full name" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('identity')} style={{
                  padding: '16px 32px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <ArrowLeft size={14} color={TEXT} />
                  <span style={{ fontFamily: FONT, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT }}>Back</span>
                </button>
                <button onClick={() => setStep('seal')} style={{
                  padding: '16px 40px', background: GOLD, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: BG }}>Proceed to Seal</span>
                  <ArrowRight size={14} color={BG} />
                </button>
              </div>
            </div>
          )}

          {step === 'seal' && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
                <Lock size={24} color={GOLD} />
                <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>Vault Seal</h2>
              </div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 48, maxWidth: 500, margin: '0 auto 48px', lineHeight: 1.7 }}>
                Your order is ready to be sealed. Once sealed, your items will be authenticated, insured, and dispatched within 24 hours via armored courier.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ width: 80, height: 80, position: 'relative', border: `1px solid ${BORDER}` }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              {!sealed ? (
                <div>
                  <div style={{ width: 160, height: 160, margin: '0 auto 32px', position: 'relative' }}>
                    <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%' }}>
                      <circle cx="80" cy="80" r="70" fill="none" stroke={BORDER} strokeWidth="2" />
                      <circle cx="80" cy="80" r="70" fill="none" stroke={GOLD} strokeWidth="2"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - sealProgress / 100)}`}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.1s', transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={28} color={sealProgress > 0 ? GOLD : MUTED} />
                      <span style={{ fontFamily: BODY, fontSize: 18, color: GOLD, marginTop: 8 }}>{sealProgress}%</span>
                    </div>
                  </div>

                  {sealProgress === 0 ? (
                    <button onClick={startSeal} style={{
                      padding: '20px 60px', background: GOLD, border: 'none', cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                    }}>
                      <ShieldCheck size={18} color={BG} />
                      <span style={{ fontFamily: FONT, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: BG }}>
                        Apply Vault Seal
                      </span>
                    </button>
                  ) : (
                    <p style={{ fontFamily: BODY, fontSize: 13, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Sealing in progress...
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ width: 80, height: 80, margin: '0 auto 24px', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Check size={36} color={BG} />
                  </div>
                  <h3 style={{ fontFamily: FONT, fontSize: 22, color: GOLD, marginBottom: 8 }}>Vault Sealed</h3>
                  <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED }}>Redirecting to confirmation...</p>
                </div>
              )}

              {sealProgress === 0 && (
                <button onClick={() => setStep('delivery')} style={{
                  marginTop: 24, padding: '12px 24px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  <ArrowLeft size={14} color={TEXT} />
                  <span style={{ fontFamily: FONT, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT }}>Back</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${BORDER}` }}>
              <Shield size={14} color={GOLD} />
              <span style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>Order Summary</span>
            </div>

            {items.map(item => (
              <div key={item.product.id} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 60, position: 'relative', flexShrink: 0, border: `1px solid ${BORDER}` }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</p>
                  <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED }}>Qty: {item.quantity}</p>
                </div>
                <span style={{ fontFamily: BODY, fontSize: 13, color: GOLD }}>${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}

            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: BODY, fontSize: 13 }}>
                <span style={{ color: MUTED }}>Subtotal</span>
                <span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: BODY, fontSize: 13 }}>
                <span style={{ color: MUTED }}>Insurance</span>
                <span style={{ color: '#4CAF50' }}>{insurance === 0 ? 'Included' : `$${insurance}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: BODY, fontSize: 13 }}>
                <span style={{ color: MUTED }}>Armored Shipping</span>
                <span style={{ color: '#4CAF50' }}>Complimentary</span>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONT, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 22, color: GOLD }}>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
