import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vault Maison — Ultra-Luxury Diamond E-Commerce",
    template: "%s | Vault Maison",
  },
  description:
    "Vault Maison presents 10 distinct UI concept directions for ultra-luxury diamond and fine jewelry e-commerce. Each concept explores a unique design philosophy — from minimalist restraint to cinematic immersion.",
  keywords: [
    "luxury jewelry",
    "diamond e-commerce",
    "fine jewelry",
    "engagement rings",
    "luxury design concepts",
    "Vault Maison",
    "GemHub",
    "GemLightBox",
  ],
  authors: [{ name: "Vault Maison" }],
  creator: "Vault Maison",
  publisher: "Vault Maison",
  metadataBase: new URL("https://vault-maison.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vault-maison.vercel.app",
    siteName: "Vault Maison",
    title: "Vault Maison — 10 Ultra-Luxury E-Commerce Concepts",
    description:
      "Explore 10 distinct UI concept directions for ultra-luxury diamond and fine jewelry e-commerce.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vault Maison — Ultra-Luxury Diamond E-Commerce Concepts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vault Maison — Ultra-Luxury Diamond E-Commerce",
    description:
      "10 distinct UI concept directions for ultra-luxury diamond and fine jewelry e-commerce.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Schema.org JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vault Maison",
              url: "https://vault-maison.vercel.app",
              logo: "https://vault-maison.vercel.app/images/logo.png",
              description:
                "Ultra-luxury diamond and fine jewelry e-commerce platform featuring 10 distinct design concepts.",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "concierge@vaultmaison.com",
              },
            }),
          }}
        />
        {/* Schema.org JSON-LD for WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Vault Maison",
              url: "https://vault-maison.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://vault-maison.vercel.app/{concept}/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Preconnect to font providers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Tier 4: Space Mono for brutalist monospace elements (prices, codes, specs) */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
