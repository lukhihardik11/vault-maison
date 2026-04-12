'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MinimalPage } from '../MinimalPage'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'

export function MinimalCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <MinimalPage title="Cart">
      <div style={{ maxWidth: '800px' }}>
        {items.length === 0 ? (
          <div style={{ paddingTop: '40px' }}>
            <p style={{ fontSize: '13px', fontWeight: 300, opacity: 0.4, marginBottom: '24px' }}>
              Your selection is empty.
            </p>
            <Link
              href="/minimal/collections"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontWeight: 400,
                color: '#050505',
                textDecoration: 'none',
                opacity: 0.6,
              }}
            >
              Continue Shopping &rarr;
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ marginBottom: '60px' }}>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '24px',
                    padding: '24px 0',
                    borderBottom: '1px solid #E5E5E5',
                    alignItems: 'flex-start',
                  }}
                  className="minimal-cart-item"
                >
                  {/* Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px',
                      flexShrink: 0,
                      backgroundColor: '#F5F5F5',
                    }}
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 400, marginBottom: '2px' }}>
                      {item.product.name}
                    </p>
                    <p style={{ fontSize: '11px', fontWeight: 300, opacity: 0.4, marginBottom: '12px' }}>
                      {item.product.subtitle}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #E5E5E5',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: 300, minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #E5E5E5',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
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
                          fontSize: '11px',
                          fontFamily: 'inherit',
                          opacity: 0.3,
                          marginLeft: '8px',
                          textDecoration: 'underline',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p style={{ fontSize: '13px', fontWeight: 300, flexShrink: 0 }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ maxWidth: '300px', marginLeft: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>
                  Subtotal
                </span>
                <span style={{ fontSize: '13px', fontWeight: 300 }}>{formatPrice(getTotal())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>
                  Shipping
                </span>
                <span style={{ fontSize: '13px', fontWeight: 300, opacity: 0.4 }}>Calculated at checkout</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #050505',
                  marginBottom: '32px',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 400 }}>Total</span>
                <span style={{ fontSize: '13px', fontWeight: 400 }}>{formatPrice(getTotal())}</span>
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
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: 400,
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontFamily: 'inherit',
                }}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </MinimalPage>
  )
}
