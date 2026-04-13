'use client'

import React from 'react'
import Link from 'next/link'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'
import { Minus, Plus, X } from 'lucide-react'

export function GalleryCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 140px', maxWidth: 960, margin: '0 auto' }}>
        <MuseumCaption>Your Selection</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '12px 0 48px' }}>
          Acquisition Cart
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.textSecondary, marginBottom: 32 }}>
              Your cart is empty. Begin exploring our exhibition.
            </p>
            <GalleryButton href="/gallery/collections">View Exhibition</GalleryButton>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.product.id} style={{
                display: 'grid', gridTemplateColumns: '100px 1fr auto auto', gap: 24, alignItems: 'center',
                padding: '28px 0', borderBottom: `1px solid ${G.border}`,
              }}>
                <div style={{ width: 100, height: 100, background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.product.images[0]} alt={item.product.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.95rem', fontWeight: 400, color: G.text, margin: '0 0 4px' }}>{item.product.name}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.textSecondary, margin: 0 }}>{item.product.priceDisplay}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${G.border}` }}>
                  <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    style={{ background: 'none', border: 'none', padding: '8px 10px', cursor: 'pointer', color: G.text }}>
                    <Minus size={12} />
                  </button>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', minWidth: 28, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    style={{ background: 'none', border: 'none', padding: '8px 10px', cursor: 'pointer', color: G.text }}>
                    <Plus size={12} />
                  </button>
                </div>
                <button onClick={() => removeItem(item.product.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.caption, padding: 8 }}>
                  <X size={16} />
                </button>
              </div>
            ))}

            <div style={{ marginTop: 48, display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: 320 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: G.textSecondary }}>Subtotal</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.text }}>{formatPrice(getTotal())}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: G.textSecondary }}>Shipping</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: G.accent }}>Complimentary</span>
                </div>
                <div style={{ height: 1, background: G.border, marginBottom: 24 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                  <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', color: G.text }}>Total</span>
                  <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', color: G.text }}>{formatPrice(getTotal())}</span>
                </div>
                <GalleryButton href="/gallery/checkout">Proceed to Checkout</GalleryButton>
              </div>
            </div>
          </>
        )}
      </section>
    </GalleryLayout>
  )
}
