'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, Wine, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#4A5D23'
const BG = '#FDF5E6'
const TEXT = '#2B2B2B'
const MUTED = '#888'
const BORDER = '#E8DCC4'
const FONT = "'Lora', serif"
const BODY = "'Inter', sans-serif"

export function SalonCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const subtotal = getTotal()
  const shipping = subtotal > 400 ? 0 : 15
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Wine size={40} color={BORDER} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT, marginBottom: 8, fontStyle: 'italic' }}>Your Tray is Empty</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>No pieces have been presented for your consideration.</p>
        <Link href="/salon/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Enter the Salon</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ padding: '56px 24px 40px', textAlign: 'center', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <Sparkles size={16} color={ACCENT} />
          <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>Private Consultation</span>
        </div>
        <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: TEXT, fontStyle: 'italic' }}>Your Concierge Tray</h1>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginTop: 8 }}>{getItemCount()} {getItemCount() === 1 ? 'piece' : 'pieces'} selected by your concierge</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        <div>
          {items.map((item, idx) => (
            <div key={item.product.id} style={{ display: 'flex', gap: 28, padding: '28px 0', borderBottom: idx < items.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 130, height: 160, position: 'relative', background: '#F5EDD8', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', top: -4, right: -4, width: 22, height: 22, background: ACCENT, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: BODY, fontSize: 10, color: '#FFF', fontWeight: 600 }}>{item.quantity}</span>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 4, fontStyle: 'italic' }}>{item.product.name}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 2 }}>{item.product.material}</p>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: ACCENT }}>{item.product.category}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 32, height: 32, background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: '50%', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                    <span style={{ fontFamily: BODY, fontSize: 15, color: TEXT, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 32, height: 32, background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: '50%', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: FONT, fontSize: 22, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer' }}><X size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', background: '#F5EDD8', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT }}>Consultation Summary</span>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, fontFamily: BODY, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Selected Pieces</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Concierge Service</span><span style={{ color: '#4CAF50' }}>Complimentary</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Salon Delivery</span><span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span></div>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>${total.toLocaleString()}</span>
              </div>
              <Link href="/salon/checkout" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', height: 52, background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 2 }}>
                  <span style={{ fontFamily: FONT, fontSize: 15, color: '#FFF', fontStyle: 'italic' }}>Proceed to Consultation</span>
                  <ArrowRight size={16} color="#FFF" />
                </button>
              </Link>
              <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>Your personal concierge will confirm availability and arrange a private delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
