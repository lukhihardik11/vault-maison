'use client'

import { useState, useMemo } from 'react'
import { type Product } from '@/data/products'
import { type ConceptConfig } from '@/data/concepts'
import { ProductCard } from './product-card'

interface ProductGridProps {
  products: Product[]
  concept: ConceptConfig
  showFilters?: boolean
  columns?: 2 | 3 | 4
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'new' | 'bestseller'

export function ProductGrid({ products, concept, showFilters = false, columns = 4 }: ProductGridProps) {
  const [sort, setSort] = useState<SortOption>('default')
  const [materialFilter, setMaterialFilter] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  const filtered = useMemo(() => {
    let result = [...products]

    if (materialFilter !== 'all') {
      result = result.filter((p) => p.material === materialFilter)
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'bestseller':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
        break
    }

    return result
  }, [products, sort, materialFilter, priceRange])

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }

  return (
    <div>
      {showFilters && (
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6"
          style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
        >
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] uppercase tracking-[0.2em] opacity-60"
              style={{ color: concept.palette.text }}
            >
              {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={materialFilter}
              onChange={(e) => setMaterialFilter(e.target.value)}
              className="text-[10px] uppercase tracking-[0.15em] bg-transparent border px-3 py-2 cursor-pointer"
              style={{
                color: concept.palette.text,
                borderColor: concept.palette.muted,
              }}
            >
              <option value="all">All Materials</option>
              <option value="Diamond">Diamond</option>
              <option value="Gold">Gold</option>
              <option value="Diamond & Gold">Diamond & Gold</option>
              <option value="Platinum">Platinum</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-[10px] uppercase tracking-[0.15em] bg-transparent border px-3 py-2 cursor-pointer"
              style={{
                color: concept.palette.text,
                borderColor: concept.palette.muted,
              }}
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="new">New Arrivals</option>
              <option value="bestseller">Bestsellers</option>
            </select>
          </div>
        </div>
      )}

      <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
        {filtered.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            concept={concept}
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p
            className="text-xs uppercase tracking-[0.2em] opacity-40"
            style={{ color: concept.palette.text }}
          >
            No pieces match your criteria
          </p>
        </div>
      )}
    </div>
  )
}
