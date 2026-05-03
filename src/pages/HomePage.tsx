import { Mail, Linkedin, Github, Download, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'
import HeroAnimationCarousel from '../components/HeroAnimationCarousel'

const STATS = [
  { value: '10M+', label: 'Lines\nmigrated' },
  { value: '4,000', label: 'Engineers\nserved' },
  { value: '20+',  label: 'Teams\nenabled' },
  { value: '3×',   label: 'Deploy\nvelocity' },
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

      {/* ── Hero ── Apple-style light, centered, single focus */}
      <section className="hero-bg flex min-h-[calc(100vh-68px)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center md:px-8">

        {/* Identity chip */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/profile.jpg"
            alt="Jaiydev Gupta"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <span className="text-sm font-medium text-slate-500">
            Jaiydev Gupta &nbsp;·&nbsp; AI Strategy & Innovation Engineer
          </span>
        </motion.div>

        {/* Headline — the singular focus */}
        <motion.h1
          className="mx-auto max-w-4xl text-balance text-6xl font-black leading-[1.02] tracking-[-0.03em] text-slate-900 md:text-7xl lg:text-[88px]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          Building AI that{' '}
          <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 bg-clip-text text-transparent">
            scales entire
          </span>
          <br />
          organizations.
        </motion.h1>

        {/* CTA row */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            See the work <ArrowRight size={15} />
          </motion.a>

          {SOCIAL_LINKS.map(({ label, href, icon: Icon, external, download }) => (
            <motion.a
              key={label}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-700"
              href={href}
              {...(external ? { rel: 'noreferrer', target: '_blank' } : {})}
              {...(download ? { download: true } : {})}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ── Showcase ── white section, carousel as the product shot */}
      <section className="bg-white px-6 pb-24 pt-8 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroAnimationCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── Proof ── Apple-gray, spec callout numbers */}
      <section className="bg-apple-gray px-6 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.p
            className="mb-14 text-center text-xs font-semibold uppercase tracking-[0.32em] text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Impact at Visa VAS Innovation Labs
          </motion.p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 90, damping: 18 }}
              >
                <span className="bg-gradient-to-br from-orange-500 to-emerald-500 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-7xl">
                  {stat.value}
                </span>
                <span className="mt-2 whitespace-pre-line text-[11px] font-semibold uppercase leading-tight tracking-widest text-slate-400">
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
