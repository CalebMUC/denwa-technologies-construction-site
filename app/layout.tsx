import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// ✅ SEO Metadata for Denwa Innovations
export const metadata: Metadata = {
  title: 'Denwa Innovations | Construction Experts in Kenya',
  description:
    'Denwa Innovations is a professional construction company in Kenya specializing in residential, commercial, and industrial projects. We deliver quality craftsmanship and innovative building solutions across the country.',
  generator: 'Next.js',
  keywords: [
    'Denwa Innovations',
    'construction company Kenya',
    'building contractors Nairobi',
    'residential construction Kenya',
    'commercial builders Kenya',
    'infrastructure projects Kenya',
  ],
  authors: [{ name: 'Denwa Innovations', url: 'https://www.denwainnovations.co.ke' }],
  openGraph: {
    title: 'Denwa Innovations | Professional Construction in Kenya',
    description:
      'We provide reliable construction services across Kenya — from residential homes to commercial developments, with a focus on quality and innovation.',
    url: 'https://www.denwainnovations.co.ke',
    siteName: 'Denwa Innovations',
    images: [
      {
        url: 'https://minimartke-products-upload.s3.us-east-1.amazonaws.com/product-images/27d14ce7-791c-499e-9473-0c1368861a65.jpg',
        width: 800,
        height: 600,
        alt: 'Denwa Innovations Logo',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  icons: {
    icon: 'https://minimartke-products-upload.s3.us-east-1.amazonaws.com/product-images/27d14ce7-791c-499e-9473-0c1368861a65.jpg',
    shortcut: 'https://minimartke-products-upload.s3.us-east-1.amazonaws.com/product-images/27d14ce7-791c-499e-9473-0c1368861a65.jpg',
    apple: 'https://minimartke-products-upload.s3.us-east-1.amazonaws.com/product-images/27d14ce7-791c-499e-9473-0c1368861a65.jpg',
  },
  metadataBase: new URL('https://www.denwainnovations.co.ke'),
  alternates: {
    canonical: 'https://www.denwainnovations.co.ke',
  },
}

const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Denwa Innovations",
    url: "https://www.denwainnovations.co.ke",
    logo: "https://minimartke-products-upload.s3.us-east-1.amazonaws.com/product-images/27d14ce7-791c-499e-9473-0c1368861a65.jpg",
    description:
      "Denwa Innovations is a trusted construction company in Kenya providing residential, commercial, and industrial building solutions with quality craftsmanship and innovation.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nairobi, Kenya",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254717671843",
      contactType: "Customer Service",
      areaServed: "KE",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/denwainnovations", // optional
      "https://www.linkedin.com/company/denwa-innovations", // optional
      "https://www.instagram.com/denwainnovations", // optional
    ],
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
