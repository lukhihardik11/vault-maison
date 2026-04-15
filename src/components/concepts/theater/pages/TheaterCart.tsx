'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, Star } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#E0C097'
const BG = '#1A1A24'
const SURFACE = '#222230'
const TEXT = '#F5F0EB'
const MUTED = '#888'
const BORDER = '#2A2A38'
const FONT = "'Bodoni Moda', serif"
const BODY = "'Inter', sans-serif"

export function TheaterCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const subtotal = getTotal()
  const total = subtotal

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Star size={40} color={BORDER} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT, marginBottom: 8, fontStyle: 'italic' }}>The Stage is Empty</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>No pieces have taken the stage yet.</p>
        <Link href="/theater/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Enter the Theater</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ padding: '48px 24px 36px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Star size={16} color={ACCENT} />
            <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>Backstage Selection</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: TEXT, fontStyle: 'italic' }}>Your Playbill</h1>
            <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>{getItemCount()} {getItemCount() === 1 ? 'act' : 'acts'}</p>
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
                  <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 4 }}>Act {idx + 1}</div>
                  <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 4, fontStyle: 'italic' }}>{item.product.name}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED }}>{item.product.material}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                    <div style={{ width: 40, height: 32, background: BG, border: `1px solid ${BORDER}`, borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BODY, fontSize: 14, color: TEXT }}>{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: FONT, fontSize: 20, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
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
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Box Office</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: BODY, fontSize: 14 }}><span style={{ color: MUTED }}>Subtotal</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: BODY, fontSize: 14 }}><span style={{ color: MUTED }}>Stage Door Delivery</span><span style={{ color: '#4CAF50' }}>Complimentary</span></div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 26, color: TEXT }}>${total.toLocaleString()}</span>
              </div>
              <Link href="/theater/checkout" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', height: 50, background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontFamily: BODY, fontSize: 13, letterSpacing: '0.08em', color: BG }}>Proceed to Box Office</span>
                  <ArrowRight size={16} color={BG} />
                </button>
              </Link>
              <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED, textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>Each piece arrives in our signature velvet presentation case.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
