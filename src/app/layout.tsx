import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sami-portfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sami Ul Mubeen – Digital Product Engineer & UI/UX Designer',
    template: '%s | Sami Ul Mubeen',
  },
  description:
    'Digital Product Engineer specializing in UI/UX Design, Frontend Development (Next.js, React), WordPress, Technical SEO, Business Automation, and AI-powered solutions. Transforming ideas into exceptional digital products for startups, enterprises, and NGOs.',
  keywords: [
    'Digital Product Engineer',
    'UI/UX Designer',
    'Frontend Developer',
    'WordPress Developer',
    'Technical SEO',
    'Business Automation',
    'AI Solutions',
    'Next.js Developer',
    'React Developer',
    'Odoo CRM',
    'Sami Ul Mubeen',
  ],
  authors: [{ name: 'Sami Ul Mubeen' }],
  creator: 'Sami Ul Mubeen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Sami Ul Mubeen',
    title: 'Sami Ul Mubeen – Digital Product Engineer & UI/UX Designer',
    description:
      'Transforming ideas into exceptional digital products — UI/UX design, frontend engineering, SEO, automation, and AI solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sami Ul Mubeen – Digital Product Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sami Ul Mubeen – Digital Product Engineer',
    description: 'UI/UX Design · Frontend Development · WordPress · SEO · Automation · AI',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0F1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sami Ul Mubeen',
              jobTitle: 'Digital Product Engineer',
              description:
                'Digital Product Engineer specializing in UI/UX Design, Frontend Development, WordPress, SEO & Business Automation',
              url: siteUrl,
              knowsAbout: [
                'UI/UX Design',
                'Frontend Development',
                'WordPress Development',
                'Technical SEO',
                'Business Automation',
                'AI Solutions',
                'Next.js',
                'React',
              ],
              offers: {
                '@type': 'Offer',
                description: 'Digital Product Engineering Services',
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#0A0F1A] text-brand-light antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
