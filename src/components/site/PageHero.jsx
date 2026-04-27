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

export function PageHero({ hero }) {
  const [titleLead, titleAccent] = splitTitle(hero?.title)
  const primaryCta = hero?.primaryCta ?? { to: '/bookings', label: 'Book Appointment' }
  const secondaryCta = hero?.secondaryCta ?? { to: '/treatments', label: 'Explore Treatments' }

  return (
    <section
      data-ani-section
      className="relative h-[95vh] overflow-hidden border border-[#d6cdc1] bg-[#233125] text-[#f4efe6] md:rounded-4xl"
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
      <div className="relative z-10 flex h-full flex-col justify-between px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-28 lg:px-7 lg:pb-7 lg:pt-32">
    

        <div className="flex h-full flex-col justify-end gap-6 px-2 pb-20 pt-8 md:flex-row md:items-end md:justify-between md:px-10 md:pt-0">
          <div className=''>
            <h1 className="text-[clamp(3.25rem,8vw,7.5rem)] md:text-left text-center leading-[0.91] text-[#f5f1e8]">
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
                className="max-w-[30rem] text-center md:text-left text-[0.9rem] leading-[1.6] text-[#eee7db]/92 sm:text-[1.35rem]"
              >
                {hero.description}
              </p>
            ) : null}

            <div className="mt-8 justify-center flex flex-wrap items-center gap-3">
              <Link data-hero-cta to={primaryCta.to}>
                <div className="rounded-full bg-[#f4efe6] px-7 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-[#172017] transition hover:-translate-y-0.5 hover:bg-white">
                  {primaryCta.label}
                </div>{" "}
              </Link>
              <Link data-hero-cta to={secondaryCta.to}>
                <div className="rounded-full border border-[#f4eee2]/50 px-7 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-[#f0e8dc] transition hover:bg-[#f4eee2]/10">
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
