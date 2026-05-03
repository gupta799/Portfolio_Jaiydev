import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
]

export default function Navigation(): JSX.Element {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 text-sm">
      <Link
        to="/"
        className="text-sm font-semibold tracking-tight text-slate-900 transition-colors hover:text-slate-600"
      >
        Jaiydev Gupta
      </Link>

      <ul className="flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href} className="group relative">
            <Link
              to={link.href}
              className="py-1 font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 rounded-full bg-slate-400 transition-all duration-250 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
