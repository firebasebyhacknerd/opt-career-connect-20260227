import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Create Account',
  description: `Sign up for ${brand.name} to get personalized job matching and resume guidance.`,
  alternates: {
    canonical: '/register',
  },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="container py-16">
          <div className="lux-panel mx-auto max-w-3xl p-8 text-center lg:p-12">
            <span className="lux-chip">
              <Sparkles className="h-3.5 w-3.5" />
              Early Access Build
            </span>

            <h1 className="mt-4 text-4xl font-bold text-dark-blue">Registration launches in the next release</h1>
            <p className="mx-auto mt-3 max-w-2xl text-dark-gray">
              Auth screens are currently under implementation. You can still use all core product modules right now.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/jobs" className="btn btn-primary inline-flex items-center gap-2">
                Explore Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/resume" className="btn btn-secondary">
                Analyze Resume
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
