'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Quote, Star } from 'lucide-react'

const SuccessStories = () => {
  const stories = [
    {
      name: 'Maria Rodriguez',
      university: 'University of Texas',
      visa: 'OPT to H-1B',
      role: 'Software Engineer',
      company: 'Google',
      quote:
        'The resume analysis highlighted exactly what recruiters needed. My callbacks improved within two weeks.',
      rating: 5,
      stats: {
        applications: 12,
        interviews: 4,
        offers: 2,
      },
    },
    {
      name: 'Ahmed Hassan',
      university: 'University of Illinois',
      visa: 'CPT to OPT',
      role: 'Data Scientist',
      company: 'Amazon',
      quote:
        'I stopped applying blindly. The platform gave me role-fit direction and clear improvements for each application cycle.',
      rating: 5,
      stats: {
        applications: 8,
        interviews: 3,
        offers: 1,
      },
    },
    {
      name: 'Priya Sharma',
      university: 'Columbia University',
      visa: 'OPT',
      role: 'Financial Analyst',
      company: 'Goldman Sachs',
      quote:
        'The suggestions were practical and specific. I rewrote my bullets, matched key terms, and converted interviews into offers.',
      rating: 5,
      stats: {
        applications: 15,
        interviews: 5,
        offers: 3,
      },
    },
  ]

  return (
    <section className="py-24" id="stories">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-dark-blue lg:text-5xl">
            Proof from real student journeys
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-dark-gray">
            These outcomes come from disciplined targeting, better resume signal, and consistent follow-through.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-6 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-slate-200/75 bg-white/90 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-blue to-primary-teal">
                  <span className="text-lg font-bold text-white">
                    {story.name
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark-blue group-hover:text-primary-blue">{story.name}</h3>
                  <p className="text-sm text-medium-gray">{story.university}</p>
                  <div className="mt-1">
                    <span className="rounded-full bg-primary-blue/10 px-2 py-1 text-xs font-semibold text-primary-blue">
                      {story.visa}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5 rounded-2xl border border-primary-teal/20 bg-primary-teal/5 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary-teal" />
                  <span className="font-semibold text-dark-blue">{story.role}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-medium-gray">
                  <MapPin className="h-4 w-4" />
                  <span>{story.company}</span>
                </div>
              </div>

              <div className="relative mb-5">
                <Quote className="absolute -left-1 -top-1 h-8 w-8 text-primary-blue/20" />
                <blockquote className="pl-6 text-sm leading-relaxed text-dark-gray">"{story.quote}"</blockquote>
              </div>

              <div className="mb-5 flex items-center gap-1">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={`${story.name}-star-${i}`} className="h-4 w-4 fill-secondary-orange text-secondary-orange" />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-blue">{story.stats.applications}</div>
                  <div className="text-xs text-medium-gray">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-purple">{story.stats.interviews}</div>
                  <div className="text-xs text-medium-gray">Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-teal">{story.stats.offers}</div>
                  <div className="text-xs text-medium-gray">Offers</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 bg-gradient-to-r from-primary-blue/5 via-primary-teal/5 to-secondary-orange/5 p-8 text-center lg:p-12"
        >
          <h3 className="mb-4 text-3xl font-bold text-dark-blue">Ready to build your own outcome?</h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-dark-gray">
            Start with one focused role, optimize your resume for it, and ship stronger applications this week.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="btn btn-primary px-8 py-3 text-base">
              Start Your Journey
            </Link>
            <Link href="/demo" className="btn btn-secondary px-8 py-3 text-base">
              See Product Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SuccessStories
