'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { useWishlistStore } from '@/store/wishlist'
import { useCartStore } from '@/store/cart'
import { Heart, ShoppingBag, X, ArrowRight } from 'lucide-react'
import { minimal } from '../design-system';

const font = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'Space Mono', 'SF Mono', monospace"

export function MinimalWishlist() {
  const { items, toggleItem } = useWishlistStore()
  const { addItem } = useCartStore()

  return (
    <MinimalLayout>
      <section style={{ padding: '60px 5vw 100px', maxWidth: '1200px', margin: '0 auto', minHeight: '70vh' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: font, fontSize: minimal.type.caption, }}><span className="brutalist-section-num">01 — Saved Pieces</span></p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: font, fontSize: minimal.type.h2, fontWeight: 600, color: '#050505' }}>Wishlist</h1>
            {items.length > 0 && <p style={{ fontFamily: font, fontSize: minimal.type.caption, color: '#767676' }}>{items.length} {items.length === 1 ? 'piece' : 'pieces'}</p>}
          </div>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Heart size={48} strokeWidth={1} style={{ color: '#E5E5E5', marginBottom: '24px' }} />
            <h2 style={{ fontFamily: font, fontSize: minimal.type.h4, fontWeight: 600, color: '#050505', marginBottom: '8px' }}>Your wishlist is empty</h2>
            <p style={{ fontFamily: font, fontSize: minimal.type.bodySm, fontWeight: 400, color: '#767676', marginBottom: '32px' }}>Save pieces you love by clicking the heart icon.</p>
            <Link href="/minimal/collections" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', backgroundColor: '#050505', color: '#FFFFFF', fontFamily: font, fontSize: minimal.type.caption, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Browse Collections <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="vm-wish-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {items.map((product) => (
              <div key={product.id} style={{ position: 'relative' }}>
                <Link href={`/minimal/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="vm-wish-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#FAFAFA', marginBottom: '12px', overflow: 'hidden' }}>
                    <img src={product.images[0]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%",  objectFit: 'cover', transition: 'transform 600ms ease'  }} loading="lazy" decoding="async"/>
                  </div>
                  <p style={{ fontFamily: font, fontSize: minimal.type.bodySm, fontWeight: 400, color: '#050505', marginBottom: '2px' }}>{product.name}</p>
                  <p style={{ fontFamily: font, fontSize: minimal.type.caption, fontWeight: 400, color: '#767676', marginBottom: '6px' }}>{product.subtitle}</p>
                  <p style={{ fontFamily: font, fontSize: minimal.type.body, fontWeight: 500, color: '#050505' }}>{product.priceDisplay}</p>
                </Link>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button onClick={() => { addItem(product) }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', backgroundColor: '#050505', color: '#FFFFFF', border: 'none', fontFamily: font, fontSize: minimal.type.micro, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    <ShoppingBag size={12} /> Add to Cart
                  </button>
                  <button onClick={() => toggleItem(product)} style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E5E5E5', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <X size={14} color="#767676" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .vm-wish-img:hover img { transform: scale(1.04) !important; }
        .vm-wish-img:hover { box-shadow: 0 4px 20px rgba(180, 170, 160, 0.12) !important; }
        @media (max-width: 1024px) { .vm-wish-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .vm-wish-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 400px) { .vm-wish-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </MinimalLayout>
  )
}
