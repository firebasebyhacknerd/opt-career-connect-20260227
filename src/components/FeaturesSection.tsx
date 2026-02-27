'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, ShieldCheck, Sparkles } from 'lucide-react'

const topCompanies = [
  { name: 'Google', roles: 'Software, Data, Cloud', tone: 'from-blue-50 to-white' },
  { name: 'Amazon', roles: 'SDE, Ops, Analytics', tone: 'from-orange-50 to-white' },
  { name: 'Microsoft', roles: 'Product, AI, Engineering', tone: 'from-cyan-50 to-white' },
  { name: 'Goldman Sachs', roles: 'Finance, Risk, Tech', tone: 'from-amber-50 to-white' },
  { name: 'Deloitte', roles: 'Consulting, Strategy, Tech', tone: 'from-emerald-50 to-white' },
  { name: 'Uber', roles: 'Data, Platform, Growth', tone: 'from-slate-100 to-white' },
]

const industryTags = [
  'Software Engineering',
  'Data Science',
  'Product Management',
  'DevOps & Cloud',
  'Cybersecurity',
  'Business Analyst',
  'Finance & FinTech',
  'Healthcare Tech',
  'Marketing Analytics',
  'Operations',
]

export default function FeaturesSection() {
  return (
    <section className="py-20" id="features">
      <div className="container space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur lg:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-blue">
                <Sparkles className="h-3.5 w-3.5" />
                Premium Companies
              </span>
              <h2 className="mt-3 text-3xl font-bold text-dark-blue">Target hiring brands students trust</h2>
              <p className="mt-2 max-w-2xl text-dark-gray">
                Jump to openings from high-intent employers and reduce random applications.
              </p>
            </div>
            <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-blue hover:underline">
              Explore all companies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topCompanies.map((company, index) => (
              <motion.article
                key={company.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className={`rounded-2xl border border-slate-200 bg-gradient-to-b ${company.tone} p-4`}
              >
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Building2 className="h-5 w-5 text-primary-blue" />
                </div>
                <h3 className="text-lg font-semibold text-dark-blue">{company.name}</h3>
                <p className="mt-1 text-sm text-medium-gray">{company.roles}</p>
                <Link href={`/jobs?q=${encodeURIComponent(company.name)}`} className="mt-4 inline-flex text-sm font-semibold text-primary-blue hover:underline">
                  View roles
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-gradient-to-r from-white/95 via-primary-teal/5 to-white/95 p-6 shadow-sm backdrop-blur lg:p-8"
        >
          <div className="mb-5 flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 text-primary-teal" />
            <div>
              <h3 className="text-2xl font-bold text-dark-blue">Popular job categories</h3>
              <p className="mt-1 text-dark-gray">Browse curated domains based on demand and OPT relevance.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {industryTags.map((tag) => (
              <Link
                key={tag}
                href={`/jobs?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-teal hover:text-primary-teal"
              >
                {tag}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
