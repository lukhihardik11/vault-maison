'use client'

import Link from 'next/link'
import { MinimalPage } from '../MinimalPage'
import { MinimalProductCard } from '../MinimalProductCard'
import { useWishlistStore } from '@/store/wishlist'

export function MinimalWishlist() {
  const { items } = useWishlistStore()

  return (
    <MinimalPage title="Wishlist">
      <div style={{ maxWidth: '1000px' }}>
        {items.length === 0 ? (
          <div style={{ paddingTop: '40px' }}>
            <p style={{ fontSize: '13px', fontWeight: 300, opacity: 0.4, marginBottom: '24px' }}>
              No saved items.
            </p>
            <Link
              href="/minimal/collections"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontWeight: 400,
                color: '#050505',
                textDecoration: 'none',
                opacity: 0.6,
              }}
            >
              Browse Collections &rarr;
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="minimal-wishlist-grid"
          >
            {items.map((product) => (
              <MinimalProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .minimal-wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalPage>
  )
}
