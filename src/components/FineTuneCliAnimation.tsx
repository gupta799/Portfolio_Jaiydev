import { memo, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type CliLine = {
  id: string
  prefix: string
  content: string
  color: string
  delay: number
}

const LINES: CliLine[] = [
  {
    id: 'cmd',
    prefix: '$',
    content: ' fine-tune submit \\',
    color: 'text-cyan-400',
    delay: 0,
  },
  {
    id: 'flag1',
    prefix: ' ',
    content: '  --dataset risk-evaluations \\',
    color: 'text-white/70',
    delay: 500,
  },
  {
    id: 'flag2',
    prefix: ' ',
    content: '  --model gpt-2-payments \\',
    color: 'text-white/70',
    delay: 900,
  },
  {
    id: 'flag3',
    prefix: ' ',
    content: '  --schedule nightly --cluster gpu-a100',
    color: 'text-white/70',
    delay: 1300,
  },
  {
    id: 'blank',
    prefix: ' ',
    content: '',
    color: 'text-white/0',
    delay: 1700,
  },
  {
    id: 'queued',
    prefix: '→',
    content: ' Dispatching to GPU cluster...',
    color: 'text-amber-400',
    delay: 1900,
  },
  {
    id: 'alloc',
    prefix: '→',
    content: ' Allocating 4× A100 nodes',
    color: 'text-amber-400',
    delay: 2500,
  },
  {
    id: 'success',
    prefix: '✓',
    content: ' Job #482 queued — estimated 2h 14m',
    color: 'text-emerald-400',
    delay: 3100,
  },
  {
    id: 'teams',
    prefix: '✓',
    content: ' 20+ teams notified via agent framework',
    color: 'text-emerald-400',
    delay: 3700,
  },
]

function DotLoader({ delay }: { delay: number }) {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1 w-1 rounded-full bg-amber-400"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ delay: delay / 1000 + i * 0.15, duration: 0.9, repeat: Infinity }}
        />
      ))}
    </span>
  )
}

function FineTuneCliAnimation(): JSX.Element {
  const shouldReduceMotion = useReducedMotion()
  const [visibleIds, setVisibleIds] = useState<string[]>([])
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setVisibleIds([])
    setShowLoader(false)

    if (shouldReduceMotion) {
      setVisibleIds(LINES.map((l) => l.id))
      return
    }

    const timers: number[] = []

    LINES.forEach((line) => {
      timers.push(window.setTimeout(() => {
        setVisibleIds((prev) => [...prev, line.id])
        if (line.id === 'queued') setShowLoader(true)
        if (line.id === 'success') setShowLoader(false)
      }, line.delay))
    })

    timers.push(window.setTimeout(() => {
      setVisibleIds([])
      setShowLoader(false)
    }, 7200))

    return () => timers.forEach(window.clearTimeout)
  }, [shouldReduceMotion])

  const visibleLines = useMemo(
    () => LINES.filter((l) => visibleIds.includes(l.id)),
    [visibleIds],
  )

  return (
    <div className="flex h-full min-h-[300px] w-full flex-col overflow-hidden rounded-2xl bg-[#0d1117] shadow-dark-card">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-[#161b22] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="text-[10px] font-medium text-white/40">fine-tune-cli — bash</span>
        </span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 space-y-1 p-4 font-mono text-[11px] leading-[1.8]">
        {visibleLines.map((line) => (
          <motion.div
            key={line.id}
            className="flex"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className={`w-5 flex-none select-none text-right mr-2 ${
              line.prefix === '$' ? 'text-white/30' :
              line.prefix === '✓' ? 'text-emerald-400' :
              line.prefix === '→' ? 'text-amber-400' : ''
            }`}>
              {line.prefix}
            </span>
            <span className={line.color}>
              {line.content}
              {line.id === 'queued' && showLoader && <DotLoader delay={line.delay} />}
              {line.id === 'alloc' && showLoader && <DotLoader delay={line.delay} />}
            </span>
          </motion.div>
        ))}

        {/* Blinking cursor at the end */}
        {visibleIds.includes('teams') && (
          <div className="flex">
            <span className="w-5 mr-2 text-right text-white/30">$</span>
            <motion.span
              className="inline-block h-[13px] w-[7px] bg-cyan-400/70"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        )}
      </div>

      {/* Progress bar */}
      {visibleIds.includes('success') && (
        <motion.div
          className="border-t border-white/8 bg-[#161b22] px-4 py-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-white/30">
              Training queue
            </span>
            <span className="text-[9px] text-emerald-400">Job #482 active</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400"
              initial={{ width: '0%' }}
              animate={{ width: '38%' }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default memo(FineTuneCliAnimation)
