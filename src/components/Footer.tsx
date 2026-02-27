'use client'

import Link from 'next/link'
import { GraduationCap, Mail, ShieldCheck, Star } from 'lucide-react'
import { brand } from '@/lib/brand'

const jobsByLocation = ['New York', 'San Francisco', 'Dallas', 'Austin', 'Seattle']
const jobsByPreference = ['Work from home', 'Full time', 'Part time', 'Visa sponsorship', 'Internship']
const jobsByIndustry = ['Software', 'Finance', 'Healthcare IT', 'Consulting', 'Data Science']

const companyLinks = [
  { name: 'For Recruiters', href: '/demo' },
  { name: 'Upload CV', href: '/register' },
  { name: 'Admin Console', href: '/admin/config' },
  { name: 'Product Demo', href: '/demo' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-20%] h-64 w-64 rounded-full bg-primary-blue/25 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-64 w-64 rounded-full bg-primary-teal/20 blur-3xl" />
      </div>

      <div className="container relative z-10 py-14">
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue to-primary-teal text-white shadow-lg">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-white">{brand.name}</p>
              <p className="text-xs text-slate-400">{brand.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary-teal-light" />
              Secure config runtime
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">
              <Star className="h-3.5 w-3.5 text-secondary-orange-light" />
              Premium job discovery UX
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Jobs - Location</h3>
            <ul className="space-y-2 text-sm">
              {jobsByLocation.map((item) => (
                <li key={item}>
                  <Link href={`/jobs?location=${encodeURIComponent(item)}`} className="text-slate-300 transition hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Jobs - Preference</h3>
            <ul className="space-y-2 text-sm">
              {jobsByPreference.map((item) => (
                <li key={item}>
                  <Link href={`/jobs?q=${encodeURIComponent(item)}`} className="text-slate-300 transition hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Jobs - Industry</h3>
            <ul className="space-y-2 text-sm">
              {jobsByIndustry.map((item) => (
                <li key={item}>
                  <Link href={`/jobs?q=${encodeURIComponent(item)}`} className="text-slate-300 transition hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Company</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={`mailto:${brand.supportEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
              <Mail className="h-4 w-4" />
              {brand.supportEmail}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-5 text-xs text-slate-400">
          <p>{currentYear} {brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
