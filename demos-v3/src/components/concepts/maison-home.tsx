'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { collections, type Collection } from '@/data/collections'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export function MaisonHome({ concept }: { concept: ConceptConfig }) {
  const bestsellers = getBestsellers().slice(0, 4)
  const newArrivals = getNewArrivals().slice(0, 4)

  return (
    <ConceptLayout concept={concept}>
      {/* Polished hero with split layout */}
      <section className="relative min-h-screen" style={{ backgroundColor: concept.palette.bg }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left: Content */}
          <div className="flex items-center px-6 lg:px-16 py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="max-w-lg"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: concept.palette.accent }}>
                Vault Maison · Fine Jewelry
              </p>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.02em] leading-[1.1] mb-6 ${concept.fonts.headingClass}`}>
                The Definitive<br />
                Destination for<br />
                <span style={{ color: concept.palette.accent }}>Fine Jewelry</span>
              </h1>
              <p className="text-sm font-light opacity-50 mb-10 leading-relaxed">
                Vault Maison brings together the world&apos;s finest diamonds and jewelry
                in one curated destination. Ethically sourced, expertly crafted, and
                presented with the care your investment deserves.
              </p>
              <div className="flex gap-4">
                <Link
                  href={buildConceptUrl('maison', 'collections')}
                  className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                  style={{ backgroundColor: concept.palette.accent, color: '#fff' }}
                >
                  {concept.ctaText.browse}
                </Link>
                <Link
                  href={buildConceptUrl('maison', 'bespoke')}
                  className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-opacity hover:opacity-80"
                  style={{ borderColor: concept.palette.muted }}
                >
                  {concept.ctaText.bespoke}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <Image
              src="/images/diamond-velvet-1.jpg"
              alt="Vault Maison"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Collections strip */}
      <section className="py-16" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-lg font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
              Our Collections
            </h2>
            <Link
              href={buildConceptUrl('maison', 'collections')}
              className="text-[10px] uppercase tracking-[0.15em] opacity-60 hover:opacity-100 transition-opacity"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {collections.slice(0, 5).map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link href={buildConceptUrl('maison', `collections`)} className="group block">
                  <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src={col.heroImage}
                      alt={col.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      style={{ transitionDuration: '800ms' }}
                      sizes="20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-xs text-white font-light">{col.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts
        concept={concept}
        products={bestsellers}
        title="Bestsellers"
        subtitle="Our most coveted pieces"
      />

      <SplitSection
        concept={concept}
        title="Ethically Sourced, Expertly Crafted"
        description="Every diamond in our collection is sourced through transparent, ethical supply chains and crafted by master artisans with decades of experience. We combine traditional craftsmanship with modern precision to create pieces that are as responsible as they are beautiful."
        image="/images/diamond-collection-1.jpg"
        ctaLabel="Our Story"
        ctaHref={buildConceptUrl('maison', 'about')}
      />

      <FeaturedProducts
        concept={concept}
        products={newArrivals}
        title="New Arrivals"
        subtitle="Just added to our collection"
      />

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
            Shop by Category
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="Vault Maison is everything a modern jewelry house should be — beautiful, transparent, and deeply committed to quality. My engagement ring is absolutely perfect."
        author="Sarah Mitchell"
        title="Maison Client, New York"
      />

      <CTABanner
        concept={concept}
        title="Visit Our Showroom"
        description="Experience the Maison collection in person."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('maison', 'contact')}
      />
    </ConceptLayout>
  )
}
