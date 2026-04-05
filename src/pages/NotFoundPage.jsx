import { Link } from 'react-router-dom'
import { primaryButton } from '../components/site/buttonStyles'
import { FadeIn } from '../components/site/FadeIn'

export function NotFoundPage() {
  return (
    <FadeIn as="section" className="my-8 border border-border bg-surface p-8 text-center md:p-12" duration={0.4}>
      <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Route not found</p>
      <h1 className="mt-3 font-display text-[clamp(4rem,5.2vw,6.4rem)] leading-[0.94] text-text">
        Page unavailable
      </h1>
      <p className="mt-4 text-[1.8rem] text-muted">
        The page you requested does not exist in this spa site.
      </p>
      <div className="mt-6">
        <Link to="/" className={primaryButton}>
          Return home
        </Link>
      </div>
    </FadeIn>
  )
}
