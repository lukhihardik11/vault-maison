'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, CategoryGrid, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalCollections } from '@/components/concepts/minimal/pages'
import { VaultCollections } from '@/components/concepts/vault/pages'
import { GalleryCollections } from '@/components/concepts/gallery/pages'

export default function CollectionsPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalCollections />
  if (concept.id === 'vault') return <VaultCollections />
  if (concept.id === 'gallery') return <GalleryCollections />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Collections"
        subtitle="Explore our curated categories of fine jewelry and exceptional diamonds."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Collections', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        <CategoryGrid concept={concept} />
      </div>
      <CTABanner
        concept={concept}
        title="Can't Find What You're Looking For?"
        description="Our gemologists can source any stone or create any design. Let us help you find the perfect piece."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
