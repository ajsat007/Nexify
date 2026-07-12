import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexify.tech'

  const pages = [
    '', 'about', 'services', 'products', 'portfolio', 'pricing', 'blog', 'careers', 'faq', 'contact',
    'case-studies', 'industries', 'testimonials', 'techstack', 'ai-automation', 'business-automation',
    'dashboards', 'docs', 'finance', 'hr', 'marketing', 'sops', 'branding', 'growth', 'ops',
  ]

  return pages.map(page => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
    priority: page === '' ? 1.0 : 0.8,
  }))
}
