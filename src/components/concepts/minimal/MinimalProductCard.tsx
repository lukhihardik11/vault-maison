'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { type Product } from '@/data/products'
import { MINIMAL } from './design-tokens'

const { colors, font } = MINIMAL

interface MinimalProductCardProps {
  product: Product
}

export function MinimalProductCard({ product }: MinimalProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Lazy loading: only load image when in viewport
  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Link
      href={`/minimal/product/${product.slug}`}
      className="group block"
      style={{ textDecoration: 'none', color: colors.text }}
    >
      {/* Image container — no borders, no shadows at rest */}
      <div
        ref={imgRef}
        className="mn-product-image"
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          backgroundColor: colors.hover,
        }}
      >
        {/* Skeleton placeholder */}
        {!imgLoaded && (
          <div
            className="mn-skeleton"
            style={{ position: 'absolute', inset: 0, backgroundColor: '#F5F5F5' }}
          />
        )}
        {/* Actual image with zoom on hover */}
        {inView && (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease-out, opacity 0.7s ease-out',
              opacity: imgLoaded ? 1 : 0,
            }}
            className="group-hover:scale-[1.03]"
          />
        )}
        {/* NEW badge */}
        {product.isNew && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            fontFamily: font,
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: colors.bg,
            backgroundColor: colors.text,
            padding: '3px 8px',
          }}>
            New
          </span>
        )}
      </div>

      {/* Product info */}
      <div style={{ marginTop: '12px' }}>
        {/* Title with animated underline */}
        <p
          className="mn-underline-hover"
          style={{
            fontFamily: font,
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.01em',
            margin: 0,
            color: colors.text,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </p>
        {/* Price in tabular-nums */}
        <p
          style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 400,
            margin: '4px 0 0 0',
            color: colors.textSecondary,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {product.priceDisplay}
        </p>
      </div>
    </Link>
  )
}
