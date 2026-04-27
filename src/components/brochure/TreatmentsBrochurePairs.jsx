import { Link } from 'react-router-dom'
import { FadeIn } from '../site/FadeIn'

const sectionLabelByLeadSlug = {
  facials: 'Wildsmith Facials',
  'chemical-peels': 'Skin Renewal Treatments',
  electrocautery: 'Precision & IV Therapy',
  'injectables-advanced': 'Advanced Aesthetics',
  'massage-therapy': 'Massage, Waxing & Artistry',
}

function groupInPairs(items) {
  const grouped = []

  for (let index = 0; index < items.length; index += 2) {
    grouped.push(items.slice(index, index + 2))
  }

  return grouped
}

function TreatmentBrochureItem({ service }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[1.2rem] border border-[#d7ccbc] bg-[#fbf8f3] p-4">
      <Link to={`/treatments/${service.slug}`} className="group block overflow-hidden rounded-[1rem]">
        <img
          src={service.image}
          alt={service.title}
          className="h-[16rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-[18rem]"
          loading="lazy"
        />
      </Link>

      <h3 className="text-[1.6rem] leading-[1.06] text-[#171c16]">{service.title}</h3>

      <p className="text-[0.9rem] leading-[1.6] text-[#4f4a41]">{service.intro}</p>

      <div className="pt-1">
        <Link
          to={`/treatments/${service.slug}`}
          className="inline-flex items-center justify-center rounded-full border border-[#1f281f] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#1f281f] transition hover:bg-[#1f281f] hover:text-[#f7f1e6]"
        >
          Reserve
        </Link>
      </div>
    </article>
  )
}

export function TreatmentsBrochurePairs({ services = [] }) {
  const servicePairs = groupInPairs(services)

  return (
    <section className="space-y-6 md:space-y-7">
      {servicePairs.map((pair, pairIndex) => (
        <FadeIn
          key={pair[0]?.slug ?? pairIndex}
          as="section"
          className="space-y-5 rounded-[1.6rem] border border-[#d9d0c3] bg-[#f8f5ef] p-5 sm:p-7"
          delay={0.04 + pairIndex * 0.04}
          duration={0.35}
          triggerOnScroll={false}
          fade={false}
          scaleFrom={1}
        >
          <div className="space-y-1 text-center">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">Treatments</p>
            <h3 className="text-[1.65rem] leading-[1.04] text-[#171c16] sm:text-[1.95rem]">
              {sectionLabelByLeadSlug[pair[0]?.slug] ?? pair[0]?.title}
            </h3>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {pair.map((service) => (
              <TreatmentBrochureItem key={service.slug} service={service} />
            ))}

            {pair.length === 1 ? <div className="hidden md:block" aria-hidden /> : null}
          </div>
        </FadeIn>
      ))}
    </section>
  )
}
