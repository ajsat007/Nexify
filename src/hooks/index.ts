'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export function useScrollReveal(threshold = 0.1) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold])
}

export function useKeyboard(key: string, handler: () => void, opts?: { metaKey?: boolean }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((opts?.metaKey ? e.metaKey : true) && e.key === key) { e.preventDefault(); handler() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key, handler, opts?.metaKey])
}

export function useIntersectionObserver(threshold = 0.5): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setVisible(true); o.unobserve(el) } }, { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, visible]
}

export function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [ref, started] = useIntersectionObserver(0.5)
  useEffect(() => {
    if (!started) return
    let v = 0; const step = Math.ceil(target / (duration / 16))
    const t = setInterval(() => { v += step; if (v >= target) { setCount(target); clearInterval(t) } else setCount(v) }, 16)
    return () => clearInterval(t)
  }, [started, target, duration])
  return { count, ref }
}
