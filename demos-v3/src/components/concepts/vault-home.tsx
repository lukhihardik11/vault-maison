'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { Spotlight } from '@/components/ui/spotlight-new'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Marquee } from '@/components/ui/marquee'

export function VaultHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 4)

  return (
    <ConceptLayout concept={concept}>
      {/* Hero - Spotlight effect with cinematic jewelry imagery */}
      <section
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: concept.palette.bg }}
      >
        {/* Background image with deep overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/moody-jewelry-1.jpg"
            alt="Luxury jewelry collection"
            fill
            className="object-cover"
            style={{ opacity: 0.25 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, transparent 0%, ${concept.palette.bg} 65%)`,
            }}
          />
        </div>

        {/* Spotlight sweep effect */}
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(43, 74%, 49%, .10) 0, hsla(43, 74%, 49%, .03) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(43, 74%, 49%, .06) 0, transparent 80%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(43, 74%, 49%, .04) 0, transparent 80%)"
          duration={8}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-8 font-light"
            style={{ color: concept.palette.accent, opacity: 0.7 }}
          >
            By Invitation Only
          </p>

          <h1
            className={`text-6xl md:text-8xl lg:text-[7rem] font-normal tracking-[0.08em] leading-none ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            THE{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37]"
            >
              VAULT
            </span>
          </h1>

          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>

          <p
            className="mt-6 text-[13px] tracking-[0.18em] font-light"
            style={{ color: concept.palette.text, opacity: 0.5 }}
          >
            Curated Fine Jewelry &middot; Exceptional Craftsmanship
          </p>

          <div className="mt-12 flex items-center justify-center gap-6">
            <Link
              href={buildConceptUrl('vault', 'collections')}
              className="inline-block px-12 py-4 text-[10px] uppercase tracking-[0.25em] border transition-all duration-500 hover:bg-[#D4AF37] hover:text-[#0A0A0A]"
              style={{ borderColor: concept.palette.accent, color: concept.palette.accent }}
            >
              {concept.ctaText.browse}
            </Link>
            <Link
              href={buildConceptUrl('vault', 'appointments')}
              className="inline-block px-12 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 hover:opacity-70"
              style={{ color: concept.palette.text, opacity: 0.4 }}
            >
              Book Viewing
            </Link>
          </div>
        </div>

        {/* Bottom scroll line */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#D4AF37]/30" />
          <p className="text-[8px] tracking-[0.4em] uppercase" style={{ color: concept.palette.text, opacity: 0.2 }}>
            Discover
          </p>
        </div>
      </section>

      {/* Marquee brand strip */}
      <section
        className="py-6 border-y"
        style={{ backgroundColor: concept.palette.surface, borderColor: concept.palette.muted }}
      >
        <Marquee className="[--duration:40s] [--gap:3rem]">
          {["Rings", "Necklaces", "Bracelets", "Earrings", "Timepieces", "Engagement", "Bespoke", "Heritage", "Haute Joaillerie", "Loose Stones"].map((item) => (
            <span
              key={item}
              className="text-[10px] tracking-[0.3em] uppercase font-light mx-8"
              style={{ color: concept.palette.text, opacity: 0.25 }}
            >
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Featured Acquisitions - 3D Card Effect */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: concept.palette.bg }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: concept.palette.accent, opacity: 0.6 }}>
                Curated Selection
              </p>
              <h2
                className={`text-3xl md:text-4xl font-normal tracking-[0.04em] ${concept.fonts.headingClass}`}
                style={{ color: concept.palette.text }}
              >
                Featured Acquisitions
              </h2>
            </div>
            <Link
              href={buildConceptUrl('vault', 'collections')}
              className="text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
              style={{ color: concept.palette.accent, opacity: 0.5 }}
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <Link key={p.id} href={buildConceptUrl('vault', `product/${p.slug}`)}>
                <CardContainer containerClassName="w-full">
                  <CardBody
                    className="relative group/card w-full h-auto rounded-none border p-0"
                    style={{ borderColor: concept.palette.muted }}
                  >
                    <CardItem translateZ="60" className="w-full">
                      <div className="aspect-[3/4] relative overflow-hidden" style={{ backgroundColor: concept.palette.surface }}>
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-700"
                        />
                      </div>
                    </CardItem>
                    <CardItem translateZ="30" className="w-full p-6">
                      <p className="text-[9px] tracking-[0.25em] uppercase opacity-25 mb-2" style={{ color: concept.palette.text }}>
                        {p.id.slice(0, 8).toUpperCase()}
                      </p>
                      <h3
                        className={`text-sm tracking-[0.04em] mb-1 ${concept.fonts.headingClass}`}
                        style={{ color: concept.palette.text }}
                      >
                        {p.name}
                      </h3>
                      <p className="text-[11px] font-light" style={{ color: concept.palette.text, opacity: 0.35 }}>
                        {p.subtitle}
                      </p>
                    </CardItem>
                    <CardItem translateZ="20" className="w-full px-6 pb-6">
                      <p className="text-sm font-light" style={{ color: concept.palette.accent }}>
                        {p.priceDisplay}
                      </p>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Split Section with jewelry image */}
      <SplitSection
        concept={concept}
        title="Uncompromising Standards"
        description="Every piece in The Vault has been hand-selected by our master jewelers. We examine thousands of creations to find the rare few that meet our exacting standards for design, craftsmanship, and brilliance."
        image="/images/jewelry-ring-closeup.jpg"
        ctaLabel="Our Craftsmanship"
        ctaHref={buildConceptUrl('vault', 'craftsmanship')}
      />

      {/* Category Grid */}
      <div className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: concept.palette.accent, opacity: 0.5 }}>
            Collections
          </p>
          <h2
            className={`text-2xl lg:text-3xl font-light tracking-[0.05em] mb-12 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            Browse by Category
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      {/* Testimonial */}
      <Testimonial
        concept={concept}
        quote="The Vault experience is unlike anything else in luxury jewelry. From the moment you enter, you know you are in the presence of something extraordinary."
        author="Victoria Chen"
        title="Private Collector, Hong Kong"
      />

      {/* CTA */}
      <CTABanner
        concept={concept}
        title="Request Private Access"
        description="Schedule an exclusive viewing with our gemologists and jewelry specialists."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('vault', 'contact')}
      />
    </ConceptLayout>
  )
}
