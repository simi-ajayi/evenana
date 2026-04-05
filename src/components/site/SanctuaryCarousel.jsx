import { useMemo, useState } from 'react'
import { FadeIn } from './FadeIn'

export function SanctuaryCarousel({ cards = [] }) {
  const restingIndex = useMemo(() => {
    if (cards.length <= 1) return 0
    return Math.floor(cards.length / 2)
  }, [cards.length])

  const [activeIndex, setActiveIndex] = useState(null)
  const resolvedActiveIndex = activeIndex ?? restingIndex

  return (
    <FadeIn
      as="section"
      className="space-y-5 p-10 bg-surface mt-10"
      delay={0.05}
      duration={0.4}
    >
      <div className="space-y-2">
        <p className="font-body text-[1.2rem] uppercase text-center mx-auto tracking-[0.06rem] text-muted">
          wellbeing spaces
        </p>
        <div className="font-extralight mx-auto justify-center text-center text-4xl leading-[0.98] text-text">
          Move through calming environments created for recovery. 
        </div>
        <div className="font-extralight mx-auto justify-center text-center text-[1.2rem] mt-4 text-text">
 Retreat to our serene thermal floor to enjoy our world within.
        </div>
      </div>

      <div className="mt-6 md:hidden">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="relative h-[34rem] w-[82vw] shrink-0 snap-start overflow-hidden border border-border bg-surface"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/78 px-4 py-3 backdrop-blur-sm">
                <h3 className="font-display text-[2.8rem] leading-[0.95] text-text">
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="hidden h-[58rem] px-20 pt-4 gap-3 md:flex"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {cards.map((card, index) => {
          const isActive = index === resolvedActiveIndex;

          return (
            <article
              key={card.title}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className="group relative min-w-0 overflow-hidden border border-border bg-surface outline-none"
              style={{
                flexBasis: 0,
                flexGrow: isActive ? 5.4 : 1.8,
                transition: "flex-grow 520ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className={[
                  "absolute inset-0 h-full w-full object-cover transition-transform duration-700",
                  isActive ? "scale-[1.03]" : "scale-100",
                ].join(" ")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/20" />
              <div className="absolute bottom-6 left-6 w-fit right-6 bg-white/78 px-6 py-4 backdrop-blur-sm transition-colors duration-500">
                <h3 className="font-display text-xl leading-[0.95] text-text">
                  {card.title}
                </h3>
              </div>
            </article>
          );
        })}
      </div>
    </FadeIn>
  );
}

