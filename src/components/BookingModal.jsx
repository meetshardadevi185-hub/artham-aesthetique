'use client'
import { useState, useEffect } from 'react'

const TREATMENTS = [
  'HydraFacial MD', 'Carbon Laser Facial', 'Acne Clearance Program',
  'Acne Scar Revision — MNRF', 'Melasma Treatment', 'Anti-Wrinkle Botox',
  'Dermal Fillers', 'PRP Hair Restoration', 'GFC Hair Therapy',
  'Laser Hair Reduction', 'Not sure — I need advice',
]

const STEPS = [
  { id: 1, label: 'Select Treatment' },
  { id: 2, label: 'Your Details' },
  { id: 3, label: 'Confirm' },
]

export default function BookingModal({ open, onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ treatment: '', name: '', phone: '', email: '', date: '', note: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (open) { setStep(1); setSubmitted(false); setForm({ treatment: '', name: '', phone: '', email: '', date: '', note: '' }) }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const canNext = step === 1 ? !!form.treatment : step === 2 ? (form.name.trim() && form.phone.trim()) : true

  const handleSubmit = () => {
    const msg = `Hi, I'd like to book an appointment at Tvak & Asthi.%0ATreatment: ${form.treatment}%0AName: ${form.name}%0APhone: ${form.phone}%0APreferred date: ${form.date || 'Flexible'}%0A${form.note ? 'Note: ' + form.note : ''}`
    window.open(`https://wa.me/919811997993?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      {/* backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,17,9,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose} />

      <div style={{ position: 'relative', background: '#FAF7F2', borderRadius: 24, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(26,17,9,0.22)' }}>
        {/* Header */}
        <div style={{ padding: '28px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 6 }}>Tvak & Asthi</div>
            <h2 style={{ fontWeight: 500, fontSize: 20, color: '#1A1109', margin: 0, lineHeight: 1.2 }}>Book Your Consultation</h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: '#7A6A5A', marginTop: 4, marginBottom: 0 }}>Doctor-led · Personalised · No waiting lists</p>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'rgba(26,17,9,0.08)', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A3728" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {!submitted ? (
          <>
            {/* Step indicator */}
            <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center', gap: 0 }}>
              {STEPS.map((s, i) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: step > s.id ? '#4A6741' : step === s.id ? '#1A2744' : 'rgba(26,17,9,0.08)',
                      color: step >= s.id ? '#fff' : '#9A8A7A',
                      fontSize: 13, fontWeight: 500, transition: 'all .25s',
                    }}>
                      {step > s.id ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : s.id}
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: step === s.id ? 500 : 300, color: step === s.id ? '#1A2744' : '#9A8A7A', whiteSpace: 'nowrap' }}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: step > s.id ? '#4A6741' : 'rgba(26,17,9,0.1)', margin: '0 8px', marginBottom: 20, transition: 'background .25s' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <div style={{ padding: '24px 28px 0' }}>
              {step === 1 && (
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 400, color: '#4A3728', marginBottom: 16 }}>Which treatment are you interested in?</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 320, overflowY: 'auto', paddingRight: 4 }}>
                    {TREATMENTS.map(t => (
                      <button key={t} onClick={() => set('treatment', t)} style={{
                        textAlign: 'left', padding: '13px 16px', borderRadius: 12, cursor: 'pointer', transition: 'all .18s',
                        background: form.treatment === t ? '#1A2744' : '#fff',
                        color: form.treatment === t ? '#FAF7F2' : '#4A3728',
                        border: form.treatment === t ? '1.5px solid #1A2744' : '1.5px solid rgba(26,17,9,0.1)',
                        fontSize: 13.5, fontWeight: form.treatment === t ? 500 : 300,
                      }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 400, color: '#4A3728', margin: 0 }}>Tell us a little about yourself</p>
                  {[
                    { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'e.g. Priya Sharma' },
                    { key: 'phone', label: 'WhatsApp / Phone *', type: 'tel', placeholder: '09811997993' },
                    { key: 'email', label: 'Email (optional)', type: 'email', placeholder: 'you@email.com' },
                    { key: 'date', label: 'Preferred Date (optional)', type: 'date', placeholder: '' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#7A6A5A', marginBottom: 6, letterSpacing: '0.03em' }}>{label}</label>
                      <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid rgba(26,17,9,0.15)', background: '#fff', fontSize: 13.5, fontWeight: 300, color: '#1A1109', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#7A6A5A', marginBottom: 6 }}>Any notes for the doctor (optional)</label>
                    <textarea value={form.note} onChange={e => set('note', e.target.value)} rows={3} placeholder="e.g. I have sensitive skin, I'm on medication..."
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid rgba(26,17,9,0.15)', background: '#fff', fontSize: 13.5, fontWeight: 300, color: '#1A1109', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 400, color: '#4A3728', marginBottom: 20 }}>Review your booking details</p>
                  <div style={{ background: '#fff', borderRadius: 16, padding: '20px', border: '1.5px solid rgba(26,17,9,0.09)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { label: 'Treatment', value: form.treatment },
                      { label: 'Name', value: form.name },
                      { label: 'Phone', value: form.phone },
                      form.email && { label: 'Email', value: form.email },
                      form.date && { label: 'Preferred Date', value: form.date },
                      form.note && { label: 'Notes', value: form.note },
                    ].filter(Boolean).map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#9A8A7A', minWidth: 110, paddingTop: 1 }}>{label}</span>
                        <span style={{ fontSize: 13.5, fontWeight: 300, color: '#1A1109', lineHeight: 1.5 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, padding: '14px 16px', background: '#F5EDE4', borderRadius: 12 }}>
                    <p style={{ margin: 0, fontSize: 12.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.7 }}>
                      Clicking <strong style={{ fontWeight: 500 }}>Confirm</strong> will open WhatsApp with your details pre-filled. Our team will confirm your appointment within 2 hours.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div style={{ padding: '24px 28px 28px', display: 'flex', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)} style={{ fontSize: 13, fontWeight: 400, color: '#7A6A5A', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back
                </button>
              ) : <div />}
              {step < 3 ? (
                <button onClick={() => canNext && setStep(s => s + 1)} style={{
                  fontSize: 13.5, fontWeight: 500, padding: '13px 28px', borderRadius: 999, border: 'none', cursor: canNext ? 'pointer' : 'not-allowed',
                  background: canNext ? '#1A2744' : 'rgba(26,17,9,0.15)',
                  color: canNext ? '#FAF7F2' : '#9A8A7A', transition: 'all .18s',
                }}>
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit} style={{ fontSize: 13.5, fontWeight: 500, padding: '13px 28px', borderRadius: 999, border: 'none', cursor: 'pointer', background: '#C4847E', color: '#fff' }}>
                  Confirm via WhatsApp →
                </button>
              )}
            </div>
          </>
        ) : (
          /* Success */
          <div style={{ padding: '32px 28px 40px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#EEFAF2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E7D52" strokeWidth="2.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ fontWeight: 500, fontSize: 18, color: '#1A1109', marginBottom: 10 }}>Request Sent!</h3>
            <p style={{ fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.8, marginBottom: 28 }}>
              Your WhatsApp booking request has been sent. Dr. Omaima's team will confirm your appointment within 2 hours.
            </p>
            <button onClick={onClose} style={{ fontSize: 13, fontWeight: 400, padding: '11px 28px', borderRadius: 999, border: '1.5px solid rgba(26,17,9,0.15)', background: 'transparent', color: '#1A2744', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
