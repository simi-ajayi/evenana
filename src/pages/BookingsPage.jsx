import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import wordmark from '../assets/evenana_white_text.png'
import spa01 from '../assets/spa/spa-01.jpg'
import spa03 from '../assets/spa/spa-03.jpg'
import spa04 from '../assets/spa/spa-04.jpg'
import spa07 from '../assets/spa/spa-07.jpg'
import spa08 from '../assets/spa/spa-08.jpg'
import spa12 from '../assets/spa/spa-12.jpg'
import { TopNav } from '../components/navigation/TopNav'

gsap.registerPlugin(ScrollTrigger)

const slotGroups = [
  { label: 'Morning', slots: ['09:00', '10:30', '11:45'] },
  { label: 'Afternoon', slots: ['13:00', '14:30', '16:00'] },
  { label: 'Evening', slots: ['17:30', '18:45', '20:00'] },
]

const bookingPerks = [
  'Welcome herbal tea ritual on arrival',
  'Therapist matching based on your concern',
  'Complimentary aromatherapy enhancement',
  'Post-session guidance for home recovery',
]

export function BookingsPage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })

      intro
        .from('[data-booking-hero-image]', {
          scale: 1.23,
          rotate: 3,
          filter: 'brightness(0.62) blur(10px)',
          duration: 1.45,
        })
        .from('[data-booking-overlay]', { opacity: 0, duration: 1.1 }, 0)
        .from('[data-booking-title-line]', { yPercent: 110, opacity: 0, duration: 0.95, stagger: 0.09 }, 0.25)
        .from('[data-booking-copy]', { y: 24, opacity: 0, duration: 0.85 }, 0.45)
        .from('[data-booking-cta]', { y: 16, opacity: 0, duration: 0.7, stagger: 0.06 }, 0.62)

      gsap.utils.toArray('[data-booking-section]').forEach((section, index) => {
        gsap.from(section, {
          opacity: 0,
          y: 70,
          rotateX: index % 2 ? -5 : 5,
          transformOrigin: '50% 100%',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        })
      })

      gsap.utils.toArray('[data-ani-image]').forEach((image, index) => {
        gsap.fromTo(
          image,
          {
            scale: 1.16,
            xPercent: index % 2 ? -5 : 5,
            yPercent: 12,
            rotate: index % 2 ? -4 : 4,
            filter: 'blur(11px) saturate(70%)',
            clipPath: 'inset(16% 12% 20% 13% round 24px)',
          },
          {
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            filter: 'blur(0px) saturate(100%)',
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: 1.25,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        )

        gsap.to(image, {
          yPercent: index % 2 ? -6 : 6,
          xPercent: index % 3 ? 2 : -2,
          rotate: index % 2 ? -1 : 1,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        })
      })

      gsap.utils.toArray('[data-slot-chip]').forEach((chip, index) => {
        gsap.to(chip, {
          y: index % 2 ? -7 : 7,
          duration: 2.4 + (index % 4) * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-[#eae8e2] text-[#171b16]">
      <main className="mx-auto w-full px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <section className="relative overflow-hidden rounded-[1.8rem] border border-[#d8cebf]">
          <img
            data-ani-image
            data-booking-hero-image
            src={spa08}
            alt="Spa booking ambience"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            data-booking-overlay
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(13,22,16,0.9)_12%,rgba(13,22,16,0.45)_49%,rgba(13,22,16,0.72)_100%)]"
          />

          <TopNav />
          <div className="relative z-10 flex min-h-[22rem] flex-col justify-between px-5 pb-5 pt-24 sm:min-h-[25rem] sm:px-7 sm:pb-7 sm:pt-28">
            <img data-ani-image src={wordmark} alt="Evenana" className="h-10 w-auto sm:h-12" />

            <div className="max-w-[36rem] space-y-3">
              <h1 className="text-[clamp(2.1rem,4.8vw,4.4rem)] leading-[0.92] text-[#f4efe3]">
                <span data-booking-title-line className="block">
                  Book Your
                </span>
                <span data-booking-title-line className="block font-serif italic">
                  Wellness Session
                </span>
              </h1>
              <p data-booking-copy className="max-w-[25rem] text-[0.88rem] leading-[1.62] text-[#e9e1d2]">
                Select your treatment, preferred therapist, and ideal time slot. We will confirm your reservation
                quickly with personalized preparation notes.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  data-booking-cta
                  to="/treatments"
                  className="rounded-full border border-[#eee7da]/65 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#f3ede0] transition hover:bg-[#f2ebde]/10"
                >
                  Explore Treatments
                </Link>
                <Link
                  data-booking-cta
                  to="/"
                  className="rounded-full border border-[#eee7da]/65 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#f3ede0] transition hover:bg-[#f2ebde]/10"
                >
                  Back Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section data-booking-section className="grid gap-6 py-8 lg:grid-cols-[1.03fr_0.97fr] lg:py-10">
          <div className="rounded-[1.4rem] border border-[#d8cebf] bg-[#f8f4ec] p-5 sm:p-6">
            <h2 className="text-[1.82rem] leading-[1.08] text-[#151a14] sm:text-[2.3rem]">
              Appointment <span className="font-serif italic">Details</span>
            </h2>

            <form className="mt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="date"
                  className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]"
                />
                <input
                  type="time"
                  className="h-11 rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]"
                />
              </div>
              <select className="h-11 w-full rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]">
                <option>Select service</option>
                <option>Deep Tissue Massage</option>
                <option>Swedish Relaxation</option>
                <option>Hot Stone Therapy</option>
                <option>Head & Neck Reboot</option>
              </select>
              <select className="h-11 w-full rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]">
                <option>Select therapist preference</option>
                <option>No preference</option>
                <option>Female therapist</option>
                <option>Male therapist</option>
              </select>
              <textarea
                rows={3}
                placeholder="Health notes or preferences"
                className="w-full rounded-xl border border-[#d3c8b7] bg-[#fffdf8] px-3 py-2 text-[0.82rem] text-[#232721] outline-none transition focus:border-[#223024]"
              />
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#1d261e] text-[0.73rem] font-semibold uppercase tracking-[0.14em] text-[#f3ede2] transition hover:bg-[#141c15]"
              >
                Confirm Reservation
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-[1.25rem] border border-[#d8cebf]">
                <img data-ani-image src={spa01} alt="Hot stone ritual" className="h-44 w-full object-cover" />
              </figure>
              <figure className="overflow-hidden rounded-[1.25rem] border border-[#d8cebf]">
                <img data-ani-image src={spa04} alt="Aromatherapy oil" className="h-44 w-full object-cover" />
              </figure>
            </div>

            <article className="rounded-[1.3rem] border border-[#d7cebf] bg-[#f8f4ec] p-5">
              <h3 className="text-[1.35rem] leading-tight text-[#1b201a] sm:text-[1.55rem]">Available Time Slots</h3>
              <div className="mt-4 space-y-4">
                {slotGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[0.73rem] uppercase tracking-[0.14em] text-[#5a5449]">{group.label}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.slots.map((slot) => (
                        <button
                          key={slot}
                          data-slot-chip
                          type="button"
                          className="rounded-full border border-[#cfc3b0] bg-[#fffcf7] px-3 py-1.5 text-[0.74rem] font-medium text-[#232721] transition hover:border-[#1f2b20]"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section data-booking-section className="rounded-[1.45rem] border border-[#d8cebf] bg-[#f8f4ec] p-5 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <figure className="overflow-hidden rounded-[1.2rem] border border-[#d7cebf]">
              <img data-ani-image src={spa07} alt="Massage preparation" className="h-full min-h-[16rem] w-full object-cover" />
            </figure>

            <div>
              <h3 className="text-[1.75rem] leading-[1.08] text-[#161b15] sm:text-[2.15rem]">
                Before You Arrive <span className="font-serif italic">What To Expect</span>
              </h3>
              <p className="mt-3 text-[0.82rem] leading-[1.68] text-[#4f4a41]">
                Your session starts with a short wellness consultation, followed by treatment customization and a
                full-body comfort sequence tailored to your goals.
              </p>

              <ul className="mt-4 space-y-2">
                {bookingPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-[0.8rem] leading-[1.56] text-[#2e332c]">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1e2a1f]" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <figure className="overflow-hidden rounded-[1rem] border border-[#d7cebf]">
                  <img data-ani-image src={spa12} alt="Spa interior" className="h-36 w-full object-cover" />
                </figure>
                <figure className="overflow-hidden rounded-[1rem] border border-[#d7cebf]">
                  <img data-ani-image src={spa03} alt="Calming tools" className="h-36 w-full object-cover" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
