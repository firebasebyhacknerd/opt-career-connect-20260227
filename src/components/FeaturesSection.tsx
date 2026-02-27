'use client'

import { motion } from 'framer-motion'
import { Brain, ClipboardList, Compass, Search, Sparkles, Target } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'Resume AI Coach',
      description:
        'Analyze your resume against a real job description and get prioritized fixes in minutes.',
      color: 'from-primary-blue to-primary-teal',
      benefits: ['ATS-style scoring', 'Keyword gap analysis', 'High-impact rewrite suggestions'],
    },
    {
      icon: Search,
      title: 'Visa-Friendly Job Search',
      description:
        'Search openings with filters tuned for OPT/CPT realities including location, level, and sponsorship.',
      color: 'from-primary-teal to-primary-green',
      benefits: ['Source mode controls', 'Fallback search continuity', 'Relevant job metadata'],
    },
    {
      icon: Compass,
      title: 'Guided Career Direction',
      description:
        'Turn scattered applications into a focused plan using practical next steps and fit-based targeting.',
      color: 'from-secondary-orange to-secondary-pink',
      benefits: ['Role fit summaries', 'Weekly execution checklist', 'Clear application priorities'],
    },
    {
      icon: ClipboardList,
      title: 'Admin Config Console',
      description:
        'Control AI provider, job source behavior, and site-level values without touching code or redeploying.',
      color: 'from-primary-purple to-primary-pink',
      benefits: ['Encrypted secret storage', 'Audit trail for changes', 'Live config with cache invalidation'],
    },
  ]

  const journey = [
    { step: '01', title: 'Upload Resume', detail: 'Drop your resume and add a target role description.' },
    { step: '02', title: 'Review Insights', detail: 'Get detailed scoring for ATS, content, and keyword coverage.' },
    { step: '03', title: 'Apply Smarter', detail: 'Find matching jobs and prioritize high-fit opportunities.' },
  ]

  return (
    <section className="py-24" id="features">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-teal/20 bg-primary-teal/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-teal">
            <Sparkles className="h-4 w-4" />
            Product Capabilities
          </span>
          <h2 className="mb-6 text-4xl font-bold text-dark-blue lg:text-5xl">
            Tools that move you from confusion to interviews
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-dark-gray">
            Every feature is designed for high-velocity job search with visa-aware context and clear next actions.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="mb-5 flex items-start gap-4">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="pt-1 text-xl font-bold text-dark-blue group-hover:text-primary-blue">{feature.title}</h3>
              </div>
              <p className="mb-5 text-dark-gray">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-2 text-sm text-medium-gray">
                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-green" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-lg backdrop-blur lg:p-10"
        >
          <div className="mb-8 max-w-2xl">
            <h3 className="mb-3 text-3xl font-bold text-dark-blue">A focused flow from resume to offer</h3>
            <p className="text-dark-gray">
              The platform is structured as a practical loop: optimize profile quality, target better roles, and
              iterate based on response.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {journey.map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                <p className="mb-3 text-sm font-bold text-primary-blue">{item.step}</p>
                <p className="mb-2 font-semibold text-dark-blue">{item.title}</p>
                <p className="text-sm text-medium-gray">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
