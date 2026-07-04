'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('vis')
        obs.observe(el)
      })
    }, 60)

    return () => { clearTimeout(timer); obs.disconnect() }
  }, [pathname])

  return null
}
