'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variants = {
  primary: 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white border border-transparent hover:shadow-glow',
  secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
  outline: 'bg-transparent text-brand-secondary border border-brand-primary/50 hover:border-brand-secondary hover:bg-brand-primary/10',
  ghost: 'bg-transparent text-brand-muted border border-transparent hover:text-white hover:bg-white/5',
}

const sizes = {
  sm: 'h-9 px-4 text-sm gap-2',
  md: 'h-11 px-6 text-sm gap-2.5',
  lg: 'h-13 px-8 text-base gap-3',
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  type = 'button',
  disabled,
  icon,
  iconPosition = 'right',
}: AnimatedButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center rounded-xl font-medium',
    'transition-all duration-300 overflow-hidden',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  )

  const content = (
    <>
      {/* Shimmer overlay for primary */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          whileHover={{ translateX: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <motion.span
          className="shrink-0"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {content}
    </motion.button>
  )
}
