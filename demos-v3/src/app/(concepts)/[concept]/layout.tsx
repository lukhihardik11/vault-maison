import { notFound } from 'next/navigation'
import { concepts } from '@/data/concepts'

export const dynamicParams = true

export function generateStaticParams() {
  return concepts.map((c) => ({ concept: c.id }))
}

export default async function ConceptRouteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ concept: string }>
}) {
  const { concept: conceptId } = await params
  const concept = concepts.find((c) => c.id === conceptId)
  if (!concept) notFound()

  return <>{children}</>
}
