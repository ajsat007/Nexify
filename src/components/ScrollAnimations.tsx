'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/utils'

// ============================================================================
// useScrollReveal — intersection observer with configurable animation
// ============================================================================

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'zoom' | 'none'
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
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
  }, [threshold, rootMargin, triggerOnce])

  return [ref, visible]
}

// ============================================================================
// AnimatedSection — wraps any section with scroll-reveal animation
// ============================================================================

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: ScrollRevealOptions['animation']
  delay?: number
  threshold?: number
  as?: 'div' | 'section' | 'article'
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold })

  const animations: Record<string, string> = {
    'fade-up': 'translate-y-8',
    'fade-down': '-translate-y-8',
    'fade-left': 'translate-x-8',
    'fade-right': '-translate-x-8',
    scale: 'scale-95',
    zoom: 'scale-110',
    none: '',
  }

  return (
    <Tag
      ref={ref as any}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : 'opacity-0',
        !visible && animations[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

// ============================================================================
// StaggerGroup — staggers children with incremental delays
// ============================================================================

interface StaggerGroupProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  baseDelay?: number
  animation?: ScrollRevealOptions['animation']
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 100,
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

// ============================================================================
// AnimatedCounter — counts from 0 to target when visible
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
  const [ref, visible] = useScrollReveal<HTMLSpanElement>({ threshold: 0.5 })

  useEffect(() => {
    if (!visible) return
    let v = 0
    const step = Math.ceil(value / (duration / 16))
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
// ScrollToTop — smooth scroll-to-top button that appears on scroll
// ============================================================================

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-xl bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-all flex items-center justify-center animate-fade-in"
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  )
}
