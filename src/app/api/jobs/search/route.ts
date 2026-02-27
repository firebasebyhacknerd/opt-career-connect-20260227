import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getRuntimeConfig } from '@/lib/config/service'

export const maxDuration = 10

interface SearchJob {
  id: number
  title: string
  company: string
  companyLogo?: string | null
  description: string
  location: string
  salary?: string | null
  jobType: string
  experienceLevel: string
  remote: boolean
  visaSponsorship: boolean
  visaTypes: string[]
  skills: string[]
  benefits?: string[]
  postedDate: string
  source: string
  applicationUrl?: string | null
  matchScore: number
}

interface SearchPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface SearchResponse {
  success: boolean
  jobs: SearchJob[]
  pagination: SearchPagination
  query: {
    search: string
    location: string
    filters: {
      visaType: string
      jobType: string
      experienceLevel: string
      remote: boolean | null
    }
  }
  fallback?: boolean
  warning?: string
  aiEnhanced?: boolean
}

interface StudentProfile {
  studentId?: string | number
  visaType?: string
}

interface DbJobRow {
  id: number
  title: string
  company: string
  company_logo: string | null
  description: string
  location: string
  salary_min: number | null
  salary_max: number | null
  salary_currency: string | null
  job_type: string
  experience_level: string
  remote: boolean
  visa_sponsorship: boolean
  visa_types: string[] | null
  skills_required: string[] | null
  benefits: string[] | null
  posted_date: string
  source: string
  application_url: string | null
}

const FALLBACK_JOBS: SearchJob[] = [
  {
    id: 10001,
    title: 'Software Engineer - OPT Friendly',
    company: 'TechCorp Inc.',
    description:
      'Join our product engineering team to build scalable web features. Open to OPT/CPT candidates with strong JavaScript and React skills.',
    location: 'San Francisco, CA',
    salary: 'USD 90,000 - 120,000',
    jobType: 'FULL_TIME',
    experienceLevel: 'ENTRY_LEVEL',
    remote: false,
    visaSponsorship: true,
    visaTypes: ['OPT', 'CPT', 'H1B'],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    benefits: ['Health Insurance', '401(k)', 'Learning Budget'],
    postedDate: new Date().toISOString(),
    source: 'Local Fallback',
    applicationUrl: 'https://example.com/apply/software-engineer',
    matchScore: 82,
  },
  {
    id: 10002,
    title: 'Data Analyst - Remote',
    company: 'DataDriven LLC',
    description:
      'Analyze product and growth data, build dashboards, and support business decisions. Great fit for students with SQL and Python.',
    location: 'Remote',
    salary: 'USD 70,000 - 95,000',
    jobType: 'FULL_TIME',
    experienceLevel: 'ENTRY_LEVEL',
    remote: true,
    visaSponsorship: true,
    visaTypes: ['OPT', 'H1B'],
    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
    benefits: ['Remote Stipend', 'Medical', 'PTO'],
    postedDate: new Date(Date.now() - 86400000).toISOString(),
    source: 'Local Fallback',
    applicationUrl: 'https://example.com/apply/data-analyst',
    matchScore: 78,
  },
  {
    id: 10003,
    title: 'Financial Analyst',
    company: 'FinanceFirst',
    description:
      'Support forecasting, reporting, and strategic analysis in a high-growth finance team. OPT and CPT candidates encouraged to apply.',
    location: 'New York, NY',
    salary: 'USD 75,000 - 100,000',
    jobType: 'FULL_TIME',
    experienceLevel: 'ENTRY_LEVEL',
    remote: false,
    visaSponsorship: true,
    visaTypes: ['OPT', 'CPT', 'H1B'],
    skills: ['Excel', 'Financial Modeling', 'PowerPoint', 'SQL'],
    benefits: ['Bonus', 'Health Insurance', 'Transit Support'],
    postedDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    source: 'Local Fallback',
    applicationUrl: 'https://example.com/apply/financial-analyst',
    matchScore: 74,
  },
]

function hydratePostgresEnv(): void {
  if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
    process.env.POSTGRES_URL = process.env.DATABASE_URL
  }
}

function matchContains(value: string, query: string): boolean {
  return value.toLowerCase().includes(query.toLowerCase())
}

function buildFallbackResponse(params: {
  query: string
  location: string
  visaType: string
  jobType: string
  experienceLevel: string
  remote: boolean | null
  page: number
  limit: number
  warning?: string
}): SearchResponse {
  const { query, location, visaType, jobType, experienceLevel, remote, page, limit, warning } = params

  const filteredJobs = FALLBACK_JOBS.filter((job) => {
    const queryMatch =
      !query ||
      matchContains(job.title, query) ||
      matchContains(job.company, query) ||
      matchContains(job.description, query)

    const locationMatch = !location || matchContains(job.location, location)
    const visaMatch = !visaType || job.visaTypes.some((type) => type.toLowerCase() === visaType.toLowerCase())
    const jobTypeMatch = !jobType || job.jobType === jobType
    const levelMatch = !experienceLevel || job.experienceLevel === experienceLevel
    const remoteMatch = remote === null ? true : job.remote === remote

    return queryMatch && locationMatch && visaMatch && jobTypeMatch && levelMatch && remoteMatch
  })

  const total = filteredJobs.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const normalizedPage = Math.min(page, totalPages)
  const offset = (normalizedPage - 1) * limit
  const jobs = filteredJobs.slice(offset, offset + limit)

  return {
    success: true,
    jobs,
    pagination: {
      page: normalizedPage,
      limit,
      total,
      totalPages,
      hasNext: normalizedPage < totalPages,
      hasPrev: normalizedPage > 1,
    },
    query: {
      search: query,
      location,
      filters: {
        visaType,
        jobType,
        experienceLevel,
        remote,
      },
    },
    fallback: true,
    warning,
  }
}

