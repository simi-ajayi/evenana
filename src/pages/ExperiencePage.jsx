import { useRef } from 'react'
import { ContentHighlights } from '../components/site/ContentHighlights'
import { EditorialSplitSection } from '../components/site/EditorialSplitSection'
import { ErrorState, LoadingState } from '../components/site/ContentState'
import { PageHero } from '../components/site/PageHero'
import { usePageContent } from '../hooks/usePageContent'
import { useHomePageMotion } from '../hooks/useHomePageMotion'

export function ExperiencePage({ pageKey }) {
  const pageRef = useRef(null)
  const { content, isLoading, error } = usePageContent(pageKey)
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

  return (
    <div ref={pageRef} className="space-y-7 pb-10 md:space-y-9 md:pb-14">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={content.hero} />
      </div>

      <div className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
        <ContentHighlights items={content.highlights} />
      </div>

      {content.sections.map((section, index) => (
        <div key={section.title} className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
          <EditorialSplitSection section={section} reverse={index % 2 === 1} />
        </div>
      ))}
    </div>
  )
}
