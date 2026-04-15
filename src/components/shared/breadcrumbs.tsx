'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  textColor?: string
  accentColor?: string
}

export function Breadcrumbs({ items, textColor = '#EAEAEA', accentColor = '#D4AF37' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-xs tracking-wider">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span style={{ color: `${textColor}40` }}>/</span>
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 uppercase"
                style={{ color: `${textColor}80` }}
                onMouseOver={e => (e.currentTarget.style.color = accentColor)}
                onMouseOut={e => (e.currentTarget.style.color = `${textColor}80`)}
              >
                {item.label}
              </Link>
            ) : (
              <span className="uppercase" style={{ color: index === items.length - 1 ? textColor : `${textColor}80` }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
