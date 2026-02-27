'use client'

import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'Is this platform free for OPT and CPT students?',
    answer:
      'Yes. Core search, resume analysis, and matching flows are free for job seekers in this build.',
  },
  {
    question: 'How is this different from generic job boards?',
    answer:
      'Search and matching are tuned for international student context, visa-aware filtering, and role-fit recommendations.',
  },
  {
    question: 'Can I edit AI and job source configuration later?',
    answer:
      'Yes. The admin config console lets you update provider, model, fallback behavior, and site settings without code changes.',
  },
  {
    question: 'Will this work without DB settings configured?',
    answer:
      'Yes. The app is designed with fallback behavior so core flows continue with env/default values when needed.',
  },
]

export default function FAQSection() {
  return (
    <section className="pb-16">
      <div className="container">
        <div className="rounded-3xl border border-slate-200/80 bg-white/92 p-6 shadow-sm backdrop-blur lg:p-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-blue">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="mb-2 text-3xl font-bold text-dark-blue">Common questions</h2>
          <p className="mb-8 text-dark-gray">Everything you need before starting your next application sprint.</p>

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <h3 className="text-base font-semibold text-dark-blue">{item.question}</h3>
                <p className="mt-1 text-sm text-medium-gray">{item.answer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
