'use client'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function useScrollReveal(threshold = 0.15) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })
  return { ref, inView }
}

export function useCountUp(end: number, duration = 2000, start = 0) {
  const countRef = useRef<number>(start)
  const frameRef = useRef<number>(0)

  const animate = (
    startTime: number,
    currentTime: number,
    onUpdate: (value: number) => void
  ) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    countRef.current = Math.floor(start + (end - start) * eased)
    onUpdate(countRef.current)
    if (progress < 1) {
      frameRef.current = requestAnimationFrame((time) =>
        animate(startTime, time, onUpdate)
      )
    }
  }

  const startAnimation = (onUpdate: (value: number) => void) => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame((time) =>
      animate(time, time, onUpdate)
    )
  }

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return { startAnimation }
}
