'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronRight, SlidersHorizontal, X, Heart, Grid, List } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { products } from '@/data/products'
import { allCategories, categoryLabels, type ProductCategory } from '@/data/concepts'
import { SmoothDrawer, NeuProductCard } from '../ui'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/minimal-engagement-ring.jpg',
  'diamond-necklaces': '/images/minimal-necklace-pendant.jpg',
  'diamond-earrings': '/images/minimal-diamond-studs.jpg',
  'diamond-bracelets': '/images/minimal-tennis-bracelet.jpg',
  'gold-rings': '/images/products/classic-gold-ring.jpg',
  'gold-necklaces': '/images/products/gold-chain-necklace.jpg',
  'gold-earrings': '/images/products/gold-hoop-earrings.jpg',
  'gold-bracelets': '/images/products/gold-bangle-bracelet.jpg',
  'wedding-bridal': '/images/minimal-wedding-rings.jpg',
  'loose-diamonds': '/images/minimal-loose-diamond.jpg',
}

const materialFilters = ['All', 'Diamond', 'Gold', 'Diamond & Gold', 'Platinum']
const priceFilters = ['All', 'Under $5,000', '$5,000-$10,000', '$10,000-$20,000', 'Over $20,000']
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Name A-Z']

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('cat-vis'); obs.unobserve(el) } }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useFadeIn()
  return <div ref={ref} className="cat-fade" style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</div>
}

