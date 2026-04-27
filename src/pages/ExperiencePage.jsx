import { ContentHighlights } from '../components/site/ContentHighlights'
import { EditorialSplitSection } from '../components/site/EditorialSplitSection'
import { ErrorState, LoadingState } from '../components/site/ContentState'
import { PageHero } from '../components/site/PageHero'
import { usePageContent } from '../hooks/usePageContent'
import { FadeIn } from '../components/site/FadeIn'

export function ExperiencePage({ pageKey }) {
  const { content, isLoading, error } = usePageContent(pageKey)

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !content) {
    return <ErrorState />
  }

  return (
    <FadeIn
      as="div"
      className="space-y-7 pb-10 md:space-y-9 md:pb-14"
      duration={0.48}
      scaleFrom={1}
      triggerOnScroll={false}
      fade={false}
    >
      <PageHero hero={content.hero} compact />

      <div className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
        <ContentHighlights items={content.highlights} />
      </div>

      {content.sections.map((section, index) => (
        <div key={section.title} className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
          <EditorialSplitSection section={section} reverse={index % 2 === 1} />
        </div>
      ))}
    </FadeIn>
  )
}
