import { motion } from 'framer-motion'
import type { ProjectChart } from '../types/portfolio'

type ProjectImpactChartsProps = {
  charts: ProjectChart[]
}

const formatValue = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
  })
  return formatter.format(value)
}

const toneColors: Record<NonNullable<ProjectChart['series'][number]['tone']>, string> = {
  before: '#94a3b8',
  after: '#f97316',
  baseline: '#64748b',
}

const gradientStops = ['#f97316', '#10b981']

function ProjectImpactCharts({ charts }: ProjectImpactChartsProps): JSX.Element | null {
  if (!charts.length) {
    return null
  }

  return (
    <div className="grid gap-6">
      {charts.map((chart) => {
        const max = Math.max(...chart.series.map((item) => item.value), 1)
        const chartWidth = 360
        const chartHeight = 220
        const padding = { top: 24, right: 24, bottom: 56, left: 56 }
        const axisY = chartHeight - padding.bottom
        const axisX = padding.left
        const innerWidth = chartWidth - padding.left - padding.right
        const innerHeight = chartHeight - padding.top - padding.bottom
        const barCount = chart.series.length
        const gap = Math.min(32, innerWidth / Math.max(barCount * 2, 1))
        const barWidth = Math.min(
          64,
          (innerWidth - gap * Math.max(barCount - 1, 0)) / Math.max(barCount, 1),
        )
        const totalBarsWidth = barWidth * barCount + gap * Math.max(barCount - 1, 0)
        const startX = axisX + Math.max((innerWidth - totalBarsWidth) / 2, 0)
        const tickCount = 4
        const ticks = Array.from({ length: tickCount + 1 }, (_, index) => index / tickCount)
        const gradientId = `${chart.id}-after-gradient`
        const hasAfterTone = chart.series.some((item) => item.tone === 'after')

        return (
          <motion.article
            key={chart.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
          >
            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                {chart.title}
              </h4>
              <p className="text-sm text-slate-600">{chart.description}</p>
            </div>
            <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <svg
                role="img"
                aria-label={`${chart.title} chart`}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full"
              >
                {hasAfterTone ? (
                  <defs>
                    <linearGradient id={gradientId} x1="0" x2="1" y1="1" y2="0">
                      <stop offset="0%" stopColor={gradientStops[0]} />
                      <stop offset="100%" stopColor={gradientStops[1]} />
                    </linearGradient>
                  </defs>
                ) : null}
                <line
                  x1={axisX}
                  x2={chartWidth - padding.right}
                  y1={axisY}
                  y2={axisY}
                  stroke="#cbd5f5"
                  strokeWidth={1}
                />
                <line
                  x1={axisX}
                  x2={axisX}
                  y1={padding.top}
                  y2={axisY}
                  stroke="#cbd5f5"
                  strokeWidth={1}
                />
                {ticks.map((tick, index) => {
                  const y = axisY - tick * innerHeight
                  const value = formatValue(max * tick)
                  return (
                    <g key={index}>
                      <line
                        x1={axisX}
                        x2={chartWidth - padding.right}
                        y1={y}
                        y2={y}
                        stroke="#e2e8f0"
                        strokeDasharray="4 6"
                        strokeWidth={1}
                      />
                      <text
                        x={axisX - 12}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-slate-400 text-[10px] font-semibold"
                      >
                        {value}
                      </text>
                    </g>
                  )
                })}
                {chart.unit ? (
                  <text
                    x={axisX - 44}
                    y={padding.top + innerHeight / 2}
                    textAnchor="middle"
                    transform={`rotate(-90 ${axisX - 44} ${padding.top + innerHeight / 2})`}
                    className="fill-slate-400 text-[10px] font-semibold uppercase tracking-[0.2em]"
                  >
                    {chart.unit}
                  </text>
                ) : null}
                {chart.series.map((seriesItem, index) => {
                  const height =
                    max === 0 ? 0 : Math.max((seriesItem.value / max) * innerHeight, 4)
                  const x = startX + index * (barWidth + gap)
                  const y = axisY - height
                  const fill =
                    seriesItem.tone === 'after'
                      ? `url(#${gradientId})`
                      : toneColors[seriesItem.tone] ?? toneColors.before
                  const numericValue = formatValue(seriesItem.value)

                  return (
                    <g key={seriesItem.label}>
                      <motion.rect
                        initial={{ y: axisY, height: 0 }}
                        animate={{ y, height }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                        x={x}
                        width={barWidth}
                        rx={8}
                        fill={fill}
                      />
                      <text
                        x={x + barWidth / 2}
                        y={y - 10}
                        textAnchor="middle"
                        className="fill-slate-600 text-xs font-semibold"
                      >
                        {numericValue}
                      </text>
                      <text
                        x={x + barWidth / 2}
                        y={axisY + 26}
                        textAnchor="middle"
                        className="fill-slate-500 text-[11px] font-semibold"
                      >
                        {seriesItem.label}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
              {chart.series.map((seriesItem) => {
                const background =
                  seriesItem.tone === 'after'
                    ? `linear-gradient(135deg, ${gradientStops[0]}, ${gradientStops[1]})`
                    : toneColors[seriesItem.tone] ?? toneColors.before
                return (
                  <span
                    key={`${chart.id}-${seriesItem.label}`}
                    className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background }}
                      aria-hidden="true"
                    />
                    {seriesItem.label}
                  </span>
                )
              })}
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}

export default ProjectImpactCharts
