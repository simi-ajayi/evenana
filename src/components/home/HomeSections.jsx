import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Masonry } from 'antd'
// import brandWordmark from '../../assets/evenana_white_text.png'
import spa01 from '../../assets/spa/spa-01.jpg'
import spa02 from '../../assets/spa/spa-02.jpg'
import spa03 from '../../assets/spa/spa-03.jpg'
import spa04 from '../../assets/spa/spa-04.jpg'
import spa05 from '../../assets/spa/spa-05.jpg'
import spa06 from '../../assets/spa/spa-06.jpg'
import spa07 from '../../assets/spa/spa-07.jpg'
import spa08 from '../../assets/spa/spa-08.jpg'
import spa09 from '../../assets/spa/spa-09.jpg'
import spa10 from '../../assets/spa/spa-10.jpg'
import spa11 from '../../assets/spa/spa-11.jpg'
import spa12 from '../../assets/spa/spa-12.jpg'
import spa13 from '../../assets/spa/spa-13.jpg'
import { TopNav } from '../navigation/TopNav'

const topServices = [
  { title: 'Deep Tissue Massage', image: spa07 },
  { title: 'Swedish Relaxation', image: spa01 },
  { title: 'Reflexology Session', image: spa02 },
  { title: 'Hot Stone Therapy', image: spa08 },
  { title: 'Detox Body Wrap', image: spa06 },
]

const metrics = [
  { value: '100%', label: 'Client Satisfaction' },
  { value: '10+', label: 'Years Experience' },
  { value: '30+', label: 'Treatments Offered' },
  { value: '24/7', label: 'Booking Assistance' },
]

const mosaicImages = [spa09, spa11, spa03, spa05, spa04, spa10]

const partnerPoints = [
  {
    title: 'Stress Relief',
    body: 'Slow, intentional pressure and aromatic oils calm the nervous system and restore daily balance.',
  },
  {
    title: 'Pain Reduction',
    body: 'Targeted techniques improve circulation and ease persistent neck, shoulder, and lower back strain.',
  },
  {
    title: 'Deep Relaxation',
    body: 'Every session is paced to release tension, steady breathing, and leave the body noticeably lighter.',
  },
]

const wellnessBenefits = [
  {
    title: 'Better Sleep',
    body: 'Guided pressure points relax muscles, helping your body move into deeper restorative rest.',
  },
  {
    title: 'Mental Clarity',
    body: 'A calmer nervous system supports sharper focus, balanced mood, and lighter emotional load.',
  },
  {
    title: 'Boost Immunity',
    body: 'Improved lymphatic flow and circulation support your body in recovering more effectively.',
  },
  {
    title: 'Improved Circulation',
    body: 'Long strokes and warm compresses increase blood flow to nourish skin and muscles.',
  },
]

const calmList = [
  'Exceptional Healing',
  'All Body Relaxation Rituals',
  'Trained Licensed Massage Experts',
  'Gentle, Spa-Grade Aromatherapy',
  'Extended Massage Experience Every Time',
]

const testimonials = [
  {
    quote:
      'The atmosphere is peaceful and the team is kind. I always leave feeling lighter and more settled.',
    name: 'Chiamaka Okafor',
    role: 'Brand Manager',
    tag: 'Relaxation Member',
    note: 'Calm, consistent, and thoughtful care.',
  },
  {
    quote:
      'The therapists are very skilled and attentive. Every session feels personalized and professionally handled.',
    name: 'Tunde Adebayo',
    role: 'Operations Supervisor',
    tag: 'Deep Tissue Care',
    note: 'A trusted part of my monthly routine.',
  },
  {
    quote:
      'From reception to treatment, everything is organized and warm. It feels like a true wellness experience.',
    name: 'Ifeoma Eze',
    role: 'Legal Associate',
    tag: 'Wellness Ritual',
    note: 'Professional service with a personal touch.',
  },
  {
    quote:
      'I appreciate the attention to detail and the peaceful setting. It is my go-to place whenever I need to reset.',
    name: 'Seyi Balogun',
    role: 'Entrepreneur',
    tag: 'Aromatherapy Journey',
    note: 'A quiet space to recharge every week.',
  },
  {
    quote:
      'Booking is easy, the service is consistent, and the therapists genuinely care about how you feel after each session.',
    name: 'Amaka Nwankwo',
    role: 'HR Consultant',
    tag: 'Recovery Plan',
    note: 'Reliable care I can always count on.',
  },
]

