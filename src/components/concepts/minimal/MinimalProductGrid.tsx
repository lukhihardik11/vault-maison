'use client'

import { useState, useMemo } from 'react'
import { type Product } from '@/data/products'
import { MinimalProductCard } from './MinimalProductCard'
import { ScrollReveal } from './ScrollReveal'
import { minimal } from './design-system'

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
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break
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
        <div className={`flex gap-6 mb-10 pb-4 ${minimal.cn.divider}`} style={{ borderBottom: '1px solid #E5E5E5' }}>
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className="bg-transparent border-none cursor-pointer text-[11px] uppercase tracking-[0.15em] p-0 transition-colors duration-300"
              style={{
                color: sort === opt.value ? '#050505' : '#767676',
                fontWeight: sort === opt.value ? 500 : 400,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {sorted.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 80}>
            <MinimalProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
