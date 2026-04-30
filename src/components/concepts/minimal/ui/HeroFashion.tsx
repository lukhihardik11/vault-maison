'use client'

import Image from 'next/image'
import Link from 'next/link'

interface HeroFashionProps {
  brandName?: string
  season?: string
  description?: string
  heroImage: string
  heroImageAlt?: string
  categories: { label: string; href: string }[]
  ctaHref?: string
  ctaLabel?: string
}

export default function HeroFashion({
  brandName = 'Vault Maison.',
  season = 'COLLECTION 2025',
  description = 'Precision-cut diamonds and fine gold, presented without distraction. Each piece exists because it must — not because it can.',
  heroImage,
  heroImageAlt = 'Jewelry collection',
  categories,
  ctaHref = '/minimal/collections',
  ctaLabel = 'View All Collections',
}: HeroFashionProps) {
  const font = "'Inter', 'Helvetica Neue', sans-serif"

  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-24" style={{ fontFamily: font }}>
        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Image — right on desktop, top on mobile */}
          <div className="md:order-2 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Content — left on desktop */}
          <div className="md:order-1 flex flex-col justify-between min-h-[60vh] md:min-h-0">
            <div className="flex flex-col h-full justify-between gap-12">
              {/* Brand name */}
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#050505] leading-[0.95] tracking-[-0.03em]"
              >
                {brandName}
              </h1>

              {/* Category links */}
              <ul className="space-y-2 tracking-[-0.01em] text-lg text-[#050505]/80">
                {categories.map((item) => (
                  <li key={item.label} className="transition-all duration-300 hover:opacity-100 hover:-translate-y-0.5">
                    <Link
                      href={item.href}
                      className="cursor-pointer hover:underline underline-offset-4 decoration-[#050505]/20"
                      style={{ fontFamily: font, fontWeight: 400 }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Season + description */}
              <div>
                <h2
                  className="text-xs font-medium text-[#050505] tracking-[0.25em] uppercase mb-4"
                  style={{ fontFamily: font }}
                >
                  {season}
                </h2>
                <p
                  className="text-sm text-[#050505]/70 max-w-md leading-relaxed tracking-[-0.01em]"
                  style={{ fontFamily: font, fontWeight: 400 }}
                >
                  {description}
                </p>
                <Link
                  href={ctaHref}
                  className="inline-block mt-6 text-xs uppercase tracking-[0.2em] text-[#050505] border-b border-[#050505]/30 pb-1 hover:border-[#050505] transition-colors duration-300"
                  style={{ fontFamily: font, fontWeight: 400 }}
                >
                  {ctaLabel} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
