'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { minimal } from '../design-system'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { ArrowRight } from 'lucide-react'

const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/products/diamond-solitaire-ring.jpg',
  'diamond-necklaces': '/images/products/diamond-pendant-necklace.jpg',
  'diamond-earrings': '/images/products/classic-diamond-studs.jpg',
  'diamond-bracelets': '/images/products/diamond-tennis-bracelet.jpg',
  'gold-rings': '/images/products/gold-signet-ring.jpg',
  'gold-necklaces': '/images/products/gold-chain-necklace.jpg',
  'gold-earrings': '/images/products/gold-hoop-earrings.jpg',
  'gold-bracelets': '/images/products/gold-bangles-set.jpg',
  'loose-diamonds': '/images/products/loose-diamond-round.jpg',
  'wedding-bridal': '/images/products/classic-engagement-ring.jpg',
}

export function MinimalCollections() {
  return (
    <MinimalLayout>
      {/* Header */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <div>
            <span className={minimal.cn.label}>Vault Maison</span>
            <h1 className={`${minimal.cn.sectionHeadline} mt-3`}>Collections</h1>
            <p className={`${minimal.cn.body} mt-4 max-w-xl`}>
              Ten curated categories spanning diamonds, gold, and bridal — each piece crafted for timeless precision.
            </p>
          </div>
        </div>
      </section>

      <div className={minimal.cn.divider} />

      {/* Category Grid — no ScrollReveal to ensure images load reliably */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {allCategories.map((cat: ProductCategory) => {
              const count = getProductsByCategory(cat).length
              return (
                <div key={cat}>
                  <Link href={`/minimal/category/${cat}`} className="group block no-underline" style={{ color: '#050505' }}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#FAFAFA]">
                      <img
                        src={categoryImages[cat] || '/images/moody-jewelry-1.jpg'}
                        alt={categoryLabels[cat]}
                        loading="eager"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.7s ease-out',
                        }}
                        className="group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-lg font-medium tracking-tight text-[#050505]">
                          {categoryLabels[cat]}
                        </h3>
                        <span className={minimal.cn.label}>{count} pieces</span>
                      </div>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2 mb-3">
                        {categoryDescriptions[cat]}
                      </p>
                      <span className="text-[11px] uppercase tracking-[0.15em] text-[#050505] font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </MinimalLayout>
  )
}
