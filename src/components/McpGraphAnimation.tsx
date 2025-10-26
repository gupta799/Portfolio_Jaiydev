import { memo, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Node = {
  id: string
  x: number
  y: number
  label?: string
}

const BASE_NODES: Node[] = [
  { id: 'mcp', x: 50, y: 50, label: 'MCP Server' },
  { id: 'neo4j', x: 15, y: 25, label: 'Neo4j Graph' },
  { id: 'cli', x: 85, y: 25, label: 'CLI Jobs' },
  { id: 'visa-core', x: 20, y: 75, label: 'Visa Core' },
  { id: 'visa-risk', x: 50, y: 88, label: 'Risk Squad' },
  { id: 'visa-rewards', x: 80, y: 65, label: 'Rewards Squad' },
]

const CONNECTIONS: Array<[string, string]> = [
  ['mcp', 'neo4j'],
  ['mcp', 'cli'],
  ['mcp', 'visa-core'],
  ['mcp', 'visa-risk'],
  ['mcp', 'visa-rewards'],
  ['neo4j', 'visa-core'],
  ['cli', 'visa-risk'],
  ['cli', 'visa-rewards'],
]

function McpGraphAnimation(): JSX.Element {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % CONNECTIONS.length)
    }, 1200)
    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  const nodes = useMemo(() => BASE_NODES, [])

  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-6 shadow-card">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="edge-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {CONNECTIONS.map(([sourceId, targetId], index) => {
          const source = nodes.find((node) => node.id === sourceId)
          const target = nodes.find((node) => node.id === targetId)
          if (!source || !target) return null

          const isActive = !shouldReduceMotion && index === activeIndex

          return (
            <motion.line
              animate={
                isActive
                  ? { opacity: [0.25, 1, 0.25], strokeWidth: [0.6, 2.4, 0.6] }
                  : { opacity: 0.25, strokeWidth: 0.6 }
              }
              key={`${sourceId}-${targetId}`}
              stroke="url(#edge-gradient)"
              strokeLinecap="round"
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              x1={source.x}
              x2={target.x}
              y1={source.y}
              y2={target.y}
            />
          )
        })}
      </svg>

      {nodes.map((node) => {
        const isCentral = node.id === 'mcp'
        return (
          <motion.div
            animate={
              shouldReduceMotion || !isCentral
                ? { opacity: 1, scale: 1 }
                : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
            }
            className="absolute flex flex-col items-center"
            key={node.id}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full shadow-card ${
                isCentral
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200'
              }`}
            >
              {node.label?.[0]}
            </span>
            {node.label ? (
              <span className="mt-2 text-xs font-semibold text-slate-600">{node.label}</span>
            ) : null}
          </motion.div>
        )
      })}
    </div>
  )
}

export default memo(McpGraphAnimation)
