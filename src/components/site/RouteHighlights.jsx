import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'

export function RouteHighlights({ items }) {
  return (
    <FadeIn as="section" className="space-y-5" duration={0.5}>
      <div className="space-y-2">
        <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">Spa destinations</p>
        <h2 className="font-display text-[clamp(3rem,4.2vw,5.4rem)] leading-[0.98] text-text">
          Choose how you want to experience EVENANA.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item, index) => (
          <FadeIn key={item.path} as="div" delay={0.06 + index * 0.06} className="block" duration={0.4}>
            <Link
              to={item.path}
              className="group overflow-hidden border border-border bg-surface transition-colors hover:border-secondary"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[20rem] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="space-y-2 p-5">
                <h3 className="font-display text-[3rem] leading-[1] text-text">{item.title}</h3>
                <p className="text-[1.6rem] leading-[2.4rem] text-muted">{item.description}</p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  )
}
