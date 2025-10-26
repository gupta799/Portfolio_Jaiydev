import { featuredProject } from '../data/portfolio'

function FeaturedCaseStudySection(): JSX.Element {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-8 md:py-20" id="projects">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Featured case study
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          AI-led migration of Visa&apos;s 10M+ line payments platform.
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          A fine-tuned Claude workflow, MCP graph context, and disciplined QA kept Visa shipping while the codebase
          evolved underneath.
        </p>
      </div>
      <article className="group grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:p-12">
        <div className="space-y-5">
          <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">{featuredProject.title}</h3>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            {featuredProject.role} · {featuredProject.period}
          </p>
          <p className="text-sm font-medium text-slate-500">{featuredProject.subtitle}</p>
          <p className="text-base text-slate-600">{featuredProject.description}</p>
          <p className="text-base font-semibold bg-gradient-to-r from-accent-orange-500 to-emerald-500 bg-clip-text text-transparent">{featuredProject.result}</p>
          <ul className="grid gap-3 text-sm text-slate-600">
            {featuredProject.metrics?.map((metric) => (
              <li className="flex gap-3" key={metric}>
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-accent-orange-500 to-emerald-500" aria-hidden="true" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
          {featuredProject.link ? (
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all hover:gap-3"
              href={featuredProject.link}
              rel="noreferrer"
              target="_blank"
            >
              Read the full breakdown
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 group-hover:border-slate-300 group-hover:shadow-card-hover">
          <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Stack</h4>
          <ul className="flex flex-wrap gap-2">
            {featuredProject.stack.map((item) => (
              <li className="rounded-full bg-white px-3 py-1 text-sm text-slate-600 ring-1 ring-slate-200 transition-all hover:ring-slate-300" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>
      </div>
    </section>
  )
}

export default FeaturedCaseStudySection
