'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, products } from '@/data/products'
import { ConceptLayout, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { GlowingBorder } from '@/components/ui/glowing-border'

function CountdownTimer({ concept }: { concept: ConceptConfig }) {
  const [time, setTime] = useState({ h: 23, m: 45, s: 12 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-3">
      {[
        { label: 'Hours', value: time.h },
        { label: 'Minutes', value: time.m },
        { label: 'Seconds', value: time.s },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div
            className="text-3xl md:text-4xl font-light tabular-nums px-5 py-3"
            style={{ backgroundColor: concept.palette.surface, color: concept.palette.accent }}
          >
            {String(unit.value).padStart(2, '0')}
          </div>
          <p className="text-[8px] uppercase tracking-[0.15em] mt-2" style={{ color: concept.palette.text, opacity: 0.4 }}>{unit.label}</p>
        </div>
      ))}
    </div>
  )
}

export function MarketplaceHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 4)
  const trending = products.filter((p) => p.isNew).slice(0, 3)

  return (
    <ConceptLayout concept={concept}>
      {/* Auction-style hero */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-8"
                style={{ backgroundColor: concept.palette.accent }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className={`text-[9px] uppercase tracking-[0.2em] font-medium ${concept.fonts.bodyClass}`} style={{ color: '#fff' }}>
                  Live Auction
                </span>
              </div>
              <h1
                className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[0.02em] leading-[1.1] mb-6 ${concept.fonts.headingClass}`}
                style={{ color: concept.palette.text }}
              >
                The Jewelry<br />
                <span style={{ color: concept.palette.accent }}>Marketplace</span>
              </h1>
              <p
                className={`text-sm font-light mb-10 leading-relaxed max-w-md ${concept.fonts.bodyClass}`}
                style={{ color: concept.palette.text, opacity: 0.5 }}
              >
                Exclusive access to rare and exceptional jewelry. Bid on one-of-a-kind pieces,
                explore curated lots, and acquire extraordinary items at market-driven prices.
              </p>
              <div className="mb-10">
                <p className={`text-[10px] uppercase tracking-[0.2em] mb-4 ${concept.fonts.bodyClass}`} style={{ color: concept.palette.text, opacity: 0.4 }}>
                  Current Auction Ends In
                </p>
                <CountdownTimer concept={concept} />
              </div>
              <div className="flex gap-4">
                <Link
                  href={buildConceptUrl('marketplace', 'collections')}
                  className="inline-block px-10 py-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: concept.palette.accent, color: '#fff' }}
                >
                  Browse Lots
                </Link>
                <Link
                  href={buildConceptUrl('marketplace', 'account')}
                  className="inline-block px-10 py-4 text-[10px] uppercase tracking-[0.2em] border transition-opacity hover:opacity-80"
                  style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
                >
                  Register to Bid
                </Link>
              </div>
            </div>

            {/* Featured lot with glowing border */}
            <div>
              {featured[0] && (
                <Link href={buildConceptUrl('marketplace', `product/${featured[0].slug}`)} className="group block">
                  <GlowingBorder glowColor={concept.palette.accent}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                      <Image
                        src={featured[0].images[0]}
                        alt={featured[0].name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        style={{ transitionDuration: '800ms' }}
                        sizes="50vw"
                      />
                      <div
                        className="absolute top-4 left-4 px-3 py-1.5 flex items-center gap-2"
                        style={{ backgroundColor: '#dc2626' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[9px] uppercase tracking-[0.15em] text-white font-medium">Live</span>
                      </div>
                    </div>
                  </GlowingBorder>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-light ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
                        {featured[0].name}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>Lot #{featured[0].id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.15em]" style={{ color: concept.palette.text, opacity: 0.4 }}>Current Bid</p>
                      <p className="text-xl font-light" style={{ color: concept.palette.accent }}>
                        {featured[0].priceDisplay}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Market stats */}
      <section className="py-12" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: '2,450', label: 'Active Lots' },
              { value: '18%', label: 'Average Savings' },
              { value: '12,000+', label: 'Registered Bidders' },
              { value: '340', label: 'Lots Sold This Week' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className={`text-2xl lg:text-3xl font-light ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent }}>
                  {stat.value}
                </p>
                <p className={`text-[10px] uppercase tracking-[0.15em] mt-1 ${concept.fonts.bodyClass}`} style={{ color: concept.palette.text, opacity: 0.4 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active lots grid */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <div className="flex items-center justify-between mb-14">
            <div>
              <p className={`text-[10px] uppercase tracking-[0.25em] mb-3 ${concept.fonts.bodyClass}`} style={{ color: concept.palette.accent, opacity: 0.5 }}>
                Active Lots
              </p>
              <h2 className={`text-2xl font-light tracking-[0.04em] ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
                Open for Bidding
              </h2>
            </div>
            <Link
              href={buildConceptUrl('marketplace', 'collections')}
              className="text-[10px] uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
              style={{ color: concept.palette.accent }}
            >
              View All Lots →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <Link key={p.id} href={buildConceptUrl('marketplace', `product/${p.slug}`)} className="group block">
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: '800ms' }}
                    sizes="25vw"
                  />
                  <div
                    className="absolute bottom-3 right-3 px-2 py-1 text-[8px] uppercase tracking-[0.1em]"
                    style={{ backgroundColor: concept.palette.accent, color: '#fff' }}
                  >
                    {3 + i * 2} bids
                  </div>
                </div>
                <p className="text-[9px] uppercase tracking-[0.1em] mb-1" style={{ color: concept.palette.text, opacity: 0.4 }}>
                  Lot #{p.id}
                </p>
                <h3 className="text-xs font-light mb-1" style={{ color: concept.palette.text }}>{p.name}</h3>
                <p className="text-sm" style={{ color: concept.palette.accent }}>{p.priceDisplay}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="Transparent Pricing"
        description="The Marketplace brings transparency to the jewelry market. Every lot starts at a fair opening price based on independent appraisal. Bidding is open and competitive, ensuring you pay exactly what the market determines — no markups, no mystery."
        image="/images/gold-diamond-jewelry.jpg"
        ctaLabel="How Bidding Works"
        ctaHref={buildConceptUrl('marketplace', 'faq')}
      />

      <div className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <p className={`text-[10px] tracking-[0.3em] uppercase mb-3 ${concept.fonts.bodyClass}`} style={{ color: concept.palette.accent, opacity: 0.5 }}>
            Explore
          </p>
          <h2 className={`text-2xl font-light tracking-[0.04em] mb-12 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Browse Categories
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="The Marketplace model is brilliant. I acquired a stunning 2-carat diamond ring at 15% below retail. The transparency and competitive bidding give me confidence in every purchase."
        author="Richard Tan"
        title="Jewelry Investor, Singapore"
      />

      <CTABanner
        concept={concept}
        title="Register for the Next Auction"
        description="Get early access to upcoming lots and exclusive previews."
        ctaLabel="Create Account"
        ctaHref={buildConceptUrl('marketplace', 'account')}
      />
    </ConceptLayout>
  )
}
