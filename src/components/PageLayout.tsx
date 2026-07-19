'use client'

import { ReactNode } from 'react'
import { cn } from '@/utils'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

/** Standard page wrapper with padding and responsive constraints */
export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn('pt-24 sm:pt-28 min-h-screen', className)}>
      {children}
    </div>
  )
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  badgeColor?: string
  children?: ReactNode
}

/** Consistent page header */
export function PageHeader({ title, subtitle, badge, badgeColor, children }: PageHeaderProps) {
  return (
    <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 gradient-bg overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBtMzAtMzBoNjB2NjBIMzB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30" />
      <div className="section-container relative">
        <div className="max-w-3xl">
          {badge && (
            <div className={cn(
              'chip bg-white/10 text-white border border-white/20 mb-3 sm:mb-4',
              badgeColor
            )}>
              {badge}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

interface PageSectionProps {
  children: ReactNode
  className?: string
  dark?: boolean
}

/** Consistent page section wrapper */
export function PageSection({ children, className, dark }: PageSectionProps) {
  return (
    <section className={cn(
      'section-padding',
      dark ? 'bg-surface-50 dark:bg-surface-900' : 'bg-white dark:bg-surface-950',
      className
    )}>
      <div className="section-container">
        {children}
      </div>
    </section>
  )
}
