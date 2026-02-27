import type { MetadataRoute } from 'next'
import { getRuntimeConfig } from '@/lib/config/service'
import { getSiteUrl } from '@/lib/brand'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const runtimeConfig = await getRuntimeConfig()
  const baseUrl = runtimeConfig.site.baseUrl || getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
