import { Link } from 'react-router-dom'
import footerWordmark from '../../assets/evenanawhitefull.png'
import spa04 from '../../assets/spa/spa-04.jpg'
import { navRoutes } from '../../data/site/navRoutes'
import { FadeIn } from '../site/FadeIn'

const footerRoutes = [{ path: '/', label: 'Home', key: 'home' }, ...navRoutes, { path: '/bookings', label: 'Booking', key: 'booking' }]

export function SiteFooter() {
  return (
    <FadeIn as="footer" className="relative mt-4 w-full overflow-hidden border-t border-[#5c4671] bg-[#3d2b4f] text-[#e9def3]" duration={0.4}>
      <img
        src={spa04}
        alt="Aromatherapy"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] gap-8 px-4 py-9 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <section>
          <img
            src={footerWordmark}
            alt="Evenana"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-20 w-auto"
          />
          <p className="mt-2 max-w-[17rem] text-[0.74rem] leading-[1.7] text-[#d1c2e1]">
            Personalized spa experiences with premium care and intentional rituals for body, skin, and mind.
          </p>
        </section>

        <section>
          <p className="text-[0.74rem] uppercase tracking-[0.15em] text-[#d0c0df]">Company</p>
          <ul className="mt-3 space-y-2 text-[0.83rem] text-[#e9def3]">
            {footerRoutes.map((route) => (
              <li key={route.key}>
                <Link to={route.path} className="transition hover:text-white">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-[0.74rem] uppercase tracking-[0.15em] text-[#d0c0df]">Contact</p>
          <ul className="mt-3 space-y-2 text-[0.83rem] text-[#e9def3]">
            <li>Phone: +1 (555) 216-4202</li>
            <li>Email: hello@evenana.com</li>
            <li>11 Wellness Avenue, Lagos</li>
          </ul>
        </section>

        <section>
          <p className="text-[0.74rem] uppercase tracking-[0.15em] text-[#d0c0df]">Policy</p>
          <ul className="mt-3 space-y-2 text-[0.83rem] text-[#e9def3]">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cancellation</li>
          </ul>
        </section>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1220px] border-t border-[#7a6790] px-4 py-3 text-[0.71rem] uppercase tracking-[0.12em] text-[#beafd2] sm:px-6 lg:px-8">
        © Copyright 2026. All rights reserved by EVENANA
      </div>
    </FadeIn>
  )
}
