import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
]

function Navigation(): JSX.Element {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Only apply dark-hero treatment on the homepage
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = isHomePage && !scrolled

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isDark ? 'rgba(10,10,15,0)' : 'rgba(255,255,255,0.92)',
        borderBottomColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(226,232,240,1)',
      }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-wrap items-center justify-between gap-4 text-sm border-b"
      style={{ backdropFilter: scrolled || !isHomePage ? 'blur(20px)' : 'none' }}
    >
      <Link
        to="/"
        className={`text-sm font-bold tracking-tight transition-all duration-300 ${
          isDark
            ? 'text-white hover:text-white/80'
            : 'text-slate-900 hover:text-slate-700'
        }`}
      >
        <span className={isDark ? 'text-white' : 'text-slate-900'}>Jaiydev</span>
        <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent"> Gupta</span>
      </Link>

      <ul className="flex flex-wrap items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href} className="relative group">
            <Link
              to={link.href}
              className={`relative py-1 font-medium transition-colors duration-200 ${
                isDark
                  ? 'text-white/70 hover:text-white'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {link.label}
              {/* Underline expands from center outward */}
              <span
                className={`absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full ${
                  isDark ? 'bg-white/50' : 'bg-slate-900/50'
                }`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

export default Navigation
