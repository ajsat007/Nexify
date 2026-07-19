import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nexify Technologies — AI-Native Software Company',
    short_name: 'Nexify',
    description: 'AI-powered software development by 28 specialized AI agents. Custom software, mobile apps, AI solutions, chatbots, and SaaS products — delivered 10x faster.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090B',
    theme_color: '#6366F1',
    orientation: 'portrait-primary',
    categories: ['business', 'technology', 'software', 'ai'],
    lang: 'en-US',
    dir: 'ltr',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
    screenshots: [
      {
        src: '/og-image.svg',
        sizes: '1200x630',
        type: 'image/svg+xml',
      },
    ],
  }
}
