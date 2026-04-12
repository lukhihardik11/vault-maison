'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { collections } from '@/data/collections'
import { ConceptLayout, FeaturedProducts, SplitSection, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { FlipWords } from '@/components/ui/flip-words'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { Marquee } from '@/components/ui/marquee'

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
      {/* Hero with split layout */}
      <section className="relative min-h-screen" style={{ backgroundColor: concept.palette.bg }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left: Content */}
          <div className="flex items-center px-8 lg:px-20 py-32">
            <div className="max-w-lg">
              <p
                className="text-[10px] uppercase tracking-[0.3em] mb-8 font-light"
                style={{ color: concept.palette.accent }}
              >
                The Modern Maison &middot; Est. 2026
              </p>

              <h1
                className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[0.02em] leading-[1.15] mb-4 ${concept.fonts.headingClass}`}
                style={{ color: concept.palette.text }}
              >
                The Definitive<br />
                Destination for
              </h1>
              <div className="mb-8">
                <FlipWords
                  words={["Fine Rings", "Necklaces", "Earrings", "Bracelets", "Timepieces"]}
                  className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[0.02em] ${concept.fonts.headingClass}`}
                  duration={2500}
                />
              </div>

              <p
                className={`text-sm font-light mb-10 leading-relaxed max-w-md ${concept.fonts.bodyClass}`}
                style={{ color: concept.palette.text, opacity: 0.5 }}
              >
                Vault Maison brings together the world&apos;s finest jewelry
                in one curated destination. Ethically sourced, expertly crafted, and
                presented with the care your investment deserves.
              </p>

              <div className="flex gap-4">
                <Link
                  href={buildConceptUrl('maison', 'collections')}
                  className="inline-block px-10 py-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: concept.palette.accent, color: '#fff' }}
                >
                  {concept.ctaText.browse}
                </Link>
                <Link
                  href={buildConceptUrl('maison', 'bespoke')}
                  className="inline-block px-10 py-4 text-[10px] uppercase tracking-[0.2em] border transition-all duration-300 hover:opacity-80"
                  style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
                >
                  {concept.ctaText.bespoke}
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative hidden lg:block">
            <Image
              src="/images/fine-jewelry-necklace.jpg"
              alt="Fine jewelry necklace"
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, ${concept.palette.bg}, transparent 30%)` }}
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-14" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Pieces Curated' },
              { value: '25+', label: 'Years of Excellence' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '50+', label: 'Countries Served' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className={`text-3xl lg:text-4xl font-light ${concept.fonts.headingClass}`}
                  style={{ color: concept.palette.accent }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mt-2"
                  style={{ color: concept.palette.text, opacity: 0.4 }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections strip */}
      <section className="py-20" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: concept.palette.accent, opacity: 0.6 }}>
                Curated
              </p>
              <h2
                className={`text-2xl font-light tracking-[0.04em] ${concept.fonts.headingClass}`}
                style={{ color: concept.palette.text }}
              >
                Our Collections
              </h2>
            </div>
            <Link
              href={buildConceptUrl('maison', 'collections')}
              className="text-[10px] uppercase tracking-[0.15em] opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: concept.palette.text }}
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {collections.slice(0, 5).map((col) => (
              <Link key={col.id} href={buildConceptUrl('maison', 'collections')} className="group block">
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: '800ms' }}
                    sizes="20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xs text-white font-light tracking-wide">{col.name}</h3>
                  </div>
                </div>
              </Link>
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

      {/* Editorial quote */}
      <section className="py-28 lg:py-36" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <div className="w-8 h-px mx-auto mb-8" style={{ backgroundColor: concept.palette.accent }} />
          <p
            className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            &ldquo;Every piece of jewelry tells a story of artistry and devotion, crafted under extraordinary care, waiting to become part of your legacy.&rdquo;
          </p>
          <div className="w-8 h-px mx-auto mt-8" style={{ backgroundColor: concept.palette.accent }} />
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="Ethically Sourced, Expertly Crafted"
        description="Every piece in our collection is sourced through transparent, ethical supply chains and crafted by master artisans with decades of experience. We combine traditional craftsmanship with modern precision to create pieces that are as responsible as they are beautiful."
        image="/images/jewelry-set-elegant.jpg"
        ctaLabel="Our Story"
        ctaHref={buildConceptUrl('maison', 'about')}
      />

      <FeaturedProducts
        concept={concept}
        products={newArrivals}
        title="New Arrivals"
        subtitle="Just added to our collection"
      />

      {/* Brand values marquee */}
      <section
        className="py-8"
        style={{
          borderTop: `1px solid ${concept.palette.muted}`,
          borderBottom: `1px solid ${concept.palette.muted}`,
        }}
      >
        <Marquee speed={30} className="[--gap:2rem]">
          {['GIA Certified', 'Ethically Sourced', 'Master Craftsmanship', 'Lifetime Warranty', 'Free Worldwide Shipping', 'Bespoke Service', 'Expert Consultation'].map((text) => (
            <span
              key={text}
              className="text-[10px] uppercase tracking-[0.3em] mx-8"
              style={{ color: concept.palette.text, opacity: 0.25 }}
            >
              {text}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Category Grid */}
      <div className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: concept.palette.accent, opacity: 0.5 }}>
            Explore
          </p>
          <h2
            className={`text-2xl font-light tracking-[0.04em] mb-12 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            Shop by Category
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      {/* Testimonials with InfiniteMovingCards */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: concept.palette.accent, opacity: 0.5 }}>
            Testimonials
          </p>
          <h2
            className={`text-2xl font-light tracking-[0.04em] mb-12 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            What Our Clients Say
          </h2>
          <InfiniteMovingCards
            items={testimonials}
            speed="slow"
            className="py-4"
          />
        </div>
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
