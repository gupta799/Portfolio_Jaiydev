import { motion } from 'framer-motion'
import { focusAreas } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import { iconRegistry } from './iconRegistry'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 18 } },
}

function AboutSection(): JSX.Element {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-8 md:py-20" id="about">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
        >
          <SectionHeading
            eyebrow="About"
            title="Engineering AI infrastructure at scale"
            description="I build AI infrastructure that gives teams AI superpowers — from agent orchestration pipelines to fine-tuning systems that put custom models in non-ML hands."
            className="max-w-3xl"
          />
        </motion.div>

        <motion.div
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
        >
          <motion.div
            className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
              Capability areas
            </h3>
            <motion.ul
              className="grid gap-4 text-sm text-slate-700 md:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {focusAreas.map((area) => {
                const Icon = iconRegistry[area.icon]
                return (
                  <motion.li
                    className="group flex items-start gap-3"
                    key={area.label}
                    variants={itemVariants}
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-emerald-50 text-orange-500 ring-1 ring-orange-100 transition-all group-hover:shadow-glow-orange group-hover:ring-orange-200">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <span className="mt-2 leading-snug">{area.label}</span>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
