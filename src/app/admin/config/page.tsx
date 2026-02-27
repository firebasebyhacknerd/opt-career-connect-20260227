import AdminConfigConsole from '@/components/AdminConfigConsole'
import SiteHeader from '@/components/SiteHeader'
import type { Metadata } from 'next'
import { brand } from '@/lib/brand'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Config Console',
  description: `Secure runtime configuration console for ${brand.name}.`,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function AdminConfigPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SiteHeader />
      <main>
        <div className="absolute top-12 left-10 w-64 h-64 rounded-full bg-primary-blue/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-8 right-12 w-72 h-72 rounded-full bg-secondary-orange/10 blur-3xl pointer-events-none" />
        <div className="container py-10 relative z-10">
          <AdminConfigConsole />
        </div>
      </main>
    </div>
  )
}
