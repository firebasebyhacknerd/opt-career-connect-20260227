import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import TrustBadges from '@/components/TrustBadges'
import SuccessStories from '@/components/SuccessStories'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import FAQSection from '@/components/FAQSection'
import { brand, getSiteUrl } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'AI Job Platform for OPT & CPT Students',
  description:
    'Find OPT jobs, CPT internships, and resume insights with an AI-powered platform built for international students in the USA.',
}

export default function Home() {
  const siteUrl = getSiteUrl()
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: siteUrl,
    description: brand.description,
    sameAs: [
      brand.social.linkedin,
      brand.social.twitter,
    ],
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: brand.name,
    url: siteUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <SiteHeader />
      <HeroSection />
      <TrustBadges />
      <FeaturesSection />
      <SuccessStories />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
