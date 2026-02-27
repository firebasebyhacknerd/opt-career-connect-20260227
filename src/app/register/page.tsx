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
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-lg backdrop-blur lg:p-12">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-teal/20 bg-primary-teal/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-teal">
              <Sparkles className="h-4 w-4" />
              Early Access Build
            </span>

            <h1 className="mb-4 text-4xl font-bold text-dark-blue">Registration is coming next</h1>
            <p className="mx-auto mb-8 max-w-2xl text-dark-gray">
              Auth screens are not wired in this version yet, but core product tools are fully available right now.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
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
