'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { type Product, formatPrice, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

interface MinimalProductDetailProps {
  product: Product
}

export function MinimalProductDetail({ product }: MinimalProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const related = getRelatedProducts(product.id, 4)
  const inWishlist = isInWishlist(product.id)

  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 0' }} className="minimal-pdp">
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '40px' }}>
          <Link href="/minimal" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.4, textDecoration: 'none' }}>
            Home
          </Link>
          <span style={{ margin: '0 8px', opacity: 0.2 }}>/</span>
          <Link href="/minimal/collections" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.4, textDecoration: 'none' }}>
            Collections
          </Link>
          <span style={{ margin: '0 8px', opacity: 0.2 }}>/</span>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.6 }}>
            {product.name}
          </span>
        </nav>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', maxWidth: '1200px' }} className="minimal-pdp-grid">
          {/* Left: Images */}
          <div>
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
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      position: 'relative',
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#F5F5F5',
                      border: selectedImage === i ? '1px solid #050505' : '1px solid transparent',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      padding: 0,
                    }}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="60px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div style={{ paddingTop: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '4px' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '13px', fontWeight: 300, opacity: 0.5, marginBottom: '20px' }}>
              {product.subtitle}
            </p>
            <p style={{ fontSize: '18px', fontWeight: 300, marginBottom: '32px' }}>
              {product.priceDisplay}
            </p>

            {/* Description */}
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7, marginBottom: '32px', maxWidth: '400px' }}>
              {product.description}
            </p>

            {/* Specs */}
            {product.diamondSpecs && (
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '16px' }}>
                  Specifications
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                  {[
                    ['Carat', product.diamondSpecs.carat],
                    ['Cut', product.diamondSpecs.cut],
                    ['Color', product.diamondSpecs.color],
                    ['Clarity', product.diamondSpecs.clarity],
                    ['Shape', product.diamondSpecs.shape],
                    ['Origin', product.diamondSpecs.origin],
                    ['Certification', product.diamondSpecs.certification],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0F0F0' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.4 }}>{label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 300 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Material */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.4, marginBottom: '4px' }}>Material</p>
                  <p style={{ fontSize: '13px', fontWeight: 300 }}>{product.material}</p>
                </div>
                {product.goldKarat && (
                  <div>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.4, marginBottom: '4px' }}>Karat</p>
                    <p style={{ fontSize: '13px', fontWeight: 300 }}>{product.goldKarat}</p>
                  </div>
                )}
                {product.goldColor && (
                  <div>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.4, marginBottom: '4px' }}>Color</p>
                    <p style={{ fontSize: '13px', fontWeight: 300 }}>{product.goldColor}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => addItem(product)}
                style={{
                  padding: '14px 40px',
                  border: '1px solid #050505',
                  backgroundColor: '#050505',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: 400,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Add to Cart
              </button>
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
                  fontFamily: 'inherit',
                  opacity: inWishlist ? 1 : 0.5,
                }}
              >
                {inWishlist ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #E5E5E5' }}>
                {product.features.map((feature, i) => (
                  <p key={i} style={{ fontSize: '12px', fontWeight: 300, opacity: 0.5, lineHeight: 2 }}>
                    {feature}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: '120px 5vw' }} className="minimal-pdp-related">
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '40px' }}>
            Related
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
            }}
            className="minimal-pdp-related-grid"
          >
            {related.map((p) => (
              <MinimalProductCard key={p.id} product={p} />
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
