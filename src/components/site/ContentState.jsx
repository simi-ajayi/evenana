import { FadeIn } from './FadeIn'

export function LoadingState() {
  return (
    <FadeIn
      as="section"
      className="mx-auto my-8 w-[min(94%,840px)] rounded-[1.4rem] border border-[#d9d0c3] bg-[#f8f5ef] p-8 text-center md:p-10"
      duration={0.32}
    >
      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">Loading</p>
      <p className="mt-3 text-[1.1rem] leading-[1.55] text-[#1f281f]">Preparing your spa experience.</p>
    </FadeIn>
  )
}

export function ErrorState() {
  return (
    <FadeIn
      as="section"
      className="mx-auto my-8 w-[min(94%,840px)] rounded-[1.4rem] border border-[#d9d0c3] bg-[#f8f5ef] p-8 text-center md:p-10"
      duration={0.32}
    >
      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">Unavailable</p>
      <p className="mt-3 text-[1.1rem] leading-[1.55] text-[#1f281f]">
        This content is unavailable right now. Please try again shortly.
      </p>
    </FadeIn>
  )
}
