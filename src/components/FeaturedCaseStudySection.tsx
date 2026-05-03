import { motion } from 'framer-motion'
import { featuredProject } from '../data/portfolio'
import ProjectImpactCharts from './ProjectImpactCharts'

const CALLOUTS = [
  { value: '10M+', label: 'Lines migrated' },
  { value: '3×', label: 'Deploy velocity' },
  { value: '0', label: 'Production incidents' },
]

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 18 } },
}

export default function FeaturedCaseStudySection(): JSX.Element {
  const storyBeats = featuredProject.story ?? []
  const chartItems = featuredProject.charts ?? []

  return (
    <section className="relative overflow-hidden bg-[#050508]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28" id="projects">

        {/* Eyebrow + headline */}
        <motion.div
          className="space-y-5"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-400/70">
            Featured case study
          </motion.p>
          <motion.h2
            variants={item}
            className="max-w-3xl text-balance text-5xl font-black tracking-tight text-white md:text-6xl"
          >
            How one team's AI tooling became an{' '}
            <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              enterprise migration engine
            </span>
          </motion.h2>
          <motion.p variants={item} className="max-w-xl text-base text-white/40">
            Grammar MCP + Neo4j graph turned Claude Code into a safe, auditable migration system. Zero production incidents.
          </motion.p>
        </motion.div>

        {/* Stat callouts */}
        <motion.div
          className="mt-14 grid grid-cols-3 gap-6 border-y border-white/8 py-10"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {CALLOUTS.map((c) => (
            <motion.div key={c.label} variants={item} className="flex flex-col gap-1.5">
              <span className="text-5xl font-black tracking-tight text-white md:text-6xl">{c.value}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/30">{c.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Article card */}
        <motion.article
          className="glass-dark mt-14 rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 32 }}
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
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
                  {featuredProject.role} · {featuredProject.period}
                </p>
                <h3 className="text-2xl font-bold text-white md:text-3xl">{featuredProject.title}</h3>
                <p className="text-sm text-white/45">{featuredProject.description}</p>
              </div>

              {storyBeats.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/25">Build steps</h4>
                  <ul className="mt-4 space-y-3">
                    {storyBeats.map((step, i) => (
                      <motion.li
                        key={step.id}
                        className="flex gap-3 text-sm text-white/55"
                        initial={{ opacity: 0, x: -12 }}
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
                    className="rounded-full bg-white/6 px-3 py-1 text-xs font-semibold text-white/45 ring-1 ring-white/10 transition-colors hover:text-white/80 hover:ring-white/20"
                    initial={{ opacity: 0, scale: 0.85 }}
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
