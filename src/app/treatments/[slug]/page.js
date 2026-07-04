import Image from 'next/image'
import Link from 'next/link'
import { fetchTreatment, fetchTreatments, urlFor } from '@/sanity/client'

export const revalidate = 10

export async function generateStaticParams() {
  const base = [
    'hydrafacial-md', 'carbon-laser-facial', 'prp-hair', 'gfc-hair', 'chemical-peel',
    'microneedling', 'dermal-fillers', 'botox', 'laser-hair', 'acne-treatment',
    'laser-tattoo-removal', 'exosomes-face', 'micro-mesotherapy', 'cold-laser-therapy',
    'scalp-micro-pigmentation', 'lip-enhancement', 'cheek-enhancement', 'chin-enhancement',
    'nose-enhancement', 'cryolipolysis', 'hifu', 'intragen', 'vanquish', 'bio-re-peel',
  ].map(slug => ({ slug }))
  const sanity = await fetchTreatments().catch(() => [])
  const sanityParams = sanity
    .filter(t => t.slug?.current)
    .map(t => ({ slug: t.slug.current }))
  const seen = new Set(base.map(p => p.slug))
  sanityParams.forEach(p => { if (!seen.has(p.slug)) base.push(p) })
  return base
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const t = await fetchTreatment(slug).catch(() => null)
  return { title: t ? `${t.name} — Tvak & Asthi` : 'Treatment — Tvak & Asthi' }
}

