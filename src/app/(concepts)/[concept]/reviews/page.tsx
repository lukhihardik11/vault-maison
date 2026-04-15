'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

const reviews = [
  { name: 'Alexandra M.', location: 'London, UK', rating: 5, product: 'Celestial Solitaire Ring', date: 'March 2025', text: 'Absolutely breathtaking. The diamond catches light in the most extraordinary way. My fiancée was speechless. The entire experience from consultation to delivery was impeccable.' },
  { name: 'James W.', location: 'New York, USA', rating: 5, product: 'Heritage Gold Chain', date: 'February 2025', text: 'The weight and quality of the gold is immediately apparent. This is genuine craftsmanship. I\'ve purchased from many luxury houses and this stands apart in both quality and service.' },
  { name: 'Sophie L.', location: 'Paris, France', rating: 5, product: 'Eternal Diamond Pendant', date: 'January 2025', text: 'I purchased this as a gift for my mother\'s 60th birthday. The presentation, the quality, the personal touch — everything exceeded expectations. She wears it every day.' },
  { name: 'David K.', location: 'Dubai, UAE', rating: 5, product: 'Sovereign Gold Cuff', date: 'December 2024', text: 'A statement piece that draws compliments everywhere I go. The craftsmanship is evident in every detail. The bespoke sizing service ensured a perfect fit.' },
  { name: 'Isabella R.', location: 'Milan, Italy', rating: 5, product: 'Lumière Diamond Studs', date: 'November 2024', text: 'These studs are perfection. The brilliance of the diamonds is remarkable — they sparkle in even the softest light. Beautifully packaged and delivered with care.' },
  { name: 'Michael T.', location: 'Singapore', rating: 5, product: 'Bespoke Engagement Ring', date: 'October 2024', text: 'The bespoke process was a joy from start to finish. The designers understood my vision perfectly and created something truly unique. My partner was overwhelmed with emotion.' },
  { name: 'Charlotte H.', location: 'Sydney, Australia', rating: 5, product: 'Radiance Tennis Bracelet', date: 'September 2024', text: 'I\'ve been searching for the perfect tennis bracelet for years. This one is it. The diamonds are perfectly matched and the clasp is secure yet elegant. Worth every penny.' },
  { name: 'Robert P.', location: 'Toronto, Canada', rating: 4, product: 'Atlas Gold Signet Ring', date: 'August 2024', text: 'Excellent quality and beautiful design. The engraving service added a wonderful personal touch. Delivery was slightly delayed but the team kept me informed throughout.' },
]

export default function ReviewsPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Client Reviews"
        subtitle="Hear from those who have experienced our craftsmanship firsthand."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Reviews', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-12 pb-16 lg:pb-24">
        {/* Summary */}
        <div className="text-center mb-12 py-8" style={{ borderBottom: `1px solid ${concept.palette.muted}` }}>
          <p className={`text-4xl font-light mb-2 ${concept.fonts.headingClass}`} style={{ color: concept.palette.accent }}>
            {avgRating}
          </p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} fill={concept.palette.accent} color={concept.palette.accent} />
            ))}
          </div>
          <p className="text-xs font-light opacity-50">Based on {reviews.length} verified reviews</p>
        </div>

        {/* Reviews List */}
        <div className="space-y-0">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="py-8"
              style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={11}
                      fill={s < review.rating ? concept.palette.accent : 'transparent'}
                      color={concept.palette.accent}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <span className="text-[10px] opacity-30">{review.date}</span>
              </div>
              <p className="text-sm font-light leading-relaxed opacity-70 mb-4">{review.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">{review.name}</p>
                  <p className="text-[10px] opacity-40">{review.location}</p>
                </div>
                <p className="text-[10px] opacity-40 italic">Purchased: {review.product}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <CTABanner
        concept={concept}
        title="Experience It Yourself"
        description="Join our community of discerning collectors."
        ctaLabel={concept.ctaText.browse}
        ctaHref={buildConceptUrl(concept.id, 'collections')}
      />
    </ConceptLayout>
  )
}
