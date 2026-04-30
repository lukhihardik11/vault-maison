'use client'

/**
 * CardFlip — adapted from KokonutUI
 * Hover-to-flip card. Front shows category image + name, back shows description + features.
 * Adapted for Vault Maison minimal: monochrome, system fonts, no orange accents.
 */

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface CardFlipProps {
  title: string
  subtitle?: string
  description?: string
  features?: string[]
  image?: string
  href?: string
  count?: number
}

export default function CardFlip({
  title,
  subtitle = '',
  description = '',
  features = [],
  image = '',
  href = '#',
  count = 0,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="group relative h-[340px] w-full [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        )}
      >
        {/* Front */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[backface-visibility:hidden] [transform:rotateY(0deg)]',
            'overflow-hidden',
            'bg-white border border-[#E5E5E5]',
            'transition-all duration-700',
            isFlipped ? 'opacity-0' : 'opacity-100'
          )}
        >
          {/* Image area */}
          <div className="relative h-[60%] w-full overflow-hidden bg-[#F5F5F5]">
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 "
                unoptimized
              />
            )}
          </div>

          {/* Bottom info */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3
                  className="text-[15px] font-normal tracking-tight text-[#050505] transition-transform duration-500 group-hover:-translate-y-1"
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                >
                  {title}
                </h3>
                {subtitle && (
                  <p
                    className="text-[12px] font-light text-[#050505]/50 mt-1 transition-transform duration-500 delay-[50ms] group-hover:-translate-y-1"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
              {count > 0 && (
                <span className="text-[11px] text-[#050505]/30 uppercase tracking-wider whitespace-nowrap">
                  {count} {count === 1 ? 'piece' : 'pieces'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[backface-visibility:hidden] [transform:rotateY(180deg)]',
            'p-6',
            'bg-white border border-[#E5E5E5]',
            'flex flex-col',
            'transition-all duration-700',
            isFlipped ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="flex-1 space-y-5">
            <div className="space-y-2">
              <h3
                className="text-[15px] font-normal tracking-tight text-[#050505]"
                style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
              >
                {title}
              </h3>
              {description && (
                <p
                  className="text-[12px] font-light leading-relaxed text-[#050505]/60"
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                >
                  {description}
                </p>
              )}
            </div>

            {features.length > 0 && (
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    className="flex items-center gap-2 text-[12px] text-[#050505]/70 transition-all duration-500"
                    key={feature}
                    style={{
                      transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    <ArrowRight className="h-3 w-3 text-[#050505]/40" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 border-t border-[#E5E5E5] pt-4">
            <Link
              href={href}
              className={cn(
                'group/start relative',
                'flex items-center justify-between',
                '-mx-2 px-2 py-2',
                'transition-all duration-300',
                'hover:bg-[#F5F5F5]'
              )}
            >
              <span
                className="text-[12px] font-normal text-[#050505] uppercase tracking-[0.15em] transition-colors duration-300"
                style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
              >
                View Collection
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#050505]/40 transition-all duration-300 group-hover/start:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
