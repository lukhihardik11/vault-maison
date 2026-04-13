'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { VaultLayout } from '../VaultLayout'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'
import { ElegantDarkButton } from '../ui/ElegantDarkButton'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

export function VaultCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  if (items.length === 0) {
    return (
      <VaultLayout>
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', textAlign: 'center' }}>
          <ShoppingBag size={48} color={MUTED} style={{ marginBottom: 24 }} />
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, color: TEXT, marginBottom: 12 }}>Your Vault is Empty</h1>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', marginBottom: 32 }}>Discover extraordinary pieces to add to your collection.</p>
          <SparkleGlowButton onClick={() => window.location.href='/vault/collections'}>Explore Collections</SparkleGlowButton>
        </div>
      </VaultLayout>
    )
  }

  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '100px 24px 80px' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 400, color: TEXT, marginBottom: 8 }}>Shopping Bag</h1>
        <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.4)', marginBottom: 40 }}>{items.length} {items.length === 1 ? 'item' : 'items'}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60 }}>
          {/* Items */}
          <div>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: 'flex', gap: 24, padding: '24px 0', borderBottom: `1px solid ${MUTED}` }}>
                <div style={{ width: 120, height: 120, borderRadius: 6, overflow: 'hidden', flexShrink: 0, backgroundColor: SURFACE }}>
                  <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 4 }}>{item.product.category.replace(/-/g, ' ')}</div>
                      <h3 style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{item.product.name}</h3>
                      <p style={{ fontSize: 13, color: 'rgba(234,234,234,0.4)' }}>{item.product.subtitle}</p>
                      {item.size && <p style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', marginTop: 4 }}>Size: {item.size}</p>}
                    </div>
                    <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', color: 'rgba(234,234,234,0.3)', cursor: 'pointer', padding: 4 }}><X size={16} /></button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${MUTED}`, borderRadius: 4 }}>
                      <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 36, height: 36, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                      <span style={{ width: 36, textAlign: 'center', fontSize: 13, color: TEXT }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 36, height: 36, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
                    </div>
                    <span style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ padding: 32, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)', height: 'fit-content', position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, color: TEXT, marginBottom: 24 }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.5)' }}>Subtotal</span>
              <span style={{ fontSize: 14, color: TEXT }}>${getTotal().toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.5)' }}>Shipping</span>
              <span style={{ fontSize: 14, color: GOLD }}>Complimentary</span>
            </div>
            <div style={{ borderTop: `1px solid ${MUTED}`, paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: TEXT }}>Total</span>
              <span style={{ fontSize: 20, fontFamily: 'Cinzel, serif', color: TEXT }}>${getTotal().toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 24 }}><SparkleGlowButton onClick={() => window.location.href='/vault/checkout'}>Proceed to Checkout</SparkleGlowButton></div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 24 }}>
              {[{ icon: Shield, label: 'Secure' }, { icon: Truck, label: 'Free Ship' }, { icon: RotateCcw, label: '30-Day' }].map((b) => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <b.icon size={12} color={GOLD} />
                  <span style={{ fontSize: 10, color: 'rgba(234,234,234,0.4)' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
