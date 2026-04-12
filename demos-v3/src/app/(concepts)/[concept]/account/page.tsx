'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function AccountPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Your Account"
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Account', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-lg px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="text-center py-12">
          <h2 className={`text-lg font-light tracking-[0.05em] mb-4 ${concept.fonts.headingClass}`}>
            Sign In
          </h2>
          <p className="text-xs font-light opacity-50 mb-8">
            Access your orders, wishlist, and account settings.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
              style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
              style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
            />
            <button
              type="submit"
              className="w-full py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
              style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
            >
              Sign In
            </button>
          </form>
          <p className="text-xs opacity-40 mt-6">
            Don&apos;t have an account?{' '}
            <button className="underline opacity-80 hover:opacity-100 transition-opacity">
              Create one
            </button>
          </p>
        </div>
      </div>
    </ConceptLayout>
  )
}
