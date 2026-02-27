import type { MetadataRoute } from 'next'
import { getRuntimeConfig } from '@/lib/config/service'
import { getSiteUrl } from '@/lib/brand'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const runtimeConfig = await getRuntimeConfig()
  const baseUrl = runtimeConfig.site.baseUrl || getSiteUrl()
  const now = new Date()

  const routes = ['', '/jobs', '/resume', '/demo', '/register']

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/jobs' || route === '/resume' ? 0.9 : 0.7,
  }))
}
