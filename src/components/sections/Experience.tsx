'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Code2, Palette, Cpu } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { experiences } from '@/data/experience'

const typeConfig = {
  'full-time': { label: 'Full-time', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  freelance: { label: 'Freelance', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  internship: { label: 'Internship', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  contract: { label: 'Contract', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
}

const typeIcons = {
  'full-time': Briefcase,
  freelance: Code2,
  internship: Palette,
  contract: Cpu,
}

function ExperienceItem({ exp, index }: { exp: (typeof experiences)[number]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const config = typeConfig[exp.type]
  const Icon = typeIcons[exp.type]
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`relative flex gap-6 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:w-1/2 ${isEven ? 'lg:pr-12 lg:self-start' : 'lg:pl-12 lg:self-start lg:ml-auto'}`}
    >
      {/* Timeline dot (hidden on small screens) */}
      <div className={`hidden lg:flex absolute ${isEven ? '-right-3' : '-left-3'} top-7 flex-col items-center z-10`}>
        <div className="w-6 h-6 rounded-full bg-brand-secondary border-2 border-[#0A0F1A] shadow-glow-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>

      <GlassCard className="p-6 w-full group hover:border-brand-secondary/20 transition-colors duration-300">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-brand-secondary" />
            </div>
            <div>
              <h3 className="text-white font-semibold leading-tight">{exp.role}</h3>
              <p className="text-brand-secondary text-sm">{exp.company}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-brand-muted text-xs font-mono">{exp.period}</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${config.bg} ${config.color} mt-1`}>
              {config.label}
            </span>
          </div>
        </div>

        <p className="text-brand-muted text-sm leading-relaxed mb-4">{exp.description}</p>

        <div className="space-y-2 mb-4">
          {exp.achievements.slice(0, 2).map((achievement, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary shrink-0 mt-2" />
              <p className="text-brand-muted/80 text-xs leading-relaxed">{achievement}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
          {exp.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[10px] rounded bg-white/[0.04] text-brand-muted/70 border border-white/[0.05]">
              {tech}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-36 bg-[#0A0F1A]">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-secondary/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Experience"
          title="The Journey"
          titleHighlight="So Far"
          description="From first freelance project to enterprise digital product engineering — a timeline of growth, learning, and results."
          align="center"
          className="mb-16"
        />

        <div className="relative flex flex-col gap-8 lg:gap-12">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
