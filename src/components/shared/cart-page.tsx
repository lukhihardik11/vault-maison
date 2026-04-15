'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag, Gift, Shield, Truck } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { getBestsellers, type Product } from '@/data/products'

interface CartPageProps {
  conceptId: string
  accentColor: string
  bgColor: string
  textColor: string
  mutedColor: string
  cardBg?: string
  fontHeading?: string
  fontBody?: string
}

const PROMO_CODES: Record<string, number> = {
  'VAULT10': 10,
  'WELCOME15': 15,
  'LUXURY20': 20,
}

export function CartPage({
  conceptId,
  accentColor,
  bgColor,
  textColor,
  mutedColor,
  cardBg,
  fontHeading = "'Playfair Display', serif",
  fontBody = "'Inter', sans-serif",
}: CartPageProps) {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState('')
  const [giftWrap, setGiftWrap] = useState(false)

  const subtotal = getTotal()
  const discount = appliedPromo ? (subtotal * (PROMO_CODES[appliedPromo] || 0)) / 100 : 0
  const giftWrapCost = giftWrap ? 15 : 0
  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal - discount + giftWrapCost + shipping

  const applyPromo = () => {
    if (PROMO_CODES[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCode.toUpperCase())
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setAppliedPromo(null)
    }
  }

  const upsellProducts = getBestsellers().filter(p => !items.some(i => i.product.id === p.id)).slice(0, 3)

  const bg = cardBg || `${textColor}08`
  const border = `${textColor}15`

  // Empty cart state
  if (items.length === 0) {
    return (
      <div style={{ background: bgColor, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <ShoppingBag size={48} strokeWidth={1} color={`${textColor}40`} style={{ margin: '0 auto 24px' }} />
          <h1 style={{ fontFamily: fontHeading, fontSize: '1.8rem', fontWeight: 400, color: textColor, margin: '0 0 12px' }}>
            Your Cart is Empty
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: mutedColor, lineHeight: 1.6, margin: '0 0 32px' }}>
            Discover our curated collection of fine jewelry and find something extraordinary.
          </p>
          <Link
            href={`/${conceptId}/collections`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 36px', background: accentColor, color: bgColor,
              fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'opacity 0.3s',
            }}
          >
            Explore Collections <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: bgColor, minHeight: '100vh', paddingTop: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: accentColor, margin: '0 0 8px' }}>
            Shopping Cart
          </p>
          <h1 style={{ fontFamily: fontHeading, fontSize: '2rem', fontWeight: 400, color: textColor, margin: 0 }}>
            Your Selection ({getItemCount()} {getItemCount() === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, alignItems: 'start' }}>
          {/* Cart items */}
          <div>
            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 140px 100px 40px', gap: 16, padding: '0 0 12px', borderBottom: `1px solid ${border}`, marginBottom: 0 }}>
              {['', 'Product', 'Quantity', 'Total', ''].map((h, i) => (
                <span key={i} style={{ fontFamily: fontBody, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mutedColor }}>{h}</span>
              ))}
            </div>

            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.metal}`} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 140px 100px 40px', gap: 16, padding: '20px 0', borderBottom: `1px solid ${border}`, alignItems: 'center' }}>
                {/* Image */}
                <div style={{ position: 'relative', width: 100, height: 100, overflow: 'hidden', background: bg }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                </div>

                {/* Product info */}
                <div>
                  <Link href={`/${conceptId}/product/${item.product.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontFamily: fontHeading, fontSize: '0.95rem', fontWeight: 500, color: textColor, margin: '0 0 4px' }}>{item.product.name}</h3>
                  </Link>
                  <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor, margin: '0 0 8px' }}>{item.product.subtitle}</p>
                  <div style={{ display: 'flex', gap: 12, fontFamily: fontBody, fontSize: '0.65rem', color: mutedColor }}>
                    {item.size && <span>Size: {item.size}</span>}
                    {item.metal && <span>Metal: {item.metal}</span>}
                  </div>
                  <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: textColor, margin: '8px 0 0' }}>{item.product.priceDisplay}</p>
                </div>

                {/* Quantity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${border}`, color: textColor, cursor: 'pointer' }}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ fontFamily: fontBody, fontSize: '0.85rem', color: textColor, width: 24, textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, Math.min(10, item.quantity + 1))}
                    style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${border}`, color: textColor, cursor: 'pointer' }}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Total */}
                <div style={{ fontFamily: fontHeading, fontSize: '1rem', color: accentColor }}>
                  ${(item.product.price * item.quantity).toLocaleString()}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  style={{ background: 'none', border: 'none', color: mutedColor, cursor: 'pointer', padding: 4 }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Continue shopping */}
            <div style={{ marginTop: 24 }}>
              <Link
                href={`/${conceptId}/collections`}
                style={{ fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: accentColor, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: bg, border: `1px solid ${border}`, padding: 32 }}>
              <h3 style={{ fontFamily: fontHeading, fontSize: '1.1rem', fontWeight: 500, color: textColor, margin: '0 0 24px' }}>Order Summary</h3>

              {/* Promo code */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Tag size={14} color={mutedColor} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => { setPromoCode(e.target.value); setPromoError('') }}
                      placeholder="Promo code"
                      style={{
                        width: '100%', padding: '10px 12px 10px 34px', background: 'transparent',
                        border: `1px solid ${border}`, color: textColor, fontFamily: fontBody, fontSize: '0.75rem',
                        letterSpacing: '0.05em', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    style={{
                      padding: '10px 16px', background: 'transparent', border: `1px solid ${accentColor}`,
                      color: accentColor, fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.1em',
                      textTransform: 'uppercase', cursor: 'pointer',
                    }}
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#ef4444', margin: '6px 0 0' }}>{promoError}</p>}
                {appliedPromo && <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: '#22c55e', margin: '6px 0 0' }}>{appliedPromo} applied — {PROMO_CODES[appliedPromo]}% off</p>}
              </div>

              {/* Gift wrap */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={e => setGiftWrap(e.target.checked)}
                  style={{ accentColor }}
                />
                <Gift size={14} color={accentColor} />
                <span style={{ fontFamily: fontBody, fontSize: '0.75rem', color: textColor }}>Gift wrapping (+$15)</span>
              </label>

              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16 }}>
                {[
                  { label: 'Subtotal', value: `$${subtotal.toLocaleString()}` },
                  ...(discount > 0 ? [{ label: `Discount (${PROMO_CODES[appliedPromo!]}%)`, value: `-$${discount.toLocaleString()}` }] : []),
                  ...(giftWrap ? [{ label: 'Gift Wrap', value: '$15' }] : []),
                  { label: 'Shipping', value: shipping === 0 ? 'Complimentary' : `$${shipping}` },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontFamily: fontBody, fontSize: '0.75rem', color: mutedColor }}>{row.label}</span>
                    <span style={{ fontFamily: fontBody, fontSize: '0.8rem', color: row.value.startsWith('-') ? '#22c55e' : row.value === 'Complimentary' ? accentColor : textColor }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: fontHeading, fontSize: '1rem', color: textColor }}>Total</span>
                <span style={{ fontFamily: fontHeading, fontSize: '1.3rem', color: accentColor }}>${total.toLocaleString()}</span>
              </div>

              <Link
                href={`/${conceptId}/checkout`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '14px 0', marginTop: 24,
                  background: accentColor, color: bgColor,
                  fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'opacity 0.3s', boxSizing: 'border-box',
                }}
              >
                Proceed to Checkout <ArrowRight size={14} />
              </Link>

              {/* Trust badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20 }}>
                {[
                  { icon: Shield, label: 'Secure' },
                  { icon: Truck, label: 'Free Ship 500+' },
                  { icon: Gift, label: '30-Day Returns' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon size={12} color={mutedColor} />
                    <span style={{ fontFamily: fontBody, fontSize: '0.55rem', color: mutedColor, letterSpacing: '0.05em' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upsell section */}
            {upsellProducts.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mutedColor, margin: '0 0 16px' }}>
                  You May Also Like
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {upsellProducts.map(p => (
                    <Link
                      key={p.id}
                      href={`/${conceptId}/product/${p.slug}`}
                      style={{ display: 'flex', gap: 12, textDecoration: 'none', padding: 8, background: bg, border: `1px solid ${border}`, transition: 'border-color 0.3s' }}
                    >
                      <div style={{ position: 'relative', width: 60, height: 60, flexShrink: 0, overflow: 'hidden' }}>
                        <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h5 style={{ fontFamily: fontBody, fontSize: '0.75rem', color: textColor, margin: '0 0 2px' }}>{p.name}</h5>
                        <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: accentColor, margin: 0 }}>{p.priceDisplay}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
