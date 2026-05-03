import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, animate } from 'framer-motion'

type Ring = {
  label: string
  countTo?: number
  suffix?: string
  strokeColor: string
  nodeColor: string
  textColor: string
  radius: number
  nodeCount: number
  delay: number
}

const RINGS: Ring[] = [
  {
    label: '3 Platforms',
    radius: 72,
    nodeCount: 3,
    strokeColor: 'rgba(249,115,22,0.35)',
    nodeColor: '#f97316',
    textColor: '#ea580c',
    delay: 0.6,
  },
  {
    label: 'Teams Enabled',
    countTo: 20,
    suffix: '+',
    radius: 132,
    nodeCount: 8,
    strokeColor: 'rgba(251,191,36,0.4)',
    nodeColor: '#f59e0b',
    textColor: '#d97706',
    delay: 1.2,
  },
  {
    label: 'Engineers Served',
    countTo: 4000,
    suffix: '+',
    radius: 192,
    nodeCount: 12,
    strokeColor: 'rgba(16,185,129,0.35)',
    nodeColor: '#10b981',
    textColor: '#059669',
    delay: 1.9,
  },
]

function CountUp({ to, suffix = '', delay }: { to: number; suffix?: string; delay: number }) {
  const [value, setValue] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    const timer = setTimeout(() => {
      const controls = animate(0, to, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setValue(Math.round(v)),
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [to, delay])

  return (
    <span>{value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}{suffix}</span>
  )
}

function RingNodes({ radius, nodeCount, nodeColor, delay }: {
  radius: number; nodeCount: number; nodeColor: string; delay: number
}) {
  return (
    <>
      {Array.from({ length: nodeCount }, (_, i) => {
        const angle = (i / nodeCount) * 2 * Math.PI - Math.PI / 2
        return (
          <motion.circle
            key={i}
            cx={Math.cos(angle) * radius}
            cy={Math.sin(angle) * radius}
            r={3.5}
            fill={nodeColor}
            opacity={0.7}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: delay + i * 0.055, duration: 0.35, type: 'spring', stiffness: 220 }}
          />
        )
      })}
    </>
  )
}

export default function ForceMultiplierAnimation() {
  const prefersReduced = useReducedMotion()
  const cx = 220
  const cy = 210

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-[#fafafa] py-2">

      {/* Label */}
      <motion.div
        className="mb-2 flex items-center gap-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Force Multiplier
        </span>
      </motion.div>

      <svg
        viewBox="0 0 440 420"
        className="w-full max-w-[320px]"
        aria-label="Organizational impact visualization"
      >
        <defs>
          <radialGradient id="centerGlowLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </radialGradient>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Rings */}
        {RINGS.map((ring, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={cx} cy={cy} r={ring.radius}
            fill="none"
            stroke={ring.strokeColor}
            strokeWidth={1.5}
            strokeDasharray="4 7"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: ring.delay - 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* Nodes */}
        <g transform={`translate(${cx}, ${cy})`}>
          {RINGS.map((ring, i) => (
            <RingNodes
              key={`nodes-${i}`}
              radius={ring.radius}
              nodeCount={ring.nodeCount}
              nodeColor={ring.nodeColor}
              delay={ring.delay + 0.1}
            />
          ))}
        </g>

        {/* Spokes from center to ring-1 */}
        {Array.from({ length: 3 }, (_, i) => {
          const angle = (i / 3) * 2 * Math.PI - Math.PI / 2
          return (
            <motion.line
              key={`spoke-${i}`}
              x1={cx} y1={cy}
              x2={cx + Math.cos(angle) * RINGS[0].radius}
              y2={cy + Math.sin(angle) * RINGS[0].radius}
              stroke="rgba(249,115,22,0.25)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          )
        })}

        {/* Center glow */}
        <circle cx={cx} cy={cy} r={48} fill="url(#centerGlowLight)" />

        {/* Sonar pulses */}
        {!prefersReduced && [0, 0.9, 1.8].map((delay, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={cx} cy={cy} r={20}
            fill="none"
            stroke="rgba(249,115,22,0.4)"
            strokeWidth={1.5}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ delay, duration: 2.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 2.2 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* Center node */}
        <motion.circle
          cx={cx} cy={cy} r={20}
          fill="rgba(249,115,22,0.1)"
          stroke="#f97316"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.55, type: 'spring', stiffness: 200 }}
          filter="url(#soft-glow)"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        <motion.text x={cx} y={cy - 4} textAnchor="middle" fill="#1e293b" fontSize="8.5"
          fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.06em"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >YOU</motion.text>
        <motion.text x={cx} y={cy + 7} textAnchor="middle" fill="#f97316" fontSize="6.5"
          fontFamily="Inter, sans-serif" letterSpacing="0.04em"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >1 engineer</motion.text>
      </svg>

      {/* Stat row */}
      <div className="mt-1 flex w-full max-w-[320px] justify-between gap-2 px-2">
        {RINGS.map((ring, i) => (
          <motion.div
            key={`stat-${i}`}
            className="flex flex-1 flex-col items-center text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ring.delay + 0.3, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-lg font-black leading-none tracking-tight" style={{ color: ring.textColor }}>
              {ring.countTo
                ? <CountUp to={ring.countTo} suffix={ring.suffix} delay={ring.delay + 0.4} />
                : ring.label}
            </span>
            <span className="mt-0.5 text-[9px] font-semibold leading-tight text-slate-400 uppercase tracking-wide">
              {ring.countTo ? ring.label : '3 tools built'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
