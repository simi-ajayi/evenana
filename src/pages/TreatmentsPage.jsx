import { useRef } from 'react'
import { ErrorState, LoadingState } from '../components/site/ContentState'
import { PageHero } from '../components/site/PageHero'
import { TreatmentsBrochurePairs } from '../components/brochure/TreatmentsBrochurePairs'
import { usePageContent } from '../hooks/usePageContent'
import { getAllServices } from '../lib/brochureParser'
import { useHomePageMotion } from '../hooks/useHomePageMotion'

export function TreatmentsPage() {
  const pageRef = useRef(null)
  const { content, isLoading, error } = usePageContent('treatments')
  useHomePageMotion(pageRef, {
    imageMotionBlockers: null,
    enabled: !isLoading && !error && Boolean(content),
  })

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !content) {
    return <ErrorState />
  }

  const services = getAllServices()

  return (
    <div ref={pageRef} className="space-y-8 pb-10 md:space-y-10 md:pb-14">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={content.hero} />
      </div>

      <div className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
        <section
          data-ani-section
          className="space-y-4 rounded-[1.6rem] bg-[radial-gradient(circle_at_top,#f9f5ed_0%,#f1eadf_58%,#eee6d8_100%)] p-5 text-center shadow-[0_24px_48px_-36px_rgba(20,27,18,0.6)] sm:p-7"
        >
          <p data-ani-copy className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">
            Treatments
          </p>
          <h2 data-ani-heading className="text-[1.95rem] leading-[1.04] text-[#171c16] sm:text-[2.35rem]">
            Explore treatment categories
          </h2>
          <p data-ani-copy className="mx-auto max-w-[64rem] text-[0.94rem] leading-[1.62] text-[#4f4a41]">
            {content.lead}
          </p>
        </section>

        <div className="mt-7">
          <TreatmentsBrochurePairs services={services} />
        </div>
      </div>
    </div>
  )
}
