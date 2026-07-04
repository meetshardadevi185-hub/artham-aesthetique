'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/client'

const CATEGORIES = ['All', 'Skin & Glow', 'Acne & Scars', 'Pigmentation', 'Anti-Ageing', 'Hair Restoration', 'Laser & Devices']

export default function TreatmentsFilter({ treatments }) {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? treatments : treatments.filter(t => t.category === active)

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActive(cat)} style={{
            fontSize: 12.5, fontWeight: 400, padding: '7px 16px', borderRadius: 999,
            background: active === cat ? '#1A2744' : '#fff',
            color: active === cat ? '#FAF7F2' : '#4A3728',
            border: `1.5px solid ${active === cat ? '#1A2744' : 'rgba(26,17,9,0.1)'}`,
            cursor: 'pointer', transition: 'all .18s',
          }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {filtered.map((t, i) => (
          <Link key={`${active}-${i}`} href={`/treatments/${t.slug?.current || '#'}`} className="card-hover"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.09)' }}>
            <div style={{ height: 252, background: '#F0E8DF', flexShrink: 0, position: 'relative' }}>
              {t.image ? (
                <Image
                  src={urlFor(t.image).width(363).height(252).fit('crop').url()}
                  alt={t.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, 363px"
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(184,145,106,0.4)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
              )}
              <div style={{ position: 'absolute', top: 12, left: 12, background: '#1A2744', color: '#FAF7F2', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 999 }}>{t.category}</div>
            </div>
            <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', marginBottom: 7 }}>{t.name}</h3>
              <p style={{ fontSize: 13, fontWeight: 300, color: '#7A6A5A', lineHeight: 1.65, flex: 1 }}>{t.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/></svg>
                  <span style={{ fontSize: 12.5, fontWeight: 400, color: '#4A3728' }}>{t.rating}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 300, color: '#9A8A7A' }}>· {t.reviewCount} reviews</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 400, color: '#1A2744' }}>Explore →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9A8A7A', fontSize: 14, fontWeight: 300 }}>
          No treatments in this category yet. <Link href="/contact" style={{ color: '#1A2744', fontWeight: 400 }}>Ask us →</Link>
        </div>
      )}
    </>
  )
}
