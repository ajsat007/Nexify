'use client'

import { useEffect, useState } from 'react'
import { Bot, Sparkles, Zap } from 'lucide-react'

export function LoadingScreen() {
  const [phase, setPhase] = useState<'init' | 'brand' | 'ready'>('init')
  const [dots, setDots] = useState(0)

  useEffect(() => {
    // Animate dots
    const interval = setInterval(() => setDots(d => (d + 1) % 4), 500)

    // Phase transitions
    const t1 = setTimeout(() => setPhase('brand'), 600)
    const t2 = setTimeout(() => setPhase('ready'), 2800)

    return () => {
      clearInterval(interval)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const isReady = phase === 'ready'
  if (isReady) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface-950 transition-opacity duration-500"
      style={{
        opacity: isReady ? 0 : 1,
        pointerEvents: isReady ? 'none' : 'auto',
      }}
      aria-hidden="true"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-primary-500/10 blur-[200px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-accent-500/10 blur-[200px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="relative flex flex-col items-center gap-6 text-center px-6">
        {/* Phase 1: Brand Logo Reveal */}
        {phase === 'init' && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-square.png"
                alt="Nexify"
                className="w-full h-full object-cover scale-150 opacity-0 transition-all duration-700"
                style={{ transformOrigin: 'center' }}
              />
            </div>
            <div className="h-6 w-48 bg-gradient-to-r from-primary-500 to-accent-500 rounded animate-pulse" />
          </div>
        )}

        {/* Phase 2: Full Brand Display */}
        {phase === 'brand' && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-square-large.png"
                alt="Nexify"
                className="w-full h-full object-cover"
              />
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal.png"
              alt="Nexify Technologies"
              className="w-[280px] h-auto opacity-90"
              width={280}
              height={56}
            />

            <p className="text-surface-400 text-sm tracking-wider uppercase font-medium">
              AI-Native Software Company
            </p>

            {/* Loading dots */}
            <div className="flex gap-2">
              {['Initializing', 'Connecting AI', 'Loading agents', 'Ready'][dots] && (
                <span className="text-primary-400 text-sm font-mono min-w-[160px] text-left">
                  {['Initializing', 'Connecting AI', 'Loading agents', 'Ready'][dots]}
                  {'.'.repeat((dots % 3) + 1)}
                </span>
              )}
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              {[
                { icon: Bot, label: '50+ AI Agents' },
                { icon: Sparkles, label: 'Zero Human Ops' },
                { icon: Zap, label: '10x Faster' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs">
                  <Icon size={10} className="text-primary-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s var(--ease-out-expo) forwards; }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}