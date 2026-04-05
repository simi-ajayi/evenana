import { motion } from 'framer-motion'


const defaultEase = [0.16, 1, 0.3, 1]
export const FADE_IN_DURATION_SCALE = 13

export function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 2.55,
  y = 0,
  scaleFrom = 0.96,
  fade = true,
  triggerOnScroll = true,
  viewportAmount = 0.2,
  viewportOnce = true,
}) {
  const Component = motion[as] ?? motion.div
  // Scale animation pacing: slightly slower for a calmer entrance.
  const resolvedDuration = duration * FADE_IN_DURATION_SCALE
  const initialState = { opacity: fade ? 0 : 1, y, scale: scaleFrom }
  const finalState = { opacity: 1, y: 0, scale: 1 }

  return (
    <Component
      className={className}
      style={{
        ...style,
        willChange: 'opacity, transform',
        transformOrigin: 'center',
      }}
      initial={initialState}
      animate={triggerOnScroll ? undefined : finalState}
      whileInView={triggerOnScroll ? finalState : undefined}
      viewport={triggerOnScroll ? { once: viewportOnce, amount: viewportAmount } : undefined}
      transition={{ duration: resolvedDuration, delay, ease: defaultEase }}
    >
      {children}
    </Component>
  )
}
