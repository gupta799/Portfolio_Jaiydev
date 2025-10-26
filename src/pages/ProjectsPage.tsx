import { useState } from 'react'
import { Link } from 'react-router-dom'
import { featuredProject, supportingProjects } from '../data/portfolio'
import AnimatedPage from '../components/AnimatedPage'

type Tab = 'work' | 'personal'

function ProjectsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>('work')

  const visaLabel = 'Visa VAS Innovation Labs'

  // Categorize projects
  const workProjects = supportingProjects.filter((project) =>
    project.title === 'Enterprise Fine-Tuning CLI Tool'
  )

  const personalProjects = supportingProjects.filter((project) =>
    ['BERT Knowledge Distillation', 'Go Microservice API', 'JaiydevRAG'].includes(project.title)
  )

  const workItems = [
    { kind: 'case-study' as const, project: featuredProject },
    ...workProjects.map((project) => ({ kind: 'work' as const, project })),
  ]

  const tabs: { id: Tab; label: string }[] = [
    { id: 'work', label: 'Work' },
    { id: 'personal', label: 'Personal' },
  ]

  return (
    <AnimatedPage>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">My Work</h2>

          {/* Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-slate-900 text-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Work Projects */}
          {activeTab === 'work' && (
            <div className="mt-8 space-y-8">
              {workItems.map((item) => {
                const { project } = item
                return (
                  <article
                    className="group flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover md:flex-row md:items-stretch md:gap-10 md:p-8"
                    key={project.title}
                  >
                    <div className="flex-1 space-y-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        {visaLabel}
                      </span>
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
                          {project.title}
                        </h3>
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          {project.period}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-600">
                        {project.role}
                      </p>
                      <p className="text-sm font-medium text-slate-500">{project.subtitle}</p>
                      <p className="text-base text-slate-600">{project.description}</p>
                      <p className="text-base font-semibold bg-gradient-to-r from-accent-orange-500 to-emerald-500 bg-clip-text text-transparent">
                        {project.result}
                      </p>
                      {item.kind === 'case-study' ? (
                        <Link
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all hover:gap-3"
                          to="/case-study/visa"
                        >
                          Deep dive on the Visa build
                          <span aria-hidden="true">→</span>
                        </Link>
                      ) : project.link ? (
                        <a
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all hover:gap-3"
                          href={project.link}
                          rel="noreferrer"
                          target="_blank"
                        >
                          View on GitHub
                          <span aria-hidden="true">→</span>
                        </a>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-6 border-t border-slate-200 pt-6 md:w-72 md:flex-none md:border-t-0 md:border-l md:pl-8">
                      {project.metrics ? (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                            Impact
                          </h4>
                          <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            {project.metrics.map((metric) => (
                              <li className="flex gap-2" key={metric}>
                                <span
                                  className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-accent-orange-500 to-emerald-500"
                                  aria-hidden="true"
                                />
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                          Stack
                        </h4>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <li
                              className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:ring-slate-300"
                              key={tech}
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* Personal Projects */}
          {activeTab === 'personal' && personalProjects.length > 0 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Personal Projects
              </h3>
              {personalProjects.map((project) => (
                <article
                  className="group flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover md:flex-row md:items-stretch md:gap-10 md:p-8"
                  key={project.title}
                >
                  <div className="flex-1 space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Independent Build
                    </span>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        {project.title}
                      </h3>
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {project.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-600">{project.role}</p>
                    <p className="text-sm font-medium text-slate-500">{project.subtitle}</p>
                    <p className="text-base text-slate-600">{project.description}</p>
                    <p className="text-base font-semibold bg-gradient-to-r from-accent-orange-500 to-emerald-500 bg-clip-text text-transparent">
                      {project.result}
                    </p>
                    {project.link ? (
                      <a
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all hover:gap-3"
                        href={project.link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        View on GitHub
                        <span aria-hidden="true">→</span>
                      </a>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-6 border-t border-slate-200 pt-6 md:w-72 md:flex-none md:border-t-0 md:border-l md:pl-8">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        Stack
                      </h4>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li
                            className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:ring-slate-300"
                            key={tech}
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimatedPage>
  )
}

export default ProjectsPage
