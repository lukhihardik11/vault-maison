'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, Hammer, Ruler, Scissors } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#8C3A3A'
const BG = '#F4F1EA'
const SURFACE = '#EDE9E0'
const TEXT = '#2B2B2B'
const MUTED = '#888'
const BORDER = '#D9D4CA'
const FONT = "'Cormorant Garamond', serif"
const BODY = "'Inter', sans-serif"

export function AtelierCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()

  const subtotal = getTotal()
  const shipping = subtotal > 300 ? 0 : 20
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Scissors size={40} color={BORDER} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 30, color: TEXT, marginBottom: 8 }}>Your Workbench is Empty</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>No commissions have been started yet.</p>
        <Link href="/atelier/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>
          Visit the Atelier
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ padding: '48px 24px 36px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Hammer size={16} color={ACCENT} />
            <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>Artisan&apos;s Workbench</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: TEXT }}>Your Commissions</h1>
            <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>{getItemCount()} {getItemCount() === 1 ? 'piece' : 'pieces'} in progress</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
        <div>
          {items.map((item, idx) => (
            <div key={item.product.id} style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', background: SURFACE, borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Ruler size={12} color={ACCENT} />
                  <span style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Commission #{String(idx + 1).padStart(3, '0')}</span>
                </div>
                <span style={{ fontFamily: BODY, fontSize: 10, color: MUTED }}>Handcrafted to Order</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, padding: 20 }}>
                <div style={{ position: 'relative', width: 140, height: 170 }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 400, color: TEXT, marginBottom: 4 }}>{item.product.name}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 4 }}>{item.product.material}</p>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 16 }}>{item.product.category}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, padding: '12px 0', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
                    <div>
                      <div style={{ fontFamily: BODY, fontSize: 10, color: MUTED, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Lead Time</div>
                      <div style={{ fontFamily: FONT, fontSize: 15, color: ACCENT }}>2-3 Weeks</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: BODY, fontSize: 10, color: MUTED, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Technique</div>
                      <div style={{ fontFamily: FONT, fontSize: 15, color: ACCENT }}>Hand-Set</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 34, height: 34, background: BG, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                      <div style={{ width: 42, height: 34, background: '#FFF', border: `1px solid ${BORDER}`, borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BODY, fontSize: 14, color: TEXT }}>{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 34, height: 34, background: BG, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontFamily: FONT, fontSize: 22, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                      <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer', fontSize: 12, fontFamily: BODY, display: 'flex', alignItems: 'center', gap: 4 }}><X size={14} /> Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}>
            <div style={{ padding: '18px 22px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Hammer size={14} color={ACCENT} />
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Commission Summary</span>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, fontFamily: BODY, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Pieces</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Crafting Fee</span><span style={{ color: '#4CAF50' }}>Included</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Artisan Shipping</span><span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span></div>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>${total.toLocaleString()}</span>
              </div>
              <Link href="/atelier/checkout" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', height: 52, background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontFamily: FONT, fontSize: 15, color: '#FFF' }}>Place Commission</span>
                  <ArrowRight size={16} color="#FFF" />
                </button>
              </Link>
              <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>Each piece is handcrafted by our master artisans with a lifetime guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
