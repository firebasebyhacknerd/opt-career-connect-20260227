import { NextRequest, NextResponse } from 'next/server'
import { getRuntimeConfig } from '@/lib/config/service'

export const maxDuration = 10

interface AnalysisResult {
  overallScore: number
  atsScore: number
  keywordScore: number
  formatScore: number
  contentScore: number
  missingSkills: string[]
  improvements: string[]
  suggestions: string[]
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'you', 'your', 'will', 'are', 'our',
  'have', 'has', 'not', 'but', 'all', 'can', 'into', 'about', 'role', 'job', 'work', 'team',
  'years', 'year', 'using', 'ability', 'required', 'requirements', 'responsibilities', 'experience',
  'skills', 'skill', 'candidate', 'position', 'who', 'what', 'when', 'where', 'why', 'how', 'they',
  'them', 'their', 'his', 'her', 'she', 'him', 'its', 'was', 'were', 'been', 'being', 'also', 'usa',
])

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function extractKeywords(text: string, limit = 40): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9+\-#.\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word))

  const counts = new Map<string, number>()
  for (const word of words) {
    counts.set(word, (counts.get(word) || 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word)
}

function parseJsonFromText(raw: string): AnalysisResult | null {
  if (!raw) return null

  const codeBlockMatch = raw.match(/```json\s*([\s\S]*?)```/i) || raw.match(/```\s*([\s\S]*?)```/i)
  const candidate = codeBlockMatch?.[1] || raw

  try {
    const parsed = JSON.parse(candidate)
    if (
      typeof parsed?.overallScore === 'number' &&
      typeof parsed?.atsScore === 'number' &&
      typeof parsed?.keywordScore === 'number' &&
      typeof parsed?.formatScore === 'number' &&
      typeof parsed?.contentScore === 'number' &&
      Array.isArray(parsed?.missingSkills) &&
      Array.isArray(parsed?.improvements) &&
      Array.isArray(parsed?.suggestions)
    ) {
      return {
        overallScore: clamp(Math.round(parsed.overallScore), 0, 100),
        atsScore: clamp(Math.round(parsed.atsScore), 0, 100),
        keywordScore: clamp(Math.round(parsed.keywordScore), 0, 100),
        formatScore: clamp(Math.round(parsed.formatScore), 0, 100),
        contentScore: clamp(Math.round(parsed.contentScore), 0, 100),
        missingSkills: parsed.missingSkills.slice(0, 10).map(String),
        improvements: parsed.improvements.slice(0, 10).map(String),
        suggestions: parsed.suggestions.slice(0, 10).map(String),
      }
    }
  } catch {
    return null
  }

  return null
}

function buildFallbackAnalysis(resumeText: string, jobDescription: string): AnalysisResult {
  const resumeWords = new Set(extractKeywords(resumeText, 120))
  const jobKeywords = extractKeywords(jobDescription, 50)

  const matched = jobKeywords.filter((keyword) => resumeWords.has(keyword))
  const matchRatio = matched.length / Math.max(jobKeywords.length, 1)

  const keywordScore = clamp(Math.round(matchRatio * 100), 25, 98)

  const atsSignals = ['experience', 'education', 'skills', 'project', 'summary']
  const atsMatches = atsSignals.filter((signal) => resumeText.toLowerCase().includes(signal)).length
  const atsScore = clamp(Math.round((atsMatches / atsSignals.length) * 100), 35, 95)

  const formatScore = clamp(resumeText.length > 1200 ? 85 : resumeText.length > 700 ? 75 : 60, 40, 95)
  const contentScore = clamp(Math.round((keywordScore * 0.6) + (formatScore * 0.4)), 30, 97)
  const overallScore = clamp(
    Math.round((atsScore + keywordScore + formatScore + contentScore) / 4),
    30,
    98
  )

  const missingSkills = jobKeywords.filter((keyword) => !resumeWords.has(keyword)).slice(0, 5)

  return {
    overallScore,
    atsScore,
    keywordScore,
    formatScore,
    contentScore,
    missingSkills: missingSkills.length > 0 ? missingSkills : ['leadership', 'communication'],
    improvements: [
      'Add measurable achievements with numbers and outcomes.',
      'Mirror high-value keywords from the job description in experience bullets.',
      'Refine summary section to align with target role and visa context.',
    ],
    suggestions: [
      'Prioritize projects using the same tools and stack listed in the job description.',
      'Use ATS-friendly section headings and consistent formatting.',
      'Include role-specific keywords in both summary and skills section.',
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const runtimeConfig = await getRuntimeConfig()
    const body = await request.json()
    const resumeText = String(body.resumeText || '').trim()
    const jobDescription = String(body.jobDescription || '').trim()

    // Validate input
    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      )
    }

    let analysis: AnalysisResult | null = null
    let source: 'groq' | 'fallback' = 'fallback'

    if (runtimeConfig.ai.provider === 'groq' && runtimeConfig.ai.groqApiKey) {
      try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${runtimeConfig.ai.groqApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: runtimeConfig.ai.groqModel,
            messages: [{
              role: 'user',
              content: `Analyze this resume against the job description and provide detailed feedback:

Resume: ${resumeText.substring(0, 2000)}

Job Description: ${jobDescription.substring(0, 2000)}

Please provide:
1. Overall match score (0-100)
2. ATS compatibility score (0-100)
3. Keyword match score (0-100)
4. Format and structure score (0-100)
5. Content quality score (0-100)
6. Top 5 missing skills or keywords to add
7. Top 3 resume improvements to make
8. Specific suggestions for tailoring to this job

Format your response as JSON with these exact keys: overallScore, atsScore, keywordScore, formatScore, contentScore, missingSkills, improvements, suggestions`
            }],
            max_tokens: 1000,
            temperature: 0.3,
          }),
        })

        if (groqResponse.ok) {
          const groqData = await groqResponse.json()
          analysis = parseJsonFromText(groqData.choices?.[0]?.message?.content || '')
          if (analysis) {
            source = 'groq'
          }
        }
      } catch (groqError) {
        console.error('Groq analysis failed, using fallback:', groqError)
      }
    }

    if (!analysis) {
      if (!runtimeConfig.ai.fallbackEnabled) {
        return NextResponse.json(
          {
            error: 'AI provider unavailable',
            message: 'Groq analysis failed and fallback is disabled in admin configuration.',
          },
          { status: 503 }
        )
      }

      analysis = buildFallbackAnalysis(resumeText, jobDescription)
      source = 'fallback'
    }

    return NextResponse.json({
      success: true,
      analysis,
      source,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json(
      {
        error: 'Failed to analyze resume',
        message: 'Please try again later'
      },
      { status: 500 }
    )
  }
}
