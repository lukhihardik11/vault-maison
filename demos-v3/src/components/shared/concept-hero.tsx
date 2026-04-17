'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { type ConceptConfig } from '@/data/concepts'
import { buildConceptUrl } from '@/lib/concept-utils'

interface ConceptHeroProps {
  concept: ConceptConfig
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  image?: string
  fullHeight?: boolean
}

export function ConceptHero({
  concept,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  image,
  fullHeight = true,
}: ConceptHeroProps) {
  const heroTitle = title || concept.tagline
  const heroSubtitle = subtitle || concept.description
  const heroCta = ctaLabel || concept.ctaText.browse
  const heroHref = ctaHref || buildConceptUrl(concept.id, 'collections')
  const heroImage = image || concept.heroImage
  const isMinimal = concept.id === 'minimal'

  return (
    <section
      className={`relative overflow-hidden ${fullHeight ? 'min-h-[90vh]' : 'min-h-[60vh]'} flex items-center`}
      style={{ backgroundColor: concept.palette.bg }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={heroTitle}
          fill
          className="object-cover"
          style={{ opacity: isMinimal ? 0.1 : 0.3 }}
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${concept.palette.bg}ee, ${concept.palette.bg}88)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 py-20 lg:py-32 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={isMinimal ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.3em] mb-6"
            style={{ color: concept.palette.accent }}
          >
            {concept.name}
          </motion.p>

          <motion.h1
            initial={isMinimal ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`text-4xl lg:text-6xl xl:text-7xl font-light tracking-[0.02em] leading-[1.1] mb-6 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            initial={isMinimal ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm lg:text-base font-light leading-relaxed mb-10 max-w-lg"
            style={{ color: concept.palette.text }}
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={isMinimal ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href={heroHref}
              className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.25em] transition-all hover:opacity-80"
              style={{
                backgroundColor: concept.palette.accent,
                color: concept.palette.bg,
                transitionDuration: isMinimal ? '0ms' : '600ms',
              }}
            >
              {heroCta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
