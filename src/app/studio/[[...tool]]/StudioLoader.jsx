'use client'
import dynamic from 'next/dynamic'

const StudioWrapper = dynamic(() => import('./StudioWrapper'), { ssr: false })

export default function StudioLoader() {
  return <StudioWrapper />
}
