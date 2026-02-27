'use client'

import { motion } from 'framer-motion'
import { Building2, CheckCircle, Clock3, Globe2 } from 'lucide-react'

const TrustBadges = () => {
  const badges = [
    {
      icon: Globe2,
      title: 'Visa-aware by design',
      text: 'Focused on OPT, CPT, and international student hiring',
      color: 'text-primary-blue',
    },
    {
      icon: Building2,
      title: 'Employer network',
      text: 'Roles from startups, mid-size firms, and enterprise teams',
      color: 'text-primary-teal',
    },
    {
      icon: Clock3,
      title: 'Fast feedback',
      text: 'Actionable resume insights in seconds, not days',
      color: 'text-secondary-orange',
    },
    {
      icon: CheckCircle,
      title: 'Real student outcomes',
      text: 'Built around real placement workflows and measurable progress',
      color: 'text-secondary-green',
    },
  ]

  return (
    <section className="py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-4 rounded-3xl border border-slate-200/75 bg-gradient-to-r from-white/90 via-slate-50/95 to-white/90 p-5 shadow-sm backdrop-blur md:grid-cols-2 lg:grid-cols-4 lg:p-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <badge.icon className={`mb-3 h-6 w-6 ${badge.color}`} />
              <p className="mb-1 text-sm font-bold text-dark-blue">{badge.title}</p>
              <p className="text-sm text-medium-gray">
                {badge.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBadges
