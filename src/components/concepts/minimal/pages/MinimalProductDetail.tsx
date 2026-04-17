'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronDown } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { minimal } from '../design-system'
import { products, type Product } from '@/data/products'
import { useCartStore } from '@/store/cart'

const font = minimal.font.primary
const mono = minimal.font.mono
const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']

/* ─── Image Gallery — DOM event listeners via useEffect ─── */
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
      mainImg.style.transform = 'scale(2.5)'
    }
    const handleMouseLeave = () => {
      isZoomed = false
      mainImg.style.transform = 'scale(1)'
      mainImg.style.transition = 'transform 0.3s ease'
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
        el.style.border = i === index ? '2px solid #050505' : '1px solid #E8E8E8'
        el.style.opacity = i === index ? '1' : '0.5'
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
    <div className="md:sticky md:top-20 md:self-start">
      {/* Main Image */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          cursor: 'crosshair',
          backgroundColor: '#FAFAFA',
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
            transition: 'transform 0.3s ease',
          }}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div ref={thumbsRef} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {images.map((imgSrc, i) => (
            <div
              key={`thumb-${i}`}
              data-thumb-index={i}
              role="button"
              tabIndex={0}
              style={{
                width: '72px',
                height: '72px',
                overflow: 'hidden',
                border: i === 0 ? '2px solid #050505' : '1px solid #E8E8E8',
                opacity: i === 0 ? 1 : 0.5,
                backgroundColor: '#FAFAFA',
                cursor: 'pointer',
                flexShrink: 0,
                padding: 0,
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

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
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
    { title: 'Shipping & Returns', content: 'Complimentary insured shipping on all orders. 30-day returns with full refund. Each piece arrives in our signature presentation box.' },
  ]

  return (
    <MinimalLayout>
      {/* Breadcrumb */}
      <div className={minimal.cn.container} style={{ paddingTop: '24px', paddingBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/minimal" style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8A8A', textDecoration: 'none' }} className="hover:!text-[#050505]">Home</Link>
          <span style={{ fontFamily: mono, fontSize: '10px', color: '#ABABAB' }}>/</span>
          <Link href="/minimal/collections" style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8A8A', textDecoration: 'none' }} className="hover:!text-[#050505]">Collections</Link>
          <span style={{ fontFamily: mono, fontSize: '10px', color: '#ABABAB' }}>/</span>
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`${minimal.cn.container} grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16`} style={{ paddingBottom: 'clamp(64px, 10vh, 120px)' }}>

        {/* LEFT: Image Gallery */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* RIGHT: Product Info */}
        <div style={{ paddingTop: '0' }}>
          {/* Category */}
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A', display: 'block', marginBottom: '12px' }}>
            {product.category.replace(/-/g, ' ')}
          </span>

          {/* Title */}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#050505', margin: '0 0 8px' }}>
            {product.name}
          </h1>

          {/* Subtitle */}
          {product.subtitle && (
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#8A8A8A', margin: '0 0 24px' }}>
              {product.subtitle}
            </p>
          )}

          {/* Price */}
          <p style={{ fontFamily: font, fontSize: 'clamp(22px, 2vw, 30px)', fontWeight: 200, color: '#050505', fontVariantNumeric: 'tabular-nums', margin: '0 0 32px' }}>
            {product.priceDisplay}
          </p>

          {/* Description */}
          <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#555555', lineHeight: 1.8, margin: '0 0 32px', maxWidth: '480px' }}>
            {product.description}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', fontWeight: 500, marginBottom: '12px' }}>
              Size: <span style={{ color: '#8A8A8A', fontWeight: 400 }}>{size}</span>
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: font,
                    fontSize: '13px',
                    fontWeight: size === s ? 500 : 300,
                    backgroundColor: size === s ? '#050505' : 'transparent',
                    color: size === s ? '#FFFFFF' : '#050505',
                    border: size === s ? '1px solid #050505' : '1px solid #E8E8E8',
                    cursor: 'pointer',
                    borderRadius: 0,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', fontWeight: 500, marginBottom: '12px' }}>
              Quantity
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E8E8E8' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#050505' }}>
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span style={{ width: '48px', textAlign: 'center', fontFamily: font, fontSize: '14px', fontWeight: 400, fontVariantNumeric: 'tabular-nums', color: '#050505' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#050505' }}>
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Add to Bag + Wishlist */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            <button
              onClick={handleAdd}
              style={{
                flex: 1,
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontFamily: font,
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                backgroundColor: '#050505',
                color: '#FFFFFF',
                border: '1px solid #050505',
                cursor: 'pointer',
              }}
              className="vm-btn-primary"
            >
              {added ? (
                <span>Added to Bag</span>
              ) : (
                <>
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Add to Bag — {product.priceDisplay}
                </>
              )}
            </button>
            <button
              onClick={() => setWish(!wish)}
              style={{
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                border: '1px solid #E8E8E8',
                cursor: 'pointer',
              }}
              aria-label="Add to wishlist"
            >
              <Heart size={18} strokeWidth={1.5} fill={wish ? '#050505' : 'none'} color="#050505" />
            </button>
          </div>

          {/* Trust Bar */}
          <div style={{ display: 'flex', gap: '24px', padding: '20px 0', borderTop: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8', marginBottom: '24px' }}>
            {[
              { icon: Truck, label: 'Free Shipping' },
              { icon: Shield, label: 'GIA Certified' },
              { icon: RotateCcw, label: '30-Day Returns' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={14} strokeWidth={1.5} color="#8A8A8A" />
                <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', color: '#8A8A8A' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div>
            {accItems.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #E8E8E8' }}>
                <button
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
                  <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: accordion === i ? '#050505' : '#8A8A8A' }}>
                    {item.title}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    color="#8A8A8A"
                    style={{
                      transform: accordion === i ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 300ms ease',
                    }}
                  />
                </button>
                <div style={{ maxHeight: accordion === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 300ms ease' }}>
                  <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#555555', lineHeight: 1.8, paddingBottom: '20px', margin: 0 }}>
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
            <div style={{ marginBottom: '48px' }}>
              <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A', display: 'block', marginBottom: '12px' }}>Specifications</span>
              <h2 style={{ fontFamily: font, fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 200, letterSpacing: '-0.03em', color: '#050505', margin: 0 }}>The 4Cs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: '#E8E8E8' }}>
              {[
                { label: 'Carat', value: product.diamondSpecs.carat },
                { label: 'Cut', value: product.diamondSpecs.cut },
                { label: 'Color', value: product.diamondSpecs.color },
                { label: 'Clarity', value: product.diamondSpecs.clarity },
              ].map((spec) => (
                <div key={spec.label} style={{ backgroundColor: '#FAFAFA', padding: 'clamp(24px, 3vw, 40px)', textAlign: 'center' }}>
                  <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A', margin: '0 0 12px' }}>{spec.label}</p>
                  <p style={{ fontFamily: font, fontSize: 'clamp(24px, 2.5vw, 40px)', fontWeight: 100, color: '#050505', fontVariantNumeric: 'tabular-nums', margin: 0 }}>{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: 'clamp(64px, 10vh, 120px) 0' }}>
          <div className={minimal.cn.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
              <div>
                <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A', display: 'block', marginBottom: '12px' }}>You May Also Like</span>
                <h2 style={{ fontFamily: font, fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 200, letterSpacing: '-0.03em', color: '#050505', margin: 0 }}>Related Pieces</h2>
              </div>
              <Link href={`/minimal/category/${product.category}`} className={`${minimal.cn.btnGhost} no-underline`}>View All</Link>
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
        .vm-btn-primary:hover {
          background-color: #FFFFFF !important;
          color: #050505 !important;
        }
      `}</style>
    </MinimalLayout>
  )
}