export function MinimalCategory({ category }: { category?: string }) {
  const params = useParams()
  const slug = category || (params?.category as string)
  const catName = (slug && categoryLabels[slug as ProductCategory]) ? categoryLabels[slug as ProductCategory] : slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'All'
  const heroImg = categoryImages[slug] || '/images/moody-jewelry-1.jpg'

  const [material, setMaterial] = useState('All')
  const [price, setPrice] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let items = slug ? products.filter((p) => p.category === slug) : products
    if (material !== 'All') items = items.filter((p) => p.material === material)
    if (price !== 'All') {
      if (price === 'Under $5,000') items = items.filter((p) => p.price < 5000)
      else if (price === '$5,000-$10,000') items = items.filter((p) => p.price >= 5000 && p.price <= 10000)
      else if (price === '$10,000-$20,000') items = items.filter((p) => p.price >= 10000 && p.price <= 20000)
      else if (price === 'Over $20,000') items = items.filter((p) => p.price > 20000)
    }
    if (sort === 'Price: Low to High') items = [...items].sort((a, b) => a.price - b.price)
    else if (sort === 'Price: High to Low') items = [...items].sort((a, b) => b.price - a.price)
    else if (sort === 'Name A-Z') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [slug, material, price, sort])

  const heroRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.1)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MinimalLayout>
      <section style={{ position: 'relative', height: '50vh', minHeight: '300px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div ref={heroRef} style={{ position: 'absolute', inset: '-10%', willChange: 'transform' }}>
          <img src={heroImg} alt={catName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.6), rgba(26,26,26,0.4))' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>Collection</p>
          <h1 style={{ fontFamily: font, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 200, color: '#FFFFFF', letterSpacing: '0.05em' }}>{catName}</h1>
        </div>
      </section>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 5vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: font, fontSize: '11px', color: '#9B9590' }}>
            <Link href="/minimal" style={{ color: '#9B9590', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/minimal/collections" style={{ color: '#9B9590', textDecoration: 'none' }}>Collections</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#1A1A1A' }}>{catName}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590' }}>Showing {filtered.length} pieces</span>
            <button onClick={() => setFilterOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', background: '#F5F3F0', border: '1px solid #E8E5E0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', boxShadow: '2px 2px 4px #d4d0cb, -2px -2px 4px #ffffff' }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#1A1A1A', background: '#F5F3F0', border: '1px solid #E8E5E0', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
              {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setView('grid')} style={{ padding: '6px', background: view === 'grid' ? '#1A1A1A' : '#F5F3F0', color: view === 'grid' ? '#FFFFFF' : '#9B9590', border: 'none', borderRadius: '8px', cursor: 'pointer' }}><Grid size={16} /></button>
              <button onClick={() => setView('list')} style={{ padding: '6px', background: view === 'list' ? '#1A1A1A' : '#F5F3F0', color: view === 'list' ? '#FFFFFF' : '#9B9590', border: 'none', borderRadius: '8px', cursor: 'pointer' }}><List size={16} /></button>
            </div>
          </div>
        </div>
        {(material !== 'All' || price !== 'All') && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            {material !== 'All' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '10px', fontWeight: 400, color: '#C4A265', padding: '6px 12px', background: 'rgba(196,162,101,0.08)', borderRadius: '20px', border: '1px solid rgba(196,162,101,0.2)' }}>{material} <button onClick={() => setMaterial('All')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#C4A265' }}><X size={12} /></button></span>}
            {price !== 'All' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '10px', fontWeight: 400, color: '#C4A265', padding: '6px 12px', background: 'rgba(196,162,101,0.08)', borderRadius: '20px', border: '1px solid rgba(196,162,101,0.2)' }}>{price} <button onClick={() => setPrice('All')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#C4A265' }}><X size={12} /></button></span>}
          </div>
        )}
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw 80px' }}>
        {view === 'grid' ? (
          <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={i * 80}>
                <NeuProductCard
                  name={p.name}
                  price={p.price}
                  image={p.images[0]}
                  href={`/minimal/product/${p.slug}`}
                  material={p.material || p.subtitle}
                  carat={p.diamondSpecs?.carat ? `${p.diamondSpecs.carat}ct` : undefined}
                  certification={p.diamondSpecs?.certification}
                  isNew={p.isNew}
                />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={i * 60}>
                <Link href={`/minimal/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '24px', padding: '16px', borderBottom: '1px solid #E8E5E0', alignItems: 'center' }}>
                  <div style={{ width: '100px', height: '100px', flexShrink: 0, backgroundColor: '#F5F4F0', borderRadius: '8px', overflow: 'hidden' }}><img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div style={{ flex: 1 }}><p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{p.name}</p><p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#9B9590' }}>{p.subtitle}</p></div>
                  <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#1A1A1A' }}>{p.priceDisplay}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 300, color: '#9B9590' }}>No pieces match your filters.</p>
            <button onClick={() => { setMaterial('All'); setPrice('All') }} style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#C4A265', background: 'none', border: 'none', cursor: 'pointer', marginTop: '12px', textDecoration: 'underline' }}>Clear all filters</button>
          </div>
        )}
      </div>

      <SmoothDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} title="Filters" side="right">
        <div style={{ fontFamily: font }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px' }}>Material</p>
            {materialFilters.map((m) => (
              <button key={m} onClick={() => setMaterial(m)} style={{ display: 'block', width: '100%', fontFamily: font, fontSize: '12px', fontWeight: material === m ? 500 : 300, color: material === m ? '#C4A265' : '#1A1A1A', background: material === m ? 'rgba(196,162,101,0.08)' : 'transparent', border: 'none', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', transition: 'all 300ms ease', marginBottom: '4px' }}>{m}</button>
            ))}
          </div>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px' }}>Price Range</p>
            {priceFilters.map((p) => (
              <button key={p} onClick={() => setPrice(p)} style={{ display: 'block', width: '100%', fontFamily: font, fontSize: '12px', fontWeight: price === p ? 500 : 300, color: price === p ? '#C4A265' : '#1A1A1A', background: price === p ? 'rgba(196,162,101,0.08)' : 'transparent', border: 'none', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', transition: 'all 300ms ease', marginBottom: '4px' }}>{p}</button>
            ))}
          </div>
          <button onClick={() => setFilterOpen(false)} style={{ width: '100%', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '16px', backgroundColor: '#C4A265', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Apply Filters</button>
        </div>
      </SmoothDrawer>

      <style>{`
        .cat-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .cat-fade.cat-vis { opacity: 1; transform: translateY(0); }
        .cat-card:hover img { transform: scale(1.05) !important; }
        .cat-card:hover { box-shadow: 0 8px 30px rgba(180,170,160,0.15); }
        .cat-card:hover .cat-wish { opacity: 1 !important; }
        @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </MinimalLayout>
  )
}
