import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
]

export default function Navigation(): JSX.Element {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = isHome && !scrolled

  return (
    <motion.nav
      className="flex flex-wrap items-center justify-between gap-4 border-b text-sm"
      animate={{
        backgroundColor: isDark ? 'rgba(5,5,8,0)' : 'rgba(255,255,255,0.92)',
        borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(226,232,240,1)',
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{ backdropFilter: !isDark ? 'blur(20px)' : 'none' }}
    >
      <Link
        to="/"
        className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
          isDark ? 'text-white hover:text-white/80' : 'text-slate-900 hover:text-slate-600'
        }`}
      >
        Jaiydev Gupta
      </Link>

      <ul className="flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href} className="group relative">
            <Link
              to={link.href}
              className={`py-1 font-medium transition-colors duration-200 ${
                isDark ? 'text-white/55 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-250 group-hover:w-full rounded-full ${
                  isDark ? 'bg-white/40' : 'bg-slate-400'
                }`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