function mapDbJob(job: DbJobRow): SearchJob {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    companyLogo: job.company_logo,
    description: job.description?.substring(0, 200) + (job.description?.length > 200 ? '...' : ''),
    location: job.location,
    salary:
      job.salary_min && job.salary_max
        ? `${job.salary_currency || 'USD'} ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
        : null,
    jobType: job.job_type,
    experienceLevel: job.experience_level,
    remote: job.remote,
    visaSponsorship: job.visa_sponsorship,
    visaTypes: job.visa_types || [],
    skills: job.skills_required || [],
    benefits: job.benefits || [],
    postedDate: job.posted_date,
    source: job.source,
    applicationUrl: job.application_url,
    matchScore: Math.floor(Math.random() * 40) + 60,
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const location = searchParams.get('location') || ''
  const visaType = searchParams.get('visaType') || ''
  const jobType = searchParams.get('jobType') || ''
  const experienceLevel = searchParams.get('experienceLevel') || ''
  const remoteParam = searchParams.get('remote')
  const remote = remoteParam === null ? null : remoteParam === 'true'
  const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1)
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20') || 20))
  const offset = (page - 1) * limit
  const runtimeConfig = await getRuntimeConfig()
  const sourceMode = runtimeConfig.jobs.sourceMode
  const allowFallback = runtimeConfig.jobs.fallbackEnabled

  try {
    hydratePostgresEnv()

    if (sourceMode === 'fallback') {
      return NextResponse.json(
        buildFallbackResponse({
          query,
          location,
          visaType,
          jobType,
          experienceLevel,
          remote,
          page,
          limit,
          warning: 'Fallback mode forced by admin config (jobs.source_mode=fallback).',
        })
      )
    }

    if (!process.env.POSTGRES_URL) {
      if (sourceMode === 'database' || !allowFallback) {
        return NextResponse.json(
          {
            error: 'Database unavailable',
            message: 'jobs.source_mode requires database, but POSTGRES_URL/DATABASE_URL is not configured.',
          },
          { status: 503 }
        )
      }

      return NextResponse.json(
        buildFallbackResponse({
          query,
          location,
          visaType,
          jobType,
          experienceLevel,
          remote,
          page,
          limit,
          warning: 'Database not configured. Showing local fallback jobs (jobs.source_mode=auto).',
        })
      )
    }

    const whereConditions: string[] = ['is_active = true']
    const params: Array<string | number | boolean> = []
    let paramIndex = 1

    if (query) {
      whereConditions.push(
        `(title ILIKE $${paramIndex} OR company ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      )
      params.push(`%${query}%`)
      paramIndex++
    }

    if (location) {
      whereConditions.push(`location ILIKE $${paramIndex}`)
      params.push(`%${location}%`)
      paramIndex++
    }

    if (visaType) {
      whereConditions.push(`$${paramIndex} = ANY(visa_types)`)
      params.push(visaType)
      paramIndex++
    }

    if (jobType) {
      whereConditions.push(`job_type = $${paramIndex}`)
      params.push(jobType)
      paramIndex++
    }

    if (experienceLevel) {
      whereConditions.push(`experience_level = $${paramIndex}`)
      params.push(experienceLevel)
      paramIndex++
    }

    if (remote !== null) {
      whereConditions.push(`remote = $${paramIndex}`)
      params.push(remote)
      paramIndex++
    }

    const whereClause = whereConditions.join(' AND ')

    const countQuery = `SELECT COUNT(*) as total FROM job_listings WHERE ${whereClause}`
    const countResult = await sql.query<{ total: string }>(countQuery, params)
    const totalJobs = parseInt(countResult.rows[0]?.total || '0')

    const jobsQuery = `
      SELECT
        id, title, company, company_logo, description, location,
        salary_min, salary_max, salary_currency, job_type,
        experience_level, remote, visa_sponsorship, visa_types,
        skills_required, benefits, posted_date,
        source, application_url
      FROM job_listings
      WHERE ${whereClause}
      ORDER BY posted_date DESC, id DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `

    params.push(limit, offset)
    const jobsResult = await sql.query<DbJobRow>(jobsQuery, params)
    const jobs = jobsResult.rows.map(mapDbJob)

    try {
      await sql`
        INSERT INTO search_queries (query, filters, results_count, searched_at)
        VALUES (
          ${query},
          ${JSON.stringify({ location, visaType, jobType, experienceLevel, remote, page, limit })},
          ${jobs.length},
          NOW()
        )
      `
    } catch (analyticsError) {
      console.error('Analytics error:', analyticsError)
    }

    return NextResponse.json({
      success: true,
      jobs,
      pagination: {
        page,
        limit,
        total: totalJobs,
        totalPages: Math.max(1, Math.ceil(totalJobs / limit)),
        hasNext: page * limit < totalJobs,
        hasPrev: page > 1,
      },
      query: {
        search: query,
        location,
        filters: {
          visaType,
          jobType,
          experienceLevel,
          remote,
        },
      },
    } satisfies SearchResponse)
  } catch (error) {
    if (!allowFallback || sourceMode === 'database') {
      console.error('Job search error with fallback disabled:', error)
      return NextResponse.json(
        {
          error: 'Failed to search jobs',
          message: 'Database query failed and fallback is disabled by admin config.',
        },
        { status: 503 }
      )
    }

    console.error('Job search error, serving fallback data:', error)
    return NextResponse.json(
      buildFallbackResponse({
        query,
        location,
        visaType,
        jobType,
        experienceLevel,
        remote,
        page,
        limit,
        warning: 'Database query failed. Showing local fallback jobs.',
      })
    )
  }
}

