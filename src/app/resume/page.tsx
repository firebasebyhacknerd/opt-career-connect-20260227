'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast, { Toaster } from 'react-hot-toast'
import {
  AlertCircle,
  Brain,
  CheckCircle,
  FileText,
  Sparkles,
  Target,
  Upload,
} from 'lucide-react'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'

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

const steps = [
  { number: 1, title: 'Upload Resume' },
  { number: 2, title: 'Add Role Context' },
  { number: 3, title: 'AI Analysis' },
  { number: 4, title: 'Action Plan' },
]

export default function ResumeAnalysisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (!uploadedFile) {
      return
    }

    setFile(uploadedFile)
    setResumeText(`Extracted content placeholder for ${uploadedFile.name}`)
    setCurrentStep(2)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const analyzeResume = async () => {
    if (!resumeText || !jobDescription.trim()) {
      toast.error('Upload a resume and provide a job description first')
      return
    }

    setIsAnalyzing(true)
    setCurrentStep(3)

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setAnalysisResult(data.analysis)
      setCurrentStep(4)
      toast.success('Resume analysis complete')
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Failed to analyze resume. Please try again.')
      setCurrentStep(2)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setFile(null)
    setResumeText('')
    setJobDescription('')
    setAnalysisResult(null)
    setCurrentStep(1)
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 py-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-10%] top-[-25%] h-[18rem] w-[18rem] rounded-full bg-primary-blue/15 blur-3xl" />
            <div className="absolute right-[-10%] top-[10%] h-[18rem] w-[18rem] rounded-full bg-primary-teal/15 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <span className="lux-chip">
              <Sparkles className="h-3.5 w-3.5" />
              Resume Intelligence
            </span>
            <h1 className="mt-4 text-4xl font-bold text-dark-blue sm:text-5xl">Luxury-grade AI resume optimization</h1>
            <p className="mt-3 max-w-3xl text-dark-gray">
              Compare your resume against target roles, identify missing signals, and receive structured improvements.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                    step.number <= currentStep
                      ? 'border-primary-blue/30 bg-primary-blue/10 text-primary-blue'
                      : 'border-slate-200 bg-white/85 text-slate-500'
                  }`}
                >
                  {step.number}. {step.title}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-10">
          <div className="mx-auto max-w-5xl">
            {currentStep === 1 && (
              <div className="lux-panel p-8 lg:p-10">
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-3xl font-bold text-dark-blue">Upload your resume</h2>
                  <p className="text-dark-gray">Supported formats: PDF, DOC, DOCX. Max size: 5 MB.</p>
                </div>

                <div
                  {...getRootProps()}
                  className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
                    isDragActive
                      ? 'border-primary-blue bg-primary-blue/5'
                      : 'border-slate-300 bg-slate-50/70 hover:border-primary-blue hover:bg-primary-blue/5'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto mb-3 h-12 w-12 text-slate-500" />
                  <p className="mb-1 text-lg font-semibold text-dark-blue">
                    {isDragActive ? 'Drop your file here' : 'Drag and drop your resume'}
                  </p>
                  <p className="text-sm text-medium-gray">or click to browse your files</p>
                </div>

                {file && (
                  <div className="mt-6 rounded-xl border border-secondary-green/30 bg-secondary-green/10 p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-secondary-green" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-dark-blue">{file.name}</p>
                        <p className="text-xs text-medium-gray">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-secondary-green" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="lux-panel p-8 lg:p-10">
                <h2 className="mb-2 text-3xl font-bold text-dark-blue">Paste target job description</h2>
                <p className="mb-6 text-dark-gray">
                  Include responsibilities, requirements, and required skills for better match quality.
                </p>

                <label>
                  <span className="lux-label">Job description</span>
                  <textarea
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    placeholder="Paste the complete job description here"
                    className="lux-input h-64 resize-none"
                  />
                </label>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
                    Back
                  </button>
                  <button onClick={analyzeResume} disabled={!jobDescription.trim()} className="btn btn-primary">
                    Analyze Resume
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="lux-panel p-12 text-center">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue to-primary-teal text-white">
                  <Brain className="h-8 w-8 animate-pulse" />
                </div>
                <h2 className="mb-2 text-3xl font-bold text-dark-blue">Analyzing your resume with AI</h2>
                <p className="mb-6 text-dark-gray">Comparing role requirements, ATS structure, and keyword signal.</p>
                {isAnalyzing && (
                  <div className="mx-auto max-w-md">
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-primary-blue to-primary-teal" />
                    </div>
                    <p className="mt-3 text-sm text-medium-gray">This may take a few moments.</p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && analysisResult && (
              <div className="space-y-6">
                <div className="lux-panel p-8 text-center">
                  <div className="mx-auto mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue to-primary-teal text-3xl font-bold text-white">
                    {analysisResult.overallScore}
                  </div>
                  <h2 className="mb-1 text-2xl font-bold text-dark-blue">Overall Resume Score</h2>
                  <p className="text-medium-gray">Score out of 100 based on role fit and profile strength.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="lux-panel p-6">
                    <h3 className="mb-4 text-xl font-bold text-dark-blue">Score Breakdown</h3>
                    {[
                      { label: 'ATS Compatibility', value: analysisResult.atsScore, color: 'bg-primary-blue' },
                      { label: 'Keyword Match', value: analysisResult.keywordScore, color: 'bg-primary-purple' },
                      { label: 'Format and Structure', value: analysisResult.formatScore, color: 'bg-primary-teal' },
                      { label: 'Content Quality', value: analysisResult.contentScore, color: 'bg-secondary-green' },
                    ].map((item) => (
                      <div key={item.label} className="mb-4 last:mb-0">
                        <div className="mb-1 flex items-center justify-between text-sm font-semibold text-dark-gray">
                          <span>{item.label}</span>
                          <span>{item.value}/100</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="lux-panel p-6">
                      <h3 className="mb-3 text-xl font-bold text-dark-blue">Missing Skills</h3>
                      <div className="space-y-2">
                        {analysisResult.missingSkills.map((skill, index) => (
                          <div key={`${skill}-${index}`} className="flex items-start gap-2 text-sm text-dark-gray">
                            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-orange" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lux-panel p-6">
                      <h3 className="mb-3 text-xl font-bold text-dark-blue">Top Improvements</h3>
                      <div className="space-y-2">
                        {analysisResult.improvements.map((improvement, index) => (
                          <div key={`${improvement}-${index}`} className="flex items-start gap-2 text-sm text-dark-gray">
                            <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-blue" />
                            <span>{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lux-panel p-6">
                  <h3 className="mb-4 text-xl font-bold text-dark-blue">Tailored Suggestions</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <div key={`${suggestion}-${index}`} className="flex items-start gap-2 text-sm text-dark-gray">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-green" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <button onClick={resetAnalysis} className="btn btn-secondary">
                    Analyze Another Resume
                  </button>
                  <button className="btn btn-primary">
                    <Sparkles className="h-4 w-4" />
                    Download Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
