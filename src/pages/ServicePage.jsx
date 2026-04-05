import { Link, Navigate, useParams } from 'react-router-dom'
import { BrochureTextBlock } from '../components/brochure/BrochureTextBlock'
import { primaryButton, secondaryButton } from '../components/site/buttonStyles'
import { FadeIn } from '../components/site/FadeIn'
import { getServiceContent, getServiceNeighbors } from '../lib/brochureParser'

function NeighborNav({ slug }) {
  const { previous, next } = getServiceNeighbors(slug)

  return (
    <FadeIn as="div" className="mt-6 flex flex-wrap gap-3" duration={0.4} delay={0.12}>
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
      <FadeIn
        as="section"
        className="relative -mx-4 min-h-[34rem] overflow-hidden border border-border sm:-mx-6 lg:-mx-8"
        delay={0.05}
        duration={0.45}
      >
        <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1440px] items-end px-4 py-12 md:px-8 md:py-16">
          <div className="space-y-3">
            <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-white/85">
              {service.menuHeading}
            </p>
            <h1 className="max-w-[90rem] font-display text-[clamp(4rem,5.6vw,7rem)] leading-[0.92] text-white">
              {service.title}
            </h1>
            <p className="max-w-[75rem] text-[1.9rem] leading-[2.9rem] text-white/90">{service.intro}</p>
            <div className="pt-2">
              <Link to="/treatments" className={primaryButton}>
                Back to treatments
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      <BrochureTextBlock title={`${service.title} Menu`} content={service.menuContent} />

      {service.aftercareContent ? (
        <BrochureTextBlock
          title={`${service.title} Aftercare`}
          content={service.aftercareContent}
        />
      ) : null}

      <NeighborNav slug={slug} />
    </FadeIn>
  )
}
