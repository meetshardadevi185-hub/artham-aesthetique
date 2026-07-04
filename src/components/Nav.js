'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// ── CONDITIONS DATA ──────────────────────────────────────────────
const CONDITIONS = [
  {
    heading: 'SKIN',
    items: [
      { name: 'Acne', href: '/concerns/acne' },
      { name: 'Acne Scar', href: '/concerns/acne-scars' },
      { name: 'Melasma', href: '/concerns/pigmentation' },
      { name: 'Freckles', href: '/concerns/pigmentation' },
      { name: 'Moles', href: '/concerns/moles' },
      { name: 'Rosacea', href: '/concerns/rosacea' },
      { name: 'Open Pores', href: '/concerns/pores' },
      { name: 'Sensitive Skin', href: '/concerns/sensitive-skin' },
      { name: 'Dark Circles', href: '/concerns/dark-circles' },
      { name: 'Dull Complexion / Uneven Skintone', href: '/concerns/dull-skin' },
      { name: 'Fungal Infections', href: '/concerns/fungal-infections' },
      { name: 'Skin Allergies', href: '/concerns/skin-allergies' },
      { name: 'Vitiligo / Leucoderma', href: '/concerns/vitiligo' },
      { name: 'Excess Body & Facial Hair', href: '/concerns/unwanted-hair' },
    ],
  },
  {
    heading: 'HAIR',
    items: [
      { name: 'Hair Loss In Men', href: '/concerns/hair-fall' },
      { name: 'Hair Loss In Women', href: '/concerns/hair-fall' },
      { name: 'Alopecia Areata', href: '/concerns/hair-fall' },
      { name: 'Scarring Alopecia', href: '/concerns/hair-fall' },
      { name: 'Baldness', href: '/concerns/hair-fall' },
      { name: 'Dandruff', href: '/concerns/dandruff' },
      { name: 'Premature Greying', href: '/concerns/hair-regrowth' },
    ],
  },
  {
    heading: 'ANTI AGEING',
    items: [
      { name: 'Wrinkled Skin', href: '/concerns/wrinkles' },
      { name: 'Sagging Skin', href: '/concerns/sagging' },
      { name: 'Deep Folds', href: '/concerns/volume-loss' },
      { name: 'Dehydrated Skin', href: '/concerns/dull-skin' },
    ],
  },
  {
    heading: 'BODY CONTOURING',
    items: [
      { name: 'Unwanted Fat', href: '/concerns/body-contouring' },
      { name: 'Skin Laxity', href: '/concerns/sagging' },
    ],
  },
]

// ── TREATMENTS DATA ──────────────────────────────────────────────
const TREATMENTS_MENU = [
  {
    heading: 'SKIN',
    items: [
      { name: 'Blemish Removal / Complexion Enhancement / Freckles', href: '/treatments/carbon-laser-facial' },
      { name: 'Acne / Acne Scars / Oily Skin & Open Pores', href: '/treatments/acne-clearance' },
      { name: 'Skin Glow & Maintenance Therapies', href: '/treatments/hydrafacial-md' },
      { name: 'Skin Toning, Lifting & Contouring', href: '/treatments/carbon-laser-facial' },
      { name: 'Under Eye Dark Circles Treatment', href: '/treatments/fillers' },
      { name: 'Laser Tattoo Removal', href: '/treatments/laser-tattoo-removal' },
    ],
  },
  {
    heading: 'HAIR & SCALP TREATMENTS',
    items: [
      { name: 'PRP Therapy', href: '/treatments/prp-hair' },
      { name: 'Exosomes (Face)', href: '/treatments/exosomes-face' },
      { name: 'Micro-Mesotherapy', href: '/treatments/micro-mesotherapy' },
      { name: 'Cold Laser Therapy', href: '/treatments/cold-laser-therapy' },
      { name: 'Scalp Micro Pigmentation (SMP)', href: '/treatments/scalp-micro-pigmentation' },
      { name: 'GFC / Regenera Scalp Therapy', href: '/treatments/gfc-hair' },
    ],
  },
  {
    heading: 'NON SURGICAL FACIAL ENHANCEMENTS',
    items: [
      { name: 'Lip Enhancement', href: '/treatments/lip-enhancement' },
      { name: 'Cheek Enhancement', href: '/treatments/cheek-enhancement' },
      { name: 'Chin Enhancement', href: '/treatments/chin-enhancement' },
      { name: 'Nose Enhancement', href: '/treatments/nose-enhancement' },
    ],
  },
  {
    heading: 'HAIR REMOVAL SERVICES',
    items: [
      { name: 'Diode Laser LightSheer Duet', href: '/treatments/laser-hair' },
      { name: 'Diode Laser Alma Soprano', href: '/treatments/laser-hair' },
      { name: 'eLight Hair Removal', href: '/treatments/laser-hair' },
    ],
  },
  {
    heading: 'BODY TREATMENTS',
    items: [
      { name: 'Cool Shape Cryolipolysis', href: '/treatments/cryolipolysis' },
      { name: 'Ultralift — HIFU', href: '/treatments/hifu' },
      { name: 'Intragen', href: '/treatments/intragen' },
      { name: 'VANQUISH', href: '/treatments/vanquish' },
      { name: 'Bio Re Peel', href: '/treatments/bio-re-peel' },
    ],
  },
  {
    heading: 'COSMETIC SURGERIES',
    items: [
      { name: 'Liposuction', href: '/treatments' },
      { name: 'Tummy Tuck', href: '/treatments' },
      { name: 'Blepharoplasty', href: '/treatments' },
      { name: 'Rhinoplasty', href: '/treatments' },
      { name: 'Dimple Creation', href: '/treatments' },
    ],
  },
  {
    heading: 'LEUCODERMA',
    items: [
      { name: 'Suction Blister Grafting', href: '/treatments' },
      { name: 'Split Thickness Skin Grafting', href: '/treatments' },
      { name: 'Melanocyte Transfer', href: '/treatments' },
    ],
  },
]

