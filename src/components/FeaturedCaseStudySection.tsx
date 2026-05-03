import { motion } from 'framer-motion'
import { featuredProject } from '../data/portfolio'
import ProjectImpactCharts from './ProjectImpactCharts'

const CALLOUTS = [
  { value: '10M+', label: 'Lines migrated' },
  { value: '3×', label: 'Deploy velocity' },
  { value: '0', label: 'Production incidents' },
]

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 18 } },
}

function FeaturedCaseStudySection(): JSX.Element {
  const storyBeats = featuredProject.story ?? []
  const chartItems = featuredProject.charts ?? []

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f]">
      {/* Background gradient carry-over from hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/[0.07] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24" id="projects">

        {/* Section eyebrow + headline */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-400/80"
          >
            Featured case study
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="max-w-2xl text-balance text-4xl font-black tracking-tighter text-white md:text-5xl"
          >
            How one team's AI tooling became an{' '}
            <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              enterprise migration engine
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base text-white/45"
          >
            Grammar MCP + Neo4j graph turned Claude Code into a safe, auditable migration system. Zero production incidents.
          </motion.p>
        </motion.div>

        {/* Apple-style stat callouts */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-6 border-y border-white/8 py-10"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {CALLOUTS.map((c) => (
            <motion.div key={c.label} variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-4xl font-black tracking-tighter text-white md:text-5xl">
                {c.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-white/35">
                {c.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main article */}
        <motion.article
          className="mt-12 glass-dark rounded-3xl p-8 md:p-10"
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
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35">
                  {featuredProject.role} · {featuredProject.period}
                </p>
                <h3 className="text-2xl font-bold text-white md:text-3xl">{featuredProject.title}</h3>
                <p className="text-sm font-medium text-white/45">{featuredProject.subtitle}</p>
                <p className="text-sm text-white/55">{featuredProject.description}</p>
              </div>

              {storyBeats.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30">
                    Build steps
                  </h4>
                  <ul className="mt-4 space-y-3 text-sm text-white/60">
                    {storyBeats.map((step, i) => (
                      <motion.li
                        key={step.id}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 18 }}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-orange-400 to-emerald-400"
                        />
                        <span>{step.description}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.stack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="rounded-full bg-white/6 px-3 py-1 text-xs font-semibold text-white/50 ring-1 ring-white/10 hover:text-white/80 hover:ring-white/20 transition-all"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {featuredProject.link && (
                <motion.a
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-orange-400 transition-all hover:gap-3 hover:text-orange-300"
                  href={featuredProject.link}
                  rel="noreferrer"
                  target="_blank"
                  whileHover={{ x: 4 }}
                >
                  Read the breakdown <span aria-hidden="true">→</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

export default FeaturedCaseStudySection
