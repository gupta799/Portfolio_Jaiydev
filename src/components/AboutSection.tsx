import { focusAreas } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import { iconRegistry } from './iconRegistry'

function AboutSection(): JSX.Element {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-8 md:py-20" id="about">
        <SectionHeading
          eyebrow="About"
          title="Engineering AI infrastructure at scale"
          description="I build AI infrastructure that helps teams ship intelligent systems—from agent orchestration through distributed fine-tuning pipelines."
          className="max-w-3xl"
        />

        {/* Full-width content */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card transition duration-300 hover:shadow-card-hover md:p-12">
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
