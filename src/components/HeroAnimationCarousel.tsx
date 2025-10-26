import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import McpGraphAnimation from './McpGraphAnimation'
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
    id: 'mcp-graph',
    label: 'MCP Graph',
    description: 'Live orchestration of dependency intelligence across Visa squads.',
    element: <McpGraphAnimation />,
  },
  {
    id: 'claude-diff',
    label: 'Claude Code',
    description: 'Grammar-aware diffs applied safely while release trains stayed on schedule.',
    element: <ClaudeDiffAnimation />,
  },
  {
    id: 'cli',
    label: 'Fine-tuning CLI',
    description: 'Submitting jobs to GPU clusters with one command and full audit trail.',
    element: <FineTuneCliAnimation />,
  },
]

const AUTO_ROTATE_MS = 7000

function HeroAnimationCarousel(): JSX.Element {
  const panels = useMemo(() => PANELS, [])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % panels.length)
    }, AUTO_ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [panels.length])

  const activePanel = panels[activeIndex]

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        {panels.map((panel, index) => {
          const isActive = index === activeIndex
          return (
            <button
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-card'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              key={panel.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              {panel.label}
            </button>
          )
        })}
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-slate-600"
        key={activePanel.id}
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {activePanel.description}
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1"
        key={`${activePanel.id}-canvas`}
        initial={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {activePanel.element}
      </motion.div>
    </div>
  )
}

export default HeroAnimationCarousel
