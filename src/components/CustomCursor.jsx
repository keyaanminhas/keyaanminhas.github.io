import { useEffect, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const size = useMotionValue(12)
  const opacity = useMotionValue(0)
  const dotOpacity = useMotionValue(1)
  const ringOpacity = useMotionValue(0)

  const springConfig = useMemo(
    () => ({ stiffness: 650, damping: 34, mass: 0.22 }),
    [],
  )
  const smoothX = useSpring(x, springConfig)
  const smoothY = useSpring(y, springConfig)
  const smoothSize = useSpring(size, springConfig)
  const smoothOpacity = useSpring(opacity, { stiffness: 400, damping: 30 })
  const smoothDotOpacity = useSpring(dotOpacity, { stiffness: 500, damping: 35 })
  const smoothRingOpacity = useSpring(ringOpacity, { stiffness: 500, damping: 35 })

  const isFinePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  useEffect(() => {
    if (!isFinePointer) return undefined

    const handleMouseMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      opacity.set(1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, [data-hover]')
      if (!target) return
      size.set(40)
      dotOpacity.set(0)
      ringOpacity.set(1)
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, [data-hover]')
      if (!target) return
      size.set(12)
      dotOpacity.set(1)
      ringOpacity.set(0)
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [dotOpacity, isFinePointer, opacity, ringOpacity, size, x, y])

  // Hide on touch/non-hover devices
  if (!isFinePointer) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full will-change-transform"
      transformTemplate={(_, generated) => `${generated} translate(-50%, -50%)`}
      style={{
        x: smoothX,
        y: smoothY,
        width: smoothSize,
        height: smoothSize,
        opacity: smoothOpacity,
        mixBlendMode: 'screen',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#00d4ff_0%,rgba(0,212,255,0.6)_100%)] shadow-[0_0_15px_rgba(0,212,255,0.4),0_0_30px_rgba(0,212,255,0.15)]"
        style={{ opacity: smoothDotOpacity }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-neon-cyan/40 bg-[radial-gradient(circle,rgba(0,212,255,0.25)_0%,transparent_70%)] shadow-[0_0_30px_rgba(0,212,255,0.3),0_0_60px_rgba(0,212,255,0.1)]"
        style={{ opacity: smoothRingOpacity }}
      />
    </motion.div>
  )
}
