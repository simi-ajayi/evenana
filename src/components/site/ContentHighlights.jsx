import { FadeIn } from './FadeIn'

export function ContentHighlights({ items }) {
  return (
    <FadeIn as="section" className="border border-border bg-surface p-6 md:p-10" duration={0.5}>
      <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Highlights</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <FadeIn
            key={item}
            as="li"
            delay={0.06 + index * 0.06}
            duration={0.4}
            className="text-[1.8rem] leading-[2.6rem] text-text before:mr-4 before:text-secondary before:content-['•']"
          >
            {item}
          </FadeIn>
        ))}
      </ul>
    </FadeIn>
  )
}
