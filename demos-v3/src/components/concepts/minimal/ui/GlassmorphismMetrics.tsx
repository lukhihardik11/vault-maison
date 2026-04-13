'use client'

import { motion, type Variants } from 'motion/react'
import { ArrowUpRight, Diamond, Shield, Clock, Gem } from 'lucide-react'
import Link from 'next/link'

interface Metric {
  label: string
  value: string
  delta: string
  description: string
  icon?: React.ReactNode
}

interface GlassmorphismMetricsProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  metrics?: Metric[]
  ctaText?: string
  ctaHref?: string
  ctaDescription?: string
}

const defaultMetrics: Metric[] = [
  {
    label: 'Diamonds Sourced',
    value: '1,000+',
    delta: 'GIA',
    description: 'conflict-free certified stones',
    icon: <Diamond className="h-3.5 w-3.5" />,
  },
  {
    label: 'Years of Craft',
    value: '50+',
    delta: 'Est. 1974',
    description: 'three generations of mastery',
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  {
    label: 'Bespoke Pieces',
    value: '2,400',
    delta: '+340',
    description: 'custom designs completed',
    icon: <Gem className="h-3.5 w-3.5" />,
  },
  {
    label: 'Client Trust',
    value: '98%',
    delta: 'NPS 72',
    description: 'would recommend to others',
    icon: <Shield className="h-3.5 w-3.5" />,
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

export default function GlassmorphismMetrics({
  eyebrow = 'Our Promise',
  heading = 'Numbers that speak for themselves',
  subheading = 'Every diamond is hand-selected. Every setting is precision-crafted. Every client is a relationship, not a transaction.',
  metrics = defaultMetrics,
  ctaText = 'Book a Consultation',
  ctaHref = '/minimal/bespoke',
  ctaDescription = 'Private appointments available for bespoke commissions and collection viewings.',
}: GlassmorphismMetricsProps) {
  return (
    <section className="relative overflow-hidden px-5 py-24 lg:py-32" style={{ fontFamily: font }}>
      {/* Subtle background blurs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[380px] w-[380px] rounded-full bg-[#050505]/[0.02] blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#050505]/[0.015] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#050505]/10 bg-white/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#050505]/60 backdrop-blur">
            <Diamond className="h-3 w-3" />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-[#050505] leading-tight">
            {heading}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#050505]/60 md:text-base" style={{ fontWeight: 300 }}>
            {subheading}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {metrics.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp}>
              <div className="group relative overflow-hidden rounded-2xl border border-[#050505]/8 bg-white/60 p-8 backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/[0.02] via-transparent to-transparent" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#050505]/50">
                      {metric.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#050505]/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl md:text-5xl font-light tracking-tight text-[#050505]">
                      {metric.value}
                    </span>
                    <span className="rounded-full border border-[#050505]/10 bg-white/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#050505]/50 backdrop-blur">
                      {metric.delta}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#050505]/60" style={{ fontWeight: 300 }}>
                    {metric.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[#050505]/8 bg-white/50 px-6 py-6 backdrop-blur-xl md:px-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#050505]/10 bg-white/70 text-[#050505]/70">
              <Gem className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#050505]/50">
                Private Appointments
              </p>
              <p className="text-sm text-[#050505]/70" style={{ fontWeight: 300 }}>
                {ctaDescription}
              </p>
            </div>
          </div>
          <Link
            href={ctaHref}
            className="h-11 rounded-full border border-[#050505]/10 bg-white/70 px-6 text-[11px] uppercase tracking-[0.2em] text-[#050505]/60 backdrop-blur hover:text-[#050505] hover:border-[#050505]/30 transition-colors duration-300 flex items-center"
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
