'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

const EASE = [0.43, 0.13, 0.23, 0.96] as const

function RevealWords({
  text,
  inView,
  baseDelay = 0,
  gradient = false,
}: {
  text: string
  inView: boolean
  baseDelay?: number
  gradient?: boolean
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
          <motion.span
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.7, delay: baseDelay + i * 0.07, ease: EASE }}
            className={cn(
              'inline-block',
              gradient && 'bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent'
            )}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  )
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const titleWordCount = title.split(' ').length

  return (
    <motion.div
      ref={ref}
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : '',
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="w-8 h-px bg-brand-secondary origin-right"
          />
          <span className="text-brand-secondary text-xs font-medium tracking-[0.25em] uppercase">
            {eyebrow}
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="w-8 h-px bg-brand-secondary origin-left"
          />
        </motion.div>
      )}

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
        <RevealWords text={title} inView={inView} baseDelay={0.1} />
        {titleHighlight && (
          <RevealWords
            text={titleHighlight}
            inView={inView}
            baseDelay={0.1 + titleWordCount * 0.07}
            gradient
          />
        )}
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="text-brand-muted text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
