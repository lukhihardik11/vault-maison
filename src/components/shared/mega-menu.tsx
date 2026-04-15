'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface MegaMenuLink {
  label: string
  href: string
  badge?: string
}

interface MegaMenuColumn {
  title: string
  links: MegaMenuLink[]
}

interface MegaMenuCategory {
  label: string
  columns: MegaMenuColumn[]
  featuredImage?: string
  featuredTitle?: string
  featuredLink?: string
}

interface MegaMenuProps {
  categories: MegaMenuCategory[]
  conceptId: string
  accentColor?: string
  bgColor?: string
  textColor?: string
}

export function MegaMenu({ categories, conceptId, accentColor = '#D4AF37', bgColor = '#0A0A0A', textColor = '#EAEAEA' }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveCategory(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveCategory(null), 200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const activeData = categories.find(c => c.label === activeCategory)

  return (
    <div ref={menuRef} className="relative" onMouseLeave={handleMouseLeave}>
      {/* Category triggers */}
      <nav className="flex items-center gap-6">
        {categories.map(cat => (
          <button
            key={cat.label}
            onMouseEnter={() => handleMouseEnter(cat.label)}
            className="text-sm tracking-widest uppercase transition-colors duration-200 pb-1"
            style={{
              color: activeCategory === cat.label ? accentColor : textColor,
              borderBottom: activeCategory === cat.label ? `1px solid ${accentColor}` : '1px solid transparent',
              opacity: activeCategory === cat.label ? 1 : 0.8,
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Dropdown panel */}
      {activeData && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] max-w-[90vw] z-50 shadow-2xl"
          style={{ backgroundColor: bgColor, border: `1px solid ${accentColor}20` }}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid grid-cols-4 gap-0">
            {/* Columns */}
            {activeData.columns.map((col, i) => (
              <div key={i} className="p-6" style={{ borderRight: i < activeData.columns.length - 1 ? `1px solid ${accentColor}10` : 'none' }}>
                <h4 className="text-xs tracking-[0.2em] uppercase mb-4 font-semibold" style={{ color: accentColor }}>
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={`/${conceptId}${link.href}`}
                        className="text-sm transition-colors duration-150 flex items-center gap-2"
                        style={{ color: `${textColor}CC` }}
                        onMouseOver={e => (e.currentTarget.style.color = accentColor)}
                        onMouseOut={e => (e.currentTarget.style.color = `${textColor}CC`)}
                        onClick={() => setActiveCategory(null)}
                      >
                        {link.label}
                        {link.badge && (
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                          >
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Featured image */}
            {activeData.featuredImage && (
              <div className="p-4">
                <Link href={activeData.featuredLink || '#'} onClick={() => setActiveCategory(null)}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={activeData.featuredImage}
                      alt={activeData.featuredTitle || ''}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {activeData.featuredTitle && (
                      <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: `linear-gradient(transparent, ${bgColor})` }}>
                        <p className="text-xs tracking-widest uppercase" style={{ color: accentColor }}>
                          {activeData.featuredTitle}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
