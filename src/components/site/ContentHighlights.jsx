import { FadeIn } from './FadeIn'

export function ContentHighlights({ items }) {
  return (
    <FadeIn
      as="section"
      className="rounded-[1.6rem] border border-[#d9d0c3] bg-[#f8f5ef] p-5 sm:p-7"
      duration={0.45}
    >
      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">Highlights</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <FadeIn
            key={item}
            as="li"
            delay={0.05 + index * 0.06}
            duration={0.35}
            className="rounded-xl border border-[#d7ccbc] bg-[#fdfaf4] px-4 py-3 text-[0.92rem] leading-[1.5] text-[#2f332d] before:mr-3 before:text-[#8f7658] before:content-['•']"
          >
            {item}
          </FadeIn>
        ))}
      </ul>
    </FadeIn>
  )
}
