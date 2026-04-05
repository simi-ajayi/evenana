import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navRoutes } from '../../data/site/navRoutes'
import { FadeIn } from '../site/FadeIn'
import Logo from '../../assets/clearlogo.png'

const navTextClass = 'font-body text-[1.2rem] uppercase tracking-[0.06rem]'
const containerClass = 'mx-auto w-full max-w-[1440px] px-4 md:px-8'
const bookButtonClassTransparent =
  'md:inline-flex hidden items-center justify-center border border-primary-contrast px-4 py-2 font-body text-[1.2rem] uppercase tracking-[0.06rem] text-primary-contrast transition-colors hover:bg-transparent hover:text-primary-contrast'
const bookButtonClassScrolled =
  'md:inline-flex hidden items-center justify-center border border-primary bg-transparent px-4 py-2 font-body text-[1.2rem] uppercase tracking-[0.06rem] text-primary transition-colors hover:bg-primary hover:text-primary-contrast'

function NavItem({ to, label, isSolidBackground, onSelect, className = '' }) {
  const activeTextClass = isSolidBackground ? 'text-primary' : 'text-primary-contrast'
  const inactiveTextClass = isSolidBackground
    ? 'text-primary/72 hover:text-primary'
    : 'text-primary-contrast/72 hover:text-primary-contrast'

  return (
    <NavLink
      to={to}
      onClick={onSelect}
      className={({ isActive }) =>
        [navTextClass, className, isActive ? activeTextClass : inactiveTextClass]
          .filter(Boolean)
          .join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const hasSolidBackground = isScrolled || isMenuOpen
  const bookButtonClass = hasSolidBackground ? bookButtonClassScrolled : bookButtonClassTransparent
  const headerTextClass = hasSolidBackground ? 'text-primary' : 'text-primary-contrast'
  const headerBorderClass = hasSolidBackground ? 'border-primary/20' : 'border-transparent'
  const topRowBorderClass = hasSolidBackground ? 'border-primary/20' : 'border-primary-contrast'
  const menuButtonClass = hasSolidBackground
    ? 'border-primary/30 hover:bg-primary/5'
    : 'border-primary-contrast/60 hover:bg-primary-contrast/10'

  return (
    <FadeIn
      as="header"
      className={[
        'fixed left-1/2 top-4 z-50 w-[92%] -translate-x-1/2 border-b transition-colors md:w-[90%]',
        headerBorderClass,
        hasSolidBackground ? 'bg-white dark:bg-bg' : 'bg-transparent',
        headerTextClass,
      ].join(' ')}
      duration={0.2}
    >
      <div className={`${containerClass} py-4 md:py-5`}>
        <div
          className={[
            'flex items-center justify-between gap-4 border-b pb-3',
            topRowBorderClass,
          ].join(' ')}
        >
          <div className="flex items-center gap-4">
            <NavLink to="/" className="inline-flex items-center" onClick={() => setIsMenuOpen(false)}>
              <img src={Logo} alt="EVENANA" className="h-36 w-36 sm:h-12 md:h-48 md:w-48 mt-4 absolute" />
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/treatments"
              className={`${bookButtonClass} hidden md:inline-flex`}
              onClick={() => setIsMenuOpen(false)}
            >
              Book now
            </NavLink>
            <button
              type="button"
              aria-controls="topnav-mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={[
                'flex h-10 w-10 flex-col items-center justify-center gap-1.5 border transition-colors md:hidden',
                menuButtonClass,
              ].join(' ')}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
              <span
                className={[
                  'h-px w-5 bg-current transition-transform duration-300',
                  isMenuOpen ? 'translate-y-[3px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'h-px w-5 bg-current transition-transform duration-300',
                  isMenuOpen ? '-translate-y-[3px] -rotate-45' : '',
                ].join(' ')}
              />
            </button>
          </div>
        </div>

        <nav
          id="topnav-mobile-menu"
          className={[
            'overflow-hidden transition-[max-height,opacity,padding] duration-300 md:hidden',
            isMenuOpen ? 'max-h-[28rem] pt-3 opacity-100' : 'pointer-events-none max-h-0 pt-0 opacity-0',
          ].join(' ')}
        >
          <div className="flex flex-col items-start gap-3 pb-2">
            {navRoutes.map((route) => (
              <NavItem
                key={route.path}
                to={route.path}
                label={route.label}
                isSolidBackground={hasSolidBackground}
                onSelect={() => setIsMenuOpen(false)}
                className="block w-full py-1"
              />
            ))}
            <NavLink to="/treatments" className={`${bookButtonClass} mt-2 w-full`} onClick={() => setIsMenuOpen(false)}>
              Book now
            </NavLink>
          </div>
        </nav>

        <nav
          className={[
            'mx-auto hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 md:flex',
            hasSolidBackground ? 'text-primary' : 'text-primary-contrast',
          ].join(' ')}
        >
          {navRoutes.map((route) => (
            <NavItem
              key={route.path}
              to={route.path}
              label={route.label}
              isSolidBackground={hasSolidBackground}
            />
          ))}
        </nav>
      </div>
    </FadeIn>
  )
}
