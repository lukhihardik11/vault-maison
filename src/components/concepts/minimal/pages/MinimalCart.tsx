'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const F = "'Inter', 'Helvetica Neue', sans-serif"
const R = 10

export function MinimalCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const subtotal = getTotal()
  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', padding: 40 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        </div>
        <h2 style={{ fontFamily: F, fontSize: 26, color: '#1A1A1A', marginBottom: 8, fontWeight: 300, letterSpacing: '-0.02em' }}>Your bag is empty</h2>
        <p style={{ fontFamily: F, fontSize: 15, color: '#999', marginBottom: 32 }}>Discover our curated collection of fine jewelry</p>
        <Link href="/minimal/collections" style={{
          fontFamily: F, fontSize: 14, color: '#FFF', textDecoration: 'none',
          background: '#1A1A1A', padding: '14px 40px', borderRadius: R,
          letterSpacing: '0.08em', fontWeight: 500, textTransform: 'uppercase' as const,
        }}>
          Shop Collection
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', color: '#1A1A1A' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontFamily: F, fontSize: 40, fontWeight: 300, color: '#1A1A1A', letterSpacing: '-0.03em' }}>
          Your Bag <span style={{ fontFamily: F, fontSize: 20, fontWeight: 300, color: '#999' }}>({getItemCount()})</span>
        </h1>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
        {/* Items */}
        <div style={{ background: '#FFF', borderRadius: 16, padding: '8px 0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {items.map((item, idx) => (
            <div key={item.product.id} style={{
              display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 20,
              padding: '24px 28px',
              borderBottom: idx < items.length - 1 ? '1px solid #F5F5F5' : 'none',
            }}>
              <div style={{ position: 'relative', width: 100, height: 120, borderRadius: R, overflow: 'hidden', background: '#F5F5F5' }}>
                <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4px 0' }}>
                <div>
                  <h3 style={{ fontFamily: F, fontSize: 16, fontWeight: 500, color: '#1A1A1A', marginBottom: 4 }}>{item.product.name}</h3>
                  <p style={{ fontFamily: F, fontSize: 13, color: '#999' }}>{item.product.material || item.product.category}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', borderRadius: R, border: '1.5px solid #E8E8E8', overflow: 'hidden' }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, width: 32, textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontFamily: F, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
                  >
                    <X size={14} /> Remove
                  </button>
                </div>
              </div>
              <div style={{ fontFamily: F, fontSize: 17, color: '#1A1A1A', fontWeight: 500, paddingTop: 4 }}>
                ${(item.product.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#FFF', borderRadius: 16, padding: '28px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontFamily: F, fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 20, letterSpacing: '0.02em' }}>Order Summary</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: F, fontSize: 14, color: '#888' }}>Subtotal</span>
              <span style={{ fontFamily: F, fontSize: 14, color: '#1A1A1A' }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: F, fontSize: 14, color: '#888' }}>Shipping</span>
              <span style={{ fontFamily: F, fontSize: 14, color: shipping === 0 ? '#2E7D32' : '#1A1A1A' }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', paddingTop: 16,
              borderTop: '1.5px solid #1A1A1A', marginTop: 12, marginBottom: 24,
            }}>
              <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>Total</span>
              <span style={{ fontFamily: F, fontSize: 22, fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.02em' }}>${total.toLocaleString()}</span>
            </div>

            <Link href="/minimal/checkout" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%', height: 52, background: '#1A1A1A', border: 'none',
                borderRadius: R, cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 10, transition: 'all 0.2s ease',
              }}>
                <span style={{ fontFamily: F, fontSize: 14, color: '#FFF', letterSpacing: '0.08em', fontWeight: 500, textTransform: 'uppercase' as const }}>
                  Proceed to Checkout
                </span>
                <ArrowRight size={16} color="#FFF" />
              </button>
            </Link>

            <p style={{ fontFamily: F, fontSize: 12, color: '#999', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
              Free shipping on orders over $500
            </p>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
            {[
              { icon: <Shield size={14} color="#BBB" />, label: 'Secure' },
              { icon: <Truck size={14} color="#BBB" />, label: 'Free Ship 500+' },
              { icon: <RotateCcw size={14} color="#BBB" />, label: '30-Day Returns' },
            ].map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {b.icon}
                <span style={{ fontFamily: F, fontSize: 11, color: '#BBB' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
