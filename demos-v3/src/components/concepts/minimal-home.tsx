'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, CategoryGrid, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { LetterPullUp } from '@/components/ui/letter-pullup'
import { BlurFade } from '@/components/ui/blur-fade'
import { TypewriterEffect } from '@/components/ui/typewriter-effect'

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)

  return (
    <ConceptLayout concept={concept}>
      {/* Brutalist hero - stark, typographic */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-32 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Magic UI: LetterPullUp */}
            <LetterPullUp
              words="DIAMONDS."
              className={`text-6xl md:text-8xl lg:text-[10rem] font-light tracking-[-0.02em] leading-[0.9] mb-8 ${concept.fonts.headingClass}`}
            />
            <div className="flex items-end gap-8 mb-12">
              <div className="h-px flex-1" style={{ backgroundColor: concept.palette.text, opacity: 0.1 }} />
              <div className="text-xs font-light opacity-40 max-w-xs leading-relaxed">
                {/* Aceternity: TypewriterEffect */}
                <TypewriterEffect
                  words={[
                    { text: 'Nothing more. Nothing less.' },
                    { text: 'The stone speaks for itself.' },
                    { text: 'Pure. Unadorned. Perfect.' },
                  ]}
                />
              </div>
            </div>
            <Link
              href={buildConceptUrl('minimal', 'collections')}
              className="inline-block text-xs tracking-[0.1em] pb-1 transition-opacity hover:opacity-60"
              style={{ borderBottom: `1px solid ${concept.palette.text}`, opacity: 0.6 }}
            >
              View All →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Grid - clean, no frills with BlurFade */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: concept.palette.muted }}>
            {featured.map((p, i) => (
              <BlurFade key={p.id} delay={i * 0.05}>
                <div style={{ backgroundColor: concept.palette.bg }}>
                  <Link href={buildConceptUrl('minimal', `product/${p.slug}`)} className="group block p-6">
                    <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all"
                        style={{ transitionDuration: '800ms' }}
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-xs font-light mb-1">{p.name}</h3>
                    <p className="text-xs opacity-40">{p.priceDisplay}</p>
                  </Link>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="py-32" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <BlurFade>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-light leading-relaxed"
            >
              &ldquo;Perfection is achieved not when there is nothing more to add,
              but when there is nothing left to take away.&rdquo;
            </motion.p>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 mt-6">
              Antoine de Saint-Exupery
            </p>
          </BlurFade>
        </div>
      </section>

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <CategoryGrid concept={concept} />
        </div>
      </div>

      <CTABanner
        concept={concept}
        title="Inquire"
        description=""
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('minimal', 'contact')}
      />
    </ConceptLayout>
  )
}
