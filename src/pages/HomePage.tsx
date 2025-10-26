import { Mail, Linkedin, Github } from 'lucide-react'
import { hero } from '../data/portfolio'
import AnimatedPage from '../components/AnimatedPage'

function HomePage(): JSX.Element {
  return (
    <AnimatedPage>
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 transition-colors duration-200 md:gap-16 md:px-8 md:pb-20 md:pt-16">
          <div className="grid gap-10 md:gap-12">
            {/* Profile + Location */}
            <div className="flex items-center gap-4">
              <img
                alt="Jaiydev Gupta"
                className="h-20 w-20 rounded-full border-2 border-slate-200 object-cover shadow-card md:h-24 md:w-24"
                src="/profile.jpg"
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
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 flex-none rounded-full bg-gradient-to-r from-accent-orange-500 to-emerald-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                href="mailto:jaiydev799@hotmail.com"
              >
                <Mail size={20} />
              </a>
              <a
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                href="https://linkedin.com/in/jaiydev-gupta-408269160/"
                rel="noreferrer"
                target="_blank"
              >
                <Linkedin size={20} />
              </a>
              <a
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                href="https://github.com/gupta799"
                rel="noreferrer"
                target="_blank"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  )
}

export default HomePage
