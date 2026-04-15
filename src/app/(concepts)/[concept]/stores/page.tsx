'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

const locations = [
  {
    city: 'London',
    name: 'Mayfair Flagship',
    address: '47 New Bond Street, Mayfair, London W1S 1DE',
    phone: '+44 20 7946 0958',
    email: 'london@vaultmaison.com',
    hours: 'Mon–Sat: 10:00 AM – 7:00 PM\nSun: 12:00 PM – 5:00 PM',
    features: ['Private Viewing Suite', 'Bespoke Design Studio', 'Diamond Grading Lab', 'Champagne Lounge'],
    flagship: true,
  },
  {
    city: 'New York',
    name: 'Fifth Avenue',
    address: '725 Fifth Avenue, Suite 1200, New York, NY 10022',
    phone: '+1 212 555 0147',
    email: 'newyork@vaultmaison.com',
    hours: 'Mon–Sat: 10:00 AM – 8:00 PM\nSun: 11:00 AM – 6:00 PM',
    features: ['Private Consultation Rooms', 'Bespoke Service', 'In-House Engraving'],
    flagship: false,
  },
  {
    city: 'Dubai',
    name: 'DIFC Gate Village',
    address: 'Gate Village Building 3, Level 2, DIFC, Dubai',
    phone: '+971 4 555 0892',
    email: 'dubai@vaultmaison.com',
    hours: 'Sun–Thu: 10:00 AM – 9:00 PM\nFri–Sat: 2:00 PM – 10:00 PM',
    features: ['VIP Lounge', 'Private Viewing', 'Concierge Service'],
    flagship: false,
  },
  {
    city: 'Paris',
    name: 'Place Vendôme',
    address: '12 Place Vendôme, 75001 Paris',
    phone: '+33 1 42 60 00 00',
    email: 'paris@vaultmaison.com',
    hours: 'Mon–Sat: 10:30 AM – 7:00 PM\nSun: Closed',
    features: ['Heritage Salon', 'Haute Joaillerie Atelier', 'Private Events'],
    flagship: false,
  },
]

export default function StoresPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Our Stores"
        subtitle="Visit us in person for a private, immersive experience."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Stores', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="space-y-12">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10"
              style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className={`text-xl font-light ${concept.fonts.headingClass}`}>{loc.city}</h2>
                  {loc.flagship && (
                    <span
                      className="text-[8px] uppercase tracking-[0.2em] px-2 py-0.5"
                      style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                    >
                      Flagship
                    </span>
                  )}
                </div>
                <p className="text-xs font-light opacity-60">{loc.name}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: concept.palette.accent }} />
                  <p className="text-xs font-light opacity-60 leading-relaxed">{loc.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: concept.palette.accent }} />
                  <p className="text-xs font-light opacity-60 leading-relaxed whitespace-pre-line">{loc.hours}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} strokeWidth={1.5} className="flex-shrink-0" style={{ color: concept.palette.accent }} />
                  <p className="text-xs font-light opacity-60">{loc.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} strokeWidth={1.5} className="flex-shrink-0" style={{ color: concept.palette.accent }} />
                  <p className="text-xs font-light opacity-60">{loc.email}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3 opacity-40">Services Available</p>
                <div className="flex flex-wrap gap-2">
                  {loc.features.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] px-3 py-1 tracking-[0.05em]"
                      style={{ border: `1px solid ${concept.palette.muted}`, opacity: 0.7 }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <Link
                  href={buildConceptUrl(concept.id, 'appointments')}
                  className="inline-block mt-4 text-[10px] uppercase tracking-[0.2em] pb-1"
                  style={{ borderBottom: `1px solid ${concept.palette.accent}`, color: concept.palette.accent }}
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <CTABanner
        concept={concept}
        title="Can't Visit in Person?"
        description="Schedule a virtual consultation with our specialists."
        ctaLabel="Book Virtual Tour"
        ctaHref={buildConceptUrl(concept.id, 'appointments')}
      />
    </ConceptLayout>
  )
}
