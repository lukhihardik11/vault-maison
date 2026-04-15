'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, MapPin, CreditCard, Zap, Activity, Microscope, Radio } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const CYAN = '#00E5FF'
const BG = '#0D1B2A'
const SURFACE = '#112240'
const TEXT = '#FFFFFF'
const MUTED = '#8892B0'
const BORDER = '#1B3A5C'
const FONT = "'IBM Plex Mono', monospace"
const BODY = "'Inter', sans-serif"

type ObsStep = 'calibrate' | 'coordinates' | 'instrument' | 'transmit'

export function ObservatoryCheckout() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<ObsStep>('calibrate')
  const [transmitProgress, setTransmitProgress] = useState(0)
  const [transmitted, setTransmitted] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  })

  const subtotal = getTotal()
  const certFee = items.length * 25
  const total = subtotal + certFee

  const steps: { id: ObsStep; label: string; icon: typeof Microscope }[] = [
    { id: 'calibrate', label: 'Calibrate', icon: Microscope },
    { id: 'coordinates', label: 'Coordinates', icon: MapPin },
    { id: 'instrument', label: 'Instrument', icon: CreditCard },
    { id: 'transmit', label: 'Transmit', icon: Radio },
  ]

  const currentIdx = steps.findIndex(s => s.id === step)
  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const startTransmit = () => {
    let p = 0
    const timer = setInterval(() => {
      p += 2
      setTransmitProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(timer)
        setTransmitted(true)
        setTimeout(() => {
          clearCart()
          router.push('/observatory/checkout/confirmation?orderId=OBS-' + Date.now().toString(36).toUpperCase())
        }, 1200)
      }
    }, 50)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', background: BG, border: `1px solid ${BORDER}`,
    color: TEXT, fontFamily: FONT, fontSize: 13, outline: 'none', letterSpacing: '0.02em',
  }
  const labelStyle = {
    fontFamily: FONT, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
    color: MUTED, marginBottom: 6, display: 'block',
  }

  if (items.length === 0 && !transmitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Microscope size={32} color={MUTED} />
        <h2 style={{ fontFamily: FONT, fontSize: 18, color: TEXT, marginTop: 20, marginBottom: 12 }}>NO SPECIMENS QUEUED</h2>
        <Link href="/observatory/collections" style={{ fontFamily: FONT, fontSize: 12, color: CYAN, textDecoration: 'none', borderBottom: `1px solid ${CYAN}`, paddingBottom: 4 }}>
          RETURN TO OBSERVATORY →
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      {/* Step indicator */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '24px', background: SURFACE }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: i < currentIdx ? 'pointer' : 'default' }}
                onClick={() => i < currentIdx && setStep(s.id)}>
                <div style={{
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i < currentIdx ? CYAN : 'transparent',
                  border: `1px solid ${i <= currentIdx ? CYAN : BORDER}`,
                }}>
                  {i < currentIdx ? <Check size={12} color={BG} /> : <span style={{ fontFamily: FONT, fontSize: 11, color: i === currentIdx ? CYAN : MUTED }}>{i + 1}</span>}
                </div>
                <span style={{ fontFamily: FONT, fontSize: 10, letterSpacing: '0.1em', color: i === currentIdx ? CYAN : i < currentIdx ? TEXT : MUTED }}>
                  {s.label.toUpperCase()}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 40, height: 1, background: i < currentIdx ? CYAN : BORDER, margin: '0 12px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
        <div>
          {step === 'calibrate' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <Microscope size={18} color={CYAN} />
                <h2 style={{ fontFamily: FONT, fontSize: 20, color: TEXT, letterSpacing: '0.03em' }}>STEP 1: CALIBRATE IDENTITY</h2>
              </div>
              <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginBottom: 28, lineHeight: 1.7 }}>
                Calibrate your observer profile. All data is encrypted with AES-256 and transmitted over secure channels.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => updateField('email', e.target.value)} /></div>
              <div style={{ marginBottom: 28 }}><label style={labelStyle}>Phone</label><input style={inputStyle} type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} /></div>
              <button onClick={() => setStep('coordinates')} style={{
                padding: '14px 36px', background: CYAN, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto',
              }}>
                <span style={{ fontFamily: FONT, fontSize: 11, letterSpacing: '0.1em', color: BG, fontWeight: 600 }}>NEXT: COORDINATES</span>
                <ArrowRight size={14} color={BG} />
              </button>
            </div>
          )}

          {step === 'coordinates' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <MapPin size={18} color={CYAN} />
                <h2 style={{ fontFamily: FONT, fontSize: 20, color: TEXT, letterSpacing: '0.03em' }}>STEP 2: DELIVERY COORDINATES</h2>
              </div>
              <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginBottom: 28, lineHeight: 1.7 }}>
                Specify the delivery coordinates. All shipments include GPS tracking and signature verification.
              </p>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Street Address</label><input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
                <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={e => updateField('city', e.target.value)} /></div>
                <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={e => updateField('state', e.target.value)} /></div>
                <div><label style={labelStyle}>ZIP</label><input style={inputStyle} value={form.zip} onChange={e => updateField('zip', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('calibrate')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ArrowLeft size={14} color={TEXT} /><span style={{ fontFamily: FONT, fontSize: 11, letterSpacing: '0.1em', color: TEXT }}>BACK</span>
                </button>
                <button onClick={() => setStep('instrument')} style={{ padding: '14px 36px', background: CYAN, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, letterSpacing: '0.1em', color: BG, fontWeight: 600 }}>NEXT: INSTRUMENT</span><ArrowRight size={14} color={BG} />
                </button>
              </div>
            </div>
          )}

          {step === 'instrument' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <CreditCard size={18} color={CYAN} />
                <h2 style={{ fontFamily: FONT, fontSize: 20, color: TEXT, letterSpacing: '0.03em' }}>STEP 3: PAYMENT INSTRUMENT</h2>
              </div>
              <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginBottom: 28, lineHeight: 1.7 }}>
                Configure your payment instrument. PCI DSS Level 1 compliant processing.
              </p>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Card Number</label><input style={inputStyle} value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16, marginBottom: 16 }}>
                <div><label style={labelStyle}>Expiry</label><input style={inputStyle} value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="MM/YY" /></div>
                <div><label style={labelStyle}>CVC</label><input style={inputStyle} value={form.cardCvc} onChange={e => updateField('cardCvc', e.target.value)} placeholder="123" type="password" /></div>
                <div><label style={labelStyle}>Name on Card</label><input style={inputStyle} value={form.cardName} onChange={e => updateField('cardName', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
                <button onClick={() => setStep('coordinates')} style={{ padding: '14px 28px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ArrowLeft size={14} color={TEXT} /><span style={{ fontFamily: FONT, fontSize: 11, letterSpacing: '0.1em', color: TEXT }}>BACK</span>
                </button>
                <button onClick={() => setStep('transmit')} style={{ padding: '14px 36px', background: CYAN, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, letterSpacing: '0.1em', color: BG, fontWeight: 600 }}>NEXT: TRANSMIT</span><ArrowRight size={14} color={BG} />
                </button>
              </div>
            </div>
          )}

          {step === 'transmit' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Radio size={24} color={CYAN} style={{ marginBottom: 16 }} />
              <h2 style={{ fontFamily: FONT, fontSize: 22, color: TEXT, marginBottom: 12, letterSpacing: '0.03em' }}>STEP 4: TRANSMIT ORDER</h2>
              <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
                All parameters verified. Initiate secure transmission to process your acquisition.
              </p>

              {!transmitted ? (
                <div>
                  <div style={{ maxWidth: 400, margin: '0 auto 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: FONT, fontSize: 10, color: MUTED }}>
                      <span>TRANSMISSION</span><span style={{ color: CYAN }}>{transmitProgress}%</span>
                    </div>
                    <div style={{ height: 4, background: BORDER, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${transmitProgress}%`, background: CYAN, transition: 'width 0.1s', boxShadow: `0 0 10px ${CYAN}` }} />
                    </div>
                  </div>
                  {transmitProgress === 0 ? (
                    <div>
                      <button onClick={startTransmit} style={{
                        padding: '16px 48px', background: CYAN, border: 'none', cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                      }}>
                        <Zap size={16} color={BG} />
                        <span style={{ fontFamily: FONT, fontSize: 12, letterSpacing: '0.1em', color: BG, fontWeight: 600 }}>TRANSMIT ORDER</span>
                      </button>
                      <div style={{ marginTop: 16 }}>
                        <button onClick={() => setStep('instrument')} style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <ArrowLeft size={12} color={TEXT} /><span style={{ fontFamily: FONT, fontSize: 10, color: TEXT }}>BACK</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontFamily: FONT, fontSize: 12, color: CYAN, letterSpacing: '0.1em' }}>TRANSMITTING...</p>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ width: 64, height: 64, margin: '0 auto 20px', background: CYAN, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Check size={28} color={BG} />
                  </div>
                  <h3 style={{ fontFamily: FONT, fontSize: 18, color: CYAN, marginBottom: 8 }}>TRANSMISSION COMPLETE</h3>
                  <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Redirecting to confirmation...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={12} color={CYAN} />
              <span style={{ fontFamily: FONT, fontSize: 10, color: CYAN, letterSpacing: '0.1em' }}>ORDER DATA</span>
            </div>
            <div style={{ padding: 18 }}>
              {items.map(item => (
                <div key={item.product.id} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 50, position: 'relative', flexShrink: 0, border: `1px solid ${BORDER}` }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: FONT, fontSize: 11, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</p>
                    <p style={{ fontFamily: FONT, fontSize: 10, color: MUTED }}>x{item.quantity}</p>
                  </div>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: CYAN }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: MUTED }}>Subtotal</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: MUTED }}>Certification</span><span style={{ color: TEXT }}>${certFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: MUTED }}>Shipping</span><span style={{ color: '#4CAF50' }}>FREE</span>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 10, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONT, fontSize: 10, color: MUTED }}>TOTAL</span>
                <span style={{ fontFamily: FONT, fontSize: 20, color: CYAN }}>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
