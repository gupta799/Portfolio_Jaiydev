import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight, Mail, Download } from 'lucide-react'
import {
  articles,
  contactMethods,
  experiences,
  featuredProject,
  focusAreas,
  supportingProjects,
} from '../data/portfolio'

// ─── Particle background ───────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0

    interface P { x: number; y: number; vx: number; vy: number; r: number; pulse: number }
    let particles: P[] = []

    function resize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    function init() {
      resize()
      const count = Math.floor((W * H) / 14000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.015
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        // dot
        const alpha = 0.25 + Math.sin(p.pulse) * 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${alpha})`
        ctx.fill()
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(249,115,22,${0.07 * (1 - dist / 140)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const ro = new ResizeObserver(() => { init() })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full opacity-60"
      style={{ zIndex: 0 }}
    />
  )
}

// ─── Loading screen ────────────────────────────────────────────────────────────

function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onEnter, 2600)
    return () => window.clearTimeout(timer)
  }, [onEnter])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#0a0908]"
      exit={{ opacity: 0, scale: 1.035 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <ParticleCanvas />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(249,115,22,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        animate={{ opacity: 0.24, scale: 1.03 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

          <motion.div
            className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 sm:px-10"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
              <span>Welcome</span>
              <span>Portfolio</span>
            </div>

            <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-8 text-center">
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[min(72vw,520px)] w-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f97316]/15"
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{ opacity: [0, 0.55, 0.18], scale: [0.55, 1.08, 1.28] }}
                transition={{ duration: 2.7, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="relative mx-auto max-w-4xl">
                <motion.p
                  className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f97316]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Welcome to
                </motion.p>

                <motion.h2
                  className="mt-6 text-[clamp(50px,11vw,140px)] font-black uppercase leading-[0.78] tracking-tight text-white"
                  initial={{ opacity: 0, y: 42, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.78, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  Jaiydev
                  <span className="block text-[#f97316]">Gupta</span>
                </motion.h2>

                <motion.p
                  className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.95 }}
                >
                  A portfolio of AI infrastructure, enterprise systems, and applied engineering.
                </motion.p>

                <motion.div
                  className="mx-auto mt-9 h-px max-w-xl bg-white/10"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                <span>Opening homepage</span>
                <span>100%</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-[#f97316]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </motion.div>
    </motion.div>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = '',
  y = 36,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function useCounter(target: number, enabled: boolean) {
  const raw = useMotionValue(0)
  const spring = useSpring(raw, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())
  useEffect(() => { if (enabled) raw.set(target) }, [enabled, raw, target])
  return display
}

function HighlightStat({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const num = parseInt(value.replace(/\D/g, ''))
  const suffix = value.replace(/[0-9]/g, '')
  const display = useCounter(num, inView)

  return (
    <div ref={ref} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
      <p className="text-2xl font-black text-[#f97316]">
        <motion.span>{display}</motion.span>{suffix}
      </p>
      <p className="mt-1 text-xs text-white/35">{label}</p>
    </div>
  )
}

// ─── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 z-40 w-full transition-all duration-500 ${
        scrolled ? 'border-b border-white/5 bg-[#0a0908]/85 backdrop-blur-xl' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
          JG
        </span>
        <ul className="flex items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-white/35">
          {[
            { label: 'About', href: '#about' },
            { label: 'Work', href: '#work' },
            { label: 'Experience', href: '#experience' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <li key={item.label}>
              <a className="transition-colors hover:text-[#f97316]" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative flex min-h-[680px] flex-col justify-center overflow-hidden px-8 pb-10 pt-24 md:min-h-[780px] md:pb-16 lg:min-h-screen">
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Profile + name row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div
              className="mb-6 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#f97316] to-[#fb923c] opacity-50 blur-sm" />
                <img
                  src="/profile.jpg"
                  alt="Jaiydev Gupta"
                  className="relative h-14 w-14 rounded-full border border-white/10 object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0908] bg-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Jaiydev Gupta</p>
                <p className="text-xs text-white/35">AI Engineer · Visa · San Francisco</p>
              </div>
            </motion.div>

            {/* Greeting headline */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-[clamp(44px,7.5vw,110px)] font-black leading-[0.92] tracking-tighter text-white"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                Hi, I'm Jaiydev.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="text-[clamp(28px,4.5vw,66px)] font-black leading-[0.95] tracking-tighter"
                style={{ color: '#f97316' }}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              >
                I build AI systems
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="text-[clamp(28px,4.5vw,66px)] font-black leading-[0.95] tracking-tighter text-white/40"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
              >
                that scale to thousands.
              </motion.h2>
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-3 md:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <a
              href="mailto:jaiydev799@hotmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#fb923c]"
            >
              <Mail size={13} />
              Get in touch
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:border-white/20 hover:text-white"
            >
              <Download size={13} />
              Resume
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="mt-9 flex items-center gap-3 md:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="h-px w-12 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}

// ─── About / Intro ─────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="relative z-10 border-t border-white/5 py-14 md:py-20" id="about">
      <div className="mx-auto max-w-6xl px-8">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          {/* Left: label + quick facts */}
          <div>
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#f97316]">
                About
              </p>
              <h2 className="text-[clamp(28px,3.5vw,48px)] font-black uppercase leading-none tracking-tight text-white">
                Who I Am
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-4">
              {[
                { label: 'Role', value: 'AI Strategy & Innovation Engineer' },
                { label: 'Company', value: 'Visa — VAS Innovation Labs' },
                { label: 'Location', value: 'San Francisco, California' },
                { label: 'Focus', value: 'Agent frameworks, LLM infrastructure, Platform engineering' },
                { label: 'Status', value: 'Open to conversations' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 border-b border-white/5 pb-4">
                  <span className="w-24 flex-none text-xs text-white/25 uppercase tracking-wider">{item.label}</span>
                  <span className="text-xs text-white/60">{item.value}</span>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Right: bio paragraphs */}
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-white/60 md:text-xl">
              I'm an AI engineer and technical lead at Visa's VAS Innovation Labs, where I build
              the infrastructure that helps <span className="text-white">4,000+ engineers</span> adopt
              AI at scale — from agent frameworks to fine-tuning pipelines to migration systems.
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/40">
              My work sits at the intersection of AI research and production systems. I care about
              making powerful technology{' '}
              <span className="text-white/70">actually usable</span> — abstracting away complexity
              so teams can focus on building instead of debugging infrastructure.
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/40">
              Before joining Visa I was deep in ML research — knowledge distillation, retrieval-augmented
              generation, and distributed training. That research background shapes how I approach
              every production system: understand the fundamentals, then build something that lasts.
            </p>

            {/* Highlights */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { n: '10M+', label: 'Lines migrated with AI' },
                { n: '4,000+', label: 'Engineers on agent platform' },
                { n: '20+', label: 'Teams using fine-tune CLI' },
                { n: '3×', label: 'Faster deployment velocity' },
              ].map((s) => (
                <HighlightStat key={s.label} label={s.label} value={s.n} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Work ───────────────────────────────────────────────────────────────────────

function Work() {
  const allProjects = [featuredProject, ...supportingProjects]
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative z-10 border-t border-white/5 py-28" id="work">
      <div className="mx-auto max-w-6xl px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f97316]">
            Selected work
          </p>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black uppercase leading-none tracking-tight text-white">
            Projects
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-white/5">
          {allProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.05}>
              <motion.div
                className="flex cursor-default flex-col gap-4 py-8 transition-all duration-300 md:flex-row md:items-start md:gap-10"
                style={{ opacity: hovered !== null && hovered !== i ? 0.3 : 1 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Index */}
                <span className="w-8 flex-none pt-1 text-xs font-semibold text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-lg font-bold text-white md:text-xl">{project.title}</h3>
                    <span className="text-xs text-white/25">{project.period}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[#f97316]/60">
                    {project.role}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
                    {project.description}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/60">
                    → {project.result}
                  </p>
                </div>

                {/* Tags + link */}
                <div className="flex flex-col gap-3 md:w-52 md:flex-none md:items-end">
                  <div className="flex flex-wrap gap-1.5 md:justify-end">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/35"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#f97316]/50 transition hover:text-[#f97316]"
                    >
                      GitHub <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Experience ────────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section className="relative z-10 border-t border-white/5 py-28" id="experience">
      <div className="mx-auto max-w-6xl px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f97316]">
            Career
          </p>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black uppercase leading-none tracking-tight text-white">
            Experience
          </h2>
        </Reveal>

        <div className="mt-14 space-y-14">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.08}>
              <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                <div className="text-xs text-white/25 md:pt-1 md:text-right">{exp.period}</div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                    {exp.company}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">{exp.role}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">{exp.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-white/40">
                        <span className="mt-[7px] h-[3px] w-4 flex-none rounded-full bg-[#f97316]/40" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skills / focus */}
        <Reveal delay={0.1} className="mt-20">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/20">
            Technical Focus
          </p>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area, i) => (
              <motion.span
                key={area.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.04 }}
                className="rounded-full border border-white/8 px-4 py-2 text-xs text-white/35 transition hover:border-[#f97316]/30 hover:text-[#f97316]"
              >
                {area.label}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Writing ───────────────────────────────────────────────────────────────────

function Writing() {
  return (
    <section className="relative z-10 border-t border-white/5 py-28" id="writing">
      <div className="mx-auto max-w-6xl px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f97316]">
            Writing
          </p>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black uppercase leading-none tracking-tight text-white">
            Field Notes
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/35">
            Notes on AI infrastructure, enterprise systems, and building at scale.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-white/5">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.07}>
              <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-8 py-7"
              >
                <div className="flex items-start gap-6">
                  <span className="mt-1 w-10 flex-none text-xs font-semibold text-white/20">
                    {article.year}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white/75 transition-colors group-hover:text-white">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/30">{article.description}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="flex-none text-white/12 transition group-hover:text-[#f97316]"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact (compact) ─────────────────────────────────────────────────────────

function Contact() {
  return (
    <section className="relative z-10 border-t border-white/5 py-20" id="contact">
      <div className="mx-auto max-w-6xl px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f97316]">
              Contact
            </p>
            <h2 className="mt-3 text-[clamp(24px,3.5vw,44px)] font-black uppercase leading-none tracking-tight text-white">
              Let's talk
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/35">
              Open to conversations about AI infrastructure, agent frameworks, platform
              engineering, and collaboration opportunities.
            </p>
          </Reveal>

          {/* Compact links */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-2">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noreferrer' : undefined}
                  className="group flex items-center justify-between gap-8 rounded-lg border border-white/5 bg-white/[0.02] px-5 py-3 text-sm transition hover:border-[#f97316]/20 hover:bg-white/[0.04]"
                >
                  <span className="w-20 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25 group-hover:text-[#f97316]/60">
                    {method.label}
                  </span>
                  <span className="flex-1 text-sm text-white/50 group-hover:text-white/70">
                    {method.description}
                  </span>
                  <ArrowUpRight size={14} className="text-white/15 group-hover:text-[#f97316]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-7">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 text-[11px] uppercase tracking-[0.22em] text-white/15">
        <span>© {new Date().getFullYear()} Jaiydev Gupta</span>
        <span>San Francisco, CA</span>
      </div>
    </footer>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage(): JSX.Element {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#0a0908] font-geist text-[#ede8e3] antialiased">
      <AnimatePresence>
        {!entered && <LoadingScreen key="loader" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {/* Persistent particle background */}
      <ParticleCanvas />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Nav />
        <Hero />
        <About />
        <Work />
        <Experience />
        <Writing />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  )
}
