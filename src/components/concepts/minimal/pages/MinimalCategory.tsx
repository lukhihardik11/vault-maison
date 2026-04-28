'use client'

import { useMemo, useState, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MinimalLayout } from '../MinimalLayout'
import { minimal } from '../design-system'
import { products, type Product } from '@/data/products'
import { categoryLabels, type ProductCategory } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import BlurUpImage from '../ui/BlurUpImage'
import QuickView from '../ui/QuickView'

const font = minimal.font.primary
const mono = minimal.font.mono

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
]

/**
 * CategoryProductTile — Tier 2 pattern (Acne Studios / The Row)
 *
 * Image swap on hover (not zoom). Product name + price only.
 * No badges, no ratings, no promotional elements.
 * Hover states use opacity reduction, not color change.
 */
function CategoryProductTile({
  product,
  onQuickView,
}: {
  product: Product
  onQuickView: (product: Product) => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Use second image for hover swap if available, otherwise stay on first
  const primaryImage = product.images[0]
  const hoverImage = product.images.length > 1 ? product.images[1] : product.images[0]
  const currentImage = isHovered ? hoverImage : primaryImage

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container — no border, no shadow, just image */}
      <div style={{ position: 'relative', aspectRatio: '3 / 4', marginBottom: 16, overflow: 'hidden' }}>
        <Link
          href={`/minimal/product/${product.slug}`}
          style={{ display: 'block', height: '100%', textDecoration: 'none' }}
        >
          {/* Primary image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isHovered ? 0 : 1,
              transition: 'opacity 0.4s ease',
            }}
          >
            <BlurUpImage
              src={primaryImage}
              alt={product.name}
              containerStyle={{ width: '100%', height: '100%', background: '#F5F5F5' }}
            />
          </div>

          {/* Hover image (swap) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            <BlurUpImage
              src={hoverImage}
              alt={`${product.name} — alternate view`}
              containerStyle={{ width: '100%', height: '100%', background: '#F5F5F5' }}
            />
          </div>
        </Link>

        {/* Quick View — appears on hover, subtle */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onQuickView(product)
          }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 40,
            border: 'none',
            background: 'rgba(5, 5, 5, 0.9)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontFamily: font,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            padding: 0,
          }}
        >
          Quick View
        </button>
      </div>

      {/* Product info — name + price only (The Row pattern) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Link
          href={`/minimal/product/${product.slug}`}
          className="tier2-product-link"
          style={{
            fontFamily: font,
            fontSize: 14,
            fontWeight: 400,
            color: '#050505',
            textDecoration: 'none',
            lineHeight: 1.4,
            transition: 'opacity 0.2s ease',
          }}
        >
          {product.name}
        </Link>
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            fontWeight: 400,
            color: '#050505',
            margin: 0,
          }}
        >
          {product.priceDisplay}
        </p>
      </div>
    </article>
  )
}

function MinimalCategoryContent({ category }: { category?: string }) {
  const params = useParams()
  const addItem = useCartStore((state) => state.addItem)
  const slug = category || (params?.category as string)
  const catName = (slug && categoryLabels[slug as ProductCategory])
    ? categoryLabels[slug as ProductCategory]
    : slug?.replace(/-/g, ' ').replace(/\b\w/g, (value) => value.toUpperCase()) || 'All'

  const [sort, setSort] = useState('newest')
  const [showCount, setShowCount] = useState(12)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    const matches = (category: string, s: string) =>
      category === s ||
      category.endsWith(`-${s}`) ||
      category.startsWith(`${s}-`) ||
      category.split('-').includes(s)

    let items = slug ? products.filter((product) => matches(product.category, slug)) : products
    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    else if (sort === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [slug, sort])

  const visible = filtered.slice(0, showCount)
  const hasMore = showCount < filtered.length

  return (
    <MinimalLayout>
      {/* Header */}
      <div style={{ padding: 'clamp(48px, 8vh, 96px) 0 clamp(32px, 4vh, 48px)' }}>
        <div className={minimal.cn.container}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}>
            <Link
              href="/minimal"
              className="tier2-crumb"
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
            >
              Home
            </Link>
            <span style={{ fontFamily: mono, fontSize: 10, color: '#9B9B9B' }}>/</span>
            <Link
              href="/minimal/collections"
              className="tier2-crumb"
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
            >
              Collections
            </Link>
            <span style={{ fontFamily: mono, fontSize: 10, color: '#9B9B9B' }}>/</span>
            <span
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#050505',
                fontWeight: 500,
              }}
            >
              {catName}
            </span>
          </div>

          <h1
            style={{
              fontFamily: font,
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#050505',
              margin: 0,
            }}
          >
            {catName}
          </h1>
          <p
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#9B9B9B',
              marginTop: 12,
            }}
          >
            {filtered.length} {filtered.length === 1 ? 'Piece' : 'Pieces'}
          </p>
        </div>
      </div>

      {/* Sort bar */}
      <div className={minimal.cn.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #E5E5E5',
            borderBottom: '1px solid #E5E5E5',
            padding: '16px 0',
            marginBottom: 'clamp(32px, 4vh, 48px)',
          }}
        >
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSort(option.value)}
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  color: sort === option.value ? '#050505' : '#9B9B9B',
                  fontWeight: sort === option.value ? 500 : 400,
                  borderBottom: sort === option.value ? '1px solid #050505' : '1px solid transparent',
                  transition: 'opacity 0.2s ease',
                }}
                className="tier2-sort-btn"
              >
                {option.label}
              </button>
            ))}
          </div>
          <span
            style={{
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '0.2em',
              color: '#9B9B9B',
            }}
          >
            {filtered.length} Results
          </span>
        </div>
      </div>

      {/* Product grid */}
      <div className={minimal.cn.container} style={{ paddingBottom: 'clamp(64px, 10vh, 120px)' }}>
        {visible.length > 0 ? (
          <>
            <div className={minimal.cn.gridProduct}>
              {visible.map((product) => (
                <CategoryProductTile
                  key={product.id}
                  product={product}
                  onQuickView={(nextProduct) => setQuickViewProduct(nextProduct)}
                />
              ))}
            </div>
            {hasMore && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}>
                <button
                  onClick={() => setShowCount((count) => count + 12)}
                  className="tier2-load-more"
                  style={{
                    fontFamily: font,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    border: '1px solid #050505',
                    color: '#050505',
                    padding: '14px 48px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                >
                  Discover More
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <p
              style={{
                fontFamily: font,
                fontSize: 18,
                fontWeight: 400,
                color: '#9B9B9B',
              }}
            >
              No pieces found in this collection.
            </p>
            <Link
              href="/minimal/collections"
              className="tier2-load-more"
              style={{
                display: 'inline-block',
                fontFamily: font,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '1px solid #050505',
                color: '#050505',
                padding: '14px 48px',
                textDecoration: 'none',
                marginTop: 32,
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              Explore Collections
            </Link>
          </div>
        )}
      </div>

      <QuickView
        open={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, size, quantity) => {
          for (let count = 0; count < quantity; count += 1) {
            addItem(product, size)
          }
        }}
      />

      <style>{`
        .tier2-crumb:hover { opacity: 0.5; }
        .tier2-product-link:hover { opacity: 0.6; }
        .tier2-sort-btn:hover { opacity: 0.6; }
        .tier2-load-more:hover {
          background: #050505 !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </MinimalLayout>
  )
}

export function MinimalCategory({ category }: { category?: string }) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FFFFFF' }} />}>
      <MinimalCategoryContent category={category} />
    </Suspense>
  )
}
