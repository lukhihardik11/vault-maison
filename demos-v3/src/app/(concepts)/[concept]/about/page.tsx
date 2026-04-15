'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, SplitSection, Testimonial, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalAbout } from '@/components/concepts/minimal/pages'
import { TheaterAbout } from '@/components/concepts/theater/pages'
import { VaultAbout } from '@/components/concepts/vault/pages'
import { GalleryAbout } from '@/components/concepts/gallery/pages'
import { SalonAbout } from '@/components/concepts/salon/pages'
import { AtelierAbout } from '@/components/concepts/atelier/pages'
import { ArchiveAbout } from '@/components/concepts/archive/pages'
import { ObservatoryAbout } from '@/components/concepts/observatory/pages'
import { MarketplaceAbout } from '@/components/concepts/marketplace/pages'

export default function AboutPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalAbout />
  if (concept.id === 'vault') return <VaultAbout />
  if (concept.id === 'gallery') return <GalleryAbout />
  if (concept.id === 'salon') return <SalonAbout />
  if (concept.id === 'atelier') return <AtelierAbout />
  if (concept.id === 'archive') return <ArchiveAbout />
  if (concept.id === 'observatory') return <ObservatoryAbout />
  if (concept.id === 'theater') return <TheaterAbout />
  if (concept.id === 'marketplace') return <MarketplaceAbout />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Our Story"
        subtitle="A legacy of excellence in fine jewelry, built on generations of expertise and an unwavering commitment to perfection."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'About', href: '#' },
        ]}
      />
      <SplitSection
        concept={concept}
        title="Founded on Passion"
        description="Vault Maison was born from a simple belief: that every extraordinary diamond deserves an equally extraordinary setting. Our founders, third-generation gemologists, combined their deep knowledge of stones with a modern vision for luxury retail. Today, we continue that tradition, sourcing the finest diamonds and crafting pieces that transcend trends."
        image="/images/diamond-facets-1.jpg"
        ctaLabel="View Our Craftsmanship"
        ctaHref={buildConceptUrl(concept.id, 'craftsmanship')}
      />
      <SplitSection
        concept={concept}
        title="The Art of Selection"
        description="Every diamond in our collection is hand-selected by our master gemologists. We examine thousands of stones to find the rare few that meet our exacting standards. Each stone must exhibit exceptional brilliance, fire, and scintillation — qualities that can only be assessed by the trained eye and decades of experience."
        image="/images/diamond-collection-1.jpg"
        reverse
      />
      <Testimonial
        concept={concept}
        quote="Vault Maison represents the very best of what fine jewelry can be. Their commitment to quality is evident in every piece, every interaction, every detail."
        author="James Morrison"
        title="Editor, Luxury Watch & Jewelry Review"
      />
      <SplitSection
        concept={concept}
        title="Sustainable Luxury"
        description="We believe that true luxury must be responsible. Our diamonds are ethically sourced through established, transparent supply chains. We work exclusively with mines and cutting houses that adhere to the highest environmental and social standards, ensuring that every purchase supports positive change in the communities where our stones originate."
        image="/images/diamond-velvet-1.jpg"
        ctaLabel="Our Sustainability Commitment"
        ctaHref={buildConceptUrl(concept.id, 'sustainability')}
      />
      <CTABanner
        concept={concept}
        title="Experience Vault Maison"
        description="Schedule a private viewing to discover our collection in person."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
