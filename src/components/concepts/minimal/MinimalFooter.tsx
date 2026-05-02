'use client'

import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import { minimal } from './design-system'
import BackToTop from './ui/BackToTop'
import { HoverLineReveal } from './ui/HoverLineReveal'
import { MagneticLink } from './ui/MagneticLink'

const font = minimal.font.primary
const mono = minimal.font.mono

const shopLinks = [
  { label: 'All Pieces', href: '/minimal/collections' },
  { label: 'Rings', href: '/minimal/category/diamond-rings' },
  { label: 'Necklaces', href: '/minimal/category/diamond-necklaces' },
  { label: 'Bracelets', href: '/minimal/category/diamond-bracelets' },
  { label: 'Earrings', href: '/minimal/category/diamond-earrings' },
  { label: 'Loose Diamonds', href: '/minimal/category/loose-diamonds' },
]

const infoLinks = [
  { label: 'About', href: '/minimal/about' },
  { label: 'Bespoke', href: '/minimal/bespoke' },
  { label: 'Shipping & Returns', href: '/minimal/shipping' },
  { label: 'Diamond Grading', href: '/minimal/grading' },
  { label: 'Contact', href: '/minimal/contact' },
  { label: 'FAQ', href: '/minimal/faq' },
]

const serviceLinks = [
  { label: 'Ring Sizing', href: '/minimal/care' },
  { label: 'Engraving', href: '/minimal/bespoke' },
  { label: 'Cleaning & Care', href: '/minimal/care' },
  { label: 'Insurance', href: '/minimal/faq' },
  { label: 'Gift Cards', href: '/minimal/collections' },
]

