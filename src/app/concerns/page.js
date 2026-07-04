import Image from 'next/image'
import Link from 'next/link'
import { fetchConcerns, urlFor } from '@/sanity/client'

export const revalidate = 10
export const metadata = { title: 'Concerns — Tvak & Asthi by Artham' }

const FALLBACK = [
  { name: 'Acne & Breakouts', slug: { current: 'acne' }, category: 'Skin & Face', iconBg: '#FFF0EE' },
  { name: 'Acne Scars', slug: { current: 'acne-scars' }, category: 'Skin & Face', iconBg: '#FFF0EE' },
  { name: 'Pigmentation & Melasma', slug: { current: 'pigmentation' }, category: 'Skin & Face', iconBg: '#F5EDE4' },
  { name: 'Dull & Dry Skin', slug: { current: 'dull-skin' }, category: 'Skin & Face', iconBg: '#EEF6FF' },
  { name: 'Pores & Texture', slug: { current: 'pores' }, category: 'Skin & Face', iconBg: '#EEF1F8' },
  { name: 'Hair Fall & Thinning', slug: { current: 'hair-fall' }, category: 'Hair & Scalp', iconBg: '#EEFAF2' },
  { name: 'Dandruff & Scalp Issues', slug: { current: 'dandruff' }, category: 'Hair & Scalp', iconBg: '#EEFAF2' },
  { name: 'Hair Regrowth', slug: { current: 'hair-regrowth' }, category: 'Hair & Scalp', iconBg: '#F5EDE4' },
  { name: 'Unwanted Body Hair', slug: { current: 'unwanted-hair' }, category: 'Hair & Scalp', iconBg: '#FFF0EE' },
  { name: 'Wrinkles & Fine Lines', slug: { current: 'wrinkles' }, category: 'Anti-Ageing', iconBg: '#F5EDE4' },
  { name: 'Sagging & Laxity', slug: { current: 'sagging' }, category: 'Anti-Ageing', iconBg: '#EEF1F8' },
  { name: 'Volume Loss', slug: { current: 'volume-loss' }, category: 'Anti-Ageing', iconBg: '#FFF0EE' },
  { name: 'Dark Circles & Eye Area', slug: { current: 'dark-circles' }, category: 'Anti-Ageing', iconBg: '#EEF1F8' },
]
const CATS = ['Skin & Face', 'Hair & Scalp', 'Anti-Ageing']

export default async function ConcernsPage() {
  const concerns = await fetchConcerns().catch(() => FALLBACK)
  const list = concerns?.length ? concerns : FALLBACK

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '52px 20px 44px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span className="eyebrow">Browse by Concern</span>
          <h1 style={{ fontWeight: 500, marginBottom: 12 }}>What are you dealing with?</h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#7A6A5A', maxWidth: 520 }}>Find your concern and see the treatments we recommend.</p>
        </div>
      </section>
      <section style={{ padding: '48px 20px 72px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          {CATS.map(cat => {
            const filtered = list.filter(c => c.category === cat)
            if (!filtered.length) return null
            return (
              <div key={cat} style={{ marginBottom: 52 }}>
                <h2 style={{ fontWeight: 500, fontSize: 18, marginBottom: 20, color: 'var(--text)' }}>{cat}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                  {filtered.map((c, i) => (
                    <Link key={i} href={`/concerns/${c.slug?.current || '#'}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: '#fff', borderRadius: 14, border: '1.5px solid rgba(26,17,9,0.09)', transition: 'transform .2s, box-shadow .2s', minHeight: 72 }}>
                      <span style={{ width: 48, height: 48, borderRadius: 10, background: c.iconBg || '#F5EDE4', flexShrink: 0, overflow: 'hidden', position: 'relative', display: 'block' }}>
                        {(c.image || c.heroImage) ? (
                          <Image
                            src={urlFor(c.image || c.heroImage).width(120).height(120).fit('crop').url()}
                            alt=""
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="48px"
                          />
                        ) : (
                          <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(184,145,106,0.16))' }} />
                        )}
                      </span>
                      <span style={{ fontSize: 13.5, fontWeight: 400, color: 'var(--text)', lineHeight: 1.35 }}>{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
