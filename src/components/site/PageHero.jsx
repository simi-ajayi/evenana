import heroImage from '../../assets/hero.webp'
import { TopNav } from '../navigation/TopNav'
import { Link } from 'react-router-dom'

function splitTitle(title = '') {
  const normalized = title.trim()
  if (!normalized) {
    return ['Restore Body', 'And Mind']
  }

  const words = normalized.split(/\s+/)
  if (words.length < 3) {
    return [normalized, '']
  }

  const pivot = Math.ceil(words.length / 2)
  return [words.slice(0, pivot).join(' '), words.slice(pivot).join(' ')]
}

export function PageHero({
  hero,
  heightClass = 'h-[95vh]',
  compact = false,
  allowOverflow = false,
}) {
  const [titleLead, titleAccent] = splitTitle(hero?.title)
  const primaryCta = hero?.primaryCta ?? { to: '/bookings', label: 'Book Appointment' }
  const secondaryCta = hero?.secondaryCta ?? { to: '/treatments', label: 'Explore Treatments' }
  const sectionOverflowClass = allowOverflow
    ? 'overflow-x-hidden overflow-y-hidden md:overflow-y-visible'
    : 'overflow-hidden'
  const sectionMinHeightClass = compact ? 'min-h-[440px] sm:min-h-[500px] md:min-h-[420px]' : ''
  const heroTitleClass = compact
    ? "text-[clamp(1.9rem,9vw,3.8rem)] text-center leading-[0.98] text-[#f5f1e8] md:text-left"
    : "text-[clamp(3.25rem,8vw,7.5rem)] md:text-left text-center leading-[0.91] text-[#f5f1e8]";
  const heroCopyClass = compact
    ? 'max-w-[34rem] text-center text-[0.86rem] leading-[1.45] text-[#eadff4]/92 sm:text-[0.95rem] md:text-left'
    : 'max-w-[30rem] text-center md:text-left text-[0.9rem] leading-[1.6] text-[#eadff4]/92 sm:text-[1.35rem]'
  const heroCtaClass = compact
    ? 'rounded-full bg-[#f7f2fc] px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#4f365f] transition hover:-translate-y-0.5 hover:bg-white'
    : 'rounded-full bg-[#f7f2fc] px-7 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-[#4f365f] transition hover:-translate-y-0.5 hover:bg-white'
  const heroSecondaryCtaClass = compact
    ? 'rounded-full border border-[#f1e8f8]/50 px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ece0f6] transition hover:bg-[#f1e8f8]/10'
    : 'rounded-full border border-[#f1e8f8]/50 px-7 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-[#ece0f6] transition hover:bg-[#f1e8f8]/10'

  return (
    <section
      data-ani-section
      className={`relative w-full max-w-full ${heightClass} ${sectionMinHeightClass} ${sectionOverflowClass} border border-[#dacdea] bg-[#5a3d72] text-[#f7f2fc] md:rounded-4xl`}
    >
      <img
        data-ani-image
        data-ani-hero-image
        src={hero?.image || heroImage}
        alt={hero?.title || "Evenana"}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        data-hero-overlay
        className="absolute inset-0 bg-[linear-gradient(104deg,rgba(7,15,10,0.88)_18%,rgba(7,15,10,0.48)_52%,rgba(7,15,10,0.84)_100%)]"
      />

      <TopNav />
      <div className={`relative z-10 flex h-full flex-col justify-between ${compact ? 'px-4 pb-4 pt-[5.2rem] sm:px-6 sm:pb-5 sm:pt-[5.4rem] lg:px-7 lg:pb-6 lg:pt-[5.8rem]' : 'px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-28 lg:px-7 lg:pb-7 lg:pt-32'}`}>
    

        <div className={`flex flex-1 flex-col justify-end ${compact ? 'gap-4 px-1 pb-4 pt-4 md:px-6 md:pb-4' : 'gap-6 px-2 pb-20 pt-8 md:px-10 md:pt-0'} md:flex-row md:items-end md:justify-between`}>
          <div className=''>
            <h1 className={heroTitleClass}>
              <span data-hero-title-line className="block">
                {titleLead}
              </span>
              {titleAccent ? (
                <span data-hero-title-line className="block font-serif italic">
                  {titleAccent}
                </span>
              ) : null}
            </h1>
          </div>

          <div className="pb-2 md:pb-8">
            {hero?.description ? (
              <p
                data-hero-copy
                className={heroCopyClass}
              >
                {hero.description}
              </p>
            ) : null}

            <div className={`${compact ? 'mt-4' : 'mt-8'} flex flex-wrap items-center justify-center gap-3`}>
              <Link data-hero-cta to={primaryCta.to}>
                <div className={heroCtaClass}>
                  {primaryCta.label}
                </div>{" "}
              </Link>
              <Link data-hero-cta to={secondaryCta.to}>
                <div className={heroSecondaryCtaClass}>
                  {secondaryCta.label}
                </div>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
