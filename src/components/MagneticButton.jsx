import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Wraps children with a magnetic pull effect.
 * The element subtly moves toward the cursor when hovering within range.
 */
export default function MagneticButton({ children, className = '', strength = 0.35, radius = 80, as = 'div', ...props }) {
  const ref = useRef(null)
  const canHoverRef = useRef(true)
  const xValue = useMotionValue(0)
  const yValue = useMotionValue(0)
  const x = useSpring(xValue, { stiffness: 280, damping: 18, mass: 0.4 })
  const y = useSpring(yValue, { stiffness: 280, damping: 18, mass: 0.4 })

  useEffect(() => {
    canHoverRef.current = window.matchMedia('(hover: hover)').matches
  }, [])

  const handleMouseMove = (e) => {
    if (!canHoverRef.current || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)

    if (distance < radius) {
      xValue.set(distX * strength)
      yValue.set(distY * strength)
    }
  }

  const handleMouseLeave = () => {
    xValue.set(0)
    yValue.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: 'inline-block', x, y, willChange: 'transform' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
