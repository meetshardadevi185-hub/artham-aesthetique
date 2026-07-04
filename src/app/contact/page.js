import { fetchContactPage } from '@/sanity/client'

export const revalidate = 10
export const metadata = { title: 'Contact — Tvak & Asthi by Artham' }

export default async function ContactPage() {
  const page = await fetchContactPage().catch(() => null)

  const hero = page?.hero || {}
  const contactInfo = page?.contactInfo || {}
  const formConfig = page?.formConfig || {}
  const hours = page?.hours || [
    { days: 'Mon – Sat', time: '10:00 AM – 7:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ]
  const concerns = formConfig.concerns || [
    'Acne & Breakouts', 'Acne Scars', 'Pigmentation', 'Hair Fall', 'Anti-Ageing', 'Skin Glow', 'Other',
  ]

  const phone    = contactInfo.phone    || '098119 97993'
  const whatsapp = contactInfo.whatsapp || '+919811997993'
  const address  = [contactInfo.addressLine1, contactInfo.addressLine2].filter(Boolean).join(', ')
    || 'Lotus Plaza, near Mithaas Sweets, Sector 104, Noida 201304'
  const mapsUrl  = contactInfo.mapsUrl  || 'https://maps.app.goo.gl/jhaUTtPyvnzMNbKq5'

  const infoCards = [
    {
      label: 'Phone', value: phone,
      link: `tel:${phone.replace(/\s/g, '')}`,
      icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.49 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.97a16 16 0 0 0 6.06 6.06l1.27-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    },
    {
      label: 'WhatsApp', value: `+${whatsapp.replace(/^\+/, '')}`,
      link: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
      icon: <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5Z"/>
    },
    {
      label: 'Address', value: address,
      link: mapsUrl,
      icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>
    },
  ]

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '52px 20px 44px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="eyebrow">{hero.eyebrow || 'Get in Touch'}</span>
          <h1 style={{ fontWeight: 500, marginBottom: 12 }}>{hero.heading || 'Book a Consultation'}</h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#7A6A5A', maxWidth: 480 }}>
            {hero.subtext || "Fill the form below and we'll get back within a few hours, or call/WhatsApp us directly."}
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 20px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }} className="grid-contact">
          {/* Form */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '36px 32px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
            <h2 style={{ fontWeight: 500, fontSize: 18, marginBottom: 28 }}>
              {formConfig.heading || 'Send us a message'}
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="grid-form">
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#4A3728', marginBottom: 6, letterSpacing: '0.04em' }}>Full Name</label>
                  <input type="text" placeholder="Your name" style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(26,17,9,0.14)', fontSize: 13.5, fontWeight: 300, outline: 'none', background: '#FAF7F2', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#4A3728', marginBottom: 6, letterSpacing: '0.04em' }}>Phone Number</label>
                  <input type="tel" placeholder="10-digit mobile" style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(26,17,9,0.14)', fontSize: 13.5, fontWeight: 300, outline: 'none', background: '#FAF7F2', fontFamily: 'inherit' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#4A3728', marginBottom: 6, letterSpacing: '0.04em' }}>Email (optional)</label>
                <input type="email" placeholder="email@example.com" style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(26,17,9,0.14)', fontSize: 13.5, fontWeight: 300, outline: 'none', background: '#FAF7F2', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#4A3728', marginBottom: 6, letterSpacing: '0.04em' }}>Main Concern</label>
                <select style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(26,17,9,0.14)', fontSize: 13.5, fontWeight: 300, outline: 'none', background: '#FAF7F2', fontFamily: 'inherit', appearance: 'none' }}>
                  <option value="">Select a concern</option>
                  {concerns.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#4A3728', marginBottom: 6, letterSpacing: '0.04em' }}>Message (optional)</label>
                <textarea placeholder="Tell us more about your concern…" rows={4} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(26,17,9,0.14)', fontSize: 13.5, fontWeight: 300, outline: 'none', background: '#FAF7F2', fontFamily: 'inherit', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: '#1A2744', color: '#fff', fontSize: 13.5, fontWeight: 400, padding: '14px', borderRadius: 999, border: 'none', cursor: 'pointer', letterSpacing: '0.02em', transition: 'background .18s' }}>
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {infoCards.map((info, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '20px', border: '1.5px solid rgba(26,17,9,0.09)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#EEF1F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{info.icon}</svg>
                </div>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A8A7A', marginBottom: 4 }}>{info.label}</div>
                  <a href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel="noopener"
                    style={{ fontSize: 13.5, fontWeight: 400, color: '#1A2744', textDecoration: 'none', lineHeight: 1.5 }}>{info.value}</a>
                </div>
              </div>
            ))}

            <div style={{ background: '#fff', borderRadius: 14, padding: '20px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
              <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A8A7A', marginBottom: 14 }}>Clinic Hours</div>
              {hours.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 300, color: '#4A3728', paddingBottom: 8, borderBottom: i < hours.length - 1 ? '1px solid rgba(26,17,9,0.07)' : 'none', marginBottom: 8 }}>
                  <span>{h.days}</span>
                  <span style={{ fontWeight: 400 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
