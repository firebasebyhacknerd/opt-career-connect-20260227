import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Search, Sparkles } from 'lucide-react'
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

const demoChecks = [
  'Jobs API with fallback mode',
  'Resume analysis AI with fallback scoring',
  'Admin runtime config and source controls',
]

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="container py-16">
          <div className="lux-panel mx-auto max-w-5xl p-8 lg:p-10">
            <span className="lux-chip">
              <Sparkles className="h-3.5 w-3.5" />
              Demo Mode
            </span>

            <h1 className="mt-4 text-4xl font-bold text-dark-blue">Walk through the live product flow</h1>
            <p className="mt-3 max-w-3xl text-dark-gray">
              Validate the complete experience in minutes. Every flow below is connected to your current runtime config.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {demoChecks.map((item) => (
                <div key={item} className="lux-soft p-3 text-sm text-slate-700">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary-green" />
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
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
                  Analyze resume quality against a role description. If AI is unavailable, fallback scoring handles it.
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
