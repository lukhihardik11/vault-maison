'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { MinimalAuthenticity } from '@/components/concepts/minimal/pages'

export default function AuthenticityPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />
  if (concept.id === 'minimal') return <MinimalAuthenticity />
  return (
    <InfoPage
      concept={concept}
      title="Authenticity Guarantee"
      subtitle="Every piece is verified, certified, and guaranteed authentic."
      sections={[
        { title: 'Our Promise', content: 'Every item sold through Vault Maison is guaranteed to be 100% authentic. We work exclusively with certified suppliers and verify every piece through our rigorous authentication process before it reaches you.' },
        { title: 'Certification', content: 'All diamonds above 0.30ct are accompanied by GIA or AGS certificates. Colored gemstones include certification from GIA, Gübelin, or SSEF. All precious metals are independently assayed and hallmarked to international standards.' },
        { title: 'Verification', content: 'Each piece includes a unique authentication code and digital certificate. You can verify the authenticity of your piece at any time through our secure online portal.' },
        { title: 'Guarantee', content: 'If any item purchased from Vault Maison is found to be inauthentic or misrepresented, we will issue a full refund including all shipping costs. This guarantee has no time limit.' },
      ]}
    />
  )
}
