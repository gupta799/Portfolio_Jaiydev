import { motion } from 'framer-motion'

const STATS = [
  {
    value: '4,000',
    label: 'Engineers',
    description: 'Built agent infrastructure giving Visa's entire org AI capability.',
  },
  {
    value: '10M+',
    label: 'Lines migrated',
    description: 'Largest codebase transformation shipped without a single production incident.',
  },
  {
    value: '20+',
    label: 'Teams enabled',
    description: 'Non-ML teams running custom fine-tuning jobs with a single command.',
  },
  {
    value: '3×',
    label: 'Deploy velocity',
    description: 'Reviewers only ever saw clean, high-signal diffs — never raw AI output.',
  },
]

export default function ImpactPanel() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-white px-2 py-4">
      <div className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col justify-between bg-white p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
          >
            <div>
              <span className="block text-4xl font-black tracking-tight text-orange-500 md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-1 block text-sm font-semibold text-slate-900">
                {stat.label}
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
