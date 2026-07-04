'use client'

export default function MarqueeTrustBar({ items }) {
  const doubled = [...items, ...items]

  return (
    <section style={{ background: '#fff', borderTop: '1px solid rgba(26,17,9,0.07)', borderBottom: '1px solid rgba(26,17,9,0.07)', padding: '14px 0', overflow: 'hidden' }}>
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ background: '#FAF7F2', border: '1px solid rgba(26,17,9,0.1)', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 400, color: '#4A3728', whiteSpace: 'nowrap' }}>
              {t.text}
            </span>
            <span style={{ color: '#B8916A', fontSize: 9, lineHeight: 1 }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
