'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'
import { Minus, Plus, X, ShoppingBag, Truck, Shield, RotateCcw, ArrowRight } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

export function MinimalCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '40px 5vw 0', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>Shopping Bag</p>
            <h1 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A' }}>Your Selection</h1>
          </div>
          {items.length > 0 && (
            <p style={{ fontFamily: font, fontSize: '12px', color: '#8B8B8B' }}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          )}
        </div>
      </section>

      <section style={{ padding: '0 5vw 100px', maxWidth: '1400px', margin: '0 auto' }}>
        {items.length === 0 ? (
          /* ── Empty State ── */
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <ShoppingBag size={48} strokeWidth={1} style={{ color: '#E8E5E0', marginBottom: '24px' }} />
            <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 200, color: '#1A1A1A', marginBottom: '8px' }}>Your bag is empty</h2>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#8B8B8B', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
              Explore our collections to discover pieces crafted for timeless elegance.
            </p>
            <Link href="/minimal/collections" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#C4A265', padding: '14px 32px', textDecoration: 'none', transition: 'background-color 200ms ease' }}>
              Browse Collections <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          /* ── Cart Layout ── */
          <div className="vm-cart-layout" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '64px', alignItems: 'start' }}>
            {/* Left: Items */}
            <div>
              <div style={{ borderBottom: '1px solid #E8E5E0', paddingBottom: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B8B8B' }}>Product</span>
                <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B8B8B' }}>Total</span>
              </div>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #F5F4F0', alignItems: 'flex-start' }}>
                  <Link href={`/minimal/product/${item.product.slug}`} style={{ flexShrink: 0 }}>
                    <div style={{ position: 'relative', width: '100px', height: '100px', backgroundColor: '#F5F4F0', overflow: 'hidden' }}>
                      <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link href={`/minimal/product/${item.product.slug}`} style={{ textDecoration: 'none' }}>
                      <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#1A1A1A', marginBottom: '2px' }}>{item.product.name}</p>
                    </Link>
                    <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#8B8B8B', marginBottom: '4px' }}>{item.product.subtitle}</p>
                    <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#8B8B8B', marginBottom: '16px' }}>{item.product.material}</p>
                    {/* Quantity */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E8E5E0' }}>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><Minus size={12} color="#8B8B8B" /></button>
                      <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, width: '32px', textAlign: 'center', color: '#1A1A1A' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><Plus size={12} color="#8B8B8B" /></button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{formatPrice(item.product.price * item.quantity)}</p>
                    <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                      <X size={14} color="#8B8B8B" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ padding: '32px', backgroundColor: '#F5F4F0' }}>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '24px' }}>Order Summary</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#8B8B8B' }}>Subtotal ({itemCount} items)</span>
                  <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A' }}>{formatPrice(getTotal())}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#8B8B8B' }}>Shipping</span>
                  <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#C4A265' }}>Complimentary</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#8B8B8B' }}>Tax</span>
                  <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#8B8B8B' }}>Calculated at checkout</span>
                </div>
                <div style={{ height: '1px', backgroundColor: '#E8E5E0', margin: '20px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <span style={{ fontFamily: font, fontSize: '15px', fontWeight: 500, color: '#1A1A1A' }}>Estimated Total</span>
                  <span style={{ fontFamily: font, fontSize: '15px', fontWeight: 500, color: '#1A1A1A' }}>{formatPrice(getTotal())}</span>
                </div>
                <Link href="/minimal/checkout" className="vm-btn-checkout" style={{ display: 'block', width: '100%', padding: '16px 0', backgroundColor: '#C4A265', color: '#FFFFFF', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', transition: 'background-color 200ms ease' }}>
                  Proceed to Checkout
                </Link>
                <Link href="/minimal/collections" style={{ display: 'block', textAlign: 'center', marginTop: '16px', fontFamily: font, fontSize: '12px', color: '#8B8B8B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px 0' }}>
                {[
                  { icon: Truck, text: 'Complimentary insured shipping' },
                  { icon: Shield, text: 'GIA certified diamonds' },
                  { icon: RotateCcw, text: '30-day hassle-free returns' },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <b.icon size={16} strokeWidth={1.5} style={{ color: '#C4A265' }} />
                    <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#8B8B8B' }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <style>{`
        .vm-btn-checkout:hover { background-color: #B3924F !important; }
        @media (max-width: 768px) {
          .vm-cart-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
