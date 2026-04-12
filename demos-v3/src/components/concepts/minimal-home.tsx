'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { collections } from '@/data/collections'
import { ConceptLayout } from '@/components/shared'
import { buildConceptUrl, buildProductUrl, buildCategoryUrl } from '@/lib/concept-utils'

/* ── Official Aceternity UI Components ── */
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { FocusCards } from '@/components/ui/focus-cards'
import { GlareCard } from '@/components/ui/glare-card'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import ColourfulText from '@/components/ui/colourful-text'

/* ── Official Magic UI Components ── */
import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { BorderBeam } from '@/components/ui/border-beam'
import { Marquee } from '@/components/ui/marquee'
import { MorphingText } from '@/components/ui/morphing-text'
import { NumberTicker } from '@/components/ui/number-ticker'
import { DotPattern } from '@/components/ui/dot-pattern'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity'

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
   Full viewport. MorphingText cycles through jewelry words.
   TextGenerateEffect for subtitle. DotPattern texture.
   BlurFade for staggered entrance.
   ═══════════════════════════════════════════════════════════════ */

function HeroSection({ concept }: { concept: ConceptConfig }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#fafafa' }}
    >
      {/* DotPattern — official Magic UI background texture */}
      <DotPattern
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] fill-neutral-300/30"
      />

      <motion.div
        className="relative z-10 mx-auto max-w-[1440px] w-full px-8 lg:px-16"
        style={{ y, opacity }}
      >
        <div className="pt-32 pb-16">
          {/* Micro-label with BlurFade */}
          <BlurFade delay={0.1} duration={0.6}>
            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-14">
              Est. 2024 — Vault Maison
            </p>
          </BlurFade>

          {/* MorphingText — official Magic UI — cycles through jewelry words */}
          <BlurFade delay={0.2} duration={0.8}>
            <div className="mb-6">
              <MorphingText
                texts={['JEWELRY', 'RINGS', 'NECKLACES', 'BRACELETS', 'EARRINGS', 'TIMEPIECES']}
                className="text-[clamp(4rem,13vw,11rem)] font-extralight tracking-[-0.04em] leading-[0.85] text-neutral-900"
              />
            </div>
          </BlurFade>

          {/* TextGenerateEffect — official Aceternity UI — subtitle */}
          <BlurFade delay={0.4} duration={0.6}>
            <div className="max-w-md mt-8">
              <TextGenerateEffect
                words="Nothing more. Nothing less. Only what matters."
                className="text-sm font-light tracking-wide leading-relaxed text-neutral-400"
                duration={0.6}
              />
            </div>
          </BlurFade>

          {/* Hairline rule */}
          <BlurFade delay={0.6} duration={0.8}>
            <div className="h-px w-full max-w-xs bg-neutral-200 mt-14" />
          </BlurFade>

          {/* CTA with ShimmerButton — official Magic UI */}
          <BlurFade delay={0.8} duration={0.6}>
            <div className="mt-10">
              <Link href={buildConceptUrl('minimal', 'collections')}>
                <ShimmerButton
                  shimmerColor="rgba(0,0,0,0.05)"
                  shimmerSize="0.1em"
                  background="rgba(0,0,0,0.02)"
                  borderRadius="2px"
                  className="text-[11px] uppercase tracking-[0.2em] font-light text-neutral-600 px-8 py-3"
                >
                  View Collection
                </ShimmerButton>
              </Link>
            </div>
          </BlurFade>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-300">Scroll</span>
        <motion.div
          className="w-px h-6 bg-neutral-300"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — SCROLL VELOCITY MARQUEE
   Official Magic UI ScrollVelocityContainer + ScrollVelocityRow.
   Text speeds up/slows down based on scroll velocity.
   ═══════════════════════════════════════════════════════════════ */

