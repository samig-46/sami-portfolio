'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Palette, Code2, Globe, Zap, Search, Mail,
  BarChart3, Workflow, Brain, Layout, TrendingUp, Shield,
  ChevronRight, Check
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { services } from '@/data/services'

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Palette, Code2, Globe, Zap, Search, Mail,
  BarChart3, Workflow, Brain, Layout, TrendingUp, Shield,
}

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="services" className="relative py-24 lg:py-36 bg-[#0D1220]">
      {/* Background */}
      <div className="absolute left-0 top-1/3 w-80 h-80 rounded-full bg-brand-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="Everything You Need to"
          titleHighlight="Win Online"
          description="End-to-end digital product services — from first pixel to first customer. No need to juggle five agencies."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2
            const isExpanded = expandedId === service.id
            const isHovered = hoveredId === service.id

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <GlassCard
                  className={`p-5 h-full cursor-pointer transition-all duration-300 group ${
                    isExpanded ? 'border-brand-secondary/30' : ''
                  }`}
                  tilt={!isExpanded}
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                >
                  <div
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 bg-gradient-to-br ${service.gradient}`}>
                      <Icon
                        size={20}
                        className={`transition-colors duration-300 ${isHovered || isExpanded ? 'text-brand-accent' : 'text-brand-secondary'}`}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-brand-muted text-xs leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex gap-3 mb-4">
                      {service.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-brand-secondary font-bold text-sm">{m.value}</div>
                          <div className="text-brand-muted/60 text-[10px]">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Toggle button */}
                    <button className="flex items-center gap-1 text-brand-secondary/70 hover:text-brand-secondary text-xs transition-colors">
                      <span>{isExpanded ? 'Less' : 'Details'}</span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={12} />
                      </motion.span>
                    </button>

                    {/* Expanded features */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-3 border-t border-white/[0.06] space-y-1.5">
                            {service.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2">
                                <Check size={11} className="text-brand-secondary shrink-0" />
                                <span className="text-brand-muted/80 text-xs">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-brand-muted text-sm mb-4">
            Need a custom solution or a combination of services?
          </p>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 h-11 px-7 rounded-xl font-medium text-white border border-brand-secondary/30 bg-brand-primary/10 hover:bg-brand-primary/20 hover:border-brand-secondary/50 transition-all duration-300 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Discuss Your Project
            <ChevronRight size={14} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
