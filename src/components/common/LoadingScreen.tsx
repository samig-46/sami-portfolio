'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const steps = [
      { target: 30, delay: 100, duration: 400 },
      { target: 65, delay: 500, duration: 600 },
      { target: 90, delay: 1100, duration: 400 },
      { target: 100, delay: 1500, duration: 300 },
    ]

    const timers: ReturnType<typeof setTimeout>[] = []

    steps.forEach(({ target, delay, duration }) => {
      const t = setTimeout(() => {
        const start = Date.now()
        const from = progress
        const animate = () => {
          const elapsed = Date.now() - start
          const p = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setProgress(Math.round(from + (target - from) * eased))
          if (p < 1) requestAnimationFrame(animate)
        }
        animate()
      }, delay)
      timers.push(t)
    })

    const done = setTimeout(() => setDone(true), 2200)
    timers.push(done)

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0F1A]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(138,38,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(138,38,53,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Glow orb */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(138,38,53,0.2) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <div className="text-white font-bold text-2xl tracking-tight">Sami Ul Mubeen</div>
                <div className="text-brand-muted text-sm tracking-widest uppercase">Digital Product Engineer</div>
              </div>
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            className="relative z-10 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Track */}
            <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              {/* Shimmer */}
              <motion.div
                className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: [-32, 256] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-brand-muted text-xs tracking-widest uppercase">Loading</span>
              <span className="text-brand-secondary font-mono text-sm font-medium">{progress}%</span>
            </div>
          </motion.div>

          {/* Status text */}
          <motion.div
            className="absolute bottom-12 text-brand-muted/50 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Crafting your experience...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
