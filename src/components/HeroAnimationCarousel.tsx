import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ImpactPanel from './ImpactPanel'
import ClaudeDiffAnimation from './ClaudeDiffAnimation'
import FineTuneCliAnimation from './FineTuneCliAnimation'

type Panel = {
  id: string
  label: string
  description: string
  element: JSX.Element
}

const PANELS: Panel[] = [
  {
    id: 'impact',
    label: 'Impact',
    description: '4,000 engineers with AI access. Built from scratch by one team.',
    element: <ImpactPanel />,
  },
  {
    id: 'claude-diff',
    label: 'Execution',
    description: '10M+ lines migrated safely — reviewers only ever saw high-signal diffs.',
    element: <ClaudeDiffAnimation />,
  },
  {
    id: 'cli',
    label: 'Infrastructure',
    description: 'One command to access GPU clusters — weeks of setup reduced to hours.',
    element: <FineTuneCliAnimation />,
  },
]

const AUTO_ROTATE_MS = 8000

export default function HeroAnimationCarousel(): JSX.Element {
  const panels = useMemo(() => PANELS, [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const rafRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
    setProgress(0)

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current
      setProgress(Math.min(elapsed / AUTO_ROTATE_MS, 1))
      if (elapsed < AUTO_ROTATE_MS) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % panels.length)
      startTimeRef.current = Date.now()
      setProgress(0)
    }, AUTO_ROTATE_MS)

    return () => {
      window.clearInterval(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [activeIndex, panels.length])

  const handleTab = (index: number) => {
    setActiveIndex(index)
    startTimeRef.current = Date.now()
    setProgress(0)
  }

  const active = panels[activeIndex]

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-1">
          {panels.map((panel, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={panel.id}
                onClick={() => handleTab(i)}
                type="button"
                className={`relative rounded-full px-5 py-2 text-xs font-semibold transition-colors duration-200 ${
                  isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {panel.label}
                {/* Gradient underline on active */}
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute -bottom-[1px] left-4 right-4 h-px rounded-full bg-gradient-to-r from-orange-400 to-emerald-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Progress strip */}
        <div className="h-px w-24 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-orange-400 to-emerald-400"
            style={{ scaleX: progress }}
            transition={{ duration: 0 }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pt-4 pb-2 min-h-[48px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${active.id}`}
            className="text-sm text-slate-500"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {active.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Panel */}
      <div className="relative h-[500px] md:h-[540px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            className="absolute inset-0 p-4"
            initial={{ opacity: 0, x: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -32, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {active.element}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
