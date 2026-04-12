'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

const pressFeatures = [
  { publication: 'Vogue', title: 'The New Guard of Fine Jewelry: How Vault Maison is Redefining Luxury', date: 'March 2025', excerpt: 'In an era of mass production, Vault Maison stands as a beacon of genuine craftsmanship. Their approach to diamond sourcing and gold work is nothing short of revolutionary.' },
  { publication: 'Financial Times', title: 'Investment-Grade Diamonds: A New Asset Class', date: 'February 2025', excerpt: 'Vault Maison\'s transparent grading system and provenance documentation have set a new standard for diamond investment, attracting a new generation of collectors.' },
  { publication: 'Harper\'s Bazaar', title: 'The Bespoke Revolution: Custom Jewelry for the Modern Collector', date: 'January 2025', excerpt: 'Their bespoke service transforms the jewelry buying experience from transaction to collaboration, resulting in pieces that are as unique as their owners.' },
  { publication: 'Robb Report', title: 'Top 10 Jewelry Houses to Watch in 2025', date: 'December 2024', excerpt: 'Vault Maison earned its place on our list through an unwavering commitment to quality and an innovative approach to the luxury jewelry experience.' },
  { publication: 'Wallpaper*', title: 'Design Meets Desire: The Architecture of Vault Maison', date: 'November 2024', excerpt: 'The digital experience mirrors the physical: every interaction is considered, every detail intentional. This is what luxury e-commerce should look like.' },
  { publication: 'Town & Country', title: 'Engagement Ring Trends: What the Experts Predict', date: 'October 2024', excerpt: 'Vault Maison\'s master jewelers predict a return to classic solitaires with modern settings — pieces that honor tradition while embracing contemporary design.' },
]

const awards = [
  { title: 'Best Luxury E-Commerce Experience', org: 'Luxury Digital Awards', year: '2025' },
  { title: 'Excellence in Diamond Sourcing', org: 'Responsible Jewellery Council', year: '2024' },
  { title: 'Best Bespoke Service', org: 'UK Jewellery Awards', year: '2024' },
  { title: 'Innovation in Luxury Retail', org: 'Walpole British Luxury Awards', year: '2023' },
]

export default function PressPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Press & Media"
        subtitle="Featured in the world's most respected publications."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Press', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-12 pb-16 lg:pb-24">
        {/* Awards */}
        <div className="mb-16">
          <h2 className={`text-sm uppercase tracking-[0.15em] mb-6 ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent }}>
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5"
                style={{ border: `1px solid ${concept.palette.muted}` }}
              >
                <p className="text-xs font-medium mb-1">{award.title}</p>
                <p className="text-[10px] opacity-40">{award.org} · {award.year}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Press Features */}
        <h2 className={`text-sm uppercase tracking-[0.15em] mb-6 ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent }}>
          Featured In
        </h2>
        <div className="space-y-0">
          {pressFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="py-8 group cursor-pointer"
              style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: concept.palette.accent }}>
                    {feature.publication} · {feature.date}
                  </p>
                  <h3 className="text-sm font-light mb-3 group-hover:opacity-80 transition-opacity">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-light opacity-50 leading-relaxed">{feature.excerpt}</p>
                </div>
                <ExternalLink size={14} strokeWidth={1.5} className="opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0 mt-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Contact */}
        <div className="mt-16 p-8 text-center" style={{ backgroundColor: concept.palette.surface }}>
          <h3 className={`text-sm uppercase tracking-[0.15em] mb-3 ${concept.fonts.headingClass}`}>
            Media Inquiries
          </h3>
          <p className="text-xs font-light opacity-50 mb-4">
            For press inquiries, interview requests, and high-resolution imagery, please contact our communications team.
          </p>
          <p className="text-xs" style={{ color: concept.palette.accent }}>press@vaultmaison.com</p>
        </div>
      </div>
    </ConceptLayout>
  )
}
