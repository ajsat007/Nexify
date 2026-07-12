import type { Metadata } from 'next'
import { siteConfig } from '@/lib/data'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AgentBar from '@/components/AgentBar'
import { AIAgentWidget } from '@/components/AIAgent'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['software development', 'AI development', 'web development', 'mobile apps', 'AI agents', 'SaaS', 'India software company', 'Nexify'],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Header />
        <AgentBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIAgentWidget />
      </body>
    </html>
  )
}
