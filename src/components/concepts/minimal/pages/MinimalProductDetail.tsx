'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronDown } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { minimal } from '../design-system'
import { products, type Product } from '@/data/products'
import { useCartStore } from '@/store/cart'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']

/* ─── Standalone Image Gallery using useRef + useEffect for DOM events ─── */
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

    // --- Zoom handlers ---
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

    // --- Thumbnail click handlers ---
    const thumbButtons = thumbsContainer.querySelectorAll('[data-thumb-index]')
    const updateSelection = (index: number) => {
      selectedRef.current = index
      mainImg.src = images[index]
      mainImg.alt = `${productName} view ${index + 1}`
      // Update thumbnail styles
      thumbButtons.forEach((btn, i) => {
        const el = btn as HTMLElement
        if (i === index) {
          el.style.border = '2px solid #050505'
          el.style.opacity = '1'
        } else {
          el.style.border = '1px solid #E5E5E5'
          el.style.opacity = '0.6'
        }
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
      {/* Main Image with Zoom */}
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
                border: i === 0 ? '2px solid #050505' : '1px solid #E5E5E5',
                opacity: i === 0 ? 1 : 0.6,
                backgroundColor: '#FAFAFA',
                cursor: 'pointer',
                transition: 'border 0.2s, opacity 0.2s',
                flexShrink: 0,
                padding: 0,
                margin: 0,
                borderRadius: 0,
                display: 'block',
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
    { title: 'Specifications', content: product.diamondSpecs ? `${product.diamondSpecs.carat}ct ${product.diamondSpecs.shape} · ${product.diamondSpecs.cut} Cut · ${product.diamondSpecs.color} Color · ${product.diamondSpecs.clarity} Clarity · ${product.diamondSpecs.origin} · ${product.diamondSpecs.certification}` : 'Contact us for detailed specifications.' },
    { title: 'Shipping & Returns', content: 'Complimentary insured shipping on all orders. 30-day returns with full refund. Each piece arrives in our signature presentation box.' },
  ]

  return (
    <MinimalLayout>
      {/* Breadcrumb */}
      <div className={minimal.cn.container} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="flex items-center gap-2">
          <Link href="/minimal" className={`${minimal.cn.label} no-underline hover:text-[#050505] transition-colors`}>Home</Link>
          <span className={minimal.cn.label}>/</span>
          <Link href="/minimal/collections" className={`${minimal.cn.label} no-underline hover:text-[#050505] transition-colors`}>Collections</Link>
          <span className={minimal.cn.label}>/</span>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#050505]">{product.name}</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`${minimal.cn.container} pb-20 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16`}>

        {/* ═══ LEFT: Image Gallery (useRef + useEffect DOM events) ═══ */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* ═══ RIGHT: Product Info ═══ */}
        <div className="pt-8 md:pt-0">
          {/* Title & Price */}
          <div>
            <span className={minimal.cn.label}>{product.category.replace(/-/g, ' ')}</span>
            <h1 className={`${minimal.cn.subsectionHead} mt-2 mb-2`}>{product.name}</h1>
            <p className="text-sm text-[#6B6B6B] mb-6">{product.subtitle}</p>
            <p className="text-2xl font-light tabular-nums text-[#050505] mb-8">{product.priceDisplay}</p>
          </div>

          {/* Description */}
          <div>
            <p className={`${minimal.cn.body} mb-8`}>{product.description}</p>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#050505] font-medium mb-3">
              Size: <span className="text-[#9B9B9B] font-normal">{size}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="w-11 h-11 flex items-center justify-center text-[13px] transition-colors duration-200"
                  style={{
                    backgroundColor: size === s ? '#050505' : 'transparent',
                    color: size === s ? '#FFFFFF' : '#050505',
                    border: size === s ? '1px solid #050505' : '1px solid #E5E5E5',
                    borderRadius: 0,
                    cursor: 'pointer',
                    fontWeight: size === s ? 500 : 300,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#050505] font-medium mb-3">Quantity</p>
            <div className="inline-flex items-center border border-[#E5E5E5]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#050505] hover:bg-[#FAFAFA] transition-colors"><Minus size={14} /></button>
              <span className="w-12 text-center text-sm font-medium tabular-nums text-[#050505]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#050505] hover:bg-[#FAFAFA] transition-colors"><Plus size={14} /></button>
            </div>
          </div>

          {/* Add to Bag + Wishlist */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAdd}
              className={`${minimal.cn.btnPrimary} flex-1`}
              style={{ height: '56px' }}
            >
              {added ? (
                <span>Added</span>
              ) : (
                <><ShoppingBag size={16} className="mr-2" /> Add to Bag &mdash; {product.priceDisplay}</>
              )}
            </button>
            <button
              onClick={() => setWish(!wish)}
              className="w-14 h-14 flex items-center justify-center border border-[#E5E5E5] bg-transparent cursor-pointer hover:border-[#050505] transition-colors"
              style={{ borderRadius: 0 }}
            >
              <Heart size={18} fill={wish ? '#050505' : 'none'} color="#050505" />
            </button>
          </div>

          {/* Trust bar */}
          <div className="flex gap-6 py-5 mb-6" style={{ borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5' }}>
            {[
              { icon: Truck, label: 'Free Shipping' },
              { icon: Shield, label: 'GIA Certified' },
              { icon: RotateCcw, label: '30-Day Returns' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} color="#9B9B9B" />
                <span className="text-[11px] text-[#9B9B9B] tracking-wide">{label}</span>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div>
            {accItems.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                <button
                  onClick={() => setAccordion(accordion === i ? -1 : i)}
                  className="w-full flex justify-between items-center py-5 bg-transparent border-none cursor-pointer text-left"
                >
                  <span className="text-[13px] uppercase tracking-[0.1em] font-medium" style={{ color: accordion === i ? '#050505' : '#9B9B9B' }}>
                    {item.title}
                  </span>
                  <ChevronDown
                    size={16}
                    color="#9B9B9B"
                    style={{
                      transform: accordion === i ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 300ms ease',
                    }}
                  />
                </button>
                <div style={{
                  maxHeight: accordion === i ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 300ms ease',
                }}>
                  <p className={`${minimal.cn.body} pb-5`}>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diamond Specs */}
      {product.diamondSpecs && (
        <section className={`${minimal.cn.section} bg-[#FAFAFA]`}>
          <div className={minimal.cn.container}>
            <div className="mb-12">
              <span className={minimal.cn.label}>Specifications</span>
              <h2 className={`${minimal.cn.sectionHeadline} mt-3`}>The 4Cs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Carat', value: product.diamondSpecs.carat },
                { label: 'Cut', value: product.diamondSpecs.cut },
                { label: 'Color', value: product.diamondSpecs.color },
                { label: 'Clarity', value: product.diamondSpecs.clarity },
              ].map((spec) => (
                <div key={spec.label} className="py-8 text-center border border-[#E5E5E5]">
                  <p className={minimal.cn.label}>{spec.label}</p>
                  <p className="text-3xl font-light text-[#050505] mt-2 tabular-nums">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className={minimal.cn.section}>
          <div className={minimal.cn.container}>
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className={minimal.cn.label}>You May Also Like</span>
                <h2 className={`${minimal.cn.sectionHeadline} mt-3`}>Related Pieces</h2>
              </div>
              <Link href={`/minimal/category/${product.category}`} className={`${minimal.cn.btnSecondary} no-underline`}>
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <div key={p.id}>
                  <MinimalProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </MinimalLayout>
  )
}
