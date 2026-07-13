'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AIAgentWidget } from '@/components/AIAgent'

/** Pages that use sidebar layouts — hide site chrome on these */
const APP_PATHS = ['/admin', '/portal', '/sales', '/dashboards', '/hr', '/finance', '/marketing']

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAppPage = APP_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))

  if (isAppPage) {
    return <>{children}</>
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
