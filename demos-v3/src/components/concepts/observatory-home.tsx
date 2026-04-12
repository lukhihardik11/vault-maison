'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, products } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'

function DataTicker({ items }: { items: { label: string; value: string }[] }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIdx((i) => (i + 1) % items.length), 3000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="font-ibm-plex text-[10px] tracking-[0.15em] uppercase" style={{ opacity: 0.6 }}>
      <span>{items[idx].label}: {items[idx].value}</span>
    </div>
  )
}

export function ObservatoryHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)
  const totalCarats = products.reduce((sum, p) => {
    if (!p.diamondSpecs?.carat) return sum
    const val = parseFloat(p.diamondSpecs.carat)
    return sum + (isNaN(val) ? 0 : val)
  }, 0)

  return (
    <ConceptLayout concept={concept}>
      {/* Hero with data overlay */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="absolute inset-0">
          <Image
            src="/images/diamond-bokeh-1.jpg"
            alt="Observatory"
            fill
            className="object-cover"
            style={{ opacity: 0.15 }}
            priority
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.03,
            backgroundImage: `linear-gradient(${concept.palette.text} 1px, transparent 1px), linear-gradient(90deg, ${concept.palette.text} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 py-32 w-full">
          <div>
            <p className="font-ibm-plex text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: concept.palette.accent }}>
              Observatory // Data-Driven Luxury
            </p>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.02em] leading-[1.1] mb-8 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
              Every Diamond<br />Has a Story<br />
              <span style={{ color: concept.palette.accent }}>in Data</span>
            </h1>
            <p className="font-ibm-plex text-xs max-w-md mb-12 leading-relaxed" style={{ color: concept.palette.text, opacity: 0.5 }}>
              We believe in radical transparency. Every stone in our collection is documented,
              measured, and analyzed with scientific precision. No mystery, no ambiguity — just data.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Pieces in Collection', value: products.length.toString() },
              { label: 'Total Carats', value: totalCarats > 0 ? Math.round(totalCarats).toString() : '42' },
              { label: 'Countries Sourced', value: '12' },
              { label: 'Master Gemologists', value: '8' },
            ].map((stat) => (
              <div key={stat.label} className="p-4" style={{ borderLeft: `2px solid ${concept.palette.accent}33` }}>
                <p className="font-ibm-plex text-2xl font-light" style={{ color: concept.palette.accent }}>
                  {stat.value}
                </p>
                <p className="font-ibm-plex text-[9px] uppercase tracking-[0.15em] mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={buildConceptUrl('observatory', 'collections')}
            className="inline-block font-ibm-plex px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-opacity hover:opacity-80"
            style={{ borderColor: concept.palette.accent, color: concept.palette.accent }}
          >
            Explore Dataset &rarr;
          </Link>
        </div>
      </section>

      {/* Bento Grid data dashboard */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-8 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Collection Dashboard
          </h2>
          <BentoGrid className="lg:grid-cols-4 gap-4">
            <BentoCard colSpan={2} className="p-6" style={{ backgroundColor: concept.palette.bg, border: `1px solid ${concept.palette.muted}` }}>
              <p className="font-ibm-plex text-[9px] uppercase tracking-[0.15em] mb-3" style={{ color: concept.palette.text, opacity: 0.4 }}>Average Metrics</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Avg. Carat', value: '1.42ct' },
                  { label: 'Clarity', value: 'VVS1-IF' },
                  { label: 'Color', value: 'D-F' },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-lg font-light" style={{ color: concept.palette.accent }}>{m.value}</p>
                    <p className="font-ibm-plex text-[8px] uppercase tracking-[0.1em] mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>{m.label}</p>
                  </div>
                ))}
              </div>
            </BentoCard>
            <BentoCard className="p-6" style={{ backgroundColor: concept.palette.bg, border: `1px solid ${concept.palette.muted}` }}>
              <p className="font-ibm-plex text-[9px] uppercase tracking-[0.15em] mb-3" style={{ color: concept.palette.text, opacity: 0.4 }}>Certification</p>
              <p className="text-3xl font-light" style={{ color: concept.palette.accent }}>100%</p>
              <p className="font-ibm-plex text-[8px] uppercase tracking-[0.1em] mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>GIA Certified</p>
            </BentoCard>
            <BentoCard className="p-6" style={{ backgroundColor: concept.palette.bg, border: `1px solid ${concept.palette.muted}` }}>
              <p className="font-ibm-plex text-[9px] uppercase tracking-[0.15em] mb-3" style={{ color: concept.palette.text, opacity: 0.4 }}>Ethical Score</p>
              <p className="text-3xl font-light" style={{ color: concept.palette.accent }}>98/100</p>
              <p className="font-ibm-plex text-[8px] uppercase tracking-[0.1em] mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>Sustainability Rating</p>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* Featured with data cards */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="font-ibm-plex text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: concept.palette.text, opacity: 0.4 }}>
                Collection Analysis
              </p>
              <h2 className={`text-xl font-light tracking-[0.05em] ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
                Top Performing Specimens
              </h2>
            </div>
            <DataTicker
              items={[
                { label: 'Avg. Carat', value: '1.42ct' },
                { label: 'Clarity Range', value: 'VVS1-IF' },
                { label: 'Color Range', value: 'D-F' },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Link key={p.id} href={buildConceptUrl('observatory', `product/${p.slug}`)} className="group block">
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: '800ms' }}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute top-3 left-3 font-ibm-plex text-[9px] tracking-[0.1em] px-2 py-1"
                    style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                  >
                    {p.id.slice(0, 8).toUpperCase()}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-light mb-1" style={{ color: concept.palette.text }}>{p.name}</h3>
                  {p.diamondSpecs && (
                    <p className="font-ibm-plex text-[9px] mb-1" style={{ color: concept.palette.text, opacity: 0.4 }}>
                      {p.diamondSpecs.carat}ct &middot; {p.diamondSpecs.clarity} &middot; {p.diamondSpecs.color}
                    </p>
                  )}
                  <p className="font-ibm-plex text-xs" style={{ color: concept.palette.accent }}>
                    {p.priceDisplay}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="Scientific Precision"
        description="Our gemologists use advanced spectroscopy, 3D scanning, and AI-assisted analysis to evaluate every stone. Each diamond's light performance is mapped across 17 parameters, giving you unprecedented insight into what makes your stone exceptional."
        image="/images/round-brilliant-diagram.jpg"
        ctaLabel="View Grading Process"
        ctaHref={buildConceptUrl('observatory', 'grading')}
      />

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Browse Categories
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <Testimonial
        concept={concept}
        quote="Finally, a jeweler that speaks my language. The level of data and transparency at Observatory is exactly what the industry needs. I knew exactly what I was buying."
        author="Dr. Marcus Webb"
        title="Materials Scientist & Collector"
      />

      <CTABanner
        concept={concept}
        title="Access the Full Dataset"
        description="Schedule a data-driven consultation with our gemologists."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('observatory', 'contact')}
      />
    </ConceptLayout>
  )
}
