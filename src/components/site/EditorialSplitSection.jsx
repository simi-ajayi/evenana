import { FadeIn } from './FadeIn'

export function EditorialSplitSection({ section, reverse = false }) {
  return (
    <FadeIn
      as="section"
      duration={0.5}
      className={[
        'grid overflow-hidden h-[80vh] border border-border bg-surface p-6 md:p-10 md:grid-cols-2',
        reverse ? 'md:[&>figure]:order-2' : '',
      ].join(' ')}
    >
      <figure>
        <img src={section.image} alt={section.title} className="h-[30rem] w-full object-cover md:h-full" />
      </figure>

      <div className="space-y-4 p-6 md:p-10">
        <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">
          {section.eyebrow}
        </p>
        <div className=" text-5xl  font-extralight leading-[0.97] text-text">
          {section.title}
        </div>
        <p className="text-xl font-extralight w-[70%] leading-[2.8rem] text-muted">{section.body}</p>
      </div>
    </FadeIn>
  )
}
