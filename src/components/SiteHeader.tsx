'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { GraduationCap, Menu, X } from 'lucide-react'
import { brand } from '@/lib/brand'

const navLinks = [
  { href: '/jobs', label: 'Jobs' },
  { href: '/resume', label: 'Resume AI' },
  { href: '/demo', label: 'Demo' },
]

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-lg">
      <div className="h-[2px] w-full bg-gradient-to-r from-primary-blue via-primary-teal to-secondary-orange" />
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue to-primary-teal text-white shadow-lg shadow-primary-blue/25">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold text-dark-blue">
                {brand.name}
              </span>
              <span className="hidden text-xs text-medium-gray sm:block">{brand.tagline}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-2 py-1.5 shadow-sm md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  pathname === item.href
                    ? 'bg-primary-blue text-white'
                    : 'text-dark-gray hover:bg-slate-100 hover:text-primary-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/register" className="btn btn-primary py-2 text-sm">
              Start Free
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200/70 bg-white/95 md:hidden">
          <div className="container py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    pathname === item.href
                      ? 'bg-primary-blue text-white'
                      : 'text-dark-gray hover:bg-slate-50 hover:text-primary-blue'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary mt-2 justify-center"
              >
                Start Free
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
