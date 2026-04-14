'use client'

import React, { useState, useMemo } from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonRevealCard } from '../ui/SalonRevealCard'
import { SalonGlowSearch } from '../ui/SalonGlowSearch'
import { getBestsellers } from '@/data/products'

export function SalonSearch() {
  const [query, setQuery] = useState('')
  const allProducts = getBestsellers()
  const results = useMemo(() => {
    if (!query.trim()) return []
    return allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle.toLowerCase().includes(query.toLowerCase()))
  }, [query, allProducts])

  return (
    <SalonLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>
          Search Our Collection
        </h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, margin: '0 0 32px' }}>
          Find the perfect piece with our curated search
        </p>
        <SalonGlowSearch
          value={query}
          onChange={setQuery}
          placeholder="What are you looking for?"
          showFilterButton
        />
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 100px' }}>
        {query && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: S.textSecondary, marginBottom: 24 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        )}
        {results.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {results.map((p, i) => (
              <SalonRevealCard
                key={p.id}
                name={p.name}
                slug={p.slug}
                price={p.priceDisplay}
                image={p.images[0]}
                category={p.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                isNew={i < 2}
              />
            ))}
          </div>
        ) : query ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: S.text, marginBottom: 8 }}>No results found</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary }}>Try a different search or chat with Sophie for personalized help.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary }}>Start typing to search our collection...</p>
          </div>
        )}
      </section>
    </SalonLayout>
  )
}
