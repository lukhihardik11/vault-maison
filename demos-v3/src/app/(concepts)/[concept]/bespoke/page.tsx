'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, SplitSection, Testimonial } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalBespoke } from '@/components/concepts/minimal/pages'
import { TheaterBespoke } from '@/components/concepts/theater/pages'
import { VaultBespoke } from '@/components/concepts/vault/pages'
import { GalleryBespoke } from '@/components/concepts/gallery/pages'
import { SalonBespoke } from '@/components/concepts/salon/pages'
import { AtelierBespoke } from '@/components/concepts/atelier/pages'
import { ArchiveBespoke } from '@/components/concepts/archive/pages'
import { ObservatoryBespoke } from '@/components/concepts/observatory/pages'
import { MarketplaceBespoke } from '@/components/concepts/marketplace/pages'

export default function BespokePage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const [formStep, setFormStep] = useState(0)

  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalBespoke />
  if (concept.id === 'vault') return <VaultBespoke />
  if (concept.id === 'gallery') return <GalleryBespoke />
  if (concept.id === 'salon') return <SalonBespoke />
  if (concept.id === 'atelier') return <AtelierBespoke />
  if (concept.id === 'archive') return <ArchiveBespoke />
  if (concept.id === 'observatory') return <ObservatoryBespoke />
  if (concept.id === 'theater') return <TheaterBespoke />
  if (concept.id === 'marketplace') return <MarketplaceBespoke />

  const steps = [
    { title: 'Consultation', desc: 'Share your vision with our design team. We listen to your desires, lifestyle, and aesthetic preferences to understand exactly what you seek.' },
    { title: 'Design', desc: 'Our master designers create detailed renderings and 3D models of your piece. You review and refine until every detail is perfect.' },
    { title: 'Stone Selection', desc: 'Our gemologists present a curated selection of stones that meet your specifications. Each is certified and hand-inspected.' },
    { title: 'Crafting', desc: 'Our artisans bring your design to life using time-honored techniques. Each piece requires 40-80 hours of meticulous handwork.' },
    { title: 'Delivery', desc: 'Your finished piece is presented in our signature packaging, accompanied by full certification and a lifetime care guarantee.' },
  ]

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Bespoke Design"
        subtitle="Commission a one-of-a-kind piece crafted exclusively for you. From concept to creation, every detail is yours to define."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Bespoke', href: '#' },
        ]}
      />

      {/* Process Steps */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-12 ${concept.fonts.headingClass}`}>
            The Bespoke Process
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className="text-3xl font-light mb-4"
                  style={{ color: concept.palette.accent, opacity: 0.3 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className={`text-sm uppercase tracking-[0.15em] font-medium mb-3 ${concept.fonts.headingClass}`}>
                  {step.title}
                </h3>
                <p className="text-xs font-light leading-relaxed opacity-60">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="Your Vision, Our Expertise"
        description="Whether you dream of a classic solitaire reimagined or an avant-garde statement piece, our design team has the skill and creativity to bring any vision to life. We have created engagement rings, anniversary gifts, family heirlooms, and red-carpet pieces for clients around the world."
        image="/images/diamond-velvet-2.jpg"
      />

      {/* Inquiry Form */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-2xl px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-2 text-center ${concept.fonts.headingClass}`}>
            Begin Your Commission
          </h2>
          <p className="text-xs font-light opacity-50 text-center mb-10">
            Tell us about your dream piece and we will be in touch within 24 hours.
          </p>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
              style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
            />
            <select
              className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
              style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
            >
              <option value="">Type of Piece</option>
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="earrings">Earrings</option>
              <option value="bracelet">Bracelet</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Describe your vision..."
              rows={5}
              className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none resize-none"
              style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
            />
            <select
              className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
              style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
            >
              <option value="">Budget Range</option>
              <option value="5-10k">$5,000 – $10,000</option>
              <option value="10-25k">$10,000 – $25,000</option>
              <option value="25-50k">$25,000 – $50,000</option>
              <option value="50-100k">$50,000 – $100,000</option>
              <option value="100k+">$100,000+</option>
            </select>
            <button
              type="submit"
              className="w-full py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
              style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      <Testimonial
        concept={concept}
        quote="The bespoke process was a dream. From the first sketch to the final reveal, every step was handled with such care and expertise. The ring exceeded everything I imagined."
        author="Alexandra Petrov"
        title="Bespoke Client, London"
      />
    </ConceptLayout>
  )
}
