'use client'
import { useState, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import FloatingButtons from './FloatingButtons'
import BookingModal from './BookingModal'
import ScrollReveal from './ScrollReveal'

export const BookingCtx = createContext(() => {})
export function useBooking() { return useContext(BookingCtx) }

export default function SiteShell({ children }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)

  if (isStudio) return <>{children}</>

  return (
    <BookingCtx.Provider value={openModal}>
      <ScrollReveal />
      <Nav onBook={openModal} />
      <main>{children}</main>
      <Footer />
      <FloatingButtons onBook={openModal} />
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </BookingCtx.Provider>
  )
}
