'use client'

import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Building2, MapPin, Search, Sparkles, UploadCloud } from 'lucide-react'

const trustPoints = [
  'Fresh OPT and CPT opportunities updated regularly',
  'AI-assisted resume and role matching workflow',
  'Designed for international students in the US',
]

export default function HeroSection() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) {
      params.set('q', keyword.trim())
    }
    if (location.trim()) {
      params.set('location', location.trim())
    }

    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <section className="relative overflow-hidden pb-14 pt-14 lg:pb-20 lg:pt-20" id="home">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-primary-blue/15 blur-3xl" />
        <div className="absolute right-[-14%] top-[6%] h-[28rem] w-[28rem] rounded-full bg-primary-teal/14 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[35%] h-[20rem] w-[20rem] rounded-full bg-secondary-orange/14 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-blue shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Platform
            </span>

            <h1 className="mb-5 text-4xl font-bold leading-tight text-dark-blue sm:text-5xl lg:text-6xl">
              India-style instant job flow,
              <span className="block bg-gradient-to-r from-primary-blue via-primary-teal to-secondary-orange bg-clip-text text-transparent">
                reimagined for OPT and CPT careers
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-dark-gray">
              Discover relevant roles faster, improve your resume with AI support, and apply with confidence using a
              premium, focused hiring experience.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="btn btn-primary px-8 py-3">
                Upload CV and 10x Search
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/demo" className="btn btn-secondary px-8 py-3">
                Watch Product Demo
              </Link>
            </div>

            <ul className="grid gap-2 text-sm text-medium-gray sm:grid-cols-2 lg:grid-cols-1">
              {trustPoints.map((point) => (
                <li key={point} className="inline-flex items-start gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 backdrop-blur">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-teal" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-3xl border border-slate-200/80 bg-white/88 p-6 shadow-2xl shadow-slate-300/35 backdrop-blur lg:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-dark-blue">Search jobs</h2>
              <span className="rounded-full bg-secondary-green/10 px-3 py-1 text-xs font-semibold text-secondary-green">
                Live matching
              </span>
            </div>

            <form onSubmit={handleSearch} className="space-y-3">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">Search by keyword</span>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    type="text"
                    placeholder="Role, company, skill"
                    className="w-full rounded-xl border border-slate-300 bg-white px-10 py-3 text-sm outline-none transition focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">Search by location</span>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    type="text"
                    placeholder="City or Remote"
                    className="w-full rounded-xl border border-slate-300 bg-white px-10 py-3 text-sm outline-none transition focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                  />
                </div>
              </label>

              <button type="submit" className="btn btn-primary w-full justify-center">
                <Search className="h-4 w-4" />
                Search
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-center">
                <p className="text-lg font-bold text-primary-blue">4.6/5</p>
                <p className="text-[11px] text-slate-500">Seeker rating</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-center">
                <p className="text-lg font-bold text-primary-teal">500+</p>
                <p className="text-[11px] text-slate-500">Top companies</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-center">
                <p className="text-lg font-bold text-secondary-orange">Free</p>
                <p className="text-[11px] text-slate-500">for seekers</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <Link href="/resume" className="inline-flex items-center gap-1 rounded-full border border-primary-teal/25 bg-primary-teal/10 px-3 py-1.5 font-semibold text-primary-teal">
                <UploadCloud className="h-3.5 w-3.5" />
                AI CV Enhancer
              </Link>
              <Link href="/jobs" className="inline-flex items-center gap-1 rounded-full border border-primary-blue/25 bg-primary-blue/10 px-3 py-1.5 font-semibold text-primary-blue">
                <Building2 className="h-3.5 w-3.5" />
                Premium company jobs
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
