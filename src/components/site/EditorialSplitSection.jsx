import { FadeIn } from './FadeIn'

export function EditorialSplitSection({ section, reverse = false }) {
  return (
    <FadeIn
      as="section"
      duration={0.46}
      className={[
        'grid overflow-hidden rounded-[1.6rem] border border-[#d9d0c3] bg-[#f8f5ef] md:grid-cols-2',
        reverse ? 'md:[&>figure]:order-2' : '',
      ].join(' ')}
    >
      <figure>
        <img src={section.image} alt={section.title} className="h-[20rem] w-full object-cover md:h-full" />
      </figure>

      <div className="space-y-4 p-5 sm:p-7">
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[#5f584d]">{section.eyebrow}</p>
        <h3 className="text-[1.85rem] leading-[1.04] text-[#171c16] sm:text-[2.2rem]">{section.title}</h3>
        <p className="max-w-[34rem] text-[0.9rem] leading-[1.65] text-[#4f4a41]">{section.body}</p>
      </div>
    </FadeIn>
  )
}
