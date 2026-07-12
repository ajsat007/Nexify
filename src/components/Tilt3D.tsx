'use client'

import { useRef, useEffect } from 'react'

export default function Tilt3D({ children, className = '', maxTilt = 8, scale = 1.02, glare = true }: {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`

      if (glare) {
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100
        el.style.setProperty('--glare-x', `${glareX}%`)
        el.style.setProperty('--glare-y', `${glareY}%`)
      }
    }

    const handleMouseLeave = () => {
      el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt, scale, glare])

  return (
    <div
      ref={ref}
      className={`tilt-3d-wrapper ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)`,
            zIndex: 1,
          }}
        />
      )}
      <div style={{ transform: 'translateZ(20px)', position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}
