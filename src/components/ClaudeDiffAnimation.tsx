import { memo, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const DIFFS = [
  {
    id: 'grammar',
    title: 'Grammar-safe refactor',
    before: "if (txn.status === 'pending') {\n  settle(txn)\n}",
    after: "if (txn.state === 'pending') {\n  return settlePayment(txn)\n}",
    note: 'Claude Code applied grammar-aware rename',
  },
  {
    id: 'import',
    title: 'Module upgrade',
    before: "import { calcFee } from 'legacy/fees'",
    after: "import { calculateFee } from '@visa/payments/fees'",
    note: 'Dependency mapped through MCP graph',
  },
  {
    id: 'guard',
    title: 'Guard clause hardening',
    before: 'if (!txn.id) return',
    after: 'if (!txn?.id) throw new Error("Missing transaction id")',
    note: 'Claude Code suggested resilience guard',
  },
]

type ClauseProps = {
  code: string
  variant: 'before' | 'after'
}

function CodeBlock({ code, variant }: ClauseProps): JSX.Element {
  return (
    <div
      className={`rounded-2xl border p-4 text-xs font-mono leading-relaxed ${
        variant === 'before'
          ? 'border-slate-200 bg-white text-slate-500'
          : 'border-emerald-200 bg-emerald-50 text-emerald-900'
      }`}
    >
      <pre className="whitespace-pre-wrap">{code}</pre>
    </div>
  )
}

function ClaudeDiffAnimation(): JSX.Element {
  const shouldReduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % DIFFS.length)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  const diff = DIFFS[index]

  return (
    <div className="flex h-full min-h-[280px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Claude Code
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Grammar aware
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={diff.id}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
          exit={{ opacity: 0, y: 16 }}
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h3 className="text-sm font-semibold text-slate-900">{diff.title}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <CodeBlock code={diff.before} variant="before" />
            <CodeBlock code={diff.after} variant="after" />
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
        className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600"
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        {diff.note}
      </motion.div>
    </div>
  )
}

export default memo(ClaudeDiffAnimation)
