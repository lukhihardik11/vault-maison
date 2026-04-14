'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, CheckoutFlow } from '@/components/shared'
import { MinimalCheckout } from '@/components/concepts/minimal/pages'
import { VaultCheckout } from '@/components/concepts/vault/pages'
import { GalleryCheckout } from '@/components/concepts/gallery/pages'
import { SalonCheckout } from '@/components/concepts/salon/pages'
import { AtelierCheckout } from '@/components/concepts/atelier/pages'

export default function CheckoutPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalCheckout />
  if (concept.id === 'vault') return <VaultCheckout />
  if (concept.id === 'gallery') return <GalleryCheckout />
  if (concept.id === 'salon') return <SalonCheckout />
  if (concept.id === 'atelier') return <AtelierCheckout />

  return (
    <ConceptLayout concept={concept} hideFooter>
      <CheckoutFlow concept={concept} />
    </ConceptLayout>
  )
}
