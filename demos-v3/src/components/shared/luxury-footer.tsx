'use client'

import Link from 'next/link'
import { type ConceptConfig } from '@/data/concepts'
import { buildConceptUrl } from '@/lib/concept-utils'

interface LuxuryFooterProps {
  concept: ConceptConfig
}

export function LuxuryFooter({ concept }: LuxuryFooterProps) {
  const columns = [
    {
      title: 'Collections',
      links: [
        { label: 'Diamond Rings', href: buildConceptUrl(concept.id, 'category/diamond-rings') },
        { label: 'Diamond Necklaces', href: buildConceptUrl(concept.id, 'category/diamond-necklaces') },
        { label: 'Diamond Earrings', href: buildConceptUrl(concept.id, 'category/diamond-earrings') },
        { label: 'Gold Jewelry', href: buildConceptUrl(concept.id, 'category/gold-rings') },
        { label: 'Loose Diamonds', href: buildConceptUrl(concept.id, 'category/loose-diamonds') },
        { label: 'Wedding & Bridal', href: buildConceptUrl(concept.id, 'category/wedding-bridal') },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Bespoke Design', href: buildConceptUrl(concept.id, 'bespoke') },
        { label: 'Diamond Grading', href: buildConceptUrl(concept.id, 'grading') },
        { label: 'Ring Sizing', href: buildConceptUrl(concept.id, 'sizing') },
        { label: 'Engraving', href: buildConceptUrl(concept.id, 'engraving') },
        { label: 'Insurance', href: buildConceptUrl(concept.id, 'insurance') },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: buildConceptUrl(concept.id, 'about') },
        { label: 'Craftsmanship', href: buildConceptUrl(concept.id, 'craftsmanship') },
        { label: 'Sustainability', href: buildConceptUrl(concept.id, 'sustainability') },
        { label: 'Journal', href: buildConceptUrl(concept.id, 'journal') },
        { label: 'Contact', href: buildConceptUrl(concept.id, 'contact') },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Shipping & Returns', href: buildConceptUrl(concept.id, 'shipping') },
        { label: 'Care Guide', href: buildConceptUrl(concept.id, 'care') },
        { label: 'FAQ', href: buildConceptUrl(concept.id, 'faq') },
        { label: 'Privacy Policy', href: buildConceptUrl(concept.id, 'privacy') },
        { label: 'Terms of Service', href: buildConceptUrl(concept.id, 'terms') },
      ],
    },
  ]

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: concept.palette.bg,
        color: concept.palette.text,
        borderTop: `1px solid ${concept.palette.muted}`,
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
        {/* Newsletter */}
        <div
          className="mb-16 pb-16"
          style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
        >
          <div className="max-w-md">
            <h3
              className={`text-lg lg:text-xl font-light tracking-[0.05em] mb-4 ${concept.fonts.headingClass}`}
            >
              Stay Informed
            </h3>
            <p className="text-xs leading-relaxed opacity-60 mb-6">
              Receive exclusive previews of new collections, private sale invitations,
              and curated content from the world of fine jewelry.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent border px-4 py-3 text-xs tracking-[0.1em] placeholder:opacity-40 focus:outline-none"
                style={{
                  borderColor: concept.palette.muted,
                  color: concept.palette.text,
                }}
              />
              <button
                className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: concept.palette.accent,
                  color: concept.palette.bg,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[10px] uppercase tracking-[0.2em] font-medium mb-6"
                style={{ color: concept.palette.text }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-light opacity-50 hover:opacity-100 transition-opacity"
                      style={{ transitionDuration: '400ms' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: `1px solid ${concept.palette.muted}` }}
        >
          <span
            className={`text-xs uppercase tracking-[0.2em] font-light ${concept.fonts.headingClass}`}
          >
            Vault Maison
          </span>
          <p className="text-[10px] opacity-40 tracking-[0.1em]">
            &copy; {new Date().getFullYear()} Vault Maison. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
