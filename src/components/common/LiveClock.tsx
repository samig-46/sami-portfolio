'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-flex w-[0.62em] h-[1.25em] overflow-hidden justify-center">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Separator() {
  return (
    <motion.span
      className="inline-flex w-[0.4em] items-center justify-center text-brand-secondary"
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      :
    </motion.span>
  )
}

export default function LiveClock({ timeZone = 'Asia/Karachi', label = 'PKT' }: { timeZone?: string; label?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timeZone])

  if (!time) {
    return <span className="font-mono text-2xl text-white tabular-nums">--:--:--</span>
  }

  const [hh, mm, ss] = time.split(':')

  return (
    <span className="inline-flex items-baseline font-mono text-2xl font-medium text-white tabular-nums">
      <Digit value={hh[0]} />
      <Digit value={hh[1]} />
      <Separator />
      <Digit value={mm[0]} />
      <Digit value={mm[1]} />
      <Separator />
      <Digit value={ss[0]} />
      <Digit value={ss[1]} />
      <span className="ml-2 text-xs text-brand-muted font-sans font-normal">{label}</span>
    </span>
  )
}
