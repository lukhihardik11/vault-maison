'use client'
import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { products } from '@/data/products'
import { ConceptLayout, PageHeader, ProductCard } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalSearch } from '@/components/concepts/minimal/pages'
import { TheaterSearch } from '@/components/concepts/theater/pages'
import { VaultSearch } from '@/components/concepts/vault/pages'
import { GallerySearch } from '@/components/concepts/gallery/pages'
import { SalonSearch } from '@/components/concepts/salon/pages'
import { AtelierSearch } from '@/components/concepts/atelier/pages'
import { ArchiveSearch } from '@/components/concepts/archive/pages'
import { ObservatorySearch } from '@/components/concepts/observatory/pages'
import { MarketplaceSearch } from '@/components/concepts/marketplace/pages'
import { MaisonSearch } from '@/components/concepts/maison/pages'

const priceRanges = [
  { label: 'Under $5,000', min: 0, max: 5000 },
  { label: '$5,000 – $10,000', min: 5000, max: 10000 },
  { label: '$10,000 – $25,000', min: 10000, max: 25000 },
  { label: 'Over $25,000', min: 25000, max: Infinity },
]

const materials = ['Diamond', 'Gold', 'Diamond & Gold', 'Platinum'] as const

export default function SearchPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const [query, setQuery] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [selectedRange, setSelectedRange] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    let filtered = [...products]
    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    if (selectedMaterial) {
      filtered = filtered.filter((p) => p.material === selectedMaterial)
    }
    if (selectedRange !== null) {
      const range = priceRanges[selectedRange]
      filtered = filtered.filter((p) => p.price >= range.min && p.price < range.max)
    }
    return filtered
  }, [query, selectedMaterial, selectedRange])

  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />

  if (concept.id === 'minimal') return <MinimalSearch />
  if (concept.id === 'vault') return <VaultSearch />
  if (concept.id === 'gallery') return <GallerySearch />
  if (concept.id === 'salon') return <SalonSearch />
  if (concept.id === 'atelier') return <AtelierSearch />
  if (concept.id === 'archive') return <ArchiveSearch />
  if (concept.id === 'observatory') return <ObservatorySearch />
  if (concept.id === 'theater') return <TheaterSearch />
  if (concept.id === 'marketplace') return <MarketplaceSearch />
  if (concept.id === 'maison') return <MaisonSearch />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Search"
        subtitle="Find the perfect piece from our curated collection."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Search', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        {/* Search Input */}
        <div className="relative mb-8">
          <Search
            size={18}
            strokeWidth={1.5}
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diamonds, gold, rings, necklaces..."
            className="w-full pl-12 pr-12 py-4 text-sm font-light bg-transparent outline-none"
            style={{
              borderBottom: `1px solid ${concept.palette.muted}`,
              color: concept.palette.text,
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-12 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100"
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4" style={{ borderBottom: `1px solid ${concept.palette.muted}` }}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3 opacity-60">Material</p>
                <div className="flex flex-wrap gap-2">
                  {materials.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(selectedMaterial === m ? null : m)}
                      className="px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-all"
                      style={{
                        border: `1px solid ${selectedMaterial === m ? concept.palette.accent : concept.palette.muted}`,
                        color: selectedMaterial === m ? concept.palette.accent : concept.palette.text,
                        opacity: selectedMaterial === m ? 1 : 0.6,
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3 opacity-60">Price Range</p>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedRange(selectedRange === i ? null : i)}
                      className="px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-all"
                      style={{
                        border: `1px solid ${selectedRange === i ? concept.palette.accent : concept.palette.muted}`,
                        color: selectedRange === i ? concept.palette.accent : concept.palette.text,
                        opacity: selectedRange === i ? 1 : 0.6,
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-xs font-light opacity-50 mb-8">
          {results.length} {results.length === 1 ? 'result' : 'results'}
          {query && ` for "${query}"`}
        </p>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} concept={concept} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-sm font-light opacity-40">No pieces found matching your criteria.</p>
            <button
              onClick={() => { setQuery(''); setSelectedMaterial(null); setSelectedRange(null) }}
              className="mt-4 text-[10px] uppercase tracking-[0.2em] pb-1"
              style={{ borderBottom: `1px solid ${concept.palette.accent}`, color: concept.palette.accent }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </ConceptLayout>
  )
}
