'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Product } from '@/data/products'
import { minimal } from './design-system'
import BlurUpImage from './ui/BlurUpImage'

interface MinimalProductCardProps {
  product: Product
}

/**
 * Tier 2 product tile — image swap on hover (Acne Studios / The Row pattern).
 *
 * On hover the primary image crossfades to the second product image
 * (alternate angle / lifestyle shot). No zoom, no scale, no shadow.
 * Product info: name + price only. Category eyebrow removed for
 * cleaner presentation. Badges removed per The Row's "zero
 * promotional elements" approach.
 *
 * Hover states use opacity reduction (Acne Studios pattern), not
 * color change.
 */
export function MinimalProductCard({ product }: MinimalProductCardProps) {
  const font = minimal.font.primary
  const [isHovered, setIsHovered] = useState(false)

  const primaryImage = product.images[0]
  const hoverImage = product.images.length > 1 ? product.images[1] : product.images[0]

  return (
    <Link
      href={`/minimal/product/${product.slug}`}
      className="group block"
      style={{ textDecoration: 'none', color: '#050505' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image — crossfade swap on hover */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          backgroundColor: '#F5F5F5',
          marginBottom: '16px',
        }}
      >
        {/* Primary image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <BlurUpImage
            src={primaryImage}
            alt={product.name}
            containerStyle={{ width: '100%', height: '100%', background: '#F5F5F5' }}
          />
        </div>

        {/* Hover image (alternate angle) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <BlurUpImage
            src={hoverImage}
            alt={`${product.name} — alternate view`}
            containerStyle={{ width: '100%', height: '100%', background: '#F5F5F5' }}
          />
        </div>
      </div>

      {/* Product info — name + price only (The Row pattern) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3
          style={{
            fontFamily: font,
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#050505',
            margin: 0,
            transition: 'opacity 0.2s ease',
            opacity: isHovered ? 0.6 : 1,
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontFamily: font,
            fontSize: '14px',
            fontWeight: 400,
            color: '#050505',
            fontVariantNumeric: 'tabular-nums',
            margin: 0,
          }}
        >
          {product.priceDisplay}
        </p>
      </div>
    </Link>
  )
}
