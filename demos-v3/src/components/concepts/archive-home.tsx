'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export function ArchiveHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 4)

  const timeline = [
    { year: '3000 BC', event: 'First gemstones discovered and treasured by ancient civilizations' },
    { year: '1375', event: 'Guild of gem cutters established in Nuremberg' },
    { year: '1477', event: 'Archduke Maximilian commissions the first diamond engagement ring' },
    { year: '1866', event: 'Diamonds discovered in South Africa, transforming the global market' },
    { year: '1919', event: 'Marcel Tolkowsky publishes ideal cut proportions' },
    { year: '2024', event: 'Vault Maison opens its Archive — a living record of jewelry heritage' },
  ]

  return (
    <ConceptLayout concept={concept}>
      {/* Heritage hero with aged texture */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="absolute inset-0">
          <Image
            src="/images/moody-jewelry-1.jpg"
            alt="Jewelry archive"
            fill
            className="object-cover"
            style={{ opacity: 0.2, filter: 'sepia(0.3)' }}
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-8 lg:px-16 py-32 w-full">
          <div className="max-w-2xl">
            <p
              className={`text-[10px] uppercase tracking-[0.35em] mb-8 ${concept.fonts.bodyClass}`}
              style={{ color: concept.palette.accent }}
            >
              The Archive &middot; Provenance &amp; Heritage
            </p>
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.02em] leading-[1.1] mb-6 ${concept.fonts.headingClass}`}
              style={{ color: concept.palette.text }}
            >
              Every Jewel<br />
              Carries <em className="italic" style={{ color: concept.palette.accent }}>History</em>
            </h1>
            <p
              className={`text-sm font-light mb-10 leading-relaxed max-w-lg ${concept.fonts.bodyClass}`}
              style={{ color: concept.palette.text, opacity: 0.5 }}
            >
              The Archive is dedicated to the provenance and heritage of extraordinary jewelry.
              Here, every piece comes with its full story — from the earth to your hand,
              documented and authenticated across generations.
            </p>
            <Link
              href={buildConceptUrl('archive', 'collections')}
              className="inline-block px-10 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
              style={{ backgroundColor: concept.palette.accent, color: '#fff' }}
            >
              {concept.ctaText.browse}
            </Link>
          </div>
        </div>
      </section>

      {/* Archive stats */}
      <section className="py-14" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '5,000+', label: 'Years of Jewelry History' },
              { value: '150+', label: 'Documented Specimens' },
              { value: '12', label: 'Source Countries' },
              { value: '100%', label: 'Verified Provenance' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className={`text-3xl lg:text-4xl font-light ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent }}>
                  {stat.value}
                </p>
                <p className={`text-[10px] uppercase tracking-[0.2em] mt-2 ${concept.fonts.bodyClass}`} style={{ color: concept.palette.text, opacity: 0.4 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <p className={`text-[10px] uppercase tracking-[0.3em] mb-3 ${concept.fonts.bodyClass}`} style={{ color: concept.palette.accent, opacity: 0.5 }}>
            Heritage Timeline
          </p>
          <h2
            className={`text-2xl font-light tracking-[0.04em] mb-16 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            A History of Brilliance
          </h2>
          <div className="relative">
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: concept.palette.muted }}
            />
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex items-center mb-14 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <p className={`text-2xl font-light ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent, opacity: 0.5 }}>
                    {item.year}
                  </p>
                </div>
                <div
                  className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
                  style={{ backgroundColor: concept.palette.accent }}
                />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <p className={`text-lg font-light md:hidden mb-1 ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent, opacity: 0.5 }}>
                    {item.year}
                  </p>
                  <p className={`text-sm font-light leading-relaxed ${concept.fonts.bodyClass}`} style={{ color: concept.palette.text, opacity: 0.6 }}>
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-28 lg:py-36" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-4xl px-8 lg:px-12 text-center">
          <div className="w-8 h-px mx-auto mb-10" style={{ backgroundColor: concept.palette.muted }} />
          <p
            className={`text-2xl md:text-3xl lg:text-[2.5rem] font-light leading-relaxed ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            &ldquo;Knowing the complete history of a jewel — from the mine to the cutting house — gives it a meaning that transcends its material value. Provenance is the soul of every extraordinary gem.&rdquo;
          </p>
          <div className="w-8 h-px mx-auto mt-10" style={{ backgroundColor: concept.palette.muted }} />
        </div>
      </section>

      <FeaturedProducts
        concept={concept}
        products={featured}
        title="Documented Specimens"
        subtitle="Each with verified provenance and complete history"
      />

      <SplitSection
        concept={concept}
        title="Authenticated Heritage"
        description="Every piece in the Archive comes with a comprehensive provenance document tracing its journey from mine to market. Our authentication process involves independent verification, historical research, and gemological analysis to ensure that the story behind each piece is as genuine as the piece itself."
        image="/images/diamond-display.jpg"
        ctaLabel="Our Authentication Process"
        ctaHref={buildConceptUrl('archive', 'grading')}
      />

      <div className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <p className={`text-[10px] tracking-[0.3em] uppercase mb-3 ${concept.fonts.bodyClass}`} style={{ color: concept.palette.accent, opacity: 0.5 }}>
            Explore
          </p>
          <h2
            className={`text-2xl font-light tracking-[0.04em] mb-12 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            Browse the Archive
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="Knowing the complete history of my jewelry — from the mine in Botswana to the cutting house in Antwerp — gives it a meaning that transcends its material value."
        author="Lord Edward Ashworth"
        title="Archive Collector, London"
      />

      <CTABanner
        concept={concept}
        title="Explore the Archive"
        description="Discover pieces with extraordinary stories."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('archive', 'contact')}
      />
    </ConceptLayout>
  )
}
