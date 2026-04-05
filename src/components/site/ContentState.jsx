import { FadeIn } from './FadeIn'

export function LoadingState() {
  return (
    <FadeIn as="section" className="my-8 border border-border bg-surface p-8 text-center md:p-12" duration={0.35}>
      <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Loading</p>
      <p className="mt-3 text-[1.8rem] leading-[2.6rem] text-text">Preparing your spa experience.</p>
    </FadeIn>
  )
}

export function ErrorState() {
  return (
    <FadeIn as="section" className="my-8 border border-border bg-surface p-8 text-center md:p-12" duration={0.35}>
      <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Unavailable</p>
      <p className="mt-3 text-[1.8rem] leading-[2.6rem] text-text">
        This content is unavailable right now. Please try again shortly.
      </p>
    </FadeIn>
  )
}
