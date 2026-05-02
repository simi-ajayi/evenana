import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartBadge } from '../cart/CartBadge'

export function LandingHeader() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/products', label: 'Products' },
    { href: '/gift-cards', label: 'Gift Cards' },
    { href: '/appointments', label: 'Appointments' },
  ]

  const isLinkActive = (href) => {
    if (href === '/appointments') {
      return location.pathname === '/appointments' || location.pathname === '/bookings'
    }
    if (href === '/services') {
      return location.pathname === '/services' || location.pathname === '/treatments' || location.pathname.startsWith('/treatments/')
    }
    return location.pathname === href
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center -my-2 shrink-0">
            <img src="/evenana-logo.jpg" alt="Evenana Wellness & Spa" className="h-12 w-auto md:h-14" />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--foreground)] uppercase tracking-wide md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className={`transition-colors hover:text-[var(--accent)] ${isLinkActive(href) ? 'text-[var(--accent)] font-semibold' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] uppercase tracking-wide transition-colors hover:text-[var(--accent)]"
            >
              <span className="relative inline-flex">
                <CartIcon />
                <CartBadge />
              </span>
              <span>Cart</span>
            </Link>
            <Link
              to="/appointments"
              onClick={() => setMenuOpen(false)}
              className="bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-white uppercase tracking-wide transition-colors hover:bg-[var(--accent-hover)]"
            >
              Book now
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative flex items-center text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              aria-label="Cart"
            >
              <CartIcon />
              <CartBadge />
            </Link>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-sm transition-colors hover:text-[var(--accent)] focus:outline-none"
            >
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}
              />
              <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed left-0 right-0 top-[57px] z-40 bg-white shadow-lg transition-all duration-300 md:hidden ${
          menuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col border-t border-[var(--border)]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={`border-b border-[var(--border)] px-6 py-4 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-[var(--accent)]/5 hover:text-[var(--accent)] ${
                isLinkActive(href) ? 'text-[var(--accent)] font-semibold bg-[var(--accent)]/5' : 'text-[var(--foreground)]'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="px-6 py-5">
            <Link
              to="/appointments"
              onClick={() => setMenuOpen(false)}
              className="block w-full bg-[var(--accent)] py-3 text-center text-sm font-semibold text-white uppercase tracking-wide transition-colors hover:bg-[var(--accent-hover)]"
            >
              Book now
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
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
