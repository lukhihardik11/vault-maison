'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { minimal } from '../design-system'

const font = minimal.font.primary
const mono = minimal.font.mono

const segmentLabelMap: Record<string, string> = {
  faq: 'FAQ',
  care: 'Care',
  cart: 'Cart',
  about: 'About',
  account: 'Account',
  bespoke: 'Bespoke',
  category: 'Category',
  checkout: 'Checkout',
  collections: 'Collections',
  contact: 'Contact',
  craftsmanship: 'Craftsmanship',
  grading: 'Diamond Grading',
  journal: 'Journal',
  privacy: 'Privacy',
  product: 'Product',
  search: 'Search',
  shipping: 'Shipping & Returns',
  wishlist: 'Wishlist',
  wedding: 'Wedding',
}

function formatSegmentLabel(segment: string): string {
  const mapped = segmentLabelMap[segment.toLowerCase()]
  if (mapped) return mapped

  return decodeURIComponent(segment)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function Breadcrumb() {
  const pathname = usePathname()

  if (!pathname?.startsWith('/minimal')) return null

  const segments = pathname.split('/').filter(Boolean)
  if (segments.length <= 1) return null

  const items: Array<{ label: string; href: string; current: boolean }> = [
    { label: 'Home', href: '/minimal', current: false },
  ]

  let href = '/minimal'
  for (let i = 1; i < segments.length; i += 1) {
    href = `${href}/${segments[i]}`
    items.push({
      label: formatSegmentLabel(segments[i]),
      href,
      current: i === segments.length - 1,
    })
  }

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '18px clamp(24px, 3vw, 64px) 0',
      }}
    >
      <ol
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {items.map((item, index) => (
          <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {index > 0 && <ChevronRight size={12} strokeWidth={1.5} style={{ color: '#767676' }} aria-hidden="true" />}
            {item.current ? (
              <span
                style={{
                  fontFamily: mono,
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#050505',
                }}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="minimal-breadcrumb-link"
                style={{
                  fontFamily: font,
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#6B6B6B',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <style>{`
        .minimal-breadcrumb-link {
          transition: color 220ms ease;
        }
        .minimal-breadcrumb-link:hover {
          color: #050505;
        }
        @media (prefers-reduced-motion: reduce) {
          .minimal-breadcrumb-link {
            transition: none;
          }
        }
      `}</style>
    </nav>
  )
}
