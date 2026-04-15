'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { getProduct } from '@/data/products'
import { ConceptLayout, ProductDetail } from '@/components/shared'
import { MinimalProductDetail } from '@/components/concepts/minimal/pages'
import { VaultProductDetail } from '@/components/concepts/vault/pages'
import { GalleryProductDetail } from '@/components/concepts/gallery/pages'
import { SalonProductDetail } from '@/components/concepts/salon/pages'
import { AtelierProductDetail } from '@/components/concepts/atelier/pages'
import { ArchiveProductDetail } from '@/components/concepts/archive/pages'
import { ObservatoryProductDetail } from '@/components/concepts/observatory/pages'

export default function ProductPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const product = getProduct(params.slug as string)

  if (!concept || !product) return null

  if (concept.id === 'minimal') return <MinimalProductDetail product={product} />
  if (concept.id === 'vault') return <VaultProductDetail product={product} />
  if (concept.id === 'gallery') return <GalleryProductDetail product={product} />
  if (concept.id === 'salon') return <SalonProductDetail />
  if (concept.id === 'atelier') return <AtelierProductDetail />
  if (concept.id === 'archive') return <ArchiveProductDetail />
  if (concept.id === 'observatory') return <ObservatoryProductDetail />

  return (
    <ConceptLayout concept={concept}>
      <ProductDetail product={product} concept={concept} />
    </ConceptLayout>
  )
}
