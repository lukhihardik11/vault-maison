'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Gem, Shield, Award, Users, Calendar, TrendingUp, Sparkles, Star, ArrowRight, Clock } from 'lucide-react'

interface ServiceItem {
  icon: React.ReactNode
  title: string
  description: string
}

interface StatItem {
  icon: React.ReactNode
  value: number
  label: string
  suffix: string
}

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])
  return <span>{count}{suffix}</span>
}

export function VaultAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40])

  const services: ServiceItem[] = [
    { icon: <Gem size={22} />, title: 'Curation', description: 'Each piece is hand-selected by our master gemologists, ensuring only the most exceptional stones enter our collection.' },
    { icon: <Shield size={22} />, title: 'Authenticity', description: 'Every jewel comes with comprehensive certification and provenance documentation, guaranteeing its heritage.' },
    { icon: <Star size={22} />, title: 'Craftsmanship', description: 'Our artisans employ centuries-old techniques refined with modern precision to create timeless masterpieces.' },
    { icon: <Clock size={22} />, title: 'Heritage', description: 'Drawing from generations of expertise, we preserve the art of fine jewelry making for future connoisseurs.' },
    { icon: <Sparkles size={22} />, title: 'Innovation', description: 'Pioneering new settings and techniques that push the boundaries of what is possible in haute joaillerie.' },
    { icon: <Award size={22} />, title: 'Excellence', description: 'Recognized globally for our unwavering commitment to quality, each creation meets the highest standards.' },
  ]

  const stats: StatItem[] = [
    { icon: <Award size={20} />, value: 150, label: 'Masterpieces Created', suffix: '+' },
    { icon: <Users size={20} />, value: 1200, label: 'Distinguished Clients', suffix: '+' },
    { icon: <Calendar size={20} />, value: 45, label: 'Years of Heritage', suffix: '' },
    { icon: <TrendingUp size={20} />, value: 99, label: 'Client Satisfaction', suffix: '%' },
  ]

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } } }

  return (
    <section ref={sectionRef} style={{ width: '100%', padding: '100px 24px', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative parallax orbs */}
      <motion.div style={{ position: 'absolute', top: 80, left: 40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(212,175,55,0.03)', filter: 'blur(60px)', y: y1 }} />
      <motion.div style={{ position: 'absolute', bottom: 80, right: 40, width: 260, height: 260, borderRadius: '50%', background: 'rgba(212,175,55,0.04)', filter: 'blur(80px)', y: y2 }} />

      <motion.div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants}>
        {/* Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: 24 }} variants={itemVariants}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: 12 }}>
            Our Legacy
          </p>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 16px', letterSpacing: '0.04em' }}>
            About the Maison
          </h2>
          <motion.div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', margin: '0 auto' }} initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 1, delay: 0.5 }} />
        </motion.div>

        <motion.p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }} variants={itemVariants}>
          For over four decades, we have dedicated ourselves to the art of extraordinary jewelry. Each creation is a testament to our unwavering pursuit of perfection.
        </motion.p>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 80 }}>
          {services.map((service, idx) => (
            <motion.div key={idx} variants={itemVariants} style={{
              padding: 32, borderRadius: 8,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(212,175,55,0.08)',
              transition: 'all 0.4s',
            }}
            className="vault-about-service-card"
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', marginBottom: 20 }}>
                {service.icon}
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: 400, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '0.03em' }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, padding: '48px 0', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 6px' }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isStatsInView} />
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .vault-about-service-card:hover {
          border-color: rgba(212,175,55,0.25) !important;
          background: rgba(212,175,55,0.04) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  )
}
