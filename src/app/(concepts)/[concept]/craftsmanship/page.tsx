'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, SplitSection, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalCraftsmanship } from '@/components/concepts/minimal/pages'
import { TheaterCraftsmanship } from '@/components/concepts/theater/pages'
import { VaultCraftsmanship } from '@/components/concepts/vault/pages'
import { GalleryCraftsmanship } from '@/components/concepts/gallery/pages'
import { SalonCraftsmanship } from '@/components/concepts/salon/pages'
import { AtelierCraftsmanship } from '@/components/concepts/atelier/pages'
import { ArchiveCraftsmanship } from '@/components/concepts/archive/pages'
import { ObservatoryCraftsmanship } from '@/components/concepts/observatory/pages'
import { MarketplaceCraftsmanship } from '@/components/concepts/marketplace/pages'
import { MaisonCraftsmanship } from '@/components/concepts/maison/pages'

export default function CraftsmanshipPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalCraftsmanship />
  if (concept.id === 'vault') return <VaultCraftsmanship />
  if (concept.id === 'gallery') return <GalleryCraftsmanship />
  if (concept.id === 'salon') return <SalonCraftsmanship />
  if (concept.id === 'atelier') return <AtelierCraftsmanship />
  if (concept.id === 'archive') return <ArchiveCraftsmanship />
  if (concept.id === 'observatory') return <ObservatoryCraftsmanship />
  if (concept.id === 'theater') return <TheaterCraftsmanship />
  if (concept.id === 'marketplace') return <MarketplaceCraftsmanship />
  if (concept.id === 'maison') return <MaisonCraftsmanship />

  const techniques = [
    { title: 'Hand Setting', desc: 'Each stone is individually set by our master setters, ensuring perfect alignment and maximum brilliance. A single pavé ring may require 6-8 hours of meticulous work.' },
    { title: 'Lost Wax Casting', desc: 'We use the ancient lost wax technique to create complex forms with unparalleled precision. Each piece begins as a hand-carved wax model.' },
    { title: 'Hand Engraving', desc: 'Our engravers use traditional burins to create intricate patterns and inscriptions. This centuries-old art form adds a deeply personal touch to every piece.' },
    { title: 'Polishing', desc: 'The final finish is achieved through multiple stages of hand polishing, each using progressively finer compounds until a mirror-like surface is achieved.' },
  ]

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Craftsmanship"
        subtitle="Behind every piece lies hundreds of hours of skilled handwork, passed down through generations of master artisans."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Craftsmanship', href: '#' },
        ]}
      />

      <SplitSection
        concept={concept}
        title="The Human Touch"
        description="In an age of mass production, we remain committed to the art of handcrafting. Our atelier employs master jewelers with decades of experience, each specializing in techniques that cannot be replicated by machines. This dedication to human artistry is what gives each Vault Maison piece its soul."
        image="/images/diamond-facets-1.jpg"
      />

      {/* Techniques Grid */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-12 ${concept.fonts.headingClass}`}>
            Our Techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {techniques.map((tech, i) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="text-2xl font-light mb-3" style={{ color: concept.palette.accent, opacity: 0.3 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className={`text-sm uppercase tracking-[0.15em] font-medium mb-3 ${concept.fonts.headingClass}`}>
                  {tech.title}
                </h3>
                <p className="text-xs font-light leading-relaxed opacity-60">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        concept={concept}
        title="Quality at Every Stage"
        description="From the initial design sketch to the final polish, every piece passes through over 30 quality checkpoints. Our quality assurance team inspects each detail under 10x magnification, ensuring that every stone is perfectly set, every surface flawlessly finished, and every mechanism functions smoothly."
        image="/images/diamond-collection-1.jpg"
        reverse
      />

      <CTABanner
        concept={concept}
        title="Commission a Bespoke Piece"
        description="Experience our craftsmanship firsthand with a custom commission."
        ctaLabel="Start Your Design"
        ctaHref={buildConceptUrl(concept.id, 'bespoke')}
      />
    </ConceptLayout>
  )
}
