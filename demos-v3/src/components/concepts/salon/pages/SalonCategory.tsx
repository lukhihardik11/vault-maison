'use client'

import React, { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SalonLayout, S } from '../SalonLayout'
import { SalonCard } from '../ui/SalonCard'
import { SalonRevealCard } from '../ui/SalonRevealCard'
import { SalonButton } from '../ui/SalonButton'
import { getProductsByCategory } from '@/data/products'
import { allCategories, categoryLabels, type ProductCategory } from '@/data/concepts'
import { Grid, List, SlidersHorizontal } from 'lucide-react'

const advisorTips: Record<string, string> = {
  'diamond-rings': 'Sophie says: "A ring is the most personal piece of jewelry. Consider how it catches the light in your everyday environment."',
  'diamond-necklaces': 'James recommends: "A diamond necklace should complement your neckline. Bring a photo of your favorite outfit to your consultation."',
  'diamond-earrings': 'Aria suggests: "Earrings frame the face. Consider your hairstyle and face shape when choosing a pair."',
  'diamond-bracelets': 'Sophie notes: "A bracelet should feel like a whisper on the wrist — present but never heavy."',
  'gold-rings': 'James says: "Gold rings are wonderfully versatile. They can be stacked, mixed, and worn every single day."',
  'gold-necklaces': 'Aria recommends: "Layer different lengths for a modern look. Start with a choker and add longer chains."',
  'gold-earrings': 'Sophie loves: "Gold earrings bring warmth to every skin tone. They\'re the perfect everyday luxury."',
  'gold-bracelets': 'James suggests: "A gold bracelet is an investment in daily joy. Choose one that makes you smile every time you see it."',
  'loose-diamonds': 'Aria says: "Choosing a loose diamond is an intimate experience. Let us show you how each stone tells its own story."',
  'wedding-bridal': 'Sophie recommends: "Your bridal jewelry should feel like an extension of you. Let\'s find pieces that capture your love story."',
}

const advisorNotes = [
  'A client favorite this season',
  'Pairs beautifully with gold',
  'Perfect for special occasions',
  'Timeless everyday elegance',
  'A wonderful gift choice',
  'Stunning in natural light',
]

const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest']

export function SalonCategory() {
  const params = useParams()
  const categorySlug = params.category as ProductCategory
  const products = getProductsByCategory(categorySlug)
  const categoryLabel = categoryLabels[categorySlug as keyof typeof categoryLabels] || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('Recommended')
  const [showFilters, setShowFilters] = useState(false)

  const sortedProducts = useMemo(() => {
    const sorted = [...products]
    if (sortBy === 'Price: Low to High') sorted.sort((a, b) => a.price - b.price)
    if (sortBy === 'Price: High to Low') sorted.sort((a, b) => b.price - a.price)
    return sorted
  }, [products, sortBy])

  const tip = advisorTips[categorySlug] || 'Our advisors are here to help you find the perfect piece.'

  return (
    <SalonLayout>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px' }}>
        <div style={{ display: 'flex', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.textSecondary }}>
          <Link href="/salon" style={{ color: S.textSecondary, textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/salon/collections" style={{ color: S.textSecondary, textDecoration: 'none' }}>Collections</Link>
          <span>/</span>
          <span style={{ color: S.text }}>{categoryLabel}</span>
        </div>
      </div>

      {/* Category header */}
      <section style={{ padding: '40px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>
            {categoryLabel}
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, lineHeight: 1.7 }}>
            Explore our curated collection, handpicked by our advisors.
          </p>
        </div>
      </section>

      {/* Advisor tip */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 40px' }}>
        <div style={{
          background: S.warmPanel, borderRadius: S.radiusLg, padding: '20px 28px',
          borderLeft: `4px solid ${S.accent}`,
          display: 'flex', alignItems: 'flex-start', gap: 16,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: `linear-gradient(135deg, ${S.accent}, ${S.accentHover})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontFamily: "'Cormorant Garamond', serif", color: '#fff',
          }}>
            💡
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', fontStyle: 'italic', color: S.textSecondary, lineHeight: 1.6, margin: 0 }}>
            {tip}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: S.textSecondary }}>
            {sortedProducts.length} pieces
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={() => setShowFilters(!showFilters)}
              style={{ background: 'none', border: `1px solid ${S.border}`, borderRadius: S.radiusSm, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.textSecondary, transition: 'all 0.3s' }}>
              <SlidersHorizontal size={14} /> Refine
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.radiusSm, padding: '8px 14px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.text, cursor: 'pointer', outline: 'none' }}>
              {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => setViewMode('grid')}
                style={{ background: viewMode === 'grid' ? S.accentSoft : 'none', border: `1px solid ${viewMode === 'grid' ? S.accent : S.border}`, borderRadius: S.radiusSm, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: viewMode === 'grid' ? S.accent : S.textSecondary, transition: 'all 0.3s' }}>
                <Grid size={16} />
              </button>
              <button onClick={() => setViewMode('list')}
                style={{ background: viewMode === 'list' ? S.accentSoft : 'none', border: `1px solid ${viewMode === 'list' ? S.accent : S.border}`, borderRadius: S.radiusSm, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: viewMode === 'list' ? S.accent : S.textSecondary, transition: 'all 0.3s' }}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
          gap: viewMode === 'grid' ? 24 : 16,
        }}>
          {sortedProducts.map((product, i) => (
            viewMode === 'grid' ? (
              <SalonRevealCard
                key={product.id}
                name={product.name}
                slug={product.slug}
                price={product.priceDisplay}
                image={product.images[0]}
                category={product.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                advisorNote={advisorNotes[i % advisorNotes.length]}
                isNew={i < 2}
              />
            ) : (
              <SalonCard
                key={product.id}
                name={product.name}
                subtitle={product.subtitle}
                price={product.priceDisplay}
                image={product.images[0]}
                href={`/salon/product/${product.slug}`}
                advisorNote={advisorNotes[i % advisorNotes.length]}
                advisorName={['Sophie', 'James', 'Aria'][i % 3]}
              />
            )
          ))}
        </div>
        {sortedProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: S.text, marginBottom: 12 }}>
              No pieces found in this collection
            </p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>
              Our advisors would love to help you find what you&apos;re looking for.
            </p>
            <SalonButton href="/salon/contact">Talk to an Advisor</SalonButton>
          </div>
        )}
      </section>
    </SalonLayout>
  )
}
