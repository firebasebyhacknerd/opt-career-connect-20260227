'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Brain, Compass, Search, Sparkles, Target } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24" id="home">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[26rem] w-[26rem] rounded-full bg-primary-blue/15 blur-3xl" />
        <div className="absolute right-[-12%] top-[5%] h-[24rem] w-[24rem] rounded-full bg-primary-teal/15 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-[22rem] w-[22rem] rounded-full bg-secondary-orange/15 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-blue">
              <Sparkles className="h-4 w-4" />
              Built for OPT and CPT students in the USA
            </span>

            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-dark-blue sm:text-5xl lg:text-6xl">
              Launch your US career with
              <span className="block bg-gradient-to-r from-primary-blue via-primary-teal to-secondary-orange bg-clip-text text-transparent">
                practical AI guidance
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-dark-gray">
              Search visa-aware jobs, analyze your resume against real openings, and track progress in one place.
              No guesswork, no paid gate.
            </p>

            <div className="mb-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/jobs" className="btn btn-primary px-8 py-3 text-base">
                Explore Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/resume" className="btn btn-secondary px-8 py-3 text-base">
                Analyze Resume
              </Link>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-white/75 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-primary-blue">10k+</p>
                <p className="text-xs font-medium text-medium-gray">Students Supported</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/75 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-primary-teal">500+</p>
                <p className="text-xs font-medium text-medium-gray">Employers Hiring</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/75 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-secondary-orange">95%</p>
                <p className="text-xs font-medium text-medium-gray">Positive Outcomes</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-2xl shadow-slate-300/40 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-dark-blue">Live Career Dashboard</h2>
                <span className="rounded-full bg-secondary-green/10 px-3 py-1 text-xs font-semibold text-secondary-green">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-primary-blue/20 bg-primary-blue/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-primary-blue">
                    <Brain className="h-4 w-4" />
                    <span className="text-sm font-semibold">Resume AI Insights</span>
                  </div>
                  <p className="text-sm text-dark-gray">
                    Added 7 role keywords for "Backend Engineer" and raised ATS compatibility to 86%.
                  </p>
                </div>

                <div className="rounded-2xl border border-primary-teal/20 bg-primary-teal/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-primary-teal">
                    <Search className="h-4 w-4" />
                    <span className="text-sm font-semibold">Job Stream</span>
                  </div>
                  <p className="text-sm text-dark-gray">
                    14 new OPT-friendly roles found in Austin, Seattle, and remote US teams.
                  </p>
                </div>

                <div className="rounded-2xl border border-secondary-orange/20 bg-secondary-orange/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-secondary-orange">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-semibold">Application Focus</span>
                  </div>
                  <p className="text-sm text-dark-gray">
                    Prioritize Data Engineer roles this week based on profile fit and visa policy match.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -left-4 -top-4 hidden rounded-xl border border-slate-200 bg-white/90 p-3 shadow-lg lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-dark-blue">
                <Compass className="h-4 w-4 text-primary-blue" />
                Career Direction Updated
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
