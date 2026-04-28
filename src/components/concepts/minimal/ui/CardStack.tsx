'use client'

/**
 * CardStack — adapted from KokonutUI
 * Stacked product cards that fan out on click/hover.
 * Adapted for Vault Maison minimal: monochrome, system fonts, product data.
 */

import { motion } from 'motion/react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CardStackProduct {
  id: string
  slug: string
  title: string
  subtitle: string
  price: string
  image: string
  specs: { label: string; value: string }[]
}

interface CardProps {
  product: CardStackProduct
  index: number
  totalCards: number
  isExpanded: boolean
}

const Card = ({ product, index, totalCards, isExpanded }: CardProps) => {
  const centerOffset = (totalCards - 1) * 5
  const defaultX = index * 10 - centerOffset
  const defaultY = index * 2
  const defaultRotate = index * 1.5

  const cardWidth = 300
  const cardOverlap = 220
  const totalExpandedWidth = cardWidth + (totalCards - 1) * (cardWidth - cardOverlap)
  const expandedCenterOffset = totalExpandedWidth / 2

  const spreadX = index * (cardWidth - cardOverlap) - expandedCenterOffset + cardWidth / 2
  const spreadRotate = index * 4 - (totalCards - 1) * 2

  return (
    <motion.div
      animate={{
        x: isExpanded ? spreadX : defaultX,
        y: isExpanded ? 0 : defaultY,
        rotate: isExpanded ? spreadRotate : defaultRotate,
        zIndex: totalCards - index,
      }}
      className={cn(
        'absolute inset-0 w-full p-5',
        'bg-white border border-[#E5E5E5]',
        'transition-shadow duration-500',
        isExpanded ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'shadow-[0_4px_12px_rgba(0,0,0,0.04)]'
      )}
      initial={{
        x: defaultX,
        y: defaultY,
        rotate: defaultRotate,
      }}
      style={{
        maxWidth: '300px',
        left: '50%',
        marginLeft: '-150px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 30,
        mass: 0.8,
      }}
    >
      {/* Specs Grid */}
      <dl className="mb-3 grid grid-cols-4 gap-2">
        {product.specs.map((spec) => (
          <div className="flex flex-col items-start text-left" key={spec.label}>
            <dd className="text-[10px] font-normal text-[#050505]/40 tracking-wide uppercase">
              {spec.label}
            </dd>
            <dt className="text-[11px] font-light text-[#050505]">
              {spec.value}
            </dt>
          </div>
        ))}
      </dl>

      {/* Image */}
      <div className="aspect-[16/11] w-full overflow-hidden bg-[#F5F5F5]">
        <Image
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
          src={product.image}
          width={300}
          height={206}
          unoptimized
        />
      </div>

      {/* Title & Price */}
      <div className="mt-4">
        <h2 className="text-left text-[18px] font-semibold tracking-tight text-[#050505]">
          {product.title}
        </h2>
        <span className="block text-left text-[13px] font-light text-[#050505]/50 mt-0.5">
          {product.subtitle}
        </span>
        <span className="block text-left text-[13px] font-normal text-[#050505] mt-1">
          {product.price}
        </span>
      </div>
    </motion.div>
  )
}

interface CardStackProps {
  products: CardStackProduct[]
  className?: string
}

export default function CardStack({ products, className }: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <button
        aria-label="Toggle card stack"
        className={cn(
          'relative mx-auto cursor-pointer',
          'min-h-[420px] w-full max-w-[90vw]',
          'md:max-w-[1200px]',
          'appearance-none border-0 bg-transparent p-0',
          'flex items-center justify-center'
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        {products.map((product, index) => (
          <Card
            index={index}
            isExpanded={isExpanded}
            key={product.id}
            product={product}
            totalCards={products.length}
          />
        ))}
      </button>
      <p
        className="text-center text-[11px] uppercase tracking-[0.2em] text-[#050505]/30 mt-6"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif" }}
      >
        {isExpanded ? 'Click to stack' : 'Click to reveal'}
      </p>
    </div>
  )
}
