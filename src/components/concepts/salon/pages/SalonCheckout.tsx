'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, MapPin, CreditCard, User, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#4A5D23'
const BG = '#FDF5E6'
const TEXT = '#2B2B2B'
const MUTED = '#888'
const BORDER = '#E8DCC4'
const FONT = "'Lora', serif"
const BODY = "'Inter', sans-serif"

type SalonStep = 'guest' | 'address' | 'payment' | 'confirm'

export function SalonCheckout() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<SalonStep>('guest')
  const [confirmed, setConfirmed] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
    giftMessage: '',
  })

  const total = getTotal()
  const steps: { id: SalonStep; label: string }[] = [
    { id: 'guest', label: 'Guest Details' },
    { id: 'address', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirm', label: 'Confirm' },
  ]
  const currentIdx = steps.findIndex(s => s.id === step)
  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const confirmOrder = () => {
    setConfirmed(true)
    setTimeout(() => { clearCart(); router.push('/salon/checkout/confirmation?orderId=SAL-' + Date.now().toString(36).toUpperCase()) }, 2000)
  }

  const inputStyle = { width: '100%', padding: '14px 16px', background: '#FFFFFF', border: `1px solid ${BORDER}`, color: TEXT, fontFamily: BODY, fontSize: 14, outline: 'none', borderRadius: 2 }
  const labelStyle = { fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 6, display: 'block' as const }

  if (items.length === 0 && !confirmed) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <h2 style={{ fontFamily: FONT, fontSize: 24, color: TEXT, marginBottom: 12, fontStyle: 'italic' }}>No Pieces Selected</h2>
        <Link href="/salon/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Return to Salon</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '32px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i < currentIdx ? 'pointer' : 'default' }} onClick={() => i < currentIdx && setStep(s.id)}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < currentIdx ? ACCENT : 'transparent', border: `1.5px solid ${i <= currentIdx ? ACCENT : BORDER}` }}>
                  {i < currentIdx ? <Check size={12} color="#FFF" /> : <span style={{ fontFamily: BODY, fontSize: 11, color: i === currentIdx ? ACCENT : MUTED }}>{i + 1}</span>}
                </div>
                <span style={{ fontFamily: BODY, fontSize: 10, color: i === currentIdx ? ACCENT : MUTED }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: 48, height: 1, background: i < currentIdx ? ACCENT : BORDER, margin: '0 12px', marginBottom: 20 }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48 }}>
        <div>
          {step === 'guest' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><User size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 26, color: TEXT, fontStyle: 'italic' }}>Guest Information</h2></div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>Welcome to our private salon. Your concierge will personally oversee your order.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => updateField('email', e.target.value)} /></div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Phone</label><input style={inputStyle} type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} /></div>
              <div style={{ marginBottom: 32 }}><label style={labelStyle}>Gift Message (optional)</label><textarea style={{ ...inputStyle, height: 70, resize: 'vertical' }} value={form.giftMessage} onChange={e => updateField('giftMessage', e.target.value)} placeholder="Add a personal note for the recipient..." /></div>
              <button onClick={() => setStep('address')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', color: '#FFF' }}>
                <span style={{ fontFamily: FONT, fontSize: 15, fontStyle: 'italic' }}>Continue</span><ArrowRight size={14} />
              </button>
            </div>
          )}

          {step === 'address' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><MapPin size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 26, color: TEXT, fontStyle: 'italic' }}>Delivery Address</h2></div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>Each piece arrives in our signature linen box with a hand-written note from your concierge.</p>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Street Address</label><input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={e => updateField('city', e.target.value)} /></div>
                <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={e => updateField('state', e.target.value)} /></div>
                <div><label style={labelStyle}>ZIP</label><input style={inputStyle} value={form.zip} onChange={e => updateField('zip', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('guest')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8, color: TEXT }}><ArrowLeft size={14} /><span style={{ fontFamily: FONT, fontSize: 15 }}>Back</span></button>
                <button onClick={() => setStep('payment')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8, color: '#FFF' }}><span style={{ fontFamily: FONT, fontSize: 15, fontStyle: 'italic' }}>Continue</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><CreditCard size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 26, color: TEXT, fontStyle: 'italic' }}>Payment Details</h2></div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Card Number</label><input style={inputStyle} value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>Expiry</label><input style={inputStyle} value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="MM/YY" /></div>
                <div><label style={labelStyle}>CVC</label><input style={inputStyle} value={form.cardCvc} onChange={e => updateField('cardCvc', e.target.value)} placeholder="123" type="password" /></div>
                <div><label style={labelStyle}>Name on Card</label><input style={inputStyle} value={form.cardName} onChange={e => updateField('cardName', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('address')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8, color: TEXT }}><ArrowLeft size={14} /><span style={{ fontFamily: FONT, fontSize: 15 }}>Back</span></button>
                <button onClick={() => setStep('confirm')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8, color: '#FFF' }}><span style={{ fontFamily: FONT, fontSize: 15, fontStyle: 'italic' }}>Review Order</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Sparkles size={28} color={ACCENT} style={{ marginBottom: 16 }} />
              <h2 style={{ fontFamily: FONT, fontSize: 30, color: TEXT, fontStyle: 'italic', marginBottom: 12 }}>Confirm Your Selection</h2>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>Your concierge has prepared everything. Each piece will be gift-wrapped and delivered with care.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ width: 80, height: 100, position: 'relative', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              {!confirmed ? (
                <div>
                  <button onClick={confirmOrder} style={{ padding: '18px 56px', background: ACCENT, border: 'none', cursor: 'pointer', borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 10, color: '#FFF' }}>
                    <Sparkles size={16} /><span style={{ fontFamily: FONT, fontSize: 17, fontStyle: 'italic' }}>Complete — ${total.toLocaleString()}</span>
                  </button>
                  <div style={{ marginTop: 16 }}><button onClick={() => setStep('payment')} style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 6, color: TEXT }}><ArrowLeft size={12} /><span style={{ fontFamily: BODY, fontSize: 12 }}>Back</span></button></div>
                </div>
              ) : (
                <div>
                  <div style={{ width: 64, height: 64, margin: '0 auto 20px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><Check size={28} color="#FFF" /></div>
                  <h3 style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, fontStyle: 'italic', marginBottom: 8 }}>Order Confirmed</h3>
                  <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Your concierge is preparing your package...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}>
            <div style={{ padding: '16px 20px', background: '#F5EDD8', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Your Selection</span>
            </div>
            <div style={{ padding: 20 }}>
              {items.map(item => (
                <div key={item.product.id} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 56, position: 'relative', flexShrink: 0, border: `1px solid ${BORDER}` }}><Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</p>
                    <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontFamily: BODY, fontSize: 13, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontSize: 13, marginBottom: 6 }}><span style={{ color: MUTED }}>Delivery</span><span style={{ color: '#4CAF50' }}>Complimentary</span></div>
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
