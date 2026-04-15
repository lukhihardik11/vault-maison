'use client'

import { useState, useMemo } from 'react'
import { Grid3X3, List, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'
import { type Product } from '@/data/products'
import { ProductGrid } from './product-grid'

interface CategoryFiltersProps {
  concept: ConceptConfig
  products: Product[]
  title?: string
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc'
type ViewMode = 'grid' | 'list'

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-5k', label: 'Under $5,000', min: 0, max: 5000 },
  { id: '5k-10k', label: '$5,000 - $10,000', min: 5000, max: 10000 },
  { id: '10k-20k', label: '$10,000 - $20,000', min: 10000, max: 20000 },
  { id: 'over-20k', label: 'Over $20,000', min: 20000, max: Infinity },
]

const materialFilters = ['All', 'Diamond', 'Gold', 'Diamond & Gold', 'Platinum']
const stoneFilters = ['All', 'Round Brilliant', 'Oval', 'Emerald', 'Cushion', 'Princess', 'Pear']

export function CategoryFilters({ concept, products, title }: CategoryFiltersProps) {
  const [priceRange, setPriceRange] = useState('all')
  const [material, setMaterial] = useState('All')
  const [stone, setStone] = useState('All')
  const [sort, setSort] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [showBestsellerOnly, setShowBestsellerOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Price filter
    const range = priceRanges.find((r) => r.id === priceRange)
    if (range && range.id !== 'all') {
      result = result.filter((p) => p.price >= range.min && p.price < range.max)
    }

    // Material filter
    if (material !== 'All') {
      result = result.filter((p) => p.material === material)
    }

    // Stone filter
    if (stone !== 'All') {
      result = result.filter((p) => p.diamondSpecs?.shape === stone)
    }

    // New/Bestseller
    if (showNewOnly) result = result.filter((p) => p.isNew)
    if (showBestsellerOnly) result = result.filter((p) => p.isBestseller)

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        // Keep original order (newest first)
        break
    }

    return result
  }, [products, priceRange, material, stone, sort, showNewOnly, showBestsellerOnly])

  const activeFilterCount = [
    priceRange !== 'all',
    material !== 'All',
    stone !== 'All',
    showNewOnly,
    showBestsellerOnly,
  ].filter(Boolean).length

  return (
    <div>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between py-4 mb-6"
        style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
      >
        <div className="flex items-center gap-4">
          {title && (
            <h2 className={`text-lg font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
              {title}
            </h2>
          )}
          <p className="text-xs opacity-40">
            Showing {filteredProducts.length} of {products.length} pieces
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
            style={{ border: `1px solid ${concept.palette.muted}` }}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
                style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none bg-transparent px-4 py-2 pr-8 text-[10px] uppercase tracking-[0.15em] cursor-pointer"
              style={{
                border: `1px solid ${concept.palette.muted}`,
                color: concept.palette.text,
              }}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
            <ChevronDown
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
            />
          </div>

          {/* View toggle */}
          <div
            className="hidden lg:flex items-center"
            style={{ border: `1px solid ${concept.palette.muted}` }}
          >
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 transition-opacity"
              style={{ opacity: viewMode === 'grid' ? 1 : 0.3 }}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 transition-opacity"
              style={{ opacity: viewMode === 'list' ? 1 : 0.3 }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mb-6 animate-slide-down"
          style={{
            backgroundColor: concept.palette.surface,
            border: `1px solid ${concept.palette.muted}`,
          }}
        >
          {/* Price Range */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3">Price Range</p>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setPriceRange(range.id)}
                  className="block w-full text-left text-xs py-1.5 transition-opacity hover:opacity-70"
                  style={{
                    color: priceRange === range.id ? concept.palette.accent : concept.palette.text,
                    opacity: priceRange === range.id ? 1 : 0.6,
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3">Material</p>
            <div className="space-y-2">
              {materialFilters.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  className="block w-full text-left text-xs py-1.5 transition-opacity hover:opacity-70"
                  style={{
                    color: material === m ? concept.palette.accent : concept.palette.text,
                    opacity: material === m ? 1 : 0.6,
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Stone Type */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3">Stone Shape</p>
            <div className="space-y-2">
              {stoneFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setStone(s)}
                  className="block w-full text-left text-xs py-1.5 transition-opacity hover:opacity-70"
                  style={{
                    color: stone === s ? concept.palette.accent : concept.palette.text,
                    opacity: stone === s ? 1 : 0.6,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3">Collection</p>
            <div className="space-y-2">
              <button
                onClick={() => setShowNewOnly(!showNewOnly)}
                className="flex items-center gap-2 text-xs py-1.5 transition-opacity hover:opacity-70"
              >
                <div
                  className="w-4 h-4 flex items-center justify-center"
                  style={{
                    border: `1px solid ${concept.palette.muted}`,
                    backgroundColor: showNewOnly ? concept.palette.accent : 'transparent',
                  }}
                >
                  {showNewOnly && <span className="text-[8px]" style={{ color: concept.palette.bg }}>✓</span>}
                </div>
                New Arrivals
              </button>
              <button
                onClick={() => setShowBestsellerOnly(!showBestsellerOnly)}
                className="flex items-center gap-2 text-xs py-1.5 transition-opacity hover:opacity-70"
              >
                <div
                  className="w-4 h-4 flex items-center justify-center"
                  style={{
                    border: `1px solid ${concept.palette.muted}`,
                    backgroundColor: showBestsellerOnly ? concept.palette.accent : 'transparent',
                  }}
                >
                  {showBestsellerOnly && <span className="text-[8px]" style={{ color: concept.palette.bg }}>✓</span>}
                </div>
                Bestsellers
              </button>
            </div>
          </div>

          {/* Clear All */}
          {activeFilterCount > 0 && (
            <div className="col-span-full">
              <button
                onClick={() => {
                  setPriceRange('all')
                  setMaterial('All')
                  setStone('All')
                  setShowNewOnly(false)
                  setShowBestsellerOnly(false)
                }}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
                style={{ color: concept.palette.accent }}
              >
                <X size={12} />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm opacity-40">No products match your filters.</p>
          <button
            onClick={() => {
              setPriceRange('all')
              setMaterial('All')
              setStone('All')
              setShowNewOnly(false)
              setShowBestsellerOnly(false)
            }}
            className="mt-4 text-xs underline transition-opacity hover:opacity-70"
            style={{ color: concept.palette.accent }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          concept={concept}
          columns={viewMode === 'list' ? 2 : 4}
        />
      )}
    </div>
  )
}
