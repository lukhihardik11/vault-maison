'use client'

import { useMemo, useRef, useState, Suspense } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Eye } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { minimal } from '../design-system'
import { products, type Product } from '@/data/products'
import { categoryLabels, type ProductCategory } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import TiltCard from '../ui/TiltCard'
import ImageReveal from '../ui/ImageReveal'
import QuickView from '../ui/QuickView'

const font = minimal.font.primary
const mono = minimal.font.mono

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
]

function CategoryProductTile({
  product,
  onQuickView,
}: {
  product: Product
  onQuickView: (product: Product) => void
}) {
  const prefersReducedMotion = useReducedMotionPreference()
  const hoverTimerRef = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const clearTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  const handleEnter = () => {
    setIsHovered(true)
    if (prefersReducedMotion) return
    hoverTimerRef.current = window.setTimeout(() => {
      onQuickView(product)
    }, 650)
  }

  const handleLeave = () => {
    setIsHovered(false)
    clearTimer()
  }

  return (
    <TiltCard maxTilt={2.5} lift={2}>
      <article onPointerEnter={handleEnter} onPointerLeave={handleLeave}>
        <div style={{ position: 'relative', border: '1px solid #E5E5E5', aspectRatio: '3 / 4', marginBottom: 12 }}>
          <Link href={`/minimal/product/${product.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
            <ImageReveal
              src={product.images[0]}
              revealSrc={product.images[1]}
              alt={product.name}
              containerStyle={{ width: '100%', height: '100%', background: '#E5E5E5' }}
            />
          </Link>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onQuickView(product)
            }}
            className="minimal-category-quick-view"
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 10,
              height: 40,
              border: 'none',
              background: '#050505',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontFamily: font,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              opacity: isHovered || prefersReducedMotion ? 1 : 0,
              transform: isHovered || prefersReducedMotion ? 'translateY(0px)' : 'translateY(6px)',
              transition: prefersReducedMotion ? 'none' : 'opacity 180ms ease, transform 180ms ease',
            }}
          >
            <Eye size={14} />
            Quick View
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span
            style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#9B9B9B',
            }}
          >
            {product.category.replace(/-/g, ' ')}
          </span>
          <Link
            href={`/minimal/product/${product.slug}`}
            style={{
              fontFamily: font,
              fontSize: 14,
              color: '#050505',
              textDecoration: 'none',
            }}
          >
            {product.name}
          </Link>
          <p style={{ fontFamily: font, fontSize: 14, fontWeight: 400, color: '#050505', margin: 0 }}>{product.priceDisplay}</p>
        </div>
      </article>
    </TiltCard>
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
    // Hyphen-aware matching. Slugs in the data are compound like
    // "diamond-rings" / "gold-earrings" / "wedding-bridal". The nav
    // sometimes links with a short slug like "rings" and we want that
    // to match BOTH "diamond-rings" and "gold-rings" — but NOT
    // "earrings" (substring `.includes("rings")` is a false positive).
    //
    // A category matches when the slug is either the exact category
    // or a trailing/leading hyphen-delimited segment of it.
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
      <div style={{ padding: 'clamp(48px, 8vh, 96px) 0 clamp(32px, 4vh, 48px)' }}>
        <div className={minimal.cn.container}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}>
            <Link
              href="/minimal"
              className="minimal-category-crumb"
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
            <span style={{ fontFamily: mono, fontSize: 10, color: '#9B9B9B' }}>/</span>
            <Link
              href="/minimal/collections"
              className="minimal-category-crumb"
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                textDecoration: 'none',
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
              fontWeight: 200,
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
                  color: sort === option.value ? '#050505' : '#6B6B6B',
                  fontWeight: sort === option.value ? 500 : 400,
                  borderBottom: sort === option.value ? '1px solid #050505' : '1px solid transparent',
                }}
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
                <button onClick={() => setShowCount((count) => count + 12)} className={minimal.cn.btnSecondary}>
                  Load More
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
                fontWeight: 300,
                color: '#9B9B9B',
              }}
            >
              No pieces found in this collection.
            </p>
            <Link href="/minimal/collections" className={`${minimal.cn.btnPrimary} no-underline mt-8 inline-flex`}>
              Browse Collections
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
        .minimal-category-crumb:hover {
          color: #050505 !important;
        }

        @media (max-width: 768px) {
          .minimal-category-quick-view {
            opacity: 1 !important;
            transform: translateY(0px) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .minimal-category-quick-view {
            transition: none !important;
          }
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
