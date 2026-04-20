'use client'

import Link from 'next/link'
import { type Product } from '@/data/products'
import { minimal } from './design-system'
import BlurUpImage from './ui/BlurUpImage'

interface MinimalProductCardProps {
  product: Product
}

/**
 * Quiet product tile: single image, category eyebrow, name, price.
 *
 * Intentionally free of hover interactions — the card earlier swapped
 * to a secondary "back-angle" image, scaled on hover, and slid a dark
 * "Quick View" bar up from the bottom. All of that read as busy on the
 * Minimal Machine concept; per user direction ("delete the hover
 * preview effect and the hover circle effect") the card is now a
 * clean clickable tile.
 */
export function MinimalProductCard({ product }: MinimalProductCardProps) {
  const font = minimal.font.primary
  const mono = minimal.font.mono

  return (
    <Link
      href={`/minimal/product/${product.slug}`}
      className="group block"
      style={{ textDecoration: 'none', color: '#050505' }}
    >
      {/* Image */}
      <div
        className="product-image"
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          backgroundColor: '#FAFAFA',
          marginBottom: '16px',
        }}
      >
        <BlurUpImage
          src={product.images[0]}
          alt={product.name}
          containerStyle={{ width: '100%', height: '100%', background: '#E5E5E5' }}
        />

        {/* New / Bestseller badge — kept because it's a static affordance,
            not a hover effect. */}
        {(product.isNew || product.isBestseller) && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontFamily: mono,
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#050505',
              backgroundColor: '#FFFFFF',
              padding: '5px 10px',
            }}
          >
            {product.isNew ? 'New' : 'Best'}
          </span>
        )}
      </div>

      {/* Product info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {product.category && (
          <span
            style={{
              fontFamily: mono,
              fontSize: '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#9B9B9B',
            }}
          >
            {product.category.replace(/-/g, ' ')}
          </span>
        )}
        <h3
          className="minimal-card-title"
          style={{
            fontFamily: font,
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#050505',
            margin: 0,
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
