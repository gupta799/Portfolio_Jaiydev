import { Mail, Linkedin, Github, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'
import HeroAnimationCarousel from '../components/HeroAnimationCarousel'

const STATS = [
  { value: '4,000', label: 'Engineers\nserved' },
  { value: '10M+', label: 'Lines\nmigrated' },
  { value: '20+', label: 'Teams\nenabled' },
  { value: '3×', label: 'Deploy\nvelocity' },
]

const SOCIAL_LINKS = [
  { label: 'Email', href: 'mailto:jaiydev799@hotmail.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jaiydev-gupta-408269160/', icon: Linkedin, external: true },
  { label: 'GitHub', href: 'https://github.com/gupta799', icon: Github, external: true },
  { label: 'Resume', href: '/resume.pdf', icon: Download, download: true },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
}

function HomePage(): JSX.Element {
  return (
    <AnimatedPage>
      {/* Dark hero section */}
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#0a0a0f]">
        {/* Meta-style animated gradient mesh */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-mesh-drift-1 absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-orange-500/[0.13] blur-[96px]" />
          <div className="animate-mesh-drift-2 absolute -right-24 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.11] blur-[80px]" />
          <div className="animate-mesh-drift-3 absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-orange-600/[0.08] blur-[72px]" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:px-8 md:pt-20">
          <div className="grid gap-16 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:gap-12">

            {/* Left column — identity + copy */}
            <motion.div
              className="flex flex-col gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Profile */}
              <motion.div className="flex items-center gap-4" variants={itemVariants}>
                <div className="relative flex-none">
                  {/* Gradient ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-emerald-400 blur-[2px] opacity-70" />
                  <div className="relative h-20 w-20 rounded-full ring-2 ring-[#0a0a0f] md:h-24 md:w-24 overflow-hidden">
                    <img
                      alt="Jaiydev Gupta"
                      className="h-full w-full object-cover"
                      src="/profile.jpg"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white md:text-xl">Jaiydev Gupta</h2>
                  <p className="text-sm text-white/45 mt-0.5">
                    AI Strategy & Innovation · San Francisco
                  </p>
                </div>
              </motion.div>

              {/* Headline — Apple-scale */}
              <motion.div variants={itemVariants}>
                <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tighter text-white md:text-6xl lg:text-7xl">
                  Building AI that{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                    scales entire
                  </span>{' '}
                  organizations.
                </h1>
              </motion.div>

              {/* Leadership statement */}
              <motion.p
                className="max-w-lg text-lg font-medium leading-relaxed text-white/55 md:text-xl"
                variants={itemVariants}
              >
                I don't just build AI products — I build the infrastructure that lets entire organizations use them.
              </motion.p>

              {/* Stats row — Apple spec callout style */}
              <motion.div
                className="grid grid-cols-4 gap-4 border-t border-white/8 pt-8"
                variants={itemVariants}
              >
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="text-2xl font-black tracking-tight text-white md:text-3xl">
                      {stat.value}
                    </span>
                    <span className="whitespace-pre-line text-[11px] font-medium leading-tight text-white/35 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div className="flex items-center gap-3" variants={itemVariants}>
                {SOCIAL_LINKS.map(({ label, href, icon: Icon, external, download }) => (
                  <motion.a
                    key={label}
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/50 transition-colors hover:border-white/25 hover:text-white"
                    href={href}
                    {...(external ? { rel: 'noreferrer', target: '_blank' } : {})}
                    {...(download ? { download: true } : {})}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column — carousel */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glassmorphism container */}
              <div className="glass-dark-strong flex h-full flex-col rounded-3xl p-5 min-h-[480px]">
                <HeroAnimationCarousel />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
            Scroll
          </span>
          <motion.div
            className="h-6 w-px bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>
    </AnimatedPage>
  )
}

export default HomePage
