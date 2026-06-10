'use client'
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
  glow?: boolean
  onClick?: () => void
}

export default function GlassCard({ children, className, tilt = true, glow = true, onClick }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 })

  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  // Precompute background motion template (avoids hook in JSX)
  const glowBackground = useMotionTemplate`radial-gradient(200px circle at ${glowX}% ${glowY}%, rgba(138,38,53,0.12), transparent 70%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : {}}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.06]',
        'bg-white/[0.03] backdrop-blur-sm',
        'shadow-glass hover:shadow-glass-hover',
        'transition-shadow duration-300',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Glow spotlight */}
      {glow && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 hover:opacity-100"
          style={{ background: glowBackground }}
        />
      )}
      {children}
    </motion.div>
  )
}
