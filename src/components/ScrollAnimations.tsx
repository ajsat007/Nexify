'use client'

import { useEffect, useRef, ReactNode, useState, useCallback } from 'react'
import { cn } from '@/utils'

// ============================================================================
// useIntersectionObserver — core scroll reveal hook
// ============================================================================

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.08, rootMargin = '0px 0px -40px 0px', triggerOnce = true } = options
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (visible && triggerOnce) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, visible])

  return [ref, visible]
}

// ============================================================================
// AnimatedSection — wraps content with scroll-triggered entrance animation
// ============================================================================

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'zoom' | 'none'
  delay?: number
  duration?: number
  threshold?: number
  as?: 'div' | 'section' | 'article' | 'span'
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.08,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold })

  const transforms: Record<string, string> = {
    'fade-up': 'translateY(30px)',
    'fade-down': 'translateY(-30px)',
    'fade-left': 'translateX(30px)',
    'fade-right': 'translateX(-30px)',
    scale: 'scale(0.95)',
    zoom: 'scale(1.1)',
    none: 'none',
  }

  return (
    <Tag
      ref={ref as any}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0) translateY(0) scale(1)' : transforms[animation],
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}

// ============================================================================
// AnimatedCounter — counts from 0 to target when scrolled into view
// ============================================================================

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [ref, visible] = useIntersectionObserver<HTMLSpanElement>({ threshold: 0.3 })

  useEffect(() => {
    if (!visible) return
    let v = 0
    const step = Math.max(1, Math.ceil(value / (duration / 16)))
    const timer = setInterval(() => {
      v += step
      if (v >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(v)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [visible, value, duration])

  return (
    <span ref={ref as any} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

// ============================================================================
// ScrollToTop — floating button that appears after scrolling down
// ============================================================================

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 left-6 z-50 w-10 h-10 rounded-xl bg-white/80 dark:bg-surface-800/80 backdrop-blur-xl shadow-elevated border border-surface-200/50 dark:border-surface-700/50 flex items-center justify-center transition-all duration-300 hover:bg-white dark:hover:bg-surface-700 hover:shadow-lg hover:-translate-y-0.5',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-surface-600 dark:text-surface-300">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  )
}

// ============================================================================
// PremiumAnimatedGradient — animated mesh background for hero sections
// ============================================================================

export function PremiumAnimatedGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-950/40 to-surface-950" />
      {/* Animated orbs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          top: '-20%',
          left: '-10%',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
          top: '10%',
          right: '-5%',
          animationDelay: '-3s',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          bottom: '-15%',
          left: '20%',
          animationDelay: '-6s',
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// AuroraBackground — lighter animated background for content sections
// ============================================================================

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.08] animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 60%)',
          top: '-10%',
          right: '-10%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 60%)',
          bottom: '-5%',
          left: '-5%',
          animationDelay: '-4s',
        }}
      />
    </div>
  )
}

// ============================================================================
// useScrollReveal — alias for backward compatibility (used by Charts.tsx)
// ============================================================================

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [React.RefObject<T | null>, boolean] {
  return useIntersectionObserver<T>(options)
}

// ============================================================================
// StaggerGroup — animates children in sequence with incremental delays
// ============================================================================

interface StaggerGroupProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  baseDelay?: number
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'zoom'
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 80,
  baseDelay = 0,
  animation = 'fade-up',
}: StaggerGroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimatedSection key={i} animation={animation} delay={baseDelay + i * staggerDelay}>
          {child}
        </AnimatedSection>
      ))}
    </div>
  )
}
