'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export function AtelierHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 4)

  return (
    <ConceptLayout concept={concept}>
      {/* Warm, craft-focused hero */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative">
            <Image
              src="/images/diamond-velvet-2.jpg"
              alt="Atelier"
              fill
              className="object-cover"
              style={{ opacity: 0.6 }}
              priority
            />
          </div>
          <div />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
          <div className="ml-auto max-w-lg lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: concept.palette.accent }}>
                L&apos;Atelier · Est. 2024
              </p>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.02em] leading-[1.1] mb-6 ${concept.fonts.headingClass}`}>
                Where Craft<br />
                Meets <span style={{ color: concept.palette.accent }}>Soul</span>
              </h1>
              <p className="text-sm font-light opacity-50 mb-10 leading-relaxed">
                In our atelier, every piece begins as a conversation. We listen to your story,
                understand your vision, and translate it into jewelry that speaks your language.
                This is bespoke luxury at its most personal.
              </p>
              <div className="flex gap-4">
                <Link
                  href={buildConceptUrl('atelier', 'bespoke')}
                  className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                  style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                >
                  {concept.ctaText.bespoke}
                </Link>
                <Link
                  href={buildConceptUrl('atelier', 'collections')}
                  className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-opacity hover:opacity-80"
                  style={{ borderColor: concept.palette.muted }}
                >
                  {concept.ctaText.browse}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process showcase */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-4">Our Process</p>
          <h2 className={`text-xl font-light tracking-[0.05em] mb-16 ${concept.fonts.headingClass}`}>
            From Sketch to Masterpiece
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: '01', title: 'Consultation', desc: 'Share your vision over tea in our private salon. We listen, sketch, and dream together.' },
              { step: '02', title: 'Design', desc: 'Our designers create detailed renderings. You refine until every line is perfect.' },
              { step: '03', title: 'Creation', desc: 'Master artisans bring your design to life with 40-80 hours of handwork.' },
              { step: '04', title: 'Unveiling', desc: 'Your finished piece is presented in a private ceremony, a moment to treasure.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="text-3xl font-light mb-4" style={{ color: concept.palette.accent, opacity: 0.3 }}>
                  {item.step}
                </p>
                <h3 className={`text-sm uppercase tracking-[0.15em] font-medium mb-3 ${concept.fonts.headingClass}`}>
                  {item.title}
                </h3>
                <p className="text-xs font-light leading-relaxed opacity-60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts
        concept={concept}
        products={featured}
        title="Atelier Favorites"
        subtitle="Pieces our artisans are most proud of"
      />

      <SplitSection
        concept={concept}
        title="The Artisan's Hand"
        description="Every piece that leaves our atelier bears the invisible signature of the artisan who created it. We celebrate the human touch — the slight variations, the warmth of handwork, the soul that no machine can replicate. This is what makes each Vault Maison piece truly one of a kind."
        image="/images/diamond-facets-1.jpg"
        ctaLabel="Meet Our Artisans"
        ctaHref={buildConceptUrl('atelier', 'craftsmanship')}
      />

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
            Browse Collections
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="The Atelier experience was deeply personal. They didn't just make me a ring — they understood my story and translated it into something I'll treasure forever."
        author="Sophia Laurent"
        title="Bespoke Client, Paris"
      />

      <CTABanner
        concept={concept}
        title="Begin Your Bespoke Journey"
        description="Every masterpiece starts with a conversation."
        ctaLabel={concept.ctaText.bespoke}
        ctaHref={buildConceptUrl('atelier', 'bespoke')}
      />
    </ConceptLayout>
  )
}
