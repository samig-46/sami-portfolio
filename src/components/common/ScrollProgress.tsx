'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => setScrolled(v > 0.02))
    return unsub
  }, [scrollYProgress])

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9000] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #6D1F2A, #8A2635, #C0392B)',
        }}
      />

      {/* Scroll-to-top button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full border border-brand-primary/40 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center text-brand-muted hover:border-brand-secondary hover:text-white transition-all duration-300 shadow-glow-sm"
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </>
  )
}
