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

      <div className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
        <FadeIn
          as="section"
          className="space-y-4 rounded-[1.6rem] border border-[#d9d0c3] bg-[#f8f5ef] p-5 text-center sm:p-7"
          delay={0.05}
          duration={0.38}
          triggerOnScroll={false}
          fade={false}
          scaleFrom={1}
        >
          <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">Treatments</p>
          <h2 className="text-[1.95rem] leading-[1.04] text-[#171c16] sm:text-[2.35rem]">Explore treatment categories</h2>
          <p className="mx-auto max-w-[64rem] text-[0.94rem] leading-[1.62] text-[#4f4a41]">{content.lead}</p>
        </FadeIn>

        <div className="mt-7">
          <TreatmentsBrochurePairs services={services} />
        </div>
      </div>
    </FadeIn>
  )
}
