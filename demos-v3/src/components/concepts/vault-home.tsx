'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { products, getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Particles } from '@/components/ui/particles'
import { GradientText } from '@/components/ui/gradient-text'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { BlurFade } from '@/components/ui/blur-fade'

function SparklesText({ text, color }: { text: string; color: string }) {
  return (
    <span className="relative inline-block">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            textShadow: [`0 0 0px ${color}`, `0 0 8px ${color}`, `0 0 0px ${color}`],
          }}
          transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function MouseTrail({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number; age: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 })
      if (points.current.length > 50) points.current.shift()
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      points.current.forEach((p) => {
        p.age += 0.02
        const alpha = Math.max(0, 1 - p.age)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha * 0.6})`
        ctx.fill()
      })
      points.current = points.current.filter((p) => p.age < 1)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [color])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

export function VaultHome({ concept }: { concept: ConceptConfig }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const holdInterval = useRef<NodeJS.Timeout | null>(null)

  const startHold = useCallback(() => {
    holdInterval.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          if (holdInterval.current) clearInterval(holdInterval.current)
          setIsUnlocked(true)
          return 100
        }
        return prev + 2
      })
    }, 30)
  }, [])

  const cancelHold = useCallback(() => {
    if (holdInterval.current) clearInterval(holdInterval.current)
    if (holdProgress < 100) setHoldProgress(0)
  }, [holdProgress])

  const featured = getBestsellers().slice(0, 4)

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: concept.palette.bg, color: concept.palette.text }}
    >
      <MouseTrail color={concept.palette.accent} />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.section
            key="gate"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Aceternity: Background Beams */}
            <BackgroundBeams color={`${concept.palette.accent}30`} />
            {/* Magic UI: Particles */}
            <Particles quantity={30} color={concept.palette.accent} size={1} />

            <p className="text-[10px] tracking-[0.25em] uppercase opacity-30 mb-12 font-light relative z-10">
              Press and hold to enter
            </p>
            <motion.div
              onPointerDown={startHold}
              onPointerUp={cancelHold}
              onPointerLeave={cancelHold}
              whileTap={{ scale: 0.95 }}
              className="relative w-40 h-40 rounded-full cursor-pointer flex items-center justify-center z-10"
              style={{ background: `conic-gradient(${concept.palette.accent} ${holdProgress}%, transparent 0)` }}
            >
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center"
                style={{ backgroundColor: concept.palette.bg }}
              >
                <div className={`text-center ${concept.fonts.headingClass}`}>
                  <SparklesText text="VM" color={concept.palette.accent} />
                </div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1 }}
              className={`mt-12 text-[11px] tracking-[0.15em] uppercase font-light relative z-10 ${concept.fonts.headingClass}`}
            >
              Vault Maison
            </motion.p>
          </motion.section>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ConceptLayout concept={concept}>
              {/* Hero with BackgroundBeams */}
              <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
                <BackgroundBeams color={`${concept.palette.accent}20`} />
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.3 }}
                  className={`text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.06em] relative z-10 ${concept.fonts.headingClass}`}
                >
                  {/* Magic UI: GradientText */}
                  <GradientText colors={[concept.palette.accent, '#F5E6A3', concept.palette.accent]}>
                    THE VAULT
                  </GradientText>
                </motion.h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="h-px mt-8 relative z-10"
                  style={{ backgroundColor: concept.palette.accent }}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 text-[12px] tracking-[0.15em] font-light relative z-10"
                >
                  Curated Fine Jewelry · By Invitation
                </motion.p>
              </section>

              {/* Featured Products with SpotlightCard */}
              <section className="py-20 px-8 md:px-16">
                <BlurFade delay={0.1}>
                  <p className="text-[10px] tracking-[0.25em] uppercase opacity-30 mb-16">
                    Featured Acquisitions
                  </p>
                </BlurFade>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
                  {featured.map((p, i) => (
                    <BlurFade key={p.id} delay={0.1 + i * 0.1}>
                      {/* Aceternity: SpotlightCard */}
                      <SpotlightCard spotlightColor={`${concept.palette.accent}15`}>
                        <Link href={buildConceptUrl('vault', `product/${p.slug}`)}>
                          <div className="group relative overflow-hidden" style={{ backgroundColor: concept.palette.surface }}>
                            <div className="aspect-[4/3] relative">
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100"
                                style={{ transitionDuration: '1200ms' }}
                              />
                            </div>
                            <div className="p-8">
                              <p className="text-[10px] tracking-[0.25em] uppercase opacity-30 mb-2">
                                {p.id.slice(0, 8).toUpperCase()}
                              </p>
                              <h3 className={`text-lg tracking-[0.04em] mb-1 ${concept.fonts.headingClass}`}>
                                {p.name}
                              </h3>
                              <p className="text-[12px] opacity-40 font-light">{p.subtitle}</p>
                              <p className="text-sm mt-4 font-light" style={{ color: concept.palette.accent }}>
                                {p.priceDisplay}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SpotlightCard>
                    </BlurFade>
                  ))}
                </div>
                <div className="mt-16 text-center">
                  {/* Magic UI: ShimmerButton */}
                  <Link href={buildConceptUrl('vault', 'collections')}>
                    <ShimmerButton
                      shimmerColor={concept.palette.accent}
                      background={concept.palette.surface}
                    >
                      <span style={{ color: concept.palette.text }}>{concept.ctaText.browse}</span>
                    </ShimmerButton>
                  </Link>
                </div>
              </section>

              <SplitSection
                concept={concept}
                title="Uncompromising Standards"
                description="Every diamond in The Vault has been hand-selected by our master gemologists. We examine thousands of stones to find the rare few that meet our exacting standards for brilliance, fire, and scintillation."
                image="/images/diamond-facets-1.jpg"
                ctaLabel="Our Craftsmanship"
                ctaHref={buildConceptUrl('vault', 'craftsmanship')}
              />

              <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
                <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                  <BlurFade>
                    <h2 className={`text-xl lg:text-2xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`}>
                      Browse by Category
                    </h2>
                  </BlurFade>
                  <CategoryGrid concept={concept} />
                </div>
              </div>

              <Testimonial
                concept={concept}
                quote="The Vault experience is unlike anything else in luxury jewelry. From the moment you enter, you know you are in the presence of something extraordinary."
                author="Victoria Chen"
                title="Private Collector, Hong Kong"
              />

              <CTABanner
                concept={concept}
                title="Request Private Access"
                description="Schedule an exclusive viewing with our gemologists."
                ctaLabel={concept.ctaText.contact}
                ctaHref={buildConceptUrl('vault', 'contact')}
              />
            </ConceptLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
