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
      className="space-y-8 pb-10 md:space-y-10 md:pb-14"
      duration={0.5}
      scaleFrom={1}
      triggerOnScroll={false}
      fade={false}
    >
      <PageHero hero={content.hero} compact />
      <ContentHighlights items={content.highlights} />

      {content.sections.map((section, index) => (
        <EditorialSplitSection key={section.title} section={section} reverse={index % 2 === 1} />
      ))}
    </FadeIn>
  )
}
