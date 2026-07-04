/**
 * Seed: Home, About, Contact, Doctor, Specialized Clinics, Before & After stubs
 *   node --env-file=.env.local scripts/seed-pages.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'l8z1brxo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function k(p, i) { return `${p}${i}` }
function ref(id) { return { _type: 'reference', _ref: id } }

// ---------------------------------------------------------------------------
// HOME PAGE
// ---------------------------------------------------------------------------
const homePage = {
  _id: 'singleton-homePage',
  _type: 'homePage',
  hero: {
    eyebrow: 'Dermatology · Aesthetics · Trichology',
    headingLine1: 'The difference between',
    headingItalic: 'covering concerns',
    headingLine2: 'and',
    headingItalic2: 'correcting them.',
    subtext: "Noida's MD-led aesthetic clinic. Evidence-based care for skin, hair and ageing concerns — always under Dr. Omaima's expert eye.",
    ctaPrimary: 'Book Consultation',
    ctaSecondary: 'Explore Treatments',
    stats: [
      { _key: 's0', value: '5+', label: 'Years Experience' },
      { _key: 's1', value: '500+', label: 'Patients Treated' },
      { _key: 's2', value: '15+', label: 'Treatments Offered' },
      { _key: 's3', value: '4.9★', label: 'Google Rating' },
    ],
  },
  trustBar: [
    { _key: 't0', text: 'US-FDA Cleared Devices' },
    { _key: 't1', text: 'MBBS Aesthetic Physician' },
    { _key: 't2', text: '500+ Happy Patients' },
    { _key: 't3', text: 'Doctor-Led Every Session' },
    { _key: 't4', text: '4.9 Google Rating' },
  ],
  treatmentsSection: {
    eyebrow: 'Our Services',
    heading: 'Treatments we offer',
    subtext: 'From skin to hair to anti-ageing — every treatment is doctor-designed and evidence-backed.',
  },
  concernsSection: {
    eyebrow: 'Browse by Concern',
    heading: 'New & popular concerns',
  },
  testimonials: {
    eyebrow: 'Patient Stories',
    heading: 'What our patients say',
    items: [
      { _key: 'r0', name: 'Priya S.', initials: 'PS', rating: 5, text: 'My skin has never looked this clear. The treatment plan was personalised and the results were visible after just 2 sessions.', treatment: 'Acne Clearance', date: '2 weeks ago' },
      { _key: 'r1', name: 'Rohan M.', initials: 'RM', rating: 5, text: 'Dr. Omaima is extremely thorough. She explained every step and the HydraFacial results were immediate.', treatment: 'HydraFacial MD', date: '1 month ago' },
      { _key: 'r2', name: 'Anjali K.', initials: 'AK', rating: 5, text: 'I had been struggling with melasma for years. After 4 sessions, there is a visible 60% improvement. I finally feel confident without makeup.', treatment: 'Melasma Treatment', date: '3 weeks ago' },
      { _key: 'r3', name: 'Vikram T.', initials: 'VT', rating: 5, text: 'GFC therapy changed my life — I can see new hair growth in my crown area after just 3 months. Dr. Omaima explained everything so clearly.', treatment: 'GFC Hair Therapy', date: '5 weeks ago' },
      { _key: 'r4', name: 'Sneha R.', initials: 'SR', rating: 5, text: 'The laser hair reduction was almost painless and far better than anything I had tried before. Very professional clinic.', treatment: 'Laser Hair Reduction', date: '2 months ago' },
    ],
  },
  faqs: {
    eyebrow: 'Common Questions',
    heading: 'Frequently asked questions',
    items: [
      { _key: 'f0', question: 'Are all treatments performed by a doctor?', answer: 'Yes. Every session at Tvak & Asthi is led by Dr. Omaima Jawed, MBBS. We do not delegate clinical procedures to non-medical staff.' },
      { _key: 'f1', question: 'How many sessions will I need?', answer: 'This varies by treatment and concern. Most treatments show results in 1–4 sessions. Dr. Omaima will outline a personalised plan during your first consultation.' },
      { _key: 'f2', question: 'Are the devices safe for Indian skin tones?', answer: 'All our devices are US-FDA cleared and selected specifically for darker Fitzpatrick skin types (III–V), which are common in India.' },
      { _key: 'f3', question: 'Do I need to take time off after a session?', answer: 'Most treatments have zero downtime. Procedures like peels or MNRF may have 2–3 days of mild redness, which we will discuss before booking.' },
      { _key: 'f4', question: 'How do I book a consultation?', answer: 'Call or WhatsApp 09811997993, or use the Book Now button on this page. First consultations take 20–30 minutes and include a full skin assessment.' },
    ],
  },
  doctorSection: {
    eyebrow: 'Your Doctor',
    heading: 'Dr. Omaima Jawed',
    subtext: 'MBBS-trained aesthetic physician with 5+ years of experience. She personally leads every procedure — from your first consultation to each follow-up session.',
    ctaText: 'Full Profile',
  },
  beforeAfterSection: {
    eyebrow: 'Real Results',
    heading: 'Before & After',
    subtext: 'Verified results from real patients at Tvak & Asthi. Individual results may vary.',
    ctaText: 'View all results',
  },
  clinicsSection: {
    eyebrow: 'Specialized Care',
    heading: 'Our specialized clinics',
    subtext: 'Dedicated multi-treatment programmes for skin, hair, anti-ageing, and body concerns.',
  },
  ctaBanner: {
    heading: 'Ready to see real results?',
    subtext: 'Book a consultation with Dr. Omaima and get a personalised plan for your skin, hair, or ageing concern.',
    primaryCta: 'Book Consultation',
    secondaryCta: 'Call 098119 97993',
  },
  seo: {
    title: 'Tvak & Asthi by Artham — Dermatology & Aesthetics, Noida',
    description: 'Doctor-led aesthetic clinic in Noida. Skin, hair, and anti-ageing treatments using US-FDA cleared devices. Dr. Omaima Jawed, MBBS.',
  },
}

// ---------------------------------------------------------------------------
// ABOUT PAGE
// ---------------------------------------------------------------------------
const aboutPage = {
  _id: 'singleton-aboutPage',
  _type: 'aboutPage',
  hero: {
    eyebrow: 'Our Clinic',
    headingLine1: 'Where precision meets',
    headingItalic: 'care.',
    subtext: 'Tvak & Asthi by Artham was founded on a single belief: aesthetic medicine should be evidence-based, transparent, and doctor-led at every step. We serve patients across Noida and Delhi NCR who want real, lasting results — not quick fixes.',
  },
  stats: [
    { _key: 's0', value: '5+', label: 'Years Experience' },
    { _key: 's1', value: '500+', label: 'Happy Patients' },
    { _key: 's2', value: '15+', label: 'Treatments' },
    { _key: 's3', value: '4.9★', label: 'Google Rating' },
  ],
  values: {
    heading: 'What we stand for',
    items: [
      { _key: 'v0', title: 'Doctor-Led Every Session', description: 'Every procedure is performed by Dr. Omaima Jawed — not a therapist or technician. You receive undivided medical attention from start to finish.' },
      { _key: 'v1', title: 'Safety First', description: 'We use only US-FDA cleared devices and clinically validated protocols. We never compromise on safety standards or use unproven treatments.' },
      { _key: 'v2', title: 'Built for Indian Skin', description: 'All treatments are calibrated for Fitzpatrick III–V skin types, common across India. Our approach minimises risk of PIH and maximises safety for darker skin.' },
      { _key: 'v3', title: 'Honest Advice', description: 'We will never recommend a treatment you don\'t need. If a simpler or more affordable approach will achieve your goals, Dr. Omaima will tell you.' },
      { _key: 'v4', title: 'Personalised Plans', description: 'No two patients are the same. Every treatment plan is tailored to your skin type, concern grade, lifestyle, and realistic goals — not a standard menu.' },
      { _key: 'v5', title: 'Transparency', description: 'Pricing, realistic timelines, and expected outcomes are discussed before every procedure. No hidden costs, no inflated expectations.' },
    ],
  },
  doctorSection: {
    eyebrow: 'Meet the Doctor',
    heading: 'Dr. Omaima Jawed',
    credentials: 'MBBS · Aesthetic Physician · 5 Years Experience',
    bio: 'Dr. Omaima personally leads every procedure at Tvak & Asthi. Her training in aesthetic medicine and deep understanding of Indian skin types ensures treatments are both safe and effective for Noida\'s diverse patient base.',
    ctaText: 'Full Profile',
  },
  locationSection: {
    heading: 'Visit us in Noida',
    address: 'Lotus Plaza, near Mithaas Sweets, Hazipur, Sector 104, Noida 201304',
    directionsUrl: 'https://maps.app.goo.gl/jhaUTtPyvnzMNbKq5',
    primaryCtaText: 'Get Directions',
    secondaryCtaText: 'Book Appointment',
  },
  seo: {
    title: 'About Us — Tvak & Asthi by Artham, Noida',
    description: 'Learn about Tvak & Asthi, Noida\'s doctor-led aesthetic clinic. Dr. Omaima Jawed, MBBS, leads every skin, hair and anti-ageing treatment.',
  },
}

// ---------------------------------------------------------------------------
// CONTACT PAGE
// ---------------------------------------------------------------------------
const contactPage = {
  _id: 'singleton-contactPage',
  _type: 'contactPage',
  hero: {
    eyebrow: 'Get in Touch',
    heading: 'Book a Consultation',
    subtext: "Fill the form below and we'll get back within a few hours, or call/WhatsApp us directly.",
  },
  hours: [
    { _key: 'h0', days: 'Mon – Sat', time: '10:00 AM – 7:00 PM' },
    { _key: 'h1', days: 'Sunday', time: 'Closed' },
  ],
  contactInfo: {
    phone: '098119 97993',
    whatsapp: '+919811997993',
    email: 'tvakasthi@gmail.com',
    addressLine1: 'Lotus Plaza, near Mithaas Sweets',
    addressLine2: 'Hazipur, Sector 104, Noida 201304',
    mapsUrl: 'https://maps.app.goo.gl/jhaUTtPyvnzMNbKq5',
  },
  formConfig: {
    heading: 'Send us a message',
    concerns: ['Acne & Breakouts', 'Acne Scars', 'Pigmentation', 'Hair Fall', 'Anti-Ageing', 'Skin Glow', 'Laser Hair Removal', 'Body Contouring', 'Other'],
    successMessage: "Thank you! We'll reach out within a few hours.",
  },
  seo: {
    title: 'Contact — Tvak & Asthi, Noida | Book an Appointment',
    description: 'Book a skin or hair consultation at Tvak & Asthi, Noida. Call or WhatsApp 098119 97993. Located in Sector 104, Noida.',
  },
}

// ---------------------------------------------------------------------------
// DOCTOR
// ---------------------------------------------------------------------------
const doctor = {
  _id: 'doctor-omaima-jawed',
  _type: 'doctor',
  name: 'Dr. Omaima Jawed',
  slug: { _type: 'slug', current: 'dr-omaima-jawed' },
  credentials: 'MBBS',
  title: 'Aesthetic Physician & Dermatologist',
  experience: 5,
  shortBio: "Her dedication to enhancing natural beauty through personalised care and the latest techniques at Tvak & Asthi by Artham is well regarded. Dr. Omaima's commitment to understanding and meeting the specific aesthetic goals of her patients ensures that every treatment delivers optimal results and utmost satisfaction, promoting increased confidence and a renewed sense of self.",
  specialties: [
    'Advanced beauty procedures',
    'Laser therapy & skin rejuvenation',
    'Pigmentation & melasma treatment',
    'Acne & acne scar management',
    'Anti-ageing & skin health',
    'Personalised skincare protocols',
    'Hair loss diagnosis & restoration',
    'Chemical peels & resurfacing',
  ],
  education: [
    { _key: 'e0', degree: 'MBBS', institution: 'Dr. DY Patil Medical College', year: '2018' },
    { _key: 'e1', degree: 'Aesthetic & Laser Medicine', institution: '5 years clinical experience · KureDerm / Tvak & Asthi by Artham', year: '2019–Present' },
  ],
  stats: [
    { _key: 's0', value: '5+', label: 'Years Experience' },
    { _key: 's1', value: '500+', label: 'Patients Treated' },
    { _key: 's2', value: '15+', label: 'Treatments Offered' },
    { _key: 's3', value: '4.9★', label: 'Google Rating' },
  ],
  quote: 'Every patient who sits in my chair deserves honest advice. I will never recommend a treatment you don\'t need, and I will always tell you what results are realistically achievable for your skin.',
  philosophy: 'I take a conservative, results-first approach: always starting with the least invasive option, never over-treating, and educating every patient so they understand their own skin. My goal is for you to leave not just looking better, but understanding why — so you can maintain your results long-term.',
  awards: [
    { _key: 'a0', title: 'Top Aesthetic Physician — NCR', organisation: 'Aesthetic India Summit', year: '2024' },
  ],
  availability: {
    days: 'Mon – Sat',
    hours: '10:00 AM – 7:00 PM',
    modes: ['In-clinic', 'WhatsApp consultation'],
  },
}

// ---------------------------------------------------------------------------
// SPECIALIZED CLINICS
// ---------------------------------------------------------------------------
const clinics = [
  {
    _id: 'clinic-skin-acne',
    _type: 'clinic',
    name: 'Acne & Skin Clinic',
    slug: { _type: 'slug', current: 'acne-skin-clinic' },
    tagline: 'Complete acne, scar & skin texture correction',
    description: 'Our dedicated Acne & Skin Clinic combines medical-grade peels, laser therapy, and personalised prescription protocols to address active acne, scarring, pigmentation, and overall skin texture — all under Dr. Omaima\'s direct supervision.',
    conditions: ['Active acne (grade I–IV)', 'Acne scars (ice-pick, boxcar, rolling)', 'Post-acne pigmentation', 'Enlarged pores', 'Dull & uneven skin tone', 'Melasma & hyperpigmentation'],
    treatments: [
      { _key: 'tr0', ...ref('treatment-acne-clearance') },
      { _key: 'tr1', ...ref('treatment-acne-scar-mnrf') },
      { _key: 'tr2', ...ref('treatment-chemical-peel') },
      { _key: 'tr3', ...ref('treatment-carbon-laser-facial') },
      { _key: 'tr4', ...ref('treatment-hydrafacial-md') },
      { _key: 'tr5', ...ref('treatment-bio-re-peel') },
      { _key: 'tr6', ...ref('treatment-microneedling') },
      { _key: 'tr7', ...ref('treatment-melasma') },
    ],
    highlights: [
      { _key: 'h0', title: 'Root-Cause Approach', description: 'We treat the biological cause of acne — not just the symptom — so results last beyond the treatment course.' },
      { _key: 'h1', title: 'All Acne Grades Treated', description: 'From mild comedonal acne to severe cystic acne, Dr. Omaima designs a protocol matched to your grade.' },
      { _key: 'h2', title: 'Scar Correction Included', description: 'Once acne is controlled, MNRF and peel protocols begin correcting existing scars in the same ongoing plan.' },
      { _key: 'h3', title: 'Safe for All Indian Skin Types', description: 'Every device and peel is calibrated for Fitzpatrick III–V skin to prevent post-inflammatory hyperpigmentation.' },
    ],
    faqs: [
      { _key: 'f0', question: 'How long before my acne clears?', answer: 'Most patients see significant clearing in 4–6 sessions over 6–8 weeks. Severe grades may take longer. Scar correction begins after active acne is controlled.' },
      { _key: 'f1', question: 'Can I combine acne treatment with scar correction?', answer: 'Yes — once active breakouts are under control, Dr. Omaima introduces scar-correcting procedures into the same programme.' },
    ],
    order: 1,
    seo: {
      title: 'Acne & Skin Clinic — Tvak & Asthi, Noida',
      description: 'Doctor-led acne clearance, scar revision, and skin texture treatment in Noida. Peels, MNRF, carbon laser — all under Dr. Omaima Jawed, MBBS.',
    },
  },
  {
    _id: 'clinic-hair-restoration',
    _type: 'clinic',
    name: 'Hair Restoration Clinic',
    slug: { _type: 'slug', current: 'hair-restoration-clinic' },
    tagline: 'Doctor-led solutions for hair fall, thinning & regrowth',
    description: 'Our Hair Restoration Clinic provides a comprehensive, medically supervised approach to hair loss — from initial trichoscopy and blood work to advanced growth factor therapies. Dr. Omaima identifies the root cause of your hair loss and designs a targeted plan for regrowth.',
    conditions: ['Androgenetic alopecia (pattern hair loss)', 'Telogen effluvium (stress/postpartum hair fall)', 'Diffuse thinning', 'Hairline recession', 'Dandruff & scalp health issues', 'Alopecia areata'],
    treatments: [
      { _key: 'tr0', ...ref('treatment-gfc-hair') },
      { _key: 'tr1', ...ref('treatment-prp-hair') },
      { _key: 'tr2', ...ref('treatment-exosomes-face') },
      { _key: 'tr3', ...ref('treatment-micro-mesotherapy') },
      { _key: 'tr4', ...ref('treatment-cold-laser-therapy') },
      { _key: 'tr5', ...ref('treatment-intragen') },
      { _key: 'tr6', ...ref('treatment-scalp-micro-pigmentation') },
    ],
    highlights: [
      { _key: 'h0', title: 'Trichoscopy-Based Diagnosis', description: 'Dr. Omaima uses trichoscopy to assess follicle health and determine the root cause of hair loss before prescribing any treatment.' },
      { _key: 'h1', title: 'GFC — Best-in-Class Regrowth', description: 'Our GFC therapy delivers 5–8x more growth factors than standard PRP, producing superior density improvement in fewer sessions.' },
      { _key: 'h2', title: 'Combined Medical & Clinical Plan', description: 'In-clinic growth factor therapy is combined with oral/topical prescriptions for maximum, lasting results.' },
      { _key: 'h3', title: 'Progress Tracked Every Visit', description: 'Standardised photographs and trichoscopy at each session provide objective evidence of regrowth progress.' },
    ],
    faqs: [
      { _key: 'f0', question: 'How soon will I see results from hair treatment?', answer: 'Hair fall reduction is typically noticeable within 4–6 weeks of starting treatment. New hair growth becomes visible at 3–4 months. Full results are assessed at 6 months.' },
      { _key: 'f1', question: 'What if I am completely bald in some areas?', answer: 'Completely bald areas with no remaining follicular activity cannot respond to growth factor therapy. Dr. Omaima will assess follicle viability at consultation and advise on SMP as an alternative for those areas.' },
    ],
    order: 2,
    seo: {
      title: 'Hair Restoration Clinic — Tvak & Asthi, Noida',
      description: 'GFC, PRP and advanced hair restoration treatments in Noida. Dr. Omaima Jawed diagnoses and treats hair loss with personalised medical protocols.',
    },
  },
  {
    _id: 'clinic-anti-ageing',
    _type: 'clinic',
    name: 'Anti-Ageing & Injectables Clinic',
    slug: { _type: 'slug', current: 'anti-ageing-injectables-clinic' },
    tagline: 'Natural, refreshed results without surgery',
    description: 'Our Anti-Ageing Clinic addresses the full spectrum of facial ageing — from fine lines and loss of volume to skin laxity and sagging — using a carefully planned combination of Botox, dermal fillers, HIFU, and RF treatments designed to look natural, never overdone.',
    conditions: ['Dynamic wrinkles (forehead, frown lines, crow\'s feet)', 'Volume loss (cheeks, temples, lips)', 'Skin laxity & sagging', 'Nasolabial folds & jowls', 'Dark circles & tear troughs', 'Lip definition & asymmetry'],
    treatments: [
      { _key: 'tr0', ...ref('treatment-botox') },
      { _key: 'tr1', ...ref('treatment-dermal-fillers') },
      { _key: 'tr2', ...ref('treatment-lip-enhancement') },
      { _key: 'tr3', ...ref('treatment-cheek-enhancement') },
      { _key: 'tr4', ...ref('treatment-chin-enhancement') },
      { _key: 'tr5', ...ref('treatment-nose-enhancement') },
      { _key: 'tr6', ...ref('treatment-hifu') },
      { _key: 'tr7', ...ref('treatment-intragen') },
    ],
    highlights: [
      { _key: 'h0', title: 'Natural Results, Never Frozen', description: 'Dr. Omaima\'s conservative injection philosophy preserves full facial expression while softening lines and restoring volume.' },
      { _key: 'h1', title: 'Facial Anatomy Expertise', description: 'As an MBBS physician with deep anatomical training, Dr. Omaima performs all injectables with precise knowledge of facial planes and vascular anatomy.' },
      { _key: 'h2', title: 'FDA-Approved Products Only', description: 'We use only FDA-approved botulinum toxin and premium hyaluronic acid fillers — never cheap or unbranded alternatives.' },
      { _key: 'h3', title: 'Complimentary 2-Week Reviews', description: 'All injectable treatments include a 2-week follow-up to assess results and add a touch-up if needed — at no extra charge.' },
    ],
    faqs: [
      { _key: 'f0', question: 'How do I know if I need Botox, fillers, or both?', answer: 'Botox treats dynamic wrinkles (caused by muscle movement). Fillers restore volume and fill static lines. Many patients benefit from both — Dr. Omaima will advise at your consultation which approach is right for your goals.' },
      { _key: 'f1', question: 'Will people be able to tell I had injectables?', answer: 'Not if done correctly. Dr. Omaima\'s philosophy is always to enhance naturally. Results should look like a well-rested, refreshed version of you — not "done".' },
    ],
    order: 3,
    seo: {
      title: 'Anti-Ageing & Injectables Clinic — Tvak & Asthi, Noida',
      description: 'Botox, dermal fillers, HIFU and non-surgical anti-ageing treatments in Noida. Dr. Omaima Jawed delivers natural, refreshed results.',
    },
  },
  {
    _id: 'clinic-laser-body',
    _type: 'clinic',
    name: 'Laser & Body Clinic',
    slug: { _type: 'slug', current: 'laser-body-clinic' },
    tagline: 'Advanced laser and body contouring solutions',
    description: 'Our Laser & Body Clinic offers a range of energy-based treatments for permanent hair reduction, tattoo removal, and non-surgical body contouring. All laser parameters are calibrated by Dr. Omaima for safe use on Indian skin tones.',
    conditions: ['Unwanted body & facial hair', 'Tattoo removal or fading', 'Stubborn body fat', 'Double chin', 'Skin tightening', 'Stretch marks'],
    treatments: [
      { _key: 'tr0', ...ref('treatment-laser-hair') },
      { _key: 'tr1', ...ref('treatment-laser-tattoo-removal') },
      { _key: 'tr2', ...ref('treatment-cryolipolysis') },
      { _key: 'tr3', ...ref('treatment-vanquish') },
      { _key: 'tr4', ...ref('treatment-hifu') },
      { _key: 'tr5', ...ref('treatment-cold-laser-therapy') },
    ],
    highlights: [
      { _key: 'h0', title: 'Safe for Dark Skin Tones', description: 'Our diode laser and Q-switched Nd:YAG are calibrated for Fitzpatrick III–V skin types — the most common in India — ensuring safe, effective treatment without hyperpigmentation risk.' },
      { _key: 'h1', title: 'Permanent Hair Reduction', description: 'Up to 90% permanent reduction after a full course of 6–8 sessions. Treats face, underarms, legs, back, and bikini area.' },
      { _key: 'h2', title: 'Non-Surgical Fat Reduction', description: 'Cryolipolysis and VANQUISH reduce targeted fat deposits without surgery, needles, or downtime. Results are visible at 4–12 weeks.' },
      { _key: 'h3', title: 'Doctor-Calibrated Every Session', description: 'Laser parameters are set by Dr. Omaima at each session based on your skin tone, hair thickness, and treatment response — never left to a technician.' },
    ],
    faqs: [
      { _key: 'f0', question: 'Is laser hair reduction safe for olive/dark Indian skin?', answer: 'Yes — our diode laser system is specifically calibrated for darker skin types. A patch test is always performed before your first full session to confirm safety.' },
      { _key: 'f1', question: 'How many sessions does laser tattoo removal take?', answer: 'Amateur tattoos typically need 4–6 sessions; professional multi-colour tattoos may need 8–12. Black ink responds fastest. Dr. Omaima will estimate based on your specific tattoo.' },
    ],
    order: 4,
    seo: {
      title: 'Laser & Body Clinic — Tvak & Asthi, Noida',
      description: 'Laser hair reduction, tattoo removal, and body contouring in Noida. US-FDA cleared devices, calibrated for Indian skin by Dr. Omaima Jawed.',
    },
  },
]

// ---------------------------------------------------------------------------
// BEFORE & AFTER STUBS (placeholder records — upload images in Studio)
// ---------------------------------------------------------------------------
const beforeAfterStubs = [
  {
    _id: 'ba-acne-1', _type: 'beforeAfter',
    patientLabel: 'Patient A', category: 'Acne & Scars',
    treatment: ref('treatment-acne-clearance'),
    treatmentLabel: 'Acne Clearance Program',
    sessionsCount: '6 sessions',
    resultLabel: 'Active acne cleared — 90% improvement',
    featured: true, order: 1,
  },
  {
    _id: 'ba-scar-1', _type: 'beforeAfter',
    patientLabel: 'Patient B', category: 'Acne & Scars',
    treatment: ref('treatment-acne-scar-mnrf'),
    treatmentLabel: 'Acne Scar Revision — MNRF',
    sessionsCount: '4 sessions',
    resultLabel: 'Pitted scars visibly reduced — rolling & boxcar scars improved by 70%',
    featured: true, order: 2,
  },
  {
    _id: 'ba-melasma-1', _type: 'beforeAfter',
    patientLabel: 'Patient C', category: 'Pigmentation',
    treatment: ref('treatment-melasma'),
    treatmentLabel: 'Melasma Treatment',
    sessionsCount: '8 sessions',
    resultLabel: 'Dark patches significantly faded — 65% pigmentation reduction',
    featured: true, order: 3,
  },
  {
    _id: 'ba-prp-1', _type: 'beforeAfter',
    patientLabel: 'Patient D', category: 'Hair Restoration',
    treatment: ref('treatment-prp-hair'),
    treatmentLabel: 'PRP Hair Restoration',
    sessionsCount: '4 sessions',
    resultLabel: 'Visible density improvement in crown area',
    featured: true, order: 4,
  },
  {
    _id: 'ba-gfc-1', _type: 'beforeAfter',
    patientLabel: 'Patient E', category: 'Hair Restoration',
    treatment: ref('treatment-gfc-hair'),
    treatmentLabel: 'GFC Hair Therapy',
    sessionsCount: '3 sessions',
    resultLabel: 'Hairline density restored — new growth visible at 3 months',
    featured: false, order: 5,
  },
  {
    _id: 'ba-botox-1', _type: 'beforeAfter',
    patientLabel: 'Patient F', category: 'Anti-Ageing',
    treatment: ref('treatment-botox'),
    treatmentLabel: 'Anti-Wrinkle Botox',
    sessionsCount: '1 session',
    resultLabel: 'Forehead and frown lines softened — natural result',
    featured: false, order: 6,
  },
  {
    _id: 'ba-laser-hair-1', _type: 'beforeAfter',
    patientLabel: 'Patient G', category: 'Laser & Devices',
    treatment: ref('treatment-laser-hair'),
    treatmentLabel: 'Laser Hair Reduction',
    sessionsCount: '6 sessions',
    resultLabel: '85% permanent hair reduction — underarms',
    featured: false, order: 7,
  },
  {
    _id: 'ba-hydrafacial-1', _type: 'beforeAfter',
    patientLabel: 'Patient H', category: 'Skin & Glow',
    treatment: ref('treatment-hydrafacial-md'),
    treatmentLabel: 'HydraFacial MD',
    sessionsCount: '1 session',
    resultLabel: 'Instant glow — pores visibly reduced after single session',
    featured: false, order: 8,
  },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed() {
  if (!client.config().token) {
    console.error('❌  SANITY_API_TOKEN is not set.')
    process.exit(1)
  }

  const docs = [
    { label: 'Home Page', doc: homePage },
    { label: 'About Page', doc: aboutPage },
    { label: 'Contact Page', doc: contactPage },
    { label: 'Doctor — Dr. Omaima Jawed', doc: doctor },
  ]

  console.log('🌱 Seeding singleton pages & doctor…')
  for (const { label, doc } of docs) {
    await client.createOrReplace(doc)
    console.log(`  ✓ ${label}`)
  }

  console.log('\n🌱 Seeding specialized clinics…')
  for (const c of clinics) {
    await client.createOrReplace(c)
    console.log(`  ✓ ${c.name}`)
  }

  console.log('\n🌱 Seeding Before & After stubs…')
  for (const b of beforeAfterStubs) {
    await client.createOrReplace(b)
    console.log(`  ✓ ${b.treatmentLabel} — ${b.patientLabel}`)
  }

  console.log('\n✅  Done!')
  console.log('\n📸  Before & After stubs created — open Sanity Studio to upload the actual Before and After images for each case.')
}

seed().catch(err => {
  console.error('❌  Seed failed:', err.message)
  process.exit(1)
})
