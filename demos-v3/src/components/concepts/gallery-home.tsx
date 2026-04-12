'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals, products } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { ParallaxScroll } from '@/components/ui/parallax-scroll'

export function GalleryHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 3)
  const newArrivals = getNewArrivals().slice(0, 4)
  const galleryImages = products.slice(0, 9).map((p) => p.images[0])

  return (
    <ConceptLayout concept={concept}>
      {/* Full-bleed editorial hero */}
      <section className="relative min-h-screen flex items-end" style={{ backgroundColor: concept.palette.bg }}>
        <div className="absolute inset-0">
          <Image
            src="/images/diamond-velvet-1.jpg"
            alt="Gallery"
            fill
            className="object-cover"
            style={{ opacity: 0.5 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${concept.palette.bg}, transparent 60%)` }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 pb-20 lg:pb-32 w-full">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-6"
              style={{ color: concept.palette.accent }}
            >
              Current Exhibition
            </p>
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.01em] leading-[1.05] mb-6 ${concept.fonts.headingClass}`}
              style={{ color: concept.palette.text }}
            >
              The Art of<br />
              <em className="italic">Brilliance</em>
            </h1>
            <p className="text-sm font-light max-w-md mb-10 leading-relaxed" style={{ color: concept.palette.text, opacity: 0.5 }}>
              A curated exhibition of extraordinary diamonds and fine jewelry,
              presented as works of art deserving of contemplation and reverence.
            </p>
            <Link
              href={buildConceptUrl('gallery', 'collections')}
              className="inline-block text-[10px] uppercase tracking-[0.2em] pb-1 transition-opacity hover:opacity-60"
              style={{ borderBottom: `1px solid ${concept.palette.accent}`, color: concept.palette.accent }}
            >
              Enter the Exhibition
            </Link>
          </div>
        </div>
      </section>

      {/* Exhibition marquee */}
      <section className="py-6 overflow-hidden" style={{ borderBottom: `1px solid ${concept.palette.muted}` }}>
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {['Now Showing', 'The Art of Brilliance', 'Curated Collection', 'By Appointment', 'Private Viewings Available', 'Limited Exhibition', 'Now Showing', 'The Art of Brilliance', 'Curated Collection', 'By Appointment', 'Private Viewings Available', 'Limited Exhibition'].map((text, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.3em]" style={{ color: concept.palette.text, opacity: 0.2 }}>
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* Editorial grid - asymmetric layout */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-12" style={{ color: concept.palette.text, opacity: 0.4 }}>
            Featured Works
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large feature */}
            <div className="lg:col-span-7">
              <Link href={buildConceptUrl('gallery', `product/${featured[0].slug}`)} className="group block">
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={featured[0].images[0]}
                    alt={featured[0].name}
                    fill
                    className="object-cover transition-transform group-hover:scale-[1.02]"
                    style={{ transitionDuration: '1200ms' }}
                    sizes="60vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className={`text-lg font-light tracking-[0.02em] ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
                    {featured[0].name}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>{featured[0].subtitle}</p>
                  <p className="text-sm mt-2" style={{ color: concept.palette.accent }}>{featured[0].priceDisplay}</p>
                </div>
              </Link>
            </div>

            {/* Stacked features */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {featured.slice(1).map((p) => (
                <Link key={p.id} href={buildConceptUrl('gallery', `product/${p.slug}`)} className="group block">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      style={{ transitionDuration: '1200ms' }}
                      sizes="40vw"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className={`text-sm font-light ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>{p.name}</h3>
                    <p className="text-xs mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>{p.priceDisplay}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <p className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            &ldquo;Like a museum curator selecting works for an exhibition, we choose each piece for its artistic merit, rarity, and emotional resonance.&rdquo;
          </p>
        </div>
      </section>

      {/* Gallery wall */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Gallery Wall
          </h2>
          <ParallaxScroll images={galleryImages} />
        </div>
      </section>

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Exhibition Rooms
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <FeaturedProducts
        concept={concept}
        products={newArrivals}
        title="New Acquisitions"
        subtitle="Recently added to our permanent collection"
      />

      <Testimonial
        concept={concept}
        quote="Walking through the Gallery collection is like visiting a world-class museum. Each piece is presented with such reverence and context — it transforms the act of buying jewelry into an artistic experience."
        author="Isabella Fontaine"
        title="Art Director, Vogue Paris"
      />

      <CTABanner
        concept={concept}
        title="Schedule a Private Viewing"
        description="Experience the collection in our gallery space, guided by our curators."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('gallery', 'contact')}
      />
    </ConceptLayout>
  )
}
