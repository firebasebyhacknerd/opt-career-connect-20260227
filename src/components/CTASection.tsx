'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, FileText, Search, Sparkles } from 'lucide-react'

const steps = [
  {
    title: 'Create your profile',
    text: 'Upload resume, set target role, and location intent in seconds.',
    icon: FileText,
  },
  {
    title: 'Get curated jobs',
    text: 'Receive role recommendations tuned for OPT/CPT hiring realities.',
    icon: Search,
  },
  {
    title: 'Apply with confidence',
    text: 'Use AI insights to refine CV and ship better applications daily.',
    icon: Briefcase,
  },
]

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue via-primary-teal to-secondary-orange" />
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="container relative z-10">
        <div className="rounded-3xl border border-white/20 bg-white/12 p-7 text-white shadow-2xl backdrop-blur-lg lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              <Sparkles className="h-4 w-4" />
              How it works
            </span>
            <h2 className="text-4xl font-bold leading-tight text-white">Get your dream role in 3 premium steps</h2>
            <p className="mt-3 max-w-3xl text-white/90">
              Keep the speed of job-tatkal style discovery, combined with luxury-grade clarity and decision support.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/25 bg-white/10 p-4"
              >
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                  <step.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-white/85">{step.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-bold text-primary-blue transition hover:bg-slate-100">
              Register free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/jobs" className="inline-flex items-center justify-center rounded-xl border border-white/35 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Start browsing jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
