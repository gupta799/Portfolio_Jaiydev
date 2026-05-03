import { motion } from 'framer-motion'
import { featuredProject } from '../data/portfolio'
import ProjectImpactCharts from './ProjectImpactCharts'

const CALLOUTS = [
  { value: '10M+', label: 'Lines migrated' },
  { value: '3×',   label: 'Deploy velocity' },
  { value: '0',    label: 'Production incidents' },
]

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 18 } },
}

export default function FeaturedCaseStudySection(): JSX.Element {
  const storyBeats = featuredProject.story ?? []
  const chartItems = featuredProject.charts ?? []

  return (
    <section className="bg-apple-gray">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28" id="projects">

        {/* Eyebrow + headline */}
        <motion.div
          className="space-y-5"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-500">
            Featured case study
          </motion.p>
          <motion.h2
            variants={item}
            className="max-w-3xl text-balance text-5xl font-black tracking-tight text-slate-900 md:text-6xl"
          >
            How one team's AI tooling became an{' '}
            <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">
              enterprise migration engine
            </span>
          </motion.h2>
          <motion.p variants={item} className="max-w-xl text-base text-slate-500">
            Grammar MCP + Neo4j graph turned Claude Code into a safe, auditable migration system. Zero production incidents.
          </motion.p>
        </motion.div>

        {/* Stat callouts */}
        <motion.div
          className="mt-14 grid grid-cols-3 gap-6 border-y border-slate-200 py-10"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {CALLOUTS.map((c) => (
            <motion.div key={c.label} variants={item} className="flex flex-col gap-1.5">
              <span className="bg-gradient-to-br from-orange-500 to-emerald-500 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-6xl">
                {c.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{c.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Article card */}
        <motion.article
          className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:p-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
        >
          <div className="grid gap-12 md:grid-cols-2">
            {chartItems.length > 0 && (
              <div className="order-first md:order-none">
                <ProjectImpactCharts charts={chartItems} />
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  {featuredProject.role} · {featuredProject.period}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">{featuredProject.title}</h3>
                <p className="text-sm text-slate-500">{featuredProject.description}</p>
              </div>

              {storyBeats.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Build steps</h4>
                  <ul className="mt-4 space-y-3">
                    {storyBeats.map((step, i) => (
                      <motion.li
                        key={step.id}
                        className="flex gap-3 text-sm text-slate-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 18 }}
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-orange-400 to-emerald-400" aria-hidden="true" />
                        <span>{step.description}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.stack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition-colors hover:ring-slate-300"
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
