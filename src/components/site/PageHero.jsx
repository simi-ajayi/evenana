import { FadeIn } from './FadeIn'
import heroImage from '../../assets/hero.webp'
import evenanaWhiteText from '../../assets/evenana_white_text.png'
import { TopNav } from '../navigation/TopNav'

export function PageHero({ hero, compact = false }) {
  return (
    <FadeIn
      as="section"
      duration={0.52}
      scaleFrom={1.03}
      fade={false}
      triggerOnScroll={false}
      className="mx-auto w-full px-3 pt-3 sm:px-5 sm:pt-5 lg:px-8 lg:pt-7"
    >
      <div
        className={[
          'relative overflow-hidden rounded-[2rem] border border-[#d6cdc1] text-[#f4efe6]',
          compact ? 'min-h-[24rem] md:min-h-[28rem]' : 'min-h-[34rem] md:min-h-[40rem]',
        ].join(' ')}
      >
        <img src={hero?.image || heroImage} alt={hero?.title || 'Evenana'} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(9,18,12,0.9)_15%,rgba(9,18,12,0.52)_58%,rgba(9,18,12,0.82)_100%)]" />

        <TopNav />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-5 pt-24 sm:px-7 sm:pb-7 sm:pt-28 lg:px-8 lg:pb-8 lg:pt-32">
          <img src={evenanaWhiteText} alt="EVENANA" className="h-10 w-auto sm:h-12" />

          <div className="max-w-[58rem] space-y-3 pb-2">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#e4dacb]">{hero?.label || 'EVENANA'}</p>
            <h1 className="text-[clamp(2.2rem,5.8vw,5rem)] leading-[0.92] text-[#f6f1e7]">{hero?.title}</h1>
            {hero?.description ? (
              <p className="max-w-[42rem] text-[0.9rem] leading-[1.65] text-[#ece4d6] sm:text-[1.02rem]">
                {hero.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
