'use client'
import { useEffect, useRef } from 'react'

export function useLenis() {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null
    let animationFrameId: number

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      }) as unknown as { destroy: () => void; raf: (time: number) => void }

      lenisRef.current = lenis

      function raf(time: number) {
        lenis!.raf(time)
        animationFrameId = requestAnimationFrame(raf)
      }
      animationFrameId = requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis?.destroy()
    }
  }, [])

  return lenisRef
}
