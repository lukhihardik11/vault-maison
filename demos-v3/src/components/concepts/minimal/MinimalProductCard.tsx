'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type Product } from '@/data/products'

interface MinimalProductCardProps {
  product: Product
}

export function MinimalProductCard({ product }: MinimalProductCardProps) {
  return (
    <Link
      href={`/minimal/product/${product.slug}`}
      style={{ textDecoration: 'none', color: '#050505', display: 'block' }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: '#F5F5F5',
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          style={{
            objectFit: 'cover',
            transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          sizes="(max-width: 768px) 50vw, 33vw"
          className="minimal-product-img"
        />
      </div>
      <div style={{ marginTop: '12px' }}>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          {product.name}
        </p>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 300,
            margin: '4px 0 0 0',
            opacity: 0.6,
          }}
        >
          {product.priceDisplay}
        </p>
      </div>
      <style>{`
        .minimal-product-img { opacity: 0.85; }
        a:hover .minimal-product-img { opacity: 1; }
      `}</style>
    </Link>
  )
}
