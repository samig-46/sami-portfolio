'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { testimonials } from '@/data/testimonials'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'text-brand-secondary fill-brand-secondary' : 'text-white/20'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.95 }),
  }

  const testimonial = testimonials[current]

  return (
    <section id="testimonials" className="relative py-24 lg:py-36 bg-[#0A0F1A]">
      <div className="absolute inset-0 bg-gradient-radial from-brand-secondary/[0.04] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Stories"
          title="What Clients"
          titleHighlight="Say About Working With Me"
          description="Real words from real clients. I let the results speak for themselves."
          align="center"
          className="mb-16"
        />

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Large quote icon */}
          <div className="absolute -top-8 left-0 text-brand-primary/20">
            <Quote size={64} fill="currentColor" />
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm min-h-[320px] flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="p-8 md:p-12"
              >
                {/* Rating */}
                <div className="mb-6">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Content */}
                <blockquote className="text-white/90 text-lg md:text-xl leading-relaxed font-light mb-8">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-brand-muted text-sm">{testimonial.role} · {testimonial.company}</p>
                    <p className="text-brand-secondary/60 text-xs mt-0.5">{testimonial.project}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-2 bg-brand-secondary' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-secondary/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-secondary/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Trust logos bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-white/[0.06]"
        >
          <p className="text-center text-brand-muted/40 text-xs tracking-widest uppercase mb-6">
            Trusted by brands in
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {['Healthcare', 'SaaS', 'E-commerce', 'NGO & Non-profit', 'Technology', 'Education', 'Finance', 'Consulting'].map((industry) => (
              <span key={industry} className="text-brand-muted/30 text-sm hover:text-brand-muted/60 transition-colors cursor-default">
                {industry}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