// ── SPECIALIZED CLINICS DATA ─────────────────────────────────────
const CLINICS = [
  { name: 'Laser Hair Removal', href: '/treatments/laser-hair' },
  { name: 'Acne & Pigmentation', href: '/concerns/acne' },
  { name: 'Anti Ageing', href: '/concerns/wrinkles' },
  { name: 'Body Contouring', href: '/concerns' },
  { name: 'Hair Loss Treatment', href: '/concerns/hair-fall' },
  { name: 'Anti Wrinkle Injection & Filler', href: '/treatments/botox' },
  { name: 'Skin Whitening', href: '/concerns/pigmentation' },
  { name: 'Signature Treatments', href: '/treatments' },
]

// ── NAV COMPONENT ────────────────────────────────────────────────
export default function Nav({ onBook }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [hoverMenu, setHoverMenu] = useState('')
  const closeTimer = useRef(null)
  const [mobileExpanded, setMobileExpanded] = useState('')

  const openMega = (key) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setHoverMenu(key)
  }
  const keepMega = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }
  const closeMegaSoon = () => {
    closeTimer.current = setTimeout(() => { setHoverMenu(''); closeTimer.current = null }, 180)
  }
  const closeMega = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setHoverMenu('')
  }

  const isOn = (path) => pathname === path || pathname.startsWith(path + '/') ? 'on' : ''

  const navLinkStyle = (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: 3, padding: '8px 12px', borderRadius: 8,
    fontSize: 13, fontWeight: 400, textDecoration: 'none', transition: 'all .15s', cursor: 'pointer', border: 'none', background: 'none',
    color: active ? '#543213' : '#7a6858',
    backgroundColor: active ? '#f1d0b4' : 'transparent',
  })

  const chevron = (open) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )

  const megaHeading = { fontSize: 10.5, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#844d28', marginBottom: 10, display: 'block' }
  const megaLink = { display: 'block', padding: '4px 0', fontSize: 13, fontWeight: 300, color: '#3d3028', textDecoration: 'none', lineHeight: 1.6, transition: 'color .15s' }

  return (
    <>
      {/* ── STICKY NAV ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 200, background: '#fff', borderBottom: '1px solid rgba(84,50,19,0.1)', fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}>
        {/* ── Desktop: 3-column grid — left nav | LOGO | right nav ── */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 20px', height: 70, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }} className="nav-desktop">

          {/* LEFT — hamburger + left links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} onMouseLeave={closeMegaSoon}>
            {/* Hamburger circle */}
            <button onClick={() => { setMenuOpen(o => !o); setSearchOpen(false); setHoverMenu('') }}
              style={{ width: 40, height: 40, borderRadius: '50%', background: '#543213', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 6 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
            {/* Left nav */}
            <button style={navLinkStyle(isOn('/concerns'))} onMouseEnter={() => openMega('conditions')} onClick={() => openMega(hoverMenu === 'conditions' ? '' : 'conditions')}>
              Conditions {chevron(hoverMenu === 'conditions')}
            </button>
            <button style={navLinkStyle(isOn('/treatments'))} onMouseEnter={() => openMega('treatments')} onClick={() => openMega(hoverMenu === 'treatments' ? '' : 'treatments')}>
              Treatments {chevron(hoverMenu === 'treatments')}
            </button>
            <button style={navLinkStyle(false)} onMouseEnter={() => openMega('clinics')} onClick={() => openMega(hoverMenu === 'clinics' ? '' : 'clinics')}>
              Clinics {chevron(hoverMenu === 'clinics')}
            </button>
          </div>

          {/* CENTER — Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} onClick={closeMega}>
            <Image src="/artham-logo.png" alt="Artham Aesthetique" width={130} height={56} priority
              style={{ objectFit: 'contain', height: 56, width: 'auto' }} />
          </Link>

          {/* RIGHT — right links + phone + book + search */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }} onMouseLeave={closeMegaSoon}>
            <Link href="/doctor" style={navLinkStyle(isOn('/doctor'))} onMouseEnter={closeMega}>About Doctor</Link>
            <Link href="/about" style={navLinkStyle(isOn('/about'))} onMouseEnter={closeMega}>About Us</Link>
            <Link href="/contact" style={navLinkStyle(isOn('/contact'))} onMouseEnter={closeMega}>Contact Us</Link>
            <div style={{ width: 1, height: 20, background: 'rgba(84,50,19,0.12)', margin: '0 4px' }} />
            {/* Phone */}
            <a href="tel:09811997993" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#543213', textDecoration: 'none', fontSize: 13, fontWeight: 400, whiteSpace: 'nowrap' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#feb847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.48l3-.1a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 98119 97993
            </a>
            {/* Book button */}
            <button onClick={onBook}
              style={{ background: '#feb847', color: '#543213', fontSize: 13, fontWeight: 600, padding: '9px 22px', borderRadius: 999, border: 'none', cursor: 'pointer', flexShrink: 0, letterSpacing: '0.02em' }}>
              Book Appointment
            </button>
            {/* Search */}
            <button onClick={() => { setSearchOpen(o => !o); setHoverMenu('') }}
              style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid rgba(84,50,19,0.15)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#543213' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </div>

        {/* ── Mobile header ── */}
        <div style={{ display: 'none', padding: '0 16px', height: 60, alignItems: 'center', justifyContent: 'space-between' }} className="nav-mobile">
          <button onClick={() => { setMenuOpen(o => !o); setSearchOpen(false) }}
            style={{ width: 38, height: 38, borderRadius: '50%', background: '#543213', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Image src="/artham-logo.png" alt="Artham Aesthetique" width={100} height={40} priority style={{ objectFit: 'contain', height: 40, width: 'auto' }} />
          </Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setSearchOpen(o => !o); setMenuOpen(false) }}
              style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid rgba(84,50,19,0.2)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#543213' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button onClick={onBook}
              style={{ background: '#feb847', color: '#543213', fontSize: 12, fontWeight: 600, padding: '8px 16px', borderRadius: 999, border: 'none', cursor: 'pointer' }}>
              Book
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div style={{ borderTop: '1px solid rgba(84,50,19,0.08)', background: '#fff' }}>
            <div style={{ maxWidth: 640, margin: '8px auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 10, background: '#f1d0b4', borderRadius: 12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7a6858" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search treatments, concerns…"
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', padding: '10px 0', fontSize: 14, color: '#3d3028', fontWeight: 300 }} autoFocus />
              <button onClick={() => { setSearchOpen(false); setSearchQ('') }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#7a6858', display: 'flex', padding: 4 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── CONDITIONS MEGA ── */}
      <div style={{ position: 'fixed', left: 0, right: 0, zIndex: 190, top: 70, opacity: hoverMenu === 'conditions' ? 1 : 0, pointerEvents: hoverMenu === 'conditions' ? 'auto' : 'none', transform: hoverMenu === 'conditions' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s, transform .22s' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(26,17,9,0.08)', boxShadow: '0 16px 48px rgba(26,17,9,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 20px 32px', display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 0.8fr', gap: 40 }}>
            {CONDITIONS.map(col => (
              <div key={col.heading}>
                <span style={megaHeading}>{col.heading}</span>
                {col.items.map(item => (
                  <Link key={item.name} href={item.href} onClick={closeMega}
                    style={megaLink}
                    onMouseEnter={e => e.currentTarget.style.color = '#844d28'}
                    onMouseLeave={e => e.currentTarget.style.color = '#3d3028'}>
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 4, paddingTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/concerns" onClick={closeMega} style={{ fontSize: 12.5, fontWeight: 400, color: '#543213', textDecoration: 'none' }}>
                View all concerns →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── TREATMENTS MEGA ── */}
      <div style={{ position: 'fixed', left: 0, right: 0, zIndex: 190, top: 70, opacity: hoverMenu === 'treatments' ? 1 : 0, pointerEvents: hoverMenu === 'treatments' ? 'auto' : 'none', transform: hoverMenu === 'treatments' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s, transform .22s' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(26,17,9,0.08)', boxShadow: '0 16px 48px rgba(26,17,9,0.1)', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 20px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {TREATMENTS_MENU.map(col => (
              <div key={col.heading}>
                <span style={megaHeading}>{col.heading}</span>
                {col.items.map(item => (
                  <Link key={item.name} href={item.href} onClick={closeMega}
                    style={megaLink}
                    onMouseEnter={e => e.currentTarget.style.color = '#844d28'}
                    onMouseLeave={e => e.currentTarget.style.color = '#3d3028'}>
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 4, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/treatments" onClick={closeMega} style={{ fontSize: 12.5, fontWeight: 400, color: '#543213', textDecoration: 'none' }}>
                View all treatments →
              </Link>
              <button onClick={() => { closeMega(); onBook() }} style={{ fontSize: 12.5, fontWeight: 500, padding: '8px 18px', borderRadius: 999, background: '#543213', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── SPECIALIZED CLINICS DROPDOWN ── */}
      <div style={{ position: 'fixed', left: 0, right: 0, zIndex: 190, top: 70, opacity: hoverMenu === 'clinics' ? 1 : 0, pointerEvents: hoverMenu === 'clinics' ? 'auto' : 'none', transform: hoverMenu === 'clinics' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s, transform .22s' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(26,17,9,0.08)', boxShadow: '0 16px 48px rgba(26,17,9,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {CLINICS.map(item => (
              <Link key={item.name} href={item.href} onClick={closeMega}
                style={{ ...megaLink, padding: '8px 12px', borderRadius: 8, background: '#efdfc8', border: '1px solid rgba(26,17,9,0.07)', fontWeight: 400, fontSize: 13.5 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f1d0b4'; e.currentTarget.style.color = '#543213' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#efdfc8'; e.currentTarget.style.color = '#3d3028' }}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {hoverMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 189 }} onClick={closeMega} />}

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 300, background: '#fff', overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Conditions */}
            {[
              { key: 'conditions', label: 'Conditions', sub: 'Browse by skin concern', data: CONDITIONS },
              { key: 'treatments', label: 'Treatments', sub: 'All procedures & services', data: TREATMENTS_MENU },
              { key: 'clinics', label: 'Specialized Clinics', sub: 'Expert clinic services', data: null, items: CLINICS },
            ].map(section => (
              <div key={section.key} style={{ borderBottom: '1px solid rgba(26,17,9,0.06)' }}>
                <button onClick={() => setMobileExpanded(mobileExpanded === section.key ? '' : section.key)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 400, color: '#3d3028' }}>{section.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 300, color: '#7a6858', marginTop: 2 }}>{section.sub}</div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#844d28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: mobileExpanded === section.key ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {mobileExpanded === section.key && (
                  <div style={{ paddingBottom: 12, paddingLeft: 12 }}>
                    {section.data ? section.data.map(col => (
                      <div key={col.heading} style={{ marginBottom: 14 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#844d28', display: 'block', marginBottom: 6, paddingLeft: 4 }}>{col.heading}</span>
                        {col.items.map(item => (
                          <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)}
                            style={{ display: 'block', padding: '6px', fontSize: 13.5, fontWeight: 300, color: '#543213', textDecoration: 'none' }}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )) : section.items?.map(item => (
                      <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)}
                        style={{ display: 'block', padding: '6px', fontSize: 13.5, fontWeight: 300, color: '#543213', textDecoration: 'none' }}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {[
              { href: '/doctor', label: 'Our Doctor', sub: 'Dr. Omaima Jawed' },
              { href: '/about', label: 'About', sub: 'Our clinic & philosophy' },
              { href: '/contact', label: 'Contact', sub: 'Book a consultation' },
            ].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px', textDecoration: 'none', borderBottom: '1px solid rgba(26,17,9,0.06)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#3d3028' }}>{item.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 300, color: '#7a6858', marginTop: 2 }}>{item.sub}</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#844d28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
            <button onClick={() => { setMenuOpen(false); onBook() }}
              style={{ marginTop: 12, width: '100%', padding: '14px', borderRadius: 999, background: '#543213', color: '#fff', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
              Book Appointment
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
