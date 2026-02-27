import type { Metadata, Viewport } from 'next'
import { Manrope, Sora } from 'next/font/google'
import { getRuntimeConfig } from '@/lib/config/service'
import { brand, getSiteUrl } from '@/lib/brand'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-brand-display'
})

export const dynamic = 'force-dynamic'

function safeUrl(candidate: string): URL {
  try {
    return new URL(candidate)
  } catch {
    return new URL(brand.website)
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const runtimeConfig = await getRuntimeConfig()
  const baseUrl = runtimeConfig.site.baseUrl || getSiteUrl()
  const metadataBaseUrl = safeUrl(baseUrl)

  return {
    applicationName: brand.name,
    metadataBase: metadataBaseUrl,
    title: {
      default: `${brand.name} | AI Job Platform for OPT & CPT Students`,
      template: `%s | ${brand.name}`,
    },
    description: 'Find OPT jobs, CPT internships, and H1B sponsorship opportunities with AI-powered resume analysis for international students in the USA.',
    keywords: 'OPT jobs, CPT internships, F1 visa jobs, international student careers, AI job matching, resume analysis',
    category: 'Career',
    authors: [{ name: `${brand.name} Team`, url: metadataBaseUrl.toString() }],
    creator: brand.name,
    publisher: brand.name,
    alternates: {
      canonical: '/',
    },
    robots: 'index, follow',
    openGraph: {
      title: `${brand.name} - AI-Powered Job Platform for International Students`,
      description: `${brand.tagline}. Find your dream job with AI-powered resume analysis and visa-aware job matching.`,
      url: metadataBaseUrl.toString(),
      siteName: brand.name,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${brand.name} - AI-Powered Job Platform`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.name} - AI-Powered Job Platform`,
      description: `${brand.tagline}. Find OPT jobs with AI resume analysis.`,
      images: ['/twitter-image.jpg'],
      creator: '@OPTCareerConnect',
    },
    verification: {
      google: runtimeConfig.site.googleVerification || undefined,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable}`}>
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  )
}
