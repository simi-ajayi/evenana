import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HomeAboutSection,
  HomeBenefitsSection,
  HomeBookingSection,
  HomeGallerySection,
  HomeHeroSection,
  HomeMetricsSection,
  HomePartnerSection,
  HomeTestimonialsSection,
  HomeTopServicesSection,
} from '../components/home/HomeSections'

gsap.registerPlugin(ScrollTrigger)

export function HomePage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const isImageMotionDisabledElement = (element) =>
        element instanceof Element &&
        element.closest('[data-gallery-section], [data-services-section]')

      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })

      intro
        .from('[data-hero-overlay]', { opacity: 0, duration: 1.2 })
        .from(
          '[data-hero-badge]',
          {
            y: -14,
            opacity: 0,
            duration: 0.75,
          },
          0.15,
        )
        .from(
          '[data-hero-title-line]',
          {
            yPercent: 125,
            rotateX: -88,
            transformOrigin: '0% 100%',
            opacity: 0,
            duration: 1.1,
            stagger: 0.1,
          },
          0.25,
        )
        .from('[data-hero-copy]', { y: 26, opacity: 0, duration: 0.9 }, 0.55)
        .from('[data-hero-cta]', { y: 22, opacity: 0, duration: 0.9, stagger: 0.06 }, 0.68)
        .from(
          '[data-ani-hero-image]',
          {
            scale: 1.25,
            rotate: 2.8,
            filter: 'brightness(0.58)',
            duration: 1.5,
          },
          0,
        )

      gsap.utils.toArray('[data-ani-section]').forEach((section, index) => {
        if (section instanceof Element && section.matches('[data-gallery-section]')) {
          return
        }

        gsap.from(section, {
          opacity: 0,
          y: 72,
          rotateX: index % 2 ? -6 : 6,
          transformOrigin: '50% 100%',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true,
          },
        })

        const heading = section.querySelector('[data-ani-heading]')
        if (heading) {
          gsap.from(heading, {
            clipPath: 'inset(0 0 100% 0)',
            yPercent: 100,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              once: true,
            },
          })
        }

        const copy = section.querySelectorAll('[data-ani-copy]')
        if (copy.length) {
          gsap.from(copy, {
            y: 18,
            opacity: 0,
            stagger: 0.06,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
          })
        }
      })

      gsap.utils.toArray('[data-ani-image]').forEach((image, index) => {
        if (isImageMotionDisabledElement(image)) {
          return
        }

        gsap.fromTo(
          image,
          {
            scale: 1.18,
            yPercent: 12,
            xPercent: index % 2 ? -4 : 4,
            rotate: index % 2 ? -5 : 5,
            clipPath: 'inset(14% 12% 24% 13% round 30px)',
            filter: 'blur(12px) saturate(72%)',
          },
          {
            scale: 1,
            yPercent: 0,
            xPercent: 0,
            rotate: 0,
            clipPath: 'inset(0% 0% 0% 0% round 30px)',
            filter: 'blur(0px) saturate(100%)',
            ease: 'power4.out',
            duration: 1.35,
            scrollTrigger: {
              trigger: image,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        )

        gsap.to(image, {
          yPercent: index % 3 === 0 ? -8 : 8,
          xPercent: index % 4 === 0 ? -1.8 : 1.8,
          rotate: index % 2 ? -1.25 : 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.35,
          },
        })
      })

      gsap.utils.toArray('[data-float]').forEach((card, index) => {
        if (isImageMotionDisabledElement(card)) {
          return
        }

        gsap.to(card, {
          y: index % 2 ? -13 : 13,
          x: index % 3 ? 8 : -8,
          rotate: index % 2 ? -1.8 : 1.8,
          duration: 2.6 + (index % 4) * 0.45,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-[#eae8e2] text-[#151912]">
      <main className="md:mx-auto mx-0 w-full ">
        <div className=" sm:px-5 sm:py-5 lg:px-8 lg:py-7 ">
          <HomeHeroSection />
        </div>{" "}
        <HomeAboutSection />
        <HomeTopServicesSection />
        <HomeMetricsSection />
        <HomeGallerySection />
        <HomePartnerSection />
        <HomeBenefitsSection />
        <HomeTestimonialsSection />
        {/* <HomeBookingSection /> */}
      </main>
    </div>
  );
}
