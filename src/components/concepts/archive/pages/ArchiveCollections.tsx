'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { ArchiveButton, PeriodSelector, type Period } from '../ui'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { ChevronRight } from 'lucide-react'

export function ArchiveCollections() {
  
  const periods: Period[] = [
    { id: 'all', label: 'All Periods', years: 'Complete Catalog' },
    { id: 'contemporary', label: 'Contemporary', years: '2000–Present', count: 18 },
    { id: 'modern', label: 'Modern', years: '1950–1999', count: 12 },
    { id: 'vintage', label: 'Vintage', years: '1920–1949', count: 8 },
    { id: 'antique', label: 'Antique', years: 'Pre-1920', count: 4 },
  ]
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const categoryImages: Record<string, string> = {
    'diamond-rings': '/images/archive/diamond-velvet.jpg',
    'gold-necklaces': '/images/archive/emerald-necklace-dark.webp',
    'diamond-earrings': '/images/archive/pearl-earrings-dark.jpg',
    'diamond-bracelets': '/images/archive/diamond-bracelet-dark.jpg',
  }

  return (
    <>
      {/* Hero */}
      <section style={{
        background: AR.bg, padding: '64px 32px 32px', textAlign: 'center',
        borderBottom: `1px solid ${AR.border}`,
      }}>
        <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
          THE COMPLETE CATALOG
        </p>
        <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>
          Collections
        </h1>
        <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, maxWidth: 600, margin: '0 auto 32px' }}>
          Browse our authenticated catalog organized by category and historical period.
        </p>
        <GoldRule style={{ marginBottom: 32 }} />
        <PeriodSelector periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} style={{ justifyContent: 'center' }} />
      </section>

      {/* Category Grid */}
      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {allCategories.map((cat, i) => {
            const products = getProductsByCategory(cat)
            const image = categoryImages[cat] || '/images/archive/jewelry-dark-bg.jpg'
            return (
              <StaggerItem key={cat} index={i}>
                <Link href={`/archive/category/${cat}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: AR.card, border: `1px solid ${AR.border}`, overflow: 'hidden',
                  }} className="archive-doc-hover">
                    {/* Catalog header strip */}
                    <div style={{
                      background: AR.surface, padding: '8px 16px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      borderBottom: `1px solid ${AR.border}`,
                    }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: AR.accent, textTransform: 'uppercase' }}>
                        SECTION {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: AR.textSecondary }}>
                        {products.length} RECORDS
                      </span>
                    </div>

                    {/* Image */}
                    <div style={{ position: 'relative', height: 200, background: '#0a0808' }}>
                      <Image src={image} alt={categoryLabels[cat]} fill style={{ objectFit: 'cover', opacity: 0.85 }} />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '20px 20px 24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, color: AR.text, margin: '0 0 8px' }}>
                        {categoryLabels[cat]}
                      </h3>
                      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary, lineHeight: 1.5, margin: '0 0 16px' }}>
                        {categoryDescriptions[cat] || `Authenticated collection of ${categoryLabels[cat].toLowerCase()}`}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: AR.accent }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                          VIEW CATALOG
                        </span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </div>
      </ArchiveSection>

      {/* CTA */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, fontStyle: 'italic', marginBottom: 24 }}>
              &ldquo;Every piece in our archive tells a story spanning centuries of human artistry.&rdquo;
            </p>
            <ArchiveButton variant="secondary" href="/archive/craftsmanship">Explore Provenance</ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
