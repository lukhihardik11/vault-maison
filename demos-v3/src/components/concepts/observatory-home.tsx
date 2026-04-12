'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, products } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

function DataTicker({ items }: { items: { label: string; value: string }[] }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIdx((i) => (i + 1) % items.length), 3000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="font-ibm-plex text-[10px] tracking-[0.15em] uppercase opacity-60">
      <motion.span key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        {items[idx].label}: {items[idx].value}
      </motion.span>
    </div>
  )
}

export function ObservatoryHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)
  const totalCarats = products.reduce((sum, p) => sum + (p.diamondSpecs?.carat ? parseFloat(p.diamondSpecs.carat) : 0), 0)

  const stats = [
    { label: 'Pieces in Collection', value: String(products.length) },
    { label: 'Total Carats', value: totalCarats.toFixed(1) },
    { label: 'Countries Sourced', value: '12' },
    { label: 'Master Gemologists', value: '8' },
  ]

  return (
    <ConceptLayout concept={concept}>
      {/* Hero with data overlay */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="absolute inset-0">
          <Image
            src="/images/diamond-bokeh-1.jpg"
            alt="Observatory"
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${concept.palette.text} 1px, transparent 1px), linear-gradient(90deg, ${concept.palette.text} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 py-32 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <p className="font-ibm-plex text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: concept.palette.accent }}>
              Observatory // Data-Driven Luxury
            </p>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.02em] leading-[1.1] mb-8 ${concept.fonts.headingClass}`}>
              Every Diamond<br />Has a Story<br />
              <span style={{ color: concept.palette.accent }}>in Data</span>
            </h1>
            <p className="font-ibm-plex text-xs opacity-50 max-w-md mb-12 leading-relaxed">
              We believe in radical transparency. Every stone in our collection is documented,
              measured, and analyzed with scientific precision. No mystery, no ambiguity — just data.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="p-4"
                  style={{ borderLeft: `2px solid ${concept.palette.accent}33` }}
                >
                  <p className="font-ibm-plex text-2xl font-light" style={{ color: concept.palette.accent }}>
                    {stat.value}
                  </p>
                  <p className="font-ibm-plex text-[9px] uppercase tracking-[0.15em] opacity-40 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link
              href={buildConceptUrl('observatory', 'collections')}
              className="inline-block font-ibm-plex px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-opacity hover:opacity-80"
              style={{ borderColor: concept.palette.accent, color: concept.palette.accent }}
            >
              Explore Dataset →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured with data cards */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="font-ibm-plex text-[10px] tracking-[0.2em] uppercase opacity-40 mb-2">
                Collection Analysis
              </p>
              <h2 className={`text-xl font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
                Top Performing Specimens
              </h2>
            </div>
            <DataTicker
              items={[
                { label: 'Avg. Carat', value: '1.42ct' },
                { label: 'Clarity Range', value: 'VVS1–IF' },
                { label: 'Color Range', value: 'D–F' },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link href={buildConceptUrl('observatory', `product/${p.slug}`)} className="group block">
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
                  <h3 className="text-xs font-light mb-1">{p.name}</h3>
                  {p.diamondSpecs && (
                    <p className="font-ibm-plex text-[9px] opacity-40 mb-1">
                      {p.diamondSpecs.carat}ct · {p.diamondSpecs.clarity} · {p.diamondSpecs.color}
                    </p>
                  )}
                  <p className="font-ibm-plex text-xs" style={{ color: concept.palette.accent }}>
                    {p.priceDisplay}
                  </p>
                </Link>
              </motion.div>
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
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
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
