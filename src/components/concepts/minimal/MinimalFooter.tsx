'use client'

import Link from 'next/link'

const shopLinks = [
  { label: 'All Pieces', href: '/minimal/collections' },
  { label: 'Rings', href: '/minimal/category/diamond-rings' },
  { label: 'Necklaces', href: '/minimal/category/diamond-necklaces' },
  { label: 'Bracelets', href: '/minimal/category/diamond-bracelets' },
  { label: 'Earrings', href: '/minimal/category/diamond-earrings' },
]

const infoLinks = [
  { label: 'About', href: '/minimal/about' },
  { label: 'Shipping', href: '/minimal/shipping' },
  { label: 'Returns', href: '/minimal/care' },
  { label: 'Contact', href: '/minimal/contact' },
  { label: 'FAQ', href: '/minimal/faq' },
]

export function MinimalFooter() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="text-[15px] font-medium tracking-[0.08em] uppercase text-[#050505]">
              Minimal Machine
            </h4>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
              Brutalist luxury jewelry. Each piece engineered with precision.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B]">Shop</h5>
            <ul className="space-y-2 list-none p-0 m-0">
              {shopLinks.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-[#6B6B6B] hover:text-[#050505] transition-colors duration-300 no-underline">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B]">Info</h5>
            <ul className="space-y-2 list-none p-0 m-0">
              {infoLinks.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-[#6B6B6B] hover:text-[#050505] transition-colors duration-300 no-underline">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B]">Newsletter</h5>
            <p className="text-sm text-[#6B6B6B]">Receive updates on new collections.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 h-12 px-4 border border-[#E5E5E5] border-r-0 bg-transparent text-sm text-[#050505] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#050505] transition-colors"
                style={{ borderRadius: 0 }}
              />
              <button className="h-12 px-6 bg-[#050505] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#1a1a1a] transition-colors border-none cursor-pointer" style={{ borderRadius: 0 }}>
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#9B9B9B] tracking-wide">
            &copy; {new Date().getFullYear()} Minimal Machine. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-[11px] text-[#9B9B9B] hover:text-[#050505] transition-colors tracking-wide no-underline">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
