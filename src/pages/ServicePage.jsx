import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BrochureTextBlock } from '../components/brochure/BrochureTextBlock'
import { TreatmentMenuCards } from '../components/brochure/TreatmentMenuCards'
import { secondaryButton } from '../components/site/buttonStyles'
import { getServiceContent, getServiceNeighbors } from '../lib/brochureParser'
import { PageHero } from '../components/site/PageHero'
import { useHomePageMotion } from '../hooks/useHomePageMotion'

function NeighborNav({ slug }) {
  const { previous, next } = getServiceNeighbors(slug)

  return (
    <div data-ani-section className="mx-auto mt-2 flex w-full max-w-[1220px] flex-wrap gap-3 px-3 sm:px-5 lg:px-0">
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
    </div>
  )
}

export function ServicePage() {
  const pageRef = useRef(null)
  const { slug = '' } = useParams()
  const service = getServiceContent(slug)
  useHomePageMotion(pageRef, {
    imageMotionBlockers: null,
    enabled: Boolean(service),
  })

  if (!service) {
    return <Navigate to="/not-found" replace />
  }

  const hero = {
    label: service.menuHeading,
    title: service.title,
    description: service.intro,
    image: service.image,
    primaryCta: {
      to: '/bookings',
      label: 'Book Appointment',
    },
    secondaryCta: {
      to: '/treatments',
      label: 'Back To Treatments',
    },
  }

  return (
    <div ref={pageRef} className="space-y-6 pb-10 md:space-y-8 md:pb-14">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={hero} />
      </div>

      {service.treatmentCards?.length > 0 ? (
        <TreatmentMenuCards title={`${service.title} Menu`} intro={service.intro} treatments={service.treatmentCards} />
      ) : (
        <BrochureTextBlock title={`${service.title} Menu`} content={service.menuContent} />
      )}

      {service.aftercareContent ? <BrochureTextBlock title={`${service.title} Aftercare`} content={service.aftercareContent} /> : null}

      <NeighborNav slug={slug} />
    </div>
  )
}
