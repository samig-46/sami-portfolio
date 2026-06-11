'use client'
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion'
import Marquee from '@/components/common/Marquee'

interface SectionMarqueeProps {
  text: string
  reverse?: boolean
}

export default function SectionMarquee({ text, reverse = false }: SectionMarqueeProps) {
  // Skew the strip based on scroll velocity for a kinetic, reactive feel
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 })
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [-4, 4])

  return (
    <div className="relative py-10 lg:py-14 overflow-hidden select-none bg-[#0A0F1A]" aria-hidden>
      <motion.div style={{ skewX }}>
        <Marquee duration={45} reverse={reverse} fadeEdges>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 pr-8">
              <span
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter whitespace-nowrap text-transparent uppercase"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.10)' }}
              >
                {text}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary/50 shrink-0" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </div>
  )
}
