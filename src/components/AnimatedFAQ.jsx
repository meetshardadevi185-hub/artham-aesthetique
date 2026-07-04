'use client'
import { useState } from 'react'

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="reveal"
      style={{
        '--d': `${index * 70}ms`,
        background: '#fff',
        borderRadius: 12,
        border: '1.5px solid rgba(26,17,9,0.09)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '18px 22px', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 12, textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text)' }}>{question}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#B8916A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.32s cubic-bezier(.22,.68,0,.99)' }}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {/* grid-template-rows trick: 0fr → 1fr animates height without JS measurement */}
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.36s cubic-bezier(.22,.68,0,.99)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, padding: '4px 22px 20px', fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.75 }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedFAQ({ faqs }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {faqs.map((f, i) => (
        <FAQItem key={i} question={f.question} answer={f.answer} index={i} />
      ))}
    </div>
  )
}
