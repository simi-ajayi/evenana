import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import wordmark from '../../assets/evenana_white_text.png'


export function FirstLoadScreen({ onComplete }) {
  const panelRef = useRef(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.()
      return undefined
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          onComplete?.()
        },
      })

      intro
        .fromTo('[data-loader-glow]', { opacity: 0.45, scale: 0.92 }, { opacity: 1, scale: 1.08, duration: 0.85 })
        .from('[data-loader-char]', { opacity: 0, y: 28, stagger: 0.065, duration: 0.5 }, 0.06)
        .to('[data-loader-cursor]', { opacity: 0, repeat: 5, yoyo: true, duration: 0.11, ease: 'none' }, 0.18)
        .to('[data-loader-wordmark-mask]', { width: '100%', duration: 1.1, ease: 'steps(8)' }, 0.28)
        .to('[data-loader-panel]', { autoAlpha: 0, duration: 0.56, ease: 'power2.inOut' }, '+=0.15')
    }, panelRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={panelRef} data-loader-panel className="fixed inset-0 z-[120] flex items-center justify-center bg-[#101a13]">
      <div
        data-loader-glow
        className="absolute w-full inset-0 bg-[radial-gradient(circle_at_center,rgba(54,82,61,0.64),rgba(16,26,19,0.94)_58%)]"
      />
      <div className="relative z-10 flex flex-col mx-auto texts-center items-center gap-4 px-6 text-[#f4eee2]">
        <p className="font-body text-2xl mx-auto text-center uppercase tracking-[0.2em] text-[#d6cfbf]">Preparing Your Sanctuary</p>

        <div className="relative mt-1 w-[80vw] md:w-[40vw]">
          <img src={wordmark} alt="Evenana" className="w-full opacity-25" />
          <div
            data-loader-wordmark-mask
            className="absolute inset-y-0 left-0 w-0 overflow-hidden border-r border-[#f4eee2]/95"
          >
            <img src={wordmark} alt="Evenana" className="md:w-[40vw] w-[80vw] max-w-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
