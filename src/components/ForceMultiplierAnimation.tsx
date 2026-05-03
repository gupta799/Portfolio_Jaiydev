import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, animate } from 'framer-motion'

type Ring = {
  label: string
  sublabel: string
  countTo?: number
  suffix?: string
  color: string
  textColor: string
  radius: number
  nodeCount: number
  delay: number
}

const RINGS: Ring[] = [
  {
    label: '3 Platforms',
    sublabel: 'Migration · Fine-tuning · Agents',
    radius: 72,
    nodeCount: 3,
    color: 'rgba(249,115,22,0.7)',
    textColor: '#fb923c',
    delay: 0.6,
  },
  {
    label: 'Teams Enabled',
    sublabel: 'Adopted without ML expertise',
    countTo: 20,
    suffix: '+',
    radius: 132,
    nodeCount: 8,
    color: 'rgba(251,191,36,0.6)',
    textColor: '#fbbf24',
    delay: 1.2,
  },
  {
    label: 'Engineers Served',
    sublabel: 'Org-wide AI capability unlocked',
    countTo: 4000,
    suffix: '+',
    radius: 192,
    nodeCount: 12,
    color: 'rgba(52,211,153,0.55)',
    textColor: '#34d399',
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
    <span>
      {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
      {suffix}
    </span>
  )
}

function RingNodes({
  radius,
  nodeCount,
  color,
  delay,
}: {
  radius: number
  nodeCount: number
  color: string
  delay: number
}) {
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i / nodeCount) * 2 * Math.PI - Math.PI / 2
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  })

  return (
    <>
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={3.5}
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + i * 0.06, duration: 0.4, type: 'spring', stiffness: 200 }}
        />
      ))}
    </>
  )
}

export default function ForceMultiplierAnimation() {
  const prefersReduced = useReducedMotion()
  const cx = 220
  const cy = 210

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl py-2">
      {/* Header label */}
      <motion.div
        className="mb-3 flex items-center gap-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
          Force Multiplier
        </span>
      </motion.div>

      <svg
        viewBox="0 0 440 420"
        className="w-full max-w-[340px]"
        aria-label="Organizational impact visualization"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.35)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </radialGradient>
          <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(52,211,153,0.12)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0)" />
          </radialGradient>
          <filter id="glow-orange">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-emerald">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ambient background glow */}
        <ellipse cx={cx} cy={cy} rx={200} ry={190} fill="url(#outerGlow)" />

        {/* Rings — draw outward with stagger */}
        {RINGS.map((ring, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={cx}
            cy={cy}
            r={ring.radius}
            fill="none"
            stroke={ring.color}
            strokeWidth={1}
            strokeDasharray="4 6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: prefersReduced ? 1 : 1, scale: 1 }}
            transition={{ delay: ring.delay - 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* Ring nodes */}
        <g transform={`translate(${cx}, ${cy})`}>
          {RINGS.map((ring, i) => (
            <RingNodes
              key={`nodes-${i}`}
              radius={ring.radius}
              nodeCount={ring.nodeCount}
              color={ring.color}
              delay={ring.delay + 0.1}
            />
          ))}
        </g>

        {/* Connecting spokes from center to ring 1 nodes */}
        {Array.from({ length: 3 }, (_, i) => {
          const angle = (i / 3) * 2 * Math.PI - Math.PI / 2
          const x2 = cx + Math.cos(angle) * RINGS[0].radius
          const y2 = cy + Math.sin(angle) * RINGS[0].radius
          return (
            <motion.line
              key={`spoke-${i}`}
              x1={cx} y1={cy} x2={x2} y2={y2}
              stroke="rgba(249,115,22,0.3)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
            />
          )
        })}

        {/* Center ambient glow circle */}
        <circle cx={cx} cy={cy} r={48} fill="url(#centerGlow)" />

        {/* Sonar pulse rings on center */}
        {!prefersReduced && [0, 0.8, 1.6].map((delay, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={cx}
            cy={cy}
            r={20}
            fill="none"
            stroke="rgba(249,115,22,0.5)"
            strokeWidth={1.5}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{
              delay,
              duration: 2.4,
              ease: 'easeOut',
              repeat: Infinity,
              repeatDelay: 2.4,
            }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* Center node */}
        <motion.circle
          cx={cx} cy={cy} r={18}
          fill="rgba(249,115,22,0.12)"
          stroke="rgba(249,115,22,0.7)"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, type: 'spring', stiffness: 200 }}
          filter="url(#glow-orange)"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Center label */}
        <motion.text
          x={cx} y={cy - 4}
          textAnchor="middle"
          fill="rgba(255,255,255,0.95)"
          fontSize="8"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.05em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          YOU
        </motion.text>
        <motion.text
          x={cx} y={cy + 7}
          textAnchor="middle"
          fill="rgba(249,115,22,0.8)"
          fontSize="6"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.04em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          1 engineer
        </motion.text>
      </svg>

      {/* Stat labels below SVG */}
      <div className="mt-1 flex w-full max-w-[340px] justify-between gap-2 px-2">
        {RINGS.map((ring, i) => (
          <motion.div
            key={`stat-${i}`}
            className="flex flex-1 flex-col items-center text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ring.delay + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-lg font-black leading-none tracking-tight"
              style={{ color: ring.textColor }}
            >
              {ring.countTo ? (
                <CountUp to={ring.countTo} suffix={ring.suffix} delay={ring.delay + 0.4} />
              ) : (
                ring.label
              )}
            </span>
            <span className="mt-0.5 text-[9px] font-medium leading-tight text-white/35">
              {ring.countTo ? ring.label : ring.sublabel}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
