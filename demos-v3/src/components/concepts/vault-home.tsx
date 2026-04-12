'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export function VaultHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 4)

  return (
    <ConceptLayout concept={concept}>
      {/* Hero - content visible immediately, no animation gates */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: concept.palette.bg }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/diamond-dark-bg-1.jpg"
            alt="The Vault"
            fill
            className="object-cover"
            style={{ opacity: 0.3 }}
            priority
          />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent 0%, ${concept.palette.bg} 70%)` }} />
        </div>

        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-8 font-light relative z-10"
          style={{ color: concept.palette.text, opacity: 0.5 }}
        >
          By Invitation Only
        </p>
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.06em] relative z-10 ${concept.fonts.headingClass}`}
          style={{ color: concept.palette.accent }}
        >
          THE VAULT
        </h1>
        <div
          className="h-px mt-8 relative z-10"
          style={{ backgroundColor: concept.palette.accent, width: 80 }}
        />
        <p
          className="mt-6 text-[12px] tracking-[0.15em] font-light relative z-10"
          style={{ color: concept.palette.text, opacity: 0.6 }}
        >
          Curated Fine Jewelry &middot; Exceptional Diamonds
        </p>
        <div className="mt-10 relative z-10">
          <Link
            href={buildConceptUrl('vault', 'collections')}
            className="inline-block px-10 py-4 text-[10px] uppercase tracking-[0.2em] border transition-all hover:opacity-80"
            style={{ borderColor: concept.palette.accent, color: concept.palette.accent }}
          >
            {concept.ctaText.browse}
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-8 md:px-16" style={{ backgroundColor: concept.palette.bg }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-16" style={{ color: concept.palette.text, opacity: 0.3 }}>
          Featured Acquisitions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {featured.map((p) => (
            <Link key={p.id} href={buildConceptUrl('vault', `product/${p.slug}`)}>
              <div className="group relative overflow-hidden" style={{ backgroundColor: concept.palette.surface }}>
                <div className="aspect-[4/3] relative">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ transitionDuration: '1200ms' }}
                  />
                </div>
                <div className="p-8">
                  <p className="text-[10px] tracking-[0.25em] uppercase opacity-30 mb-2" style={{ color: concept.palette.text }}>
                    {p.id.slice(0, 8).toUpperCase()}
                  </p>
                  <h3 className={`text-lg tracking-[0.04em] mb-1 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
                    {p.name}
                  </h3>
                  <p className="text-[12px] font-light" style={{ color: concept.palette.text, opacity: 0.4 }}>{p.subtitle}</p>
                  <p className="text-sm mt-4 font-light" style={{ color: concept.palette.accent }}>
                    {p.priceDisplay}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href={buildConceptUrl('vault', 'collections')}
            className="inline-block px-10 py-4 text-[10px] uppercase tracking-[0.2em] border transition-all hover:opacity-80"
            style={{ borderColor: concept.palette.accent, color: concept.palette.accent }}
          >
            {concept.ctaText.browse}
          </Link>
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="Uncompromising Standards"
        description="Every diamond in The Vault has been hand-selected by our master gemologists. We examine thousands of stones to find the rare few that meet our exacting standards for brilliance, fire, and scintillation."
        image="/images/diamond-facets-1.jpg"
        ctaLabel="Our Craftsmanship"
        ctaHref={buildConceptUrl('vault', 'craftsmanship')}
      />

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl lg:text-2xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Browse by Category
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="The Vault experience is unlike anything else in luxury jewelry. From the moment you enter, you know you are in the presence of something extraordinary."
        author="Victoria Chen"
        title="Private Collector, Hong Kong"
      />

      <CTABanner
        concept={concept}
        title="Request Private Access"
        description="Schedule an exclusive viewing with our gemologists."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('vault', 'contact')}
      />
    </ConceptLayout>
  )
}