const imageCardClass =
  'overflow-hidden rounded-[1.45rem] border border-[#ddd5ca]/70 bg-[#f8f5ef] shadow-[0_12px_30px_-22px_rgba(31,34,26,0.55)]'

export function HomeHeroSection() {
  return (
    <section
      data-ani-section
      className="relative h-[95vh]  overflow-hidden md:rounded-4xl border border-[#d6cdc1] bg-[#233125] text-[#f4efe6]"
    >
      <img
        data-ani-image
        data-ani-hero-image
        src={spa06}
        alt="Spa treatment"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <TopNav />
      <div className="relative z-10 flex h-full flex-col justify-between px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-28 lg:px-7 lg:pb-7 lg:pt-32">
        {/* <div className="flex items-start justify-between gap-4">
          <img data-ani-image src={brandWordmark} alt="Evenana" className="h-12 w-auto sm:h-16" />
          <span
            data-hero-badge
            className="rounded-full border border-[#f7f1e6]/55 bg-[#f7f1e6]/10 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#f7f1e6]"
          >
            Luxury Wellness Studio
          </span>
        </div> */}

        <div className="flex justify-between md:px-10 px-2 h-full items-end gap-6 pb-20 pt-8 md:grid-cols-[1.1fr_0.9fr] md:pt-0">
          <div>
            <h1 className="text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.91] text-[#f5f1e8]">
              <span data-hero-title-line className="block">
                Restore Body
              </span>
              <span data-hero-title-line className="block font-serif italic">
                And Mind
              </span>
            </h1>
          </div>

          <div className="pb-2 md:pb-8">
            <p
              data-hero-copy
              className="max-w-[30rem] text-[0.9rem] leading-[1.6] text-[#eee7db]/92 sm:text-[1.35rem]"
            >
              Personalized wellness rituals, therapeutic massage, and guided
              rejuvenation crafted to renew your total wellbeing journey.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link data-hero-cta to="/bookings">
                <div className="rounded-full bg-[#f4efe6] px-7 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-[#172017]! transition hover:-translate-y-0.5 hover:bg-white">
                  Book Appointment
                </div>
              </Link>
              <Link data-hero-cta to="/treatments">
                <div className="rounded-full border border-[#f4eee2]/50 px-7 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-[#f0e8dc]! transition hover:bg-[#f4eee2]/10">
                  Explore Treatments
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeAboutSection() {
  return (
    <section
      data-ani-section
      className="w-full px-[clamp(0.8rem,3.2vw,2.6rem)] py-[clamp(2.2rem,7vw,10rem)]"
    >
      <div className="mx-auto flex w-full max-w-[1400px]  p-10 items-start justify-between gap-[clamp(1rem,4vw,7rem)]">
        <div className="flex w-[31%]  min-w-0 flex-col justify-between">
          <p
            data-ani-heading
            className="font-serif text-[clamp(1.7rem,3vw,3rem)] font-bold italic text-[#1d231c]"
          >
            About Us
          </p>
          <p
            data-ani-copy
            className="mt-[clamp(2.4rem,9vw,8rem)] max-w-[18rem] text-[clamp(0.66rem,0.95vw,1rem)] leading-[1.65] text-[#47443d]"
          >
            Treat yourself to the gift of wellness with soothing treatments
            that quiet your mind and nurture your body.
          </p>
        </div>

        <div className="w-[66%] min-w-0">
          <p
            data-ani-copy
            className="max-w-full font-serif text-[clamp(1.12rem,3vw,3rem)] leading-[1.35] text-[#262a24]"
          >
            Our expert therapists offer a healing touch to release stress,
            reduce pain, and restore your natural balance in a peaceful,
            welcoming environment designed to support your total wellness
            journey.
          </p>
        </div>
      </div>
    </section>
  )
}

export function HomeTopServicesSection() {
  const marqueeServices = [...topServices, ...topServices]
  const marqueeViewportRef = useRef(null)
  const marqueeTrackRef = useRef(null)
  const [desktopCardWidth, setDesktopCardWidth] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const updateDesktopCardWidth = () => {
      const viewport = marqueeViewportRef.current
      const track = marqueeTrackRef.current

      if (!viewport || !track || window.innerWidth < 1024) {
        setDesktopCardWidth(null)
        return
      }

      const trackStyles = window.getComputedStyle(track)
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || '0')
      const nextWidth = (viewport.clientWidth - gap * 4) / 5
      setDesktopCardWidth(Math.max(112, nextWidth))
    }

    updateDesktopCardWidth()

    const resizeObserver = new ResizeObserver(updateDesktopCardWidth)
    if (marqueeViewportRef.current) resizeObserver.observe(marqueeViewportRef.current)
    window.addEventListener('resize', updateDesktopCardWidth)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDesktopCardWidth)
    }
  }, [])

  return (
    <section
      data-ani-section
      data-services-section
      className="rounded-t-[70px] shadow-2xl h-full min-h-[80vh] overflow-hidden bg-[#f8f5ef] px-[clamp(0.8rem,2.4vw,1.75rem)] py-[clamp(1.3rem,2.8vw,2.2rem)]"
    >
      <div className="flex w-full items-end justify-between gap-[clamp(1rem,4vw,6rem)] px-[clamp(0.3rem,2.9vw,4.2rem)] pt-[clamp(0.9rem,3.7vw,4rem)]">
        <div className='p-10 w-full flex justify-between'>
          <div className="w-[52%] min-w-0">
            <h2
              data-ani-heading
              className="text-[clamp(2rem,4.5vw,5rem)]  font-bold leading-tight text-[#171b16]"
            >
              Our Top <span className="font-serif italic">Services</span>
            </h2>
          </div>
          <p
            data-ani-copy
            className="w-[38%] min-w-0 max-w-[31rem]  text-[clamp(0.65rem,1vw,1.35rem)] leading-[1.6] text-[#4f4b43]"
          >
            Whether you seek deep tissue recovery, guided aromatherapy, or
            holistic rituals, each service is designed to calm the body and
            elevate wellbeing.
          </p>
        </div>
      </div>

      <div
        ref={marqueeViewportRef}
        className="top-services-marquee mt-[clamp(1.1rem,2.2vw,2rem)] h-full max-w-full px-[clamp(0.3rem,2.9vw,4.2rem)]"
      >
        <div
          ref={marqueeTrackRef}
          className="top-services-marquee-track flex w-max items-start gap-[clamp(1rem,2.2vw,1.75rem)] pb-5"
        >
          {marqueeServices.map((service, index) => {
            const originalIndex = index % topServices.length;
            const isDuplicate = index >= topServices.length;
            const itemWidthStyle = desktopCardWidth
              ? { width: `${desktopCardWidth}px` }
              : undefined;
            const imageSizeStyle = desktopCardWidth
              ? {
                  width: `${desktopCardWidth}px`,
                  height: `${desktopCardWidth * 1.5}px`,
                }
              : undefined;

            return (
              <article
                key={`${service.title}-${index}`}
                data-float={
                  !isDuplicate && originalIndex > 1 ? "true" : undefined
                }
                className="flex w-[clamp(8.4rem,14vw,12.5rem)] shrink-0 flex-col items-center text-center"
                aria-hidden={isDuplicate}
                style={itemWidthStyle}
              >
                <img
                  data-ani-image={!isDuplicate ? "" : undefined}
                  src={service.image}
                  alt={service.title}
                  className="h-[clamp(11rem,21vw,18.75rem)] w-[clamp(8.4rem,14vw,12.5rem)] rounded-full object-cover"
                  style={imageSizeStyle}
                />
                <p className="mt-[clamp(3.4rem,1.8vw,3.2rem)] text-[clamp(0.85rem,1.35vw,2.06rem)] font-medium leading-[1.35] text-[#272b24]">
                  {service.title}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-[clamp(1.1rem,2.8vw,2rem)] flex w-full items-end justify-between gap-[clamp(1rem,4vw,6rem)] px-[clamp(0.3rem,2.9vw,4.2rem)] pb-[clamp(1.8rem,5vw,5rem)]">
        <p
          data-ani-copy
          className="w-[34%] min-w-0 max-w-[24rem] text-[clamp(0.72rem,0.95vw,1.23rem)] leading-[1.66] text-[#4d4840]"
        >
          Treat your body to deep comfort, guided pressure points, and soothing
          rituals that lift fatigue, calm inflammation, and release stored
          tension.
        </p>
        <p
          data-ani-copy
          className="w-[47%] min-w-0 max-w-[34rem] text-[clamp(1rem,2.2vw,2.2rem)] leading-[1.28] text-[#222620]"
        >
          Give yourself the gift of calm and wellness with our expert spa
          treatments.
        </p>
      </div>
    </section>
  );
}

export function HomeMetricsSection() {
  return (
    <section
      data-ani-section
      className="h-[20vh] w-full justify-center flex bg-[#1f281f] px-4 py-7 text-[#f4efe3] sm:px-7 sm:py-8"
    >
      <div className="grid grid-cols-4 gap-5 md:gap-52 mx-auto items-center sm:grid-cols-4">
        {metrics.map((metric, index) => (
          <div key={metric.value} data-float={index < 2 ? "true" : undefined}>
            <p className="text-[1.9rem] leading-none sm:text-[4.25rem]">
              {metric.value}
            </p>
            <p className="mt-1 md:text-[0.69rem] text-[0.49rem] uppercase tracking-[0.14em] text-[#d6cfbf]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeGallerySection() {
  const galleryItems = [
    {
      key: "gallery-copy-heading",
      children: (
        <div>
          <p
            data-ani-copy
            className="text-[0.72rem] uppercase tracking-[0.16em] text-[#585347]"
          >
            Our Spa Creates A Sanctuary Of Calm
          </p>
          <h3
            data-ani-heading
            className="mt-2 text-[clamp(1.7rem,3.1vw,3.1rem)] leading-[1.14] text-[#151913]"
          >
            With Every Soothing{" "}
            <span className="font-serif italic">Treatment You Receive</span>
          </h3>
        </div>
      ),
    },
    {
      key: "gallery-image-01",
      children: (
        <figure
          className={`${imageCardClass} border-0 bg-transparent shadow-none`}
        >
          <img
            data-ani-image
            src={mosaicImages[0]}
            alt="Back massage in a serene room"
            className="aspect-[16/10] w-full object-cover object-center"
          />
        </figure>
      ),
    },
    {
      key: "gallery-image-02",
      children: (
        <figure
          className={`${imageCardClass} border-0 bg-transparent shadow-none`}
        >
          <img
            data-ani-image
            src={mosaicImages[1]}
            alt="Facial care treatment"
            className="aspect-[16/9] w-full object-cover object-center"
          />
        </figure>
      ),
    },
    {
      key: "gallery-image-03",
      children: (
        <figure
          className={`${imageCardClass} border-0 bg-transparent shadow-none`}
        >
          <img
            data-ani-image
            src={mosaicImages[3]}
            alt="Neck and shoulder spa therapy"
            className="aspect-[4/5] w-full object-cover object-center"
          />
        </figure>
      ),
    },
    {
      key: "gallery-image-04",
      children: (
        <figure
          className={`${imageCardClass} border-0 bg-transparent shadow-none`}
        >
          <img
            data-ani-image
            src={mosaicImages[2]}
            alt="Massage therapy session"
            className="aspect-[4/3] w-full object-cover object-center"
          />
        </figure>
      ),
    },
    {
      key: "gallery-copy-body",
      children: (
        <p
          data-ani-copy
          className="text-[clamp(1.02rem,1.55vw,1.52rem)] leading-[1.58] font-serif text-[#2f312a]"
        >
          We combine traditional techniques with modern wellness therapies to
          create a spa experience that soothes the body, nurtures the mind, and
          recharges your spirit in one beautiful session.
        </p>
      ),
    },
    {
      key: "gallery-image-05",
      children: (
        <figure
          className={`${imageCardClass} border-0 bg-transparent shadow-none`}
        >
          <img
            data-ani-image
            src={mosaicImages[4]}
            alt="Aromatherapy setup"
            className="aspect-[4/3] w-full object-cover object-center"
          />
        </figure>
      ),
    },
    {
      key: "gallery-image-06",
      children: (
        <figure
          className={`${imageCardClass} border-0 bg-transparent shadow-none`}
        >
          <img
            data-ani-image
            src={mosaicImages[5]}
            alt="Relaxing massage"
            className="aspect-[4/3] w-full object-cover object-center"
          />
        </figure>
      ),
    },
    {
      key: "gallery-copy-intro",
      children: (
        <p
          data-ani-copy
          className="text-[clamp(0.9rem,2.35vw,1.55rem)] hidden md:block font-serif leading-[1.48] text-[#242722]"
        >
          Healing starts from the inside. Our holistic approach to wellness
          ensures you leave feeling refreshed, rebalanced, and radiant, every
          time you visit.
        </p>
      ),
    },
  ];

  return (
    <section
      data-ani-section
      data-gallery-section
      className="overflow-hidden px-[clamp(0.75rem,2.4vw,2.4rem)] py-[clamp(5rem,2.6vw,10rem)]"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <Masonry
          fresh
          columns={{ xs: 2, sm: 2, md: 3 }}
          gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
          items={galleryItems}
        />
      </div>
    </section>
  )
}

export function HomePartnerSection() {
  const partnerFeatureItems = partnerPoints.map((point) => ({
    key: `partner-point-${point.title}`,
    children: (
      <article className="rounded-[1.35rem] shadow-xl bg-[#fbf8f2] p-[clamp(1rem,1.5vw,1.5rem)]">
        <p data-ani-copy className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[#232922]">
          {point.title}
        </p>
        <p data-ani-copy className="mt-2 text-[clamp(0.9rem,0.95vw,1.02rem)] leading-[1.68] text-[#514c41]">
          {point.body}
        </p>
      </article>
    ),
  }))

  const partnerItems = [
    {
      key: 'partner-image-01',
      children: (
        <figure className={imageCardClass}>
          <img
            data-ani-image
            src={spa12}
            alt="Spa candles"
            className="h-[clamp(18rem,34vw,38rem)] w-full object-cover"
          />
        </figure>
      ),
    },
    {
      key: 'partner-copy',
      children: (
        <div className="rounded-[1.45rem] shadow-lg bg-[#f8f4ec] p-[clamp(1rem,1.6vw,1.8rem)]">
          <h3
            data-ani-heading
            className="text-[clamp(2rem,3.4vw,3.15rem)] leading-[1.08] text-[#171b16]"
          >
            Your Trusted Partner In <span className="font-serif italic">Holistic Wellness Care</span>
          </h3>
          <p data-ani-copy className="mt-4 text-[clamp(0.94rem,1.02vw,1.1rem)] leading-[1.72] text-[#4d473d]">
            Every treatment is tailored to your rhythm, from deep recovery sessions to soothing rituals that support
            sustained wellbeing.
          </p>
        </div>
      ),
    },
    partnerFeatureItems[0],
    {
      key: 'partner-image-02',
      children: (
        <figure className={imageCardClass}>
          <img
            data-ani-image
            src={spa08}
            alt="Facial relaxation"
            className="h-[clamp(14rem,24vw,25rem)] w-full object-cover"
          />
        </figure>
      ),
    },
    partnerFeatureItems[1],
    {
      key: 'partner-cta',
      children: (
        <div className="rounded-[1.45rem] shadow-lg bg-[#efe9dc] p-[clamp(1rem,1.6vw,1.7rem)] text-center">
          <p data-ani-copy className="text-[clamp(0.92rem,0.98vw,1.06rem)] leading-[1.7] text-[#4d473d]">
            Let your wellness journey begin with personalized, rejuvenating massage therapy.
          </p>
          <Link
            to="/bookings"
            className="mt-4 inline-flex rounded-full bg-[#1f281f] px-5 py-2.5 text-[0.76rem] font-semibold uppercase tracking-[0.13em] text-[#f2eee4] transition hover:bg-[#161d16]"
          >
            Book Appointment
          </Link>
        </div>
      ),
    },
    partnerFeatureItems[2],
  ]

  return (
    <section
      data-ani-section
      className="min-h-full rounded-[1.6rem] bg-[#f8f5ef] p-5 sm:p-7 lg:p-9"
    >
      <div className="mx-auto w-full max-w-[1440px] py-20">
        <Masonry
          fresh
          columns={{ xs: 2, sm: 2, lg: 3 }}
          gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
          items={partnerItems}
        />
      </div>
    </section>
  );
}

export function HomeBenefitsSection() {
  const benefitTextItems = wellnessBenefits.map((benefit) => ({
      key: `benefit-${benefit.title}`,
      children: (
        <article className="rounded-[1.25rem] bg-[#f7f3eb] p-[clamp(1rem,1.3vw,1.4rem)]">
          <h4 data-ani-copy className="text-[clamp(1.15rem,1.4vw,1.44rem)] leading-[1.2] text-[#1e231d]">
            {benefit.title}
          </h4>
          <p data-ani-copy className="mt-3 text-[clamp(0.9rem,0.95vw,1.04rem)] leading-[1.68] text-[#514c41]">
            {benefit.body}
          </p>
        </article>
      ),
    }))

  const benefitItems = [
    benefitTextItems[0],
    {
      key: 'benefit-image-01',
      children: (
        <figure className={imageCardClass}>
          <img
            data-ani-image
            src={spa03}
            alt="Natural spa elements"
            className="h-[clamp(15rem,28vw,30rem)] w-full object-cover"
          />
        </figure>
      ),
    },
    benefitTextItems[1],
    {
      key: 'benefit-image-02',
      children: (
        <figure className={imageCardClass}>
          <img
            data-ani-image
            src={spa09}
            alt="Head massage"
            className="h-[clamp(16rem,30vw,32rem)] w-full object-cover"
          />
        </figure>
      ),
    },
    benefitTextItems[2],
    {
      key: 'benefit-calm-list',
      children: (
        <div className="rounded-[1.45rem] min-h-[clamp(22rem,52vh,40rem)]  bg-[#f8f4ec] p-5 sm:p-6">
          <h3
            data-ani-heading
            className="max-w-[25rem] text-[clamp(2rem,3vw,3.05rem)] leading-[1.09] text-[#171c16]"
          >
            Calm Your Senses With <span className="font-serif italic">Therapeutic Healing</span>
          </h3>
          <div className="mt-5 divide-y divide-[#d5cab9] rounded-[1rem] border border-[#d5cab9] bg-[#fcfaf6]">
            {calmList.map((item, index) => (
              <div key={item} className="flex items-center justify-between px-4 py-[clamp(0.8rem,1.2vw,1rem)]">
                <p data-ani-copy className="text-[clamp(0.9rem,0.94vw,1.01rem)] leading-[1.54] text-[#2f332c]">
                  {item}
                </p>
                <span className="text-[1.05rem] text-[#4f4a40]">{index === 0 ? '−' : '+'}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    benefitTextItems[3],
  ]

  return (
    <section data-ani-section className="min-h-full py-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px]">
      <Masonry
        fresh
        columns={{ xs: 2, sm: 2, lg: 3 }}
        gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
        items={benefitItems}
        />
        </div>
    </section>
  )
}

export function HomeTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const totalSlides = testimonials.length

  useEffect(() => {
    if (isPaused || totalSlides < 2) return undefined
    const autoplayId = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % totalSlides)
    }, 6500)

    return () => window.clearInterval(autoplayId)
  }, [isPaused, totalSlides])

  const moveToSlide = (targetIndex) => {
    const normalizedIndex = (targetIndex + totalSlides) % totalSlides
    setActiveIndex(normalizedIndex)
  }

  const accentThemes = [
    {
      panel: 'bg-[#efe7da] border-[#d6c8b5]',
      mark: 'text-[#cc7465]',
      pill: 'bg-[#f8f3ea] border-[#d8cab7] text-[#3e392f]',
      avatar: 'bg-[#d7b594] text-[#1b1c19]',
    },
    {
      panel: 'bg-[#e4ece5] border-[#c2d0c2]',
      mark: 'text-[#5f8a73]',
      pill: 'bg-[#f2f7f2] border-[#cad7cb] text-[#2b3e32]',
      avatar: 'bg-[#a6bfa9] text-[#162018]',
    },
    {
      panel: 'bg-[#e8e0ef] border-[#cdc0db]',
      mark: 'text-[#8b699f]',
      pill: 'bg-[#f6f1fb] border-[#d8cde7] text-[#3d3150]',
      avatar: 'bg-[#c3afd8] text-[#211b2b]',
    },
    {
      panel: 'bg-[#efe8d8] border-[#d8cbaf]',
      mark: 'text-[#b07f44]',
      pill: 'bg-[#f8f4e9] border-[#e0d4ba] text-[#4a3a26]',
      avatar: 'bg-[#d9bf97] text-[#241d14]',
    },
    {
      panel: 'bg-[#f0dfdb] border-[#d7bfb8]',
      mark: 'text-[#b06b60]',
      pill: 'bg-[#f9f1ef] border-[#ddc7c1] text-[#4c2c26]',
      avatar: 'bg-[#dba8a1] text-[#2b1714]',
    },
  ]

  return (
    <section
      data-ani-section
      data-testimonial-shell
      className="  bg-[#f8f5ef] px-5 py-7 sm:px-7 sm:py-9"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 data-ani-heading className="text-[2rem] leading-[1.07] text-[#171b16] sm:text-[2.55rem]">
          Voices From <span className="font-serif italic">Our Wellness Studio</span>
        </h3>
        <p data-ani-copy className="max-w-[29rem] text-[0.88rem] leading-[1.65] text-[#5a554b] sm:text-[0.95rem]">
          Real stories from clients who trusted us with stress relief, sleep recovery, and long-term body balance.
        </p>
      </div>

      <div
        className="relative mt-6 overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_80%_0%,#f5eee2_0%,#f0e8db_38%,#e8dece_100%)] p-3 sm:p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-[#d9c2a2]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-8 h-52 w-52 rounded-full bg-[#c8d6c9]/35 blur-3xl" />

        <div className="relative overflow-hidden rounded-[1.2rem]">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => {
              const initials = testimonial.name
                .split(' ')
                .map((part) => part[0] ?? '')
                .join('')
                .slice(0, 2)
                .toUpperCase()
              const theme = accentThemes[index % accentThemes.length]

              return (
                <article key={testimonial.name} className="min-w-full p-1">
                  <div className="grid min-h-[clamp(21rem,48vw,31rem)] gap-3   p-3 sm:p-5 md:grid-cols-[0.85fr_1.15fr] md:gap-6">
                    <div className={`flex flex-col justify-between rounded-[1.9rem] border p-4 sm:p-5 ${theme.panel}`}>
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5d574a] sm:text-[0.76rem]">
                          Client Feedback
                        </p>
                        <p className="mt-3 text-[clamp(1rem,1.5vw,1.35rem)] leading-[1.5] text-[#252923]">
                          {testimonial.note}
                        </p>
                      </div>

                      <div className={`mt-8 inline-flex w-fit rounded-full border px-3 py-1 text-[0.67rem] font-semibold uppercase tracking-[0.1em] ${theme.pill}`}>
                        {testimonial.tag}
                      </div>

                      <p className="mt-4 text-[0.76rem] uppercase tracking-[0.11em] text-[#645d50]">
                        Verified Client Story
                      </p>
                    </div>

                    <div className="flex flex-col justify-between rounded-[1.9rem] shadow-lg  bg-[#fcfaf5] p-4 sm:p-5">
                      <p className={`text-[2.6rem] leading-none ${theme.mark}`}>“</p>
                      <p
                        data-ani-copy
                        className="mt-1 text-[clamp(0.98rem,1.45vw,1.42rem)] leading-[1.62] text-[#2b2e28]"
                      >
                        {testimonial.quote}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-[0.82rem] font-semibold ${theme.avatar}`}
                          >
                            {initials}
                          </span>
                          <div>
                            <p data-ani-copy className="text-[0.9rem] font-semibold text-[#1e231d]">
                              {testimonial.name}
                            </p>
                            <p className="text-[0.7rem] uppercase tracking-[0.14em] text-[#71695d]">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>

                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.11em] text-[#4a453a]">
                          EVENANA
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="relative mt-4 flex items-center justify-between gap-3 sm:mt-5">
          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={`testimonial-dot-${testimonial.name}`}
                type="button"
                onClick={() => moveToSlide(index)}
                aria-label={`View testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-9 bg-[#1f281f]' : 'w-2 bg-[#8f8574]/60 hover:bg-[#6d665a]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => moveToSlide(activeIndex - 1)}
              aria-label="Previous testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cdbfa9] bg-[#f7f1e6] text-[1.1rem] text-[#232720] transition hover:bg-[#efe7d9]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => moveToSlide(activeIndex + 1)}
              aria-label="Next testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cdbfa9] bg-[#1f281f] text-[1.1rem] text-[#f2ecdf] transition hover:bg-[#151d16]"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeBookingSection() {
  return (
    <section data-ani-section className="grid gap-6 py-9 lg:grid-cols-[1fr_0.95fr] lg:py-12">
      <div className="rounded-[1.45rem] border border-[#d8cebf] bg-[#f8f4ec] p-5 sm:p-6">
        <h3 data-ani-heading className="text-[2rem] leading-[1.07] text-[#171b16] sm:text-[2.6rem]">
          Book Your <span className="font-serif italic">Appointment Today</span>
        </h3>

        <form className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="First name"
              className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]"
            />
            <input
              type="text"
              placeholder="Last name"
              className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="email"
              placeholder="Email"
              className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="date"
              className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]"
            />
            <input
              type="time"
              className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]"
            />
          </div>
          <select className="h-11 w-full rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]">
            <option>Treatment selection</option>
            <option>Deep Tissue Massage</option>
            <option>Reflexology Session</option>
            <option>Hot Stone Therapy</option>
            <option>Detox Body Wrap</option>
          </select>
          <textarea
            rows={3}
            placeholder="Special request"
            className="w-full rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 py-2 text-[0.83rem] text-[#232721] outline-none transition focus:border-[#243226]"
          />
          <Link
            to="/bookings"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#1e271f] text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#f2ede3] transition hover:bg-[#151d16]"
          >
            Book Appointment
          </Link>
        </form>
      </div>

      <figure className={imageCardClass}>
        <img data-ani-image src={spa13} alt="Beauty portrait" className="h-full min-h-[20rem] w-full object-cover" />
      </figure>
    </section>
  )
}
