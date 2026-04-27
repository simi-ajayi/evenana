import { Link, Navigate, useParams } from 'react-router-dom'
import { BrochureTextBlock } from '../components/brochure/BrochureTextBlock'
import { TreatmentMenuCards } from '../components/brochure/TreatmentMenuCards'
import { primaryButton, secondaryButton } from '../components/site/buttonStyles'
import { FadeIn } from '../components/site/FadeIn'
import { getServiceContent, getServiceNeighbors } from '../lib/brochureParser'
import { TopNav } from '../components/navigation/TopNav'

function NeighborNav({ slug }) {
  const { previous, next } = getServiceNeighbors(slug)

  return (
    <FadeIn as="div" className="mx-auto mt-2 flex w-full max-w-[1220px] flex-wrap gap-3 px-3 sm:px-5 lg:px-0" duration={0.35}>
      {previous ? (
        <Link to={`/treatments/${previous.slug}`} className={secondaryButton}>
          Previous: {previous.navLabel}
        </Link>
      ) : null}
      {next ? (
        <Link to={`/treatments/${next.slug}`} className={secondaryButton}>
          Next: {next.navLabel}
        </Link>
      ) : null}
    </FadeIn>
  )
}

export function ServicePage() {
  const { slug = '' } = useParams()
  const service = getServiceContent(slug)

  if (!service) {
    return <Navigate to="/not-found" replace />
  }

  return (
    <FadeIn
      as="div"
      className="space-y-6 pb-10 md:space-y-8 md:pb-14"
      duration={0.5}
      triggerOnScroll={false}
      fade={false}
      scaleFrom={1}
    >
      <section className="mx-auto w-full max-w-[1220px] px-3 pt-3 sm:px-5 sm:pt-5 lg:px-0 lg:pt-7">
        <FadeIn
          as="section"
          className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-[#d8cebf]"
          delay={0.04}
          duration={0.42}
        >
          <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,15,10,0.9)_18%,rgba(8,15,10,0.5)_58%,rgba(8,15,10,0.82)_100%)]" />

          <TopNav />
          <div className="relative z-10 flex min-h-[inherit] w-full items-end px-5 pb-10 pt-24 sm:px-7 sm:pb-12 sm:pt-28">
            <div className="space-y-3">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-white/82">{service.menuHeading}</p>
              <h1 className="max-w-[54rem] text-[clamp(2rem,5.3vw,4.6rem)] leading-[0.92] text-white">{service.title}</h1>
              <p className="max-w-[42rem] text-[0.9rem] leading-[1.62] text-white/92">{service.intro}</p>
              <div className="pt-2">
                <Link to="/treatments" className={primaryButton}>
                  Back to treatments
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {service.treatmentCards?.length > 0 ? (
        <TreatmentMenuCards title={`${service.title} Menu`} intro={service.intro} treatments={service.treatmentCards} />
      ) : (
        <BrochureTextBlock title={`${service.title} Menu`} content={service.menuContent} />
      )}

      {service.aftercareContent ? <BrochureTextBlock title={`${service.title} Aftercare`} content={service.aftercareContent} /> : null}

      <NeighborNav slug={slug} />
    </FadeIn>
  )
}
