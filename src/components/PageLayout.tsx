'use client'

import { ReactNode } from 'react'
import { AnimatedSection } from '@/components/ScrollAnimations'
import { cn } from '@/utils'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

/** Standard page wrapper with padding and responsive constraints */
export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn('pt-28 min-h-screen', className)}>
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

/** Consistent page header with animation */
export function PageHeader({ title, subtitle, badge, badgeColor, children }: PageHeaderProps) {
  return (
    <AnimatedSection animation="fade-up">
      <section className="relative pt-24 pb-16 gradient-bg overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBtMzAtMzBoNjB2NjBIMzB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="section-container relative">
          <div className="max-w-3xl">
            {badge && (
              <div className={cn(
                'chip bg-white/10 text-white border border-white/20 mb-4',
                badgeColor
              )}>
                {badge}
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
      </section>
    </AnimatedSection>
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
    <AnimatedSection animation="fade-up">
      <section className={cn(
        'section-padding',
        dark ? 'bg-neutral-50 dark:bg-neutral-900' : 'bg-white dark:bg-neutral-950',
        className
      )}>
        <div className="section-container">
          {children}
        </div>
      </section>
    </AnimatedSection>
  )
}
