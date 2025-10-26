import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
]

function Navigation(): JSX.Element {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
      <Link to="/" className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-900 transition hover:text-slate-700">
        Jaiydev Gupta
      </Link>
      <ul className="flex flex-wrap items-center gap-4 md:gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              className="transition duration-150 hover:text-slate-900 focus-visible:text-slate-900"
              to={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
