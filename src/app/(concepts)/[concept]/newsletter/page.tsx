'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function NewsletterPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [subscribed, setSubscribed] = useState(false)

  if (!concept) return null

  const interestOptions = [
    'Diamond Jewelry',
    'Gold Collections',
    'Loose Diamonds',
    'Wedding & Bridal',
    'Bespoke Service',
    'New Arrivals',
    'Sale & Events',
    'Investment Insights',
  ]

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  if (subscribed) {
    return (
      <ConceptLayout concept={concept}>
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: concept.palette.accent }}
            >
              <Check size={24} color={concept.palette.bg} />
            </div>
            <h2 className={`text-2xl font-light mb-4 ${concept.fonts.headingClass}`}>Welcome to the Inner Circle</h2>
            <p className="text-sm font-light opacity-60 mb-8">
              Thank you, {firstName}. You&apos;ll receive our next dispatch at {email}. Expect curated insights, early access, and exclusive invitations.
            </p>
            <a
              href={buildConceptUrl(concept.id)}
              className="inline-block px-8 py-3 text-[10px] uppercase tracking-[0.2em]"
              style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
            >
              Continue Exploring
            </a>
          </motion.div>
        </div>
      </ConceptLayout>
    )
  }

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Newsletter"
        subtitle="Join our inner circle for exclusive access, insights, and invitations."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Newsletter', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-xl px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="text-center mb-10">
          <Mail size={32} strokeWidth={0.8} className="mx-auto mb-4" style={{ color: concept.palette.accent }} />
          <p className="text-sm font-light opacity-60 leading-relaxed">
            Receive curated content including new collection previews, behind-the-scenes stories from our atelier, diamond market insights, and invitations to exclusive events.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full py-3 text-sm font-light bg-transparent outline-none"
              style={{ borderBottom: `1px solid ${concept.palette.muted}`, color: concept.palette.text }}
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full py-3 text-sm font-light bg-transparent outline-none"
              style={{ borderBottom: `1px solid ${concept.palette.muted}`, color: concept.palette.text }}
              required
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] mb-4 opacity-60">I&apos;m Interested In</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className="px-3 py-1.5 text-[10px] tracking-[0.1em] transition-all"
                  style={{
                    border: `1px solid ${interests.includes(interest) ? concept.palette.accent : concept.palette.muted}`,
                    color: interests.includes(interest) ? concept.palette.accent : concept.palette.text,
                    backgroundColor: interests.includes(interest) ? `${concept.palette.accent}10` : 'transparent',
                    opacity: interests.includes(interest) ? 1 : 0.6,
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
            style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
          >
            Subscribe
          </button>

          <p className="text-[10px] text-center opacity-30 leading-relaxed">
            By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time. We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </ConceptLayout>
  )
}
