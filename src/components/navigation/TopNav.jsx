import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/clearlogo.png'
import { navRoutes } from '../../data/site/navRoutes'
import brandWordmark from "../../assets/evenana_white_text.png";


const navTextClass = 'font-body text-md uppercase tracking-[0.14em]'

function NavItem({ to, label, onSelect, isHeroTone, className = '' }) {
  const activeTextClass = isHeroTone ? 'text-[#f7f1e6]' : 'text-[#1f281f]'
  const inactiveTextClass = isHeroTone ? 'text-[#f7f1e6]/78 hover:text-[#f7f1e6]' : 'text-[#1f281f]/72 hover:text-[#1f281f]'
  const activeUnderlineClass = isHeroTone ? 'after:bg-[#f7f1e6]' : 'after:bg-[#1f281f]'

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
              ? "border-[#f7f1e6]/32 text-[#f7f1e6]"
              : "border-[#cfc4b2] text-[#1f281f]",
          ].join(" ")}
        >
          <NavLink
            to="/"
            className="inline-flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={logo} alt="Evenana" className="w-40 h-40 absolute mt-8" />
            <img
              data-ani-image
              src={brandWordmark}
              alt="Evenana"
              className="h-40 w-auto ml-30    absolute"
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
              to="/bookings"
              className={[
                "hidden items-center justify-center text-[#1f281f]! rounded-full border px-5 py-2 text-md font-semibold uppercase tracking-[0.14em] transition-colors md:inline-flex",
                isHeroTone
                  ? "border-[#f7f1e6] bg-[#f7f1e6]  hover:bg-white"
                  : "border-[#1f281f] bg-[#1f281f]  hover:bg-[#162016]",
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
                  ? "border-[#f7f1e6]/60 hover:bg-[#f7f1e6]/14"
                  : "border-[#1f281f]/30 hover:bg-[#1f281f]/10",
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
          <div className="grid gap-3 rounded-2xl border border-[#d8cdbd] bg-[#f8f4ec] p-4 text-[#1f281f]">
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
              to="/bookings"
              className="mt-1 inline-flex w-full items-center justify-center rounded-full border border-[#1f281f] bg-[#1f281f] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#f7f1e6] transition hover:bg-[#162016]"
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
