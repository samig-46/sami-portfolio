'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Palette, Code2, Globe, Search, Workflow, Brain } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { skillCategories } from '@/data/skills'
import { useInView } from 'react-intersection-observer'

const SkillSphere = dynamic(() => import('@/components/three/SkillSphere'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
})

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Palette, Code2, Globe, Search, Workflow, Brain,
}

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-brand-light/80">{name}</span>
        <span className="text-xs text-brand-secondary font-mono">{level}%</span>
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
          description="A full-stack skill set spanning design, engineering, SEO, automation, and AI — developed across 3+ years of client work."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                    className={`flex items-center gap-2 h-9 px-4 rounded-xl text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-primary text-white border border-brand-secondary/50 shadow-glow-sm'
                        : 'text-brand-muted border border-white/[0.07] bg-white/[0.03] hover:text-white hover:border-white/15'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon size={13} />
                    {cat.title}
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
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    {(() => {
                      const Icon = iconMap[current.icon] || Code2
                      return (
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                          <Icon size={16} className="text-brand-secondary" />
                        </div>
                      )
                    })()}
                    <div>
                      <h3 className="text-white font-semibold">{current.title}</h3>
                      <p className="text-brand-muted text-xs">{current.skills.length} skills</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {current.skills.map((skill, i) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            {/* Additional tools marquee */}
            <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-brand-muted/50 text-xs mb-3 tracking-widest uppercase">Also proficient in</p>
              <div className="flex gap-2 flex-wrap">
                {['Git', 'Docker', 'Vercel', 'Netlify', 'Figma', 'Notion', 'Linear', 'Jira', 'AWS S3', 'Cloudflare'].map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.04] border border-white/[0.06] text-brand-muted/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — 3D skill sphere */}
          <div className="relative">
            <div className="aspect-square w-full max-w-[480px] mx-auto">
              {/* Glow background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-brand-primary/10 blur-3xl" />
              </div>
              <SkillSphere />
            </div>

            {/* Radar chart placeholder */}
            <div className="mt-6">
              <GlassCard className="p-6">
                <h4 className="text-white text-sm font-semibold mb-4">Capability Overview</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Design', value: 92 },
                    { label: 'Frontend', value: 93 },
                    { label: 'WordPress', value: 95 },
                    { label: 'SEO', value: 91 },
                    { label: 'Automation', value: 87 },
                    { label: 'AI/ML', value: 83 },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                          <motion.circle
                            cx="18" cy="18" r="15.9"
                            fill="none"
                            stroke="#8A2635"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={`${item.value} 100`}
                            initial={{ strokeDasharray: '0 100' }}
                            whileInView={{ strokeDasharray: `${item.value} 100` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-brand-secondary">{item.value}</span>
                        </div>
                      </div>
                      <span className="text-brand-muted text-[10px]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
