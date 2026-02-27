export const brand = {
  name: 'OPT Career Connect',
  shortName: 'OCC',
  tagline: 'Your Gateway to American Dreams',
  description:
    'AI-powered career platform for international students on OPT, CPT, and F-1 pathways in the United States.',
  supportEmail: 'support@optcareerconnect.com',
  website: 'https://optcareerconnect.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/opt-career-connect',
    twitter: 'https://twitter.com/OPTCareerConnect',
  },
} as const

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || brand.website
}
