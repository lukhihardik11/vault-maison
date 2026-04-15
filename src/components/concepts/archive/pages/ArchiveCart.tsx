'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, BookOpen } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#D4A574'
const BG = '#2C1A1D'
const SURFACE = '#3A2428'
const TEXT = '#F5F0EB'
const MUTED = '#888'
const BORDER = '#4A3035'
const FONT = "'Playfair Display', serif"
const BODY = "'Inter', sans-serif"

export function ArchiveCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const subtotal = getTotal()
  const shipping = subtotal > 300 ? 0 : 20
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <BookOpen size={40} color={BORDER} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT, marginBottom: 8 }}>Archive is Empty</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>No artifacts have been catalogued yet.</p>
        <Link href="/archive/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Browse the Archive</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ padding: '48px 24px 36px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <BookOpen size={16} color={ACCENT} />
            <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>Curated Artifacts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: TEXT }}>Your Archive</h1>
            <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>{getItemCount()} {getItemCount() === 1 ? 'artifact' : 'artifacts'}</p>
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
                  <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 4 }}>Artifact #{String(idx + 1).padStart(2, '0')}</div>
                  <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 4 }}>{item.product.name}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 2 }}>{item.product.material}</p>
                  <div style={{ fontFamily: BODY, fontSize: 11, color: ACCENT, marginTop: 6 }}>Provenance: Authenticated</div>
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
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Archive Summary</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, fontFamily: BODY, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Subtotal</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Authentication</span><span style={{ color: '#4CAF50' }}>Included</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Archival Shipping</span><span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 26, color: TEXT }}>${total.toLocaleString()}</span>
              </div>
              <Link href="/archive/checkout" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', height: 50, background: ACCENT, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontFamily: BODY, fontSize: 13, letterSpacing: '0.08em', color: BG }}>Proceed to Checkout</span>
                  <ArrowRight size={16} color={BG} />
                </button>
              </Link>
              <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED, textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>Each artifact includes authentication documentation and archival packaging.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
