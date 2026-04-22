import { Link } from 'react-router-dom'
import { navRoutes } from '../../data/site/navRoutes'
import { FadeIn } from '../site/FadeIn'

export function SiteFooter() {
  return (
    <FadeIn as="footer" className="mt-10 border-t w-full border-border bg-surface" duration={0.5} delay={0.05}>
      <div className="grid w-full gap-8 px-4 py-10 md:grid-cols-3 md:gap-10 md:px-8 md:py-14">
        <section className="space-y-3">
          <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Contact us</p>
          <h2 className="font-display text-[2rem] leading-[0.96] text-text">EVENANA MedSpa</h2>
          <p className="text-[1rem] text-muted">+44 (0) 20 7321 3050</p>
          <p className="text-[1.7rem] text-muted"></p>
          <p className="text-[1.7rem] text-muted"></p>
        </section>

        <section className="space-y-3">
          <p className=" text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Opening hours</p>
          <div className="space-y-2 text-[1.2rem] text-muted">
            <p>Spa: 7:00am - 9:00pm</p>
            <p>Treatments: 10:00am - 8:00pm</p>
            <p>Gym: Accessible 24/7 for guests</p>
          </div>
        </section>

        <section className="space-y-3">
          <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Explore</p>
          <div className="grid gap-2 text-[1.2rem] text-muted">
            <Link to="/" className=" transition-colors hover:text-primary">
              Home
            </Link>
            {navRoutes.map((route) => (
              <Link key={route.path} to={route.path} className=" transition-colors hover:text-primary">
                {route.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </FadeIn>
  )
}
