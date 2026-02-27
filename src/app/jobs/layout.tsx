import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search OPT Jobs & CPT Internships',
  description:
    'Explore OPT-friendly jobs and CPT internships with visa-aware filters and AI-guided matching.',
  alternates: {
    canonical: '/jobs',
  },
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
