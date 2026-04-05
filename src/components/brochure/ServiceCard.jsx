import { Link } from 'react-router-dom'
import { primaryButton } from '../site/buttonStyles'
import { FadeIn } from '../site/FadeIn'

export function ServiceCard({ service }) {
  return (
    <FadeIn
      as="article"
      className="grid overflow-hidden border border-border bg-surface md:min-h-[32rem] md:grid-cols-[39%_61%]"
      duration={0.5}
    >
      <img
        src={service.image}
        alt={service.title}
        className="h-[25rem] w-full object-cover md:h-full"
        loading="lazy"
      />

      <div className="grid gap-4 p-6 md:p-8">
        <p className="font-body text-[1.2rem] uppercase tracking-[0.06rem] text-muted">
          {service.menuHeading}
        </p>
        <h3 className="font-display text-[clamp(3rem,3.2vw,4.8rem)] leading-[0.96] text-text">
          {service.title}
        </h3>
        <p className="text-[1.8rem] leading-[2.7rem] text-muted">{service.intro}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link to={`/treatments/${service.slug}`} className={primaryButton}>
            Discover more
          </Link>
        </div>
      </div>
    </FadeIn>
  )
}
