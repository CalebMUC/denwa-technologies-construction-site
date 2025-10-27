import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'], // optional: any private routes
    },
    sitemap: 'https://www.denwainnovations.co.ke/sitemap.xml',
  }
}