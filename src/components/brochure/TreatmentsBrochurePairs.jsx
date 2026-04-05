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
    <article className="content-start justify-between flex flex-col gap-4  bg-surface p-4 md:p-5">
      <Link to={`/treatments/${service.slug}`} className="group block overflow-hidden bg-surface">
        <img
          src={service.image}
          alt={service.title}
          className="h-[18rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-[20rem]"
          loading="lazy"
        />
      </Link>

      <h3 className="font-display text-4xl leading-[0.95] text-text">
        {service.title}
      </h3>

      <p className="max-w-[64ch] text-lg leading-[2.8rem] text-muted">
        {service.intro}
      </p>

      <div className="pt-1">
        <Link
          to={`/treatments/${service.slug}`}
          className="inline-flex items-center justify-center border border-border px-6 py-3 font-body text-[1.2rem] uppercase tracking-[0.08rem] text-text transition-colors hover:border-primary hover:text-primary"
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
    <section className="space-y-[5.5rem] md:space-y-[7rem]">
      {servicePairs.map((pair, pairIndex) => (
        <FadeIn
          key={pair[0]?.slug ?? pairIndex}
          as="section"
          className="space-y-8 bg-surface px-40 py-10 md:space-y-10"
          delay={0.04 + pairIndex * 0.04}
          duration={0.38}
          triggerOnScroll={false}
          fade={false}
          scaleFrom={1}
        >
          <div className="space-y-2 bg-surface">
            <p className="font-body text-[1.2rem] uppercase text-center tracking-[0.12rem] text-primary">
              Treatments
            </p>
            <h3 className="font-display text-4xl text-center leading-[0.95] text-text">
              {sectionLabelByLeadSlug[pair[0]?.slug] ?? pair[0]?.title}
            </h3>
          </div>
          <div className="grid  gap-8 md:grid-cols-2 md:gap-10">
            {pair.map((service) => (
              <TreatmentBrochureItem key={service.slug} service={service} />
            ))}

            {pair.length === 1 ? (
              <div className="hidden md:block" aria-hidden />
            ) : null}
          </div>
        </FadeIn>
      ))}
    </section>
  );
}
