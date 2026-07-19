'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AIAgentWidget } from '@/components/AIAgent'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAppPage = ['/admin', '/portal', '/sales', '/dashboards', '/hr', '/finance', '/marketing']
    .some(p => pathname === p || pathname.startsWith(p + '/'))

  if (isAppPage) {
    return (
      <>
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-surface-200/50 dark:border-surface-700/50 safe-bottom">
          <a
            href="/"
            className="flex items-center justify-center gap-2 py-3 text-surface-500 hover:text-surface-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            Back to Home
          </a>
        </div>
        {children}
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
      <AIAgentWidget />
    </>
  )
}