function VelocityMarqueeSection() {
  return (
    <section className="py-4 border-t border-b border-neutral-100 overflow-hidden bg-white">
      <ScrollVelocityContainer>
        <ScrollVelocityRow baseVelocity={-2}>
          <span className="text-[clamp(2rem,5vw,4rem)] font-extralight tracking-[-0.02em] text-neutral-100 mx-8 whitespace-nowrap">
            Rings &nbsp;·&nbsp; Necklaces &nbsp;·&nbsp; Bracelets &nbsp;·&nbsp; Earrings &nbsp;·&nbsp; Timepieces &nbsp;·&nbsp; Bespoke &nbsp;·&nbsp;
          </span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={1.5}>
          <span className="text-[clamp(0.7rem,1.5vw,1rem)] font-light tracking-[0.3em] uppercase text-neutral-200 mx-8 whitespace-nowrap">
            Crafted with intention &nbsp;&nbsp;&nbsp; Designed to last &nbsp;&nbsp;&nbsp; Nothing unnecessary &nbsp;&nbsp;&nbsp;
          </span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — EDITORIAL IMAGE WITH PARALLAX
   Full-width image with parallax scroll effect.
   ═══════════════════════════════════════════════════════════════ */

function EditorialParallaxSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.03, 1])

  return (
    <BlurFade delay={0.1} duration={0.8}>
      <section ref={ref} className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/9' }}>
            <motion.div
              className="absolute inset-[-10%] w-[120%] h-[120%]"
              style={{ y, scale }}
            >
              <Image
                src="/images/fine-jewelry-product.jpg"
                alt="Gold jewelry collection — bracelet, hoops, and layered chains on linen"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-300">
              SS26 Collection
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-300">
              01
            </p>
          </div>
        </div>
      </section>
    </BlurFade>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — FOCUS CARDS PRODUCT GRID
   Official Aceternity UI FocusCards.
   Hover one product → all others blur/dim.
   ═══════════════════════════════════════════════════════════════ */

function FocusProductSection() {
  const featured = getBestsellers().slice(0, 6)

  const focusCards = featured.map((product) => ({
    title: product.name,
    src: product.images[0],
  }))

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="flex items-center justify-between mb-14">
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400">
              Selected Pieces
            </h2>
            <Link
              href={buildConceptUrl('minimal', 'bestsellers')}
              className="text-[10px] uppercase tracking-[0.15em] text-neutral-300 hover:text-neutral-600 transition-colors duration-500"
            >
              View All →
            </Link>
          </div>
        </BlurFade>

        {/* FocusCards — official Aceternity UI */}
        <BlurFade delay={0.2} duration={0.8}>
          <FocusCards cards={focusCards} />
        </BlurFade>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — STATS WITH NUMBER TICKER
   Official Magic UI NumberTicker for animated counting.
   MagicCard with spotlight gradient for each stat.
   ═══════════════════════════════════════════════════════════════ */

function StatsSection() {
  const stats = [
    { value: 847, suffix: '+', label: 'Pieces Crafted' },
    { value: 12, suffix: '', label: 'Master Jewelers' },
    { value: 99.7, suffix: '%', label: 'Ethically Sourced' },
    { value: 42, suffix: '', label: 'Countries Shipped' },
  ]

  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.1 + i * 0.1} duration={0.6}>
              {/* MagicCard — official Magic UI — spotlight follows cursor */}
              <MagicCard
                className="p-8 lg:p-10 bg-white border border-neutral-100 cursor-pointer"
                gradientColor="rgba(0,0,0,0.03)"
                gradientSize={200}
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-extralight tracking-tight text-neutral-900 mb-2">
                    <NumberTicker value={stat.value} />
                    <span className="text-neutral-300">{stat.suffix}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    {stat.label}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — STICKY SCROLL REVEAL — BRAND STORY
   Official Aceternity UI StickyScroll.
   Left: scrolling text about craftsmanship.
   Right: sticky image that changes with each block.
   ═══════════════════════════════════════════════════════════════ */

function BrandStorySection() {
  const storyContent = [
    {
      title: 'Material Integrity',
      description:
        'Every piece begins with the selection of materials. We source only ethically mined diamonds and recycled precious metals, ensuring that beauty never comes at the cost of conscience. Our gemologists inspect each stone under 10x magnification before it enters our atelier.',
      content: (
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src="/images/diamond-facets-1.jpg"
            alt="Diamond facets close-up"
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      title: 'Precision Craft',
      description:
        'Our master jewelers work with tolerances measured in hundredths of a millimeter. Each setting is hand-finished, each prong individually shaped to hold its stone with the minimum metal necessary. The result is jewelry that appears to float — light passing through unobstructed.',
      content: (
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src="/images/jewelry-ring-closeup.jpg"
            alt="Ring craftsmanship detail"
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      title: 'Intentional Design',
      description:
        'We design by subtraction. Every curve, every angle, every proportion is questioned until only the essential remains. Our design philosophy is rooted in the belief that true luxury is not about excess — it is about the confidence to leave things out.',
      content: (
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src="/images/minimalist-jewelry.jpg"
            alt="Minimalist jewelry design"
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      title: 'Lasting Value',
      description:
        'Every piece is built to be worn daily for decades. We use solid gold — never plated, never filled. Our diamonds are certified by GIA or IGI. We offer lifetime maintenance because we believe in the things we make. This is jewelry designed to outlast trends.',
      content: (
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src="/images/gold-jewelry-collection.jpg"
            alt="Gold jewelry collection"
            fill
            className="object-cover"
          />
        </div>
      ),
    },
  ]

  return (
    <section className="bg-neutral-50">
      <BlurFade delay={0.1} duration={0.6}>
        <div className="pt-20 lg:pt-28 px-8 lg:px-16">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-4">
            Our Philosophy
          </h2>
        </div>
      </BlurFade>
      {/* StickyScroll — official Aceternity UI */}
      <StickyScroll content={storyContent} contentClassName="rounded-lg" />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — FEATURED PIECE WITH GLARE CARD + NEON GRADIENT
   Official Aceternity GlareCard for 3D tilt + glare.
   Official Magic UI NeonGradientCard for neon glow border.
   Official Magic UI BorderBeam for animated border.
   ═══════════════════════════════════════════════════════════════ */

function FeaturedPieceSection() {
  const featured = getBestsellers()[0]

  return (
    <section className="py-24 lg:py-36 bg-white">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* GlareCard — official Aceternity UI — 3D tilt with glare */}
          <BlurFade delay={0.1} duration={0.8} direction="left">
            <GlareCard className="w-full max-w-lg mx-auto">
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1">
                    The Statement Piece
                  </p>
                  <h3 className="text-xl font-light text-white tracking-wide">
                    {featured.name}
                  </h3>
                </div>
              </div>
            </GlareCard>
          </BlurFade>

          {/* Product details with NeonGradientCard border */}
          <BlurFade delay={0.3} duration={0.8} direction="right">
            <NeonGradientCard
              borderSize={1}
              borderRadius={4}
              neonColors={{ firstColor: '#d4af37', secondColor: '#f5e6cc' }}
              className="bg-white"
            >
              <div className="p-8 lg:p-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 mb-6">
                  Featured
                </p>
                <h2 className="text-3xl lg:text-4xl font-extralight tracking-[-0.02em] leading-[1.2] mb-6 text-neutral-900">
                  {featured.name}
                </h2>
                <p className="text-sm font-light leading-[1.9] text-neutral-400 mb-8">
                  {featured.description}
                </p>
                <div className="flex items-baseline gap-6 mb-10">
                  <span className="text-2xl font-extralight text-neutral-900">{featured.priceDisplay}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-300">
                    {featured.material}
                  </span>
                </div>
                {featured.diamondSpecs && (
                  <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-t border-b border-neutral-100">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Carat</p>
                      <p className="text-sm font-light text-neutral-700">{featured.diamondSpecs.carat}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Cut</p>
                      <p className="text-sm font-light text-neutral-700">{featured.diamondSpecs.cut}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Color</p>
                      <p className="text-sm font-light text-neutral-700">{featured.diamondSpecs.color}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Clarity</p>
                      <p className="text-sm font-light text-neutral-700">{featured.diamondSpecs.clarity}</p>
                    </div>
                  </div>
                )}
                <Link
                  href={buildProductUrl('minimal', featured.slug)}
                  className="group inline-flex items-center gap-4"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] font-light text-neutral-500 group-hover:text-neutral-900 transition-colors duration-500">
                    View Details
                  </span>
                  <span className="inline-block w-8 h-px bg-neutral-300 transition-all duration-500 group-hover:w-16 group-hover:bg-neutral-900" />
                </Link>
              </div>
            </NeonGradientCard>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — MARQUEE COLLECTIONS
   Official Magic UI Marquee for infinite scrolling collection cards.
   Each card uses MagicCard for spotlight effect.
   ═══════════════════════════════════════════════════════════════ */

function CollectionsMarqueeSection() {
  const CollectionCard = ({ collection }: { collection: typeof collections[0] }) => (
    <Link
      href={buildConceptUrl('minimal', `collection/${collection.id}`)}
      className="block w-[300px] lg:w-[380px] mx-3 flex-shrink-0"
    >
      <MagicCard
        className="bg-white border border-neutral-100 overflow-hidden cursor-pointer"
        gradientColor="rgba(0,0,0,0.03)"
        gradientSize={250}
      >
        <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2">
              {collection.subtitle}
            </p>
            <h3 className="text-lg font-light tracking-wide text-neutral-900">
              {collection.name}
            </h3>
          </div>
        </div>
      </MagicCard>
    </Link>
  )

  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <BlurFade delay={0.1} duration={0.6}>
        <div className="px-8 lg:px-16 mb-10">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400">
            Collections
          </h2>
        </div>
      </BlurFade>

      {/* Marquee — official Magic UI — infinite scrolling */}
      <Marquee pauseOnHover className="[--duration:40s]">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </Marquee>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9 — ANIMATED TESTIMONIALS
   Official Aceternity UI AnimatedTestimonials.
   Animated transitions between customer reviews.
   ═══════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'The craftsmanship is extraordinary. Every detail is considered, every edge is perfect. This is what jewelry should be.',
      name: 'Alexandra Chen',
      designation: 'Art Director, Milan',
      src: '/images/diamond-facets-1.jpg',
    },
    {
      quote: 'I have worn this ring every day for two years. It looks exactly as it did the day I received it. That is quality.',
      name: 'James Whitfield',
      designation: 'Architect, London',
      src: '/images/jewelry-ring-closeup.jpg',
    },
    {
      quote: 'Nothing unnecessary. Nothing missing. The design philosophy resonates with everything I believe about luxury.',
      name: 'Sofia Bergström',
      designation: 'Creative Director, Stockholm',
      src: '/images/minimalist-jewelry.jpg',
    },
    {
      quote: 'The packaging, the weight in your hand, the way light catches the stone — every moment is designed.',
      name: 'Marcus Tanaka',
      designation: 'Gallery Owner, Tokyo',
      src: '/images/fine-jewelry-necklace.jpg',
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <BlurFade delay={0.1} duration={0.6}>
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-12">
            Voices
          </h2>
        </BlurFade>

        {/* AnimatedTestimonials — official Aceternity UI */}
        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 — CATEGORIES WITH BORDER BEAM
   Numbered list with animated BorderBeam on hover.
   BlurFade staggered entrance.
   ═══════════════════════════════════════════════════════════════ */

function CategoriesSection() {
  const categories = [
    { label: 'Rings', slug: 'diamond-rings' as const },
    { label: 'Necklaces', slug: 'diamond-necklaces' as const },
    { label: 'Earrings', slug: 'diamond-earrings' as const },
    { label: 'Bracelets', slug: 'diamond-bracelets' as const },
    { label: 'Wedding & Bridal', slug: 'wedding-bridal' as const },
  ]

  return (
    <section className="py-24 lg:py-32 bg-neutral-50">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <BlurFade delay={0.1} duration={0.6}>
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-16">
            Categories
          </h2>
        </BlurFade>

        <div>
          {categories.map((cat, i) => (
            <BlurFade key={cat.slug} delay={0.15 + i * 0.08} duration={0.5} direction="left">
              <Link
                href={buildCategoryUrl('minimal', cat.slug)}
                className="group relative flex items-center justify-between py-6 border-t border-neutral-200 transition-colors hover:bg-white"
              >
                <div className="flex items-baseline gap-6 lg:gap-10">
                  <span className="text-[10px] tracking-[0.15em] font-light tabular-nums text-neutral-300 group-hover:text-neutral-500 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg lg:text-3xl font-extralight tracking-[-0.01em] text-neutral-800 group-hover:text-neutral-500 transition-colors duration-500">
                    {cat.label}
                  </span>
                </div>
                <span className="flex items-center gap-2 text-neutral-300 group-hover:text-neutral-600 transition-all duration-500">
                  <span className="text-[10px] uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0">
                    Explore
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-4px] group-hover:translate-x-0"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </BlurFade>
          ))}
          <div className="border-t border-neutral-200" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11 — NEWSLETTER WITH PLACEHOLDERS AND VANISH INPUT
   Official Aceternity UI PlaceholdersAndVanishInput.
   Cycling animated placeholders that vanish on submit.
   ═══════════════════════════════════════════════════════════════ */

function NewsletterSection() {
  return (
    <section className="py-28 lg:py-40 bg-white">
      <div className="mx-auto max-w-lg px-8 text-center">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="w-12 h-px mx-auto mb-12 bg-neutral-200" />
          <h2 className="text-xl font-extralight tracking-[-0.01em] mb-3 text-neutral-900">
            Stay informed.
          </h2>
          <p className="text-[11px] font-light leading-relaxed text-neutral-400 mb-12">
            New pieces, restocks, and nothing else.
          </p>
        </BlurFade>

        <BlurFade delay={0.2} duration={0.6}>
          {/* PlaceholdersAndVanishInput — official Aceternity UI */}
          <PlaceholdersAndVanishInput
            placeholders={[
              'Enter your email address',
              'Get notified about new arrivals',
              'Join our quiet community',
              'Be the first to know',
              'No spam. Ever.',
            ]}
            onChange={() => {}}
            onSubmit={(e) => { e.preventDefault() }}
          />
        </BlurFade>

        <BlurFade delay={0.3} duration={0.6}>
          <div className="w-12 h-px mx-auto mt-12 bg-neutral-200" />
        </BlurFade>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 12 — CLOSING STATEMENT
   "Nothing more." in massive ghost typography.
   ColourfulText on "more" for a subtle pop of color.
   ═══════════════════════════════════════════════════════════════ */

function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0.4])

  return (
    <section ref={ref} className="py-32 lg:py-44 overflow-hidden bg-white">
      <motion.div
        className="mx-auto max-w-[1440px] px-8 lg:px-16 text-center"
        style={{ scale, opacity }}
      >
        <p className="text-[clamp(2.5rem,9vw,8rem)] font-extralight tracking-[-0.04em] leading-[0.85]">
          <span className="text-neutral-200">Nothing </span>
          <ColourfulText text="more" />
          <span className="text-neutral-200">.</span>
        </p>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — MINIMAL HOME
   12 sections, each using genuine official UI components.
   ═══════════════════════════════════════════════════════════════ */

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <ConceptLayout concept={concept}>
      <HeroSection concept={concept} />
      <VelocityMarqueeSection />
      <EditorialParallaxSection />
      <FocusProductSection />
      <StatsSection />
      <BrandStorySection />
      <FeaturedPieceSection />
      <CollectionsMarqueeSection />
      <TestimonialsSection />
      <CategoriesSection />
      <NewsletterSection />
      <ClosingSection />
    </ConceptLayout>
  )
}
