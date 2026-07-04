'use client'

function StarRow({ count = 5 }) {
  return (
    <div style={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FBBC04">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/>
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div style={{
      width: 320, flexShrink: 0,
      background: '#fff', borderRadius: 16, padding: '24px 22px',
      border: '1.5px solid rgba(26,17,9,0.08)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A2744', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#FAF7F2' }}>{t.initials}</span>
        </div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>{t.name}</div>
          <div style={{ fontSize: 11.5, fontWeight: 300, color: '#9A8A7A' }}>{t.treatment} · {t.date}</div>
        </div>
        <StarRow count={t.rating || 5} />
      </div>
      <p style={{ fontSize: 13.5, fontWeight: 300, lineHeight: 1.75, color: '#4A3728', margin: 0 }}>{t.text}</p>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="13" height="13" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span style={{ fontSize: 11, fontWeight: 300, color: '#9A8A7A' }}>Google Review</span>
      </div>
    </div>
  )
}

export default function AnimatedTestimonials({ testimonials }) {
  const items = [...testimonials, ...testimonials, ...testimonials]

  return (
    <div style={{ overflow: 'hidden', margin: '0 -20px', padding: '4px 20px' }}>
      <div className="testimonials-track">
        {items.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  )
}
