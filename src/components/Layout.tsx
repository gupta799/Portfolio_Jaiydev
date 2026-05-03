import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'

export default function Layout(): JSX.Element {
  const location = useLocation()

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-5 md:px-8">
          <Navigation />
        </div>
      </header>
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  )
}
