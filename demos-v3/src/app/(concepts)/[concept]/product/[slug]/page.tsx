'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { getProduct } from '@/data/products'
import { ConceptLayout, ProductDetail } from '@/components/shared'
import { MinimalProductDetail } from '@/components/concepts/minimal/pages'
import { VaultProductDetail } from '@/components/concepts/vault/pages'

export default function ProductPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const product = getProduct(params.slug as string)

  if (!concept || !product) return null

  if (concept.id === 'minimal') return <MinimalProductDetail product={product} />
  if (concept.id === 'vault') return <VaultProductDetail product={product} />

  return (
    <ConceptLayout concept={concept}>
      <ProductDetail product={product} concept={concept} />
    </ConceptLayout>
  )
}
