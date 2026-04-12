'use client'

import { useState, useMemo } from 'react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { products } from '@/data/products'

export function MinimalSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 120px' }} className="minimal-search">
        <div style={{ maxWidth: '1000px' }}>
          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoFocus
            style={{
              width: '100%',
              padding: '16px 0',
              border: 'none',
              borderBottom: '1px solid #050505',
              fontSize: '24px',
              fontWeight: 300,
              fontFamily: 'inherit',
              color: '#050505',
              backgroundColor: 'transparent',
              outline: 'none',
              marginBottom: '48px',
            }}
          />

          {/* Results */}
          {query.trim() && (
            <>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '32px' }}>
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              {results.length > 0 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                  }}
                  className="minimal-search-grid"
                >
                  {results.map((p) => (
                    <MinimalProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '13px', fontWeight: 300, opacity: 0.5 }}>
                  No results found. Try a different search term.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-search { padding: 60px 20px 80px !important; }
          .minimal-search-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
