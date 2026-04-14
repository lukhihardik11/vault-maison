'use client'

import React from 'react'
import Link from 'next/link'
import { SalonLayout, S } from '../SalonLayout'
import { SalonButton } from '../ui/SalonButton'
import { useCartStore } from '@/store/cart'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'

export function SalonCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <SalonLayout>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 32px 100px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: S.text, margin: '0 0 40px', textAlign: 'center' }}>
          Your Selection
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <ShoppingBag size={48} color={S.border} style={{ marginBottom: 20 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: S.text, marginBottom: 8 }}>Your bag is empty</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 28 }}>Let our advisors help you find something special.</p>
            <SalonButton href="/salon/collections">Browse Collection</SalonButton>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48 }}>
            {/* Items */}
            <div>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: `1px solid ${S.border}` }}>
                  <div style={{ width: 100, height: 120, borderRadius: S.radiusSm, overflow: 'hidden', background: S.warmPanel, flexShrink: 0 }}>
                    <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Link href={`/salon/product/${item.product.slug}`} style={{ textDecoration: 'none' }}>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: S.text, margin: '0 0 4px' }}>{item.product.name}</p>
                        </Link>
                        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', color: S.textSecondary, margin: 0 }}>{item.product.subtitle}</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', color: S.textSecondary, cursor: 'pointer', padding: 4 }}>
                        <X size={16} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${S.border}`, borderRadius: S.radiusSm, padding: '4px 8px' }}>
                        <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.textSecondary, padding: 4 }}><Minus size={14} /></button>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: S.text, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.textSecondary, padding: 4 }}><Plus size={14} /></button>
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: S.text }}>{item.product.priceDisplay}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ background: S.warmPanel, borderRadius: S.radiusLg, padding: '28px', position: 'sticky', top: 120, height: 'fit-content' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: S.text, margin: '0 0 20px' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary }}>
                <span>Subtotal</span><span>${getTotal().toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary }}>
                <span>Delivery</span><span>Complimentary</span>
              </div>
              <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 12, marginTop: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 500, color: S.text }}>
                <span>Total</span><span>${getTotal().toLocaleString()}</span>
              </div>
              <SalonButton fullWidth href="/salon/checkout" style={{ marginTop: 20 }}>Proceed to Checkout</SalonButton>
              <div style={{ marginTop: 16, background: S.surface, borderRadius: S.radiusSm, padding: '12px 14px', borderLeft: `3px solid ${S.accent}` }}>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', fontStyle: 'italic', color: S.textSecondary, margin: 0, lineHeight: 1.5 }}>
                  &ldquo;Wonderful choices! If you need any help, I&apos;m just a chat away.&rdquo;
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: S.accent, margin: '4px 0 0', fontWeight: 500 }}>— Sophie</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </SalonLayout>
  )
}
