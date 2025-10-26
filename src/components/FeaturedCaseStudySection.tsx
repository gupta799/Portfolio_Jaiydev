import { featuredProject } from '../data/portfolio'
import ProjectImpactCharts from './ProjectImpactCharts'

function FeaturedCaseStudySection(): JSX.Element {
  const storyBeats = featuredProject.story ?? []
  const chartItems = featuredProject.charts ?? []

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20" id="projects">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Featured case study
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Visa&apos;s 10M-line migration, powered by Claude Code Agent SDK
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Grammar MCP + Neo4j graph turned Claude Code into a safe migration engine.
          </p>
        </div>
        <article className="group mt-10 grid gap-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-12">
          {chartItems.length > 0 ? (
            <div className="order-first md:order-none">
              <ProjectImpactCharts charts={chartItems} />
            </div>
          ) : null}

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {featuredProject.role} · {featuredProject.period}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">{featuredProject.title}</h3>
              <p className="text-sm font-medium text-slate-500">{featuredProject.subtitle}</p>
              <p className="text-sm text-slate-600">{featuredProject.description}</p>
            </div>

            {storyBeats.length > 0 ? (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Build steps
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {storyBeats.map((step) => (
                    <li className="flex gap-2" key={step.id}>
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-accent-orange-500 to-emerald-500"
                      />
                      <span>{step.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {featuredProject.link ? (
              <a
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900 transition-all hover:gap-3"
                href={featuredProject.link}
                rel="noreferrer"
                target="_blank"
              >
                Read the breakdown
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  )
}

export default FeaturedCaseStudySection
