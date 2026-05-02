import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/clearlogo.png'
import { navRoutes } from '../../data/site/navRoutes'
import brandWordmark from '../../assets/evenana_white_text.png'
import { CartBadge } from '../cart/CartBadge'


const navTextClass = 'font-body text-md uppercase tracking-[0.14em]'

function NavItem({ to, label, onSelect, isHeroTone, className = '' }) {
  const activeTextClass = isHeroTone ? 'text-[#f8f3fc]' : 'text-[#6e4d87]'
  const inactiveTextClass = isHeroTone ? 'text-[#f8f3fc]/78 hover:text-[#f8f3fc]' : 'text-[#6e4d87]/72 hover:text-[#6e4d87]'
  const activeUnderlineClass = isHeroTone ? 'after:bg-[#f8f3fc]' : 'after:bg-[#6e4d87]'

  return (
    <NavLink
      to={to}
      onClick={onSelect}
      className={({ isActive }) =>
        [
          navTextClass,
          'relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300',
          className,
          isActive ? `${activeTextClass} ${activeUnderlineClass} after:scale-x-100` : inactiveTextClass,
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export function TopNav({ tone = 'hero' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const routes = useMemo(() => [{ path: '/', label: 'Home', key: 'home' }, ...navRoutes], [])
  const isHeroTone = tone === 'hero'

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

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto w-full  px-4 md:px-7">
        <div
          className={[
            "flex items-center justify-between gap-4  py-4 md:py-5",
            isHeroTone
              ? "border-[#f8f3fc]/32 text-[#f8f3fc]"
              : "border-[#d1c3e3] text-[#6e4d87]",
          ].join(" ")}
        >
          <NavLink
            to="/"
            className="inline-flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Evenana"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-40 h-40 absolute mt-8"
            />
            <img
              data-ani-image
              src={brandWordmark}
              alt="Evenana"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-40 w-[50%] md:w-auto ml-30 mt-6 absolute"
            />
          </NavLink>

          <div className="hidden items-center gap-4 ml-52 md:flex lg:gap-5">
            {routes.map((route) => (
              <NavItem
                key={route.key}
                to={route.path}
                label={route.label}
                isHeroTone={isHeroTone}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/cart"
              className={[
                "relative hidden h-10 w-10 items-center justify-center rounded-full border transition-colors md:inline-flex",
                isHeroTone
                  ? "border-[#f8f3fc]/60 text-[#f8f3fc] hover:bg-[#f8f3fc]/14"
                  : "border-[#6e4d87]/30 text-[#6e4d87] hover:bg-[#6e4d87]/10",
              ].join(" ")}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Open cart"
            >
              <CartIcon />
              <CartBadge />
            </NavLink>

            <NavLink
              to="/bookings"
              className={[
                "hidden items-center justify-center rounded-full border px-5 py-2 text-md font-semibold uppercase tracking-[0.14em] transition-colors md:inline-flex",
                isHeroTone
                  ? "border-[#f8f3fc] bg-[#f8f3fc] text-[#6e4d87]! hover:bg-white"
                  : "border-[#6e4d87] bg-[#6e4d87] text-[#f8f3fc]! hover:bg-[#5c3f73]",
              ].join(" ")}
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </NavLink>

            <button
              type="button"
              aria-controls="topnav-mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className={[
                "flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors md:hidden",
                isHeroTone
                  ? "border-[#f8f3fc]/60 hover:bg-[#f8f3fc]/14"
                  : "border-[#6e4d87]/30 hover:bg-[#6e4d87]/10",
              ].join(" ")}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
              <span
                className={[
                  "h-px w-5 bg-current transition-transform duration-300",
                  isMenuOpen ? "translate-y-[3px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "h-px w-5 bg-current transition-transform duration-300",
                  isMenuOpen ? "-translate-y-[3px] -rotate-45" : "",
                ].join(" ")}
              />
            </button>

            <NavLink
              to="/cart"
              className={[
                "relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden",
                isHeroTone
                  ? "border-[#f8f3fc]/60 text-[#f8f3fc] hover:bg-[#f8f3fc]/14"
                  : "border-[#6e4d87]/30 text-[#6e4d87] hover:bg-[#6e4d87]/10",
              ].join(" ")}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Open cart"
            >
              <CartIcon />
              <CartBadge />
            </NavLink>
          </div>
        </div>

        <nav
          id="topnav-mobile-menu"
          className={[
            "overflow-hidden transition-[max-height,opacity,padding] duration-300 md:hidden",
            isMenuOpen
              ? "max-h-[28rem] pt-4 opacity-100"
              : "pointer-events-none max-h-0 pt-0 opacity-0",
          ].join(" ")}
        >
          <div className="grid gap-3 rounded-2xl border border-[#d9cbe8] bg-[#f6effb] p-4 text-[#6e4d87]">
            {routes.map((route) => (
              <NavItem
                key={route.key}
                to={route.path}
                label={route.label}
                isHeroTone={false}
                onSelect={() => setIsMenuOpen(false)}
                className="w-fit"
              />
            ))}
            <NavLink
              to="/cart"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#6e4d87] bg-transparent px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#6e4d87]! transition hover:bg-[#6e4d87]/10"
              onClick={() => setIsMenuOpen(false)}
            >
              View Cart
            </NavLink>
            <NavLink
              to="/bookings"
              className="mt-1 inline-flex w-full items-center justify-center rounded-full border border-[#6e4d87] bg-[#6e4d87] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#f8f3fc]! transition hover:bg-[#5c3f73]"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  )
}
