'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, Share2, ShoppingBag, ChevronRight, X, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { products, type Product } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { SmoothDrawer, AnimatedSocialIcons, ExploreButton } from '../ui'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']
const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('pdp-vis'); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useFadeIn()
  return <div ref={ref} className="pdp-fade" style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</div>
}

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
    <div ref={cRef} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={handleMove} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', cursor: 'crosshair' }}>
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
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 5vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: font, fontSize: '11px', color: '#9B9590' }}>
          <Link href="/minimal" style={{ color: '#9B9590', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} />
          <Link href="/minimal/collections" style={{ color: '#9B9590', textDecoration: 'none' }}>Collections</Link>
          <ChevronRight size={12} />
          <span style={{ color: '#1A1A1A' }}>{product.name}</span>
        </div>
      </div>

      <div className="pdp-grid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <FadeIn>
          <div>
            <div onClick={() => setLightbox(true)} style={{ position: 'relative', aspectRatio: '4/5', backgroundColor: '#F5F4F0', marginBottom: '12px', borderRadius: '8px', overflow: 'hidden' }}>
              <ZoomImage src={product.images[mainImg]} alt={product.name} />
              {product.isNew && <span style={{ position: 'absolute', top: '16px', left: '16px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', padding: '6px 12px', background: 'rgba(250,250,248,0.85)', backdropFilter: 'blur(8px)', borderRadius: '2px' }}>New</span>}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setMainImg(i)} style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: mainImg === i ? '2px solid #C4A265' : '2px solid transparent', opacity: mainImg === i ? 1 : 0.6, transition: 'all 300ms ease', backgroundColor: '#F5F4F0', padding: 0 }}>
                  <img src={img} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div>
          <FadeIn>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>{product.category.replace(/-/g, ' ')}</p>
            <h1 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 200, color: '#1A1A1A', marginBottom: '8px' }}>{product.name}</h1>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '24px' }}>{product.subtitle}</p>
            <p style={{ fontFamily: font, fontSize: '28px', fontWeight: 300, color: '#1A1A1A', marginBottom: '32px' }}>{product.priceDisplay}</p>
          </FadeIn>

          <FadeIn delay={100}>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '10px' }}>Metal: <span style={{ fontWeight: 300, color: '#9B9590' }}>{metal}</span></p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {metals.map((m) => (
                  <button key={m} onClick={() => setMetal(m)} style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, padding: '10px 18px', border: metal === m ? '1px solid #C4A265' : '1px solid #E8E5E0', backgroundColor: metal === m ? '#FAFAF8' : '#F5F3F0', color: metal === m ? '#C4A265' : '#1A1A1A', borderRadius: '8px', cursor: 'pointer', boxShadow: metal === m ? 'none' : '2px 2px 4px #d4d0cb, -2px -2px 4px #ffffff', transition: 'all 300ms ease' }}>{m}</button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A' }}>Size: <span style={{ fontWeight: 300, color: '#9B9590' }}>{size}</span></p>
                <button onClick={() => setSizeGuide(true)} style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, color: '#C4A265', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Size Guide</button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: size === s ? '1px solid #C4A265' : '1px solid #E8E5E0', backgroundColor: size === s ? '#1A1A1A' : '#F5F3F0', color: size === s ? '#FFFFFF' : '#1A1A1A', borderRadius: '8px', cursor: 'pointer', boxShadow: size === s ? 'none' : '2px 2px 4px #d4d0cb, -2px -2px 4px #ffffff', transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)' }}>{s}</button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '10px' }}>Quantity</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '8px', overflow: 'hidden', boxShadow: '3px 3px 6px #d4d0cb, -3px -3px 6px #ffffff' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F3F0', border: 'none', cursor: 'pointer', color: '#1A1A1A' }}><Minus size={14} /></button>
                <span style={{ width: '48px', textAlign: 'center', fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#1A1A1A', background: '#F5F3F0' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F3F0', border: 'none', cursor: 'pointer', color: '#1A1A1A' }}><Plus size={14} /></button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={250}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button onClick={handleAdd} className="pdp-add-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '18px 24px', backgroundColor: added ? '#1A1A1A' : '#C4A265', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 300ms ease' }}>
                {added ? '✓ Added to Cart' : <><ShoppingBag size={16} /> Add to Cart — {product.priceDisplay}</>}
              </button>
              <button onClick={() => setWish(!wish)} style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E8E5E0', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#F5F3F0', boxShadow: '3px 3px 6px #d4d0cb, -3px -3px 6px #ffffff', transition: 'all 300ms ease' }}>
                <Heart size={18} fill={wish ? '#C4A265' : 'none'} color={wish ? '#C4A265' : '#9B9590'} style={{ transition: 'all 300ms ease', transform: wish ? 'scale(1.15)' : 'scale(1)' }} />
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={280}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, color: '#9B9590', letterSpacing: '0.05em' }}>Share this piece</span>
              <AnimatedSocialIcons size={36} />
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div style={{ display: 'flex', gap: '24px', padding: '20px 0', borderTop: '1px solid #E8E5E0', borderBottom: '1px solid #E8E5E0', marginBottom: '32px' }}>
              {[{ icon: Truck, label: 'Free Insured Shipping' }, { icon: Shield, label: 'GIA Certified' }, { icon: RotateCcw, label: '30-Day Returns' }].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color="#C4A265" />
                  <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, color: '#9B9590', letterSpacing: '0.05em' }}>{label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={350}>
            {accItems.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #E8E5E0' }}>
                <button onClick={() => setAccordion(accordion === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: accordion === i ? '#1A1A1A' : '#9B9590', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 200ms' }}>
                  {item.title}
                  <span style={{ transform: accordion === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 300ms ease', fontSize: '16px' }}>↓</span>
                </button>
                <div style={{ maxHeight: accordion === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 400ms cubic-bezier(0.25,0.46,0.45,0.94)' }}>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#555', lineHeight: 1.8, padding: '0 0 18px' }}>{item.content}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </div>

      {product.diamondSpecs && (
        <section style={{ padding: '80px 5vw', backgroundColor: '#F5F4F0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <FadeIn style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>The 4Cs</p>
              <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#1A1A1A' }}>Diamond Specifications</h2>
            </FadeIn>
            <div className="pdp-specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {[{ label: 'Carat', value: product.diamondSpecs.carat }, { label: 'Cut', value: product.diamondSpecs.cut }, { label: 'Color', value: product.diamondSpecs.color }, { label: 'Clarity', value: product.diamondSpecs.clarity }].map((spec, i) => (
                <FadeIn key={spec.label} delay={i * 100}>
                  <div style={{ padding: '28px 20px', textAlign: 'center', borderRadius: '12px', background: '#F5F3F0', boxShadow: '4px 4px 8px #d4d0cb, -4px -4px 8px #ffffff' }}>
                    <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9590', marginBottom: '8px' }}>{spec.label}</p>
                    <p style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, color: '#1A1A1A' }}>{spec.value}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ padding: '80px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
          <FadeIn style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>You May Also Like</p>
              <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#1A1A1A' }}>Related Pieces</h2>
            </div>
            <ExploreButton text="View All" href={`/minimal/category/${product.category}`} />
          </FadeIn>
          <div className="pdp-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {related.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <Link href={`/minimal/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="vm-card-img" style={{ aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '12px', overflow: 'hidden', borderRadius: '8px' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }} />
                  </div>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{p.name}</p>
                  <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590', marginBottom: '6px' }}>{p.subtitle}</p>
                  <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{p.priceDisplay}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {lightbox && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)' }} onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }}><X size={24} color="#FFFFFF" /></button>
          <img src={product.images[mainImg]} alt={product.name} style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
          <div style={{ position: 'absolute', bottom: '32px', display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)} style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: mainImg === i ? '2px solid #C4A265' : '2px solid transparent', opacity: mainImg === i ? 1 : 0.5, cursor: 'pointer', padding: 0, background: 'none' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      <SmoothDrawer isOpen={sizeGuide} onClose={() => setSizeGuide(false)} title="Size Guide" side="right">
        <div style={{ fontFamily: font }}>
          <p style={{ fontSize: '13px', fontWeight: 300, color: '#555', lineHeight: 1.8, marginBottom: '24px' }}>Find your perfect ring size.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead><tr style={{ borderBottom: '1px solid #E8E5E0' }}><th style={{ padding: '10px 0', textAlign: 'left', fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A1A1A' }}>US Size</th><th style={{ padding: '10px 0', textAlign: 'left', fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A1A1A' }}>Diameter</th><th style={{ padding: '10px 0', textAlign: 'left', fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A1A1A' }}>Circ.</th></tr></thead>
            <tbody>
              {[['5','15.7','49.3'],['5.5','16.0','50.3'],['6','16.5','51.8'],['6.5','16.9','53.1'],['7','17.3','54.4'],['7.5','17.7','55.7'],['8','18.1','57.0']].map(([s,d,c]) => (
                <tr key={s} style={{ borderBottom: '1px solid #F5F4F0' }}><td style={{ padding: '10px 0', fontWeight: 300, color: '#1A1A1A' }}>{s}</td><td style={{ padding: '10px 0', fontWeight: 300, color: '#9B9590' }}>{d} mm</td><td style={{ padding: '10px 0', fontWeight: 300, color: '#9B9590' }}>{c} mm</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </SmoothDrawer>

      <style>{`
        .pdp-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .pdp-fade.pdp-vis { opacity: 1; transform: translateY(0); }
        .pdp-add-btn:hover { filter: brightness(1.05); }
        .pdp-add-btn:active { transform: scale(0.97); }
        .vm-card-img:hover img { transform: scale(1.05) !important; }
        @media (max-width: 768px) {
          .pdp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pdp-specs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pdp-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
