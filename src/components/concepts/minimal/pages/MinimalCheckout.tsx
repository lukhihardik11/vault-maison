'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, MapPin, CreditCard, User } from 'lucide-react'
import { useCartStore } from '@/store/cart'

type Step = 'info' | 'address' | 'pay' | 'place'

export function MinimalCheckout() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('info')
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', phone: '', address: '', city: '', state: '', zip: '', cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '' })
  const total = getTotal()
  const steps: { id: Step; label: string }[] = [{ id: 'info', label: 'Details' }, { id: 'address', label: 'Delivery' }, { id: 'pay', label: 'Pay' }, { id: 'place', label: 'Place' }]
  const currentIdx = steps.findIndex(s => s.id === step)
  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))
  const placeOrder = () => { setDone(true); setTimeout(() => { clearCart(); router.push('/minimal/checkout/confirmation?orderId=MIN-' + Date.now().toString(36).toUpperCase()) }, 1500) }
  const F = "'Helvetica Neue', sans-serif"
  const inputStyle = { width: '100%', padding: '14px 16px', background: '#FFF', border: '1px solid #E5E5E5', color: '#050505', fontFamily: F, fontSize: 14, outline: 'none' }
  const labelStyle = { fontFamily: F, fontSize: 12, color: '#999', marginBottom: 6, display: 'block' as const }

  if (items.length === 0 && !done) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFF', padding: 40 }}>
        <h2 style={{ fontFamily: F, fontSize: 24, color: '#050505', marginBottom: 12, fontWeight: 300 }}>Nothing to check out</h2>
        <Link href="/minimal/collections" style={{ fontFamily: F, fontSize: 13, color: '#050505', textDecoration: 'none', borderBottom: '1px solid #050505', paddingBottom: 2 }}>Shop</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#FFF', minHeight: '100vh', color: '#050505' }}>
      <div style={{ borderBottom: '1px solid #E5E5E5', padding: '28px 24px' }}>
        <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i < currentIdx ? 'pointer' : 'default' }} onClick={() => i < currentIdx && setStep(s.id)}>
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < currentIdx ? '#050505' : 'transparent', border: `1px solid ${i <= currentIdx ? '#050505' : '#E5E5E5'}` }}>
                  {i < currentIdx ? <Check size={10} color="#FFF" /> : <span style={{ fontFamily: F, fontSize: 10, color: i === currentIdx ? '#050505' : '#999' }}>{i + 1}</span>}
                </div>
                <span style={{ fontFamily: F, fontSize: 10, color: i === currentIdx ? '#050505' : '#999' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: 48, height: 1, background: i < currentIdx ? '#050505' : '#E5E5E5', margin: '0 12px', marginBottom: 20 }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 64 }}>
        <div>
          {step === 'info' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 300, marginBottom: 32 }}>Your Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => updateField('email', e.target.value)} /></div>
              <div style={{ marginBottom: 32 }}><label style={labelStyle}>Phone</label><input style={inputStyle} type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} /></div>
              <button onClick={() => setStep('address')} style={{ padding: '14px 36px', background: '#050505', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', color: '#FFF' }}>
                <span style={{ fontFamily: F, fontSize: 13 }}>Continue</span><ArrowRight size={14} />
              </button>
            </div>
          )}
          {step === 'address' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 300, marginBottom: 32 }}>Delivery</h2>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Address</label><input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={e => updateField('city', e.target.value)} /></div>
                <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={e => updateField('state', e.target.value)} /></div>
                <div><label style={labelStyle}>ZIP</label><input style={inputStyle} value={form.zip} onChange={e => updateField('zip', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('info')} style={{ padding: '14px 28px', background: 'transparent', border: '1px solid #E5E5E5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#050505' }}><ArrowLeft size={14} /><span style={{ fontFamily: F, fontSize: 13 }}>Back</span></button>
                <button onClick={() => setStep('pay')} style={{ padding: '14px 36px', background: '#050505', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#FFF' }}><span style={{ fontFamily: F, fontSize: 13 }}>Continue</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}
          {step === 'pay' && (
            <div>
              <h2 style={{ fontFamily: F, fontSize: 24, fontWeight: 300, marginBottom: 32 }}>Payment</h2>
              <div style={{ marginBottom: 20 }}><label style={labelStyle}>Card Number</label><input style={inputStyle} value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 20, marginBottom: 32 }}>
                <div><label style={labelStyle}>Expiry</label><input style={inputStyle} value={form.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="MM/YY" /></div>
                <div><label style={labelStyle}>CVC</label><input style={inputStyle} value={form.cardCvc} onChange={e => updateField('cardCvc', e.target.value)} placeholder="123" type="password" /></div>
                <div><label style={labelStyle}>Name</label><input style={inputStyle} value={form.cardName} onChange={e => updateField('cardName', e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep('address')} style={{ padding: '14px 28px', background: 'transparent', border: '1px solid #E5E5E5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#050505' }}><ArrowLeft size={14} /><span style={{ fontFamily: F, fontSize: 13 }}>Back</span></button>
                <button onClick={() => setStep('place')} style={{ padding: '14px 36px', background: '#050505', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#FFF' }}><span style={{ fontFamily: F, fontSize: 13 }}>Review</span><ArrowRight size={14} /></button>
              </div>
            </div>
          )}
          {step === 'place' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <h2 style={{ fontFamily: F, fontSize: 28, fontWeight: 300, marginBottom: 32 }}>Place Order</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
                {items.map(item => (<div key={item.product.id} style={{ width: 64, height: 80, position: 'relative', background: '#F5F5F5' }}><Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} /></div>))}
              </div>
              {!done ? (
                <div>
                  <button onClick={placeOrder} style={{ padding: '16px 56px', background: '#050505', border: 'none', cursor: 'pointer', color: '#FFF' }}>
                    <span style={{ fontFamily: F, fontSize: 14 }}>Place Order — ${total.toLocaleString()}</span>
                  </button>
                  <div style={{ marginTop: 16 }}><button onClick={() => setStep('pay')} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #E5E5E5', cursor: 'pointer', color: '#050505' }}><span style={{ fontFamily: F, fontSize: 12 }}>Back</span></button></div>
                </div>
              ) : (
                <div>
                  <div style={{ width: 48, height: 48, margin: '0 auto 16px', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={24} color="#FFF" /></div>
                  <h3 style={{ fontFamily: F, fontSize: 20, fontWeight: 300 }}>Done</h3>
                  <p style={{ fontFamily: F, fontSize: 13, color: '#999', marginTop: 8 }}>Order placed.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'sticky', top: 100, borderTop: '2px solid #050505', paddingTop: 20 }}>
          <span style={{ fontFamily: F, fontSize: 12, color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Order</span>
          <div style={{ marginTop: 16 }}>
            {items.map(item => (
              <div key={item.product.id} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 50, position: 'relative', flexShrink: 0, background: '#F5F5F5' }}><Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: F, fontSize: 12, color: '#050505', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</p>
                  <p style={{ fontFamily: F, fontSize: 11, color: '#999' }}>Qty: {item.quantity}</p>
                </div>
                <span style={{ fontFamily: F, fontSize: 13 }}>${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: F, fontSize: 12, color: '#999' }}>Total</span>
              <span style={{ fontFamily: F, fontSize: 20, fontWeight: 300 }}>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
