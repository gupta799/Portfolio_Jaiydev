import { motion } from 'framer-motion'
import { focusAreas } from '../data/portfolio'
import { iconRegistry } from './iconRegistry'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 18 } },
}

export default function AboutSection(): JSX.Element {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-28" id="about">

        {/* Heading */}
        <motion.div
          className="mb-16 space-y-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
            About
          </motion.p>
          <motion.h2
            variants={item}
            className="max-w-2xl text-balance text-4xl font-black tracking-tight text-slate-900 md:text-5xl"
          >
            Engineering AI infrastructure{' '}
            <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">
              at scale
            </span>
          </motion.h2>
          <motion.p variants={item} className="max-w-xl text-base text-slate-500">
            I build AI infrastructure that gives teams superpowers — agent orchestration pipelines, fine-tuning systems that put custom models in non-ML hands, and frameworks that let entire organizations move faster.
          </motion.p>
        </motion.div>

        {/* Focus areas grid */}
        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {focusAreas.map((area) => {
            const Icon = iconRegistry[area.icon]
            return (
              <motion.li
                key={area.label}
                variants={item}
                className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-orange-100 hover:shadow-card"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-emerald-50 text-orange-500 ring-1 ring-orange-100 transition-all group-hover:shadow-glow-orange">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span className="mt-1.5 text-sm font-medium leading-snug text-slate-700">{area.label}</span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
