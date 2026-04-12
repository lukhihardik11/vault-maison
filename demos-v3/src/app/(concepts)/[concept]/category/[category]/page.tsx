'use client'

import { useParams } from 'next/navigation'
import { getConcept, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { ConceptLayout, ProductGrid, PageHeader } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function CategoryPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const category = params.category as ProductCategory

  if (!concept) return null

  const categoryProducts = getProductsByCategory(category)
  const label = categoryLabels[category] || category.replace(/-/g, ' ')
  const description = categoryDescriptions[category] || ''

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title={label}
        subtitle={description}
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Collections', href: buildConceptUrl(concept.id, 'collections') },
          { label: label, href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        <ProductGrid
          products={categoryProducts}
          concept={concept}
          showFilters
          columns={4}
        />
      </div>
    </ConceptLayout>
  )
}
