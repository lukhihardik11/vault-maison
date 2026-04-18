'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, Clock, TrendingUp, SlidersHorizontal } from 'lucide-react'
import { products as allProductsList, type Product } from '@/data/products'

interface SearchPageProps {
  conceptId: string
  accentColor: string
  bgColor: string
  textColor: string
  mutedColor: string
  cardBg?: string
  fontHeading?: string
  fontBody?: string
}

const popularSearches = ['Diamond Ring', 'Gold Necklace', 'Sapphire', 'Engagement', 'Tennis Bracelet', 'Pearl Earrings']
const recentSearches = ['Emerald Cut Ring', 'Rose Gold Band', 'Solitaire Pendant']

export function SearchPage({
  conceptId,
  accentColor,
  bgColor,
  textColor,
  mutedColor,
  cardBg,
  fontHeading = "'Playfair Display', serif",
  fontBody = "'Inter', sans-serif",
}: SearchPageProps) {
  const [query, setQuery] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const allProducts = allProductsList

  const bg = cardBg || `${textColor}08`
  const border = `${textColor}15`

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allProducts
      .filter(p =>
        (p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)) &&
        p.price >= priceRange[0] && p.price <= priceRange[1]
      )
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        // relevance: exact name match first
        const aExact = a.name.toLowerCase().includes(q) ? 0 : 1
        const bExact = b.name.toLowerCase().includes(q) ? 0 : 1
        return aExact - bExact
      })
  }, [query, priceRange, sortBy, allProducts])

  return (
    <div style={{ background: bgColor, minHeight: '100vh', paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        {/* Search header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: fontHeading, fontSize: '2rem', fontWeight: 400, color: textColor, margin: '0 0 24px' }}>Search</h1>
          <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
            <Search size={18} color={mutedColor} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for jewelry, gemstones, collections..."
              autoFocus
              style={{
                width: '100%', padding: '16px 48px 16px 48px', background: 'transparent',
                border: `1px solid ${border}`, color: textColor, fontFamily: fontBody,
                fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                borderBottom: `2px solid ${query ? accentColor : border}`,
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: mutedColor, cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* No query — show suggestions */}
        {!query.trim() && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {/* Recent searches */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Clock size={14} color={mutedColor} />
                <span style={{ fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mutedColor }}>Recent Searches</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {recentSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    style={{
                      padding: '8px 16px', background: 'transparent', border: `1px solid ${border}`,
                      color: textColor, fontFamily: fontBody, fontSize: '0.75rem', cursor: 'pointer',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular searches */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <TrendingUp size={14} color={accentColor} />
                <span style={{ fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mutedColor }}>Popular Searches</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {popularSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    style={{
                      padding: '8px 16px', background: `${accentColor}10`, border: `1px solid ${accentColor}30`,
                      color: accentColor, fontFamily: fontBody, fontSize: '0.75rem', cursor: 'pointer',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() && (
          <>
            {/* Results header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: mutedColor, margin: 0 }}>
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                    background: showFilters ? `${accentColor}10` : 'transparent',
                    border: `1px solid ${showFilters ? accentColor : border}`,
                    color: showFilters ? accentColor : textColor,
                    fontFamily: fontBody, fontSize: '0.7rem', cursor: 'pointer',
                  }}
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 14px', background: 'transparent', border: `1px solid ${border}`,
                    color: textColor, fontFamily: fontBody, fontSize: '0.7rem', outline: 'none',
                  }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Filters panel */}
            {showFilters && (
              <div style={{ padding: 20, background: bg, border: `1px solid ${border}`, marginBottom: 24, display: 'flex', gap: 32, alignItems: 'center' }}>
                <div>
                  <label style={{ fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedColor, display: 'block', marginBottom: 8 }}>
                    Min Price: ${priceRange[0].toLocaleString()}
                  </label>
                  <input
                    type="range" min={0} max={50000} step={500}
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    style={{ width: 200, accentColor }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedColor, display: 'block', marginBottom: 8 }}>
                    Max Price: ${priceRange[1].toLocaleString()}
                  </label>
                  <input
                    type="range" min={0} max={50000} step={500}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    style={{ width: 200, accentColor }}
                  />
                </div>
              </div>
            )}

            {/* Results grid */}
            {results.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                {results.map(product => (
                  <Link
                    key={product.id}
                    href={`/${conceptId}/product/${product.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: bg, marginBottom: 12 }}>
                      <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="25vw" />
                    </div>
                    <h3 style={{ fontFamily: fontBody, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: textColor, margin: '0 0 4px' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor, margin: '0 0 4px' }}>{product.subtitle}</p>
                    <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: accentColor, margin: 0 }}>{product.priceDisplay}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Search size={36} strokeWidth={1} color={`${textColor}30`} style={{ margin: '0 auto 16px' }} />
                <p style={{ fontFamily: fontHeading, fontSize: '1.2rem', color: textColor, margin: '0 0 8px' }}>No results found</p>
                <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: mutedColor, margin: 0 }}>Try adjusting your search terms or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
