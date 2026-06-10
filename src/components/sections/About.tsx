'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Lightbulb, Code2, TrendingUp, Cpu } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'

const pillars = [
  {
    icon: Lightbulb,
    title: 'Design-First Thinking',
    description: 'Every project starts with deep user research and visual strategy before a single line of code is written.',
    color: '#8A2635',
  },
  {
    icon: Code2,
    title: 'Engineering Excellence',
    description: 'Production-ready code with 95+ Lighthouse scores, TypeScript, and modern best practices as the baseline.',
    color: '#6D1F2A',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Oriented SEO',
    description: 'Built for discoverability. Every website ships with technical SEO foundations that compound over time.',
    color: '#8A2635',
  },
  {
    icon: Cpu,
    title: 'Automation & AI',
    description: 'Connecting your tools, automating your workflows, and integrating AI where it genuinely moves the needle.',
    color: '#6D1F2A',
  },
]

const timeline = [
  { year: '2021', title: 'Started the Journey', desc: 'Began learning web development and design fundamentals' },
  { year: '2022', title: 'First Client Projects', desc: 'Delivered 10+ freelance projects across design and WordPress' },
  { year: '2023', title: 'SEO & Automation', desc: 'Expanded into technical SEO and business automation systems' },
  { year: '2024', title: 'AI & Enterprise Scale', desc: 'Building AI-powered products and enterprise digital solutions' },
]

function TimelineItem({ year, title, desc, index }: { year: string; title: string; desc: string; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex gap-6 group"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={inView ? { scale: [1, 1.3, 1] } : {}}
          transition={{ delay: index * 0.15 + 0.3 }}
          className="w-3 h-3 rounded-full bg-brand-secondary border-2 border-brand-primary/40 shrink-0 mt-1.5 group-hover:shadow-glow-sm transition-shadow"
        />
        {index < timeline.length - 1 && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-brand-secondary/40 to-transparent" />
        )}
      </div>
      {/* Content */}
      <div className="pb-8">
        <span className="text-brand-secondary text-xs font-mono font-bold tracking-widest">{year}</span>
        <h4 className="text-white font-semibold mt-1 mb-1">{title}</h4>
        <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-36 bg-[#0A0F1A] overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="Building Digital Products"
          titleHighlight="That Matter"
          description="I help startups, businesses, and enterprises transform their ideas into polished digital products that users love and search engines reward."
          align="center"
          className="mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Story */}
          <div>
            <motion.div
              style={{ y }}
              className="prose prose-invert max-w-none"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-brand-muted text-lg leading-relaxed mb-6"
              >
                I&apos;m Sami — a Digital Product Engineer who sits at the intersection of design,
                engineering, and growth. I don&apos;t just build websites. I architect complete
                digital experiences that serve real business goals.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-brand-muted text-base leading-relaxed mb-6"
              >
                My approach combines pixel-perfect UI/UX design with clean frontend engineering,
                performance-first WordPress development, data-driven SEO, and intelligent automation.
                The result? Products that look exceptional, load fast, rank well, and grow efficiently.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-muted text-base leading-relaxed mb-10"
              >
                I&apos;ve worked across healthcare, SaaS, e-commerce, NGOs, and enterprise tech —
                delivering solutions that range from AI-powered apps to conversion-optimized
                marketing sites that generate real pipeline.
              </motion.p>

              {/* Timeline */}
              <div>
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-secondary" />
                  The Journey
                </h3>
                {timeline.map((item, i) => (
                  <TimelineItem key={item.year} {...item} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full group hover:border-brand-secondary/20 transition-colors duration-300">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-shadow duration-300 group-hover:shadow-glow-sm"
                    style={{ background: `${pillar.color}20` }}
                  >
                    <pillar.icon size={20} style={{ color: pillar.color }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{pillar.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{pillar.description}</p>
                </GlassCard>
              </motion.div>
            ))}

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:col-span-2"
            >
              <GlassCard className="p-6 border-brand-secondary/15 bg-gradient-to-br from-brand-primary/10 to-transparent">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-sm font-medium">Open to new projects</span>
                    </div>
                    <p className="text-brand-muted text-sm">
                      Available for full-time roles and freelance contracts.
                    </p>
                  </div>
                  <motion.button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="h-9 px-5 rounded-xl text-sm font-medium text-white bg-brand-primary/30 border border-brand-secondary/30 hover:bg-brand-primary/50 transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Start a Conversation
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
