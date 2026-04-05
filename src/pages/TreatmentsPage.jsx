import { ErrorState, LoadingState } from '../components/site/ContentState'
import { PageHero } from '../components/site/PageHero'
import { TreatmentsBrochurePairs } from '../components/brochure/TreatmentsBrochurePairs'
import { usePageContent } from '../hooks/usePageContent'
import { getAllServices } from '../lib/brochureParser'
import { FadeIn } from '../components/site/FadeIn'

export function TreatmentsPage() {
  const { content, isLoading, error } = usePageContent('treatments')

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !content) {
    return <ErrorState />
  }

  const services = getAllServices()

  return (
    <FadeIn
      as="div"
      className="space-y-8 pb-10 md:space-y-10 md:pb-14"
      duration={0.5}
      scaleFrom={1}
      triggerOnScroll={false}
      fade={false}
    >
      <PageHero hero={content.hero} compact />

      <div className="mx-auto w-full max-w-[1080px] px-4 md:px-6 lg:px-0">
        <FadeIn
          as="section"
          className="space-y-5 bg-surface py-3 text-center md:py-6"
          delay={0.06}
          duration={0.4}
          triggerOnScroll={false}
          fade={false}
          scaleFrom={1}
         >
          <p className=" text-[1.2rem] uppercase tracking-[0.12rem] text-primary">Treatments</p>
          <h2 className="text-5xl leading-[0.94] text-primary">
            Explore treatment categories
          </h2>
          <p className="mx-auto max-w-[78rem] text-[1.8rem] leading-[2.8rem] text-primary">{content.lead}</p>
        </FadeIn>

        <TreatmentsBrochurePairs services={services} />
      </div>
    </FadeIn>
  )
}
