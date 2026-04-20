'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, Share2, Check } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { minimal } from '../design-system'
import { products, type Product } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import BlurUpImage from '../ui/BlurUpImage'
import SmoothAccordion, { type SmoothAccordionItem } from '../ui/SmoothAccordion'

const F = "'Inter', 'Helvetica Neue', sans-serif"
const M = "'SF Mono', 'Fira Code', monospace"
const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']

function ProductImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedImage = images[selectedIndex] ?? images[0]

  // Main PDP hero is a plain BlurUpImage. Users switch views via the
  // thumbnail row below. The earlier ImageReveal setup swapped to the
  // next gallery image on hover, which was disorienting (users hover
  // the hero to inspect detail, not to cycle through the gallery).
  // The "Hover to reveal" chip was removed for the same reason.
  //
  // This fix was first landed on PR #64 (commit aea9aea) but got
  // dropped during the PR #66 merge conflict resolution — restoring it
  // here.
  return (
    <div className="md:sticky md:top-24 md:self-start">
      <div style={{ width: '100%', aspectRatio: '4 / 5', border: '1px solid #E5E5E5', background: '#E5E5E5', position: 'relative' }}>
        <BlurUpImage
          src={selectedImage}
          alt={productName}
          containerStyle={{ width: '100%', height: '100%' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {images.map((image, index) => (
            <button
              key={`${productName}-thumb-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show image ${index + 1}`}
              style={{
                width: 76,
                height: 76,
                border: index === selectedIndex ? '1.5px solid #050505' : '1px solid #E5E5E5',
                background: '#FFFFFF',
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <BlurUpImage src={image} alt={`${productName} view ${index + 1}`} containerStyle={{ width: '100%', height: '100%' }} draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductMiniCard({ product }: { product: Product }) {
  return (
    <Link href={`/minimal/product/${product.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{ border: '1px solid #E5E5E5', background: '#FFFFFF' }}>
        <div style={{ aspectRatio: '3 / 4', background: '#E5E5E5' }}>
          <BlurUpImage src={product.images[0]} alt={product.name} containerStyle={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <p style={{ fontFamily: F, fontSize: 13, color: '#050505', margin: '10px 0 2px' }}>{product.name}</p>
      <p style={{ fontFamily: F, fontSize: 13, color: '#9B9B9B', margin: 0 }}>{product.priceDisplay}</p>
    </Link>
  )
}

function MinimalProductDetailContent({ product: productProp }: { product?: Product }) {
  const params = useParams()
  const slug = params?.slug as string
  const product = productProp || products.find((item) => item.slug === slug) || products[0]
  const addItem = useCartStore((state) => state.addItem)
  const prefersReducedMotion = useReducedMotionPreference()

  const [size, setSize] = useState('7')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [wish, setWish] = useState(false)
  const [shared, setShared] = useState(false)

  const handleAdd = () => {
    for (let index = 0; index < qty; index += 1) addItem(product, size)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1300)
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShared(true)
        window.setTimeout(() => setShared(false), 1600)
      }
    } catch {
      // user cancelled the share flow
    }
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)

  const accordionItems: SmoothAccordionItem[] = [
    { title: 'Description', content: product.description },
    {
      title: 'Specifications',
      content: product.diamondSpecs
        ? `${product.diamondSpecs.carat}ct ${product.diamondSpecs.shape} · ${product.diamondSpecs.cut} Cut · ${product.diamondSpecs.color} Color · ${product.diamondSpecs.clarity} Clarity · ${product.diamondSpecs.origin} · ${product.diamondSpecs.certification}`
        : 'Contact us for detailed specifications.',
    },
    {
      title: 'Shipping & Returns',
      content: 'Complimentary insured shipping on all orders. 30-day returns with full refund. Each piece arrives in our signature presentation box with certificate of authenticity.',
    },
    {
      title: 'Care Instructions',
      content: 'Store your piece in the provided jewelry box when not wearing. Clean gently with a soft lint-free cloth. Avoid contact with perfumes, lotions, and harsh chemicals. Professional cleaning recommended annually.',
    },
  ]

  return (
    <MinimalLayout>
      <div className={minimal.cn.container} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Home', href: '/minimal' },
            { label: 'Collections', href: '/minimal/collections' },
            { label: product.category.replace(/-/g, ' '), href: `/minimal/category/${product.category}` },
          ].map((crumb, index) => (
            <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link
                href={crumb.href}
                className="minimal-pdp-crumb"
                style={{
                  fontFamily: M,
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#9B9B9B',
                  textDecoration: 'none',
                }}
              >
                {crumb.label}
              </Link>
              {index < 2 && <span style={{ fontFamily: M, fontSize: 10, color: '#E5E5E5' }}>/</span>}
            </span>
          ))}
          <span
            style={{
              fontFamily: M,
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#050505',
              fontWeight: 500,
            }}
          >
            {product.name}
          </span>
        </div>
      </div>

      <div className={`${minimal.cn.container} grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20`} style={{ paddingBottom: 'clamp(64px, 10vh, 120px)' }}>
        <ProductImageGallery images={product.images} productName={product.name} />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B' }}>
              {product.category.replace(/-/g, ' ')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, background: '#050505', display: 'inline-block' }} />
              <span style={{ fontFamily: F, fontSize: 12, color: '#050505', fontWeight: 500 }}>In Stock</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: F,
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 200,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: '#050505',
              margin: '0 0 10px',
            }}
          >
            {product.name}
          </h1>

          {product.subtitle && <p style={{ fontFamily: F, fontSize: 15, fontWeight: 300, color: '#9B9B9B', margin: '0 0 20px' }}>{product.subtitle}</p>}

          <p style={{ fontFamily: F, fontSize: 'clamp(24px, 2.2vw, 34px)', fontWeight: 300, color: '#050505', margin: '0 0 28px', fontVariantNumeric: 'tabular-nums' }}>
            {product.priceDisplay}
          </p>

          <div style={{ height: 1, background: '#E5E5E5', marginBottom: 28 }} />

          <p style={{ fontFamily: F, fontSize: 15, fontWeight: 300, color: '#6B6B6B', lineHeight: 1.8, margin: '0 0 32px', maxWidth: 500 }}>
            {product.description}
          </p>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <p style={{ fontFamily: F, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#050505', fontWeight: 500, margin: 0 }}>
                Ring Size: <span style={{ color: '#9B9B9B', fontWeight: 400 }}>{size}</span>
              </p>
              <button type="button" style={{ fontFamily: F, fontSize: 12, color: '#6B6B6B', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Size Guide
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {sizes.map((currentSize) => (
                <button
                  key={currentSize}
                  type="button"
                  onClick={() => setSize(currentSize)}
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: F,
                    fontSize: 13,
                    fontWeight: size === currentSize ? 500 : 300,
                    backgroundColor: size === currentSize ? '#050505' : '#FFFFFF',
                    color: size === currentSize ? '#FFFFFF' : '#050505',
                    border: size === currentSize ? '1.5px solid #050505' : '1px solid #E5E5E5',
                    cursor: 'pointer',
                    transition: prefersReducedMotion ? 'none' : 'background-color 180ms ease, color 180ms ease, border-color 180ms ease',
                  }}
                >
                  {currentSize}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: F, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#050505', fontWeight: 500, marginBottom: 12 }}>
              Quantity
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E5E5E5', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', border: 'none', cursor: 'pointer', color: '#050505' }}
              >
                <Minus size={15} strokeWidth={1.5} />
              </button>
              <span style={{ width: 52, textAlign: 'center', fontFamily: F, fontSize: 15, fontWeight: 500, color: '#050505', borderLeft: '1px solid #E5E5E5', borderRight: '1px solid #E5E5E5', lineHeight: '48px' }}>{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', border: 'none', cursor: 'pointer', color: '#050505' }}
              >
                <Plus size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
            <button
              type="button"
              onClick={handleAdd}
              className="minimal-pdp-add-btn"
              style={{
                flex: 1,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontFamily: F,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                backgroundColor: '#050505',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                transition: prefersReducedMotion ? 'none' : 'opacity 180ms ease',
              }}
            >
              {added ? (
                <>
                  <Check size={16} strokeWidth={2} /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={16} strokeWidth={1.5} /> Add to Bag — {product.priceDisplay}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setWish(!wish)}
              className="minimal-pdp-icon-btn"
              style={{
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                cursor: 'pointer',
                color: '#050505',
              }}
              aria-label="Add to wishlist"
            >
              <Heart size={18} strokeWidth={1.5} fill={wish ? '#050505' : 'none'} color="#050505" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="minimal-pdp-icon-btn"
              style={{
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                cursor: 'pointer',
                color: '#050505',
              }}
              aria-label="Share"
            >
              {shared ? <Check size={18} strokeWidth={1.5} color="#050505" /> : <Share2 size={18} strokeWidth={1.5} color="#050505" />}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, padding: '20px 0', marginBottom: 28 }}>
            {[
              { icon: Truck, label: 'Free Shipping', sub: 'Insured delivery' },
              { icon: Shield, label: 'GIA Certified', sub: 'Authenticated' },
              { icon: RotateCcw, label: '30-Day Returns', sub: 'Full refund' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 8px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
                <Icon size={18} strokeWidth={1.5} color="#050505" />
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: '#050505', letterSpacing: '0.02em' }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: 10, color: '#9B9B9B' }}>{sub}</span>
              </div>
            ))}
          </div>

          <SmoothAccordion items={accordionItems} defaultOpenIndex={0} />
        </div>
      </div>

      {product.diamondSpecs && (
        <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(64px, 10vh, 120px) 0', borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5' }}>
          <div className={minimal.cn.container}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', display: 'block', marginBottom: 12 }}>Diamond Certification</span>
              <h2 style={{ fontFamily: F, fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 200, letterSpacing: '-0.03em', color: '#050505', margin: 0 }}>The 4Cs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 16 }}>
              {[
                { label: 'Carat', value: product.diamondSpecs.carat, desc: 'Weight' },
                { label: 'Cut', value: product.diamondSpecs.cut, desc: 'Brilliance' },
                { label: 'Color', value: product.diamondSpecs.color, desc: 'Grade' },
                { label: 'Clarity', value: product.diamondSpecs.clarity, desc: 'Purity' },
              ].map((spec) => (
                <div key={spec.label} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: 'clamp(24px, 3vw, 40px)', textAlign: 'center' }}>
                  <p style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B', margin: '0 0 14px' }}>{spec.label}</p>
                  <p style={{ fontFamily: F, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 200, color: '#050505', margin: '0 0 6px' }}>{spec.value}</p>
                  <p style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B', margin: 0 }}>{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: 'clamp(48px, 8vh, 80px) 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className={minimal.cn.container}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 40, alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', display: 'block', marginBottom: 12 }}>Styling</span>
              <h2 style={{ fontFamily: F, fontSize: 'clamp(24px, 2.5vw, 38px)', fontWeight: 200, letterSpacing: '-0.02em', color: '#050505', margin: '0 0 16px' }}>Complete the Look</h2>
              <p style={{ fontFamily: F, fontSize: 15, fontWeight: 300, color: '#6B6B6B', lineHeight: 1.8, margin: '0 0 28px', maxWidth: 420 }}>
                Pair this piece with complementary items from our collection for an effortlessly curated ensemble.
              </p>
              <Link
                href="/minimal/collections"
                style={{
                  fontFamily: F,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#050505',
                  textDecoration: 'none',
                  borderBottom: '1px solid #050505',
                  paddingBottom: 4,
                }}
              >
                Explore Collections
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {related.slice(0, 2).map((item) => (
                <ProductMiniCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: 'clamp(64px, 10vh, 120px) 0', background: '#FFFFFF' }}>
          <div className={minimal.cn.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
              <div>
                <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', display: 'block', marginBottom: 12 }}>You May Also Like</span>
                <h2 style={{ fontFamily: F, fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 200, letterSpacing: '-0.03em', color: '#050505', margin: 0 }}>Related Pieces</h2>
              </div>
              <Link
                href={`/minimal/category/${product.category}`}
                className="minimal-pdp-view-all"
                style={{
                  fontFamily: F,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#050505',
                  textDecoration: 'none',
                  border: '1px solid #050505',
                  padding: '10px 24px',
                  transition: prefersReducedMotion ? 'none' : 'background-color 180ms ease, color 180ms ease',
                }}
              >
                View All
              </Link>
            </div>
            <div className={minimal.cn.gridProduct}>
              {related.map((item) => (
                <ProductMiniCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .minimal-pdp-add-btn:hover {
          opacity: 0.92;
        }

        .minimal-pdp-icon-btn:hover {
          border-color: #050505 !important;
        }

        .minimal-pdp-crumb:hover {
          color: #050505 !important;
        }

        .minimal-pdp-view-all:hover {
          background: #050505 !important;
          color: #FFFFFF !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .minimal-pdp-add-btn,
          .minimal-pdp-icon-btn,
          .minimal-pdp-view-all {
            transition: none !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}

export function MinimalProductDetail({ product }: { product?: Product }) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FFFFFF' }} />}>
      <MinimalProductDetailContent product={product} />
    </Suspense>
  )
}
