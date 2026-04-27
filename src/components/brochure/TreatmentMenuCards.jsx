import { FadeIn } from '../site/FadeIn'
import { primaryButton } from '../site/buttonStyles'

function DetailRow({ label, value }) {
  if (!value) {
    return null
  }

  return (
    <p className="text-[0.82rem] leading-[1.55] text-[#4f4a41]">
      <span className="uppercase tracking-[0.05rem] text-[#1f281f]">{label}: </span>
      {value}
    </p>
  )
}

export function TreatmentMenuCards({ title, intro, treatments = [] }) {
  return (
    <FadeIn as="section" className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0" duration={0.45}>
      <div className="rounded-[1.6rem] border border-[#d9d0c3] bg-[#f8f5ef] p-5 sm:p-7">
        <div className="space-y-2">
          <h2 className="text-[1.85rem] leading-[1.04] text-[#171c16] sm:text-[2.2rem]">{title}</h2>
          {intro ? <p className="max-w-[54rem] text-[0.88rem] leading-[1.6] text-[#4f4a41]">{intro}</p> : null}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {treatments.map((t, i) => (
            <FadeIn key={t.id} as="article" delay={0.04 + i * 0.03} duration={0.32}>
              <div className="flex h-full flex-col gap-3 rounded-xl border border-[#d7ccbc] bg-[#fdfaf4] p-4 hover:border-[#b39570]">
                <h3 className="text-[1.18rem] leading-tight text-[#171c16]">{t.title}</h3>

                {t.subtitle ? (
                  <p className="text-[0.65rem] uppercase tracking-[0.12rem] text-[#8f7658]">{t.subtitle}</p>
                ) : null}

                <p className="text-[0.84rem] leading-[1.58] text-[#4f4a41]">{t.description}</p>

                <DetailRow label="Best for" value={t.bestFor} />
                <DetailRow label="What to expect" value={t.whatToExpect} />
                <DetailRow label="Frequency" value={t.frequency} />

                <div className="mt-auto flex justify-between gap-4 border-t border-[#d9cfbe] pt-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.08rem] text-[#6f675a]">Booking</p>
                    <p className="text-[0.86rem] leading-tight text-[#1f281f]">Online Reservation</p>
                  </div>
                  <a href={t.bookingUrl} className={primaryButton}>
                    {t.bookingLabel}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
