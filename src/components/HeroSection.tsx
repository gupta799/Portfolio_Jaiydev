import { hero } from '../data/portfolio'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]


function HeroSection(): JSX.Element {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 transition-colors duration-200 md:gap-16 md:px-8 md:pb-20 md:pt-16">
        <nav className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-900">
            Jaiydev Gupta
          </span>
          <ul className="flex flex-wrap items-center gap-4 md:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="transition duration-150 hover:text-slate-900 focus-visible:text-slate-900" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-10 md:gap-12">
          {/* Profile + Location */}
          <div className="flex items-center gap-4">
            <img
              src="/profile.jpg"
              alt="Jaiydev Gupta"
              className="h-20 w-20 rounded-full border-2 border-slate-200 object-cover shadow-card md:h-24 md:w-24"
            />
            <div>
              <h2 className="text-lg font-bold text-slate-900 md:text-xl">Jaiydev Gupta</h2>
              <p className="text-sm text-slate-500">{hero.location}</p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            {hero.headline}
          </h1>

          {/* Key Accomplishments */}
          <ul className="grid gap-4 text-lg text-slate-700">
            {hero.highlights.map((item) => (
              <li className="flex gap-3" key={item}>
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-gradient-to-r from-accent-orange-500 to-emerald-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Visa Badge */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-card w-fit">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a1f71] to-[#3c4edd] text-sm font-bold uppercase tracking-wider text-white shadow-lg">
              VI
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Currently at</p>
              <p className="text-base font-bold text-slate-900">Visa</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:bg-slate-800 hover:shadow-card-hover focus-visible:bg-slate-800"
              href="mailto:hello@jaiy.dev"
            >
              Start a project
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:border-slate-300 focus-visible:bg-slate-50"
              href="https://linkedin.com/in/jaiydev-gupta-408269160/"
              rel="noreferrer"
              target="_blank"
            >
              View LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeroSection
