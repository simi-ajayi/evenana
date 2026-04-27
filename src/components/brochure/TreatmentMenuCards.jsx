import { Masonry } from 'antd'
import { primaryButton } from '../site/buttonStyles'

function DetailRow({ label, value }) {
  if (!value) {
    return null
  }

  return (
    <p data-ani-copy className="text-[0.82rem] leading-[1.55] text-[#4f4a41]">
      <span className="uppercase tracking-[0.05rem] text-[#1f281f]">{label}: </span>
      {value}
    </p>
  )
}

export function TreatmentMenuCards({ title, intro, treatments = [] }) {
  const treatmentItems = treatments.map((t, index) => ({
    key: t.id,
    children: (
      <article
        data-float={index % 3 === 0 ? 'true' : undefined}
        className="flex h-full flex-col gap-3 rounded-[1.25rem] bg-[#fdf9f2] p-4 shadow-[0_14px_30px_-28px_rgba(31,34,26,0.58)]"
      >
        <h3 data-ani-heading className="text-[1.18rem] leading-tight text-[#171c16]">
          {t.title}
        </h3>

        {t.subtitle ? (
          <p data-ani-copy className="text-[0.65rem] uppercase tracking-[0.12rem] text-[#8f7658]">
            {t.subtitle}
          </p>
        ) : null}

        <p data-ani-copy className="text-[0.84rem] leading-[1.58] text-[#4f4a41]">
          {t.description}
        </p>

        <DetailRow label="Best for" value={t.bestFor} />
        <DetailRow label="What to expect" value={t.whatToExpect} />
        <DetailRow label="Frequency" value={t.frequency} />

        <div className="mt-auto flex justify-between gap-4 pt-4">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.08rem] text-[#6f675a]">Booking</p>
            <p className="text-[0.86rem] leading-tight text-[#1f281f]">Online Reservation</p>
          </div>
          <a href={t.bookingUrl} className={primaryButton}>
            {t.bookingLabel}
          </a>
        </div>
      </article>
    ),
  }))

  return (
    <section data-ani-section className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
      <div className="rounded-[1.6rem] bg-[#f4eee1] p-5 shadow-[0_22px_42px_-34px_rgba(22,26,19,0.56)] sm:p-7">
        <div className="space-y-2">
          <h2 data-ani-heading className="text-[1.85rem] leading-[1.04] text-[#171c16] sm:text-[2.2rem]">
            {title}
          </h2>
          {intro ? (
            <p data-ani-copy className="max-w-[54rem] text-[0.88rem] leading-[1.6] text-[#4f4a41]">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="mt-6">
          <Masonry
            fresh
            columns={{ xs: 1, sm: 2, lg: 3 }}
            gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
            items={treatmentItems}
          />
        </div>
      </div>
    </section>
  )
}
