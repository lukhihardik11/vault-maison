'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { X, Plus, Minus } from 'lucide-react'
import type { Product } from '@/data/products'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import BlurUpImage from './BlurUpImage'

interface QuickViewProps {
  open: boolean
  product: Product | null
  onClose: () => void
  onAddToCart?: (product: Product, size: string, quantity: number) => void
}

const F = "'Inter', 'Helvetica Neue', sans-serif"
const M = "'SF Mono', 'Fira Code', monospace"
const SIZES = ['5', '5.5', '6', '6.5', '7', '7.5', '8']

export default function QuickView({ open, product, onClose, onAddToCart }: QuickViewProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('7')
  const [quantity, setQuantity] = useState(1)
  const [didAdd, setDidAdd] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  useEffect(() => {
    setSelectedImageIndex(0)
    setSelectedSize('7')
    setQuantity(1)
    setDidAdd(false)
  }, [product?.id, open])

  const selectedImage = useMemo(() => {
    if (!product) return ''
    return product.images[selectedImageIndex] ?? product.images[0]
  }, [product, selectedImageIndex])

  if (!open || !product) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close quick view"
        style={{
          position: 'absolute',
          inset: 0,
          border: 'none',
          background: '#050505',
          opacity: 0.45,
          cursor: 'pointer',
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} quick view`}
        className={prefersReducedMotion ? undefined : 'minimal-quick-view-panel'}
        style={{
          position: 'relative',
          width: 'min(880px, calc(100% - 24px))',
          background: '#FFFFFF',
          border: '1px solid #E5E5E5',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 38,
            height: 38,
            background: '#FFFFFF',
            border: '1px solid #E5E5E5',
            color: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ borderRight: '1px solid #E5E5E5' }}>
          <div style={{ aspectRatio: '4 / 5', borderBottom: '1px solid #E5E5E5' }}>
            <BlurUpImage
              src={selectedImage}
              alt={product.name}
              containerStyle={{ width: '100%', height: '100%' }}
              draggable={false}
            />
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: 8, padding: 12 }}>
              {product.images.map((image, index) => (
                <button
                  key={`${product.id}-thumb-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: 64,
                    height: 64,
                    border: index === selectedImageIndex ? '1.5px solid #050505' : '1px solid #E5E5E5',
                    padding: 0,
                    cursor: 'pointer',
                    background: '#FFFFFF',
                  }}
                >
                  <BlurUpImage src={image} alt={`${product.name} view ${index + 1}`} containerStyle={{ width: '100%', height: '100%' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: M,
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#9B9B9B',
              marginBottom: 12,
            }}
          >
            {product.category.replace(/-/g, ' ')}
          </span>
          <h3
            style={{
              fontFamily: F,
              fontSize: 'clamp(24px, 2.8vw, 30px)',
              fontWeight: 400,
              color: '#050505',
              margin: '0 0 8px',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {product.name}
          </h3>
          <p style={{ fontFamily: F, fontSize: 14, color: '#6B6B6B', margin: '0 0 8px' }}>{product.subtitle}</p>
          <p style={{ fontFamily: F, fontSize: 24, fontWeight: 400, color: '#050505', margin: '0 0 20px' }}>{product.priceDisplay}</p>
          <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.7, color: '#6B6B6B', margin: '0 0 20px' }}>
            {product.description}
          </p>

          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontFamily: F,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#050505',
                margin: '0 0 10px',
              }}
            >
              Size
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SIZES.map((size) => (
                <button
                  key={`${product.id}-${size}`}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: 40,
                    height: 40,
                    border: selectedSize === size ? '1.5px solid #050505' : '1px solid #E5E5E5',
                    background: selectedSize === size ? '#050505' : '#FFFFFF',
                    color: selectedSize === size ? '#FFFFFF' : '#050505',
                    fontFamily: F,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ display: 'inline-flex', border: '1px solid #E5E5E5' }}>
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                style={{
                  width: 38,
                  height: 38,
                  border: 'none',
                  borderRight: '1px solid #E5E5E5',
                  background: '#FFFFFF',
                  color: '#050505',
                  cursor: 'pointer',
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span
                style={{
                  width: 40,
                  height: 38,
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: F,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#050505',
                }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                style={{
                  width: 38,
                  height: 38,
                  border: 'none',
                  borderLeft: '1px solid #E5E5E5',
                  background: '#FFFFFF',
                  color: '#050505',
                  cursor: 'pointer',
                }}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart?.(product, selectedSize, quantity)
              setDidAdd(true)
              window.setTimeout(() => setDidAdd(false), 1200)
            }}
            style={{
              width: '100%',
              height: 48,
              border: 'none',
              background: '#050505',
              color: '#FFFFFF',
              fontFamily: F,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: 10,
              transition: prefersReducedMotion ? 'none' : 'opacity 160ms ease',
            }}
          >
            {didAdd ? 'Added to Bag' : `Add to Bag — ${product.priceDisplay}`}
          </button>

          <Link
            href={`/minimal/product/${product.slug}`}
            style={{
              width: '100%',
              height: 46,
              border: '1px solid #050505',
              color: '#050505',
              background: '#FFFFFF',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: F,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
            onClick={onClose}
          >
            View Full Product
          </Link>
        </div>
      </div>

      <style>{`
        .minimal-quick-view-panel {
          animation: minimalQuickViewIn 200ms ease-out;
        }

        @keyframes minimalQuickViewIn {
          from {
            transform: translateY(8px);
            opacity: 0.9;
          }
          to {
            transform: translateY(0px);
            opacity: 1;
          }
        }

        @media (max-width: 920px) {
          .minimal-quick-view-panel {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .minimal-quick-view-panel {
            width: calc(100% - 16px) !important;
            max-height: calc(100vh - 80px) !important;
            max-height: calc(100dvh - 80px) !important;
            margin: 0 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .minimal-quick-view-panel {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
