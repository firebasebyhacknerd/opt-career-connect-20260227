'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, SlidersHorizontal } from 'lucide-react'

const locationLinks = ['Remote', 'New York', 'San Francisco', 'Dallas', 'Austin', 'Seattle']
const preferenceLinks = ['Work from home', 'Top MNC', 'Startup roles', 'Night shift', 'Internships', 'Visa sponsorship']
const industryLinks = ['Software', 'Data Science', 'Finance', 'Healthcare IT', 'Product', 'Operations']

const sections = [
  {
    title: 'Jobs by location',
    icon: MapPin,
    accent: 'text-primary-blue',
    bg: 'from-primary-blue/10 to-primary-blue/0',
    items: locationLinks,
    getHref: (item: string) => `/jobs?location=${encodeURIComponent(item)}`,
  },
  {
    title: 'Jobs by preference',
    icon: SlidersHorizontal,
    accent: 'text-primary-teal',
    bg: 'from-primary-teal/10 to-primary-teal/0',
    items: preferenceLinks,
    getHref: (item: string) => `/jobs?q=${encodeURIComponent(item)}`,
  },
  {
    title: 'Jobs by industry',
    icon: Briefcase,
    accent: 'text-secondary-orange',
    bg: 'from-secondary-orange/12 to-secondary-orange/0',
    items: industryLinks,
    getHref: (item: string) => `/jobs?q=${encodeURIComponent(item)}`,
  },
]

export default function TrustBadges() {
  return (
    <section className="pb-10">
      <div className="container">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-medium-gray">Explore faster</p>
            <h2 className="mt-2 text-2xl font-bold text-dark-blue sm:text-3xl">Find jobs by what matters to you</h2>
          </div>
          <Link href="/jobs" className="text-sm font-semibold text-primary-blue hover:underline">
            View all openings
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur"
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${section.bg}`} />
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2">
                  <section.icon className={`h-5 w-5 ${section.accent}`} />
                  <h3 className="font-semibold text-dark-blue">{section.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <Link
                      key={item}
                      href={section.getHref(item)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-primary-blue hover:text-primary-blue"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
