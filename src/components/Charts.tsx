'use client'

import { useScrollReveal } from '@/components/ScrollAnimations'
import { cn } from '@/utils'

// ── Shared hook for chart animations ──
function useChartAnimation(delay = 100) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  return { ref: ref as React.RefObject<HTMLDivElement>, animate: visible }
}

// ── Bar Chart ──
export function BarChart({ data, height = 200, color = '#3B82F6', className }: { data: { label: string; value: number }[]; height?: number; color?: string; className?: string }) {
  const { ref, animate } = useChartAnimation(100)
  const max = Math.max(...data.map(d => d.value), 1)
  const barW = Math.min(40, (100 / data.length) - 2)
  const w = data.length * 60

  return (
    <div ref={ref as any} className={cn('w-full', className)}>
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`bar-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {data.map((d, i) => {
          const h = animate ? (d.value / max) * (height - 40) : 0
          return (
            <g key={i}>
              <rect x={i * 60 + 10} y={height - 20 - h} width={barW} height={h} rx="4" fill={`url(#bar-${color.replace('#', '')})`} className="transition-all duration-700 ease-out" style={{ transitionDelay: `${i * 50}ms` }} />
              <text x={i * 60 + 10 + barW / 2} y={height - 4} textAnchor="middle" className="fill-neutral-400 dark:fill-neutral-500" fontSize="10">{d.label}</text>
              <text x={i * 60 + 10 + barW / 2} y={height - 28 - h} textAnchor="middle" className={cn('fill-neutral-600 dark:fill-neutral-300 text-xs font-semibold', animate ? 'opacity-100' : 'opacity-0')} style={{ transitionDelay: `${i * 50 + 300}ms` }}>{d.value}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Line Chart ──
export function LineChart({ data, height = 200, color = '#8B5CF6', className }: { data: { label: string; value: number }[]; height?: number; color?: string; className?: string }) {
  const { ref, animate } = useChartAnimation(200)
  const max = Math.max(...data.map(d => d.value), 1)
  const w = data.length * 60
  const pad = { top: 20, bottom: 30, left: 10, right: 10 }
  const chartW = w - pad.left - pad.right
  const chartH = height - pad.top - pad.bottom
  const points = data.map((d, i) => ({ x: pad.left + (i / (data.length - 1)) * chartW, y: pad.top + chartH - (d.value / max) * chartH }))
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = pathD + ` L ${points[points.length - 1].x} ${height - pad.bottom} L ${points[0].x} ${height - pad.bottom} Z`

  return (
    <div ref={ref as any} className={cn('w-full', className)}>
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`area-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" /><stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {data.map((d, i) => (<text key={i} x={points[i].x} y={height - 8} textAnchor="middle" className="fill-neutral-400 dark:fill-neutral-500" fontSize="10">{d.label}</text>))}
        <path d={areaD} fill={`url(#area-${color.replace('#', '')})`} opacity={animate ? 1 : 0} className="transition-opacity duration-1000" />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={animate ? 'none' : '2000'} strokeDashoffset={animate ? 0 : 2000} className="transition-all duration-1500" />
        {animate && points.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="4" fill={color} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }} />))}
      </svg>
    </div>
  )
}

// ── Donut Chart ──
export function DonutChart({ data, size = 160, thickness = 32, className }: { data: { label: string; value: number; color: string }[]; size?: number; thickness?: number; className?: string }) {
  const { ref, animate } = useChartAnimation(300)
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const cx = size / 2, cy = size / 2, r = (size - thickness) / 2, circ = 2 * Math.PI * r
  let offset = 0

  return (
    <div ref={ref as any} className={cn('w-full max-w-[200px] mx-auto', className)}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={thickness} className="text-surface-100 dark:text-surface-700" />
        {data.map((d, i) => {
          const pct = d.value / total, len = pct * circ
          const dash = animate ? len : 0
          const dashOffset = animate ? -offset : -circ
          offset += len
          return (<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={thickness} strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={dashOffset} className="transition-all duration-1000" transform={`rotate(-90 ${cx} ${cy})`} />)
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" className="fill-neutral-900 dark:fill-white" fontSize="24" fontWeight="700">{Math.round((data.find(d => d.value > 0)?.value || 0) / total * 100)}%</text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-neutral-400 dark:fill-neutral-500" fontSize="10">total</text>
      </svg>
    </div>
  )
}

// ── Sparkline ──
export function Sparkline({ data, color = '#10B981', height = 40, width = 120 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const max = Math.max(...data, 1), min = Math.min(...data, 0), range = max - min || 1, stepX = width / (data.length - 1)
  const d = data.map((v, i) => { const x = i * stepX, y = height - ((v - min) / range) * (height - 4) - 2; return `${i === 0 ? 'M' : 'L'} ${x} ${y}` }).join(' ')
  return (<svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}><path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>)
}

// ── Metric Card ──
export function MetricCard({ label, value, trend, data, color = '#3B82F6' }: { label: string; value: string; trend?: string; data?: number[]; color?: string }) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-2xl font-heading font-bold text-surface-900 dark:text-white">{value}</div>
          <div className="text-sm text-surface-600">{label}</div>
        </div>
        {trend && <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{trend}</span>}
      </div>
      {data && <Sparkline data={data} color={color} />}
    </div>
  )
}
