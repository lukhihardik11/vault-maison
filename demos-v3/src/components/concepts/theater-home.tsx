'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

const heroSlides = [
  { image: '/images/diamond-dark-bg-1.jpg', title: 'Act I', subtitle: 'The Discovery', desc: 'Deep within the earth, carbon transforms under immense pressure into something extraordinary.' },
  { image: '/images/diamond-facets-1.jpg', title: 'Act II', subtitle: 'The Transformation', desc: 'Master cutters reveal the fire within, facet by facet, in a performance of precision and artistry.' },
  { image: '/images/diamond-velvet-1.jpg', title: 'Act III', subtitle: 'The Reveal', desc: 'The final masterpiece emerges — a symphony of light, ready for its starring role.' },
]

export function TheaterHome({ concept }: { concept: ConceptConfig }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const featured = getBestsellers().slice(0, 4)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ConceptLayout concept={concept}>
      {/* Cinematic hero with slide transitions */}
      <section className="relative h-screen overflow-hidden" style={{ backgroundColor: '#000' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].subtitle}
              fill
              className="object-cover"
              style={{ opacity: 0.5 }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: concept.palette.accent }}>
                  {heroSlides[currentSlide].title}
                </p>
                <h2 className={`text-4xl md:text-6xl font-light tracking-[0.02em] mb-4 text-white ${concept.fonts.headingClass}`}>
                  {heroSlides[currentSlide].subtitle}
                </h2>
                <p className="text-sm font-light opacity-50 max-w-md text-white leading-relaxed">
                  {heroSlides[currentSlide].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="flex gap-4 mt-12">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="relative h-[2px] w-16 overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {currentSlide === i && (
                    <motion.div
                      className="absolute inset-y-0 left-0"
                      style={{ backgroundColor: concept.palette.accent }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dramatic product showcase */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-4" style={{ color: concept.palette.accent }}>
            Now Showing
          </p>
          <h2 className={`text-2xl font-light tracking-[0.05em] mb-16 ${concept.fonts.headingClass}`}>
            The Main Stage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <Link href={buildConceptUrl('theater', `product/${p.slug}`)} className="group block relative overflow-hidden">
                  <div className="relative" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      style={{ transitionDuration: '1200ms' }}
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[9px] uppercase tracking-[0.2em] mb-2" style={{ color: concept.palette.accent }}>
                        {p.category}
                      </p>
                      <h3 className={`text-lg text-white font-light ${concept.fonts.headingClass}`}>
                        {p.name}
                      </h3>
                      <p className="text-xs text-white/50 mt-1">{p.priceDisplay}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="The Drama of Light"
        description="Every diamond is a theater of light. Watch as photons enter the crown, dance between facets, and burst forth in a dazzling display of brilliance and fire. Our master cutters are the directors of this performance, shaping each facet to maximize the drama."
        image="/images/diamond-bokeh-1.jpg"
        ctaLabel="Behind the Scenes"
        ctaHref={buildConceptUrl('theater', 'craftsmanship')}
      />

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
            Browse Scenes
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="The Theater experience is pure cinema. From the moment you arrive, you are immersed in a world where every diamond is the star of its own story."
        author="François Delacroix"
        title="Film Director & Collector"
      />

      <CTABanner
        concept={concept}
        title="Reserve Your Seat"
        description="Experience the Theater in our private screening room."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('theater', 'contact')}
      />
    </ConceptLayout>
  )
}
