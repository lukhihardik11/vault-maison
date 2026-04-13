'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { SlideTextButton } from '../ui'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

export function MinimalCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '100px 5vw 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '8px',
          }}>
            Cart
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
          }}>
            Your Selection
          </h1>
        </motion.div>
      </section>

      <section style={{ padding: '40px 5vw 120px' }}>
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '80px 0' }}
          >
            <p style={{
              fontFamily: font,
              fontSize: '16px',
              fontWeight: 200,
              color: '#050505',
              marginBottom: '12px',
            }}>
              Your selection is empty
            </p>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.5,
              marginBottom: '32px',
            }}>
              Browse our collections to find your perfect piece.
            </p>
            <SlideTextButton
              text="Browse Collections"
              hoverText="View All"
              href="/minimal/collections"
            />
          </motion.div>
        ) : (
          <div className="minimal-cart-layout" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '80px', alignItems: 'start' }}>
            {/* Left: Cart Items */}
            <div>
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    style={{
                      display: 'flex',
                      gap: '24px',
                      padding: '24px 0',
                      borderBottom: '1px solid #E5E5E5',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Link href={`/minimal/product/${item.product.slug}`} style={{ flexShrink: 0 }}>
                      <div style={{
                        position: 'relative',
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#F5F5F5',
                        overflow: 'hidden',
                      }}>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="100px"
                          unoptimized
                        />
                      </div>
                    </Link>

                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#050505', marginBottom: '2px' }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#050505', opacity: 0.4, marginBottom: '16px' }}>
                        {item.product.subtitle}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            width: '28px', height: '28px',
                            border: '1px solid #E5E5E5',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontFamily: font,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'border-color 200ms ease',
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            width: '28px', height: '28px',
                            border: '1px solid #E5E5E5',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontFamily: font,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'border-color 200ms ease',
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            fontFamily: font,
                            fontSize: '11px',
                            opacity: 0.3,
                            marginLeft: '8px',
                            textDecoration: 'underline',
                            transition: 'opacity 200ms ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#050505', flexShrink: 0 }}>
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                position: 'sticky',
                top: '100px',
                padding: '32px',
                border: '1px solid #E5E5E5',
              }}
            >
              <p style={{
                fontFamily: font,
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050505',
                opacity: 0.35,
                marginBottom: '24px',
              }}>
                Order Summary
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: font, fontSize: '12px', color: '#050505', opacity: 0.5 }}>Subtotal</span>
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{formatPrice(getTotal())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ fontFamily: font, fontSize: '12px', color: '#050505', opacity: 0.5 }}>Shipping</span>
                <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#050505', opacity: 0.4 }}>Calculated at checkout</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #050505', marginBottom: '32px' }}>
                <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#050505' }}>Total</span>
                <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#050505' }}>{formatPrice(getTotal())}</span>
              </div>
              <Link
                href="/minimal/checkout"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 0',
                  border: '1px solid #050505',
                  backgroundColor: '#050505',
                  color: '#FFFFFF',
                  fontFamily: font,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: 400,
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'opacity 300ms ease',
                }}
              >
                Checkout
              </Link>
              <Link
                href="/minimal/collections"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '12px',
                  fontFamily: font,
                  fontSize: '11px',
                  color: '#050505',
                  opacity: 0.4,
                  textDecoration: 'none',
                  transition: 'opacity 300ms ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-cart-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
