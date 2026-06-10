'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import StatCounter from '@/components/ui/StatCounter'
import MagneticButton from '@/components/common/MagneticButton'

const GlobeScene = dynamic(() => import('@/components/three/GlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border border-brand-secondary/20 animate-pulse" />
    </div>
  ),
})

const stats = [
  { value: 45, suffix: '+', label: 'Projects Delivered' },
  { value: 8, suffix: '+', label: 'Industries Served' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0F1A]"
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(138,38,53,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,38,53,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-primary/[0.08] via-transparent to-transparent" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0F1A] to-transparent z-10" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-16"
      >
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="inline-flex items-center gap-2.5 self-start mb-8"
            >
              <div className="flex items-center gap-2 h-7 px-3 rounded-full border border-green-500/25 bg-green-500/[0.08]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Available for Projects</span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">I Design,</span>
              <br />
              <span className="text-white">Build &amp; </span>
              <span className="relative">
                <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                  Scale
                </span>
                {/* Underline glow */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 3.2 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-accent origin-left"
                />
              </span>
              <br />
              <span className="text-white">Digital</span>{' '}
              <span className="text-brand-muted/60">Experiences.</span>
            </motion.h1>

            {/* Typewriter subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="text-brand-muted text-lg mb-3 min-h-[28px]"
            >
              <TypeAnimation
                sequence={[
                  3200,
                  'UI/UX Designer & Frontend Engineer',
                  2000,
                  'WordPress & CMS Specialist',
                  2000,
                  'Technical SEO & Growth Expert',
                  2000,
                  'Business Automation Consultant',
                  2000,
                  'AI Product Designer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-brand-secondary font-medium"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.0 }}
              className="text-brand-muted/80 text-base leading-relaxed max-w-lg mb-10"
            >
              From UI/UX design and frontend engineering to SEO, CRM automation, and
              AI-powered solutions — I build complete digital products that scale.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.1 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <MagneticButton>
                <motion.button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-2.5 h-12 px-7 rounded-xl font-medium text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-glow transition-shadow duration-300 overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                    whileHover={{ translateX: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">View Projects</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </MagneticButton>

              <MagneticButton>
                <motion.button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2.5 h-12 px-7 rounded-xl font-medium text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Let&apos;s Work Together
                </motion.button>
              </MagneticButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.3 }}
              className="flex items-center gap-6 text-brand-muted/50 text-xs"
            >
              {['Startups', 'Enterprises', 'NGOs', 'SaaS'].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-brand-secondary/50" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.7, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative aspect-square max-w-[560px] w-full mx-auto lg:mx-0"
          >
            {/* Outer glow rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full border border-brand-secondary/10 animate-spin-slow" />
              <div className="absolute w-[70%] h-[70%] rounded-full border border-brand-primary/15 animate-spin-reverse" />
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-brand-primary/10 via-transparent to-transparent" />
            </div>
            <GlobeScene />

            {/* Floating skill badges */}
            {[
              { label: 'UI/UX', position: 'top-6 left-6', delay: 3.2 },
              { label: 'Next.js', position: 'top-1/4 -right-4', delay: 3.4 },
              { label: 'SEO', position: 'bottom-1/4 -left-4', delay: 3.6 },
              { label: 'AI', position: 'bottom-8 right-10', delay: 3.8 },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.delay, duration: 0.5 }}
                className={`absolute ${badge.position} px-3 py-1.5 rounded-xl border border-brand-secondary/25 bg-[#0A0F1A]/80 backdrop-blur-md text-white text-xs font-medium shadow-glow-sm animate-float`}
              >
                {badge.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/[0.06]"
        >
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              className="text-left"
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-brand-muted/50 text-xs tracking-widest uppercase hover:text-brand-muted transition-colors"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  )
}
