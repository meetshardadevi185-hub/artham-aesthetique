'use client'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration, go) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!go) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [go, target, duration])

  return val
}

function StatItem({ value, label, delay, go }) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!go) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [go, delay])

  const match = value.match(/^(\d+\.?\d*)(.*)$/)
  const numeric = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : value
  const isDecimal = value.includes('.')

  const count = useCountUp(numeric, 1300, started)

  const display = started
    ? (isDecimal ? count.toFixed(1) : Math.round(count)) + suffix
    : '0' + suffix

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 500, color: '#1A2744', lineHeight: 1 }}>
        {display}
      </div>
      <div style={{ fontSize: 11, fontWeight: 300, color: '#9A8A7A', marginTop: 4, letterSpacing: '0.02em' }}>
        {label}
      </div>
    </div>
  )
}

export default function AnimatedStats({ stats }) {
  const ref = useRef(null)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display: 'flex', gap: 28, paddingTop: 20, borderTop: '1px solid rgba(26,17,9,0.1)', flexWrap: 'wrap' }}>
      {stats.map((s, i) => (
        <StatItem key={i} value={s.value} label={s.label} delay={i * 120} go={go} />
      ))}
    </div>
  )
}
