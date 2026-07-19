import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { siteConfig } from '@/lib/data'
import { SiteShell } from '@/components/SiteShell'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
})

const baseUrl = siteConfig.url || 'https://nexify.tech'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | Nexify Technologies`,
  },
  description: siteConfig.description,
  keywords: [
    'AI software development', 'AI agents', 'custom software', 'AI chatbot',
    'AI-native company', 'software development India', 'AI automation',
    'AI workforce', 'SaaS development', 'AI consulting', 'Nexify',
    'AI-powered development', 'intelligent AI agents', 'automated software delivery',
  ],
  authors: [{ name: 'Nexify Technologies' }],
  creator: 'Nexify Technologies',
  publisher: 'Nexify Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og-image.svg'],
    creator: '@nexifytech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Nexify',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#09090B' },
  ],
  colorScheme: 'dark light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to font providers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Apple touch icon fallback */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        {/* Mask icon for Safari pinned tabs */}
        <link rel="mask-icon" href="/icon.svg" color="#6366F1" />
      </head>
      <body className={`
        ${inter.variable}
        ${spaceGrotesk.variable}
        ${jetbrainsMono.variable}
        min-h-screen flex flex-col font-sans
      `}>
        <SiteShell>
          <ErrorBoundary>{children}</ErrorBoundary>
        </SiteShell>
      </body>
    </html>
  )
}
