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
const TEXT = '#EAEAEA'

export function VaultCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  if (items.length === 0) {
    return (
      <VaultLayout>
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', marginBottom: 28,
            backgroundColor: 'rgba(212,175,55,0.04)',
            border: '1px solid rgba(212,175,55,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShoppingBag size={28} color="rgba(212,175,55,0.4)" />
          </div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 400, color: TEXT, marginBottom: 12 }}>Your Vault is Empty</h1>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.45)', marginBottom: 36, lineHeight: 1.7 }}>Discover extraordinary pieces to add to your collection.</p>
          <SparkleGlowButton onClick={() => window.location.href='/vault/collections'}>Explore Collections</SparkleGlowButton>
        </div>
      </VaultLayout>
    )
  }

  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '100px 24px 100px' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Your Selection</span>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 3.5vw, 34px)', fontWeight: 400, color: TEXT, marginTop: 8, marginBottom: 8 }}>Shopping Bag</h1>
        <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.35)', marginBottom: 48 }}>{items.length} {items.length === 1 ? 'item' : 'items'}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60 }}>
          {/* Items */}
          <div>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: 'flex', gap: 24, padding: '28px 0', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                <div style={{ width: 120, height: 120, borderRadius: 8, overflow: 'hidden', flexShrink: 0, backgroundColor: SURFACE, border: '1px solid rgba(212,175,55,0.08)' }}>
                  <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{item.product.category.replace(/-/g, ' ')}</div>
                      <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 400, color: TEXT, marginBottom: 4 }}>{item.product.name}</h3>
                      <p style={{ fontSize: 13, color: 'rgba(234,234,234,0.35)' }}>{item.product.subtitle}</p>
                      {item.size && <p style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', marginTop: 4 }}>Size: {item.size}</p>}
                    </div>
                    <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', color: 'rgba(234,234,234,0.25)', cursor: 'pointer', padding: 4, transition: 'color 0.3s' }}><X size={16} /></button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 6, overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ width: 36, height: 36, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                      <span style={{ width: 36, textAlign: 'center', fontSize: 13, color: TEXT, borderLeft: '1px solid rgba(212,175,55,0.06)', borderRight: '1px solid rgba(212,175,55,0.06)' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 36, height: 36, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
                    </div>
                    <span style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ padding: 36, backgroundColor: SURFACE, borderRadius: 10, border: '1px solid rgba(212,175,55,0.08)', height: 'fit-content', position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.45)' }}>Subtotal</span>
              <span style={{ fontSize: 14, color: TEXT }}>${getTotal().toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.45)' }}>Shipping</span>
              <span style={{ fontSize: 14, color: GOLD }}>Complimentary</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: 18, marginTop: 18, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: TEXT }}>Total</span>
              <span style={{ fontSize: 22, fontFamily: 'Cinzel, serif', color: TEXT }}>${getTotal().toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 28 }}><SparkleGlowButton onClick={() => window.location.href='/vault/checkout'}>Proceed to Checkout</SparkleGlowButton></div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24 }}>
              {[{ icon: Shield, label: 'Secure' }, { icon: Truck, label: 'Free Ship' }, { icon: RotateCcw, label: '30-Day' }].map((b) => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <b.icon size={12} color={GOLD} />
                  <span style={{ fontSize: 10, color: 'rgba(234,234,234,0.35)', letterSpacing: '0.05em' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
