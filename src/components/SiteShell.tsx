'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AIAgentWidget } from '@/components/AIAgent'

/** Pages that use sidebar layouts — add a home breadcrumb bar */
const APP_PATHS = ['/admin', '/portal', '/sales', '/dashboards', '/hr', '/finance', '/marketing']

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAppPage = APP_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))

  if (isAppPage) {
    return (
      <>
        {/* Slim mobile home bar visible on sidebar pages */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/90 backdrop-blur-md border-t border-neutral-800 safe-bottom">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 text-neutral-400 hover:text-white transition-colors text-sm font-medium"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
        {children}
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIAgentWidget />
    </>
  )
}
