'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { SmoothTab, SlideTextButton, AttractButton, SocialButton, ShimmerText } from '../ui'
import type { SmoothTabItem } from '../ui/SmoothTab'
import { type Product, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface MinimalProductDetailProps {
  product: Product
}

export function MinimalProductDetail({ product }: MinimalProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const related = getRelatedProducts(product.id, 4)
  const inWishlist = isInWishlist(product.id)

  // Build tab items for SmoothTab
  const tabItems: SmoothTabItem[] = []

  // Description tab
  tabItems.push({
    id: 'description',
    title: 'Description',
    content: (
      <div style={{ padding: '20px 0' }}>
        <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#050505', opacity: 0.7, maxWidth: '500px' }}>
          {product.description}
        </p>
      </div>
    ),
  })

  // Specifications tab
  if (product.diamondSpecs) {
    tabItems.push({
      id: 'specs',
      title: 'Specifications',
      content: (
        <div style={{ padding: '20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 32px', maxWidth: '400px' }}>
            {[
              ['Carat', product.diamondSpecs.carat],
              ['Cut', product.diamondSpecs.cut],
              ['Color', product.diamondSpecs.color],
              ['Clarity', product.diamondSpecs.clarity],
              ['Shape', product.diamondSpecs.shape],
              ['Origin', product.diamondSpecs.origin],
              ['Cert', product.diamondSpecs.certification],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0F0F0' }}>
                <span style={{ fontFamily: font, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#050505', opacity: 0.35 }}>{label}</span>
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    })
  }

  // Features tab
  if (product.features.length > 0) {
    tabItems.push({
      id: 'features',
      title: 'Features',
      content: (
        <div style={{ padding: '20px 0' }}>
          {product.features.map((feature, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
              <div style={{ width: '4px', height: '4px', backgroundColor: '#050505', opacity: 0.3, borderRadius: '50%', flexShrink: 0 }} />
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505', opacity: 0.6 }}>
                {feature}
              </p>
            </div>
          ))}
        </div>
      ),
    })
  }

  // Care tab
  tabItems.push({
    id: 'care',
    title: 'Care',
    content: (
      <div style={{ padding: '20px 0' }}>
        <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#050505', opacity: 0.7, maxWidth: '500px' }}>
          Store in the provided box when not worn. Clean gently with a soft cloth. Professional cleaning recommended every 6 months. Avoid contact with chemicals, perfumes, and abrasives. Complimentary lifetime cleaning and inspection included.
        </p>
      </div>
    ),
  })

  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 0' }} className="minimal-pdp">
        {/* Breadcrumb */}
        <nav
          style={{ marginBottom: '40px' }}
        >
          <Link href="/minimal" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.4, textDecoration: 'none', fontFamily: font }}>
            Home
          </Link>
          <span style={{ margin: '0 8px', opacity: 0.2 }}>/</span>
          <Link href="/minimal/collections" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.4, textDecoration: 'none', fontFamily: font }}>
            Collections
          </Link>
          <span style={{ margin: '0 8px', opacity: 0.2 }}>/</span>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.6, fontFamily: font }}>
            {product.name}
          </span>
        </nav>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', maxWidth: '1200px' }} className="minimal-pdp-grid">
          {/* Left: Gallery with animated image swap */}
          <div
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                backgroundColor: '#F5F5F5',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              <AnimatePresence mode="wait">
                <div
                  key={selectedImage}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 600px"
                    unoptimized
                  />
                </div>
              </AnimatePresence>
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      position: 'relative',
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#F5F5F5',
                      border: selectedImage === i ? '1px solid #050505' : '1px solid #E5E5E5',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      padding: 0,
                      transition: 'border-color 300ms ease',
                    }}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="64px" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div
            style={{ paddingTop: '20px' }}
          >
            {product.isNew && (
              <span style={{
                fontFamily: font,
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}>
                <ShimmerText text="New" className="text-[10px] tracking-[0.25em] uppercase" />
              </span>
            )}
            <h1 style={{
              fontFamily: font,
              fontSize: '28px',
              fontWeight: 200,
              letterSpacing: '0.01em',
              color: '#050505',
              marginBottom: '6px',
            }}>
              {product.name}
            </h1>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.5,
              marginBottom: '20px',
            }}>
              {product.subtitle}
            </p>
            <p style={{
              fontFamily: font,
              fontSize: '20px',
              fontWeight: 300,
              color: '#050505',
              marginBottom: '32px',
            }}>
              {product.priceDisplay}
            </p>

            {/* Material info row */}
            <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #E5E5E5' }}>
              <div>
                <p style={{ fontFamily: font, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#050505', opacity: 0.35, marginBottom: '4px' }}>Material</p>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{product.material}</p>
              </div>
              {product.goldKarat && (
                <div>
                  <p style={{ fontFamily: font, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#050505', opacity: 0.35, marginBottom: '4px' }}>Karat</p>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{product.goldKarat}</p>
                </div>
              )}
              {product.goldColor && (
                <div>
                  <p style={{ fontFamily: font, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#050505', opacity: 0.35, marginBottom: '4px' }}>Color</p>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{product.goldColor}</p>
                </div>
              )}
            </div>

            {/* SmoothTab: Description / Specs / Features / Care */}
            <div style={{ marginBottom: '32px' }}>
              <SmoothTab items={tabItems} />
            </div>

            {/* Actions — AttractButton + Wishlist + SocialButton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AttractButton
                  text="Add to Cart"
                  hoverText="Adding..."
                  onClick={() => addItem(product)}
                />
                <button
                  onClick={() => toggleItem(product)}
                  style={{
                    padding: '14px 24px',
                    border: '1px solid #E5E5E5',
                    backgroundColor: 'transparent',
                    color: '#050505',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontWeight: 400,
                    cursor: 'pointer',
                    fontFamily: font,
                    opacity: inWishlist ? 1 : 0.5,
                    transition: 'all 300ms ease',
                  }}
                >
                  {inWishlist ? '♥ Saved' : '♡ Save'}
                </button>
              </div>
              <SocialButton onShare={(platform) => console.log(`Share ${product.name} on ${platform}`)} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: '120px 5vw', borderTop: '1px solid #E5E5E5', marginTop: '80px' }} className="minimal-pdp-related">
          <div
          >
            <p style={{
              fontFamily: font,
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#050505',
              opacity: 0.4,
              marginBottom: '12px',
            }}>
              You May Also Like
            </p>
            <h2 style={{
              fontFamily: font,
              fontSize: '22px',
              fontWeight: 200,
              letterSpacing: '0.02em',
              color: '#050505',
              marginBottom: '40px',
            }}>
              Related Pieces
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
            }}
            className="minimal-pdp-related-grid"
          >
            {related.map((p, i) => (
              <div
                key={p.id}
              >
                <MinimalProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          .minimal-pdp { padding: 60px 20px 0 !important; }
          .minimal-pdp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .minimal-pdp-related { padding: 60px 20px !important; }
          .minimal-pdp-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
