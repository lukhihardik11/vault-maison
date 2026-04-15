import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[120px] font-extralight leading-none text-[#D4AF37] mb-4">
          404
        </p>
        <h1 className="text-2xl tracking-[0.15em] uppercase text-[#EAEAEA] mb-4 font-light">
          Page Not Found
        </h1>
        <p className="text-sm text-[#EAEAEA]/60 leading-relaxed mb-8">
          The page you are looking for may have been moved, deleted, or perhaps never existed. 
          Let us guide you back to our collection.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
          >
            Return Home
          </Link>
          <Link
            href="/vault/collections"
            className="px-8 py-3 border border-[#EAEAEA]/30 text-[#EAEAEA] text-xs tracking-[0.2em] uppercase transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            View Collections
          </Link>
        </div>
      </div>
    </div>
  )
}