const FALLBACK_TREATMENTS = {
  'hydrafacial-md': {
    name: 'HydraFacial MD', category: 'Skin & Glow', tagline: 'Deep cleanse, instant glow',
    description: 'HydraFacial MD is a patented multi-step treatment that cleanses, exfoliates, extracts impurities, and infuses the skin with potent serums — all in a single session. It is the only treatment that combines these actions without irritation, making it suitable for all skin types including sensitive skin.',
    meta: { Duration: '45–60 min', Sessions: '1 (or monthly)', Recovery: 'None', Results: 'Immediate' },
    howItWorks: [
      { step: 1, title: 'Cleanse & Peel', description: 'A gentle vortex tip removes dead skin and opens pores using a mild glycolic + salicylic acid blend.' },
      { step: 2, title: 'Acid Peel', description: 'Glycolic and salicylic acids loosen deep-seated debris without the irritation of traditional peels.' },
      { step: 3, title: 'Extract & Hydrate', description: 'Automated painless suction extracts clogged pores while delivering hyaluronic acid to plump the skin.' },
      { step: 4, title: 'Fuse & Protect', description: 'Antioxidants, peptides, and hyaluronic acid are infused under light pressure to lock in hydration and protect the skin barrier.' },
    ],
    benefits: ['Instant visible glow', 'Reduced pore size', 'Improved skin texture', 'Deeply hydrated skin', 'Reduced fine lines', 'Even skin tone'],
    faqs: [
      { question: 'Is HydraFacial suitable for sensitive skin?', answer: 'Yes. The serums are clinically formulated and the suction pressure is adjustable. Dr. Omaima customises the protocol for your skin type before each session.' },
      { question: 'How quickly will I see results?', answer: 'Results are visible immediately after the session. Most patients notice brighter, more hydrated skin the same evening.' },
      { question: 'How often should I get HydraFacial?', answer: 'Monthly sessions are recommended for maintenance. If you have a special event, a single session 3–5 days before is ideal.' },
      { question: 'Can I wear makeup after?', answer: 'Yes, but we recommend waiting at least 4–6 hours after the session to allow the serums to fully absorb.' },
    ],
  },
  'carbon-laser-facial': {
    name: 'Carbon Laser Facial', category: 'Skin & Glow', tagline: 'Pore tightening & oil control',
    description: 'The Carbon Laser Facial (also called the "Hollywood Peel") uses a layer of medical-grade activated carbon applied to the skin, then targeted with a Q-switched Nd:YAG laser. The laser vaporises the carbon along with oil, blackheads, and dead skin cells — leaving skin visibly clearer, tighter, and luminous.',
    meta: { Duration: '30–40 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '1–2 weeks' },
    howItWorks: [
      { step: 1, title: 'Carbon Application', description: 'A thin, even layer of medical-grade carbon lotion is applied across the face and left to penetrate the pores for 10 minutes.' },
      { step: 2, title: 'Low-Fluence Laser Pass', description: 'A broad laser pass gently heats the carbon and skin beneath, stimulating collagen and closing large pores.' },
      { step: 3, title: 'High-Fluence Exfoliation', description: 'A second pass at higher intensity vaporises the carbon layer, instantly removing oil, blackheads and surface debris.' },
      { step: 4, title: 'Cooling & Moisturising', description: 'A calming serum and SPF are applied to soothe and protect the freshly treated skin.' },
    ],
    benefits: ['Reduced oiliness', 'Minimised pore appearance', 'Instant skin brightening', 'Reduced blackheads', 'Stimulates collagen', 'No downtime'],
    faqs: [
      { question: 'Does it hurt?', answer: 'Most patients describe it as a warm snapping sensation. The procedure is well-tolerated and no anaesthesia is needed.' },
      { question: 'Is it suitable for oily and acne-prone skin?', answer: 'Yes — it is one of the best treatments for oily skin. It reduces sebum production and clears congested pores over a course of sessions.' },
      { question: 'How many sessions will I need?', answer: 'We recommend 4–6 sessions spaced 2–4 weeks apart for optimal results. Maintenance sessions every 6–8 weeks thereafter.' },
      { question: 'Can darker skin tones get this treatment?', answer: 'Yes. Our Q-switched Nd:YAG laser is specifically calibrated for safer use on Fitzpatrick III–V skin types common in India.' },
    ],
  },
  'acne-clearance': {
    name: 'Acne Clearance Program', category: 'Acne & Scars', tagline: 'Root-cause acne treatment',
    description: 'Our Acne Clearance Program is a structured multi-session protocol that addresses the root causes of acne — excess sebum, bacteria, inflammation, and hormonal triggers. It combines clinical treatments with topical prescription protocols so results last beyond the treatment period.',
    meta: { Duration: '30–45 min / session', Sessions: '4–8 sessions', Recovery: 'Minimal', Results: '4–6 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Assessment & Diagnosis', description: 'Dr. Omaima examines your acne grade, skin type, and triggers — including hormonal and dietary factors — before designing a personalised plan.' },
      { step: 2, title: 'Chemical Peels', description: 'Salicylic acid or combination peels deeply exfoliate, unclog pores, and reduce active breakouts with each session.' },
      { step: 3, title: 'Blue Light / Laser Therapy', description: 'Anti-bacterial blue light or a low-fluence Nd:YAG laser destroys acne-causing bacteria deep within the follicles.' },
      { step: 4, title: 'Topical & Prescription Support', description: 'A customised home skincare protocol using prescription-strength actives is prescribed alongside the in-clinic treatment.' },
    ],
    benefits: ['Clears active breakouts', 'Prevents new acne', 'Reduces redness and inflammation', 'Addresses root cause', 'Prescription-backed plan', 'Suitable for all acne grades'],
    faqs: [
      { question: 'How long before I see a difference?', answer: 'Most patients see a reduction in active breakouts within 2–3 sessions. Skin clarity continues to improve over 4–6 weeks.' },
      { question: 'Will the acne come back?', answer: 'With our maintenance protocol and home skincare plan, recurrence is significantly reduced. Dr. Omaima will identify your specific triggers to keep acne controlled long-term.' },
      { question: 'Is it safe to do while using oral antibiotics or Accutane?', answer: 'This depends on the medications. Let us know your current medications at the consultation and Dr. Omaima will plan accordingly.' },
      { question: 'Can I wear makeup during the course?', answer: 'We recommend switching to non-comedogenic products during the program. Dr. Omaima will advise which products are safe to continue using.' },
    ],
  },
  'acne-scar-mnrf': {
    name: 'Acne Scar Revision — MNRF', category: 'Acne & Scars', tagline: 'Pitted & rolling scar correction',
    description: 'Microneedling Radiofrequency (MNRF) is the most effective treatment for atrophic acne scars including ice-pick, boxcar, and rolling scars. Insulated gold-plated microneedles deliver fractional RF energy precisely at the dermal layer, triggering intensive collagen remodelling without damaging the skin surface.',
    meta: { Duration: '60–75 min', Sessions: '3–5 sessions', Recovery: '2–3 days redness', Results: '4–6 weeks per session' },
    howItWorks: [
      { step: 1, title: 'Topical Anaesthesia', description: 'A numbing cream is applied 30–45 minutes before the procedure to ensure complete comfort throughout.' },
      { step: 2, title: 'MNRF Treatment Pass', description: 'An insulated microneedling device is passed across scarred areas, delivering radiofrequency energy at precise depths of 1.5–3.5mm.' },
      { step: 3, title: 'Collagen Induction', description: 'The combined mechanical and thermal injury triggers the body\'s wound-healing response — generating new collagen and elastin that fills scar depressions.' },
      { step: 4, title: 'Post-Treatment Care', description: 'A calming serum and strict SPF protocol are applied. Mild redness resolves within 24–72 hours.' },
    ],
    benefits: ['Reduces ice-pick, boxcar and rolling scars', 'Deep collagen remodelling', 'Minimal surface damage', 'Visible improvement from session 1', 'Safe for dark skin tones', 'Simultaneously tightens skin'],
    faqs: [
      { question: 'How many sessions will I need?', answer: 'Most patients require 3–5 sessions spaced 4–6 weeks apart. Deeper scars may need up to 6 sessions. Dr. Omaima will set realistic expectations at your consultation.' },
      { question: 'Is it painful?', answer: 'Topical anaesthetic is applied before the session. During treatment most patients feel slight pressure and warmth. Post-session redness typically resolves in 1–2 days.' },
      { question: 'What is the downtime?', answer: 'Redness and mild swelling resolve within 24–72 hours. You can resume work and daily activities the next day with SPF.' },
      { question: 'What types of scars respond best?', answer: 'Rolling and boxcar scars show the best improvement. Ice-pick scars improve too but may need additional treatments like TCA cross. Dr. Omaima will advise the best combination for your scar type.' },
    ],
  },
  'melasma': {
    name: 'Melasma Treatment', category: 'Pigmentation', tagline: 'Pigmentation & dark patch removal',
    description: 'Melasma causes dark, irregular patches on the face — typically triggered by sun exposure, hormonal changes, and genetics. Our protocol combines laser toning, chemical peels, and a medicated home care plan to fade patches and prevent relapse effectively.',
    meta: { Duration: '30–45 min / session', Sessions: '6–8 sessions', Recovery: 'None', Results: '6–8 weeks' },
    howItWorks: [
      { step: 1, title: 'Root Cause Assessment', description: 'Dr. Omaima evaluates your melasma pattern, depth (epidermal vs mixed), and hormonal history to design the most effective protocol.' },
      { step: 2, title: 'Laser Toning (Q-Switched Nd:YAG)', description: 'Low-fluence Q-switched laser passes break up melanin clusters in the epidermis without creating heat damage to surrounding skin.' },
      { step: 3, title: 'Chemical Peel Layer', description: 'A Kojic acid or modified Jessner peel is applied after the laser to accelerate cell turnover and brighten the skin.' },
      { step: 4, title: 'Prescription Maintenance', description: 'A medicated home regime with prescription-strength depigmenting agents and broad-spectrum SPF 50 is mandatory between sessions to prevent rebound.' },
    ],
    benefits: ['Fades dark patches', 'Prevents rebound pigmentation', 'Safe for Indian skin', 'Combines multiple modalities', 'Hormonal trigger management', 'Long-term maintenance plan'],
    faqs: [
      { question: 'Can melasma be completely cured?', answer: 'Melasma is a chronic condition that can be well-controlled but not permanently cured. With the right protocol and SPF discipline, patches can be almost invisible. Dr. Omaima will explain realistic expectations based on your type.' },
      { question: 'What makes Indian skin harder to treat?', answer: 'Darker skin (Fitzpatrick III–V) has more reactive melanocytes that can overproduce pigment if treatment is too aggressive. Our low-fluence approach avoids post-inflammatory hyperpigmentation.' },
      { question: 'Do I need to stop hormonal contraception?', answer: 'Hormonal contraception can worsen melasma. Dr. Omaima will discuss this during your consultation — sometimes a switch to non-hormonal options significantly helps.' },
      { question: 'How important is sunscreen?', answer: 'SPF is non-negotiable with melasma. Even brief UV exposure can undo weeks of treatment. We recommend SPF 50 every morning, reapplied every 2 hours when outdoors.' },
    ],
  },
  'botox': {
    name: 'Anti-Wrinkle Botox', category: 'Anti-Ageing', tagline: 'Expression line softening',
    description: 'Botulinum toxin (Botox) is the gold standard for softening dynamic wrinkles caused by repeated facial muscle movements — forehead lines, frown lines, and crow\'s feet. When administered by Dr. Omaima, results are natural and refreshed, never frozen.',
    meta: { Duration: '15–20 min', Sessions: '1 (every 4–6 months)', Recovery: 'None', Results: '3–5 days' },
    howItWorks: [
      { step: 1, title: 'Facial Mapping', description: 'Dr. Omaima assesses your facial anatomy, muscle movement patterns, and areas of concern to plan precise injection points.' },
      { step: 2, title: 'Micro-injections', description: 'Tiny amounts of botulinum toxin are injected into targeted muscles using ultra-fine needles. The procedure takes under 20 minutes.' },
      { step: 3, title: 'Muscle Relaxation', description: 'The toxin temporarily blocks the nerve signal to treated muscles, softening the overlying wrinkles without affecting surrounding muscles.' },
      { step: 4, title: 'Results & Review', description: 'Results appear in 3–5 days and peak at 2 weeks. A 2-week review is included to assess and touch up if needed.' },
    ],
    benefits: ['Softens forehead lines', 'Smoothes frown lines (11s)', 'Reduces crow\'s feet', 'Natural, refreshed result', 'No downtime', 'Preventive for younger patients'],
    faqs: [
      { question: 'Will it look natural?', answer: 'Yes — Dr. Omaima\'s technique preserves full natural expression while softening lines. The goal is to look refreshed, not frozen. Conservative dosing is always preferred and can be built up at your 2-week review.' },
      { question: 'Does it hurt?', answer: 'The needles used are ultra-fine and injection sites are small. Most patients describe it as tiny pinpricks. No anaesthetic is needed.' },
      { question: 'How long do results last?', answer: 'Results typically last 4–6 months. With regular treatments, muscles gradually weaken and results can last longer.' },
      { question: 'Who should avoid Botox?', answer: 'Botox is not recommended during pregnancy or breastfeeding, or if you have neuromuscular conditions. A full medical history is taken before any procedure.' },
    ],
  },
  'fillers': {
    name: 'Dermal Fillers', category: 'Anti-Ageing', tagline: 'Volume restoration & contouring',
    description: 'Dermal fillers are hyaluronic acid-based injectable gels that restore lost facial volume, smooth deep folds, and enhance natural contours. Dr. Omaima uses only premium FDA-approved fillers and precise anatomical injection techniques to create subtle, harmonious results.',
    meta: { Duration: '30–45 min', Sessions: '1 (every 9–18 months)', Recovery: '24–48 hrs mild swelling', Results: 'Immediate' },
    howItWorks: [
      { step: 1, title: 'Aesthetic Consultation', description: 'Dr. Omaima discusses your goals, analyses facial proportions, and advises on the most appropriate filler type and placement for a natural result.' },
      { step: 2, title: 'Topical Numbing', description: 'A numbing cream is applied. Most fillers also contain built-in lidocaine for added comfort.' },
      { step: 3, title: 'Precise Injection', description: 'Filler is injected at the correct anatomical plane using a needle or cannula, depending on the treatment area, to ensure safety and precision.' },
      { step: 4, title: 'Moulding & Review', description: 'The filler is gently moulded to ensure symmetry. A follow-up assessment is recommended at 2–4 weeks.' },
    ],
    benefits: ['Restores cheek volume', 'Fills nasolabial folds', 'Enhances lip shape', 'Softens under-eye hollows', 'Sharpens jawline', 'Immediate natural results'],
    faqs: [
      { question: 'Are fillers safe?', answer: 'When administered by a trained medical professional using FDA-approved products, dermal fillers are extremely safe. Dr. Omaima is an MBBS physician trained in facial anatomy and safe injection techniques.' },
      { question: 'How long do fillers last?', answer: 'Depending on the product and treatment area, results last 9–18 months. Cheeks and jawline last longer; lips and tear troughs metabolise faster.' },
      { question: 'Is it reversible?', answer: 'Yes — hyaluronic acid fillers can be dissolved at any time with a hyaluronidase injection if you are unhappy with results.' },
      { question: 'Can fillers be combined with Botox?', answer: 'Yes — combining Botox and fillers in a "liquid facelift" protocol is common and synergistic. Dr. Omaima will advise whether combination treatment makes sense for your goals.' },
    ],
  },
  'prp-hair': {
    name: 'PRP Hair Restoration', category: 'Hair Restoration', tagline: 'Stimulate natural hair regrowth',
    description: 'Platelet-Rich Plasma (PRP) therapy uses your own blood\'s growth factors to stimulate dormant hair follicles, increase hair density, and slow down hair loss. It is a safe, natural, and clinically proven treatment for androgenetic alopecia and diffuse thinning in both men and women.',
    meta: { Duration: '45–60 min / session', Sessions: '3–4 sessions (monthly)', Recovery: 'None', Results: '3–6 months' },
    howItWorks: [
      { step: 1, title: 'Blood Draw', description: 'A small blood sample (15–20 ml) is drawn from your arm — similar to a routine blood test.' },
      { step: 2, title: 'Centrifugation', description: 'The blood is placed in a centrifuge to separate the platelet-rich plasma from other blood components.' },
      { step: 3, title: 'Scalp Preparation', description: 'The scalp is cleaned and topical numbing cream is applied to the treatment areas to ensure comfort.' },
      { step: 4, title: 'PRP Injection', description: 'The concentrated PRP — rich in growth factors — is injected across the thinning areas to activate follicles and promote new hair growth.' },
    ],
    benefits: ['Reduces hair fall within 4–6 weeks', 'Increases hair density', 'Strengthens existing hair', '100% natural (autologous)', 'No downtime', 'Safe for men and women'],
    faqs: [
      { question: 'How soon will I see results?', answer: 'Hair loss reduction is usually noticeable within 4–6 weeks. Visible new hair growth typically appears at 3–4 months. Full results are assessed at 6 months.' },
      { question: 'How many sessions are needed?', answer: 'An initial course of 3–4 monthly sessions is recommended. Maintenance sessions every 4–6 months help sustain results.' },
      { question: 'Is it effective for advanced hair loss?', answer: 'PRP works best for early to moderate androgenetic alopecia. Completely bald areas with no follicular activity will not respond. Dr. Omaima will assess your hair loss grade.' },
      { question: 'Can PRP be combined with other treatments?', answer: 'Yes — PRP combined with GFC therapy gives superior results. It also complements oral minoxidil or finasteride if prescribed.' },
    ],
  },
  'gfc-hair': {
    name: 'GFC Hair Therapy', category: 'Hair Restoration', tagline: 'Next-gen growth factor therapy',
    description: 'Growth Factor Concentrate (GFC) is an advanced evolution of PRP that isolates and concentrates specific growth factors at 5–8x higher concentration. The result is a more potent stimulus for dormant follicles — making it the most effective injectable option for hair loss currently available.',
    meta: { Duration: '60 min / session', Sessions: '3 sessions (monthly)', Recovery: 'None', Results: '2–4 months' },
    howItWorks: [
      { step: 1, title: 'Blood Collection', description: 'Blood is drawn and placed into specialised GFC preparation tubes containing activation agents.' },
      { step: 2, title: 'GFC Preparation', description: 'Tubes are incubated for 30 minutes, allowing platelets to degranulate and release maximum growth factor concentration.' },
      { step: 3, title: 'Centrifugation', description: 'The sample is centrifuged to yield a highly concentrated, pure growth factor solution — 5–8x stronger than standard PRP.' },
      { step: 4, title: 'Scalp Injection', description: 'The GFC is injected across the thinning scalp using a mesotherapy technique for even distribution of growth factors to all affected follicles.' },
    ],
    benefits: ['5–8x stronger than PRP', 'Faster visible results', 'Greater hair density improvement', 'No red blood cells — less inflammation', 'Pure growth factor delivery', 'Fewer sessions needed'],
    faqs: [
      { question: 'How is GFC different from PRP?', answer: 'GFC uses a specialised preparation process that isolates pure growth factors at much higher concentrations. The absence of red blood cells also means less post-injection inflammation and discomfort.' },
      { question: 'Is GFC better than PRP?', answer: 'Clinical studies show GFC produces superior hair density improvement with fewer sessions. For patients who want the best possible outcome, GFC is our first recommendation.' },
      { question: 'How many sessions do I need?', answer: 'Three monthly sessions form the primary course. A maintenance session every 6 months is recommended thereafter.' },
      { question: 'Can GFC be combined with PRP?', answer: 'Some patients alternate between GFC primary sessions and PRP maintenance sessions as a cost-effective strategy. Dr. Omaima will advise based on your response and goals.' },
    ],
  },
  'laser-tattoo-removal': {
    name: 'Laser Tattoo Removal', category: 'Skin & Glow', tagline: 'Safe tattoo fading & removal',
    description: 'Laser tattoo removal uses Q-switched Nd:YAG laser technology to break down tattoo ink particles into fragments small enough for the immune system to eliminate. Multiple sessions are required depending on tattoo size, ink colour, age, and depth. Our laser is safe for Indian skin tones.',
    meta: { Duration: '15–45 min', Sessions: '6–12 sessions', Recovery: '2–5 days healing', Results: 'Progressive fading' },
    howItWorks: [
      { step: 1, title: 'Tattoo Assessment', description: 'Dr. Omaima evaluates ink colours, depth, age, and skin tone to estimate the number of sessions required and set realistic expectations.' },
      { step: 2, title: 'Laser Treatment', description: 'Q-switched Nd:YAG laser pulses break ink pigment into tiny particles. Black and dark blue inks respond fastest; greens and yellows take more sessions.' },
      { step: 3, title: 'Immune Clearance', description: 'The body\'s lymphatic system gradually eliminates the fragmented ink particles over 6–8 weeks between sessions.' },
      { step: 4, title: 'Progressive Fading', description: 'Each session delivers further fading. Complete removal depends on ink depth and colours but most tattoos can be significantly lightened or cleared.' },
    ],
    benefits: ['Gradual, safe removal', 'Safe for Indian skin tones', 'Minimal scarring risk', 'Can lighten for cover-up', 'Treats all tattoo colours', 'No permanent marks'],
    faqs: [
      { question: 'How many sessions will I need?', answer: 'Amateur tattoos typically need 4–6 sessions; professional tattoos need 8–12. Black ink responds fastest. Dr. Omaima will estimate based on your tattoo.' },
      { question: 'Does it hurt?', answer: 'The procedure feels like a rubber band snapping against the skin. Topical numbing cream is applied before treatment. A cold air device also helps during the session.' },
      { question: 'Will it leave a scar?', answer: 'When performed correctly, laser tattoo removal should not scar. Following aftercare instructions — keeping the area clean, avoiding sun, and not picking — is critical.' },
      { question: 'How long between sessions?', answer: 'Sessions are spaced 6–8 weeks apart to allow the immune system to clear broken-down ink and for the skin to fully heal.' },
    ],
  },
  'exosomes-face': {
    name: 'Exosomes Face Treatment', category: 'Hair Restoration', tagline: 'Next-gen skin & hair regeneration',
    description: 'Exosomes are nano-sized vesicles derived from stem cells that carry powerful growth factors, proteins, and genetic signalling molecules. When applied to the skin or scalp, they trigger cellular regeneration, collagen synthesis, and hair follicle activation — representing the cutting edge of regenerative aesthetics.',
    meta: { Duration: '45–60 min', Sessions: '3–4 sessions', Recovery: 'None', Results: '4–8 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Preparation', description: 'The skin is cleansed and optionally micro-needled to create micro-channels that maximise exosome penetration into the dermis or scalp.' },
      { step: 2, title: 'Exosome Application', description: 'Purified exosome solution is applied topically or injected into the treatment area, delivering concentrated regenerative signals directly to target cells.' },
      { step: 3, title: 'Cellular Signalling', description: 'Exosomes communicate with skin cells and hair follicles, triggering collagen production, anti-inflammatory responses, and stem cell activation.' },
      { step: 4, title: 'Progressive Regeneration', description: 'Skin texture, hydration, and elasticity improve over 4–8 weeks. For hair, follicle reactivation is visible at 3–4 months.' },
    ],
    benefits: ['Superior to PRP in growth factor concentration', 'Anti-inflammatory & regenerative', 'Improves skin texture and glow', 'Stimulates hair follicles', 'No downtime', 'Safe for all skin types'],
    faqs: [
      { question: 'How are exosomes different from PRP?', answer: 'Exosomes are much smaller than platelets and carry a more targeted payload of growth factors and genetic signals. They have stronger regenerative effects with less inflammation than PRP.' },
      { question: 'Is this treatment for face or hair?', answer: 'Exosomes work for both. Facial exosome treatment improves skin quality, elasticity, and radiance. Scalp exosome treatment stimulates dormant hair follicles for regrowth.' },
      { question: 'How many sessions are needed?', answer: 'Three to four sessions spaced 4 weeks apart give optimal initial results. A maintenance session every 6 months is recommended.' },
    ],
  },
  'micro-mesotherapy': {
    name: 'Micro-Mesotherapy', category: 'Hair Restoration', tagline: 'Micronutrient scalp & skin infusion',
    description: 'Micro-mesotherapy delivers a customised cocktail of vitamins, minerals, amino acids, hyaluronic acid, and growth factors directly into the mesoderm (middle layer) of skin or scalp using a series of micro-injections. It nourishes hair follicles, hydrates skin, and stimulates cellular renewal at a targeted depth.',
    meta: { Duration: '30–45 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '4–6 weeks' },
    howItWorks: [
      { step: 1, title: 'Bespoke Cocktail Design', description: 'Dr. Omaima selects a targeted mesotherapy cocktail based on your hair loss pattern, skin type, or specific deficiencies identified during consultation.' },
      { step: 2, title: 'Micro-injection Delivery', description: 'A fine meso-gun or manual technique delivers the cocktail into the scalp or skin at precise depths of 1–4mm for maximum absorption.' },
      { step: 3, title: 'Follicle & Cell Nourishment', description: 'Micronutrients directly feed hair follicles and skin cells, improving circulation, reducing inflammation, and stimulating collagen and keratin production.' },
      { step: 4, title: 'Progressive Improvement', description: 'Hair fall reduces noticeably from session 3. Skin hydration, glow, and firmness improve progressively with each session.' },
    ],
    benefits: ['Customised to individual needs', 'Directly targets hair follicles', 'Improves scalp circulation', 'Boosts skin hydration', 'Minimal discomfort', 'Safe for all hair types'],
    faqs: [
      { question: 'Is mesotherapy the same as PRP?', answer: 'No — mesotherapy uses a pharmaceutical cocktail of vitamins and growth factors, while PRP uses your own blood-derived platelets. They can be combined for enhanced results.' },
      { question: 'Is it painful?', answer: 'The needles used are very fine. Most patients experience mild pinprick sensations. Numbing cream can be applied beforehand if preferred.' },
    ],
  },
  'cold-laser-therapy': {
    name: 'Cold Laser Therapy (LLLT)', category: 'Hair Restoration', tagline: 'Low-level laser for hair & skin',
    description: 'Low-Level Laser Therapy (LLLT) uses specific wavelengths of red or near-infrared light to stimulate cellular activity without generating heat. For hair loss, it increases blood flow to hair follicles and stimulates the anagen (growth) phase. For skin, it accelerates wound healing and reduces inflammation.',
    meta: { Duration: '20–30 min', Sessions: '12–16 sessions', Recovery: 'None', Results: '3–6 months' },
    howItWorks: [
      { step: 1, title: 'Device Application', description: 'A cold laser device emitting 630–670nm red light is applied to the scalp or skin. No heat is generated — the therapy is completely painless.' },
      { step: 2, title: 'Photobiomodulation', description: 'Laser photons are absorbed by mitochondria in hair follicle cells, increasing ATP (energy) production and cellular metabolism.' },
      { step: 3, title: 'Follicle Stimulation', description: 'Improved cellular energy extends the anagen growth phase and increases scalp blood flow, leading to thicker and more numerous hairs over time.' },
      { step: 4, title: 'Cumulative Results', description: 'Results build over months. Cold laser works best as a standalone treatment for mild-moderate hair loss or in combination with PRP/GFC.' },
    ],
    benefits: ['Completely painless', 'No downtime', 'Safe for all skin types', 'Stimulates hair growth cycle', 'Reduces shedding', 'Can combine with PRP or GFC'],
    faqs: [
      { question: 'Is it effective on its own?', answer: 'Cold laser is effective for mild to moderate androgenetic alopecia. For best results, Dr. Omaima often combines it with PRP or GFC therapy.' },
      { question: 'How many sessions are needed?', answer: 'A course of 12–16 sessions (2 per week for 8 weeks) forms the primary treatment. Maintenance sessions every 2–4 weeks are recommended thereafter.' },
    ],
  },
  'scalp-micro-pigmentation': {
    name: 'Scalp Micro Pigmentation (SMP)', category: 'Hair Restoration', tagline: 'Hair follicle tattoo for density illusion',
    description: 'Scalp Micro Pigmentation is a specialised cosmetic tattooing technique that replicates the appearance of shaved hair follicles on the scalp. It creates the illusion of density, fills hairline recessions, and camouflages scars — making it ideal for patients with advanced baldness or alopecia who want an immediate, long-lasting solution.',
    meta: { Duration: '3–5 hours / session', Sessions: '2–3 sessions', Recovery: '5–7 days', Results: 'Immediate, lasts 3–5 years' },
    howItWorks: [
      { step: 1, title: 'Design & Consultation', description: 'Dr. Omaima designs the hairline and density pattern to match your face shape, existing hair, and personal preference. The design is agreed before any procedure begins.' },
      { step: 2, title: 'Pigment Application', description: 'Medical-grade pigments are deposited into the scalp using a specialised micro-needle at precise depths to replicate natural follicle dots.' },
      { step: 3, title: 'Multiple Sessions', description: 'Two to three sessions build layered pigment depth for a natural, realistic result. Each session refines and adds density.' },
      { step: 4, title: 'Fading & Maintenance', description: 'SMP fades gradually over 3–5 years. A single maintenance session restores colour and sharpness as needed.' },
    ],
    benefits: ['Immediate visible result', 'Works for all baldness grades', 'Covers scars and alopecia patches', 'No surgery or downtime', 'Natural, realistic appearance', 'Long-lasting 3–5 years'],
    faqs: [
      { question: 'Does SMP look natural?', answer: 'When performed by a skilled practitioner, SMP is indistinguishable from a closely shaved head. Pigment selection and dot placement are critical for a realistic result.' },
      { question: 'Is it suitable for women?', answer: 'Yes — SMP can increase the appearance of hair density in women with diffuse thinning, creating the illusion of a fuller scalp.' },
      { question: 'Does it hurt?', answer: 'Topical numbing cream is applied before the session. Most patients experience mild discomfort, similar to a traditional tattoo.' },
    ],
  },
  'lip-enhancement': {
    name: 'Lip Enhancement', category: 'Anti-Ageing', tagline: 'Fuller, defined, naturally beautiful lips',
    description: 'Lip enhancement using hyaluronic acid fillers adds volume, definition, and symmetry to the lips without an artificial appearance. From subtle hydration to significant augmentation, Dr. Omaima tailors every lip treatment to your facial proportions and personal goals — prioritising a natural, kissable result.',
    meta: { Duration: '30–45 min', Sessions: '1 session', Recovery: '24–48 hrs mild swelling', Results: 'Immediate, lasts 9–12 months' },
    howItWorks: [
      { step: 1, title: 'Lip Design Consultation', description: 'Dr. Omaima assesses your lip anatomy, facial proportions, and goals. A lip design is sketched and agreed before treatment begins.' },
      { step: 2, title: 'Numbing', description: 'Topical anaesthetic cream is applied for 20 minutes. Most fillers also contain built-in lidocaine for comfort throughout the procedure.' },
      { step: 3, title: 'Filler Injection', description: 'Small amounts of soft hyaluronic acid filler are injected into specific lip zones (vermillion border, body, cupid\'s bow, corners) using a fine needle or cannula.' },
      { step: 4, title: 'Moulding & Review', description: 'The filler is gently moulded to achieve symmetry. A 2-week review is included to assess results and add touch-up if needed.' },
    ],
    benefits: ['Immediate natural-looking fullness', 'Define lip border & cupid\'s bow', 'Correct lip asymmetry', 'Hydrated, plump appearance', 'Reversible with hyaluronidase', 'Lasts 9–12 months'],
    faqs: [
      { question: 'Will it look overdone?', answer: 'Dr. Omaima\'s philosophy is always natural enhancement. Conservative amounts are used, and the 2-week review allows for gradual build-up to your desired result.' },
      { question: 'How long does swelling last?', answer: 'Mild swelling and bruising typically resolve within 24–72 hours. Final results are fully visible at 2 weeks.' },
      { question: 'Is it reversible?', answer: 'Yes — hyaluronic acid fillers can be dissolved with hyaluronidase at any time if you\'re unhappy with the result.' },
    ],
  },
  'cheek-enhancement': {
    name: 'Cheek Enhancement', category: 'Anti-Ageing', tagline: 'Lift, contour & restore cheek volume',
    description: 'Cheek enhancement using dermal fillers restores the mid-face volume lost with ageing, creating a lifted, youthful facial contour. Strategic filler placement in the cheeks also indirectly lifts nasolabial folds and jowls, providing a natural non-surgical facelift effect.',
    meta: { Duration: '30–45 min', Sessions: '1 session', Recovery: '24–48 hrs mild swelling', Results: 'Immediate, lasts 12–18 months' },
    howItWorks: [
      { step: 1, title: 'Facial Analysis', description: 'Dr. Omaima assesses cheekbone structure, volume distribution, and the degree of mid-face deflation to plan precise filler placement.' },
      { step: 2, title: 'Topical Numbing', description: 'Anaesthetic cream is applied for patient comfort. The fillers used also contain lidocaine to minimise discomfort during injection.' },
      { step: 3, title: 'Filler Placement', description: 'Premium hyaluronic acid filler is placed at the correct supraperiosteal plane (above the cheekbone) using a cannula for safety and natural lift.' },
      { step: 4, title: 'Sculpting & Assessment', description: 'The filler is sculpted for symmetry and the overall facial result is assessed before completing the procedure.' },
    ],
    benefits: ['Restores youthful mid-face volume', 'Creates natural cheekbone definition', 'Indirectly lifts nasolabial folds', 'Immediate result', 'Lasts 12–18 months', 'Safe, reversible procedure'],
    faqs: [
      { question: 'How much filler do cheeks need?', answer: 'Typically 1–2ml per side depending on the degree of volume loss. Dr. Omaima always recommends starting conservatively and building up at a review.' },
      { question: 'Will it look natural?', answer: 'When placed correctly on the bone, cheek filler looks completely natural and does not create an artificial puffiness.' },
    ],
  },
  'chin-enhancement': {
    name: 'Chin Enhancement', category: 'Anti-Ageing', tagline: 'Define your jawline non-surgically',
    description: 'Chin enhancement with dermal fillers projects and defines a weak or recessed chin, improving facial balance and profile. A well-projected chin also makes the jawline appear more defined and the neck slimmer — without surgery, anaesthesia, or significant downtime.',
    meta: { Duration: '20–30 min', Sessions: '1 session', Recovery: '24–48 hrs mild swelling', Results: 'Immediate, lasts 12–18 months' },
    howItWorks: [
      { step: 1, title: 'Profile Analysis', description: 'Dr. Omaima analyses the chin from frontal and lateral views to assess the degree of projection needed for ideal facial balance.' },
      { step: 2, title: 'Structural Filler Injection', description: 'A firmer hyaluronic acid filler is injected at the chin bone, providing structural support and projection similar to a surgical implant effect.' },
      { step: 3, title: 'Profile Refinement', description: 'The chin shape is refined for symmetry and the desired degree of projection, checking the profile view throughout.' },
      { step: 4, title: 'Review', description: 'A 2-week review checks for symmetry and allows for any refinement before results are finalised.' },
    ],
    benefits: ['Projects recessed chin', 'Defines jawline without surgery', 'Creates better facial balance', 'Immediate result', 'Lasts 12–18 months', 'Reversible'],
    faqs: [
      { question: 'Can it replace chin implant surgery?', answer: 'For moderate projection needs, chin filler provides excellent results without surgery. For significant projection requirements, surgical implants may give a more permanent result — Dr. Omaima will advise honestly.' },
    ],
  },
  'nose-enhancement': {
    name: 'Non-Surgical Nose Enhancement', category: 'Anti-Ageing', tagline: 'Reshape your nose without surgery',
    description: 'Non-surgical rhinoplasty uses small amounts of dermal filler to smooth bumps, lift the nasal tip, straighten the nose, or improve symmetry — with immediate results and no surgical risk. It is an excellent option for patients who want to address a specific nasal concern without committing to rhinoplasty surgery.',
    meta: { Duration: '20–30 min', Sessions: '1 session', Recovery: 'None to 24 hrs mild swelling', Results: 'Immediate, lasts 9–12 months' },
    howItWorks: [
      { step: 1, title: 'Nasal Assessment', description: 'Dr. Omaima evaluates the nasal anatomy and identifies specific areas for improvement — dorsal hump, nasal tip, bridge irregularities, or asymmetry.' },
      { step: 2, title: 'Topical Numbing', description: 'Topical anaesthetic is applied before injection. The filler contains lidocaine for comfort during the procedure.' },
      { step: 3, title: 'Precise Filler Placement', description: 'Small amounts of filler are placed at strategic points to disguise bumps, lift the tip, or improve nasal symmetry. The nasal area requires extreme precision due to blood vessel proximity.' },
      { step: 4, title: 'Immediate Assessment', description: 'Results are visible immediately. Photographs are compared to confirm the desired improvement has been achieved.' },
    ],
    benefits: ['Immediate result', 'No surgery or anaesthesia', 'Corrects dorsal humps', 'Lifts drooping nasal tip', 'Improves symmetry', 'Reversible with hyaluronidase'],
    faqs: [
      { question: 'Is non-surgical rhinoplasty safe?', answer: 'The nose has a complex blood supply and requires an experienced injector. Dr. Omaima uses blunt cannulas and aspiration technique to minimise vascular risk.' },
      { question: 'Can it make my nose smaller?', answer: 'Non-surgical rhinoplasty can create the illusion of a slimmer nose by camouflaging bumps and improving tip projection, but cannot physically reduce nose size.' },
    ],
  },
  'cryolipolysis': {
    name: 'Cool Shape Cryolipolysis', category: 'Laser & Devices', tagline: 'Freeze away stubborn fat non-surgically',
    description: 'Cryolipolysis uses controlled cooling to selectively destroy fat cells in targeted areas. Fat cells are more sensitive to cold than surrounding tissue, so the treatment eliminates them while leaving skin and nerves unaffected. The body then gradually eliminates the destroyed fat cells over 4–12 weeks.',
    meta: { Duration: '45–60 min / area', Sessions: '1–2 sessions per area', Recovery: 'None', Results: '4–12 weeks' },
    howItWorks: [
      { step: 1, title: 'Target Area Marking', description: 'Dr. Omaima marks the target fat deposit areas — typically abdomen, flanks, thighs, arms, or double chin — and selects appropriate applicator cups.' },
      { step: 2, title: 'Cooling Application', description: 'The cryolipolysis applicator suctions the fat tissue and cools it to -9°C to -11°C, inducing controlled fat cell apoptosis (cell death).' },
      { step: 3, title: 'Fat Cell Death', description: 'Chilled fat cells crystallise and trigger a natural cell death process (apoptosis) while surrounding tissue remains unaffected.' },
      { step: 4, title: 'Lymphatic Elimination', description: 'Over 4–12 weeks, the immune system gradually eliminates dead fat cells through the lymphatic system, reducing fat layer thickness by 20–25%.' },
    ],
    benefits: ['20–25% fat reduction per treatment', 'No surgery or needles', 'Multiple areas treatable simultaneously', 'No downtime', 'Long-lasting results', 'Safe, FDA-cleared technology'],
    faqs: [
      { question: 'Is cryolipolysis a weight loss treatment?', answer: 'No — cryolipolysis is for targeting specific fat deposits that are resistant to diet and exercise. It is not a substitute for weight loss and works best when you are near your target weight.' },
      { question: 'How many sessions are needed?', answer: 'Most patients see significant results from one session per area. A second session can enhance results further if desired.' },
      { question: 'Is it painful?', answer: 'The first 5–10 minutes of cooling may cause intense cold, tingling, and pulling sensations. After that, the area numbs and most patients read or use their phone during treatment.' },
    ],
  },
  'hifu': {
    name: 'Ultralift — HIFU', category: 'Anti-Ageing', tagline: 'Non-surgical skin lifting & tightening',
    description: 'High-Intensity Focused Ultrasound (HIFU) delivers focused ultrasound energy to the SMAS layer — the same layer targeted in surgical facelifts. This triggers collagen contraction and new collagen synthesis, providing a gradual, natural lifting and tightening effect on the face, neck, and brow without surgery.',
    meta: { Duration: '60–90 min', Sessions: '1 session (annual)', Recovery: 'None to mild redness 24 hrs', Results: '3–6 months (progressive)' },
    howItWorks: [
      { step: 1, title: 'Facial Mapping', description: 'Dr. Omaima uses HIFU ultrasound imaging to map the tissue depth and identify the correct energy delivery planes for maximum lifting effect.' },
      { step: 2, title: 'Energy Delivery', description: 'Focused ultrasound energy is delivered at precise depths of 1.5mm, 3mm, and 4.5mm — targeting superficial dermis, deep dermis, and SMAS layer respectively.' },
      { step: 3, title: 'Thermal Coagulation', description: 'At each focal point, temperatures reach 60–70°C briefly, coagulating tissue and triggering an intense collagen repair response.' },
      { step: 4, title: 'Progressive Lifting', description: 'New collagen forms and contracts over 3–6 months, producing visible lifting of the brow, jawline, cheeks, and neck. Results last 12–18 months.' },
    ],
    benefits: ['Lifts brow, cheeks, jawline, neck', 'Targets SMAS (surgical facelift layer)', 'Progressive, natural-looking result', 'No downtime', 'Single annual session', 'Safe, FDA-cleared technology'],
    faqs: [
      { question: 'How does HIFU compare to a surgical facelift?', answer: 'HIFU targets the same SMAS layer as a facelift but produces a more subtle, gradual improvement over months. It\'s ideal for patients with mild-moderate laxity who want to delay surgery.' },
      { question: 'Is it painful?', answer: 'Some areas produce a brief intense heat sensation as energy is delivered. Dr. Omaima adjusts energy levels and can provide oral analgesia for sensitive patients.' },
    ],
  },
  'bio-re-peel': {
    name: 'Bio Re Peel', category: 'Skin & Glow', tagline: 'Advanced no-downtime chemical peel',
    description: 'Bio Re Peel is an innovative biostimulating chemical peel that works at the dermal level without surface peeling. Its unique tricholoroacetic acid (TCA) formula combines a keratolytic phase with a biostimulating phase, improving skin texture, tone, pores, and acne scars — with no visible peeling or downtime.',
    meta: { Duration: '30 min', Sessions: '4–6 sessions', Recovery: 'None (no visible peeling)', Results: '2–4 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Preparation', description: 'The skin is cleansed and degreased. A skin sensitivity assessment ensures the peel is safe and appropriate for your skin type.' },
      { step: 2, title: 'Peel Application', description: 'Bio Re Peel solution is applied in two phases — first the keratolytic phase (TCA) penetrates the skin, then the biostimulating phase activates regenerative processes.' },
      { step: 3, title: 'Penetration', description: 'Unlike traditional peels, Bio Re Peel works without visible surface peeling. Clients experience mild warmth during application and no significant discomfort.' },
      { step: 4, title: 'Post-treatment Glow', description: 'Immediately after, skin looks brighter and smoother. Over the following days, continued collagen synthesis and cell turnover improve texture progressively.' },
    ],
    benefits: ['No visible peeling or downtime', 'Safe for all skin tones', 'Improves acne scars', 'Reduces pore size', 'Boosts collagen synthesis', 'Immediate brightening effect'],
    faqs: [
      { question: 'If there is no peeling, how does it work?', answer: 'Bio Re Peel works at the dermal level, stimulating collagen and accelerating cell renewal without damaging the surface epidermis enough to cause visible peeling.' },
      { question: 'Is it suitable for dark Indian skin?', answer: 'Yes — because it avoids surface peeling, the risk of post-inflammatory hyperpigmentation (PIH) is significantly lower than traditional TCA peels.' },
    ],
  },
  'intragen': {
    name: 'Intragen Radiofrequency', category: 'Anti-Ageing', tagline: 'Deep RF for skin tightening & hair growth',
    description: 'Intragen is a professional radiofrequency technology that delivers multi-polar RF energy to heat the deep dermis and stimulate collagen contraction and new synthesis. For the scalp, it improves blood circulation and follicle health. For the face, it tightens skin and reduces fine lines.',
    meta: { Duration: '45–60 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '4–8 weeks' },
    howItWorks: [
      { step: 1, title: 'RF Energy Application', description: 'Multi-polar radiofrequency energy is delivered through an applicator handpiece, heating the deep dermis to 40–42°C — the optimal temperature for collagen stimulation.' },
      { step: 2, title: 'Collagen Contraction', description: 'Existing collagen fibres contract immediately under heat, producing an immediate tightening effect visible even after the first session.' },
      { step: 3, title: 'New Collagen Synthesis', description: 'The thermal stimulus triggers fibroblasts to produce new collagen over 4–8 weeks, progressively tightening and firming the skin.' },
      { step: 4, title: 'Scalp Stimulation', description: 'On the scalp, Intragen improves blood microcirculation and follicle oxygenation, supporting hair growth and reducing shedding.' },
    ],
    benefits: ['Tightens skin without surgery', 'Improves scalp circulation for hair growth', 'Immediate visible result', 'No downtime', 'Progressive collagen improvement', 'Comfortable, warming sensation'],
    faqs: [
      { question: 'Is Intragen safe for all skin tones?', answer: 'Yes — radiofrequency is colour-blind and safe for all Fitzpatrick skin types including darker Indian skin tones.' },
      { question: 'How many sessions for visible results?', answer: 'Most patients notice results from session 2–3. A full course of 4–6 sessions gives optimal results, with improvement continuing for 3 months after the last session.' },
    ],
  },
  'vanquish': {
    name: 'VANQUISH Body Contouring', category: 'Laser & Devices', tagline: 'Contactless fat reduction technology',
    description: 'VANQUISH uses selective radiofrequency energy to heat and destroy subcutaneous fat cells without any contact with the body. Its large panel heats a wide area simultaneously, making it ideal for treating the full abdomen or flanks in a single session. It is a comfortable, completely non-invasive fat reduction treatment.',
    meta: { Duration: '45 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '4–8 weeks' },
    howItWorks: [
      { step: 1, title: 'Non-Contact Energy Delivery', description: 'The VANQUISH panel is positioned 1–2cm above the treatment area without touching the skin, delivering uniform RF energy across the full treatment zone.' },
      { step: 2, title: 'Selective Fat Heating', description: 'RF energy selectively heats fat cells to 45°C while the skin surface remains below 42°C, sparing skin and surrounding tissue.' },
      { step: 3, title: 'Fat Cell Apoptosis', description: 'Heat-stressed fat cells undergo programmed cell death (apoptosis) over the days following treatment.' },
      { step: 4, title: 'Gradual Elimination', description: 'Dead fat cells are removed by the lymphatic system over 4–8 weeks, reducing fat layer thickness and improving abdominal contour.' },
    ],
    benefits: ['Contactless — completely comfortable', 'Large area treatment in one session', 'No downtime', 'Reduces abdominal fat', 'Progressive results over weeks', 'Suitable for most body types'],
    faqs: [
      { question: 'Does VANQUISH hurt?', answer: 'No — VANQUISH produces a comfortable warming sensation throughout the treatment. No contact means no pressure, suction, or discomfort.' },
      { question: 'How much fat does it remove?', answer: 'On average 3–5cm of circumference reduction is seen after a full course of 4–6 sessions. Results vary based on starting fat thickness.' },
    ],
  },
  'laser-hair': {
    name: 'Laser Hair Reduction', category: 'Laser & Devices', tagline: 'Permanent hair reduction',
    description: 'Laser hair reduction uses concentrated light energy to target melanin in hair follicles, permanently damaging the follicle\'s ability to regrow hair. Our US-FDA cleared diode laser is calibrated for all skin tones including darker Indian skin types, delivering safe and effective results on the face and body.',
    meta: { Duration: '15–60 min (area-dependent)', Sessions: '6–8 sessions', Recovery: 'None', Results: 'Permanent reduction after full course' },
    howItWorks: [
      { step: 1, title: 'Consultation & Patch Test', description: 'Dr. Omaima assesses your skin type, hair colour, and density. A patch test is conducted 24–48 hours before the first full session.' },
      { step: 2, title: 'Shaving the Area', description: 'The treatment area is shaved before the session so laser energy is focused on the follicle below the skin, not the hair above.' },
      { step: 3, title: 'Laser Treatment', description: 'A diode laser handpiece delivers precisely calibrated pulses across the treatment area. A built-in cooling tip protects the skin surface throughout.' },
      { step: 4, title: 'Post-Treatment Care', description: 'A soothing gel is applied and you are advised to avoid sun exposure and heat for 24–48 hours. Treated hair will shed over 1–2 weeks.' },
    ],
    benefits: ['Up to 90% permanent hair reduction', 'Eliminates ingrown hairs', 'Smoother skin texture', 'Safe for dark skin tones', 'No razor bumps', 'Treats face, body, and bikini area'],
    faqs: [
      { question: 'Is it permanent?', answer: 'Laser hair reduction achieves 70–90% permanent reduction after a full course. Some fine regrowth may occur over years and can be addressed with a top-up session.' },
      { question: 'Does it work on dark Indian skin?', answer: 'Yes — our diode laser uses parameters specifically calibrated for Fitzpatrick III–V skin types. It is safe and effective on darker skin when done correctly.' },
      { question: 'Is it painful?', answer: 'Most patients describe a snapping or rubber-band sensation. The built-in cooling tip significantly reduces discomfort. Sensitive areas like the upper lip may need topical numbing cream.' },
      { question: 'How far apart are sessions?', answer: 'Sessions are spaced 4–6 weeks apart for body areas and 3–4 weeks for the face, aligned with hair growth cycles.' },
    ],
  },
  'chemical-peel': {
    name: 'Chemical Peel', category: 'Skin & Glow', tagline: 'Resurface, renew & brighten',
    description: 'Chemical peels use clinically formulated acid solutions to remove damaged outer skin layers, triggering cellular renewal and revealing fresher, brighter skin. From superficial glycolic peels to medium-depth TCA peels, Dr. Omaima selects the right formulation for your skin type, concern, and tolerance.',
    meta: { Duration: '30–45 min', Sessions: '4–6 sessions', Recovery: '3–7 days', Results: '1–2 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Assessment', description: 'Dr. Omaima evaluates your skin type, Fitzpatrick scale, current concerns, and contraindications to select the appropriate peel formulation and strength.' },
      { step: 2, title: 'Pre-Peel Prep', description: 'The skin is cleansed and degreased with an acetone or alcohol prep solution to ensure even, controlled acid penetration.' },
      { step: 3, title: 'Peel Application', description: 'The acid solution is applied in controlled layers. Application time is monitored precisely — the peel is neutralised at the optimal point of skin response.' },
      { step: 4, title: 'Neutralisation & Aftercare', description: 'The peel is neutralised with bicarbonate solution, followed by a soothing mask and SPF application. Detailed post-peel home care instructions are provided.' },
    ],
    benefits: ['Brightens dull, uneven skin', 'Reduces acne and congestion', 'Fades pigmentation and dark spots', 'Stimulates collagen synthesis', 'Reduces fine lines and texture', 'Tightens enlarged pores'],
    faqs: [
      { question: 'Is it safe for dark Indian skin?', answer: 'Yes, when the correct peel type and strength are chosen. Dr. Omaima uses peels validated for Fitzpatrick III–V skin. Appropriate pre-peel priming prevents post-inflammatory hyperpigmentation.' },
      { question: 'How much peeling should I expect?', answer: 'Superficial peels cause minimal or no visible peeling. Medium peels cause visible flaking from day 3–7. Dr. Omaima explains exactly what to expect from your specific peel beforehand.' },
      { question: 'How many sessions for acne scars?', answer: 'Superficial scars typically need 4–6 sessions. Deeper scars benefit from combination therapy — a peel series combined with microneedling or MNRF for superior results.' },
      { question: 'Can I wear makeup after?', answer: 'Avoid makeup for 24 hours. During the peeling phase, use mineral makeup only if needed. Never manually pick or peel flaking skin.' },
    ],
  },
  'microneedling': {
    name: 'Microneedling (MNRF)', category: 'Acne & Scars', tagline: 'Collagen induction for scar & skin repair',
    description: 'Microneedling with Radiofrequency (MNRF) creates controlled micro-injuries in the dermis using insulated gold-plated needles that simultaneously deliver RF energy at precisely calibrated depths. This triggers intensive collagen and elastin remodelling — the most effective non-surgical treatment for acne scars, enlarged pores, and skin laxity.',
    meta: { Duration: '60–75 min', Sessions: '3–5 sessions', Recovery: '2–3 days redness', Results: '4–8 weeks per session' },
    howItWorks: [
      { step: 1, title: 'Topical Anaesthesia', description: 'A numbing cream is applied for 30–45 minutes before the session to ensure complete comfort throughout the procedure.' },
      { step: 2, title: 'Microneedling Pass', description: 'The MNRF device creates a matrix of controlled micro-injuries using insulated needles at adjustable depths (1–3.5mm depending on the area and concern).' },
      { step: 3, title: 'RF Energy Delivery', description: 'At each needle point, fractional RF energy is released, creating a thermal coagulation zone in the deep dermis that triggers intensive collagen production.' },
      { step: 4, title: 'Healing Response', description: 'The wound healing cascade begins — new collagen and elastin fill scar depressions, tighten pores, and improve overall skin quality progressively over 4–8 weeks.' },
    ],
    benefits: ['Reduces ice-pick, boxcar and rolling scars', 'Minimises enlarged pores', 'Tightens loose skin', 'Improves skin texture', 'Safe for all skin tones', 'Deep dermal repair, minimal surface damage'],
    faqs: [
      { question: 'Is it painful?', answer: 'Numbing cream is applied before the session. During treatment, most patients feel light scratching or vibration. The area may feel warm for a few hours after.' },
      { question: 'What is the downtime?', answer: 'Redness and mild puffiness resolve in 24–72 hours. You can resume normal activities the next day with SPF and a gentle moisturiser.' },
      { question: 'How many sessions for acne scars?', answer: 'Most patients need 3–5 sessions spaced 4–6 weeks apart. Dr. Omaima will assess your scar grade and set realistic expectations at consultation.' },
      { question: 'Can it treat active acne?', answer: 'Microneedling should not be performed over active, inflamed acne lesions. We treat active acne first, then follow with microneedling once the skin has stabilised.' },
    ],
  },
  'dermal-fillers': {
    name: 'Dermal Fillers', category: 'Anti-Ageing', tagline: 'Volume restoration & contouring',
    description: 'Dermal fillers are hyaluronic acid-based injectable gels that restore lost facial volume, smooth deep folds, and enhance natural facial contours. Dr. Omaima uses only premium FDA-approved fillers and precise anatomical injection techniques to create subtle, harmonious, and natural-looking results.',
    meta: { Duration: '30–45 min', Sessions: '1 (every 9–18 months)', Recovery: '24–48 hrs mild swelling', Results: 'Immediate' },
    howItWorks: [
      { step: 1, title: 'Aesthetic Consultation', description: 'Dr. Omaima discusses your goals, analyses facial proportions, and recommends the most appropriate filler product, volume, and placement for a natural result.' },
      { step: 2, title: 'Topical Numbing', description: 'Numbing cream is applied. Most premium fillers also contain built-in lidocaine for added comfort during injection.' },
      { step: 3, title: 'Precise Injection', description: 'Filler is injected at the anatomically correct plane for each zone — using a needle or cannula as appropriate for safety and precision.' },
      { step: 4, title: 'Moulding & Review', description: 'The filler is gently moulded for symmetry. A follow-up review is included at 2–4 weeks to assess results and refine if needed.' },
    ],
    benefits: ['Restores lost cheek volume', 'Smoothes nasolabial folds', 'Defines lips and cupid\'s bow', 'Softens under-eye hollows', 'Sharpens jawline definition', 'Immediate, reversible results'],
    faqs: [
      { question: 'Are dermal fillers safe?', answer: 'When administered by a trained medical professional using FDA-approved products, dermal fillers are extremely safe. Dr. Omaima is a qualified MBBS physician trained in facial anatomy and advanced injection techniques.' },
      { question: 'How long do fillers last?', answer: 'Results last 9–18 months depending on the product and area. Cheeks and jawline last longer; lips and tear troughs metabolise faster due to higher muscle movement.' },
      { question: 'Is it reversible?', answer: 'Yes — hyaluronic acid fillers can be dissolved completely with hyaluronidase at any time if you are unhappy with the result.' },
      { question: 'What is the difference between Botox and fillers?', answer: 'Botox relaxes muscles to soften dynamic wrinkles. Fillers add volume to restore structure and fill static lines and hollows. They complement each other well in a combined treatment plan.' },
    ],
  },
  'acne-treatment': {
    name: 'Acne Clearance Program', category: 'Acne & Scars', tagline: 'Root-cause acne treatment',
    description: 'Our Acne Clearance Program is a structured multi-session protocol addressing the root causes of acne — excess sebum, C. acnes bacteria, inflammation, and hormonal triggers. It combines in-clinic treatments with a personalised topical prescription protocol so results persist long after the treatment course ends.',
    meta: { Duration: '30–45 min / session', Sessions: '4–8 sessions', Recovery: 'Minimal', Results: '4–6 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Assessment & Diagnosis', description: 'Dr. Omaima grades your acne severity, identifies triggers (hormonal, dietary, lifestyle), and designs a personalised treatment and home care plan.' },
      { step: 2, title: 'Chemical Peel (Salicylic / Combination)', description: 'BHA and combination peels exfoliate the follicle lining, reduce sebum, and clear congested pores with each in-clinic session.' },
      { step: 3, title: 'Blue Light or Laser Therapy', description: 'Anti-bacterial blue light or low-fluence Nd:YAG laser targets and destroys C. acnes bacteria within the follicle, reducing active breakouts rapidly.' },
      { step: 4, title: 'Prescription Home Protocol', description: 'A customised home care plan with prescription-strength actives (retinoids, azelaic acid, antibiotics as needed) maintains results between sessions.' },
    ],
    benefits: ['Clears active breakouts within 2–4 weeks', 'Prevents new acne formation', 'Reduces skin redness and inflammation', 'Addresses root biological cause', 'Prescription-backed protocol', 'Suitable for all acne grades'],
    faqs: [
      { question: 'How quickly will I see results?', answer: 'Most patients notice significant reduction in active breakouts after 2–3 sessions. Some experience a brief purging phase before the skin clears fully.' },
      { question: 'Will the acne come back?', answer: 'With the correct maintenance protocol and home skincare plan, long-term control is achievable. Dr. Omaima will identify your specific triggers to prevent relapse.' },
      { question: 'Is it safe with other medications?', answer: 'Please inform Dr. Omaima of all medications — including oral antibiotics and isotretinoin. Certain in-clinic treatments need to be modified or avoided.' },
      { question: 'Can I wear makeup during treatment?', answer: 'Switch to non-comedogenic products during the program. Dr. Omaima will advise which products are safe to continue with your skin type.' },
    ],
  },
}

