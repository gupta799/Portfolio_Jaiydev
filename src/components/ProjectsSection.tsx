import { supportingProjects } from '../data/portfolio'

function ProjectsSection(): JSX.Element {
  return (
    <section className="bg-section-emerald-subtle">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <div className="mb-8 flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-slate-900">More work</h3>
        <p className="text-sm text-slate-500">
          Side projects and experiments that keep my curiosity sharp.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {supportingProjects.map((project) => (
          <article
            className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
            key={project.title}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold text-slate-900">{project.title}</h4>
                <p className="mt-1 text-sm text-slate-500">{project.subtitle}</p>
              </div>
              <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {project.role} · {project.period}
              </span>
            </div>
            <p className="text-sm text-slate-600">{project.description}</p>
            <p className="text-sm font-semibold bg-gradient-to-r from-accent-orange-500 to-emerald-500 bg-clip-text text-transparent">{project.result}</p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:ring-slate-300" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
            {project.link ? (
              <a
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all hover:gap-3"
                href={project.link}
                rel="noreferrer"
                target="_blank"
              >
                View notes
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </article>
        ))}
      </div>
      </div>
    </section>
  )
}

export default ProjectsSection