// POST endpoint for advanced job search with AI matching
export async function POST(request: NextRequest) {
  try {
    const runtimeConfig = await getRuntimeConfig()
    const body = (await request.json()) as {
      query?: string
      location?: string
      studentProfile?: StudentProfile
    }

    const query = body.query || ''
    const location = body.location || ''
    const studentProfile = body.studentProfile

    const basicSearch = await GET(
      new NextRequest(`${request.url}?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&limit=50`)
    )

    if (!basicSearch.ok) {
      throw new Error('Basic search failed')
    }

    const searchData = (await basicSearch.json()) as SearchResponse

    if (!runtimeConfig.jobs.advancedMatchingEnabled) {
      return NextResponse.json({ ...searchData, aiEnhanced: false } satisfies SearchResponse)
    }

    if (!studentProfile?.studentId || !searchData.jobs?.length) {
      return NextResponse.json({ ...searchData, aiEnhanced: false } satisfies SearchResponse)
    }

    hydratePostgresEnv()
    if (!process.env.POSTGRES_URL || runtimeConfig.jobs.sourceMode === 'fallback') {
      return NextResponse.json({ ...searchData, aiEnhanced: false } satisfies SearchResponse)
    }

    try {
      const resumeResult = await sql`
        SELECT skills, experience_years, education_level
        FROM resumes
        WHERE student_id = ${studentProfile.studentId}
        ORDER BY created_at DESC
        LIMIT 1
      `
      const resumeData = resumeResult.rows[0] as
        | { skills: string[] | null; experience_years: number; education_level: string | null }
        | undefined

      if (!resumeData) {
        return NextResponse.json({ ...searchData, aiEnhanced: false } satisfies SearchResponse)
      }

      const studentSkills = (resumeData.skills || []).map((skill) => skill.toLowerCase())
      const visaType = studentProfile.visaType || ''

      const enhancedJobs = searchData.jobs
        .map((job) => {
          const jobSkills = (job.skills || []).map((skill) => skill.toLowerCase())
          const skillMatch = jobSkills.filter((skill) =>
            studentSkills.some((studentSkill) => studentSkill.includes(skill) || skill.includes(studentSkill))
          ).length

          const skillScore = jobSkills.length > 0 ? (skillMatch / jobSkills.length) * 100 : 50
          const experienceMatch = resumeData.experience_years >= getExperienceRequirement(job.experienceLevel)
          const visaMatch = !visaType || job.visaTypes.includes(visaType)

          const finalScore = Math.round(
            skillScore * 0.6 + (experienceMatch ? 100 : 70) * 0.2 + (visaMatch ? 100 : 50) * 0.2
          )

          return {
            ...job,
            matchScore: Math.min(finalScore, 100),
            skillMatch,
            totalSkills: jobSkills.length,
            experienceMatch,
            visaMatch,
          }
        })
        .sort((a, b) => b.matchScore - a.matchScore)

      return NextResponse.json({
        ...searchData,
        jobs: enhancedJobs,
        aiEnhanced: true,
        studentProfile: {
          skills: resumeData.skills,
          experience: resumeData.experience_years,
          education: resumeData.education_level,
        },
      })
    } catch (dbError) {
      console.error('Advanced matching failed, returning basic results:', dbError)
      return NextResponse.json({ ...searchData, aiEnhanced: false } satisfies SearchResponse)
    }
  } catch (error) {
    console.error('Advanced job search error:', error)
    return NextResponse.json(
      {
        error: 'Failed to perform advanced search',
        message: 'Please try again later',
      },
      { status: 500 }
    )
  }
}

function getExperienceRequirement(level: string): number {
  switch (level?.toLowerCase()) {
    case 'entry_level':
      return 0
    case 'mid_level':
      return 2
    case 'senior':
      return 5
    case 'executive':
      return 8
    default:
      return 0
  }
}
