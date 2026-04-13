'use client'

import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { SlideTextButton } from '../ui'
import { useWishlistStore } from '@/store/wishlist'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

export function MinimalWishlist() {
  const { items } = useWishlistStore()

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '100px 5vw 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '8px',
          }}>
            Wishlist
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
          }}>
            Saved Pieces
          </h1>
        </motion.div>
      </section>

      <section style={{ padding: '40px 5vw 120px' }}>
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '80px 0' }}
          >
            <Heart size={32} strokeWidth={0.8} style={{ color: '#050505', opacity: 0.15, marginBottom: '16px' }} />
            <p style={{
              fontFamily: font,
              fontSize: '16px',
              fontWeight: 200,
              color: '#050505',
              marginBottom: '12px',
            }}>
              No saved items
            </p>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.5,
              marginBottom: '32px',
            }}>
              Browse our collections and save pieces you love.
            </p>
            <SlideTextButton
              text="Browse Collections"
              hoverText="View All"
              href="/minimal/collections"
            />
          </motion.div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: font,
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#050505',
                opacity: 0.3,
                marginBottom: '32px',
              }}
            >
              {items.length} {items.length === 1 ? 'piece' : 'pieces'} saved
            </motion.p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                maxWidth: '1000px',
              }}
              className="minimal-wishlist-grid"
            >
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <MinimalProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
