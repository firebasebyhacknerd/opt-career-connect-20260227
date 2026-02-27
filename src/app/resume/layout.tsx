import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Resume Analysis',
  description:
    'Analyze your resume for OPT applications with ATS-oriented suggestions and role-based keyword guidance.',
  alternates: {
    canonical: '/resume',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
