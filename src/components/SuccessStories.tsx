'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Brain,
  CheckCircle2,
  FileSearch,
  SlidersHorizontal,
} from 'lucide-react'

const personalizedBuckets = [
  {
    title: 'Based on your profile',
    description: 'Recommended roles from your uploaded resume and target domain.',
    tags: ['AI Match Score', 'Skills Gap Alerts', 'Role Prioritization'],
  },
  {
    title: 'Based on location',
    description: 'Get city and remote opportunities with optimized search presets.',
    tags: ['Metro Focus', 'Remote Blend', 'Timezone Friendly'],
  },
  {
    title: 'Based on application stage',
    description: 'Surface jobs that align with your current process and availability.',
    tags: ['Quick Apply', 'Interview-ready', 'H1B Potential'],
  },
]

const premiumFeatures = [
  {
    title: 'Resume Deep Scan',
    icon: FileSearch,
    text: 'Role-based ATS checks and rewrite suggestions.',
  },
  {
    title: 'Smart Match Engine',
    icon: Brain,
    text: 'Weighted matching across visa, skill, and company profile.',
  },
  {
    title: 'Instant Alerts',
    icon: BellRing,
    text: 'Get notified when relevant openings go live.',
  },
  {
    title: 'Advanced Filters',
    icon: SlidersHorizontal,
    text: 'Control source mode, role intent, and search depth.',
  },
]

export default function SuccessStories() {
  return (
    <section className="py-20" id="stories">
      <div className="container space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-dark-blue">Jobs made for you, not random lists</h2>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-dark-gray">
            Inspired by fast-market hiring UX, refined for international student career paths and premium decision quality.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {personalizedBuckets.map((bucket, index) => (
            <motion.article
              key={bucket.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-blue">
                <BadgeCheck className="h-3.5 w-3.5" />
                Personalized
              </div>
              <h3 className="text-xl font-semibold text-dark-blue">{bucket.title}</h3>
              <p className="mt-2 text-sm text-medium-gray">{bucket.description}</p>
              <ul className="mt-4 space-y-2">
                {bucket.tags.map((tag) => (
                  <li key={tag} className="inline-flex items-center gap-2 text-sm text-dark-gray">
                    <CheckCircle2 className="h-4 w-4 text-secondary-green" />
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/70 p-6 shadow-sm lg:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-3xl font-bold text-dark-blue">Premium features for serious job seekers</h3>
              <p className="mt-2 text-dark-gray">Same practical flow, delivered with sharper UX and richer guidance.</p>
            </div>
            <Link href="/resume" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-blue hover:underline">
              Open resume AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {premiumFeatures.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <feature.icon className="mb-2 h-5 w-5 text-primary-teal" />
                <h4 className="text-lg font-semibold text-dark-blue">{feature.title}</h4>
                <p className="mt-1 text-sm text-medium-gray">{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
