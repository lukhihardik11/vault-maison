'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type ConceptConfig } from '@/data/concepts'
import { type Product } from '@/data/products'
import { ProductCard } from './product-card'

// ═══════════════════════════════════════
// FEATURED PRODUCTS SECTION
// ═══════════════════════════════════════
interface FeaturedProductsProps {
  concept: ConceptConfig
  products: Product[]
  title?: string
  subtitle?: string
}

export function FeaturedProducts({ concept, products, title = 'Featured', subtitle }: FeaturedProductsProps) {
  const isMinimal = concept.id === 'minimal'

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-10 lg:mb-14">
          <motion.h2
            initial={isMinimal ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`text-xl lg:text-2xl font-light tracking-[0.05em] ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <p className="text-xs font-light opacity-50 mt-2 tracking-[0.1em]">{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} concept={concept} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// SPLIT IMAGE + TEXT SECTION
// ═══════════════════════════════════════
interface SplitSectionProps {
  concept: ConceptConfig
  title: string
  description: string
  image: string
  ctaLabel?: string
  ctaHref?: string
  reverse?: boolean
}

export function SplitSection({ concept, title, description, image, ctaLabel, ctaHref, reverse = false }: SplitSectionProps) {
  const isMinimal = concept.id === 'minimal'

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? 'direction-rtl' : ''}`}>
          <motion.div
            initial={isMinimal ? {} : { opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative overflow-hidden ${reverse ? 'lg:order-2' : ''}`}
            style={{ aspectRatio: '4/5' }}
          >
            <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>
          <motion.div
            initial={isMinimal ? {} : { opacity: 0, x: reverse ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${reverse ? 'lg:order-1' : ''}`}
            style={{ direction: 'ltr' }}
          >
            <h2 className={`text-2xl lg:text-3xl font-light tracking-[0.02em] mb-6 ${concept.fonts.headingClass}`}>
              {title}
            </h2>
            <p className="text-sm leading-relaxed font-light opacity-60 mb-8 max-w-md">
              {description}
            </p>
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-block text-[10px] uppercase tracking-[0.2em] pb-1 transition-opacity hover:opacity-60"
                style={{ borderBottom: `1px solid ${concept.palette.accent}`, color: concept.palette.accent }}
              >
                {ctaLabel}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// TESTIMONIAL SECTION
// ═══════════════════════════════════════
interface TestimonialProps {
  concept: ConceptConfig
  quote: string
  author: string
  title: string
}

export function Testimonial({ concept, quote, author, title }: TestimonialProps) {
  return (
    <section
      className="py-20 lg:py-32"
      style={{ backgroundColor: concept.palette.surface }}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className={`text-lg lg:text-xl font-light leading-relaxed italic mb-8 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.text }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <footer>
            <p className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: concept.palette.accent }}>
              {author}
            </p>
            <p className="text-[10px] opacity-40 mt-1 tracking-[0.1em]">{title}</p>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// CTA BANNER SECTION
// ═══════════════════════════════════════
interface CTABannerProps {
  concept: ConceptConfig
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export function CTABanner({ concept, title, description, ctaLabel, ctaHref }: CTABannerProps) {
  return (
    <section
      className="py-20 lg:py-32"
      style={{ backgroundColor: concept.palette.surface }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
        <h2 className={`text-2xl lg:text-4xl font-light tracking-[0.02em] mb-4 ${concept.fonts.headingClass}`}>
          {title}
        </h2>
        <p className="text-sm font-light opacity-60 max-w-md mx-auto mb-8">{description}</p>
        <Link
          href={ctaHref}
          className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
          style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// PAGE HEADER (for category/collection pages)
// ═══════════════════════════════════════
interface PageHeaderProps {
  concept: ConceptConfig
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href: string }[]
}

export function PageHeader({ concept, title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="py-12 lg:py-20" style={{ backgroundColor: concept.palette.bg }}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {breadcrumbs && (
          <div className="flex items-center gap-2 mb-6">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-[10px] opacity-30">/</span>}
                <Link
                  href={crumb.href}
                  className="text-[10px] uppercase tracking-[0.15em] opacity-40 hover:opacity-100 transition-opacity"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </div>
        )}
        <h1 className={`text-2xl lg:text-4xl font-light tracking-[0.02em] ${concept.fonts.headingClass}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-light opacity-50 mt-3 max-w-lg">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
