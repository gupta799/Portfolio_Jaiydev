import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ForceMultiplierAnimation from './ForceMultiplierAnimation'
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
    id: 'force-multiplier',
    label: 'Impact',
    description: '1 engineer → 4,000-person org capacity. Building leverage, not just tools.',
    element: <ForceMultiplierAnimation />,
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

  // Animate the progress bar via rAF
  useEffect(() => {
    startTimeRef.current = Date.now()
    setProgress(0)

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min(elapsed / AUTO_ROTATE_MS, 1)
      setProgress(pct)
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
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

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    startTimeRef.current = Date.now()
    setProgress(0)
  }

  const activePanel = panels[activeIndex]

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Gliding tab selector */}
      <div className="relative flex items-center rounded-full bg-white/6 p-1" role="tablist">
        {/* Sliding active background */}
        <motion.div
          className="absolute inset-y-1 rounded-full bg-white/12 border border-white/10"
          layoutId="carousel-tab-bg"
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          style={{
            left: `calc(${(activeIndex / panels.length) * 100}% + 4px)`,
            width: `calc(${100 / panels.length}% - 8px)`,
          }}
        />
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            role="tab"
            aria-selected={index === activeIndex}
            className={`relative z-10 flex-1 rounded-full py-2 text-xs font-semibold transition-colors duration-200 ${
              index === activeIndex ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
            onClick={() => handleTabClick(index)}
            type="button"
          >
            {panel.label}
          </button>
        ))}
      </div>

      {/* Progress strip under active tab */}
      <div className="h-px w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-emerald-400"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0 }}
        />
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${activePanel.id}`}
          className="text-sm leading-relaxed text-white/55"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {activePanel.description}
        </motion.p>
      </AnimatePresence>

      {/* Panel content with spatial Apple transition */}
      <div className="relative flex-1 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePanel.id}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -28, filter: 'blur(6px)' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePanel.element}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
