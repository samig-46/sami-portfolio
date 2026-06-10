'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [mounted, setMounted] = useState(false)

  const springConfig = { damping: 25, stiffness: 700 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const trailConfig = { damping: 20, stiffness: 200 }
  const trailX = useSpring(cursorX, trailConfig)
  const trailY = useSpring(cursorY, trailConfig)

  useEffect(() => {
    setMounted(true)

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [data-cursor="pointer"], input, textarea, select')) {
        setIsHovering(true)
      }
    }

    const handleLeave = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [data-cursor="pointer"], input, textarea, select')) {
        setIsHovering(false)
      }
    }

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout', handleLeave)
    document.addEventListener('mousedown', handleDown)
    document.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout', handleLeave)
      document.removeEventListener('mousedown', handleDown)
      document.removeEventListener('mouseup', handleUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-white/80"
          animate={{
            width: isHovering ? 48 : isClicking ? 20 : 32,
            height: isHovering ? 48 : isClicking ? 20 : 32,
            opacity: isHovering ? 0.6 : 0.4,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-brand-secondary"
          animate={{
            width: isClicking ? 6 : isHovering ? 8 : 5,
            height: isClicking ? 6 : isHovering ? 8 : 5,
            opacity: isHovering ? 1 : 0.9,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
