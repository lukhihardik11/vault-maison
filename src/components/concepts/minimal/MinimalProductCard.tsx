'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Product } from '@/data/products'
import { minimal } from './design-system'

interface MinimalProductCardProps {
  product: Product
}

export function MinimalProductCard({ product }: MinimalProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const hasSecondImage = product.images.length > 1
  const font = minimal.font.primary
  const mono = minimal.font.mono

  return (
    <Link
      href={`/minimal/product/${product.slug}`}
      className="group block"
      style={{ textDecoration: 'none', color: '#050505' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          backgroundColor: '#FAFAFA',
          marginBottom: '16px',
        }}
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="eager"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            opacity: isHovered && hasSecondImage ? 0 : 1,
          }}
        />

        {/* Secondary Image (shown on hover) */}
        {hasSecondImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            loading="eager"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Quick View Bar — slides up on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '44px',
            backgroundColor: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            style={{
              fontFamily: font,
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}
          >
            Quick View
          </span>
        </div>

        {/* New / Bestseller Badge */}
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

      {/* Product Info */}
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
          style={{
            fontFamily: font,
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#050505',
            margin: 0,
            transition: 'opacity 0.2s ease',
          }}
          className="group-hover:underline underline-offset-4 decoration-[#050505]/20"
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
