import { memo, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type CliLine = {
  id: string
  prefix: string
  content: string
  status?: 'typing' | 'success' | 'info'
  delay: number
}

const LINES: CliLine[] = [
  {
    id: 'prompt',
    prefix: 'visa$',
    content: ' fine-tune submit --dataset risk-evaluations --schedule nightly',
    status: 'typing',
    delay: 0,
  },
  {
    id: 'dispatch',
    prefix: '→',
    content: ' job queued on GPU cluster',
    status: 'info',
    delay: 1200,
  },
  {
    id: 'mcp',
    prefix: '→',
    content: ' notifying MCP agent framework…',
    status: 'info',
    delay: 2000,
  },
  {
    id: 'success',
    prefix: '✓',
    content: ' fine-tune job #482 scheduled · 20 teams enabled',
    status: 'success',
    delay: 2800,
  },
]

function FineTuneCliAnimation(): JSX.Element {
  const shouldReduceMotion = useReducedMotion()
  const [visibleIds, setVisibleIds] = useState<string[]>([])
  const [cursor, setCursor] = useState('')

  useEffect(() => {
    setVisibleIds([])
    setCursor('')
    if (shouldReduceMotion) {
      setVisibleIds(LINES.map((line) => line.id))
      return
    }

    const timers: number[] = []

    LINES.forEach((line) => {
      const timer = window.setTimeout(() => {
        setVisibleIds((prev) => [...prev, line.id])
        if (line.status === 'typing') {
          setCursor('_')
        } else if (line.status === 'success') {
          setCursor('')
        }
      }, line.delay)
      timers.push(timer)
    })

    const loopTimer = window.setTimeout(() => {
      setVisibleIds([])
      setCursor('')
    }, 6000)

    timers.push(loopTimer)

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [shouldReduceMotion])

  const visibleLines = useMemo(
    () => LINES.filter((line) => visibleIds.includes(line.id)),
    [visibleIds]
  )

  return (
    <div className="flex h-full min-h-[280px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-6 font-mono text-xs text-emerald-100 shadow-card">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-400">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        Fine-tuning CLI
      </div>

      <div className="mt-4 space-y-2">
        {visibleLines.map((line) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
            initial={{ opacity: 0, x: -10 }}
            key={line.id}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <span
              className={
                line.status === 'success'
                  ? 'text-emerald-400'
                  : line.status === 'info'
                    ? 'text-slate-500'
                    : 'text-emerald-200'
              }
            >
              {line.prefix}
            </span>
            <span>{line.content}</span>
          </motion.div>
        ))}
        {!shouldReduceMotion && cursor ? (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            className="inline-block pl-6 text-emerald-200"
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {cursor}
          </motion.span>
        ) : null}
      </div>

      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 1, width: '100%' }
            : { opacity: [0.5, 1, 0.5], width: ['65%', '100%', '65%'] }
        }
        className="mt-6 h-1 rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-emerald-400"
        transition={{ duration: 2.8, repeat: Infinity }}
      />
    </div>
  )
}

export default memo(FineTuneCliAnimation)
