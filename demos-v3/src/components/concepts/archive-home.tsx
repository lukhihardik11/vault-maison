'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { BlurFade } from '@/components/ui/blur-fade'
import { TextReveal } from '@/components/ui/text-reveal'
import { NumberTicker } from '@/components/ui/number-ticker'
import { AnimatedBeam } from '@/components/ui/animated-beam'

export function ArchiveHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 4)

  const timeline = [
    { year: '3000 BC', event: 'First diamonds discovered in Indian river beds' },
    { year: '1375', event: 'Guild of diamond cutters established in Nuremberg' },
    { year: '1477', event: 'Archduke Maximilian gives first diamond engagement ring' },
    { year: '1866', event: 'Diamonds discovered in South Africa' },
    { year: '1919', event: 'Marcel Tolkowsky publishes ideal cut proportions' },
    { year: '2024', event: 'Vault Maison opens its Archive' },
  ]

  return (
    <ConceptLayout concept={concept}>
      {/* Heritage hero with aged texture */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="absolute inset-0">
          <Image
            src="/images/diamond-dark-bg-1.jpg"
            alt="Archive"
            fill
            className="object-cover"
            style={{ opacity: 0.2, filter: 'sepia(0.3)' }}
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 py-32 w-full">
          <BlurFade delay={0.2}>
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: concept.palette.accent }}>
                The Archive · Provenance & Heritage
              </p>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.02em] leading-[1.1] mb-6 ${concept.fonts.headingClass}`}>
                Every Stone<br />
                Carries <em className="italic" style={{ color: concept.palette.accent }}>History</em>
              </h1>
              <p className="text-sm font-light opacity-50 mb-10 leading-relaxed max-w-lg">
                The Archive is dedicated to the provenance and heritage of extraordinary gems.
                Here, every diamond comes with its full story — from the earth to your hand,
                documented and authenticated across generations.
              </p>
              <Link
                href={buildConceptUrl('archive', 'collections')}
                className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
              >
                {concept.ctaText.browse}
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Archive stats */}
      <section className="py-12" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 5000, suffix: '+', label: 'Years of Diamond History' },
              { value: 150, suffix: '+', label: 'Documented Specimens' },
              { value: 12, suffix: '', label: 'Source Countries' },
              { value: 100, suffix: '%', label: 'Verified Provenance' },
            ].map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.1}>
                <div>
                  <p className={`text-3xl lg:text-4xl font-light ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent }}>
                    <NumberTicker value={stat.value} delay={0.3 + i * 0.1} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mt-2">{stat.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline with AnimatedBeam */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <BlurFade>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-4">Heritage Timeline</p>
            <h2 className={`text-xl font-light tracking-[0.05em] mb-16 ${concept.fonts.headingClass}`}>
              A History of Brilliance
            </h2>
          </BlurFade>
          <div className="relative">
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{ backgroundColor: concept.palette.muted }}
            />
            {/* Magic UI: AnimatedBeam on timeline */}
            <AnimatedBeam
              color={concept.palette.accent}
              direction="vertical"
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            />
            {timeline.map((item, i) => (
              <BlurFade key={item.year} delay={i * 0.1}>
                <div
                  className={`relative flex items-center mb-12 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <p className="text-2xl font-light" style={{ color: concept.palette.accent, opacity: 0.5 }}>
                      {item.year}
                    </p>
                  </div>
                  <div
                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
                    style={{ backgroundColor: concept.palette.accent }}
                  />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <p className="text-lg font-light md:hidden mb-1" style={{ color: concept.palette.accent, opacity: 0.5 }}>
                      {item.year}
                    </p>
                    <p className="text-sm font-light opacity-60 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Magic UI: TextReveal */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <TextReveal
            text="Knowing the complete history of a diamond, from the mine to the cutting house, gives it a meaning that transcends its material value. Provenance is the soul of every extraordinary gem."
            className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed ${concept.fonts.headingClass}`}
            revealColor={concept.palette.text}
          />
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
        description="Every piece in the Archive comes with a comprehensive provenance document tracing its journey from mine to market. Our authentication process involves independent verification, historical research, and gemological analysis to ensure that the story behind each stone is as genuine as the stone itself."
        image="/images/diamond-facets-1.jpg"
        ctaLabel="Our Authentication Process"
        ctaHref={buildConceptUrl('archive', 'grading')}
      />

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <BlurFade>
            <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
              Browse the Archive
            </h2>
          </BlurFade>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="Knowing the complete history of my diamond — from the mine in Botswana to the cutting house in Antwerp — gives it a meaning that transcends its material value."
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
