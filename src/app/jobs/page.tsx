'use client'

import { useEffect, useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {
  Briefcase,
  DollarSign,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wand2,
} from 'lucide-react'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'

interface Job {
  id: number
  title: string
  company: string
  companyLogo?: string
  description: string
  location: string
  salary?: string
  jobType: string
  experienceLevel: string
  remote: boolean
  visaSponsorship: boolean
  visaTypes: string[]
  skills: string[]
  postedDate: string
  source: string
  applicationUrl?: string
  matchScore?: number
}

interface SearchFilters {
  visaType: string
  jobType: string
  experienceLevel: string
  remote: boolean
}

const initialFilters: SearchFilters = {
  visaType: '',
  jobType: '',
  experienceLevel: '',
  remote: false,
}

const formatEnum = (value: string) => value.replace(/_/g, ' ').toLowerCase()

const quickSearches = ['Software Engineer', 'Data Analyst', 'Product Manager', 'Remote', 'Visa Sponsorship']

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    searchJobs()
  }, [currentPage])

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((value) => value !== '' && value !== false).length,
    [filters]
  )

  const searchJobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        location,
        page: currentPage.toString(),
        limit: '12',
        ...Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value !== '' && value !== false)
        ),
      })

      const response = await fetch(`/api/jobs/search?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setJobs(data.jobs)
        setTotalPages(data.pagination.totalPages)
      } else {
        toast.error('Failed to search jobs')
      }
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Failed to search jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    setCurrentPage(1)
    searchJobs()
  }

  const handleFilterChange = (key: keyof SearchFilters, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
    setCurrentPage(1)
    searchJobs()
  }

  const saveJob = () => {
    toast.success('Saved to your shortlist')
  }

  const applyToJob = (job: Job) => {
    if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank', 'noopener,noreferrer')
      return
    }
    toast.success('Application action started')
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 py-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8%] top-[-35%] h-[20rem] w-[20rem] rounded-full bg-primary-blue/15 blur-3xl" />
            <div className="absolute right-[-8%] top-[5%] h-[16rem] w-[16rem] rounded-full bg-primary-teal/15 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="lux-chip">
                  <Sparkles className="h-3.5 w-3.5" />
                  Luxury Job Discovery
                </span>
                <h1 className="mt-4 text-4xl font-bold text-dark-blue sm:text-5xl">Find premium OPT and CPT roles faster</h1>
                <p className="mt-3 max-w-3xl text-dark-gray">
                  Search, filter, and apply using a cleaner workflow tuned for international student hiring.
                </p>
              </div>
              <div className="lux-soft px-4 py-3 text-sm font-medium text-primary-blue">
                <span className="inline-flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  AI matching active
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {quickSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag)
                    setCurrentPage(1)
                  }}
                  className="rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary-blue hover:text-primary-blue"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-8">
          <form onSubmit={handleSearch} className="lux-panel mb-6 p-5 lg:p-6">
            <div className="grid gap-3 lg:grid-cols-[1fr_18rem_auto]">
              <label>
                <span className="lux-label">Role or keyword</span>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Software engineer, analyst, cloud"
                    className="lux-input pl-9"
                  />
                </div>
              </label>

              <label>
                <span className="lux-label">Location</span>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City or remote"
                    className="lux-input pl-9"
                  />
                </div>
              </label>

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters((value) => !value)}
                  className={`inline-flex h-[42px] items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                    showFilters
                      ? 'border-primary-blue bg-primary-blue/10 text-primary-blue'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                </button>
                <button type="submit" className="btn btn-primary h-[42px] px-6" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <label>
                    <span className="lux-label">Visa type</span>
                    <select
                      value={filters.visaType}
                      onChange={(event) => handleFilterChange('visaType', event.target.value)}
                      className="lux-input"
                    >
                      <option value="">All</option>
                      <option value="OPT">OPT</option>
                      <option value="CPT">CPT</option>
                      <option value="H1B">H1B</option>
                      <option value="F1">F1</option>
                    </select>
                  </label>

                  <label>
                    <span className="lux-label">Job type</span>
                    <select
                      value={filters.jobType}
                      onChange={(event) => handleFilterChange('jobType', event.target.value)}
                      className="lux-input"
                    >
                      <option value="">All</option>
                      <option value="FULL_TIME">Full Time</option>
                      <option value="PART_TIME">Part Time</option>
                      <option value="CONTRACT">Contract</option>
                      <option value="INTERNSHIP">Internship</option>
                    </select>
                  </label>

                  <label>
                    <span className="lux-label">Experience</span>
                    <select
                      value={filters.experienceLevel}
                      onChange={(event) => handleFilterChange('experienceLevel', event.target.value)}
                      className="lux-input"
                    >
                      <option value="">All</option>
                      <option value="ENTRY_LEVEL">Entry level</option>
                      <option value="MID_LEVEL">Mid level</option>
                      <option value="SENIOR">Senior</option>
                      <option value="EXECUTIVE">Executive</option>
                    </select>
                  </label>

                  <label className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-700 md:mt-7">
                    <input
                      type="checkbox"
                      checked={filters.remote}
                      onChange={(event) => handleFilterChange('remote', event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-primary-blue focus:ring-primary-blue"
                    />
                    Remote only
                  </label>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button type="button" onClick={clearFilters} className="text-sm font-semibold text-primary-blue hover:underline">
                    Clear filters
                  </button>
                  <button type="button" onClick={() => setShowFilters(false)} className="btn btn-secondary py-2 text-sm">
                    Close panel
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-dark-blue">
              {loading ? 'Searching roles...' : `${jobs.length} roles found`}
            </h2>
            <div className="inline-flex items-center gap-2 text-sm text-medium-gray">
              <ShieldCheck className="h-4 w-4 text-primary-teal" />
              Visa-aware relevance sorting
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={`loading-${index}`} className="lux-panel p-5">
                  <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="mb-2 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                  <article
                    key={job.id}
                    className="lux-panel p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        {job.companyLogo ? (
                          <img src={job.companyLogo} alt={job.company} className="h-10 w-10 rounded-lg object-cover" />
                        ) : (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-blue to-primary-teal text-sm font-bold text-white">
                            {job.company.charAt(0)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-base font-bold text-dark-blue">{job.title}</h3>
                          <p className="truncate text-sm text-medium-gray">{job.company}</p>
                        </div>
                      </div>

                      <button onClick={() => saveJob()} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-primary-blue" aria-label="Save job">
                        <Star className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mb-4 space-y-2 text-sm text-medium-gray">
                      <p className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </p>
                      {job.salary && (
                        <p className="inline-flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </p>
                      )}
                      <p className="inline-flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {formatEnum(job.jobType)} | {formatEnum(job.experienceLevel)}
                      </p>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {job.remote && (
                        <span className="rounded-full bg-secondary-green/10 px-2.5 py-1 text-xs font-semibold text-secondary-green">
                          Remote
                        </span>
                      )}
                      {job.visaSponsorship && (
                        <span className="rounded-full bg-primary-blue/10 px-2.5 py-1 text-xs font-semibold text-primary-blue">
                          Sponsorship
                        </span>
                      )}
                      <span className="rounded-full bg-primary-teal/10 px-2.5 py-1 text-xs font-semibold text-primary-teal">
                        {job.visaTypes[0] || 'OPT'}
                      </span>
                    </div>

                    <p className="mb-4 line-clamp-3 text-sm text-dark-gray">{job.description}</p>

                    {job.matchScore && (
                      <div className="mb-4 rounded-xl border border-primary-blue/20 bg-primary-blue/5 p-3">
                        <div className="mb-1 flex items-center justify-between text-sm font-semibold text-primary-blue">
                          <span>AI Match Score</span>
                          <span>{job.matchScore}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-primary-blue/20">
                          <div className="h-full rounded-full bg-primary-blue" style={{ width: `${job.matchScore}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button onClick={() => applyToJob(job)} className="btn btn-primary flex-1 py-2.5 text-sm">
                        Apply Now
                      </button>
                      <button className="btn btn-secondary px-4 py-2.5 text-sm">Details</button>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-medium-gray">
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>Source: {job.source}</span>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index
                    if (page > totalPages) {
                      return null
                    }
                    return (
                      <button
                        key={`page-${page}`}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          page === currentPage
                            ? 'border-primary-blue bg-primary-blue text-white'
                            : 'border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="lux-panel p-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-6 w-6 text-slate-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-dark-blue">No jobs found</h3>
              <p className="mb-6 text-medium-gray">Try changing the query, location, or filters.</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
