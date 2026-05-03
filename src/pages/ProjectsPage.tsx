import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { supportingProjects } from '../data/portfolio'
import AnimatedPage from '../components/AnimatedPage'
import FeaturedCaseStudySection from '../components/FeaturedCaseStudySection'
import SectionHeading from '../components/SectionHeading'
import { iconRegistry } from '../components/iconRegistry'
import type { VisualCue } from '../types/portfolio'

type Tab = 'work' | 'personal'

function VisualPills({
  items,
  variant = 'default',
}: {
  items?: VisualCue[]
  variant?: 'default' | 'independent'
}): JSX.Element | null {
  if (!items?.length) return null

  const baseClasses = 'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all'
  const variantClasses =
    variant === 'independent'
      ? 'bg-slate-50 text-slate-600 ring-slate-200 hover:ring-slate-300'
      : 'bg-emerald-50 text-emerald-700 ring-emerald-200 hover:ring-emerald-300'

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => {
        const Icon = iconRegistry[item.icon]
        return (
          <li className={`${baseClasses} ${variantClasses}`} key={item.label}>
            <Icon aria-hidden="true" size={16} />
            <span>{item.label}</span>
          </li>
        )
      })}
    </ul>
  )
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-4deg', '4deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ scale: 1.015 }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProjectsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>('work')
  const visaLabel = 'Visa VAS Innovation Labs'

  const workProjects = supportingProjects.filter(
    (p) => p.title === 'Enterprise Fine-Tuning CLI Tool',
  )
  const personalProjects = supportingProjects.filter((p) =>
    ['BERT Knowledge Distillation', 'Go Microservice API', 'JaiydevRAG'].includes(p.title),
  )

  const tabs: { id: Tab; label: string }[] = [
    { id: 'work', label: 'Work' },
    { id: 'personal', label: 'Personal' },
  ]

  const projects = activeTab === 'work' ? workProjects : personalProjects

  return (
    <AnimatedPage>
      {/* Dark featured section */}
      <FeaturedCaseStudySection />

      {/* White section — clean contrast */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          >
            <SectionHeading title="My Work" description="Selected builds from Visa and personal R&D." />
          </motion.div>

          {/* Tabs */}
          <div className="relative mt-8 flex gap-0 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-orange-400 to-emerald-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Project cards */}
          <motion.div
            className="mt-8 space-y-6"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="show"
            key={activeTab}
          >
            {projects.map((project) => {
              const isWork = activeTab === 'work'
              return (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
                  }}
                >
                  <TiltCard>
                    <article className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover md:flex-row md:items-stretch md:gap-10 md:p-8">
                      <div className="flex-1 space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                          {isWork ? visaLabel : 'Independent Build'}
                        </span>
                        <div className="flex flex-wrap items-baseline gap-3">
                          <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
                            {project.title}
                          </h3>
                          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                            {project.period}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-600">{project.role}</p>
                        <p className="text-sm font-medium text-slate-400">{project.subtitle}</p>
                        <VisualPills items={project.visuals} variant={isWork ? 'default' : 'independent'} />
                        <p className="text-base text-slate-600">{project.description}</p>
                        <p className="text-base font-semibold bg-gradient-to-r from-accent-orange-500 to-emerald-500 bg-clip-text text-transparent">
                          {project.result}
                        </p>
                        {project.link && (
                          <motion.a
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all hover:gap-3"
                            href={project.link}
                            rel="noreferrer"
                            target="_blank"
                            whileHover={{ x: 3 }}
                          >
                            View on GitHub <span aria-hidden="true">→</span>
                          </motion.a>
                        )}
                      </div>

                      <div className="flex flex-col gap-6 border-t border-slate-100 pt-6 md:w-64 md:flex-none md:border-t-0 md:border-l md:pl-8">
                        {project.metrics && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                              Impact
                            </h4>
                            <ul className="mt-4 space-y-3 text-sm text-slate-600">
                              {project.metrics.map((metric, i) => (
                                <motion.li
                                  key={metric}
                                  className="flex gap-2"
                                  initial={{ opacity: 0, x: -8 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: i * 0.08 }}
                                >
                                  <span
                                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-accent-orange-500 to-emerald-500"
                                    aria-hidden="true"
                                  />
                                  <span>{metric}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                            Stack
                          </h4>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {project.stack.map((tech, i) => (
                              <motion.li
                                key={tech}
                                className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:ring-slate-300"
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
                              >
                                {tech}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  )
}

export default ProjectsPage
