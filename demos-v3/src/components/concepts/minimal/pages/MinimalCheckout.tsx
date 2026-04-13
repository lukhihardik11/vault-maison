'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'
import { Check, Lock, Truck, Shield, CreditCard, ChevronLeft } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

type Step = 'information' | 'shipping' | 'payment' | 'confirmation'
const allSteps: Step[] = ['information', 'shipping', 'payment']
const stepLabels: Record<string, string> = { information: 'Information', shipping: 'Shipping', payment: 'Payment' }

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', border: '1px solid #E8E5E0',
  fontSize: '13px', fontWeight: 300, fontFamily: font, color: '#1A1A1A',
  backgroundColor: '#FFFFFF', outline: 'none', transition: 'border-color 200ms ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
  letterSpacing: '0.15em', fontWeight: 500, color: '#9B9590',
  display: 'block', marginBottom: '6px',
}

export function MinimalCheckout() {
  const [step, setStep] = useState<Step>('information')
  const { items, getTotal, clearCart } = useCartStore()
  const [orderNumber] = useState(() => `VM-${Date.now().toString(36).toUpperCase()}`)
  const stepIndex = allSteps.indexOf(step)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  if (step === 'confirmation') {
    return (
      <MinimalLayout>
        <section style={{ padding: '120px 5vw', maxWidth: '560px', margin: '0 auto', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#C4A265', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={24} color="#FFFFFF" strokeWidth={2} />
          </div>
          <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C4A265', marginBottom: '16px', fontWeight: 500 }}>Order Confirmed</p>
          <h1 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A', marginBottom: '12px' }}>Thank You</h1>
          <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9590', marginBottom: '8px' }}>
            Your order <strong style={{ color: '#1A1A1A' }}>{orderNumber}</strong> has been placed.
          </p>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#9B9590', marginBottom: '40px' }}>
            A confirmation email with tracking details will be sent to your inbox shortly. Each piece is carefully inspected and packaged in our signature presentation box.
          </p>
          <Link href="/minimal" style={{ display: 'inline-block', padding: '14px 40px', backgroundColor: '#C4A265', color: '#FFFFFF', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Return to Home
          </Link>
        </section>
      </MinimalLayout>
    )
  }

  return (
    <MinimalLayout>
      <section style={{ padding: '40px 5vw 100px', maxWidth: '1200px', margin: '0 auto' }} className="vm-checkout">
        <Link href="/minimal/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: font, fontSize: '12px', color: '#9B9590', textDecoration: 'none', marginBottom: '32px' }}>
          <ChevronLeft size={14} /> Back to Cart
        </Link>

        {/* Step Progress */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', gap: '0', alignItems: 'center', marginBottom: '16px' }}>
            {allSteps.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: i <= stepIndex ? '#C4A265' : 'transparent', border: i <= stepIndex ? '1px solid #C4A265' : '1px solid #E8E5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms ease' }}>
                    {i < stepIndex ? <Check size={12} color="#FFFFFF" /> : <span style={{ fontFamily: font, fontSize: '10px', color: i <= stepIndex ? '#FFFFFF' : '#9B9590' }}>{i + 1}</span>}
                  </div>
                  <button onClick={() => i < stepIndex ? setStep(s) : undefined} style={{ fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: step === s ? 500 : 300, color: step === s ? '#1A1A1A' : '#9B9590', border: 'none', backgroundColor: 'transparent', cursor: i < stepIndex ? 'pointer' : 'default', padding: 0 }}>
                    {stepLabels[s]}
                  </button>
                </div>
                {i < allSteps.length - 1 && <div style={{ width: '60px', height: '1px', backgroundColor: i < stepIndex ? '#C4A265' : '#E8E5E0', margin: '0 16px', transition: 'background-color 200ms ease' }} />}
              </div>
            ))}
          </div>
          <div style={{ height: '2px', backgroundColor: '#F5F4F0', position: 'relative' }}>
            <div style={{ height: '2px', backgroundColor: '#C4A265', position: 'absolute', top: 0, left: 0, width: `${((stepIndex + 1) / allSteps.length) * 100}%`, transition: 'width 300ms ease' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '64px' }} className="vm-checkout-grid">
          <div>
            {step === 'information' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('shipping') }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#1A1A1A', marginBottom: '4px' }}>Contact Information</p>
                <div><label style={labelStyle}>Email</label><input type="email" required placeholder="your@email.com" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                <div><label style={labelStyle}>Phone</label><input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                <p style={{ fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#1A1A1A', marginTop: '16px', marginBottom: '4px' }}>Shipping Address</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={labelStyle}>First Name</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                  <div><label style={labelStyle}>Last Name</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                </div>
                <div><label style={labelStyle}>Address</label><input type="text" required placeholder="Street address" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                <div><label style={labelStyle}>Apartment, Suite (Optional)</label><input type="text" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                  <div><label style={labelStyle}>City</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                  <div><label style={labelStyle}>State</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                  <div><label style={labelStyle}>ZIP</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                </div>
                <button type="submit" className="vm-btn-gold" style={{ alignSelf: 'flex-start', padding: '16px 48px', backgroundColor: '#C4A265', color: '#FFFFFF', border: 'none', fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, cursor: 'pointer', marginTop: '8px' }}>Continue to Shipping</button>
              </form>
            )}

            {step === 'shipping' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('payment') }} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <p style={{ fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#1A1A1A', marginBottom: '20px' }}>Shipping Method</p>
                {[
                  { label: 'Standard Shipping', desc: '5–7 business days · Fully insured', price: 'Complimentary', icon: Truck },
                  { label: 'Express Shipping', desc: '2–3 business days · Signature required', price: '$25.00', icon: Truck },
                  { label: 'White Glove Delivery', desc: 'Next business day · Personal delivery', price: '$75.00', icon: Shield },
                ].map((opt, i) => (
                  <label key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 16px', borderBottom: '1px solid #F5F4F0', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <input type="radio" name="shipping" defaultChecked={i === 0} style={{ accentColor: '#C4A265', width: '16px', height: '16px' }} />
                      <opt.icon size={18} strokeWidth={1.5} style={{ color: '#C4A265' }} />
                      <div>
                        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#1A1A1A' }}>{opt.label}</p>
                        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#9B9590' }}>{opt.desc}</p>
                      </div>
                    </div>
                    <span style={{ fontFamily: font, fontSize: '13px', fontWeight: i === 0 ? 500 : 300, color: i === 0 ? '#C4A265' : '#1A1A1A' }}>{opt.price}</span>
                  </label>
                ))}
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <button type="button" onClick={() => setStep('information')} style={{ padding: '16px 32px', border: '1px solid #E8E5E0', backgroundColor: 'transparent', color: '#1A1A1A', fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 400, cursor: 'pointer' }}>Back</button>
                  <button type="submit" className="vm-btn-gold" style={{ padding: '16px 48px', backgroundColor: '#C4A265', color: '#FFFFFF', border: 'none', fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, cursor: 'pointer' }}>Continue to Payment</button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={(e) => { e.preventDefault(); clearCart(); setStep('confirmation') }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Lock size={14} color="#C4A265" />
                  <p style={{ fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#1A1A1A' }}>Secure Payment</p>
                </div>
                <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#9B9590', marginTop: '-12px' }}>All transactions are encrypted and secure.</p>
                <div>
                  <label style={labelStyle}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" required placeholder="0000 0000 0000 0000" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} />
                    <CreditCard size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#C4A265' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={labelStyle}>Expiry Date</label><input type="text" required placeholder="MM / YY" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                  <div><label style={labelStyle}>Security Code</label><input type="text" required placeholder="CVC" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                </div>
                <div><label style={labelStyle}>Name on Card</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'} onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'} /></div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <button type="button" onClick={() => setStep('shipping')} style={{ padding: '16px 32px', border: '1px solid #E8E5E0', backgroundColor: 'transparent', color: '#1A1A1A', fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 400, cursor: 'pointer' }}>Back</button>
                  <button type="submit" className="vm-btn-gold" style={{ padding: '16px 48px', backgroundColor: '#C4A265', color: '#FFFFFF', border: 'none', fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={12} /> Place Order · {formatPrice(getTotal())}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ padding: '28px', backgroundColor: '#F5F4F0' }}>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '20px' }}>
                Order Summary · {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0, backgroundColor: '#FFFFFF' }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} sizes="56px" unoptimized />
                    {item.quantity > 1 && <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#C4A265', color: '#FFFFFF', fontFamily: font, fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A' }}>{item.product.name}</p>
                    <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590' }}>{item.product.material}</p>
                  </div>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A' }}>{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
              <div style={{ height: '1px', backgroundColor: '#E8E5E0', margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590' }}>Subtotal</span>
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A' }}>{formatPrice(getTotal())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590' }}>Shipping</span>
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#C4A265' }}>Complimentary</span>
              </div>
              <div style={{ height: '1px', backgroundColor: '#1A1A1A', margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: font, fontSize: '15px', fontWeight: 500, color: '#1A1A1A' }}>Total</span>
                <span style={{ fontFamily: font, fontSize: '15px', fontWeight: 500, color: '#1A1A1A' }}>{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .vm-btn-gold:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          .vm-checkout { padding: 24px 20px 80px !important; }
          .vm-checkout-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