// Additional SEO content per treatment (merged on top of FALLBACK_TREATMENTS)
const TREATMENT_EXTRAS = {
  'hydrafacial-md': {
    about: `HydraFacial MD is the world's most popular non-invasive skin treatment, combining deep cleansing, exfoliation, extraction, hydration, and antioxidant infusion in a single 45-minute session. Unlike harsh peels or aggressive microdermabrasion, HydraFacial uses a patented Vortex-Fusion® serum delivery system that treats even the most sensitive skin without irritation or downtime.\n\nThe treatment is entirely customisable — Dr. Omaima selects boosters and serums based on your specific concerns before every session. Whether your goal is to address dullness, enlarged pores, fine lines, or dehydration, HydraFacial's multi-step protocol is tailored to deliver targeted results.\n\nDermatologists worldwide recommend HydraFacial as a monthly maintenance treatment because it delivers consistent, measurable skin improvement without cumulative irritation.`,
    concerns: [{ name: 'Dull Skin', slug: 'dull-skin' }, { name: 'Enlarged Pores', slug: 'pores' }, { name: 'Pigmentation', slug: 'pigmentation' }, { name: 'Acne', slug: 'acne' }],
    idealCandidate: 'HydraFacial is suitable for virtually all skin types and ages. Ideal if you want immediate skin improvement with zero downtime, or if you have sensitive skin that reacts to more aggressive treatments. It is especially popular before weddings, events, or as a monthly maintenance treatment.',
    preparation: ['Avoid retinoids and active exfoliants (AHAs/BHAs) for 3 days before', 'Come with a clean, makeup-free face if possible', 'Mention any new skincare products or medications at your consultation', 'Stay well-hydrated in the days leading up to your session'],
    aftercare: 'Skin may appear slightly flushed for 2–4 hours — this resolves quickly. Avoid heavy makeup for 4–6 hours to allow serums to fully absorb. Apply SPF 50 the following morning. Avoid active exfoliants for 3–5 days after treatment. Results are visible immediately and continue improving over 3–5 days.',
    risks: ['Mild temporary redness (resolves within hours)', 'Rarely, temporary tingling in very sensitive skin', 'Pre-existing skin sensitivity may be temporarily heightened', 'Not recommended immediately after Botox or dermal fillers'],
    relatedTreatments: [{ name: 'Carbon Laser Facial', slug: 'carbon-laser-facial' }, { name: 'Chemical Peel', slug: 'chemical-peel' }, { name: 'Bio Re Peel', slug: 'bio-re-peel' }],
    preventionTips: ['Use SPF 50 every morning — UV damage is the primary cause of skin ageing and dullness', 'Maintain a gentle twice-daily cleanse with a mild pH-balanced cleanser', 'Stay hydrated — dehydration worsens fine lines and dullness significantly', 'Monthly HydraFacial sessions maintain results year-round'],
  },
  'prp-hair': {
    about: `Platelet-Rich Plasma (PRP) therapy is a regenerative medicine technique that harnesses your own blood's growth factors to stimulate dormant hair follicles. Platelets contain growth factors — PDGF, VEGF, EGF, and FGF — that signal stem cells to regenerate and repair tissue. When concentrated PRP is injected into the scalp, these growth factors activate follicles that have entered the resting (telogen) phase.\n\nPRP is entirely autologous — derived from your own blood — eliminating any risk of allergic reaction or rejection. It is one of the most extensively studied non-surgical hair loss treatments available, with multiple randomised controlled trials demonstrating significant improvements in hair count, density, and thickness.\n\nDermatologists recommend PRP because it addresses the biological cause of hair miniaturisation rather than just masking the symptom. When combined with GFC therapy, it produces superior results for androgenetic alopecia, diffuse thinning, and early-to-moderate alopecia areata.`,
    concerns: [{ name: 'Hair Fall', slug: 'hair-fall' }, { name: 'Hair Regrowth', slug: 'hair-regrowth' }, { name: 'Dandruff & Scalp Health', slug: 'dandruff' }],
    idealCandidate: 'PRP is ideal for men and women with androgenetic alopecia (pattern hair loss), diffuse thinning, or early-stage alopecia areata. It works best when some follicular activity is still present — completely bald areas with no follicles cannot respond. Patients in good general health with no bleeding disorders are suitable.',
    preparation: ['Avoid blood thinners (aspirin, ibuprofen, omega-3) for 5–7 days before', 'Stay well-hydrated on the day of your session — good hydration improves blood draw quality', 'Wash your hair normally the morning of the session', 'Eat a light meal before your appointment to avoid feeling faint during the blood draw', 'Avoid smoking for 24 hours before — nicotine affects platelet function'],
    aftercare: 'Mild scalp tenderness and pinpoint marks at injection sites are normal and resolve within 24–48 hours. Avoid washing your hair for 6–8 hours after treatment. Avoid intense scalp massage or vigorous exercise on the day of treatment. Temporary shedding in weeks 2–4 is a normal part of the growth cycle activation.',
    risks: ['Mild scalp tenderness at injection sites (resolves in 1–2 days)', 'Occasional temporary headache', 'Very rarely, small bruises at injection points', 'Temporary shedding in the first 2–4 weeks (normal cycle activation)', 'Not suitable during active infection, chemotherapy, or with blood disorders'],
    relatedTreatments: [{ name: 'GFC Hair Therapy', slug: 'gfc-hair' }, { name: 'Exosomes Treatment', slug: 'exosomes-face' }, { name: 'Cold Laser Therapy', slug: 'cold-laser-therapy' }],
    preventionTips: ['Use a mild sulphate-free shampoo — harsh shampoos damage the scalp microbiome', 'Manage stress — cortisol is one of the most significant triggers for hair fall', 'Ensure adequate protein, iron, and B-vitamin intake in your diet', 'Avoid tight hairstyles that create traction alopecia', 'Maintenance PRP sessions every 4–6 months preserve results long-term'],
  },
  'botox': {
    about: `Botulinum toxin (Botox) is the world's most studied aesthetic treatment, with an unparalleled safety record built over 30 years of clinical use. It works by temporarily blocking the nerve signal to specific facial muscles, causing them to relax and the overlying dynamic wrinkles to soften naturally.\n\nThe key to natural-looking Botox is expert dosing and anatomical placement. Dr. Omaima's philosophy is never to freeze expression but to soften lines while preserving the full range of facial movement. When administered conservatively, even colleagues and family often cannot tell you have had treatment.\n\nBotox is also recommended as a preventive treatment for patients in their late 20s and 30s who want to slow wrinkle development before lines become permanently etched. It is also used medically for hyperhidrosis (excessive sweating) and masseter reduction (jaw slimming).`,
    concerns: [{ name: 'Wrinkles & Fine Lines', slug: 'wrinkles' }, { name: 'Sagging Skin', slug: 'sagging' }, { name: 'Volume Loss', slug: 'volume-loss' }],
    idealCandidate: 'Ideal for adults aged 25–65 who have dynamic wrinkles (lines caused by muscle movement) on the forehead, between the brows, or around the eyes. Also suitable for patients wanting preventive treatment before wrinkles become permanent. Not recommended during pregnancy or breastfeeding.',
    preparation: ['Avoid blood thinners and anti-inflammatories (aspirin, ibuprofen) for 1 week before', 'Avoid alcohol for 24 hours before to reduce bruising risk', 'Come to your appointment makeup-free if possible', 'Avoid vigorous exercise on the day of treatment', 'Discuss all medications and medical conditions with Dr. Omaima at consultation'],
    aftercare: 'Results appear in 3–5 days and peak at 2 weeks. Avoid lying flat or bending forward for 4 hours after treatment. Do not rub or massage treated areas for 24 hours. Avoid saunas, steam rooms, and vigorous exercise for 24 hours. A complimentary 2-week review assesses results and adds a touch-up if needed.',
    risks: ['Mild temporary redness or swelling at injection points (resolves in hours)', 'Rare temporary bruising', 'Temporary mild headache (uncommon)', 'Temporary brow heaviness if too much product placed in forehead (avoided with careful technique)', 'Eyelid droop is extremely rare with experienced injectors', 'All effects fully reverse over 4–6 months'],
    relatedTreatments: [{ name: 'Dermal Fillers', slug: 'dermal-fillers' }, { name: 'HIFU Ultralift', slug: 'hifu' }, { name: 'Cheek Enhancement', slug: 'cheek-enhancement' }],
    preventionTips: ['Use SPF 50 daily — UV radiation is the primary driver of premature skin ageing', 'Sleep on your back to avoid creating sleep wrinkles on the face', 'Use a medical-grade retinoid at night to stimulate collagen and slow wrinkle formation', 'Regular Botox every 4–6 months prevents lines from becoming permanently etched'],
  },
  'laser-hair': {
    about: `Laser hair reduction uses the principle of selective photothermolysis — targeting melanin pigment in hair follicles with a specific wavelength of light that heats and destroys the follicle while leaving surrounding skin unaffected. Our US-FDA cleared diode laser delivers 808nm wavelength energy, the gold standard for effective hair reduction across a wide range of skin tones.\n\nAfter a full course of 6–8 sessions, most patients achieve 70–90% permanent reduction and need only occasional maintenance top-ups. It solves a daily grooming problem permanently, is cost-effective over time compared to waxing, and eliminates painful ingrown hairs.\n\nDermatologists recommend laser hair reduction not only cosmetically but medically: it eliminates pseudofolliculitis barbae, reduces folliculitis, and is the treatment of choice for hirsutism in PCOS. Our diode laser has built-in cooling and parameters calibrated specifically for Indian skin tones.`,
    concerns: [{ name: 'Unwanted Hair', slug: 'unwanted-hair' }],
    idealCandidate: 'Works best on patients with darker hair on lighter to medium skin where the contrast is highest. Also effective on Indian skin tones (Fitzpatrick III–V) with our diode laser. Not effective on white, grey, or very fine vellus hair. Suitable for most adults, though not during pregnancy.',
    preparation: ['Shave the treatment area 24 hours before (do NOT wax or thread for 4 weeks before)', 'Avoid sun exposure for 2 weeks before — tanned skin increases risk', 'Remove all cosmetics, deodorant, and topical products from the area before treatment', 'Avoid self-tanners for 4 weeks before', 'Inform Dr. Omaima of any medications — some photosensitising drugs require spacing'],
    aftercare: 'Treated hair will shed over 1–3 weeks — this is the follicle being expelled, not new growth. Apply soothing aloe vera gel if skin feels warm. Avoid sun exposure for 1 week and always apply SPF 50 to treated areas. Avoid heat treatments (saunas, hot yoga) for 48 hours. Sessions are spaced 4–6 weeks apart for body, 3–4 weeks for face.',
    risks: ['Temporary redness and mild swelling (resolves in 2–24 hours)', 'Rarely, temporary hyperpigmentation (avoided with correct settings for your skin type)', 'Very rarely, blistering if skin is recently tanned', 'Not effective on white, grey, or very fair hair', 'Paradoxical hair stimulation (rare — fine pale hair occasionally grows thicker)'],
    relatedTreatments: [{ name: 'Carbon Laser Facial', slug: 'carbon-laser-facial' }, { name: 'Scalp Micro Pigmentation', slug: 'scalp-micro-pigmentation' }],
    preventionTips: ['Only shave between sessions — never wax or thread (preserves follicle integrity for laser)', 'Use SPF 50 daily on treated areas to prevent post-treatment hyperpigmentation', 'Maintenance sessions every 6–12 months address any regrowth', 'Exfoliate gently once weekly between sessions to prevent ingrown hairs as treated hair sheds'],
  },
  'chemical-peel': {
    about: `Chemical peels are one of the most versatile and evidence-based treatments in dermatology, with a history of safe use spanning over 50 years. By applying a controlled acid solution to the skin, peels induce a predictable wound response — removing damaged outer skin cells and triggering the body's natural repair mechanisms to produce fresh collagen, elastin, and melanin-balanced skin.\n\nDr. Omaima uses a range of peels matched to skin type and concern: superficial peels (glycolic, lactic, mandelic) for regular brightening and maintenance; medium-depth peels (Jessner's, TCA) for acne scars and pigmentation; and specialty peels (salicylic, combination) for oily and acne-prone skin.\n\nFor Indian skin tones, peels must be chosen carefully to avoid post-inflammatory hyperpigmentation — which is why Dr. Omaima uses only clinically validated, skin-tone-appropriate protocols with mandatory pre-peel priming for all medium-depth procedures.`,
    concerns: [{ name: 'Acne', slug: 'acne' }, { name: 'Acne Scars', slug: 'acne-scars' }, { name: 'Pigmentation', slug: 'pigmentation' }, { name: 'Dull Skin', slug: 'dull-skin' }, { name: 'Pores', slug: 'pores' }],
    idealCandidate: 'Chemical peels suit a wide range of patients — from teenagers with acne to adults with pigmentation and ageing concerns. Ideal for acne-prone oily skin, surface pigmentation, uneven skin tone, mild scarring, or skin that needs regular maintenance. Not suitable during pregnancy or while using isotretinoin.',
    preparation: ['Begin a 2-week pre-peel prep with a prescribed priming cream if recommended', 'Stop retinoids and active exfoliants (AHAs/BHAs) 5–7 days before your session', 'Avoid sun exposure for 2 weeks before treatment', 'Do not wax, thread, or use hair removal creams on the face for 1 week before', 'Inform Dr. Omaima of all medications — especially antibiotics and hormonal treatments'],
    aftercare: 'Post-peel skin may be red and mildly tight for 24–48 hours. Peeling begins on day 3 and resolves by day 7 — do not pick or peel the skin manually. Use only a mild cleanser and fragrance-free moisturiser during healing. SPF 50 every morning is non-negotiable to prevent rebound pigmentation.',
    risks: ['Temporary redness, tightness, and dryness (normal healing response)', 'Peeling and flaking for 3–7 days after treatment', 'Post-inflammatory hyperpigmentation in darker skin if not managed correctly (avoided with pre-peel prep and SPF)', 'Herpes flare in susceptible patients (prophylactic antivirals prescribed if risk exists)', 'Prolonged redness in very sensitive or rosacea-prone skin'],
    relatedTreatments: [{ name: 'HydraFacial MD', slug: 'hydrafacial-md' }, { name: 'Bio Re Peel', slug: 'bio-re-peel' }, { name: 'Microneedling', slug: 'microneedling' }],
    preventionTips: ['Use SPF 50 every day — UV exposure is the primary driver of pigmentation recurrence', 'Incorporate a gentle AHA in your home routine between sessions to maintain results', 'Stay out of direct midday sun (11am–3pm) and use a hat outdoors', 'Maintain skin hydration with a ceramide-based moisturiser to support barrier health'],
  },
  'gfc-hair': {
    concerns: [{ name: 'Hair Fall', slug: 'hair-fall' }, { name: 'Hair Regrowth', slug: 'hair-regrowth' }],
    idealCandidate: 'GFC is ideal for patients with androgenetic alopecia who want the strongest possible non-surgical hair restoration, or those who have not achieved desired results with PRP. It is also recommended as a first-line premium option for moderate-to-severe diffuse thinning.',
    preparation: ['Avoid blood thinners for 5–7 days before', 'Stay well-hydrated on the day of your session', 'Eat a light meal before your appointment'],
    aftercare: 'Mild scalp tenderness resolves in 24–48 hours. Avoid washing hair for 6–8 hours. Avoid vigorous exercise on the day of treatment.',
    risks: ['Mild scalp tenderness at injection sites', 'Occasional temporary headache', 'Very rarely, small bruises at injection points'],
    relatedTreatments: [{ name: 'PRP Hair Restoration', slug: 'prp-hair' }, { name: 'Exosomes Treatment', slug: 'exosomes-face' }, { name: 'Cold Laser Therapy', slug: 'cold-laser-therapy' }],
    preventionTips: ['Use a mild sulphate-free shampoo', 'Manage stress levels — cortisol directly triggers hair fall', 'Ensure adequate dietary protein, iron, and B-vitamins', 'Maintenance sessions every 6 months preserve results'],
  },
  'microneedling': {
    about: `Microneedling with Radiofrequency (MNRF) is the dermatologist's gold standard for atrophic acne scars. By combining the controlled skin injury of microneedling with the deep thermal stimulus of RF energy, MNRF triggers collagen and elastin remodelling at a depth that topical treatments and superficial peels simply cannot reach.\n\nThe insulated gold-plated needles ensure that RF energy is delivered only at the intended dermal depth — protecting the epidermis from heat damage and making the procedure safe for all skin tones including darker Indian skin. This is a significant advantage over ablative lasers, which carry a higher risk of post-inflammatory hyperpigmentation in Fitzpatrick III–V patients.\n\nDermatologists recommend MNRF as the most effective non-surgical option for rolling, boxcar, and mixed-type acne scars, skin laxity, enlarged pores, and stretch marks.`,
    concerns: [{ name: 'Acne Scars', slug: 'acne-scars' }, { name: 'Acne', slug: 'acne' }, { name: 'Pores', slug: 'pores' }],
    idealCandidate: 'Ideal for patients with atrophic acne scars (rolling, boxcar, or mixed type), enlarged pores, or early skin laxity. Best results in patients who have had no active acne breakouts for at least 3 months. Suitable for all skin tones.',
    preparation: ['Avoid blood thinners for 5–7 days before', 'Avoid sun exposure for 2 weeks before', 'Stop retinoids for 5 days before treatment', 'Do not use any active skin treatments within 1 week of your session'],
    aftercare: 'Redness and mild swelling resolve in 24–72 hours. Use a gentle cleanser and plain moisturiser only for 5 days after. SPF 50 is mandatory. Avoid active skincare ingredients for 7 days post-treatment.',
    risks: ['Temporary redness and swelling (resolves in 1–3 days)', 'Rare pinpoint bleeding during procedure (normal, resolves immediately)', 'Rarely, temporary post-inflammatory darkening in very sensitive skin', 'Not suitable during active acne flares, pregnancy, or with metal implants in face'],
    relatedTreatments: [{ name: 'Chemical Peel', slug: 'chemical-peel' }, { name: 'PRP Hair Restoration', slug: 'prp-hair' }, { name: 'HydraFacial MD', slug: 'hydrafacial-md' }],
    preventionTips: ['Never pick or squeeze acne lesions — this directly causes the scars that microneedling treats', 'Use a broad-spectrum SPF 50 daily to prevent existing scars from darkening with UV exposure', 'Keep a consistent home routine with gentle actives between sessions to maximise results', 'Maintenance sessions every 6–12 months help sustain the collagen improvement'],
  },
  'dermal-fillers': {
    about: `Dermal fillers represent the most versatile non-surgical facial restoration tool available in modern aesthetic medicine. Unlike Botox, which relaxes muscles, fillers work by physically replacing volume that has been lost through ageing, or by strategically adding structure to enhance features that were never as prominent as desired.\n\nHyaluronic acid — the foundation of modern fillers — is a naturally occurring molecule found in all human skin that attracts and binds water, providing hydration and plumpness. As we age, natural HA production declines. Injectable HA fillers replenish this loss, creating immediate, soft, natural results.\n\nDr. Omaima uses a layered injection approach — placing different filler textures at different anatomical depths (periosteum, supraperiosteal, subcutaneous, and intradermal) to create structural support and surface-level refinement simultaneously. This is what produces a natural, three-dimensional result rather than a flat or puffy appearance.`,
    concerns: [{ name: 'Volume Loss', slug: 'volume-loss' }, { name: 'Wrinkles & Fine Lines', slug: 'wrinkles' }, { name: 'Sagging Skin', slug: 'sagging' }, { name: 'Dark Circles', slug: 'dark-circles' }],
    idealCandidate: 'Ideal for adults experiencing mid-face volume loss, deep nasolabial folds, lip deflation, under-eye hollowing, or weak chin and jawline definition. Also suitable for younger patients who want to enhance features. Not recommended during pregnancy or breastfeeding.',
    preparation: ['Avoid blood thinners (aspirin, ibuprofen, vitamin E, fish oil) for 1 week before', 'Avoid alcohol for 24 hours before to reduce bruising risk', 'Come makeup-free if possible', 'Do not schedule directly before an important event — allow 2 weeks for final results'],
    aftercare: 'Mild swelling and occasional bruising at injection points are normal and resolve within 48–72 hours. Apply cold compresses in the first 6 hours. Avoid touching or massaging treated areas for 24 hours. Sleep with head slightly elevated on night of treatment. Full results are visible at 2 weeks when swelling has fully resolved.',
    risks: ['Mild temporary swelling and bruising (resolves in 2–5 days)', 'Rarely, lumpiness or asymmetry (corrected at 2-week review or dissolved with hyaluronidase)', 'Very rarely, vascular occlusion (an emergency managed with immediate hyaluronidase — risk is minimised by using cannulas and aspiration technique)', 'Temporary tenderness at injection sites'],
    relatedTreatments: [{ name: 'Anti-Wrinkle Botox', slug: 'botox' }, { name: 'Cheek Enhancement', slug: 'cheek-enhancement' }, { name: 'Lip Enhancement', slug: 'lip-enhancement' }],
    preventionTips: ['Use SPF 50 daily — UV damage accelerates the facial volume loss that fillers correct', 'Maintain a diet rich in collagen-supporting nutrients (vitamin C, zinc, protein)', 'Stay well-hydrated to maintain skin plumpness between filler sessions', 'Touch-up sessions every 12–18 months maintain optimal results'],
  },
  'acne-treatment': {
    concerns: [{ name: 'Acne', slug: 'acne' }, { name: 'Acne Scars', slug: 'acne-scars' }, { name: 'Pores', slug: 'pores' }],
    idealCandidate: 'Suitable for teenagers and adults of all ages with mild, moderate, or severe acne — including comedonal, inflammatory, cystic, and hormonal types. Also suitable for patients with post-acne redness (PIE) or early post-acne scars who want a combined clearance and prevention approach.',
    preparation: ['Continue any existing prescribed medications unless specifically told to stop', 'Wash your face with a gentle cleanser on the morning of your session', 'Avoid new skincare products in the week before treatment', 'Inform Dr. Omaima if you are on hormonal contraception, antibiotics, or isotretinoin'],
    aftercare: 'Avoid touching your face after in-clinic procedures. Do not use active exfoliants on the day of treatment. SPF 50 is essential every day — sun exposure worsens post-acne marks. Follow the prescribed home care plan consistently between sessions for best results.',
    risks: ['Temporary skin sensitivity or mild irritation after chemical peels (resolves in 24–48 hours)', 'Initial purging (increased breakouts in week 1–2 before clearing)', 'Not recommended during pregnancy (some prescription actives are contraindicated)', 'Isotretinoin users need specific treatment modifications — always disclose this'],
    relatedTreatments: [{ name: 'Chemical Peel', slug: 'chemical-peel' }, { name: 'Microneedling', slug: 'microneedling' }, { name: 'Carbon Laser Facial', slug: 'carbon-laser-facial' }],
    preventionTips: ['Never squeeze or pop acne lesions — this pushes bacteria deeper and causes scarring', 'Use non-comedogenic (oil-free) sunscreen, moisturiser, and makeup', 'Change your pillowcase twice weekly — it harbours oil and bacteria', 'Avoid excessive dairy, refined sugar, and high-GI foods which worsen hormonal acne'],
  },
}

