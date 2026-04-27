import { Link } from 'react-router-dom'
import { primaryButton } from '../components/site/buttonStyles'
import { FadeIn } from '../components/site/FadeIn'

export function NotFoundPage() {
  return (
    <FadeIn
      as="section"
      className="mx-auto my-8 w-[min(94%,920px)] rounded-[1.6rem] border border-[#d9d0c3] bg-[#f8f5ef] p-8 text-center md:p-10"
      duration={0.4}
    >
      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">Route not found</p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.6rem)] leading-[0.96] text-[#171c16]">Page unavailable</h1>
      <p className="mt-4 text-[0.95rem] leading-[1.6] text-[#4f4a41]">
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
