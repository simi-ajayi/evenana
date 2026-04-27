import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_IMAGE_MOTION_BLOCKERS = '[data-gallery-section], [data-services-section]'

export function useHomePageMotion(pageRef, options = {}) {
  const { imageMotionBlockers = DEFAULT_IMAGE_MOTION_BLOCKERS, enabled = true } = options

  useLayoutEffect(() => {
    if (!enabled) return undefined
    if (typeof window === 'undefined') return undefined

    const ctx = gsap.context(() => {
      const isImageMotionDisabledElement = (element) =>
        element instanceof Element &&
        Boolean(imageMotionBlockers) &&
        element.closest(imageMotionBlockers)

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

        if (image instanceof Element && image.matches('[data-ani-hero-image]')) {
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
      })

      gsap.utils.toArray('[data-float]').forEach((card, index) => {
        if (isImageMotionDisabledElement(card)) {
          return
        }

        gsap.from(card, {
          opacity: 0,
          y: index % 2 ? 26 : 22,
          x: index % 3 ? 4 : -4,
          rotate: index % 2 ? -2 : 2,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [enabled, imageMotionBlockers, pageRef])
}
