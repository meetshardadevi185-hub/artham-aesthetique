import Image from 'next/image'
import Link from 'next/link'
import { fetchDoctor, urlFor } from '@/sanity/client'

export const revalidate = 10
export const metadata = { title: 'Dr. Omaima Jawed — Tvak & Asthi by Artham' }

export default async function DoctorPage() {
  const doctor = await fetchDoctor().catch(() => null)
  const d = doctor || {}

  const specialties = d.specialties || [
    'Advanced beauty procedures', 'Laser therapy & skin rejuvenation',
    'Pigmentation & melasma treatment', 'Acne & acne scar management',
    'Anti-ageing & skin health', 'Personalised skincare protocols',
  ]

  const education = d.education || [
    { degree: 'MBBS', institution: 'Dr. DY Patil Medical College' },
    { degree: 'Aesthetic & Laser Medicine', institution: '5 years clinical experience · KureDerm / Tvak & Asthi by Artham' },
  ]

  const stats = d.stats || [
    { value: '5+', label: 'Years Experience' },
    { value: '500+', label: 'Patients Treated' },
    { value: '15+', label: 'Treatments Offered' },
    { value: '4.9★', label: 'Google Rating' },
  ]

  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* STATS STRIP */}
      <section style={{ padding: '40px 20px', background: '#1A2744' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }} className="grid-stats">
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 500, color: '#FAF7F2', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 300, color: '#A0B4C8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '64px 20px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }} className="grid-doctor">

          {/* LEFT: Content */}
          <div>
            {/* About */}
            <span className="eyebrow">Your Doctor</span>
            <h1 style={{ fontWeight: 500, marginBottom: 6 }}>{d.name || 'Dr. Omaima Jawed'}</h1>
            <p style={{ fontSize: 13.5, fontWeight: 400, color: '#B8916A', marginBottom: 28, letterSpacing: '0.04em' }}>
              {d.credentials || 'MBBS'} · {d.title || 'Aesthetic Physician'} · {d.experience || 5} Years Experience
            </p>

            <h2 style={{ fontWeight: 500, fontSize: 20, marginBottom: 16 }}>About Dr. Omaima</h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, marginBottom: 18 }}>
              {d.shortBio || 'Her dedication to enhancing natural beauty through personalised care and the latest techniques at Tvak & Asthi by Artham is well regarded. Dr. Omaima\'s commitment to understanding and meeting the specific aesthetic goals of her patients ensures that every treatment delivers optimal results and utmost satisfaction, promoting increased confidence and a renewed sense of self.'}
            </p>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, marginBottom: 36 }}>
              She takes a conservative, results-first philosophy: always starting with the least invasive option, never over-treating, and educating every patient so they understand their own skin.
            </p>

            {/* Areas of Expertise */}
            <h2 style={{ fontWeight: 500, fontSize: 20, marginBottom: 20 }}>Areas of Expertise</h2>
            <div style={{ marginBottom: 40 }} className="grid-expertise">
              {specialties.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6741" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 13.5, fontWeight: 400, color: '#4A3728' }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Education & Credentials */}
            <h2 style={{ fontWeight: 500, fontSize: 20, marginBottom: 24 }}>Education & Credentials</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {education.map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 0, paddingBottom: 24 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16, flexShrink: 0 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#1A2744', flexShrink: 0, marginTop: 3 }} />
                    {i < education.length - 1 && <div style={{ width: 2, flex: 1, background: '#E0D8D0', marginTop: 4 }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>{e.degree}</div>
                    <div style={{ fontSize: 13, fontWeight: 300, color: '#9A8A7A' }}>{e.institution}{e.year ? ` · ${e.year}` : ''}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Philosophy */}
            <div style={{ background: '#F5EDE4', borderRadius: 16, padding: '28px 28px', borderLeft: '3px solid #B8916A', marginTop: 8 }}>
              <p style={{ fontSize: 14.5, fontStyle: 'italic', fontWeight: 300, color: '#4A3728', lineHeight: 1.85, margin: 0 }}>
                "Every patient who sits in my chair deserves honest advice. I will never recommend a treatment you don't need, and I will always tell you what results are realistically achievable for your skin."
              </p>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginTop: 14 }}>— Dr. Omaima Jawed</div>
            </div>
          </div>

          {/* RIGHT: Photo + Booking card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Photo */}
            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#E8DED4', aspectRatio: '3/4', position: 'relative' }}>
              {d.photo ? (
                <Image
                  src={urlFor(d.photo).width(600).height(800).fit('crop').url()}
                  alt={d.name || 'Dr. Omaima Jawed'}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(184,145,106,0.5)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span style={{ fontSize: 12, fontWeight: 300, color: 'rgba(184,145,106,0.7)' }}>Dr. Omaima Jawed</span>
                </div>
              )}
            </div>

            {/* Booking card */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
              <div style={{ fontSize: 15.5, fontWeight: 500, color: 'var(--text)', marginBottom: 20 }}>Book with Dr. Omaima</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
                {[
                  { icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, text: 'Mon–Sat · 10am–7pm' },
                  { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, text: 'Sector 104, Noida' },
                  { icon: <><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></>, text: 'In-clinic & online video' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9A8A7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                    <span style={{ fontSize: 13, fontWeight: 300, color: '#4A3728' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" style={{ display: 'block', textAlign: 'center', background: '#1A2744', color: '#fff', fontSize: 13.5, fontWeight: 400, padding: '13px', borderRadius: 10, textDecoration: 'none', marginBottom: 10 }}>
                Book Appointment
              </Link>
              <a href="https://wa.me/919811997993" target="_blank" rel="noopener" style={{ display: 'block', textAlign: 'center', background: '#fff', color: '#4A6741', fontSize: 13.5, fontWeight: 400, padding: '13px', borderRadius: 10, textDecoration: 'none', border: '1.5px solid rgba(74,103,65,0.25)' }}>
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '64px 20px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="eyebrow">Patient Stories</span>
          <h2 style={{ fontWeight: 500, marginBottom: 32 }}>What patients say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {[
              { name: 'Priya S.', initials: 'PS', text: 'Dr. Omaima spent 30 minutes understanding my skin before recommending any treatment. I\'ve never felt more heard at a clinic.', treatment: 'Acne Clearance' },
              { name: 'Rohan M.', initials: 'RM', text: 'The results of my acne scar treatment are genuinely life-changing. Dr. Omaima was honest about expectations and delivered exactly what she promised.', treatment: 'MNRF Scar Revision' },
              { name: 'Anjali K.', initials: 'AK', text: 'I was sceptical of fillers but Dr. Omaima\'s conservative approach gave me the most natural result. Nobody can tell — they just say I look refreshed.', treatment: 'Dermal Fillers' },
            ].map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '24px 22px', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A2744', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#FAF7F2' }}>{t.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 300, color: '#9A8A7A' }}>{t.treatment}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                    {[...Array(5)].map((_, si) => <svg key={si} width="11" height="11" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/></svg>)}
                  </div>
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 300, lineHeight: 1.75, color: '#4A3728', margin: 0 }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
