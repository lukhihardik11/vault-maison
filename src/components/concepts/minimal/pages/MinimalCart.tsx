'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export function MinimalCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const subtotal = getTotal()
  const total = subtotal

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFF', padding: 40 }}>
        <h2 style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 24, color: '#050505', marginBottom: 8, fontWeight: 300 }}>Nothing here yet</h2>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#999', marginBottom: 32 }}>Your bag is empty.</p>
        <Link href="/minimal/collections" style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#050505', textDecoration: 'none', borderBottom: '1px solid #050505', paddingBottom: 2 }}>Shop</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#FFF', minHeight: '100vh', color: '#050505' }}>
      <div style={{ padding: '64px 24px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 48, fontWeight: 300, color: '#050505', letterSpacing: '-0.02em' }}>Bag ({getItemCount()})</h1>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64 }}>
        <div>
          <div style={{ borderTop: '1px solid #E5E5E5' }}>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 24, padding: '24px 0', borderBottom: '1px solid #E5E5E5' }}>
                <div style={{ position: 'relative', width: 100, height: 120, background: '#F5F5F5' }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 400, color: '#050505', marginBottom: 4 }}>{item.product.name}</h3>
                    <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#999' }}>{item.product.material}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E5E5' }}>
                      <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#050505' }}><Minus size={14} /></button>
                      <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, width: 32, textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#050505' }}><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, textDecoration: 'underline' }}>Remove</button>
                  </div>
                </div>
                <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, color: '#050505', fontWeight: 400 }}>${(item.product.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ borderTop: '2px solid #050505', paddingTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14 }}>
              <span style={{ color: '#999' }}>Subtotal</span><span>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14 }}>
              <span style={{ color: '#999' }}>Shipping</span><span>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #E5E5E5', marginTop: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#999' }}>Total</span>
              <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 24, fontWeight: 300 }}>${total.toLocaleString()}</span>
            </div>
            <Link href="/minimal/checkout" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', height: 48, background: '#050505', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#FFF', letterSpacing: '0.05em' }}>Checkout</span>
                <ArrowRight size={16} color="#FFF" />
              </button>
            </Link>
            <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: '#999', textAlign: 'center', marginTop: 12 }}>Free shipping. 30-day returns.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
