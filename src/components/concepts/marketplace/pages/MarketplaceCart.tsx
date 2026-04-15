'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#C4956A'
const BG = '#FAF6F1'
const SURFACE = '#FFF'
const TEXT = '#2C1810'
const MUTED = '#8B7355'
const BORDER = '#E8DDD0'
const FONT = "'DM Serif Display', serif"
const BODY = "'DM Sans', sans-serif"

export function MarketplaceCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const subtotal = getTotal()
  const shipping = subtotal > 250 ? 0 : 15
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <ShoppingBag size={40} color={BORDER} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT, marginBottom: 8 }}>Your Basket is Empty</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>Browse our artisan marketplace for handcrafted treasures.</p>
        <Link href="/marketplace/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>Browse Marketplace</Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ padding: '48px 24px 36px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <ShoppingBag size={16} color={ACCENT} />
            <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>Artisan Marketplace</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: TEXT }}>Your Basket</h1>
            <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>{getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        <div>
          {items.map((item, idx) => (
            <div key={item.product.id} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 24, padding: '24px 0', borderBottom: idx < items.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ position: 'relative', width: 130, height: 160, borderRadius: 8, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 4 }}>Handcrafted</div>
                  <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 4 }}>{item.product.name}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED }}>{item.product.material}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                    <div style={{ width: 40, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BODY, fontSize: 14, color: TEXT }}>{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
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
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8 }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>Basket Summary</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, fontFamily: BODY, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Subtotal</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Artisan Packaging</span><span style={{ color: '#4CAF50' }}>Included</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>Shipping</span><span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 26, color: TEXT }}>${total.toLocaleString()}</span>
              </div>
              <Link href="/marketplace/checkout" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', height: 50, background: ACCENT, border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontFamily: BODY, fontSize: 13, letterSpacing: '0.08em', color: '#FFF' }}>Proceed to Checkout</span>
                  <ArrowRight size={16} color="#FFF" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
