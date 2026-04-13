'use client'

import { useState, useMemo } from 'react'
import { type Product } from '@/data/products'
import { MinimalProductCard } from './MinimalProductCard'

interface MinimalProductGridProps {
  products: Product[]
  showSort?: boolean
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name'

export function MinimalProductGrid({ products, showSort = false }: MinimalProductGridProps) {
  const [sort, setSort] = useState<SortOption>('default')

  const sorted = useMemo(() => {
    const result = [...products]
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    return result
  }, [products, sort])

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low' },
    { value: 'price-desc', label: 'Price: High' },
    { value: 'name', label: 'Name' },
  ]

  return (
    <div>
      {showSort && (
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '40px',
            paddingBottom: '16px',
            borderBottom: '1px solid #E8E5E0',
          }}
        >
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontWeight: 400,
                color: '#050505',
                opacity: sort === opt.value ? 1 : 0.4,
                transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                padding: 0,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          columnGap: '40px',
          rowGap: '60px',
        }}
        className="minimal-product-grid"
      >
        {sorted.map((product) => (
          <MinimalProductCard key={product.id} product={product} />
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .minimal-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            column-gap: 20px !important;
            row-gap: 40px !important;
          }
        }
      `}</style>
    </div>
  )
}
