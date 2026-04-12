'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { collections } from '@/data/collections'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { TextReveal } from '@/components/ui/text-reveal'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BlurFade } from '@/components/ui/blur-fade'
import { Marquee } from '@/components/ui/marquee'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'

const testimonials = [
  { quote: 'Vault Maison is everything a modern jewelry house should be — beautiful, transparent, and deeply committed to quality.', name: 'Sarah Mitchell', title: 'Client, New York' },
  { quote: 'My engagement ring is absolutely perfect. The craftsmanship and attention to detail exceeded every expectation.', name: 'Emily Rodriguez', title: 'Client, Los Angeles' },
  { quote: 'The bespoke experience was extraordinary. They brought my vision to life with precision and artistry.', name: 'James Chen', title: 'Collector, Singapore' },
  { quote: 'From selection to delivery, every touchpoint felt personal and considered. True luxury.', name: 'Amara Okafor', title: 'Client, London' },
]

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
                {/* 21st.dev: MagneticButton */}
                <MagneticButton>
                  <Link
                    href={buildConceptUrl('maison', 'collections')}
                    className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                    style={{ backgroundColor: concept.palette.accent, color: '#fff' }}
                  >
                    {concept.ctaText.browse}
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href={buildConceptUrl('maison', 'bespoke')}
                    className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-opacity hover:opacity-80"
                    style={{ borderColor: concept.palette.muted }}
                  >
                    {concept.ctaText.bespoke}
                  </Link>
                </MagneticButton>
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

      {/* Stats bar with NumberTicker */}
      <section className="py-12" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 10000, suffix: '+', label: 'Diamonds Curated' },
              { value: 25, suffix: '+', label: 'Years of Excellence' },
              { value: 98, suffix: '%', label: 'Client Satisfaction' },
              { value: 50, suffix: '+', label: 'Countries Served' },
            ].map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.1}>
                <div>
                  <p className={`text-3xl lg:text-4xl font-light ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent }}>
                    {/* Magic UI: NumberTicker */}
                    <NumberTicker value={stat.value} delay={0.3 + i * 0.1} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mt-2">{stat.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Collections strip */}
      <section className="py-16" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <BlurFade>
              <h2 className={`text-lg font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
                Our Collections
              </h2>
            </BlurFade>
            <Link
              href={buildConceptUrl('maison', 'collections')}
              className="text-[10px] uppercase tracking-[0.15em] opacity-60 hover:opacity-100 transition-opacity"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {collections.slice(0, 5).map((col, i) => (
              <BlurFade key={col.id} delay={i * 0.08}>
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
              </BlurFade>
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

      {/* Magic UI: TextReveal */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <TextReveal
            text="Every diamond tells a story of billions of years, formed deep within the earth under extraordinary pressure and heat, waiting to be discovered and transformed into a piece of enduring beauty."
            className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed ${concept.fonts.headingClass}`}
            revealColor={concept.palette.text}
          />
        </div>
      </section>

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

      {/* Brand marquee */}
      <section className="py-8" style={{ borderTop: `1px solid ${concept.palette.muted}`, borderBottom: `1px solid ${concept.palette.muted}` }}>
        {/* Magic UI: Marquee */}
        <Marquee speed={60}>
          {['GIA Certified', 'Ethically Sourced', 'Master Craftsmanship', 'Lifetime Warranty', 'Free Worldwide Shipping', 'Bespoke Service', 'Expert Consultation'].map((text) => (
            <span key={text} className="text-[10px] uppercase tracking-[0.3em] opacity-30 mx-8 whitespace-nowrap">
              {text}
            </span>
          ))}
        </Marquee>
      </section>

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <BlurFade>
            <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
              Shop by Category
            </h2>
          </BlurFade>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      {/* Aceternity: InfiniteMovingCards */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mb-8">
          <BlurFade>
            <h2 className={`text-xl font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
              What Our Clients Say
            </h2>
          </BlurFade>
        </div>
        <InfiniteMovingCards
          items={testimonials}
          speed="slow"
          textColor={concept.palette.text}
          accentColor={concept.palette.accent}
        />
      </section>

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
