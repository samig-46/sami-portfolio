'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Calendar } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/lib/utils'

const categoryColors: Record<string, string> = {
  'SEO & Performance': 'text-green-400 bg-green-500/10 border-green-500/20',
  'AI & Product': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'UI/UX Design': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'WordPress': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Automation': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  'Conversion Optimization': 'text-brand-secondary bg-brand-primary/10 border-brand-secondary/20',
}

export default function Blog() {
  const featured = blogPosts.find((p) => p.featured)
  const rest = blogPosts.filter((p) => p !== featured).slice(0, 4)

  return (
    <section id="blog" className="relative py-24 lg:py-36 bg-[#0D1220]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Insights"
          title="Thoughts on Design,"
          titleHighlight="Dev & Growth"
          description="Practical insights on building better digital products — from the trenches of real client work."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured post */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <GlassCard className="group h-full cursor-pointer overflow-hidden">
                {/* Image area */}
                <div
                  className="relative h-56 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #6D1F2A30, #0A0F1A)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full border ${categoryColors[featured.category] || 'text-brand-secondary bg-brand-primary/10 border-brand-secondary/20'}`}>
                      {featured.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-brand-primary/20 text-8xl font-bold">{featured.title[0]}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-brand-muted/50 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-brand-accent transition-colors leading-snug">
                    {featured.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-brand-secondary text-sm font-medium">
                    <span>Read Article</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Other posts */}
          <div className="lg:col-span-2 space-y-4">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard className="group cursor-pointer hover:border-brand-secondary/20 transition-colors">
                  <div className="p-4 flex gap-4">
                    {/* Category accent */}
                    <div className="w-1 shrink-0 rounded-full bg-gradient-to-b from-brand-primary to-brand-secondary self-stretch" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-medium tracking-wide px-1.5 py-0.5 rounded border ${categoryColors[post.category] || 'text-brand-secondary bg-brand-primary/10 border-brand-secondary/15'}`}>
                          {post.category}
                        </span>
                        <span className="text-brand-muted/40 text-[10px]">{post.readTime}</span>
                      </div>
                      <h4 className="text-white text-sm font-semibold leading-snug mb-1 group-hover:text-brand-accent transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-brand-muted/60 text-xs line-clamp-1">{post.excerpt}</p>
                    </div>
                    <ArrowUpRight
                      size={13}
                      className="shrink-0 text-brand-muted/30 group-hover:text-brand-secondary transition-colors mt-0.5"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-full py-3 text-sm text-brand-muted/60 hover:text-brand-secondary border border-white/[0.05] rounded-xl transition-all hover:border-brand-secondary/20 hover:bg-brand-primary/5"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              View All Articles →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
