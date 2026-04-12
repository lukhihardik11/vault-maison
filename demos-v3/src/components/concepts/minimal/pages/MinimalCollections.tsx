'use client'

import Link from 'next/link'
import { MinimalPage } from '../MinimalPage'
import { allCategories, categoryLabels, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'

export function MinimalCollections() {
  return (
    <MinimalPage title="Collections" subtitle="Browse by category.">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          backgroundColor: '#E5E5E5',
          maxWidth: '1000px',
        }}
        className="minimal-collections-grid"
      >
        {allCategories.map((cat: ProductCategory) => {
          const count = getProductsByCategory(cat).length
          return (
            <Link
              key={cat}
              href={`/minimal/category/${cat}`}
              style={{
                display: 'block',
                padding: '40px 32px',
                backgroundColor: '#FFFFFF',
                textDecoration: 'none',
                color: '#050505',
                transition: 'background-color 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF' }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  marginBottom: '4px',
                }}
              >
                {categoryLabels[cat]}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 300,
                  opacity: 0.4,
                }}
              >
                {count} {count === 1 ? 'piece' : 'pieces'}
              </p>
            </Link>
          )
        })}
      </div>

      <style>{`
        @media (min-width: 769px) {
          .minimal-collections-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </MinimalPage>
  )
}
