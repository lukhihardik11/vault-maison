'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { type Product } from '@/data/products'
import { type ConceptConfig } from '@/data/concepts'
import { useWishlistStore } from '@/store/wishlist'
import { buildProductUrl } from '@/lib/concept-utils'

interface ProductCardProps {
  product: Product
  concept: ConceptConfig
  index?: number
}

export function ProductCard({ product, concept, index = 0 }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore()
  const wishlisted = isInWishlist(product.id)
  const isMinimal = concept.id === 'minimal'

  return (
    <motion.div
      initial={isMinimal ? {} : { opacity: 0, y: 30 }}
      whileInView={isMinimal ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={isMinimal ? {} : { duration: 0.8, delay: index * 0.1 }}
    >
      <Link
        href={buildProductUrl(concept.id, product.slug)}
        className="group block"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all"
            style={{
              transitionDuration: isMinimal ? '0ms' : '800ms',
            }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              backgroundColor: `${concept.palette.bg}33`,
              transitionDuration: '600ms',
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span
                className="text-[9px] uppercase tracking-[0.15em] px-2 py-1"
                style={{
                  backgroundColor: concept.palette.accent,
                  color: concept.palette.bg,
                }}
              >
                New
              </span>
            )}
            {product.isLimited && (
              <span
                className="text-[9px] uppercase tracking-[0.15em] px-2 py-1"
                style={{
                  backgroundColor: concept.palette.text,
                  color: concept.palette.bg,
                }}
              >
                Limited
              </span>
            )}
            {product.isBestseller && (
              <span
                className="text-[9px] uppercase tracking-[0.15em] px-2 py-1"
                style={{
                  backgroundColor: concept.palette.muted,
                  color: concept.palette.text,
                }}
              >
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleItem(product)
            }}
            className="absolute top-3 right-3 p-2 transition-opacity opacity-0 group-hover:opacity-100"
            style={{ transitionDuration: '400ms' }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              fill={wishlisted ? concept.palette.accent : 'none'}
              color={wishlisted ? concept.palette.accent : concept.palette.text}
            />
          </button>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1">
          <h3
            className="text-xs uppercase tracking-[0.15em] font-light"
            style={{ color: concept.palette.text }}
          >
            {product.name}
          </h3>
          <p
            className="text-[10px] tracking-[0.1em] opacity-60"
            style={{ color: concept.palette.text }}
          >
            {product.subtitle}
          </p>
          <p
            className="text-xs font-light tracking-[0.05em]"
            style={{ color: concept.palette.text }}
          >
            {product.priceDisplay}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
