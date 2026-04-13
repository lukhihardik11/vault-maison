'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search as SearchIcon } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { products } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const suggestedSearches = ['Diamond Ring', 'Gold Necklace', 'Tennis Bracelet', 'Earrings', 'Solitaire', 'Wedding']

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
      <section style={{ padding: '100px 5vw 120px' }} className="minimal-search">
        <div style={{ maxWidth: '1000px' }}>
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontFamily: font,
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#050505',
              opacity: 0.4,
              marginBottom: '24px',
            }}>
              Search
            </p>
          </motion.div>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ position: 'relative', marginBottom: '48px' }}
          >
            <SearchIcon
              size={18}
              strokeWidth={1.2}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#050505',
                opacity: 0.3,
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              autoFocus
              style={{
                width: '100%',
                padding: '16px 0 16px 32px',
                border: 'none',
                borderBottom: '1px solid #050505',
                fontSize: '28px',
                fontWeight: 200,
                fontFamily: font,
                color: '#050505',
                backgroundColor: 'transparent',
                outline: 'none',
                letterSpacing: '0.01em',
              }}
            />
          </motion.div>

          {/* Suggested Searches (when empty) */}
          <AnimatePresence>
            {!query.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{
                  fontFamily: font,
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#050505',
                  opacity: 0.35,
                  marginBottom: '16px',
                }}>
                  Suggested
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {suggestedSearches.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      onClick={() => setQuery(s)}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #E5E5E5',
                        backgroundColor: 'transparent',
                        color: '#050505',
                        fontSize: '12px',
                        fontWeight: 300,
                        fontFamily: font,
                        cursor: 'pointer',
                        transition: 'all 300ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#050505'
                        e.currentTarget.style.backgroundColor = '#050505'
                        e.currentTarget.style.color = '#FFFFFF'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E5E5E5'
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#050505'
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence mode="wait">
            {query.trim() && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{
                  fontFamily: font,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#050505',
                  opacity: 0.4,
                  marginBottom: '32px',
                }}>
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
                    {results.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <MinimalProductCard product={p} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <p style={{
                      fontFamily: font,
                      fontSize: '16px',
                      fontWeight: 200,
                      color: '#050505',
                      marginBottom: '8px',
                    }}>
                      No results found
                    </p>
                    <p style={{
                      fontFamily: font,
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#050505',
                      opacity: 0.5,
                    }}>
                      Try a different search term or browse our collections.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
