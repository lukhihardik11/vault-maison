'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalPrivacy } from '@/components/concepts/minimal/pages'
import { TheaterPrivacy } from '@/components/concepts/theater/pages'
import { VaultPrivacy } from '@/components/concepts/vault/pages'
import { GalleryPrivacy } from '@/components/concepts/gallery/pages'
import { SalonPrivacy } from '@/components/concepts/salon/pages'
import { AtelierPrivacy } from '@/components/concepts/atelier/pages'
import { ArchivePrivacy } from '@/components/concepts/archive/pages'
import { ObservatoryPrivacy } from '@/components/concepts/observatory/pages'
import { MarketplacePrivacy } from '@/components/concepts/marketplace/pages'

export default function PrivacyPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalPrivacy />
  if (concept.id === 'vault') return <VaultPrivacy />
  if (concept.id === 'gallery') return <GalleryPrivacy />
  if (concept.id === 'salon') return <SalonPrivacy />
  if (concept.id === 'atelier') return <AtelierPrivacy />
  if (concept.id === 'archive') return <ArchivePrivacy />
  if (concept.id === 'observatory') return <ObservatoryPrivacy />
  if (concept.id === 'theater') return <TheaterPrivacy />
  if (concept.id === 'marketplace') return <MarketplacePrivacy />
  return (
    <InfoPage
      concept={concept}
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      sections={[
        { title: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email address, shipping address, and payment information when you make a purchase or create an account. We also collect certain information automatically, including your IP address, browser type, and browsing behavior on our site.' },
        { title: 'How We Use Your Information', content: 'We use your information to process orders, communicate with you about your purchases, improve our services, and send you marketing communications (with your consent). We never sell your personal information to third parties.' },
        { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information, including SSL encryption, secure payment processing, and restricted access to personal data. Our systems are regularly audited and updated to maintain the highest security standards.' },
        { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information at any time. You may also opt out of marketing communications. To exercise these rights, please contact our privacy team at privacy@vaultmaison.com.' },
      ]}
    />
  )
}
