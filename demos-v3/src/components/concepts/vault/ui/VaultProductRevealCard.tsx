"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

interface VaultProductRevealCardProps {
  name?: string
  price?: string
  originalPrice?: string
  image?: string
  description?: string
  category?: string
  href?: string
  isNew?: boolean
  onFavorite?: () => void
  enableAnimations?: boolean
  className?: string
}

export function VaultProductRevealCard({
  name = "Celestial Diamond Ring",
  price = "$12,500",
  originalPrice,
  image = "/images/vault/diamond-ring-dark-1.jpg",
  description = "A breathtaking masterpiece featuring a flawless 2.5ct diamond set in 18K gold, hand-finished by our master artisans.",
  category = "Diamond Rings",
  href = "/vault/product/celestial-diamond-ring",
  isNew = false,
  onFavorite,
  enableAnimations = true,
  className,
}: VaultProductRevealCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    onFavorite?.()
  }

  const containerVariants = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate ? {
      scale: 1.02,
      y: -8,
      transition: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 }
    } : {},
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08 },
  }

  const overlayVariants = {
    rest: { y: "100%", opacity: 0 },
    hover: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring" as const, stiffness: 400, damping: 28, mass: 0.6,
        staggerChildren: 0.08, delayChildren: 0.05,
      },
    },
  }

  const contentVariants = {
    rest: { opacity: 0, y: 16, scale: 0.97 },
    hover: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 25, mass: 0.5 },
    },
  }

  const favoriteVariants = {
    rest: { scale: 1, rotate: 0 },
    favorite: {
      scale: [1, 1.3, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const }
    },
  }

  const glowVariants = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.4 } },
  }

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={containerVariants}
        className={className}
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: SURFACE,
          border: `1px solid rgba(212,175,55,0.12)`,
          cursor: 'pointer',
        }}
      >
        {/* Gold glow on hover */}
        <motion.div
          variants={glowVariants}
          style={{
            position: 'absolute', inset: -1, zIndex: 0,
            borderRadius: 12,
            boxShadow: `0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(212,175,55,0.05)`,
            pointerEvents: 'none',
          }}
        />

        {/* Image Container */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
          <motion.img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
            variants={imageVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Gradient overlay on image */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 40%, transparent 70%, rgba(10,10,10,0.3) 100%)',
          }} />

          {/* Favorite Button */}
          <motion.button
            onClick={handleFavorite}
            variants={favoriteVariants}
            animate={isFavorite ? "favorite" : "rest"}
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer', zIndex: 10,
              backdropFilter: 'blur(12px)',
              backgroundColor: isFavorite ? 'rgba(212,175,55,0.9)' : 'rgba(255,255,255,0.08)',
              color: isFavorite ? BG : 'rgba(234,234,234,0.8)',
              transition: 'background-color 0.3s ease',
            }}
          >
            <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
          </motion.button>

          {/* New Badge */}
          {isNew && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                position: 'absolute', top: 14, left: 14,
                padding: '5px 14px',
                backgroundColor: GOLD, color: BG,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', borderRadius: 2,
              }}
            >
              New
            </motion.div>
          )}

          {/* Category tag at bottom of image */}
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            fontSize: 9, letterSpacing: '0.25em', color: GOLD,
            textTransform: 'uppercase', fontWeight: 500,
          }}>
            {category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 20px', position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 500,
            color: TEXT, margin: 0, marginBottom: 6, lineHeight: 1.3,
          }}>
            {name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{
              fontSize: 18, fontFamily: 'Cinzel, serif', color: TEXT, fontWeight: 500,
            }}>
              {price}
            </span>
            {originalPrice && (
              <span style={{
                fontSize: 13, color: 'rgba(234,234,234,0.35)',
                textDecoration: 'line-through',
              }}>
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Reveal Overlay */}
        <motion.div
          variants={overlayVariants}
          style={{
            position: 'absolute', inset: 0, zIndex: 5,
            background: `linear-gradient(to top, ${BG} 0%, rgba(10,10,10,0.97) 60%, rgba(10,10,10,0.92) 100%)`,
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          }}
        >
          <div style={{ padding: '28px 24px' }}>
            {/* Product Description */}
            <motion.div variants={contentVariants}>
              <div style={{
                fontSize: 9, letterSpacing: '0.25em', color: GOLD,
                textTransform: 'uppercase', marginBottom: 10, fontWeight: 500,
              }}>
                {category}
              </div>
              <h4 style={{
                fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 500,
                color: TEXT, margin: 0, marginBottom: 10,
              }}>
                {name}
              </h4>
              <p style={{
                fontSize: 13, lineHeight: 1.7,
                color: 'rgba(234,234,234,0.55)', margin: 0, marginBottom: 20,
              }}>
                {description}
              </p>
            </motion.div>

            {/* Price */}
            <motion.div variants={contentVariants} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontSize: 22, fontFamily: 'Cinzel, serif', color: GOLD, fontWeight: 500 }}>
                  {price}
                </span>
                {originalPrice && (
                  <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.3)', textDecoration: 'line-through' }}>
                    {originalPrice}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={contentVariants} style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 20px', borderRadius: 6,
                  background: `linear-gradient(135deg, ${GOLD}, #B8962E)`,
                  color: BG, border: 'none', cursor: 'pointer',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                }}
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, borderRadius: 6,
                  backgroundColor: 'rgba(212,175,55,0.08)',
                  border: `1px solid rgba(212,175,55,0.2)`,
                  color: GOLD, cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <Eye size={16} />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}