export default async function TreatmentPage({ params }) {
  const { slug } = await params
  const sanityData = await fetchTreatment(slug).catch(() => null)
  const fallback = FALLBACK_TREATMENTS[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    category: 'Treatment', tagline: '', description: 'Our doctor-led treatment is customised to your skin type and concern.',
    meta: {}, howItWorks: [], benefits: [], faqs: [],
  }
  const extras = TREATMENT_EXTRAS[slug] || {}
  const t = { ...fallback, ...extras, ...(sanityData || {}) }

  return (
    <article style={{ background: 'var(--cream)' }}>

      {/* ── 1. HERO ── */}
      <section style={{ padding: '48px 20px 44px', background: 'linear-gradient(160deg,#F5EDE4 0%,#FAF7F2 60%,#EEE8E2 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: t.image ? '1fr 400px' : '1fr', gap: 52, alignItems: 'center' }} className={t.image ? 'treatment-hero-grid' : ''}>
          <div>
            <nav style={{ fontSize: 12, color: '#9A8A7A', fontWeight: 300, marginBottom: 24, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#9A8A7A' }}>Home</Link><span>/</span>
              <Link href="/treatments" style={{ color: '#9A8A7A' }}>Treatments</Link><span>/</span>
              <span style={{ color: 'var(--text)' }}>{t.name}</span>
            </nav>
            <span className="eyebrow">{t.category}</span>
            <h1 style={{ fontWeight: 500, fontSize: 'clamp(26px,4vw,46px)', lineHeight: 1.15, marginBottom: 16, maxWidth: 700 }}>{t.name}</h1>
            <p style={{ fontSize: 16, fontWeight: 300, color: '#4A3728', maxWidth: 620, lineHeight: 1.85, marginBottom: 28 }}>{t.tagline || t.description}</p>
            {t.meta && Object.keys(t.meta).length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
                {Object.entries(t.meta).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ background: '#fff', borderRadius: 10, padding: '10px 18px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
                    <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8916A' }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 400, color: 'var(--text)', marginTop: 3 }}>{v}</div>
                  </div>
                ))}
              </div>
            )}
            {t.benefits?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {t.benefits.slice(0, 3).map((b, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 400, color: '#1A2744', background: 'rgba(26,39,68,0.07)', padding: '6px 14px', borderRadius: 999 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4A6741" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {b}
                  </span>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ background: '#1A2744', color: '#fff', fontSize: 13.5, fontWeight: 400, padding: '13px 28px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
              <a href="tel:09811997993" style={{ background: 'transparent', color: '#1A2744', fontSize: 13.5, fontWeight: 400, padding: '13px 28px', borderRadius: 999, border: '1.5px solid rgba(26,39,68,0.2)', textDecoration: 'none' }}>Call 098119 97993</a>
            </div>
          </div>
          {t.image && (
            <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/5', position: 'relative', background: '#E8DED4', boxShadow: '0 16px 48px rgba(26,17,9,0.12)' }}>
              <Image
                src={urlFor(t.image).width(600).height(750).fit('crop').url()}
                alt={t.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── 2. ABOUT THE TREATMENT ── */}
      <section style={{ padding: '72px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 290px', gap: 48, alignItems: 'start' }}>
          <div>
            <span className="eyebrow">About the Treatment</span>
            <h2 style={{ fontWeight: 500, marginBottom: 22 }}>What is {t.name}?</h2>
            <div style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.9 }}>
              {(t.about || t.description || '').split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: 18 }}>{para}</p>
              ))}
            </div>
            <div style={{ marginTop: 8, padding: '20px 22px', background: '#F5F9F4', borderRadius: 12, border: '1.5px solid rgba(74,103,65,0.15)' }}>
              <div style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A6741', marginBottom: 8 }}>Why dermatologists recommend it</div>
              <p style={{ fontSize: 13.5, fontWeight: 300, color: '#3A2A1A', lineHeight: 1.75, margin: 0 }}>
                {t.name} is a clinically validated procedure performed by Dr. Omaima using medical-grade technology. Every treatment plan is personalised based on your skin type, concern severity, and treatment goals.
              </p>
            </div>
          </div>
          <div style={{ background: '#F5EDE4', borderRadius: 16, padding: '28px 24px', border: '1.5px solid rgba(184,145,106,0.2)', position: 'sticky', top: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 18 }}>Quick Facts</div>
            {t.meta && Object.entries(t.meta).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(184,145,106,0.15)' }}>
                <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A8A7A', marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 13.5, fontWeight: 400, color: '#3A2A1A' }}>{v}</div>
              </div>
            ))}
            <Link href="/contact" style={{ display: 'block', textAlign: 'center', background: '#1A2744', color: '#fff', fontSize: 13, fontWeight: 400, padding: '12px 20px', borderRadius: 999, textDecoration: 'none', marginTop: 8 }}>Book a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* ── 3 + 4. WHAT IT HELPS WITH + CONDITIONS TREATED ── */}
      {t.concerns?.length > 0 && (
        <section style={{ padding: '72px 20px', background: 'var(--cream)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow">Conditions Treated</span>
            <h2 style={{ fontWeight: 500, marginBottom: 12 }}>What does {t.name} help with?</h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#5A4A3A', maxWidth: 640, lineHeight: 1.8, marginBottom: 32 }}>
              {t.name} is clinically effective for the following skin and hair concerns. Click any condition to learn more about our approach.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
              {t.concerns.map((c, i) => (
                <Link key={i} href={`/concerns/${c.slug}`} style={{ fontSize: 13, fontWeight: 400, color: '#1A2744', background: '#fff', border: '1.5px solid rgba(26,39,68,0.15)', padding: '8px 18px', borderRadius: 999, textDecoration: 'none' }}>
                  {c.name} →
                </Link>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {t.concerns.map((c, i) => (
                <Link key={i} href={`/concerns/${c.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 14, padding: '22px 20px', border: '1.5px solid rgba(26,17,9,0.09)', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5EDE4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 16 12 12 16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>{c.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 300, color: '#B8916A', marginTop: 'auto' }}>View concern page →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. BENEFITS ── */}
      {t.benefits?.length > 0 && (
        <section style={{ padding: '72px 20px', background: '#1A2744' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow" style={{ color: '#B8916A' }}>Why Choose This</span>
            <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 36 }}>Benefits of {t.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {t.benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '18px 20px', background: 'rgba(255,255,255,0.07)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#B8916A', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13.5, fontWeight: 300, color: '#E8DED4', lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. IDEAL CANDIDATE ── */}
      {t.idealCandidate && (
        <section style={{ padding: '72px 20px', background: '#FAF7F2' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Is This Right For You?</span>
              <h2 style={{ fontWeight: 500, marginBottom: 18 }}>Who is an ideal candidate?</h2>
              <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, marginBottom: 28 }}>{t.idealCandidate}</p>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: '#1A2744', border: '1.5px solid rgba(26,39,68,0.2)', padding: '11px 22px', borderRadius: 999, textDecoration: 'none' }}>Check if you're suitable →</Link>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: '28px 24px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 16 }}>Good candidates typically have</div>
              {(t.concerns?.length ? t.concerns : t.benefits?.slice(0, 5).map(b => ({ name: b })) || []).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(26,17,9,0.07)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A6741" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 13, fontWeight: 300, color: '#4A3728' }}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. HOW IT IS PERFORMED ── */}
      {t.howItWorks?.length > 0 && (
        <section style={{ padding: '72px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow">The Procedure</span>
            <h2 style={{ fontWeight: 500, marginBottom: 10 }}>How {t.name} is performed</h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#5A4A3A', maxWidth: 580, lineHeight: 1.8, marginBottom: 36 }}>Every treatment at Tvak & Asthi is personally performed by Dr. Omaima — not a therapist or technician.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {t.howItWorks.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '24px', background: '#F9F6F2', borderRadius: 16, border: '1.5px solid rgba(26,17,9,0.07)' }}>
                  <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A2744', color: '#FAF7F2', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.step || i + 1}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 6 }}>{step.title}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 300, color: '#5A4A3A', lineHeight: 1.75 }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8 + 9. PREPARATION & AFTERCARE ── */}
      {(t.preparation?.length > 0 || t.aftercare) && (
        <section style={{ padding: '72px 20px', background: 'var(--cream)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {t.preparation?.length > 0 && (
              <div>
                <span className="eyebrow">Before Your Session</span>
                <h2 style={{ fontWeight: 500, marginBottom: 22 }}>Preparation before treatment</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.preparation.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.08)' }}>
                      <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#F5EDE4', color: '#B8916A', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.65 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {t.aftercare && (
              <div>
                <span className="eyebrow">After Your Session</span>
                <h2 style={{ fontWeight: 500, marginBottom: 22 }}>Recovery & Aftercare</h2>
                <div style={{ fontSize: 14, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, background: '#fff', borderRadius: 16, padding: '24px', border: '1.5px solid rgba(26,17,9,0.08)', marginBottom: 16 }}>{t.aftercare}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {t.meta?.Recovery && <span style={{ background: '#E8F5E9', borderRadius: 8, padding: '8px 14px', fontSize: 12.5, fontWeight: 400, color: '#2E7D32' }}>Recovery: {t.meta.Recovery}</span>}
                  {t.meta?.Results && <span style={{ background: '#E3F2FD', borderRadius: 8, padding: '8px 14px', fontSize: 12.5, fontWeight: 400, color: '#1565C0' }}>Results: {t.meta.Results}</span>}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 10. RESULTS & BEFORE/AFTER ── */}
      <section style={{ padding: '72px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="eyebrow">Real Results</span>
          <h2 style={{ fontWeight: 500, marginBottom: 10 }}>What results can you expect?</h2>
          {t.meta?.Results && (
            <p style={{ fontSize: 14, fontWeight: 300, color: '#5A4A3A', marginBottom: 32, maxWidth: 560 }}>
              Most patients see {t.meta.Results.toLowerCase()} results. Individual outcomes vary based on skin type, concern severity, and adherence to aftercare.
            </p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginBottom: 32 }}>
            {t.beforeAfter?.length > 0
              ? t.beforeAfter.map((ba, i) => (
                <div key={i} style={{ background: '#FAF7F2', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                  <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 220 }}>
                    <div style={{ position: 'relative', background: '#E2D8CE' }}>
                      {ba.before && (
                        <Image
                          src={urlFor(ba.before).width(300).height(220).fit('crop').url()}
                          alt="Before"
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="150px"
                        />
                      )}
                      <span style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.9)', color: '#4A3728', padding: '3px 8px', borderRadius: 4 }}>Before</span>
                    </div>
                    <div style={{ position: 'relative', background: '#C8BDB0' }}>
                      {ba.after && (
                        <Image
                          src={urlFor(ba.after).width(300).height(220).fit('crop').url()}
                          alt="After"
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="150px"
                        />
                      )}
                      <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(26,39,68,0.85)', color: '#FAF7F2', padding: '3px 8px', borderRadius: 4 }}>After</span>
                    </div>
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4A3728" strokeWidth="2.5"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px 18px' }}>
                    <p style={{ fontSize: 12.5, fontWeight: 400, color: '#5A4A3A', margin: 0 }}>{ba.label || `Patient result · ${ba.sessions || t.meta?.Sessions || '3–6 sessions'}`}</p>
                    <p style={{ fontSize: 11, fontWeight: 300, color: '#B8A898', marginTop: 4 }}>Individual results may vary.</p>
                  </div>
                </div>
              ))
              : [1, 2, 3].map(i => (
                <div key={i} style={{ background: '#FAF7F2', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                  <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 210, background: '#F0E8DF' }}>
                    <div style={{ background: '#E2D8CE', display: 'flex', alignItems: 'flex-end', padding: '10px' }}>
                      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.85)', color: '#4A3728', padding: '4px 8px', borderRadius: 4 }}>Before</span>
                    </div>
                    <div style={{ background: '#C8BDB0', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(26,39,68,0.8)', color: '#FAF7F2', padding: '4px 8px', borderRadius: 4 }}>After</span>
                    </div>
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4A3728" strokeWidth="2.5"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px 18px' }}>
                    <p style={{ fontSize: 12.5, fontWeight: 400, color: '#5A4A3A', margin: 0 }}>Patient result · {t.meta?.Sessions || '3–6 sessions'}</p>
                    <p style={{ fontSize: 11, fontWeight: 300, color: '#B8A898', marginTop: 4 }}>Individual results may vary.</p>
                  </div>
                </div>
              ))
            }
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/before-after" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: '#1A2744', border: '1.5px solid rgba(26,39,68,0.2)', padding: '11px 24px', borderRadius: 999, textDecoration: 'none' }}>
              View full Before & After gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. RISKS & SIDE EFFECTS ── */}
      {t.risks?.length > 0 && (
        <section style={{ padding: '72px 20px', background: '#FFFDF9' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow">Transparency</span>
            <h2 style={{ fontWeight: 500, marginBottom: 12 }}>Risks & Side Effects</h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#5A4A3A', maxWidth: 600, lineHeight: 1.8, marginBottom: 28 }}>
              At Tvak & Asthi, we believe in complete transparency. While {t.name} is a clinically established procedure, the following effects can occasionally occur:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
              {t.risks.map((risk, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', background: '#FFF8F3', borderRadius: 12, border: '1.5px solid rgba(184,145,106,0.2)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span style={{ fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.65 }}>{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 12. DOCTOR NOTE ── */}
      <section style={{ padding: '64px 20px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 20, padding: '32px', border: '1.5px solid rgba(26,17,9,0.09)', display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24, alignItems: 'start' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#E8DED4,#D4C8BC)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 8 }}>A note from Dr. Omaima</div>
            <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.9, marginBottom: 16, fontStyle: 'italic' }}>
              "Every {t.name} treatment at Tvak & Asthi is personally performed by me — not a technician. I will give you an honest assessment of what results are genuinely achievable for your specific skin, and how many sessions are realistically needed."
            </p>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>Dr. Omaima Jawed</div>
            <div style={{ fontSize: 12.5, fontWeight: 300, color: '#9A8A7A' }}>MBBS · Aesthetic Physician · 5 Years Experience</div>
          </div>
        </div>
      </section>

      {/* ── 13. FAQ ── */}
      {t.faqs?.length > 0 && (
        <section style={{ padding: '72px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ fontWeight: 500, marginBottom: 32 }}>Frequently asked questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {t.faqs.map((f, i) => (
                <details key={i} style={{ background: '#F9F6F2', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.07)', overflow: 'hidden' }}>
                  <summary style={{ padding: '18px 22px', fontSize: 14, fontWeight: 400, cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, color: 'var(--text)' }}>
                    {f.question}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><path d="m6 9 6 6 6-6"/></svg>
                  </summary>
                  <p style={{ margin: 0, padding: '4px 22px 20px', fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.8 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 14. RELATED TREATMENTS ── */}
      {t.relatedTreatments?.length > 0 && (
        <section style={{ padding: '72px 20px', background: 'var(--cream)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow">You May Also Consider</span>
            <h2 style={{ fontWeight: 500, marginBottom: 32 }}>Related Treatments</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {t.relatedTreatments.map((rt, i) => (
                <Link key={i} href={`/treatments/${rt.slug?.current || rt.slug}`} className="card-hover" style={{ textDecoration: 'none', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.09)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 160, background: '#F0E8DF', position: 'relative', flexShrink: 0 }}>
                    {rt.image ? (
                      <Image
                        src={urlFor(rt.image).width(400).height(160).fit('crop').url()}
                        alt={rt.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="300px"
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(184,145,106,0.35)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                    {rt.category && (
                      <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(26,17,9,0.72)', color: '#FAF7F2', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 999 }}>{rt.category.toUpperCase()}</div>
                    )}
                  </div>
                  <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 6 }}>{rt.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 300, color: '#B8916A', marginTop: 'auto' }}>Explore treatment →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 15. PREVENTION TIPS ── */}
      {t.preventionTips?.length > 0 && (
        <section style={{ padding: '72px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow">Maintain Your Results</span>
            <h2 style={{ fontWeight: 500, marginBottom: 28 }}>Prevention & Maintenance Tips</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
              {t.preventionTips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 20px', background: '#F9F6F2', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.07)' }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#E8F0E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A6741" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.7 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 16. BOOK CTA ── */}
      <section style={{ padding: '80px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 14 }}>Ready to start?</div>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 14 }}>Book your {t.name} consultation</h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#C4A998', marginBottom: 36 }}>
            Speak directly with Dr. Omaima to find out if {t.name} is right for your skin. All consultations are medical-grade and personalised.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#C4847E', color: '#fff', fontSize: 13.5, fontWeight: 400, padding: '14px 32px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
            <a href="https://wa.me/919811997993" target="_blank" rel="noopener" style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF7F2', fontSize: 13.5, fontWeight: 400, padding: '14px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </article>
  )
}
