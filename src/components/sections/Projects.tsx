'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink, ChevronRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlassCard
        className="overflow-hidden cursor-pointer group h-full"
        onClick={onOpen}
        tilt
      >
        {/* Image placeholder with gradient */}
        <div
          className="relative h-52 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}30 0%, #0A0F1A 100%)` }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          {/* Category label */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/15 text-white/70 bg-white/5 backdrop-blur-sm">
              {project.category}
            </span>
          </div>
          {/* Year */}
          <div className="absolute top-4 right-4 text-white/30 text-xs font-mono">{project.year}</div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-2xl font-bold opacity-30"
              style={{ color: project.color }}
            >
              {project.title[0]}
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-brand-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <span>View Case Study</span>
              <ArrowUpRight size={16} />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-brand-primary/15 text-brand-secondary/80 border border-brand-secondary/15">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-brand-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-brand-muted text-sm leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Metrics preview */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <div className="text-brand-secondary font-bold text-sm">{m.value}</div>
                <div className="text-brand-muted/60 text-[10px]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0A0F1A]/95 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0D1220] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div
          className="relative h-56 overflow-hidden rounded-t-2xl"
          style={{ background: `linear-gradient(135deg, ${project.color}40, #0A0F1A)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-white/10">{project.title[0]}</span>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-end p-6">
            <div>
              <span className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/15 text-white/70 bg-white/5 mb-3 inline-block">
                {project.category}
              </span>
              <h2 className="text-white text-2xl font-bold">{project.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-brand-muted leading-relaxed">{project.longDescription}</p>

          {/* Metrics */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <div className="w-5 h-px bg-brand-secondary" />
              Outcomes & Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-brand-secondary font-bold text-lg">{m.value}</div>
                  <div className="text-brand-muted text-xs">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <div className="w-5 h-px bg-brand-secondary" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs rounded-lg bg-brand-primary/15 text-brand-secondary border border-brand-secondary/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full h-11 px-5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-brand-primary to-brand-secondary justify-center hover:shadow-glow transition-shadow"
            >
              <ExternalLink size={14} />
              View Live Project
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative py-24 lg:py-36 bg-[#0D1220]">
      <div className="absolute inset-0 bg-gradient-radial from-brand-primary/[0.04] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Work"
          title="Projects That"
          titleHighlight="Deliver Results"
          description="A selection of projects where great design meets engineering precision — and measurable outcomes."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            className="inline-flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-medium text-white border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            View All Projects
            <ChevronRight size={14} />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
