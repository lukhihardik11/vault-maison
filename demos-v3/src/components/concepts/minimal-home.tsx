'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, CategoryGrid, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)

  return (
    <ConceptLayout concept={concept}>
      {/* Brutalist hero - stark, typographic */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-32 w-full">
          <div>
            <h1 className={`text-6xl md:text-8xl lg:text-[10rem] font-light tracking-[-0.02em] leading-[0.9] mb-8 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
              DIAMONDS.
            </h1>
            <div className="flex items-end gap-8 mb-12">
              <div className="h-px flex-1" style={{ backgroundColor: concept.palette.text, opacity: 0.1 }} />
              <p className="text-xs font-light max-w-xs leading-relaxed" style={{ color: concept.palette.text, opacity: 0.4 }}>
                Nothing more. Nothing less.
              </p>
            </div>
            <Link
              href={buildConceptUrl('minimal', 'collections')}
              className="inline-block text-xs tracking-[0.1em] pb-1 transition-opacity hover:opacity-60"
              style={{ borderBottom: `1px solid ${concept.palette.text}`, color: concept.palette.text, opacity: 0.6 }}
            >
              View All &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Grid - clean, no frills */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: concept.palette.muted }}>
            {featured.map((p) => (
              <div key={p.id} style={{ backgroundColor: concept.palette.bg }}>
                <Link href={buildConceptUrl('minimal', `product/${p.slug}`)} className="group block p-6">
                  <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all"
                      style={{ transitionDuration: '800ms' }}
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xs font-light mb-1" style={{ color: concept.palette.text }}>{p.name}</h3>
                  <p className="text-xs" style={{ color: concept.palette.text, opacity: 0.4 }}>{p.priceDisplay}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="py-32" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: concept.palette.text, opacity: 0.5 }}>
            &ldquo;Perfection is achieved not when there is nothing more to add,
            but when there is nothing left to take away.&rdquo;
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] mt-6" style={{ color: concept.palette.text, opacity: 0.3 }}>
            Antoine de Saint-Exupery
          </p>
        </div>
      </section>

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <CTABanner
        concept={concept}
        title="Inquire"
        description=""
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('minimal', 'contact')}
      />
    </ConceptLayout>
  )
}
