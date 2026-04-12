'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, PageHeader, ProductCard, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function BestsellersPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null
  const bestProducts = getBestsellers()

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Bestsellers"
        subtitle="Our most sought-after pieces, chosen by discerning collectors worldwide."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Bestsellers', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} concept={concept} index={i} />
          ))}
        </div>
      </div>
      <CTABanner
        concept={concept}
        title="Discover Your Signature Piece"
        description="Every bestseller tells a story. Let us help you find yours."
        ctaLabel={concept.ctaText.browse}
        ctaHref={buildConceptUrl(concept.id, 'collections')}
      />
    </ConceptLayout>
  )
}
