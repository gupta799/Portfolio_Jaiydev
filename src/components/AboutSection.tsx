import { focusAreas } from '../data/portfolio'
import { iconRegistry } from './iconRegistry'

function AboutSection(): JSX.Element {
  return (
    <section className="bg-section-orange-subtle">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-8 md:py-20" id="about">
        {/* Eyebrow only, no large title */}
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">About</p>

        {/* Full-width content */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card transition duration-300 hover:shadow-card-hover md:p-12">
          <p className="text-base text-slate-700 md:text-lg">
            I build AI infrastructure that enables organizations to ship intelligent systems at scale. My focus is on creating frameworks, tools, and workflows that make advanced AI accessible to engineering teams—from agent orchestration to distributed fine-tuning pipelines.
          </p>

          {/* Single combined card */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-slate-300 hover:shadow-card-hover">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Focus Areas
            </h3>
            <ul className="grid gap-4 text-sm text-slate-700 md:grid-cols-2">
              {focusAreas.map((area) => {
                const Icon = iconRegistry[area.icon]
                return (
                  <li className="flex items-start gap-3" key={area.label}>
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-200">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <span className="leading-snug">{area.label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
