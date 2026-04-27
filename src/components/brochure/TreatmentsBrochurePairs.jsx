import { Link } from 'react-router-dom'
import { Masonry } from 'antd'

const sectionLabelByLeadSlug = {
  facials: 'Wildsmith Facials',
  'chemical-peels': 'Skin Renewal Treatments',
  electrocautery: 'Precision & IV Therapy',
  'injectables-advanced': 'Advanced Aesthetics',
  'massage-therapy': 'Massage, Waxing & Artistry',
}

function TreatmentBrochureItem({ service }) {
  return (
    <article
      data-float
      className="flex h-full flex-col gap-4 rounded-[1.35rem] bg-[#f9f3ff] p-4 shadow-[0_16px_36px_-30px_rgba(24,30,22,0.56)]"
    >
      <Link to={`/treatments/${service.slug}`} className="group block overflow-hidden rounded-[1rem]">
        <img
          data-ani-image
          src={service.image}
          alt={service.title}
          className="h-[16rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-[18rem]"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </Link>

      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[#6f6557]">
        {sectionLabelByLeadSlug[service.slug] ?? 'Treatment'}
      </p>
      <h3 data-ani-heading className="text-[1.6rem] leading-[1.06] text-[#171c16]">
        {service.title}
      </h3>

      <p data-ani-copy className="text-[0.9rem] leading-[1.6] text-[#4f4a41]">
        {service.intro}
      </p>

      <div className="pt-1">
        <Link
          to={`/treatments/${service.slug}`}
          className="inline-flex items-center justify-center rounded-full bg-[#6e4d87] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#f8f3fc] transition hover:bg-[#5c3f73]"
        >
          Reserve
        </Link>
      </div>
    </article>
  )
}

export function TreatmentsBrochurePairs({ services = [] }) {
  const items = services.map((service) => ({
    key: service.slug,
    children: <TreatmentBrochureItem service={service} />,
  }))

  return (
    <section data-ani-section className="space-y-5 rounded-[1.6rem] bg-[#eee4f7] p-4 shadow-[0_22px_44px_-36px_rgba(17,23,16,0.62)] sm:p-6">
      <div className="space-y-1 text-center">
        <p data-ani-copy className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">
          Treatments
        </p>
        <h3 data-ani-heading className="text-[1.65rem] leading-[1.04] text-[#171c16] sm:text-[1.95rem]">
          Browse The Full Treatment Menu
        </h3>
      </div>
      <Masonry
        fresh
        columns={{ xs: 1, sm: 2, lg: 3 }}
        gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
        items={items}
      />
    </section>
  )
}
