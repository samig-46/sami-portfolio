'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, Lightbulb, Palette, Code2, Zap, Cpu, TrendingUp } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Deep dive into your business, users, and goals. Competitive analysis, user research, and stakeholder interviews to define the real problem.',
    details: ['Stakeholder interviews', 'User research', 'Competitive analysis', 'Goal alignment'],
    icon: Search,
    color: '#6D1F2A',
  },
  {
    number: '02',
    title: 'Research',
    description: 'Data-informed insights that shape every decision. SEO opportunity mapping, user flow analysis, and technical feasibility assessment.',
    details: ['SEO opportunity audit', 'User journey mapping', 'Technical assessment', 'Content strategy'],
    icon: Lightbulb,
    color: '#7A2230',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Wireframes to pixel-perfect, user-tested prototypes. Every interaction designed with purpose, every screen optimized for conversion.',
    details: ['Wireframing', 'UI design', 'Prototyping', 'Usability testing'],
    icon: Palette,
    color: '#8A2635',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Clean, performant code that matches designs exactly. Accessibility baked in, Lighthouse scores optimized from day one.',
    details: ['Frontend development', 'CMS integration', 'API connections', 'Performance tuning'],
    icon: Code2,
    color: '#8A2635',
  },
  {
    number: '05',
    title: 'Optimize',
    description: 'Post-launch performance and SEO tuning. Core Web Vitals, structured data, and conversion rate optimization.',
    details: ['Core Web Vitals', 'Technical SEO', 'A/B testing', 'Analytics setup'],
    icon: Zap,
    color: '#7A2230',
  },
  {
    number: '06',
    title: 'Automate',
    description: 'Connect your tools, automate your workflows. CRM setup, email sequences, and operational automation that runs without you.',
    details: ['CRM configuration', 'Email automation', 'Workflow design', 'Lead capture'],
    icon: Cpu,
    color: '#6D1F2A',
  },
  {
    number: '07',
    title: 'Scale',
    description: 'Data-driven growth strategy. Monitor, analyze, iterate. Build systems that grow your business while you sleep.',
    details: ['Growth analytics', 'Continuous optimization', 'AI integration', 'Monthly reporting'],
    icon: TrendingUp,
    color: '#8A2635',
  },
]

function ProcessStep({ step, index }: { step: typeof steps[number]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative group"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-px -translate-x-1/2 z-0">
          <motion.div
            className="h-full origin-left"
            style={{ background: `linear-gradient(90deg, ${step.color}60, transparent)` }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center p-4">
        {/* Number + Icon */}
        <div className="relative mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 mx-auto border border-white/10 group-hover:border-brand-secondary/30 transition-colors duration-300"
            style={{ background: `${step.color}20` }}
          >
            <Icon size={22} className="text-brand-secondary" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0A0F1A] border border-brand-secondary/40 flex items-center justify-center">
            <span className="text-[9px] font-bold text-brand-secondary font-mono">{step.number}</span>
          </div>
        </div>

        <h3 className="text-white font-semibold mb-2">{step.title}</h3>
        <p className="text-brand-muted text-xs leading-relaxed mb-3 max-w-[160px]">{step.description}</p>

        {/* Details on hover */}
        <motion.div
          className="overflow-hidden"
          animate={{ height: 0, opacity: 0 }}
          whileHover={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="space-y-1 mt-2">
            {step.details.map((d) => (
              <li key={d} className="text-brand-muted/60 text-[10px] flex items-center justify-center gap-1">
                <div className="w-1 h-1 rounded-full bg-brand-secondary/50" />
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section ref={sectionRef} id="process" className="relative py-24 lg:py-36 bg-[#0D1220] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="My Process"
          title="How I Turn Ideas into"
          titleHighlight="Digital Success"
          description="A proven 7-step framework refined across 40+ projects. Each phase is intentional — from discovery to scale."
          align="center"
          className="mb-16"
        />

        {/* Animated progress line */}
        <div className="hidden lg:block relative h-1 bg-white/[0.04] rounded-full mb-4 mx-8">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: lineWidth,
              background: 'linear-gradient(90deg, #6D1F2A, #8A2635, #C0392B)',
            }}
          />
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {steps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          <h3 className="text-white font-semibold text-xl mb-2">Ready to Start Your Project?</h3>
          <p className="text-brand-muted text-sm mb-6">
            Let&apos;s go through the discovery phase together — no commitment required.
          </p>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 h-11 px-7 rounded-xl font-medium text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-glow transition-shadow text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Start with Discovery
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
