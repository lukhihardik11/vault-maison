'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, MapPin, CreditCard, Hammer, User, Gem } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#8C3A3A'
const BG = '#F4F1EA'
const TEXT = '#2B2B2B'
const MUTED = '#888'
const BORDER = '#D9D4CA'
const FONT = "'Cormorant Garamond', serif"
const BODY = "'Inter', sans-serif"

type AtelierStep = 'patron' | 'atelier' | 'payment' | 'commission'

export function AtelierCheckout() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<AtelierStep>('patron')
  const [commissioned, setCommissioned] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
    notes: '',
  })

  const subtotal = getTotal()
  const total = subtotal

  const steps: { id: AtelierStep; label: string }[] = [
    { id: 'patron', label: 'Patron Details' },
    { id: 'atelier', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'commission', label: 'Commission' },
  ]
  const currentIdx = steps.findIndex(s => s.id === step)
  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const placeCommission = () => {
    setCommissioned(true)
    setTimeout(() => {
      clearCart()
      router.push('/atelier/checkout/confirmation?orderId=ATL-' + Date.now().toString(36).toUpperCase())
    }, 2000)
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', background: '#FFFFFF', border: `1px solid ${BORDER}`,
    color: TEXT, fontFamily: BODY, fontSize: 14, outline: 'none',
  }
  const labelStyle = { fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 6, display: 'block' as const }

  if (items.length === 0 && !commissioned) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <h2 style={{ fontFamily: FONT, fontSize: 26, color: TEXT, marginBottom: 12 }}>No Commissions Pending</h2>
        <Link href="/atelier/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Return to Atelier</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '28px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i < currentIdx ? 'pointer' : 'default' }} onClick={() => i < currentIdx && setStep(s.id)}>
                <div style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < currentIdx ? ACCENT : 'transparent', border: `1.5px solid ${i <= currentIdx ? ACCENT : BORDER}` }}>
                  {i < currentIdx ? <Check size={12} color="#FFF" /> : <span style={{ fontFamily: FONT, fontSize: 14, color: i === currentIdx ? ACCENT : MUTED }}>{i + 1}</span>}
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
          {step === 'patron' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><User size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>Patron Information</h2></div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>As a patron of the atelier, your details are recorded for bespoke service and future commissions.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => updateField('email', e.target.value)} /></div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Phone</label><input style={inputStyle} type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} /></div>
              <div style={{ marginBottom: 32 }}><label style={labelStyle}>Special Instructions (optional)</label><textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.notes} onChange={e => updateField('notes', e.target.value)} placeholder="Engraving, sizing, material preferences..." /></div>
              <button onClick={() => setStep('atelier')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', color: '#FFF' }}>
                <span style={{ fontFamily: FONT, fontSize: 15 }}>Continue</span><ArrowRight size={14} />
              </button>
            </div>
          )}

          {step === 'atelier' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><MapPin size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>Delivery Address</h2></div>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32, lineHeight: 1.7 }}>Each commission is packaged in our signature artisan box with hand-tied ribbon.</p>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Street Address</label><input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={e => updateField('city', e.target.value)} /></div>
                <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={e => updateField('state', e.target.value)} /></div>
                <div><label style={labelStyle}>ZIP</label><input style={inputStyle} value={form.zip} onChange={e => updateField('zip', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('patron')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: TEXT }}><ArrowLeft size={14} /><span style={{ fontFamily: FONT, fontSize: 15 }}>Back</span></button>
                <button onClick={() => setStep('payment')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#FFF' }}><span style={{ fontFamily: FONT, fontSize: 15 }}>Continue</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}><CreditCard size={18} color={ACCENT} /><h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>Payment Details</h2></div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Card Number</label><input style={inputStyle} value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>Expiry</label><input style={inputStyle} value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="MM/YY" /></div>
                <div><label style={labelStyle}>CVC</label><input style={inputStyle} value={form.cardCvc} onChange={e => updateField('cardCvc', e.target.value)} placeholder="123" type="password" /></div>
                <div><label style={labelStyle}>Name on Card</label><input style={inputStyle} value={form.cardName} onChange={e => updateField('cardName', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('atelier')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: TEXT }}><ArrowLeft size={14} /><span style={{ fontFamily: FONT, fontSize: 15 }}>Back</span></button>
                <button onClick={() => setStep('commission')} style={{ padding: '14px 36px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#FFF' }}><span style={{ fontFamily: FONT, fontSize: 15 }}>Review Commission</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}

          {step === 'commission' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Gem size={28} color={ACCENT} style={{ marginBottom: 16 }} />
              <h2 style={{ fontFamily: FONT, fontSize: 32, color: TEXT, marginBottom: 12 }}>Confirm Your Commission</h2>
              <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>Our master artisans will begin crafting your pieces within 48 hours. Each commission includes a signed certificate of craftsmanship.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ width: 80, height: 100, position: 'relative', border: `1px solid ${BORDER}` }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              {!commissioned ? (
                <div>
                  <button onClick={placeCommission} style={{ padding: '18px 56px', background: ACCENT, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, color: '#FFF' }}>
                    <Hammer size={16} /><span style={{ fontFamily: FONT, fontSize: 17 }}>Place Commission — ${total.toLocaleString()}</span>
                  </button>
                  <div style={{ marginTop: 16 }}>
                    <button onClick={() => setStep('payment')} style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, color: TEXT }}><ArrowLeft size={12} /><span style={{ fontFamily: BODY, fontSize: 12 }}>Back</span></button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ width: 64, height: 64, margin: '0 auto 20px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><Check size={28} color="#FFF" /></div>
                  <h3 style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, marginBottom: 8 }}>Commission Placed</h3>
                  <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Your artisan has been notified...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Hammer size={12} color={ACCENT} />
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Commission Details</span>
            </div>
            <div style={{ padding: 20 }}>
              {items.map(item => (
                <div key={item.product.id} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 56, position: 'relative', flexShrink: 0, border: `1px solid ${BORDER}` }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: FONT, fontSize: 13, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</p>
                    <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontFamily: BODY, fontSize: 13, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontSize: 13, marginBottom: 6 }}><span style={{ color: MUTED }}>Crafting</span><span style={{ color: '#4CAF50' }}>Included</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontSize: 13, marginBottom: 6 }}><span style={{ color: MUTED }}>Shipping</span><span style={{ color: '#4CAF50' }}>Complimentary</span></div>
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
