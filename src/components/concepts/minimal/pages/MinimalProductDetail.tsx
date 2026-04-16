'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, ShoppingBag, ChevronDown, Minus, Plus, Truck, Shield, RotateCcw, X } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { products, type Product } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { SmoothDrawer } from '../ui'
import { MINIMAL } from '../design-tokens'
import { ScrollReveal } from '../ScrollReveal'

const { colors, font } = MINIMAL

const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']
const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']

function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const cRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const handleMove = (e: React.MouseEvent) => {
    if (!cRef.current) return
    const r = cRef.current.getBoundingClientRect()
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <div ref={cRef} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={handleMove}
      className="mn-product-image"
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: zoom ? 'scale(2)' : 'scale(1)', transformOrigin: `${pos.x}% ${pos.y}%`, transition: zoom ? 'none' : 'transform 400ms ease' }} />
    </div>
  )
}

export function MinimalProductDetail({ product: productProp }: { product?: Product }) {
  const params = useParams()
  const slug = params?.slug as string
  const product = productProp || products.find((p) => p.slug === slug) || products[0]
  const addItem = useCartStore((s) => s.addItem)

  const [mainImg, setMainImg] = useState(0)
  const [metal, setMetal] = useState(product.goldColor ? `${product.goldColor} Gold` : metals[0])
  const [size, setSize] = useState('7')
  const [qty, setQty] = useState(1)
  const [lightbox, setLightbox] = useState(false)
  const [accordion, setAccordion] = useState(0)
  const [added, setAdded] = useState(false)
  const [wish, setWish] = useState(false)
  const [sizeGuide, setSizeGuide] = useState(false)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, size, metal)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const accItems = [
    { title: 'Description', content: product.description },
    { title: 'Diamond Specifications', content: product.diamondSpecs ? `${product.diamondSpecs.carat}ct ${product.diamondSpecs.shape} · ${product.diamondSpecs.cut} Cut · ${product.diamondSpecs.color} Color · ${product.diamondSpecs.clarity} Clarity · ${product.diamondSpecs.origin} · ${product.diamondSpecs.certification}` : 'No diamond specifications available.' },
    { title: 'Features', content: product.features.join(' · ') },
    { title: 'Shipping & Returns', content: 'Complimentary insured shipping on all orders. 30-day returns with full refund. Each piece arrives in our signature presentation box.' },
    { title: 'Care Instructions', content: 'Store in the provided jewelry box. Clean with a soft cloth. Avoid exposure to chemicals and extreme temperatures.' },
  ]

  return (
    <MinimalLayout>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 5vw' }}>
        <div style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/minimal" style={{ color: colors.textSecondary, textDecoration: 'none' }} className="mn-underline-hover">Home</Link>
          <span>/</span>
          <Link href="/minimal/collections" style={{ color: colors.textSecondary, textDecoration: 'none' }} className="mn-underline-hover">Collections</Link>
          <span>/</span>
          <span style={{ color: colors.text }}>{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid: 60% image / 40% info */}
      <div className="pdp-grid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw 80px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '60px' }}>
        {/* Left: Image Gallery */}
        <ScrollReveal>
          <div>
            <div onClick={() => setLightbox(true)} style={{ position: 'relative', aspectRatio: '4/5', backgroundColor: colors.hover, marginBottom: '12px', overflow: 'hidden' }}>
              <ZoomImage src={product.images[mainImg]} alt={product.name} />
              {product.isNew && (
                <span style={{ position: 'absolute', top: '16px', left: '16px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.bg, backgroundColor: colors.text, padding: '4px 10px' }}>New</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setMainImg(i)} style={{
                  width: '72px', height: '72px', overflow: 'hidden', cursor: 'pointer', padding: 0, background: 'none',
                  border: mainImg === i ? `2px solid ${colors.text}` : `2px solid transparent`,
                  opacity: mainImg === i ? 1 : 0.5,
                  transition: 'all 300ms ease',
                }}>
                  <img src={img} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Product Info */}
        <div>
          <ScrollReveal>
            {/* Category label */}
            <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '12px' }}>
              {product.category.replace(/-/g, ' ')}
            </p>
            {/* Product name — brutalist headline */}
            <h1 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 200, color: colors.text, marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.textSecondary, marginBottom: '24px', lineHeight: 1.6 }}>
              {product.subtitle}
            </p>
            {/* Price */}
            <p style={{ fontFamily: font, fontSize: '24px', fontWeight: 400, color: colors.text, marginBottom: '32px', fontVariantNumeric: 'tabular-nums' }}>
              {product.priceDisplay}
            </p>
          </ScrollReveal>

          {/* Metal selector */}
          <ScrollReveal delay={50}>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text, marginBottom: '10px' }}>
                Metal: <span style={{ fontWeight: 300, color: colors.textSecondary }}>{metal}</span>
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {metals.map((m) => (
                  <button key={m} onClick={() => setMetal(m)} style={{
                    fontFamily: font, fontSize: '11px', fontWeight: 300, padding: '10px 18px',
                    border: `1px solid ${metal === m ? colors.text : colors.border}`,
                    backgroundColor: metal === m ? colors.text : colors.bg,
                    color: metal === m ? colors.bg : colors.text,
                    cursor: 'pointer', transition: 'all 200ms ease',
                  }}>{m}</button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Size selector */}
          <ScrollReveal delay={100}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text }}>
                  Size: <span style={{ fontWeight: 300, color: colors.textSecondary }}>{size}</span>
                </p>
                <button onClick={() => setSizeGuide(true)} style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, color: colors.textSecondary, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size Guide</button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} style={{
                    fontFamily: font, fontSize: '12px', fontWeight: 300, width: '42px', height: '42px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${size === s ? colors.text : colors.border}`,
                    backgroundColor: size === s ? colors.text : colors.bg,
                    color: size === s ? colors.bg : colors.text,
                    cursor: 'pointer', transition: 'all 200ms ease',
                  }}>{s}</button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Quantity */}
          <ScrollReveal delay={150}>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text, marginBottom: '10px' }}>Quantity</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: `1px solid ${colors.border}` }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: colors.text }}><Minus size={14} /></button>
                <span style={{ width: '48px', textAlign: 'center', fontFamily: font, fontSize: '14px', fontWeight: 400, color: colors.text, borderLeft: `1px solid ${colors.border}`, borderRight: `1px solid ${colors.border}`, lineHeight: '42px' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: colors.text }}><Plus size={14} /></button>
              </div>
            </div>
          </ScrollReveal>

          {/* Add to Bag — full-width, bg-black, h-14, uppercase */}
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button onClick={handleAdd} className="mn-btn-lift" style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
                height: '56px',
                backgroundColor: added ? colors.textSecondary : colors.text,
                color: colors.bg, border: 'none', cursor: 'pointer', transition: 'all 300ms ease',
              }}>
                {added ? '✓ Added to Bag' : <><ShoppingBag size={16} /> Add to Bag — {product.priceDisplay}</>}
              </button>
              <button onClick={() => setWish(!wish)} style={{
                width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${colors.border}`, cursor: 'pointer', backgroundColor: colors.bg,
                transition: 'all 300ms ease',
              }}>
                <Heart size={18} fill={wish ? colors.text : 'none'} color={wish ? colors.text : colors.textSecondary} style={{ transition: 'all 300ms ease' }} />
              </button>
            </div>
          </ScrollReveal>

          {/* Trust row */}
          <ScrollReveal delay={250}>
            <div style={{ display: 'flex', gap: '24px', padding: '20px 0', borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, marginBottom: '32px' }}>
              {[{ icon: Truck, label: 'Free Insured Shipping' }, { icon: Shield, label: 'GIA Certified' }, { icon: RotateCcw, label: '30-Day Returns' }].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} strokeWidth={1.5} color={colors.textSecondary} />
                  <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, color: colors.textSecondary, letterSpacing: '0.05em' }}>{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Accordion — clean with rotating chevron */}
          <ScrollReveal delay={300}>
            {accItems.map((item, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <button onClick={() => setAccordion(accordion === i ? -1 : i)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', fontFamily: font, fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: accordion === i ? colors.text : colors.textSecondary,
                  background: 'none', border: 'none', cursor: 'pointer', transition: 'color 200ms',
                }}>
                  {item.title}
                  <ChevronDown size={16} style={{ transform: accordion === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 300ms ease' }} />
                </button>
                <div style={{ maxHeight: accordion === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 400ms cubic-bezier(0.25,0.46,0.45,0.94)' }}>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.textSecondary, lineHeight: 1.8, padding: '0 0 18px' }}>{item.content}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>

      {/* Diamond Specs Section */}
      {product.diamondSpecs && (
        <section style={{ padding: '80px 5vw', backgroundColor: colors.bg, borderTop: `1px solid ${colors.border}` }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '12px' }}>The 4Cs</p>
                <h2 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 200, color: colors.text, letterSpacing: '-0.02em' }}>Diamond Specifications</h2>
              </div>
            </ScrollReveal>
            <div className="pdp-specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {[{ label: 'Carat', value: product.diamondSpecs.carat }, { label: 'Cut', value: product.diamondSpecs.cut }, { label: 'Color', value: product.diamondSpecs.color }, { label: 'Clarity', value: product.diamondSpecs.clarity }].map((spec, i) => (
                <ScrollReveal key={spec.label} delay={i * 80}>
                  <div style={{ padding: '28px 20px', textAlign: 'center', border: `1px solid ${colors.border}` }}>
                    <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '8px' }}>{spec.label}</p>
                    <p style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, color: colors.text }}>{spec.value}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: '80px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
              <div>
                <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '12px' }}>You May Also Like</p>
                <h2 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 200, color: colors.text, letterSpacing: '-0.02em' }}>Related Pieces</h2>
              </div>
              <Link href={`/minimal/category/${product.category}`} className="mn-underline-hover" style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text, textDecoration: 'none' }}>
                View All
              </Link>
            </div>
          </ScrollReveal>
          <div className="pdp-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {related.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <MinimalProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }} onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }}><X size={24} color="#FFFFFF" /></button>
          <img src={product.images[mainImg]} alt={product.name} style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
          <div style={{ position: 'absolute', bottom: '32px', display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)} style={{ width: '56px', height: '56px', overflow: 'hidden', border: mainImg === i ? '2px solid #FFFFFF' : '2px solid transparent', opacity: mainImg === i ? 1 : 0.5, cursor: 'pointer', padding: 0, background: 'none' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Drawer */}
      <SmoothDrawer isOpen={sizeGuide} onClose={() => setSizeGuide(false)} title="Size Guide" side="right">
        <div style={{ fontFamily: font }}>
          <p style={{ fontSize: '13px', fontWeight: 300, color: colors.textSecondary, lineHeight: 1.8, marginBottom: '24px' }}>Find your perfect ring size.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th style={{ padding: '10px 0', textAlign: 'left', fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.text }}>US Size</th>
                <th style={{ padding: '10px 0', textAlign: 'left', fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.text }}>Diameter</th>
                <th style={{ padding: '10px 0', textAlign: 'left', fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.text }}>Circ.</th>
              </tr>
            </thead>
            <tbody>
              {[['5','15.7','49.3'],['5.5','16.0','50.3'],['6','16.5','51.8'],['6.5','16.9','53.1'],['7','17.3','54.4'],['7.5','17.7','55.7'],['8','18.1','57.0']].map(([s,d,c]) => (
                <tr key={s} style={{ borderBottom: `1px solid ${colors.hover}` }}>
                  <td style={{ padding: '10px 0', fontWeight: 300, color: colors.text }}>{s}</td>
                  <td style={{ padding: '10px 0', fontWeight: 300, color: colors.textSecondary }}>{d} mm</td>
                  <td style={{ padding: '10px 0', fontWeight: 300, color: colors.textSecondary }}>{c} mm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SmoothDrawer>

      <style>{`
        @media (max-width: 768px) {
          .pdp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pdp-specs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pdp-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
