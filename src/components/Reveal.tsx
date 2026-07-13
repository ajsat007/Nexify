'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/utils'

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'zoom'

interface RevealProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: number
  stagger?: boolean
  staggerIndex?: number
}

function getAnimationStyles(animation: AnimationType): string {
  const map: Record<AnimationType, string> = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-down': '-translate-y-8 opacity-0',
    'fade-left': 'translate-x-8 opacity-0',
    'fade-right': '-translate-x-8 opacity-0',
    'scale': 'scale-95 opacity-0',
    'zoom': 'scale-75 opacity-0',
  }
  return map[animation] || map['fade-up']
}

export function Reveal({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  stagger = false,
  staggerIndex = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const computedDelay = stagger ? delay + staggerIndex * 100 : delay

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        getAnimationStyles(animation),
        visible && 'translate-y-0 translate-x-0 scale-100 opacity-100',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${computedDelay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Stagger wrapper for lists/grids
export function Stagger({ children, className, baseDelay = 0 }: { children: ReactNode[]; className?: string; baseDelay?: number }) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} stagger staggerIndex={i} delay={baseDelay}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
