'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Palette, Code2, Globe, Search, Workflow, Brain } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import Marquee from '@/components/common/Marquee'
import { skillCategories, toolbelt } from '@/data/skills'
import { useInView } from 'react-intersection-observer'

const SkillSphere = dynamic(() => import('@/components/three/SkillSphere'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
})

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Palette, Code2, Globe, Search, Workflow, Brain,
}

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, level, {
      duration: 1.2,
      delay,
      ease: [0.43, 0.13, 0.23, 0.96],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, level, delay])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-brand-light/80">{name}</span>
        <span className="text-xs text-brand-secondary font-mono tabular-nums">{display}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const current = skillCategories.find((c) => c.id === activeCategory) || skillCategories[0]

  return (
    <section id="skills" className="relative py-24 lg:py-36 bg-[#0A0F1A]">
      <div className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills & Expertise"
          title="Tools I Master to"
          titleHighlight="Deliver Excellence"
          description="Design, engineering, SEO, automation, and AI — a focused skill set sharpened across 3+ years of client work."
          align="center"
          className="mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Category tabs + skill bars */}
          <div>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((cat) => {
                const Icon = iconMap[cat.icon] || Code2
                const isActive = cat.id === activeCategory
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative flex items-center gap-2 h-9 px-4 rounded-xl text-sm transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-brand-muted border border-white/[0.07] bg-white/[0.03] hover:text-white hover:border-white/15'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="skill-tab-pill"
                        className="absolute inset-0 rounded-xl bg-brand-primary border border-brand-secondary/50 shadow-glow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon size={13} className="relative z-10" />
                    <span className="relative z-10">{cat.title}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Skills */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    {(() => {
                      const Icon = iconMap[current.icon] || Code2
                      return (
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                          <Icon size={16} className="text-brand-secondary" />
                        </div>
                      )
                    })()}
                    <h3 className="text-white font-semibold">{current.title}</h3>
                  </div>
                  <div className="space-y-6">
                    {current.skills.map((skill, i) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.1} />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — 3D skill sphere */}
          <div className="relative">
            <div className="aspect-square w-full max-w-[480px] mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-brand-primary/10 blur-3xl" />
              </div>
              <SkillSphere />
            </div>
          </div>
        </div>

        {/* Toolbelt marquee */}
        <div className="mt-20">
          <p className="text-brand-muted/40 text-xs tracking-[0.3em] uppercase text-center mb-6">
            Daily toolbelt
          </p>
          <Marquee duration={35} pauseOnHover>
            {toolbelt.map((tool) => (
              <span
                key={tool}
                className="mx-3 px-5 py-2.5 text-sm rounded-xl bg-white/[0.03] border border-white/[0.06] text-brand-muted/80 whitespace-nowrap hover:text-white hover:border-brand-secondary/30 transition-colors"
              >
                {tool}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
