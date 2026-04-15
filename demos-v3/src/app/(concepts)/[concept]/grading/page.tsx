'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalGrading } from '@/components/concepts/minimal/pages'
import { TheaterGrading } from '@/components/concepts/theater/pages'
import { VaultGrading } from '@/components/concepts/vault/pages'
import { GalleryGrading } from '@/components/concepts/gallery/pages'
import { SalonGrading } from '@/components/concepts/salon/pages'
import { AtelierGrading } from '@/components/concepts/atelier/pages'
import { ArchiveGrading } from '@/components/concepts/archive/pages'
import { ObservatoryGrading } from '@/components/concepts/observatory/pages'

export default function GradingPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalGrading />
  if (concept.id === 'vault') return <VaultGrading />
  if (concept.id === 'gallery') return <GalleryGrading />
  if (concept.id === 'salon') return <SalonGrading />
  if (concept.id === 'atelier') return <AtelierGrading />
  if (concept.id === 'archive') return <ArchiveGrading />
  if (concept.id === 'observatory') return <ObservatoryGrading />
  if (concept.id === 'theater') return <TheaterGrading />
  return (
    <InfoPage
      concept={concept}
      title="Diamond Grading"
      subtitle="Understanding how diamonds are evaluated and certified."
      sections={[
        { title: 'The 4Cs', content: 'Every diamond is evaluated on four fundamental characteristics: Cut (how well the diamond is shaped and faceted), Clarity (the absence of inclusions and blemishes), Color (the degree to which a diamond is colorless), and Carat Weight (the diamond\'s weight). Together, these determine a diamond\'s quality and value.' },
        { title: 'Cut Quality', content: 'Cut is the most important factor in a diamond\'s beauty. A well-cut diamond reflects light internally from one facet to another, then disperses it through the top. Our diamonds are selected for Excellent or Ideal cut grades, ensuring maximum brilliance and fire.' },
        { title: 'Clarity Scale', content: 'FL (Flawless) — No inclusions or blemishes visible under 10x magnification\nIF (Internally Flawless) — No inclusions visible under 10x magnification\nVVS1-VVS2 (Very Very Slightly Included) — Inclusions difficult to see under 10x\nVS1-VS2 (Very Slightly Included) — Minor inclusions under 10x\nSI1-SI2 (Slightly Included) — Inclusions noticeable under 10x' },
        { title: 'Color Scale', content: 'D-F: Colorless — The rarest and most valuable\nG-J: Near Colorless — Excellent value, face-up colorless\nK-M: Faint Color — Slight warmth visible\n\nVault Maison specializes in D-G color diamonds for our set pieces, and D-J for our loose diamond collection.' },
        { title: 'Certification', content: 'All diamonds above 0.30 carats are independently certified by GIA (Gemological Institute of America) or AGS (American Gem Society). These certificates provide an unbiased assessment of the diamond\'s characteristics and serve as your guarantee of quality.' },
      ]}
      ctaTitle="Speak With a Gemologist"
      ctaDescription="Our experts can help you understand diamond quality."
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
