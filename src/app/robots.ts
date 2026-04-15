import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/_next/'],
      },
    ],
    sitemap: 'https://vault-maison.vercel.app/sitemap.xml',
  }
}
