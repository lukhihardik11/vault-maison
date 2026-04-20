'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { type Product } from '@/data/products'
import { minimal } from './design-system'

interface MinimalProductCardProps {
  product: Product
}

export function MinimalProductCard({ product }: MinimalProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [altImgLoaded, setAltImgLoaded] = useState(false)
  const hasSecondImage = product.images.length > 1
  const font = minimal.font.primary
  const mono = minimal.font.mono

  const handleImgLoad = useCallback(() => setImgLoaded(true), [])
  const handleAltImgLoad = useCallback(() => setAltImgLoaded(true), [])

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
        className="product-image"
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          backgroundColor: '#FAFAFA',
          marginBottom: '16px',
        }}
      >
        {/* Skeleton placeholder */}
        {!imgLoaded && (
          <div
            className="animate-pulse"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#F0F0F0',
            }}
          />
        )}

        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={handleImgLoad}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            opacity: imgLoaded ? (isHovered && hasSecondImage ? 0 : 1) : 0,
          }}
        />

        {/* Secondary Image (shown on hover) */}
        {hasSecondImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            loading="lazy"
            decoding="async"
            onLoad={handleAltImgLoad}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease',
              transform: isHovered ? 'scale(1.03)' : 'scale(1)',
              opacity: isHovered && altImgLoaded ? 1 : 0,
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
          className="minimal-card-title"
          style={{
            fontFamily: font,
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#050505',
            margin: 0,
            position: 'relative',
            display: 'inline-block',
            width: 'fit-content',
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
