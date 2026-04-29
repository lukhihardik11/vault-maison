'use client'

import { useParams } from 'next/navigation'
import { concepts, getConcept } from '@/data/concepts'
import { products, getBestsellers, getNewArrivals, getLimitedEditions } from '@/data/products'
import { ConceptLayout, ConceptHero, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

// Concept-specific home page components
import { VaultHome } from '@/components/concepts/vault-home'
import { ObservatoryHome } from '@/components/concepts/observatory-home'
import { GalleryHome } from '@/components/concepts/gallery-home'
import { AtelierHome } from '@/components/concepts/atelier-home'
import { SalonHome } from '@/components/concepts/salon-home'
import { ArchiveHome } from '@/components/concepts/archive-home'
import { MinimalHome } from '@/components/concepts/minimal-home'
import { TheaterHome } from '@/components/concepts/theater-home'
import { MarketplaceHome } from '@/components/concepts/marketplace-home'
import { MaisonHome } from '@/components/concepts/maison-home'

const conceptHomeMap: Record<string, React.ComponentType<{ concept: typeof concepts[0] }>> = {
  vault: VaultHome,
  observatory: ObservatoryHome,
  gallery: GalleryHome,
  atelier: AtelierHome,
  salon: SalonHome,
  archive: ArchiveHome,
  minimal: MinimalHome,
  theater: TheaterHome,
  marketplace: MarketplaceHome,
  maison: MaisonHome,
}

export default function ConceptHomePage() {
  const params = useParams()
  const conceptId = params.concept as string
  const concept = getConcept(conceptId)

  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />

  const HomeComponent = conceptHomeMap[conceptId]
  if (HomeComponent) {
    return <HomeComponent concept={concept} />
  }

  // Fallback: generic concept home
  return (
    <ConceptLayout concept={concept}>
      <ConceptHero concept={concept} />
      <FeaturedProducts
        concept={concept}
        products={getBestsellers()}
        title="Featured Pieces"
        subtitle="Our most coveted selections"
      />
      <SplitSection
        concept={concept}
        title="Crafted with Precision"
        description="Each piece in our collection represents the pinnacle of jewelry craftsmanship, combining centuries-old techniques with modern innovation."
        image="/images/diamond-facets-1.jpg"
        ctaLabel="Discover Our Process"
        ctaHref={buildConceptUrl(concept.id, 'craftsmanship')}
      />
      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl lg:text-2xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
            Browse by Category
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>
      <Testimonial
        concept={concept}
        quote="The attention to detail is extraordinary. Every facet, every setting, every finish speaks to a level of craftsmanship that is increasingly rare in today's world."
        author="Victoria Chen"
        title="Private Collector, Hong Kong"
      />
      <FeaturedProducts
        concept={concept}
        products={getNewArrivals()}
        title="New Arrivals"
        subtitle="Recently added to our collection"
      />
      <CTABanner
        concept={concept}
        title="Begin Your Journey"
        description="Schedule a private consultation with our gemologists to discover the perfect piece."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
