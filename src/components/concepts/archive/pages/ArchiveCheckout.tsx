'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, MapPin, CreditCard, User, BookOpen } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#D4A574'
const BG = '#2C1A1D'
const SURFACE = '#3A2428'
const TEXT = '#F5F0EB'
const MUTED = '#888'
const BORDER = '#4A3035'
const FONT = "'Playfair Display', serif"
const BODY = "'Inter', sans-serif"

type Step = 'collector' | 'address' | 'payment' | 'archive'

export function ArchiveCheckout() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('collector')
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  })

  const total = getTotal()
  const steps: { id: Step; label: string }[] = [
    { id: 'collector', label: 'Collector' },
    { id: 'address', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'archive', label: 'Archive' },
  ]
  const currentIdx = steps.findIndex(s => s.id === step)
  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const placeOrder = () => {
    setDone(true)
    setTimeout(() => { clearCart(); router.push('/archive/checkout/confirmation?orderId=ARC-' + Date.now().toString(36).toUpperCase()) }, 2000)
  }

  const inputStyle = { width: '100%', padding: '14px 16px', background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, fontFamily: BODY, fontSize: 14, outline: 'none' }
  const labelStyle = { fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 6, display: 'block' as const }

  if (items.length === 0 && !done) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <h2 style={{ fontFamily: FONT, fontSize: 24, color: TEXT, marginBottom: 12 }}>No artifacts selected</h2>
        <Link href="/archive/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Return to Archive</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '28px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i < currentIdx ? 'pointer' : 'default' }} onClick={() => i < currentIdx && setStep(s.id)}>
                <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < currentIdx ? ACCENT : 'transparent', border: `1.5px solid ${i <= currentIdx ? ACCENT : BORDER}` }}>
                  {i < currentIdx ? <Check size={12} color={BG} /> : <span style={{ fontFamily: BODY, fontSize: 11, color: i === currentIdx ? ACCENT : MUTED }}>{i + 1}</span>}
                </div>
                <span style={{ fontFamily: BODY, fontSize: 10, color: i === currentIdx ? ACCENT : MUTED }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: 40, height: 1, background: i < currentIdx ? ACCENT : BORDER, margin: '0 10px', marginBottom: 20 }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48 }}>
        <div>
          {step === 'collector' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><User size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 26, color: TEXT }}>Collector Details</h2></div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>Your identity will be recorded in our provenance ledger for authentication purposes.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => updateField('email', e.target.value)} /></div>
              <div style={{ marginBottom: 32 }}><label style={labelStyle}>Phone</label><input style={inputStyle} type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} /></div>
              <button onClick={() => setStep('address')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', color: BG }}>
                <span style={{ fontFamily: BODY, fontSize: 13 }}>Continue</span><ArrowRight size={14} />
              </button>
            </div>
          )}

          {step === 'address' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><MapPin size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 26, color: TEXT }}>Delivery Address</h2></div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>All artifacts ship in acid-free archival packaging with climate monitoring.</p>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Street Address</label><input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={e => updateField('city', e.target.value)} /></div>
                <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={e => updateField('state', e.target.value)} /></div>
                <div><label style={labelStyle}>ZIP</label><input style={inputStyle} value={form.zip} onChange={e => updateField('zip', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('collector')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: TEXT }}><ArrowLeft size={14} /><span style={{ fontFamily: BODY, fontSize: 13 }}>Back</span></button>
                <button onClick={() => setStep('payment')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: BG }}><span style={{ fontFamily: BODY, fontSize: 13 }}>Continue</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><CreditCard size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 26, color: TEXT }}>Payment Details</h2></div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Card Number</label><input style={inputStyle} value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>Expiry</label><input style={inputStyle} value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="MM/YY" /></div>
                <div><label style={labelStyle}>CVC</label><input style={inputStyle} value={form.cardCvc} onChange={e => updateField('cardCvc', e.target.value)} placeholder="123" type="password" /></div>
                <div><label style={labelStyle}>Name on Card</label><input style={inputStyle} value={form.cardName} onChange={e => updateField('cardName', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('address')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: TEXT }}><ArrowLeft size={14} /><span style={{ fontFamily: BODY, fontSize: 13 }}>Back</span></button>
                <button onClick={() => setStep('archive')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: BG }}><span style={{ fontFamily: BODY, fontSize: 13 }}>Review</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}

          {step === 'archive' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <BookOpen size={28} color={ACCENT} style={{ marginBottom: 16 }} />
              <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT, marginBottom: 12 }}>Archive Your Selection</h2>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>Each piece will be documented in our permanent collection registry with full provenance chain.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ width: 72, height: 90, position: 'relative', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              {!done ? (
                <div>
                  <button onClick={placeOrder} style={{ padding: '18px 56px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, color: BG }}>
                    <BookOpen size={16} /><span style={{ fontFamily: FONT, fontSize: 16 }}>Archive Selection &mdash; ${total.toLocaleString()}</span>
                  </button>
                  <div style={{ marginTop: 16 }}><button onClick={() => setStep('payment')} style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, color: TEXT }}><ArrowLeft size={12} /><span style={{ fontFamily: BODY, fontSize: 12 }}>Back</span></button></div>
                </div>
              ) : (
                <div>
                  <div style={{ width: 64, height: 64, margin: '0 auto 20px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><Check size={28} color={BG} /></div>
                  <h3 style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, marginBottom: 8 }}>Archived</h3>
                  <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Preparing archival documentation...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Archive Details</span>
            </div>
            <div style={{ padding: 20 }}>
              {items.map(item => (
                <div key={item.product.id} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 56, position: 'relative', flexShrink: 0, border: `1px solid ${BORDER}` }}><Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</p>
                    <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontFamily: BODY, fontSize: 13, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontSize: 13, marginBottom: 6 }}><span style={{ color: MUTED }}>Shipping</span><span style={{ color: '#4CAF50' }}>Free</span></div>
                <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: BODY, fontSize: 12, color: MUTED }}>Total</span>
                  <span style={{ fontFamily: FONT, fontSize: 22, color: TEXT }}>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
