'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { getNewArrivals } from '@/data/products'
import { ConceptLayout, PageHeader, ProductCard, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function NewArrivalsPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />
  const newProducts = getNewArrivals()

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="New Arrivals"
        subtitle="The latest additions to our collection. Discover pieces that define the season."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'New Arrivals', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {newProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} concept={concept} index={i} />
          ))}
        </div>
      </div>
      <CTABanner
        concept={concept}
        title="Be the First to Know"
        description="Register for early access to new collections and limited editions."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
