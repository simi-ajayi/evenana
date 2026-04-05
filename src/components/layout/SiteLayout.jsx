import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { TopNav } from '../navigation/TopNav'
import { FadeIn } from '../site/FadeIn'

function routeHasHeroBg(pathname) {
  const p = pathname?.replace(/\/+$/, '') || '/'
  return p === '/' || p === '/treatments' || p === '/day-spa' || p === '/wellbeing-spaces'
}

const HERO_NAV_REVEAL_DELAY_MS = 0.01

export function SiteLayout() {
  const location = useLocation()
  const [topNavVisible, setTopNavVisible] = useState(() => !routeHasHeroBg(location.pathname))
  const isHeroBgRoute = routeHasHeroBg(location.pathname)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const navigationEntry = performance.getEntriesByType('navigation')[0]
    const navigationType = navigationEntry?.type
    const isReload = navigationType === 'reload'

    if (!isReload) return

    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })
  }, [])

  useEffect(() => {
    const shouldWaitForHeroBg = routeHasHeroBg(location.pathname)

    if (!shouldWaitForHeroBg) {
      queueMicrotask(() => setTopNavVisible(true))
      return
    }

    queueMicrotask(() => setTopNavVisible(false))

    const timeoutId = window.setTimeout(() => {
      setTopNavVisible(true)
    }, HERO_NAV_REVEAL_DELAY_MS + 700)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname])

  useEffect(() => {
    const onHeroBgLoaded = (event) => {
      const pathnameFromEvent = event?.detail?.pathname
      if (pathnameFromEvent !== location.pathname) return
      setTopNavVisible(true)
    }

    window.addEventListener('evenana:hero-bg-loaded', onHeroBgLoaded)
    return () => window.removeEventListener('evenana:hero-bg-loaded', onHeroBgLoaded)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-bg mt-0 justify-center flex flex-col items-center text-text transition-colors">
      {topNavVisible ? <TopNav /> : null}
      <FadeIn
        as="main"
        key={location.pathname}
        className="mx-auto w-full "
        duration={0.45}
        delay={0.05}
        scaleFrom={isHeroBgRoute ? 1 : 0.96}
        triggerOnScroll={false}
        fade={false}
      >
        <Outlet />
      </FadeIn>
      <SiteFooter />
    </div>
  )
}
