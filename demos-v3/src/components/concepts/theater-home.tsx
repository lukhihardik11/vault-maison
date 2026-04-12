'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { Marquee } from '@/components/ui/marquee'

const heroSlides = [
  { image: '/images/jewelry-set-elegant.jpg', title: 'Act I', subtitle: 'The Discovery', desc: 'Deep within the earth, precious metals and gemstones await their transformation into art.' },
  { image: '/images/diamond-facets-1.jpg', title: 'Act II', subtitle: 'The Craft', desc: 'Master artisans reveal the fire within, facet by facet, in a performance of precision and artistry.' },
  { image: '/images/gold-jewelry-collection.jpg', title: 'Act III', subtitle: 'The Reveal', desc: 'The final masterpiece emerges — a symphony of light and metal, ready for its starring role.' },
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

  const slide = heroSlides[currentSlide]

  return (
    <ConceptLayout concept={concept}>
      {/* Cinematic hero - no framer-motion opacity, always visible */}
      <section className="relative h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        {/* Background image - always visible */}
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.subtitle}
            fill
            className="object-cover transition-opacity duration-1000"
            style={{ opacity: 0.45 }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-32">
          <div className="mx-auto max-w-[1440px] px-8 lg:px-16 w-full">
            <p
              className={`text-[10px] uppercase tracking-[0.35em] mb-4 ${concept.fonts.bodyClass}`}
              style={{ color: concept.palette.accent }}
            >
              {slide.title}
            </p>
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.02em] mb-4 ${concept.fonts.headingClass}`}
              style={{ color: concept.palette.accent }}
            >
              {slide.subtitle}
            </h2>
            <p className={`text-sm font-light max-w-md text-white/50 leading-relaxed ${concept.fonts.bodyClass}`}>
              {slide.desc}
            </p>

            {/* Slide indicators */}
            <div className="flex gap-4 mt-12">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="h-[2px] w-16 transition-colors duration-300"
                  style={{
                    backgroundColor: currentSlide === i ? concept.palette.accent : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic marquee */}
      <section className="py-5" style={{ backgroundColor: '#0a0a0a', borderBottom: `1px solid ${concept.palette.muted}` }}>
        <Marquee speed={25} className="[--gap:2rem]">
          {['Now Showing', 'The Jewelry Theater', 'Act I: Discovery', 'Act II: The Craft', 'Act III: The Reveal', 'Private Screenings Available'].map((text) => (
            <span
              key={text}
              className="text-[10px] uppercase tracking-[0.3em] mx-8 text-white/20"
            >
              {text}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Dramatic product showcase */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <p
            className={`text-[10px] uppercase tracking-[0.3em] mb-3 ${concept.fonts.bodyClass}`}
            style={{ color: concept.palette.accent, opacity: 0.5 }}
          >
            Now Showing
          </p>
          <h2
            className={`text-2xl font-light tracking-[0.04em] mb-16 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            The Main Stage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {featured.map((p) => (
              <Link key={p.id} href={buildConceptUrl('theater', `product/${p.slug}`)} className="group block relative overflow-hidden">
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
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="The Drama of Light"
        description="Every gemstone is a theater of light. Watch as photons enter the crown, dance between facets, and burst forth in a dazzling display of brilliance and fire. Our master artisans are the directors of this performance, shaping each piece to maximize the drama."
        image="/images/diamond-bokeh-1.jpg"
        ctaLabel="Behind the Scenes"
        ctaHref={buildConceptUrl('theater', 'craftsmanship')}
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
            Browse Scenes
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="The Theater experience is pure cinema. From the moment you arrive, you are immersed in a world where every piece of jewelry is the star of its own story."
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
