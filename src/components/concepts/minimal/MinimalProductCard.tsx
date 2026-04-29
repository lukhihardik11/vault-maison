'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Product } from '@/data/products'
import { minimal } from './design-system'
import BlurUpImage from './ui/BlurUpImage'
import { TiltCard } from './ui/TiltCard'

interface MinimalProductCardProps {
  product: Product
  /** Tier 4: Optional index number displayed as raw catalog reference (001, 002...) */
  index?: number
}

/**
 * Tier 4 product tile — brutalist catalog card.
 *
 * Builds on Tier 2 (image swap on hover, opacity states) and adds:
 *   - Product index number (001, 002...) in Space Mono
 *   - Monospace price for raw data-spec feel
 *   - SKU/material metadata line
 *   - Underlined "View" link instead of full-card click illusion
 *
 * No zoom, no scale, no shadow, no badges.
 */
export function MinimalProductCard({ product, index }: MinimalProductCardProps) {
  const font = minimal.font.primary
  const mono = minimal.font.brutalistMono
  const [isHovered, setIsHovered] = useState(false)

  const primaryImage = product.images[0]
  const hoverImage = product.images.length > 1 ? product.images[1] : product.images[0]

  // Generate a product code from the slug
  const productCode = product.slug
    .split('-')
    .map((w: string) => w[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 4)

  return (
    <Link
      href={`/minimal/product/${product.slug}`}
      className="group block"
      style={{ textDecoration: 'none', color: '#050505' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image — crossfade swap on hover + Phase 7 TiltCard */}
      <TiltCard maxTilt={5} hoverScale={1.01} shine dataCursor="view">
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          backgroundColor: '#F5F5F5',
          marginBottom: '14px',
        }}
      >
        {/* Tier 4: Product index overlay */}
        {index !== undefined && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#9B9B9B',
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.85)',
              padding: '2px 6px',
            }}
          >
            {String(index).padStart(3, '0')}
          </span>
        )}

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
      </TiltCard>

      {/* Product info — Tier 4: name + monospace price + code */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {/* Product code in monospace */}
        <span
          style={{
            fontFamily: mono,
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: '#9B9B9B',
          }}
        >
          VM—{productCode}
        </span>

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

        {/* Monospace price — raw data-spec feel */}
        <p
          style={{
            fontFamily: mono,
            fontSize: '13px',
            fontWeight: 400,
            color: '#050505',
            fontVariantNumeric: 'tabular-nums',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {product.priceDisplay}
        </p>
      </div>
    </Link>
  )
}
