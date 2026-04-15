'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Gem, Shield, Award, Users, Calendar, TrendingUp, Sparkles, Star, Clock, Palette } from 'lucide-react'

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

export function GalleryAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30])

  const services = [
    { icon: <Gem size={22} />, title: 'Curation', description: 'Each piece is hand-selected by our curators, ensuring only the most exceptional works enter our exhibition.' },
    { icon: <Shield size={22} />, title: 'Provenance', description: 'Every acquisition comes with comprehensive documentation and authentication from leading gemological institutes.' },
    { icon: <Palette size={22} />, title: 'Artistry', description: 'Our master jewelers employ centuries-old techniques, creating pieces that transcend mere adornment.' },
    { icon: <Clock size={22} />, title: 'Heritage', description: 'Drawing from a rich tradition of fine craftsmanship, we honor the legacy of haute joaillerie.' },
    { icon: <Sparkles size={22} />, title: 'Innovation', description: 'Pioneering new approaches to setting and design that expand the possibilities of the medium.' },
    { icon: <Award size={22} />, title: 'Recognition', description: 'Acknowledged by collectors and institutions worldwide for our commitment to excellence.' },
  ]

  const stats = [
    { icon: <Award size={20} />, value: 150, label: 'Exhibitions Held', suffix: '+' },
    { icon: <Users size={20} />, value: 1200, label: 'Private Collectors', suffix: '+' },
    { icon: <Calendar size={20} />, value: 45, label: 'Years Established', suffix: '' },
    { icon: <TrendingUp size={20} />, value: 99, label: 'Collector Satisfaction', suffix: '%' },
  ]

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } } }

  return (
    <section ref={sectionRef} style={{ width: '100%', padding: '100px 24px', background: '#FDFBF7', position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ position: 'absolute', top: 60, left: 30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(139,115,85,0.04)', filter: 'blur(60px)', y: y1 }} />
      <motion.div style={{ position: 'absolute', bottom: 60, right: 30, width: 260, height: 260, borderRadius: '50%', background: 'rgba(139,115,85,0.05)', filter: 'blur(80px)', y: y2 }} />

      <motion.div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants}>
        {/* Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: 24 }} variants={itemVariants}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8B7355', marginBottom: 12 }}>
            Our Story
          </p>
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#2C2C2C', margin: '0 0 16px' }}>
            About the Gallery
          </h2>
          <div style={{ width: 60, height: 1, background: '#8B7355', margin: '0 auto' }} />
        </motion.div>

        <motion.p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#666', lineHeight: 1.7 }} variants={itemVariants}>
          For over four decades, we have curated the world's finest jewelry as works of art. Each exhibition is a testament to our belief that exceptional craftsmanship deserves to be celebrated.
        </motion.p>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginBottom: 80 }}>
          {services.map((service, idx) => (
            <motion.div key={idx} variants={itemVariants} style={{
              padding: 32, borderRadius: 4,
              background: '#FFFFFF',
              border: '1px solid #E8E4DE',
              transition: 'all 0.4s',
            }}
            className="gallery-about-service-card"
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid #E8E4DE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B7355', marginBottom: 20 }}>
                {service.icon}
              </div>
              <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1rem', fontWeight: 400, color: '#2C2C2C', margin: '0 0 10px' }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#888', lineHeight: 1.6, margin: 0 }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, padding: '48px 0', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ color: '#8B7355', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
              <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: '#2C2C2C', margin: '0 0 6px' }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isStatsInView} />
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .gallery-about-service-card:hover {
          border-color: #8B7355 !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
      `}</style>
    </section>
  )
}
