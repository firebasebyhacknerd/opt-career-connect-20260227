import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Platform Demo',
  description: `Preview ${brand.name} end-to-end flow for jobs discovery and resume analysis.`,
  alternates: {
    canonical: '/demo',
  },
}

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="container py-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-lg backdrop-blur lg:p-10">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-blue">
              <Sparkles className="h-4 w-4" />
              Demo Mode
            </span>
            <h1 className="mb-3 text-4xl font-bold text-dark-blue">Walk through the live workflow</h1>
            <p className="mb-10 max-w-2xl text-dark-gray">
              Use these pages to validate your deployment quickly. Jobs and resume analysis work with runtime config
              and fallback behavior.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <h2 className="mb-2 text-xl font-bold text-dark-blue">1. Job Discovery</h2>
                <p className="mb-4 text-sm text-dark-gray">
                  Search visa-aware jobs. If the database is unavailable, fallback jobs are returned automatically.
                </p>
                <Link href="/jobs" className="btn btn-primary inline-flex items-center gap-2">
                  Open Jobs
                  <Search className="h-4 w-4" />
                </Link>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <h2 className="mb-2 text-xl font-bold text-dark-blue">2. Resume Analysis</h2>
                <p className="mb-4 text-sm text-dark-gray">
                  Analyze resume quality against a role description. AI key missing? Local scoring fallback handles it.
                </p>
                <Link href="/resume" className="btn btn-primary inline-flex items-center gap-2">
                  Open Resume Tool
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
