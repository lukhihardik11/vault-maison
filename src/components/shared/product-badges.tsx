'use client'

import { type ConceptConfig } from '@/data/concepts'
import type { Product } from '@/types'

interface ProductBadgesProps {
  product: Product
  concept: ConceptConfig
  /** Position: 'overlay' for on-image, 'inline' for next to title */
  position?: 'overlay' | 'inline'
}

/**
 * Product Badges — displays contextual badges on product cards and detail pages.
 *
 * Badges:
 *   - NEW: product.isNew === true
 *   - BESTSELLER: product.isBestseller === true
 *   - LIMITED: product.isLimited === true
 *   - LOW STOCK: simulated based on product ID hash (in production, from inventory)
 */
export function ProductBadges({ product, concept, position = 'overlay' }: ProductBadgesProps) {
  const badges: { label: string; color: string; textColor: string }[] = []

  if (product.isNew) {
    badges.push({
      label: 'New',
      color: concept.palette.accent,
      textColor: concept.palette.bg,
    })
  }

  if (product.isBestseller) {
    badges.push({
      label: 'Bestseller',
      color: concept.palette.surface,
      textColor: concept.palette.accent,
    })
  }

  if (product.isLimited) {
    badges.push({
      label: 'Limited Edition',
      color: '#8B0000',
      textColor: '#FFFFFF',
    })
  }

  // Simulate low stock for demo (in production, check real inventory)
  const isLowStock = simulateLowStock(product.id)
  if (isLowStock && product.inStock) {
    badges.push({
      label: 'Only 2 Left',
      color: '#B8860B',
      textColor: '#FFFFFF',
    })
  }

  if (badges.length === 0) return null

  if (position === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className="px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-medium"
            style={{
              backgroundColor: badge.color,
              color: badge.textColor,
              border: `1px solid ${concept.palette.muted}`,
            }}
          >
            {badge.label}
          </span>
        ))}
      </div>
    )
  }

  // Overlay position (on product images)
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-medium text-right"
          style={{
            backgroundColor: badge.color,
            color: badge.textColor,
          }}
        >
          {badge.label}
        </span>
      ))}
    </div>
  )
}

/**
 * Deterministic "low stock" simulation based on product ID.
 * In production, replace with real inventory check.
 */
function simulateLowStock(productId: string): boolean {
  let hash = 0
  for (let i = 0; i < productId.length; i++) {
    hash = (hash << 5) - hash + productId.charCodeAt(i)
    hash |= 0
  }
  // ~15% of products show as "low stock"
  return Math.abs(hash % 100) < 15
}
