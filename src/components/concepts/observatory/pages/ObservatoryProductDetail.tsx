'use client'
import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { OB, ObservatorySection, RevealSection, ScanLine, CyanRule, DataLabel } from '../ObservatoryLayout'
import { ObservatoryButton, SpectrumChart, AnalysisPanel, CertificationBadge, PrecisionMeter } from '../ui'
import { getProduct, getRelatedProducts, type Product } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { Heart, Share2, Shield, Truck, RotateCcw, ArrowRight, Minus, Plus, X, ChevronRight, RotateCw, Check, Ruler } from 'lucide-react'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

export function ObservatoryProductDetail() {
  const params = useParams()
  const product = getProduct(params.slug as string)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('7')
  const [selectedMetal, setSelectedMetal] = useState(() => {
    if (!product) return metals[0]
    return product.goldColor ? `${product.goldColor} Gold` : metals[0]
  })
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'care'>('description')
  const imgRef = useRef<HTMLDivElement>(null)

  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()

  if (!product) return <ObservatorySection><p style={{ color: OB.text }}>Specimen not found in database.</p></ObservatorySection>

  const wishlisted = isInWishlist(product.id)
  const related = getRelatedProducts(product.id, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize, selectedMetal)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }, [])

  const specs = product.diamondSpecs ? [
    { label: 'Cut Grade', value: product.diamondSpecs.cut },
    { label: 'Clarity', value: product.diamondSpecs.clarity },
    { label: 'Color', value: product.diamondSpecs.color },
    { label: 'Carat', value: product.diamondSpecs.carat },
    { label: 'Shape', value: product.diamondSpecs.shape },
    { label: 'Origin', value: product.diamondSpecs.origin },
    { label: 'Certification', value: product.diamondSpecs.certification },
  ] : [
    { label: 'Material', value: product.material },
    { label: 'Karat', value: product.goldKarat || 'N/A' },
    { label: 'Color', value: product.goldColor || 'N/A' },
  ]

  const spectrumData = [
    { label: 'Brilliance', value: 96 },
    { label: 'Fire', value: 92 },
    { label: 'Scintillation', value: 88 },
    { label: 'Light Return', value: 94 },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <section style={{ background: OB.bg, padding: '90px 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>
            <Link href="/observatory" style={{ color: OB.textSecondary, textDecoration: 'none' }}>Observatory</Link>
            <ChevronRight size={10} color={OB.textSecondary} />
            <Link href="/observatory/collections" style={{ color: OB.textSecondary, textDecoration: 'none' }}>Catalog</Link>
            <ChevronRight size={10} color={OB.textSecondary} />
            <span style={{ color: OB.accent }}>{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 48 }}>
          {/* Left: Image Gallery */}
          <div>
            {/* GemHub 360 Viewer Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 12px', background: `${OB.accent}10`, border: `1px solid ${OB.accent}30` }}>
              <RotateCw size={14} color={OB.accent} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>360 Analysis View Available</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: OB.textSecondary, marginLeft: 'auto' }}>Powered by GemLightBox Hub</span>
            </div>

            {/* Main Image with Zoom */}
            <div
              ref={imgRef}
              onClick={() => setLightboxOpen(true)}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              style={{
                position: 'relative', height: 520, overflow: 'hidden', cursor: 'crosshair',
                border: `1px solid ${OB.border}`, background: OB.surface,
              }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                style={{
                  objectFit: 'cover',
                  transform: isZoomed ? `scale(2)` : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: isZoomed ? 'none' : 'transform 0.3s ease',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 0%, ${OB.accent}05 50%, transparent 100%)`, pointerEvents: 'none' }} />
              {product.isNew && (
                <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', background: OB.accent, color: '#000', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>New Specimen</div>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} style={{
                  position: 'relative', width: 80, height: 80, overflow: 'hidden', cursor: 'pointer',
                  border: selectedImage === i ? `2px solid ${OB.accent}` : `1px solid ${OB.border}`,
                  background: 'none', padding: 0, transition: 'border-color 0.2s',
                }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div style={{ paddingTop: 8 }}>
            <ScanLine label="Specimen Analysis" style={{ marginBottom: 16 }} />
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>{product.name}</h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.textSecondary, margin: '0 0 16px' }}>{product.subtitle}</p>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.accent, marginBottom: 24 }}>${product.price.toLocaleString()}</div>
            <CyanRule style={{ marginBottom: 20 }} />

            {/* Size Selector */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size: <span style={{ color: OB.accent }}>{selectedSize}</span></span>
                <button onClick={() => setShowSizeGuide(true)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Ruler size={12} /> Size Guide</button>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    width: 44, height: 36, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
                    border: selectedSize === s ? `2px solid ${OB.accent}` : `1px solid ${OB.border}`,
                    background: selectedSize === s ? `${OB.accent}15` : 'transparent',
                    color: selectedSize === s ? OB.accent : OB.textSecondary, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Metal Selector */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Metal: <span style={{ color: OB.accent }}>{selectedMetal}</span></span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {metals.map(m => {
                  const colors: Record<string, string> = { 'White Gold': '#E8E8E8', 'Yellow Gold': '#FFD700', 'Rose Gold': '#B76E79', 'Platinum': '#C0C0C0' }
                  return (
                    <button key={m} onClick={() => setSelectedMetal(m)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                      border: selectedMetal === m ? `2px solid ${OB.accent}` : `1px solid ${OB.border}`,
                      background: selectedMetal === m ? `${OB.accent}10` : 'transparent', cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: colors[m], border: `1px solid ${OB.border}` }} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: selectedMetal === m ? OB.accent : OB.textSecondary }}>{m}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: `1px solid ${OB.border}`, width: 'fit-content' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity <= 1 ? OB.border : OB.textSecondary, cursor: quantity <= 1 ? 'not-allowed' : 'pointer' }}><Minus size={14} /></button>
                <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.text, borderLeft: `1px solid ${OB.border}`, borderRight: `1px solid ${OB.border}` }}>{quantity}</div>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} disabled={quantity >= 10} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity >= 10 ? OB.border : OB.textSecondary, cursor: quantity >= 10 ? 'not-allowed' : 'pointer' }}><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button onClick={handleAddToCart} style={{
                flex: 1, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: addedToCart ? '#10B981' : OB.accent, color: '#000',
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }}>
                {addedToCart ? <><Check size={16} /> Added to Collection</> : <>Add to Collection &mdash; ${(product.price * quantity).toLocaleString()}</>}
              </button>
              <button onClick={() => toggleItem(product)} style={{
                width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: `1px solid ${wishlisted ? OB.accent : OB.border}`,
                color: wishlisted ? OB.accent : OB.textSecondary, cursor: 'pointer', transition: 'all 0.2s',
              }}><Heart size={18} fill={wishlisted ? OB.accent : 'none'} /></button>
              <button style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${OB.border}`, color: OB.textSecondary, cursor: 'pointer' }}><Share2 size={18} /></button>
            </div>

            {/* Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '20px 0', borderTop: `1px solid ${OB.border}` }}>
              {[
                { icon: <Shield size={16} />, label: 'Certified Authentic', sub: 'GIA Verified' },
                { icon: <Truck size={16} />, label: 'Insured Shipping', sub: 'Free worldwide' },
                { icon: <RotateCcw size={16} />, label: '30-Day Returns', sub: 'No questions' },
              ].map((g, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span style={{ color: OB.accent, display: 'block', marginBottom: 4 }}>{g.icon}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.text, display: 'block' }}>{g.label}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: OB.textSecondary }}>{g.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ObservatorySection>

      {/* Tabs: Description / Specs / Care */}
      <ObservatorySection alt>
        <RevealSection>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${OB.border}`, marginBottom: 24 }}>
            {(['description', 'specs', 'care'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '12px 24px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
                letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${OB.accent}` : '2px solid transparent',
                color: activeTab === tab ? OB.accent : OB.textSecondary, cursor: 'pointer', transition: 'all 0.2s',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ maxWidth: 800 }}>
            {activeTab === 'description' && (
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>{product.description}</p>
                <p style={{ marginBottom: 16 }}>Crafted with meticulous attention to detail, this piece represents the pinnacle of fine jewelry artisanship. Each element has been carefully considered to ensure both aesthetic beauty and lasting durability.</p>
                <p>Material: {product.material}{product.goldKarat ? ` · ${product.goldKarat}` : ''}{product.goldColor ? ` · ${product.goldColor}` : ''}</p>
                <ul style={{ marginTop: 16, paddingLeft: 20 }}>
                  {product.features.map((f, i) => <li key={i} style={{ marginBottom: 6, color: OB.textSecondary }}>{f}</li>)}
                </ul>
              </div>
            )}
            {activeTab === 'specs' && (
              <div>
                {specs.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${OB.border}` }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.accent, fontWeight: 500 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'care' && (
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8 }}>
                <p style={{ marginBottom: 12 }}>Store in the provided jewelry box when not wearing. Avoid contact with perfumes, lotions, and harsh chemicals.</p>
                <p style={{ marginBottom: 12 }}>Clean gently with a soft cloth. For deeper cleaning, use warm water with mild soap and a soft brush.</p>
                <p style={{ marginBottom: 12 }}>Professional cleaning and inspection recommended every 6-12 months to maintain brilliance and check settings.</p>
                <p>This piece comes with a lifetime warranty covering manufacturing defects and complimentary annual maintenance.</p>
              </div>
            )}
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* Analysis Section */}
      <ObservatorySection>
        <RevealSection>
          <ScanLine label="Gemological Analysis" style={{ marginBottom: 32 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <AnalysisPanel title={product.name} grade="Exceptional" specs={specs} />
            <SpectrumChart data={spectrumData} title="Light Performance Analysis" />
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* Making Of */}
      <ObservatorySection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ScanLine label="Artisan Profile" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>The Making of This Piece</h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Crafted by master artisan Elena Marchetti in our Antwerp atelier, this piece required 120 hours of meticulous handwork. The stone was selected from a parcel of 2,000 candidates, chosen for its exceptional light performance metrics.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[{ val: '120h', lbl: 'CRAFT TIME' }, { val: '2000', lbl: 'STONES REVIEWED' }, { val: '47pt', lbl: 'ANALYSIS' }].map((d, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${OB.accent}`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: OB.accent }}>{d.val}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.textSecondary }}>{d.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/observatory/precision-tools.jpg" alt="Craftsmanship" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* Related Products */}
      {related.length > 0 && (
        <ObservatorySection>
          <RevealSection>
            <ScanLine label="Related Specimens" style={{ marginBottom: 32 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/observatory/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ border: `1px solid ${OB.border}`, transition: 'border-color 0.3s, transform 0.3s' }}>
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>{p.name}</h3>
                      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, margin: '0 0 8px' }}>{p.subtitle}</p>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: OB.accent }}>${p.price.toLocaleString()}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RevealSection>
        </ObservatorySection>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${OB.border}`, color: '#fff', cursor: 'pointer', zIndex: 10 }}><X size={20} /></button>
          <div style={{ position: 'relative', width: '80vw', height: '80vh' }}>
            <Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div onClick={() => setShowSizeGuide(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: OB.surface, border: `1px solid ${OB.border}`, padding: 32, maxWidth: 500, width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', color: OB.text, margin: 0 }}>Ring Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} style={{ background: 'none', border: 'none', color: OB.textSecondary, cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['US Size', 'Diameter (mm)', 'Circumference (mm)'].map(h => (
                    <th key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 12px', borderBottom: `1px solid ${OB.border}`, textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[['5','15.7','49.3'],['5.5','16.0','50.3'],['6','16.5','51.8'],['6.5','16.9','53.1'],['7','17.3','54.4'],['7.5','17.7','55.7'],['8','18.1','57.0'],['8.5','18.5','58.3'],['9','18.9','59.5']].map(([size, dia, circ]) => (
                  <tr key={size} style={{ background: selectedSize === size ? `${OB.accent}10` : 'transparent' }}>
                    <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: selectedSize === size ? OB.accent : OB.text, padding: '8px 12px', borderBottom: `1px solid ${OB.border}` }}>{size}</td>
                    <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${OB.border}` }}>{dia}</td>
                    <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${OB.border}` }}>{circ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
