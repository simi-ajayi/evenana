import { useRef } from 'react'
import { Masonry } from 'antd'
import spa01 from '../assets/spa/spa-01.jpg'
import spa03 from '../assets/spa/spa-03.jpg'
import spa04 from '../assets/spa/spa-04.jpg'
import spa07 from '../assets/spa/spa-07.jpg'
import spa08 from '../assets/spa/spa-08.jpg'
import spa12 from '../assets/spa/spa-12.jpg'
import { PageHero } from '../components/site/PageHero'
import { useHomePageMotion } from '../hooks/useHomePageMotion'

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
  useHomePageMotion(pageRef, { imageMotionBlockers: null })

  const hero = {
    label: 'Bookings',
    title: 'Book Your Wellness Session',
    description:
      'Select your treatment, preferred therapist, and ideal time slot. We confirm quickly with personalized preparation notes.',
    image: spa08,
    primaryCta: {
      to: '/treatments',
      label: 'Explore Treatments',
    },
    secondaryCta: {
      to: '/',
      label: 'Back Home',
    },
  }

  const bookingGalleryItems = [
    {
      key: 'booking-image-main',
      children: (
        <figure className="overflow-hidden rounded-[1.6rem] bg-[#f5eefb] shadow-[0_20px_48px_-36px_rgba(28,33,25,0.62)]">
          <img
            data-ani-image
            src={spa07}
            alt="Massage preparation"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-[23rem] w-full object-cover"
          />
        </figure>
      ),
    },
    {
      key: 'booking-copy',
      children: (
        <article className="rounded-[1.5rem] bg-[#f7f0fc] p-5 shadow-[0_18px_42px_-32px_rgba(29,35,26,0.5)] sm:p-6">
          <p data-ani-copy className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5b5549]">
            Before You Arrive
          </p>
          <h3 data-ani-heading className="mt-2 text-[1.7rem] leading-[1.08] text-[#161b15] sm:text-[2rem]">
            What To Expect
          </h3>
          <p data-ani-copy className="mt-3 text-[0.88rem] leading-[1.7] text-[#4f4a41]">
            Your session starts with a short wellness consultation, followed by treatment customization and a full-body
            comfort sequence tailored to your goals.
          </p>
          <ul className="mt-4 space-y-2">
            {bookingPerks.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-[0.82rem] leading-[1.58] text-[#2e332c]">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#6e4d87]" />
                <span data-ani-copy>{perk}</span>
              </li>
            ))}
          </ul>
        </article>
      ),
    },
    {
      key: 'booking-image-side-01',
      children: (
        <figure className="overflow-hidden rounded-[1.3rem] bg-[#f5eefb] shadow-[0_14px_34px_-28px_rgba(28,33,25,0.54)]">
          <img
            data-ani-image
            src={spa01}
            alt="Hot stone ritual"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-[15rem] w-full object-cover"
          />
        </figure>
      ),
    },
    {
      key: 'booking-image-side-02',
      children: (
        <figure className="overflow-hidden rounded-[1.3rem] bg-[#f5eefb] shadow-[0_14px_34px_-28px_rgba(28,33,25,0.54)]">
          <img
            data-ani-image
            src={spa12}
            alt="Spa interior"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-[15rem] w-full object-cover"
          />
        </figure>
      ),
    },
    {
      key: 'booking-image-side-03',
      children: (
        <figure className="overflow-hidden rounded-[1.3rem] bg-[#f5eefb] shadow-[0_14px_34px_-28px_rgba(28,33,25,0.54)]">
          <img
            data-ani-image
            src={spa04}
            alt="Aromatherapy oil"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-[15rem] w-full object-cover"
          />
        </figure>
      ),
    },
    {
      key: 'booking-image-side-04',
      children: (
        <figure className="overflow-hidden rounded-[1.3rem] bg-[#f5eefb] shadow-[0_14px_34px_-28px_rgba(28,33,25,0.54)]">
          <img
            data-ani-image
            src={spa03}
            alt="Calming spa tools"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-[15rem] w-full object-cover"
          />
        </figure>
      ),
    },
  ]

  return (
    <div ref={pageRef} className="min-h-screen space-y-8 pb-10 text-[#171b16] md:space-y-10 md:pb-14">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={hero} />
      </div>

      <section data-ani-section className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
        <div className="grid gap-6 lg:grid-cols-[1.03fr_0.97fr]">
          <article className="rounded-[1.6rem] bg-[#f5eefb] p-5 shadow-[0_24px_50px_-38px_rgba(22,28,20,0.62)] sm:p-6">
            <p data-ani-copy className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5e574c]">
              Appointment Details
            </p>
            <h2 data-ani-heading className="mt-2 text-[1.86rem] leading-[1.08] text-[#151a14] sm:text-[2.3rem]">
              Plan Your Visit
            </h2>

            <form className="mt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="h-11 rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="h-11 rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="h-11 rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="h-11 rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="date"
                  className="h-11 rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]"
                />
                <input
                  type="time"
                  className="h-11 rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]"
                />
              </div>
              <select className="h-11 w-full rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]">
                <option>Select service</option>
                <option>Deep Tissue Massage</option>
                <option>Swedish Relaxation</option>
                <option>Hot Stone Therapy</option>
                <option>Head & Neck Reboot</option>
              </select>
              <select className="h-11 w-full rounded-xl bg-[#fffcff] px-3 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]">
                <option>Select therapist preference</option>
                <option>No preference</option>
                <option>Female therapist</option>
                <option>Male therapist</option>
              </select>
              <textarea
                rows={3}
                placeholder="Health notes or preferences"
                className="w-full rounded-xl bg-[#fffcff] px-3 py-2 text-[0.82rem] text-[#232721] outline-none ring-1 ring-[#e2d5f0] transition focus:ring-[#6e4d87]"
              />
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#6e4d87] text-[0.73rem] font-semibold uppercase tracking-[0.14em] text-[#efe5f8] transition hover:bg-[#4f365f]"
              >
                Confirm Reservation
              </button>
            </form>
          </article>

          <article className="rounded-[1.6rem] bg-[#f7f0fc] p-5 shadow-[0_20px_44px_-36px_rgba(24,29,21,0.56)] sm:p-6">
            <h3 data-ani-heading className="text-[1.46rem] leading-tight text-[#1b201a] sm:text-[1.7rem]">
              Available Time Slots
            </h3>
            <div className="mt-4 space-y-4">
              {slotGroups.map((group, groupIndex) => (
                <div key={group.label}>
                  <p data-ani-copy className="text-[0.73rem] uppercase tracking-[0.14em] text-[#5a5449]">
                    {group.label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.slots.map((slot, slotIndex) => (
                      <button
                        key={slot}
                        data-float={groupIndex % 2 === 0 && slotIndex % 2 === 0 ? 'true' : undefined}
                        type="button"
                        className="rounded-full bg-[#fffcff] px-3 py-1.5 text-[0.74rem] font-medium text-[#232721] ring-1 ring-[#d8c9e8] transition hover:ring-[#6e4d87]"
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

      <section data-ani-section className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0">
        <Masonry
          fresh
          columns={{ xs: 1, sm: 2, lg: 3 }}
          gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
          items={bookingGalleryItems}
        />
      </section>
    </div>
  )
}
