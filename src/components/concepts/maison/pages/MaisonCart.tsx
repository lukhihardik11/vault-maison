'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, Crown } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#B8860B'
const BG = '#FFFDF7'
const SURFACE = '#FFF'
const TEXT = '#1A1A1A'
const MUTED = '#8B8680'
const BORDER = '#E8E0D4'
const FONT = "'Cormorant Garamond', serif"
const BODY = "'Nunito Sans', sans-serif"

export function MaisonCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const subtotal = getTotal()
  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Crown size={40} color={BORDER} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 32, color: TEXT, marginBottom: 8, fontWeight: 300 }}>La Maison Awaits</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>Your private collection has not yet begun.</p>
        <Link href="/maison/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Enter La Maison</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ padding: '48px 24px 36px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Crown size={16} color={ACCENT} />
            <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>La Maison</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: TEXT }}>Your Private Selection</h1>
            <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>{getItemCount()} {getItemCount() === 1 ? 'piece' : 'pieces'}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        <div>
          {items.map((item, idx) => (
            <div key={item.product.id} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 24, padding: '24px 0', borderBottom: idx < items.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ position: 'relative', width: 130, height: 160, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 4 }}>Maison Exclusive</div>
                  <h3 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 400, color: TEXT, marginBottom: 4 }}>{item.product.name}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED }}>{item.product.material}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                    <div style={{ width: 40, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BODY, fontSize: 14, color: TEXT }}>{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
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
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Order Summary</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, fontFamily: BODY, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Subtotal</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Gift Packaging</span><span style={{ color: '#4CAF50' }}>Complimentary</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>White Glove Delivery</span><span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span></div>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>${total.toLocaleString()}</span>
              </div>
              <Link href="/maison/checkout" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', height: 50, background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontFamily: BODY, fontSize: 13, letterSpacing: '0.08em', color: '#FFF' }}>Continue to Checkout</span>
                  <ArrowRight size={16} color="#FFF" />
                </button>
              </Link>
              <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED, textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>Each piece arrives in our signature Maison presentation box with certificate of authenticity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
