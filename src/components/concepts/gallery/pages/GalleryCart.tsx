'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, Frame, Palette } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const ACCENT = '#2C2C2C'
const BG = '#FDFBF7'
const SURFACE = '#F5F2ED'
const TEXT = '#2C2C2C'
const MUTED = '#888'
const BORDER = '#E8E4DE'
const FONT = "'Playfair Display', serif"
const BODY = "'Inter', sans-serif"

export function GalleryCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()

  const subtotal = getTotal()
  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Frame size={40} color={BORDER} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT, marginBottom: 8, fontStyle: 'italic' }}>Your Collection is Empty</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>No pieces have been selected for your private viewing.</p>
        <Link href="/gallery/collections" style={{ fontFamily: BODY, fontSize: 13, color: ACCENT, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 4 }}>
          Visit the Gallery
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      {/* Gallery header — museum wall aesthetic */}
      <div style={{ padding: '56px 24px 40px', textAlign: 'center', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <Palette size={16} color={ACCENT} />
          <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>Curator&apos;s Selection</span>
        </div>
        <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: TEXT, fontStyle: 'italic' }}>Your Private Collection</h1>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginTop: 8 }}>{getItemCount()} {getItemCount() === 1 ? 'piece' : 'pieces'} selected for acquisition</p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 56 }}>
        {/* Gallery wall — items displayed like art */}
        <div>
          {items.map((item, idx) => (
            <div key={item.product.id} style={{
              display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32, padding: '32px 0',
              borderBottom: idx < items.length - 1 ? `1px solid ${BORDER}` : 'none',
            }}>
              {/* Image in "frame" */}
              <div style={{ position: 'relative' }}>
                <div style={{ padding: 8, background: '#FFFFFF', boxShadow: '0 2px 20px rgba(0,0,0,0.08)', border: `1px solid ${BORDER}` }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4' }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 8 }}>
                  <span style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED }}>Lot {String(idx + 1).padStart(2, '0')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 4, fontStyle: 'italic' }}>{item.product.name}</h3>
                <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginBottom: 4 }}>{item.product.material}</p>
                <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 16, lineHeight: 1.6 }}>{item.product.category} · Gallery Edition</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      style={{ width: 36, height: 36, background: '#FFFFFF', border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50% 0 0 50%' }}>
                      <Minus size={12} />
                    </button>
                    <div style={{ width: 44, height: 36, background: '#FFFFFF', border: `1px solid ${BORDER}`, borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BODY, fontSize: 14, color: TEXT }}>
                      {item.quantity}
                    </div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ width: 36, height: 36, background: '#FFFFFF', border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0 50% 50% 0' }}>
                      <Plus size={12} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span style={{ fontFamily: FONT, fontSize: 22, color: TEXT }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeItem(item.product.id)}
                      style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontFamily: BODY }}>
                      <X size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Acquisition Summary — museum placard style */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT }}>Acquisition Summary</span>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, fontFamily: BODY, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: MUTED }}>Selected Pieces</span>
                  <span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: MUTED }}>Curation Fee</span>
                  <span style={{ color: '#4CAF50' }}>Waived</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: MUTED }}>Gallery Shipping</span>
                  <span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: BODY, fontSize: 13, color: MUTED }}>Total</span>
                <span style={{ fontFamily: FONT, fontSize: 28, color: TEXT }}>${total.toLocaleString()}</span>
              </div>

              <Link href="/gallery/checkout" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%', height: 52, background: ACCENT, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 2,
                }}>
                  <span style={{ fontFamily: BODY, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFF' }}>Proceed to Acquisition</span>
                  <ArrowRight size={16} color="#FFF" />
                </button>
              </Link>

              <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
                Each piece includes a certificate of authenticity and white-glove delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
