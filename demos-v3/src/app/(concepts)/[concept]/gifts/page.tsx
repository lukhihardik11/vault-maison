'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Gift, Heart, Star, Clock } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, PageHeader, ProductCard, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

const giftCategories = [
  { icon: Heart, title: 'For Her', description: 'Elegant pieces that speak to the heart. From diamond pendants to gold bracelets.', filter: 'diamond-necklaces' },
  { icon: Star, title: 'Milestone Gifts', description: 'Celebrate anniversaries, promotions, and life\'s greatest achievements.', filter: 'diamond-rings' },
  { icon: Gift, title: 'Under $5,000', description: 'Luxurious gifts that make a statement without compromise.', filter: 'gold-earrings' },
  { icon: Clock, title: 'Last Minute', description: 'In-stock pieces ready for immediate dispatch with express delivery.', filter: 'gold-bracelets' },
]

export default function GiftsPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null
  const featured = getBestsellers().slice(0, 4)

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Gift Guide"
        subtitle="Find the perfect expression of love, celebration, and appreciation."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Gift Guide', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        {/* Gift Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {giftCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={buildConceptUrl(concept.id, `category/${cat.filter}`)}
                className="block p-8 text-center transition-all hover:opacity-80"
                style={{ border: `1px solid ${concept.palette.muted}` }}
              >
                <cat.icon size={28} strokeWidth={0.8} className="mx-auto mb-4" style={{ color: concept.palette.accent }} />
                <h3 className={`text-sm uppercase tracking-[0.1em] mb-2 ${concept.fonts.headingClass}`}>
                  {cat.title}
                </h3>
                <p className="text-xs font-light opacity-50 leading-relaxed">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Gift Services */}
        <div className="mb-16 py-12" style={{ borderTop: `1px solid ${concept.palette.muted}`, borderBottom: `1px solid ${concept.palette.muted}` }}>
          <h2 className={`text-lg font-light tracking-[0.05em] mb-8 ${concept.fonts.headingClass}`}>
            Complimentary Gift Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Gift Wrapping', desc: 'Every piece arrives in our signature presentation box with hand-tied ribbon and a personalized message card.' },
              { title: 'Engraving', desc: 'Add a personal touch with complimentary engraving on select pieces. Up to 20 characters in your choice of font.' },
              { title: 'Gift Cards', desc: 'Let them choose their own treasure. Digital gift cards delivered instantly, physical cards shipped in presentation packaging.' },
            ].map((service) => (
              <div key={service.title}>
                <h3 className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: concept.palette.accent }}>
                  {service.title}
                </h3>
                <p className="text-xs font-light opacity-50 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Gift Picks */}
        <h2 className={`text-lg font-light tracking-[0.05em] mb-8 ${concept.fonts.headingClass}`}>
          Editor&apos;s Gift Picks
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} concept={concept} index={i} />
          ))}
        </div>
      </div>
      <CTABanner
        concept={concept}
        title="Need Help Choosing?"
        description="Our gift specialists are available for personalized recommendations."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
