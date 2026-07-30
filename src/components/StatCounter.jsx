import { useEffect, useRef, useState } from 'react'

export default function StatCounter({ value, suffix = '', label, duration = 1400 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(value * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration, started])

  return (
    <div ref={ref}>
      <div className="stat-number text-white">{display.toLocaleString()}{suffix}</div>
      <div className="mt-1 text-sm text-white/50 font-medium">{label}</div>
    </div>
  )
}
