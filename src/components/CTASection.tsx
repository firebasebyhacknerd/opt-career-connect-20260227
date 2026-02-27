'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue via-primary-teal to-secondary-orange" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-lg lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              <Sparkles className="h-4 w-4" />
              No fee. No trial. Start now.
            </span>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
              Take control of your OPT job search this week
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90">
              Get a sharper resume, better target roles, and a clearer plan from day one.
            </p>

            <div className="mb-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-left">
                <Zap className="mb-3 h-5 w-5" />
                <p className="mb-1 font-semibold">Fast setup</p>
                <p className="text-sm text-white/85">Start searching and analyzing in under 2 minutes.</p>
              </div>
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-left">
                <ShieldCheck className="mb-3 h-5 w-5" />
                <p className="mb-1 font-semibold">International-first</p>
                <p className="text-sm text-white/85">Built around visa-aware workflows and job targeting.</p>
              </div>
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-left">
                <ArrowRight className="mb-3 h-5 w-5" />
                <p className="mb-1 font-semibold">Actionable output</p>
                <p className="text-sm text-white/85">Every insight maps to what you should do next.</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-bold text-primary-blue transition hover:bg-slate-100">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/demo" className="inline-flex items-center justify-center rounded-xl border border-white/35 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10">
                Explore Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
