import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nexify Technologies — AI-Native Software Company',
    short_name: 'Nexify',
    description: 'AI-powered software development by 50+ specialized AI agents. Custom software, mobile apps, AI solutions, chatbots, and SaaS products — delivered 10x faster.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090B',
    theme_color: '#6366F1',
    orientation: 'portrait-primary',
    categories: ['business', 'technology', 'software', 'ai'],
    lang: 'en-US',
    dir: 'ltr',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    screenshots: [
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
      },
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'AI Chatbot',
        short_name: 'Chatbot',
        description: 'Get an AI chatbot for your business',
        url: '/chatbot',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Services',
        short_name: 'Services',
        description: 'View all AI-powered services',
        url: '/services',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        description: 'Get in touch for a custom proposal',
        url: '/contact',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  }
}