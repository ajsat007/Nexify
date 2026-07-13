'use client'

import { cn } from '@/utils'

// ============================================================================
// Skeleton — animated shimmer placeholder
// ============================================================================

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  style?: React.CSSProperties
}

export function Skeleton({ className, variant = 'text', width, height, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-neutral-200 dark:bg-neutral-700',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded-md h-4',
        variant === 'rectangular' && 'rounded-lg',
        variant === 'card' && 'rounded-2xl',
        className
      )}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  )
}

// ============================================================================
// CardSkeleton — for dashboard/metric cards
// ============================================================================

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton variant="circular" className="w-10 h-10" />
        <Skeleton className="w-12 h-4" />
      </div>
      <Skeleton className="w-20 h-8" />
      <Skeleton className="w-32 h-4" />
    </div>
  )
}

// ============================================================================
// TableSkeleton — for data tables
// ============================================================================

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="p-4 border-b border-neutral-100 dark:border-neutral-700">
        <Skeleton className="w-48 h-6" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="flex-1 h-4" style={{ maxWidth: j === 0 ? '200px' : `${80 + Math.random() * 80}px` }} />
          ))}
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// ChartSkeleton — placeholder for charts
// ============================================================================

export function ChartSkeleton({ height = 200 }: { height?: number }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-40 h-5" />
        <Skeleton className="w-16 h-4" />
      </div>
      <div style={{ height }} className="flex items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${30 + Math.random() * 70}%` }}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// PageSkeleton — full page loading state
// ============================================================================

export function PageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="w-48 h-8" />
          <Skeleton className="w-64 h-4" />
        </div>
        <Skeleton className="w-32 h-10 rounded-xl" />
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
      {/* Chart */}
      <ChartSkeleton height={250} />
      {/* Table */}
      <TableSkeleton rows={4} columns={4} />
    </div>
  )
}
