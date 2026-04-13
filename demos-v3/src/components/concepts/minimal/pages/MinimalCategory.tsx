'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductGrid } from '../MinimalProductGrid'
import { MatrixText } from '../ui'
import { categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface MinimalCategoryProps {
  category: ProductCategory
}

export function MinimalCategory({ category }: MinimalCategoryProps) {
  const products = getProductsByCategory(category)
  const label = categoryLabels[category]
  const description = categoryDescriptions[category]

  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 0' }}>
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <Link href="/minimal" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.4, textDecoration: 'none', fontFamily: font }}>
            Home
          </Link>
          <span style={{ margin: '0 8px', opacity: 0.2 }}>/</span>
          <Link href="/minimal/collections" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.4, textDecoration: 'none', fontFamily: font }}>
            Collections
          </Link>
          <span style={{ margin: '0 8px', opacity: 0.2 }}>/</span>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.6, fontFamily: font }}>
            {label}
          </span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '16px' }}
        >
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '12px',
          }}>
            <MatrixText text={label} className="text-[32px] font-extralight tracking-tight" />
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.5,
              maxWidth: '500px',
            }}>
              {description}
            </p>
            <span style={{
              fontFamily: font,
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#050505',
              opacity: 0.3,
              whiteSpace: 'nowrap',
            }}>
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section style={{ padding: '40px 5vw 120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MinimalProductGrid products={products} />
        </motion.div>
      </section>
    </MinimalLayout>
  )
}
