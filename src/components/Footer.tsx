'use client'

import Link from 'next/link'
import { GraduationCap, Mail, Shield, Wrench } from 'lucide-react'
import { brand } from '@/lib/brand'

const productLinks = [
  { name: 'Home', href: '/' },
  { name: 'Find Jobs', href: '/jobs' },
  { name: 'Resume Analysis', href: '/resume' },
  { name: 'Product Demo', href: '/demo' },
]

const companyLinks = [
  { name: `Why ${brand.name}`, href: '/#features' },
  { name: 'Student Stories', href: '/#stories' },
  { name: 'Get Started', href: '/register' },
  { name: 'Admin Config', href: '/admin/config' },
]

const supportLinks = [
  { name: 'Deployment Guide', href: '/demo' },
  { name: 'Email Support', href: `mailto:${brand.supportEmail}` },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue to-primary-teal text-white">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-white">{brand.name}</p>
                <p className="text-xs text-slate-400">{brand.tagline}</p>
              </div>
            </div>

            <p className="mb-6 max-w-xl text-sm text-slate-300">
              Practical AI support for OPT and CPT job search: resume quality analysis, visa-aware role discovery,
              and configurable operations for fast iteration.
            </p>

            <div className="flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">
                <Shield className="h-3.5 w-3.5 text-primary-teal-light" />
                Secure admin config
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">
                <Wrench className="h-3.5 w-3.5 text-secondary-orange-light" />
                Runtime updates without redeploy
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">Product</h3>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">Company & Support</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-300 transition hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>{currentYear} {brand.name}. All rights reserved.</p>
          <a href={`mailto:${brand.supportEmail}`} className="inline-flex items-center gap-2 text-slate-300 transition hover:text-white">
            <Mail className="h-4 w-4" />
            {brand.supportEmail}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
