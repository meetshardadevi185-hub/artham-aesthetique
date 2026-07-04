import Image from 'next/image'
import Link from 'next/link'
import { fetchAboutPage, fetchDoctor, urlFor } from '@/sanity/client'

export const revalidate = 10
export const metadata = { title: 'About — Tvak & Asthi by Artham' }

export default async function AboutPage() {
  const [page, doctor] = await Promise.all([
    fetchAboutPage().catch(() => null),
    fetchDoctor().catch(() => null),
  ])

  const d = doctor || {}
  const values = page?.values?.items || [
    { title: 'Doctor-Led Every Session', description: 'Every procedure is performed by Dr. Omaima — not a therapist or technician.' },
    { title: 'Safety First', description: 'US-FDA cleared devices only. We never compromise on safety protocols.' },
    { title: 'Built for Indian Skin', description: 'All treatments are calibrated for Fitzpatrick III–V skin types, common in India.' },
  ]

  const locationHeading = page?.locationSection?.heading || 'Visit us in Noida'
  const locationAddress = page?.locationSection?.address || 'Lotus Plaza, near Mithaas Sweets, Hazipur, Sector 104, Noida 201304'
  const directionsUrl = page?.locationSection?.directionsUrl || 'https://maps.app.goo.gl/jhaUTtPyvnzMNbKq5'
  const directionsCta = page?.locationSection?.primaryCtaText || 'Get Directions'
  const bookingCta = page?.locationSection?.secondaryCtaText || 'Book Appointment'

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '72px 20px', background: 'linear-gradient(160deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">{page?.hero?.eyebrow || 'Our Clinic'}</span>
          <h1 style={{ fontWeight: 500, marginBottom: 16 }}>
            {page?.hero?.headingLine1 || 'Where precision meets'}{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4A6741' }}>{page?.hero?.headingItalic || 'care.'}</em>
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, maxWidth: 600, marginInline: 'auto' }}>
            {page?.hero?.subtext || 'Tvak & Asthi by Artham was founded on a single belief: aesthetic medicine should be evidence-based, transparent, and doctor-led at every step.'}
          </p>
        </div>
      </section>

      <section style={{ padding: '56px 20px', background: '#1A2744' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }} className="grid-stats">
          {(page?.stats || [
            { value: '5+', label: 'Years Experience' },
            { value: '500+', label: 'Happy Patients' },
            { value: '15+', label: 'Treatments' },
            { value: '4.9', label: 'Google Rating' },
          ]).map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 500, color: '#FAF7F2', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 300, color: '#A0B4C8', marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">Our Values</span>
            <h2 style={{ fontWeight: 500 }}>{page?.values?.heading || 'What we stand for'}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '28px 26px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EEF1F8', marginBottom: 18 }} />
                <h3 style={{ fontWeight: 500, fontSize: 15.5, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: '#6A5A4A', lineHeight: 1.75 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR SECTION */}
      <section style={{ padding: '72px 20px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', alignItems: 'start' }} className="grid-hero">
          <div style={{ borderRadius: 20, overflow: 'hidden', background: '#E8DED4', aspectRatio: '3/4', position: 'relative' }}>
            {d.photo && (
              <Image
                src={urlFor(d.photo).width(700).height(933).fit('crop').url()}
                alt={d.name || 'Dr. Omaima Jawed'}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            )}
          </div>
          <div>
            <span className="eyebrow">{page?.doctorSection?.eyebrow || 'Meet the Doctor'}</span>
            <h2 style={{ fontWeight: 500, marginBottom: 10 }}>{d.name || 'Dr. Omaima Jawed'}</h2>
            <p style={{ fontSize: 13.5, fontWeight: 400, color: '#B8916A', marginBottom: 18 }}>
              {page?.doctorSection?.credentials || `${d.credentials || 'MBBS'} · ${d.title || 'Aesthetic Physician'} · ${d.experience || 5} Years Experience`}
            </p>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, marginBottom: 28 }}>
              {page?.doctorSection?.bio || d.shortBio || 'Dr. Omaima personally leads every procedure at Tvak & Asthi. Her training in aesthetic medicine and deep understanding of Indian skin types ensures treatments are both safe and effective.'}
            </p>
            <Link href="/doctor" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: '#fff', background: '#1A2744', padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>
              {page?.doctorSection?.ctaText || 'Full Profile'} →
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section style={{ padding: '64px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 10 }}>{locationHeading}</h2>
          <p style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', marginBottom: 28, lineHeight: 1.75 }}>
            {locationAddress}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={directionsUrl} target="_blank" rel="noopener"
              style={{ background: '#C4847E', color: '#fff', fontSize: 13, fontWeight: 400, padding: '12px 28px', borderRadius: 999, textDecoration: 'none' }}>
              {directionsCta}
            </a>
            <Link href="/contact" style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF7F2', fontSize: 13, fontWeight: 400, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              {bookingCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
