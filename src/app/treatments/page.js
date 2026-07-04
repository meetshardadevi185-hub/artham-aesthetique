import { fetchTreatments } from '@/sanity/client'
import TreatmentsFilter from '@/components/TreatmentsFilter'

export const revalidate = 10
export const metadata = { title: 'Treatments — Tvak & Asthi by Artham' }

const FALLBACK = [
  { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, category: 'Skin & Glow', tagline: 'Deep cleanse, instant glow', rating: 4.9, reviewCount: 410 },
  { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, category: 'Skin & Glow', tagline: 'Pore tightening & oil control', rating: 4.8, reviewCount: 320 },
  { name: 'Acne Clearance Program', slug: { current: 'acne-clearance' }, category: 'Acne & Scars', tagline: 'Root-cause acne treatment', rating: 4.9, reviewCount: 930 },
  { name: 'Acne Scar Revision MNRF', slug: { current: 'acne-scar-mnrf' }, category: 'Acne & Scars', tagline: 'Pitted & rolling scar correction', rating: 4.8, reviewCount: 540 },
  { name: 'Melasma Treatment', slug: { current: 'melasma' }, category: 'Pigmentation', tagline: 'Pigmentation & dark patch removal', rating: 4.8, reviewCount: 290 },
  { name: 'Anti-Wrinkle Botox', slug: { current: 'botox' }, category: 'Anti-Ageing', tagline: 'Expression line softening', rating: 4.9, reviewCount: 380 },
  { name: 'Dermal Fillers', slug: { current: 'fillers' }, category: 'Anti-Ageing', tagline: 'Volume restoration & contouring', rating: 4.8, reviewCount: 210 },
  { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, category: 'Hair Restoration', tagline: 'Stimulate natural hair regrowth', rating: 4.8, reviewCount: 460 },
  { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, category: 'Hair Restoration', tagline: 'Next-gen growth factor therapy', rating: 4.9, reviewCount: 180 },
  { name: 'Laser Hair Reduction', slug: { current: 'laser-hair' }, category: 'Laser & Devices', tagline: 'Permanent hair reduction', rating: 4.8, reviewCount: 640 },
]

export default async function TreatmentsPage() {
  const treatments = await fetchTreatments().catch(() => FALLBACK)
  const list = treatments?.length ? treatments : FALLBACK

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '52px 20px 44px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span className="eyebrow">All Services</span>
          <h1 style={{ fontWeight: 500, marginBottom: 12 }}>Treatments</h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#7A6A5A', maxWidth: 520 }}>
            Every procedure performed by Dr. Omaima. US-FDA cleared devices. Personalised to your skin.
          </p>
        </div>
      </section>
      <section style={{ padding: '36px 20px 72px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <TreatmentsFilter treatments={list} />
        </div>
      </section>
    </div>
  )
}
