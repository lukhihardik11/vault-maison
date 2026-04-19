'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronDown, Share2, Check } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { minimal } from '../design-system'
import { products, type Product } from '@/data/products'
import { useCartStore } from '@/store/cart'

const F = "'Inter', 'Helvetica Neue', sans-serif"
const M = "'SF Mono', 'Fira Code', monospace"
const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']

/* ─── Image Gallery — native DOM events for hydration safety ─── */
function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainImgRef = useRef<HTMLImageElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const mainImg = mainImgRef.current
    const thumbsContainer = thumbsRef.current
    if (!container || !mainImg || !thumbsContainer) return

    let isZoomed = false

    const handleMouseEnter = () => {
      isZoomed = true
      mainImg.style.transform = 'scale(2)'
    }
    const handleMouseLeave = () => {
      isZoomed = false
      mainImg.style.transform = 'scale(1)'
      mainImg.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (!isZoomed) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      mainImg.style.transformOrigin = `${x}% ${y}%`
      mainImg.style.transition = 'none'
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mousemove', handleMouseMove)

    const thumbButtons = thumbsContainer.querySelectorAll('[data-thumb-index]')
    const updateSelection = (index: number) => {
      selectedRef.current = index
      mainImg.src = images[index]
      mainImg.alt = `${productName} view ${index + 1}`
      thumbButtons.forEach((btn, i) => {
        const el = btn as HTMLElement
        el.style.border = i === index ? '2px solid #050505' : '1.5px solid #E5E5E5'
        el.style.opacity = i === index ? '1' : '0.6'
        el.style.transform = i === index ? 'scale(1.05)' : 'scale(1)'
      })
    }

    const clickHandlers: Array<(e: Event) => void> = []
    thumbButtons.forEach((btn, i) => {
      const handler = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        updateSelection(i)
      }
      clickHandlers.push(handler)
      btn.addEventListener('click', handler)
    })

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mousemove', handleMouseMove)
      thumbButtons.forEach((btn, i) => {
        btn.removeEventListener('click', clickHandlers[i])
      })
    }
  }, [images, productName])

  return (
    <div className="md:sticky md:top-24 md:self-start">
      {/* Main Image */}
      <div
        ref={containerRef}
        className="product-image"
        data-cursor="view"
        style={{
          width: '100%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          cursor: 'crosshair',
          backgroundColor: '#F7F7F7',
          position: 'relative',
        }}
      >
        <img
          ref={mainImgRef}
          src={images[0]}
          alt={`${productName} view 1`}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
            transform: 'scale(1)',
            transformOrigin: '50% 50%',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {/* Zoom hint */}
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          padding: '6px 14px',
          fontFamily: F, fontSize: 11, color: '#6B6B6B', letterSpacing: '0.02em',
          pointerEvents: 'none',
        }}>
          Hover to zoom
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div ref={thumbsRef} style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {images.map((imgSrc, i) => (
            <div
              key={`thumb-${i}`}
              data-thumb-index={i}
              role="button"
              tabIndex={0}
              style={{
                width: 76,
                height: 76,
                overflow: 'hidden',
                border: i === 0 ? '2px solid #050505' : '1.5px solid #E5E5E5',
                opacity: i === 0 ? 1 : 0.6,
                backgroundColor: '#F7F7F7',
                cursor: 'pointer',
                flexShrink: 0,
                padding: 0,
                transition: 'all 0.25s ease',
                transform: i === 0 ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <img
                src={imgSrc}
                alt={`${productName} view ${i + 1}`}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Product Detail Page ─── */
export function MinimalProductDetail({ product: productProp }: { product?: Product }) {
  const params = useParams()
  const slug = params?.slug as string
  const product = productProp || products.find((p) => p.slug === slug) || products[0]
  const addItem = useCartStore((s) => s.addItem)

  const [size, setSize] = useState('7')
  const [qty, setQty] = useState(1)
  const [accordion, setAccordion] = useState(0)
  const [added, setAdded] = useState(false)
  const [wish, setWish] = useState(false)
  const [shared, setShared] = useState(false)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch { /* user cancelled */ }
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const accItems = [
    { title: 'Description', content: product.description },
    {
      title: 'Specifications',
      content: product.diamondSpecs
        ? `${product.diamondSpecs.carat}ct ${product.diamondSpecs.shape} · ${product.diamondSpecs.cut} Cut · ${product.diamondSpecs.color} Color · ${product.diamondSpecs.clarity} Clarity · ${product.diamondSpecs.origin} · ${product.diamondSpecs.certification}`
        : 'Contact us for detailed specifications.',
    },
    { title: 'Shipping & Returns', content: 'Complimentary insured shipping on all orders. 30-day returns with full refund. Each piece arrives in our signature presentation box with certificate of authenticity.' },
    { title: 'Care Instructions', content: 'Store your piece in the provided jewelry box when not wearing. Clean gently with a soft lint-free cloth. Avoid contact with perfumes, lotions, and harsh chemicals. Professional cleaning recommended annually.' },
  ]

  return (
    <MinimalLayout>
      {/* Breadcrumb */}
      <div className={minimal.cn.container} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[
            { label: 'Home', href: '/minimal' },
            { label: 'Collections', href: '/minimal/collections' },
            { label: product.category.replace(/-/g, ' '), href: `/minimal/category/${product.category}` },
          ].map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link href={crumb.href} className="pdp-crumb" style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9B9B', textDecoration: 'none' }}>
                {crumb.label}
              </Link>
              <span style={{ fontFamily: M, fontSize: 10, color: '#E5E5E5' }}>/</span>
            </span>
          ))}
          <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#050505', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`${minimal.cn.container} grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20`} style={{ paddingBottom: 'clamp(64px, 10vh, 120px)' }}>

        {/* LEFT: Image Gallery */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* RIGHT: Product Info */}
        <div style={{ paddingTop: 0 }}>
          {/* Category + Stock */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B' }}>
              {product.category.replace(/-/g, ' ')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, background: '#050505', display: 'inline-block' }} />
              <span style={{ fontFamily: F, fontSize: 12, color: '#050505', fontWeight: 500 }}>In Stock</span>
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: F, fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 200, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#050505', margin: '0 0 10px' }}>
            {product.name}
          </h1>

          {/* Subtitle */}
          {product.subtitle && (
            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 300, color: '#9B9B9B', margin: '0 0 20px' }}>
              {product.subtitle}
            </p>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 28 }}>
            <p style={{ fontFamily: F, fontSize: 'clamp(24px, 2.2vw, 34px)', fontWeight: 300, color: '#050505', fontVariantNumeric: 'tabular-nums', margin: 0 }}>
              {product.priceDisplay}
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#E5E5E5', marginBottom: 28 }} />

          {/* Description */}
          <p style={{ fontFamily: F, fontSize: 15, fontWeight: 300, color: '#6B6B6B', lineHeight: 1.8, margin: '0 0 32px', maxWidth: 500 }}>
            {product.description}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <p style={{ fontFamily: F, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#050505', fontWeight: 500, margin: 0 }}>
                Ring Size: <span style={{ color: '#9B9B9B', fontWeight: 400 }}>{size}</span>
              </p>
              <button type="button" style={{ fontFamily: F, fontSize: 12, color: '#9B9B9B', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Size Guide
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: F,
                    fontSize: 13,
                    fontWeight: size === s ? 500 : 300,
                    backgroundColor: size === s ? '#050505' : '#FFF',
                    color: size === s ? '#FFF' : '#050505',
                    border: size === s ? '1.5px solid #050505' : '1.5px solid #E5E5E5',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: F, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#050505', fontWeight: 500, marginBottom: 12 }}>
              Quantity
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #E5E5E5', overflow: 'hidden' }}>
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', border: 'none', cursor: 'pointer', color: '#050505', transition: 'background 0.2s' }}>
                <Minus size={15} strokeWidth={1.5} />
              </button>
              <span style={{ width: 52, textAlign: 'center', fontFamily: F, fontSize: 15, fontWeight: 500, fontVariantNumeric: 'tabular-nums', color: '#050505', borderLeft: '1.5px solid #E5E5E5', borderRight: '1.5px solid #E5E5E5', lineHeight: '48px' }}>{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', border: 'none', cursor: 'pointer', color: '#050505', transition: 'background 0.2s' }}>
                <Plus size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Add to Bag + Wishlist + Share */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
            <button
              type="button"
              onClick={handleAdd}
              className="pdp-add-btn"
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
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {added ? (
                <><Check size={16} strokeWidth={2} /> Added to Bag</>
              ) : (
                <><ShoppingBag size={16} strokeWidth={1.5} /> Add to Bag — {product.priceDisplay}</>
              )}
            </button>
            <button
              type="button"
              onClick={() => setWish(!wish)}
              className="pdp-icon-btn"
              style={{
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFF',
                border: '1.5px solid #E5E5E5',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Add to wishlist"
            >
              <Heart size={18} strokeWidth={1.5} fill={wish ? '#050505' : 'none'} color="#050505" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="pdp-icon-btn"
              style={{
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFF',
                border: '1.5px solid #E5E5E5',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Share"
            >
              {shared ? <Check size={18} strokeWidth={1.5} color="#050505" /> : <Share2 size={18} strokeWidth={1.5} color="#050505" />}
            </button>
          </div>

          {/* Trust Bar */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
            padding: '20px 0', marginBottom: 28,
          }}>
            {[
              { icon: Truck, label: 'Free Shipping', sub: 'Insured delivery' },
              { icon: Shield, label: 'GIA Certified', sub: 'Authenticated' },
              { icon: RotateCcw, label: '30-Day Returns', sub: 'Full refund' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 6, padding: '16px 8px', background: '#FAFAFA',
              }}>
                <Icon size={18} strokeWidth={1.5} color="#050505" />
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: '#050505', letterSpacing: '0.02em' }}>{label}</span>
                <span style={{ fontFamily: F, fontSize: 10, color: '#9B9B9B' }}>{sub}</span>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div style={{ borderTop: '1px solid #E5E5E5' }}>
            {accItems.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                <button
                  type="button"
                  onClick={() => setAccordion(accordion === i ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: F, fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: accordion === i ? '#050505' : '#9B9B9B', transition: 'color 0.2s' }}>
                    {item.title}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    color="#9B9B9B"
                    style={{
                      transform: accordion === i ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 300ms ease',
                    }}
                  />
                </button>
                <div style={{ maxHeight: accordion === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 300ms ease' }}>
                  <p style={{ fontFamily: F, fontSize: 14, fontWeight: 300, color: '#6B6B6B', lineHeight: 1.85, paddingBottom: 20, margin: 0 }}>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4Cs Specs */}
      {product.diamondSpecs && (
        <section style={{ backgroundColor: '#FAFAFA', padding: 'clamp(64px, 10vh, 120px) 0' }}>
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
                <div key={spec.label} style={{
                  backgroundColor: '#FFF', padding: 'clamp(24px, 3vw, 40px)',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}>
                  <p style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B', margin: '0 0 14px' }}>{spec.label}</p>
                  <p style={{ fontFamily: F, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 100, color: '#050505', fontVariantNumeric: 'tabular-nums', margin: '0 0 6px' }}>{spec.value}</p>
                  <p style={{ fontFamily: F, fontSize: 11, color: '#9B9B9B', margin: 0 }}>{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Complete the Look */}
      <section style={{ padding: 'clamp(48px, 8vh, 80px) 0', borderTop: '1px solid #E5E5E5' }}>
        <div className={minimal.cn.container}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 40, alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', display: 'block', marginBottom: 12 }}>Styling</span>
              <h2 style={{ fontFamily: F, fontSize: 'clamp(24px, 2.5vw, 38px)', fontWeight: 200, letterSpacing: '-0.02em', color: '#050505', margin: '0 0 16px' }}>Complete the Look</h2>
              <p style={{ fontFamily: F, fontSize: 15, fontWeight: 300, color: '#6B6B6B', lineHeight: 1.8, margin: '0 0 28px', maxWidth: 420 }}>
                Pair this piece with complementary items from our collection for an effortlessly curated ensemble.
              </p>
              <Link href="/minimal/collections" style={{
                fontFamily: F, fontSize: 12, fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#050505', textDecoration: 'none',
                borderBottom: '1.5px solid #050505', paddingBottom: 4,
              }}>
                Explore Collections
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {related.slice(0, 2).map((p) => (
                <Link key={p.id} href={`/minimal/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ overflow: 'hidden', background: '#F7F7F7', aspectRatio: '3/4' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p style={{ fontFamily: F, fontSize: 13, fontWeight: 400, color: '#050505', margin: '10px 0 2px' }}>{p.name}</p>
                  <p style={{ fontFamily: F, fontSize: 13, fontWeight: 300, color: '#9B9B9B', margin: 0 }}>{p.priceDisplay}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: 'clamp(64px, 10vh, 120px) 0', background: '#FAFAFA' }}>
          <div className={minimal.cn.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
              <div>
                <span style={{ fontFamily: M, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', display: 'block', marginBottom: 12 }}>You May Also Like</span>
                <h2 style={{ fontFamily: F, fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 200, letterSpacing: '-0.03em', color: '#050505', margin: 0 }}>Related Pieces</h2>
              </div>
              <Link href={`/minimal/category/${product.category}`} style={{
                fontFamily: F, fontSize: 12, fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#050505', textDecoration: 'none',
                border: '1.5px solid #050505', padding: '10px 24px',
                transition: 'all 0.2s',
              }} className="pdp-view-all">
                View All
              </Link>
            </div>
            <div className={minimal.cn.gridProduct}>
              {related.map((p) => (
                <div key={p.id}>
                  <MinimalProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .pdp-add-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .pdp-icon-btn:hover {
          border-color: #050505 !important;
          transform: translateY(-1px);
        }
        .pdp-crumb:hover { color: #050505 !important; }
        .pdp-view-all:hover {
          background: #050505 !important;
          color: #FFF !important;
        }
      `}</style>
    </MinimalLayout>
  )
}
