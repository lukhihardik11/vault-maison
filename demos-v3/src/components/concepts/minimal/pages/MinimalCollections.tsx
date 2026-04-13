'use client'

import { motion } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { CardFlip } from '../ui'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

// Map each category to a representative image
const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/minimal-engagement-ring.jpg',
  'diamond-necklaces': '/images/minimal-necklace-pendant.jpg',
  'diamond-earrings': '/images/minimal-diamond-studs.jpg',
  'diamond-bracelets': '/images/minimal-tennis-bracelet.jpg',
  'gold-rings': '/images/minimal-ring-gold.jpg',
  'gold-necklaces': '/images/minimal-gold-chain.jpg',
  'gold-earrings': '/images/minimal-chandelier-earrings.jpg',
  'gold-bracelets': '/images/minimal-gold-bangles.jpg',
  'loose-diamonds': '/images/minimal-diamonds-loose.jpg',
  'wedding-bridal': '/images/minimal-wedding-rings.jpg',
}

// Short feature highlights per category
const categoryFeatures: Record<string, string[]> = {
  'diamond-rings': ['Solitaires', 'Halo settings', 'Eternity bands', 'Cocktail rings'],
  'diamond-necklaces': ['Pendants', 'Chokers', 'Chains', 'Layered designs'],
  'diamond-earrings': ['Studs', 'Drops', 'Hoops', 'Chandelier'],
  'diamond-bracelets': ['Tennis', 'Bangles', 'Cuffs', 'Chain link'],
  'gold-rings': ['Signet', 'Bands', 'Statement', 'Stackable'],
  'gold-necklaces': ['Curb chain', 'Layered', 'Pendant', 'Choker'],
  'gold-earrings': ['Hoops', 'Studs', 'Drops', 'Huggie'],
  'gold-bracelets': ['Bangles', 'Cuffs', 'Chain', 'Tennis'],
  'loose-diamonds': ['Round brilliant', 'Oval', 'Emerald', 'Pear'],
  'wedding-bridal': ['Engagement', 'Wedding bands', 'Bridal sets', 'Anniversary'],
}

export function MinimalCollections() {
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
            Collections
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Browse by Category
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            Ten curated categories spanning diamonds, gold, and bridal. Hover to explore what each collection offers.
          </p>
        </motion.div>
      </section>

      {/* Category Grid with CardFlip */}
      <section style={{ padding: '60px 5vw 120px' }}>
        <div
          className="minimal-collections-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
        >
          {allCategories.map((cat: ProductCategory, i: number) => {
            const count = getProductsByCategory(cat).length
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <CardFlip
                  title={categoryLabels[cat]}
                  subtitle={`${count} ${count === 1 ? 'piece' : 'pieces'}`}
                  description={categoryDescriptions[cat]}
                  features={categoryFeatures[cat] || []}
                  image={categoryImages[cat] || '/images/diamond-velvet-1.jpg'}
                  href={`/minimal/category/${cat}`}
                  count={count}
                />
              </motion.div>
            )
          })}
        </div>
      </section>

      <style>{`
        @media (min-width: 769px) {
          .minimal-collections-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1200px) {
          .minimal-collections-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
