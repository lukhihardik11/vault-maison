'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { DocumentCard, ArchiveButton } from '../ui'
import { getProductsByCategory, formatPrice } from '@/data/products'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'

export function ArchiveCategory() {
  const params = useParams()
  const slug = params?.category as string
  
  const categorySlug = slug as ProductCategory
  const categoryName = categoryLabels[categorySlug]
  const products = getProductsByCategory(categorySlug)

  if (!categoryName) {
    return (
      <ArchiveSection>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: AR.text }}>
            Category Not Found
          </h1>
          <ArchiveButton href="/archive/collections" style={{ marginTop: 24 }}>Return to Catalog</ArchiveButton>
        </div>
      </ArchiveSection>
    )
  }

  return (
    <>
      {/* Header */}
      <section style={{ background: AR.bg, padding: '48px 32px 32px', borderBottom: `1px solid ${AR.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <a href="/archive" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textDecoration: 'none' }}>ARCHIVE</a>
            <span style={{ color: AR.border }}>/</span>
            <a href="/archive/collections" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textDecoration: 'none' }}>CATALOG</a>
            <span style={{ color: AR.border }}>/</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.accent }}>{categoryName.toUpperCase()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 500, color: AR.text, margin: '0 0 8px' }}>
                {categoryName}
              </h1>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: AR.textSecondary }}>
                {products.length} AUTHENTICATED RECORDS
              </p>
            </div>
          </div>
          <GoldRule style={{ marginTop: 24 }} />
        </div>
      </section>

      {/* Product Grid */}
      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {products.map((product, i) => (
            <StaggerItem key={product.id} index={i % 6}>
              <DocumentCard
                title={product.name}
                subtitle={product.subtitle}
                catalogNumber={`VM-${product.id.toUpperCase()}`}
                image={product.images[0]}
                href={`/archive/product/${product.slug}`}
                price={formatPrice(product.price)}
                authenticated={true}
                period="Contemporary"
              />
            </StaggerItem>
          ))}
        </div>

        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary }}>
              No records found in this category.
            </p>
          </div>
        )}
      </ArchiveSection>

      {/* CTA */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, marginBottom: 24 }}>
              Each piece includes full provenance documentation and authentication certificate.
            </p>
            <ArchiveButton variant="secondary" href="/archive/craftsmanship">Authentication Process</ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
