'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalJournal } from '@/components/concepts/minimal/pages'
import { TheaterJournal } from '@/components/concepts/theater/pages'
import { VaultJournal } from '@/components/concepts/vault/pages'
import { GalleryJournal } from '@/components/concepts/gallery/pages'
import { SalonJournal } from '@/components/concepts/salon/pages'
import { AtelierJournal } from '@/components/concepts/atelier/pages'
import { ArchiveJournal } from '@/components/concepts/archive/pages'
import { ObservatoryJournal } from '@/components/concepts/observatory/pages'

const articles = [
  {
    slug: 'understanding-the-4cs',
    title: 'Understanding the 4Cs of Diamond Quality',
    excerpt: 'A comprehensive guide to cut, clarity, color, and carat weight — the universal language of diamond evaluation.',
    image: '/images/round-brilliant-diagram.jpg',
    date: '2025-12-15',
    category: 'Education',
    readTime: '8 min',
  },
  {
    slug: 'art-of-melee-diamonds',
    title: 'The Art of Melee Diamonds',
    excerpt: 'Small in size but enormous in impact, melee diamonds are the unsung heroes of fine jewelry design.',
    image: '/images/diamond-melee-1.jpg',
    date: '2025-11-28',
    category: 'Craftsmanship',
    readTime: '6 min',
  },
  {
    slug: 'choosing-engagement-ring',
    title: 'Choosing the Perfect Engagement Ring',
    excerpt: 'Expert advice on selecting a ring that captures your unique love story, from stone selection to setting style.',
    image: '/images/diamond-velvet-1.jpg',
    date: '2025-11-10',
    category: 'Guide',
    readTime: '10 min',
  },
  {
    slug: 'history-of-diamond-cutting',
    title: 'A Brief History of Diamond Cutting',
    excerpt: 'From the earliest point cuts to modern laser precision, the evolution of diamond cutting is a story of human ingenuity.',
    image: '/images/diamond-facets-1.jpg',
    date: '2025-10-22',
    category: 'Heritage',
    readTime: '12 min',
  },
  {
    slug: 'sustainable-luxury',
    title: 'Sustainable Luxury: Our Commitment',
    excerpt: 'How we are working to ensure that every diamond in our collection meets the highest ethical and environmental standards.',
    image: '/images/diamond-bokeh-1.jpg',
    date: '2025-10-05',
    category: 'Sustainability',
    readTime: '7 min',
  },
  {
    slug: 'gold-through-ages',
    title: 'Gold Through the Ages',
    excerpt: 'From ancient civilizations to modern luxury, gold has captivated humanity for millennia. Explore its enduring allure.',
    image: '/images/diamond-dark-bg-1.jpg',
    date: '2025-09-18',
    category: 'Heritage',
    readTime: '9 min',
  },
]

export default function JournalPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalJournal />
  if (concept.id === 'vault') return <VaultJournal />
  if (concept.id === 'gallery') return <GalleryJournal />
  if (concept.id === 'salon') return <SalonJournal />
  if (concept.id === 'atelier') return <AtelierJournal />
  if (concept.id === 'archive') return <ArchiveJournal />
  if (concept.id === 'observatory') return <ObservatoryJournal />
  if (concept.id === 'theater') return <TheaterJournal />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Journal"
        subtitle="Insights, stories, and expertise from the world of fine jewelry and exceptional diamonds."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Journal', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link href="#" className="group grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <Image
                src={articles[0].image}
                alt={articles[0].title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                style={{ transitionDuration: '800ms' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: concept.palette.accent }}>
                {articles[0].category} · {articles[0].readTime}
              </p>
              <h2 className={`text-2xl lg:text-3xl font-light tracking-[0.02em] mb-4 ${concept.fonts.headingClass}`}>
                {articles[0].title}
              </h2>
              <p className="text-sm font-light opacity-60 leading-relaxed mb-6">
                {articles[0].excerpt}
              </p>
              <span
                className="text-[10px] uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity"
              >
                Read Article →
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href="#" className="group block">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '16/10' }}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: '800ms' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] mb-2" style={{ color: concept.palette.accent }}>
                  {article.category} · {article.readTime}
                </p>
                <h3 className={`text-sm font-light tracking-[0.02em] mb-2 ${concept.fonts.headingClass}`}>
                  {article.title}
                </h3>
                <p className="text-xs font-light opacity-50 leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </ConceptLayout>
  )
}
