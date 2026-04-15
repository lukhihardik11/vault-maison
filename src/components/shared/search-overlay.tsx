'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'
import { type Product, formatPrice } from '@/data/products'
import { searchProducts, getTrendingSearchTerms } from '@/lib/search'
import { buildConceptUrl } from '@/lib/concept-utils'

interface SearchOverlayProps {
  concept: ConceptConfig
  isOpen: boolean
  onClose: () => void
}

const popularSearches = getTrendingSearchTerms()

export function SearchOverlay({ concept, isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    // Fuse.js fuzzy search for better relevance ranking
    const matched = searchProducts(query, 8)
    setResults(matched)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9998]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ backgroundColor: `${concept.palette.bg}ee` }}
        onClick={onClose}
      />

      {/* Search Panel */}
      <div
        className="relative z-10 w-full max-w-3xl mx-auto mt-20 px-6 animate-slide-down"
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-4 px-6 py-5"
          style={{
            backgroundColor: concept.palette.surface,
            border: `1px solid ${concept.palette.muted}`,
          }}
        >
          <Search size={20} style={{ color: concept.palette.accent }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our collection..."
            className="flex-1 bg-transparent outline-none text-sm tracking-wide"
            style={{ color: concept.palette.text }}
          />
          <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity">
            <X size={20} />
          </button>
        </div>

        {/* Results / Popular */}
        <div
          className="mt-1 max-h-[60vh] overflow-y-auto"
          style={{
            backgroundColor: concept.palette.surface,
            border: `1px solid ${concept.palette.muted}`,
          }}
        >
          {query.length < 2 ? (
            <div className="p-6">
              <p
                className="text-[10px] uppercase tracking-[0.2em] mb-4"
                style={{ color: concept.palette.accent }}
              >
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2 text-xs tracking-wide transition-colors hover:opacity-80"
                    style={{
                      border: `1px solid ${concept.palette.muted}`,
                      color: concept.palette.text,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm opacity-60">No results found for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: concept.palette.muted }}>
              <div className="px-6 py-3">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={buildConceptUrl(concept.id, `product/${product.slug}`)}
                  onClick={onClose}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:opacity-80"
                >
                  <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs opacity-50 truncate">{product.subtitle}</p>
                  </div>
                  <p
                    className="text-sm font-medium flex-shrink-0"
                    style={{ color: concept.palette.accent }}
                  >
                    {product.priceDisplay}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
