'use client'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  duration?: number
  pauseOnHover?: boolean
  fadeEdges?: boolean
  className?: string
}

export default function Marquee({
  children,
  reverse = false,
  duration = 30,
  pauseOnHover = false,
  fadeEdges = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn('overflow-hidden', className)}
      style={
        fadeEdges
          ? {
              maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            }
          : undefined
      }
    >
      <div
        className={cn('flex w-max animate-marquee', pauseOnHover && 'hover:[animation-play-state:paused]')}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
