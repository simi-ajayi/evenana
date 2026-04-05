import { Link } from 'react-router-dom'
import { EditorialSplitSection } from '../components/site/EditorialSplitSection'
import { ErrorState, LoadingState } from '../components/site/ContentState'
import { PageHero } from '../components/site/PageHero'
import { SanctuaryCarousel } from '../components/site/SanctuaryCarousel'
import { usePageContent } from '../hooks/usePageContent'
import { FadeIn } from '../components/site/FadeIn'

const statementPrimaryButton =
  'inline-flex items-center justify-center border border-primary-contrast bg-primary-contrast px-4 py-2 font-body text-[1.2rem] uppercase tracking-[0.06rem] text-primary transition-colors hover:bg-transparent hover:text-primary-contrast'
const statementSecondaryButton =
  'inline-flex items-center justify-center border border-primary-contrast/70 bg-transparent px-4 py-2 font-body text-[1.2rem] uppercase tracking-[0.06rem] text-primary-contrast transition-colors hover:border-primary-contrast'

export function HomePage() {
  const { content, isLoading, error } = usePageContent('home')

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
      <PageHero hero={content.hero} />
      <div className="mx-auto w-full max-w-[1440px]">
        <EditorialSplitSection section={content.intro} />

        <SanctuaryCarousel cards={content.sanctuaryCards} />

        <FadeIn as="section" className="border border-accent bg-surface mt-10 p-6 text-primary md:p-10" delay={0.1} duration={0.4}>
          <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-primary">
            {content.statement.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[70rem] font-display text-[clamp(3.2rem,4vw,5.2rem)] leading-[0.95] text-primary">
            {content.statement.title}
          </h2>
          <p className="mt-4 max-w-[90rem] text-[1.8rem] leading-[2.8rem] text-primary">
            {content.statement.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/membership" className={statementSecondaryButton}>
              Membership options
            </Link>
            <Link to="/gifting" className={statementPrimaryButton}>
              Explore gifting
            </Link>
          </div>
        </FadeIn>
      </div>
    </FadeIn>
  )
}
