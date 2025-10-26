import { focusAreas } from '../data/portfolio'

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
            <ul className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              {focusAreas.map((area) => (
                <li className="flex gap-3" key={area}>
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-accent-orange-500 to-emerald-500" aria-hidden="true" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