const legalLinks = [
  { label: 'Privacy', href: '/minimal/privacy' },
  { label: 'Terms', href: '/minimal/privacy' },
  { label: 'Cookies', href: '/minimal/privacy' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', short: 'IG' },
  { label: 'LinkedIn', href: 'https://linkedin.com', short: 'IN' },
  { label: 'YouTube', href: 'https://youtube.com', short: 'YT' },
]

export function MinimalFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newsletterEmail.trim()) return
    setIsSubscribed(true)
    setNewsletterEmail('')
  }

  return (
    <footer role="contentinfo" aria-label="Site footer" style={{ borderTop: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 80px) clamp(24px, 3vw, 64px)',
        }}
      >
        <div className="minimal-footer-intro">
          <div>
            <p
              style={{
                fontFamily: mono,
                fontSize: minimal.type.micro,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#767676',
                margin: '0 0 12px',
              }}
            >
              Minimal Machine
            </p>
            <h2
              style={{
                fontFamily: font,
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: '#050505',
                maxWidth: '520px',
                margin: 0,
              }}
            >
              Precision in every facet.
              <br />
              Nothing more.
            </h2>
          </div>

          <form onSubmit={handleSubscribe} className="minimal-newsletter-form" aria-label="Newsletter signup">
            <label
              htmlFor="minimal-newsletter"
              style={{
                display: 'block',
                fontFamily: mono,
                fontSize: minimal.type.micro,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#767676',
                marginBottom: '10px',
              }}
            >
              Newsletter
            </label>
            <div className="minimal-newsletter-control">
              <input
                id="minimal-newsletter"
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: 'none',
                  background: '#FFFFFF',
                  color: '#050505',
                  fontFamily: font,
                  fontSize: minimal.type.bodySm,
                  fontWeight: 400,
                  padding: '0 14px',
                  height: '44px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="minimal-newsletter-submit"
                style={{
                  border: 'none',
                  borderLeft: '1px solid #E5E5E5',
                  background: '#050505',
                  color: '#FFFFFF',
                  height: '44px',
                  padding: '0 16px',
                  fontFamily: mono,
                  fontSize: minimal.type.micro,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Join
              </button>
            </div>
            <p
              style={{
                margin: '10px 0 0',
                minHeight: '18px',
                fontFamily: font,
                fontSize: minimal.type.caption,
                color: isSubscribed ? '#050505' : '#767676',
              }}
              aria-live="polite"
            >
              {isSubscribed ? 'Subscribed. We will keep it concise.' : 'Monthly updates on new collections and atelier notes.'}
            </p>
          </form>
        </div>

        <div
          className="minimal-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
            gap: 'clamp(32px, 4vw, 48px)',
            paddingBottom: 'clamp(48px, 6vh, 72px)',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: mono,
                fontSize: minimal.type.micro,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#767676',
                marginBottom: '20px',
              }}
            >
              Shop
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <MagneticLink strength={0.15} radius={40}>
                  <HoverLineReveal color="#6B6B6B">
                  <Link
                    href={item.href}
                    className="minimal-footer-link"
                    style={{
                      fontFamily: font,
                      fontSize: minimal.type.body,
                      fontWeight: 400,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                  </HoverLineReveal>
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontFamily: mono,
                fontSize: minimal.type.micro,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#767676',
                marginBottom: '20px',
              }}
            >
              Information
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <MagneticLink strength={0.15} radius={40}>
                  <HoverLineReveal color="#6B6B6B">
                  <Link
                    href={item.href}
                    className="minimal-footer-link"
                    style={{
                      fontFamily: font,
                      fontSize: minimal.type.body,
                      fontWeight: 400,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                  </HoverLineReveal>
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontFamily: mono,
                fontSize: minimal.type.micro,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#767676',
                marginBottom: '20px',
              }}
            >
              Services
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <MagneticLink strength={0.15} radius={40}>
                  <HoverLineReveal color="#6B6B6B">
                  <Link
                    href={item.href}
                    className="minimal-footer-link"
                    style={{
                      fontFamily: font,
                      fontSize: minimal.type.body,
                      fontWeight: 400,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                  </HoverLineReveal>
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontFamily: mono,
                fontSize: minimal.type.micro,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#767676',
                marginBottom: '20px',
              }}
            >
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontFamily: font, fontSize: minimal.type.body, fontWeight: 400, color: '#6B6B6B', margin: 0 }}>
                +1 (212) 555-0174
              </p>
              <p style={{ fontFamily: font, fontSize: minimal.type.body, fontWeight: 400, color: '#6B6B6B', margin: 0 }}>
                concierge@minimalmachine.com
              </p>
              <p style={{ fontFamily: font, fontSize: minimal.type.body, fontWeight: 400, color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>
                712 Fifth Avenue
                <br />
                New York, NY 10019
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="minimal-footer-bottom"
          style={{
            borderTop: '1px solid #E5E5E5',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: mono,
              fontSize: minimal.type.micro,
              letterSpacing: '0.15em',
              color: '#767676',
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Minimal Machine. All rights reserved.
          </p>
          <div className="minimal-footer-meta">
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="minimal-footer-link"
                  style={{
                    fontFamily: mono,
                    fontSize: minimal.type.micro,
                    letterSpacing: '0.15em',
                    color: '#767676',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="minimal-footer-social"
                  aria-label={social.label}
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '1px solid #E5E5E5',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6B6B6B',
                    textDecoration: 'none',
                    fontFamily: mono,
                    fontSize: minimal.type.micro,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {social.short}
                </a>
              ))}
              <BackToTop mode="inline" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .minimal-footer-intro {
          margin-bottom: clamp(48px, 6vh, 72px);
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: end;
        }
        .minimal-newsletter-form {
          width: 100%;
          max-width: 420px;
          justify-self: end;
        }
        .minimal-newsletter-control {
          border: 1px solid #E5E5E5;
          background: #FFFFFF;
          display: flex;
          align-items: stretch;
          transition: border-color 220ms ease, box-shadow 260ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .minimal-newsletter-control:focus-within {
          border-color: #050505;
          box-shadow: inset 0 0 0 1px #050505;
        }
        .minimal-newsletter-submit {
          transition: background-color 200ms ease, color 200ms ease;
        }
        .minimal-newsletter-submit:hover {
          opacity: 0.85;
        }
        .minimal-footer-link {
          transition: color 200ms ease;
          display: inline-block;
          padding: 8px 0;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .minimal-footer-link:hover {
          opacity: 0.5;
        }
        .minimal-footer-meta {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .minimal-footer-social {
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms ease, border-color 200ms ease;
        }
        .minimal-footer-social:hover {
          opacity: 0.5;
        }
        .minimal-footer-social:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }
        .minimal-footer-grid {
          overflow: hidden;
          max-width: 100%;
        }
        @media (max-width: 900px) {
          .minimal-footer-intro {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .minimal-newsletter-form {
            justify-self: start;
          }
          .minimal-footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
        /* Extra bottom padding on mobile so footer content isn't hidden behind toolbar */
        @media (max-width: 768px) {
          footer {
            padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px) + 8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .minimal-newsletter-control,
          .minimal-newsletter-submit,
          .minimal-footer-link,
          .minimal-footer-social {
            transition: none !important;
          }
          .minimal-footer-social:hover {
            transform: none !important;
          }
        }
      `}</style>
    </footer>
  )
}
