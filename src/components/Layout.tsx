import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'

function Layout(): JSX.Element {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`relative min-h-screen ${isHome ? 'bg-[#0a0908] text-[#ede8e3]' : 'bg-white text-slate-900'}`}>
      <div className="relative flex min-h-screen flex-col">
        {!isHome && (
          <header className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-6 md:px-8">
              <Navigation />
            </div>
          </header>
        )}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
        {!isHome && <SiteFooter />}
      </div>
    </div>
  )
}

export default Layout
