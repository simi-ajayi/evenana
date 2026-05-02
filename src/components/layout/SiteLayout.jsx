import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { FadeIn } from '../site/FadeIn'

export function SiteLayout() {
  const location = useLocation()
  const isLandingCommerceRoute =
    location.pathname === '/bookings' ||
    location.pathname === '/appointments' ||
    location.pathname === '/products' ||
    location.pathname === '/cart' ||
    location.pathname === '/gift-cards' ||
    location.pathname === '/payment/callback'

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

  return (
    <div className={isLandingCommerceRoute ? 'min-h-screen bg-white text-gray-900' : 'min-h-screen bg-[#f2edf7] text-[#1f1827] transition-colors'}>
      {isLandingCommerceRoute ? (
        <main className="mx-auto w-full">
          <Outlet />
        </main>
      ) : (
        <FadeIn
          as="main"
          key={location.pathname}
          className="mx-auto w-full"
          duration={0.42}
          delay={0.03}
          scaleFrom={1}
          triggerOnScroll={false}
          fade={false}
        >
          <Outlet />
        </FadeIn>
      )}
      {isLandingCommerceRoute ? null : <SiteFooter />}
    </div>
  )
}
