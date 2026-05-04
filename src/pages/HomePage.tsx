import { Mail, Linkedin, Github, Download, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'
import HeroAnimationCarousel from '../components/HeroAnimationCarousel'

const STATS = [
  { value: '10M+',  label: 'Lines migrated' },
  { value: '4,000', label: 'Engineers served' },
  { value: '20+',   label: 'Teams enabled' },
  { value: '3×',    label: 'Deploy velocity' },
]

const SOCIAL_LINKS = [
  { label: 'Email',    href: 'mailto:jaiydev799@hotmail.com',                    icon: Mail },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jaiydev-gupta-408269160/', icon: Linkedin, external: true },
  { label: 'GitHub',   href: 'https://github.com/gupta799',                      icon: Github,   external: true },
  { label: 'Resume',   href: '/resume.pdf',                                      icon: Download, download: true },
]

function HomePage(): JSX.Element {
  return (
    <AnimatedPage>

      {/* ── Hero ── pure white, centered, nothing competing with the headline */}
      <section className="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center bg-white px-6 py-20 text-center md:px-8">

        {/* Identity */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/profile.jpg"
            alt="Jaiydev Gupta"
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-slate-400">
            Jaiydev Gupta &nbsp;·&nbsp; AI Strategy & Innovation Engineer
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mx-auto max-w-3xl text-balance text-5xl font-black leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-7xl lg:text-[84px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Building AI that scales{' '}
          <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">
            entire organizations.
          </span>
        </motion.h1>

        {/* CTA */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            See the work <ArrowRight size={15} />
          </a>

          {SOCIAL_LINKS.map(({ label, href, icon: Icon, external, download }) => (
            <a
              key={label}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-700"
              href={href}
              {...(external ? { rel: 'noreferrer', target: '_blank' } : {})}
              {...(download ? { download: true } : {})}
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>
      </section>

      {/* ── Showcase ── the work, front and center */}
      <section className="bg-[#f5f5f7] px-6 pb-24 pt-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroAnimationCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── Numbers ── clean, Apple spec style */}
      <section className="bg-white px-6 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.p
            className="mb-16 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Impact at Visa VAS Innovation Labs
          </motion.p>

          <div className="grid grid-cols-2 gap-16 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: 'easeOut' }}
              >
                <span className="text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </AnimatedPage>
  )
}

export default HomePage
