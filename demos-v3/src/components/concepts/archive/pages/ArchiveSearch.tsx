'use client'
import React, { useState } from 'react'
import { AR, ArchiveSection, RevealSection, StaggerItem } from '../ArchiveLayout'
import { DocumentCard } from '../ui'
import { Search } from 'lucide-react'
import { products, formatPrice } from '@/data/products'

export function ArchiveSearch() {
  const [query, setQuery] = useState('')
  
  const filtered = query.length > 1 ? products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    p.material?.toLowerCase().includes(query.toLowerCase())
  ) : []

  return (
    <>
      <section style={{ background: AR.bg, padding: '64px 32px 32px', borderBottom: `1px solid ${AR.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>
            CATALOG SEARCH
          </p>
          <div style={{ position: 'relative' }}>
            <Search size={18} color={AR.textSecondary} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, material, or catalog number..."
              style={{
                width: '100%', padding: '16px 16px 16px 48px',
                fontFamily: "'Crimson Text', serif", fontSize: '1.1rem',
                color: AR.text, background: AR.surface, border: `1px solid ${AR.border}`,
                outline: 'none',
              }}
            />
          </div>
          {query.length > 0 && (
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: AR.textSecondary, marginTop: 12 }}>
              {filtered.length} RECORD{filtered.length !== 1 ? 'S' : ''} FOUND
            </p>
          )}
        </div>
      </section>

      <ArchiveSection>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <StaggerItem key={p.id} index={i % 6}>
                <DocumentCard
                  title={p.name} subtitle={p.subtitle}
                  catalogNumber={`VM-${p.id.toUpperCase()}`}
                  image={p.images[0]} href={`/archive/product/${p.slug}`}
                  price={formatPrice(p.price)} authenticated={true}
                />
              </StaggerItem>
            ))}
          </div>
        ) : query.length === 0 ? (
          <RevealSection>
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, marginBottom: 16 }}>
                Enter a search term to query the archive catalog.
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Diamond', 'Gold', 'Emerald', 'Sapphire', 'Platinum'].map(term => (
                  <button key={term} onClick={() => setQuery(term)} style={{
                    padding: '8px 16px', background: AR.surface, border: `1px solid ${AR.border}`,
                    color: AR.textSecondary, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
                    cursor: 'pointer', letterSpacing: '0.08em',
                  }}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary }}>
              No records match your search criteria.
            </p>
          </div>
        )}
      </ArchiveSection>
    </>
  )
}
