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

  return (
    <Link
      href={`/minimal/product/${product.slug}`}
      className="group block"
      style={{ textDecoration: 'none', color: '#050505' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          backgroundColor: '#FAFAFA',
          marginBottom: '16px',
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.7s ease-out',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />
      </div>

      <div className="space-y-1">
        {product.category && (
          <span className={minimal.cn.label}>
            {product.category.replace(/-/g, ' ')}
          </span>
        )}
        <h3 className="text-[15px] font-medium tracking-tight text-[#050505] group-hover:underline underline-offset-4 decoration-[#050505]/30 transition-all duration-300">
          {product.name}
        </h3>
        <p className={minimal.cn.price}>
          {product.priceDisplay}
        </p>
      </div>
    </Link>
  )
}
