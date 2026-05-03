import { memo, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const DIFFS = [
  {
    id: 'grammar',
    filename: 'src/payments/settlement.ts',
    title: 'Grammar-safe refactor',
    lines: [
      { type: 'context', content: "function settle(txn: Transaction) {" },
      { type: 'removed', content: "  if (txn.status === 'pending') {" },
      { type: 'added',   content: "  if (txn.state === 'pending') {" },
      { type: 'removed', content: "    settle(txn)" },
      { type: 'added',   content: "    return settlePayment(txn)" },
      { type: 'context', content: "  }" },
      { type: 'context', content: "}" },
    ],
    note: 'Grammar-aware rename — zero breakage across 847 call sites',
  },
  {
    id: 'import',
    filename: 'src/fees/calculator.ts',
    title: 'Module upgrade',
    lines: [
      { type: 'context', content: "// Updated via MCP dependency graph" },
      { type: 'removed', content: "import { calcFee } from 'legacy/fees'" },
      { type: 'added',   content: "import { calculateFee } from '@payments/fees'" },
      { type: 'context', content: "" },
      { type: 'removed', content: "const amount = calcFee(txn.total)" },
      { type: 'added',   content: "const amount = calculateFee(txn.total)" },
    ],
    note: 'Dependency mapped through graph — 3,200 imports updated',
  },
  {
    id: 'guard',
    filename: 'src/core/validator.ts',
    title: 'Resilience hardening',
    lines: [
      { type: 'context', content: "export function validate(txn: Transaction) {" },
      { type: 'removed', content: "  if (!txn.id) return" },
      { type: 'added',   content: "  if (!txn?.id) throw new MissingFieldError(" },
      { type: 'added',   content: '    "transaction.id"' },
      { type: 'added',   content: "  )" },
      { type: 'context', content: "  return process(txn)" },
      { type: 'context', content: "}" },
    ],
    note: 'Agent SDK surfaced 91 silent failure paths — all hardened',
  },
]

const LINE_NUM_START = [12, 44, 8]

function ClaudeDiffAnimation(): JSX.Element {
  const shouldReduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % DIFFS.length)
    }, 3200)
    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  const diff = DIFFS[index]
  const startLine = LINE_NUM_START[index]

  return (
    <div className="flex h-full min-h-[300px] w-full flex-col overflow-hidden rounded-2xl bg-[#111318] shadow-dark-card">
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-[#1a1d24] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto max-w-[200px] truncate rounded px-3 py-0.5 text-center text-[10px] text-white/35 bg-white/5">
          {diff.filename}
        </span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
          grammar-safe
        </span>
      </div>

      {/* Diff content */}
      <div className="flex-1 overflow-hidden px-0 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={diff.id}
            initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {diff.lines.map((line, i) => {
              const lineNum = startLine + i
              const bg =
                line.type === 'added'
                  ? 'bg-emerald-500/10'
                  : line.type === 'removed'
                  ? 'bg-red-500/10'
                  : ''
              const prefix =
                line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '
              const textColor =
                line.type === 'added'
                  ? 'text-emerald-400'
                  : line.type === 'removed'
                  ? 'text-red-400'
                  : 'text-white/55'
              const borderColor =
                line.type === 'added'
                  ? 'border-l-emerald-500'
                  : line.type === 'removed'
                  ? 'border-l-red-500'
                  : 'border-l-transparent'

              return (
                <motion.div
                  key={i}
                  className={`flex items-start border-l-2 px-3 py-0.5 font-mono text-[11px] leading-[1.7] ${bg} ${borderColor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <span className="w-6 flex-none select-none text-right text-white/20 mr-3">
                    {line.type !== 'added' ? lineNum : ''}
                  </span>
                  <span className={`w-3 flex-none select-none ${textColor} opacity-70`}>
                    {prefix}
                  </span>
                  <span className={`${textColor} break-all`}>{line.content}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer note */}
      <motion.div
        key={`note-${diff.id}`}
        className="border-t border-white/8 bg-[#1a1d24] px-4 py-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <span className="text-[10px] font-medium text-white/40">
          <span className="text-orange-400">↳</span> {diff.note}
        </span>
      </motion.div>
    </div>
  )
}

export default memo(ClaudeDiffAnimation)
