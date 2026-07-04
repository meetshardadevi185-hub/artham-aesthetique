/**
 * Sanity seed script — run with:
 *   node --env-file=.env.local scripts/seed-sanity.mjs
 *
 * Creates/updates all treatment and concern documents.
 * Safe to re-run (uses createOrReplace with deterministic _id).
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'l8z1brxo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function k(prefix, i) { return `${prefix}${i}` }

// ---------------------------------------------------------------------------
// TREATMENTS
// ---------------------------------------------------------------------------

const TREATMENTS = [
  {
    slug: 'hydrafacial-md', name: 'HydraFacial MD', category: 'Skin & Glow',
    tagline: 'Deep cleanse, instant glow', order: 1,
    description: 'HydraFacial MD is a patented multi-step treatment that cleanses, exfoliates, extracts impurities, and infuses the skin with potent serums — all in a single session. It is the only treatment that combines these actions without irritation, making it suitable for all skin types including sensitive skin.',
    meta: { duration: '45–60 min', sessions: '1 (or monthly)', recovery: 'None', results: 'Immediate' },
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
    about: 'HydraFacial MD is the world\'s most popular non-invasive skin treatment, combining deep cleansing, exfoliation, extraction, hydration, and antioxidant infusion in a single 45-minute session. Unlike harsh peels or aggressive microdermabrasion, HydraFacial uses a patented Vortex-Fusion® serum delivery system that treats even the most sensitive skin without irritation or downtime. The treatment is entirely customisable — Dr. Omaima selects boosters and serums based on your specific concerns before every session. Whether your goal is to address dullness, enlarged pores, fine lines, or dehydration, HydraFacial\'s multi-step protocol is tailored to deliver targeted results.',
    idealCandidate: 'HydraFacial is suitable for virtually all skin types and ages. Ideal if you want immediate skin improvement with zero downtime, or if you have sensitive skin that reacts to more aggressive treatments.',
    preparation: ['Avoid retinoids and active exfoliants (AHAs/BHAs) for 3 days before', 'Come with a clean, makeup-free face if possible', 'Mention any new skincare products or medications at your consultation', 'Stay well-hydrated in the days leading up to your session'],
    aftercare: 'Skin may appear slightly flushed for 2–4 hours — this resolves quickly. Avoid heavy makeup for 4–6 hours to allow serums to fully absorb. Apply SPF 50 the following morning. Avoid active exfoliants for 3–5 days after treatment.',
    risks: ['Mild temporary redness (resolves within hours)', 'Rarely, temporary tingling in very sensitive skin', 'Pre-existing skin sensitivity may be temporarily heightened', 'Not recommended immediately after Botox or dermal fillers'],
    preventionTips: ['Use SPF 50 every morning — UV damage is the primary cause of skin ageing and dullness', 'Maintain a gentle twice-daily cleanse with a mild pH-balanced cleanser', 'Stay hydrated — dehydration worsens fine lines and dullness significantly', 'Monthly HydraFacial sessions maintain results year-round'],
    rating: 4.9, reviewCount: 410, featured: true,
  },
  {
    slug: 'carbon-laser-facial', name: 'Carbon Laser Facial', category: 'Skin & Glow',
    tagline: 'Pore tightening & oil control', order: 2,
    description: 'The Carbon Laser Facial (also called the "Hollywood Peel") uses a layer of medical-grade activated carbon applied to the skin, then targeted with a Q-switched Nd:YAG laser. The laser vaporises the carbon along with oil, blackheads, and dead skin cells — leaving skin visibly clearer, tighter, and luminous.',
    meta: { duration: '30–40 min', sessions: '4–6 sessions', recovery: 'None', results: '1–2 weeks' },
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
    rating: 4.8, reviewCount: 320, featured: true,
  },
  {
    slug: 'acne-clearance', name: 'Acne Clearance Program', category: 'Acne & Scars',
    tagline: 'Root-cause acne treatment', order: 3,
    description: 'Our Acne Clearance Program is a structured multi-session protocol that addresses the root causes of acne — excess sebum, bacteria, inflammation, and hormonal triggers. It combines clinical treatments with topical prescription protocols so results last beyond the treatment period.',
    meta: { duration: '30–45 min / session', sessions: '4–8 sessions', recovery: 'Minimal', results: '4–6 weeks' },
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
    rating: 4.9, reviewCount: 930, featured: true,
  },
  {
    slug: 'acne-treatment', name: 'Acne Clearance Program', category: 'Acne & Scars',
    tagline: 'Root-cause acne treatment', order: 4,
    description: 'Our Acne Clearance Program is a structured multi-session protocol addressing the root causes of acne — excess sebum, C. acnes bacteria, inflammation, and hormonal triggers. It combines in-clinic treatments with a personalised topical prescription protocol so results persist long after the treatment course ends.',
    meta: { duration: '30–45 min / session', sessions: '4–8 sessions', recovery: 'Minimal', results: '4–6 weeks' },
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
    rating: 4.9, reviewCount: 930,
  },
  {
    slug: 'acne-scar-mnrf', name: 'Acne Scar Revision — MNRF', category: 'Acne & Scars',
    tagline: 'Pitted & rolling scar correction', order: 5,
    description: 'Microneedling Radiofrequency (MNRF) is the most effective treatment for atrophic acne scars including ice-pick, boxcar, and rolling scars. Insulated gold-plated microneedles deliver fractional RF energy precisely at the dermal layer, triggering intensive collagen remodelling without damaging the skin surface.',
    meta: { duration: '60–75 min', sessions: '3–5 sessions', recovery: '2–3 days redness', results: '4–6 weeks per session' },
    howItWorks: [
      { step: 1, title: 'Topical Anaesthesia', description: 'A numbing cream is applied 30–45 minutes before the procedure to ensure complete comfort throughout.' },
      { step: 2, title: 'MNRF Treatment Pass', description: 'An insulated microneedling device is passed across scarred areas, delivering radiofrequency energy at precise depths of 1.5–3.5mm.' },
      { step: 3, title: 'Collagen Induction', description: 'The combined mechanical and thermal injury triggers the body\'s wound-healing response — generating new collagen and elastin that fills scar depressions.' },
      { step: 4, title: 'Post-Treatment Care', description: 'A calming serum and strict SPF protocol are applied. Mild redness resolves within 24–72 hours.' },
    ],
    benefits: ['Reduces ice-pick, boxcar and rolling scars', 'Deep collagen remodelling', 'Minimal surface damage', 'Visible improvement from session 1', 'Safe for dark skin tones', 'Simultaneously tightens skin'],
    faqs: [
      { question: 'How many sessions will I need?', answer: 'Most patients require 3–5 sessions spaced 4–6 weeks apart. Deeper scars may need up to 6 sessions.' },
      { question: 'Is it painful?', answer: 'Topical anaesthetic is applied before the session. During treatment most patients feel slight pressure and warmth. Post-session redness typically resolves in 1–2 days.' },
      { question: 'What is the downtime?', answer: 'Redness and mild swelling resolve within 24–72 hours. You can resume work and daily activities the next day with SPF.' },
      { question: 'What types of scars respond best?', answer: 'Rolling and boxcar scars show the best improvement. Ice-pick scars improve too but may need additional treatments like TCA cross.' },
    ],
    rating: 4.8, reviewCount: 540, featured: true,
  },
  {
    slug: 'melasma', name: 'Melasma Treatment', category: 'Pigmentation',
    tagline: 'Pigmentation & dark patch removal', order: 6,
    description: 'Melasma causes dark, irregular patches on the face — typically triggered by sun exposure, hormonal changes, and genetics. Our protocol combines laser toning, chemical peels, and a medicated home care plan to fade patches and prevent relapse effectively.',
    meta: { duration: '30–45 min / session', sessions: '6–8 sessions', recovery: 'None', results: '6–8 weeks' },
    howItWorks: [
      { step: 1, title: 'Root Cause Assessment', description: 'Dr. Omaima evaluates your melasma pattern, depth (epidermal vs mixed), and hormonal history to design the most effective protocol.' },
      { step: 2, title: 'Laser Toning (Q-Switched Nd:YAG)', description: 'Low-fluence Q-switched laser passes break up melanin clusters in the epidermis without creating heat damage to surrounding skin.' },
      { step: 3, title: 'Chemical Peel Layer', description: 'A Kojic acid or modified Jessner peel is applied after the laser to accelerate cell turnover and brighten the skin.' },
      { step: 4, title: 'Prescription Maintenance', description: 'A medicated home regime with prescription-strength depigmenting agents and broad-spectrum SPF 50 is mandatory between sessions to prevent rebound.' },
    ],
    benefits: ['Fades dark patches', 'Prevents rebound pigmentation', 'Safe for Indian skin', 'Combines multiple modalities', 'Hormonal trigger management', 'Long-term maintenance plan'],
    faqs: [
      { question: 'Can melasma be completely cured?', answer: 'Melasma is a chronic condition that can be well-controlled but not permanently cured. With the right protocol and SPF discipline, patches can be almost invisible.' },
      { question: 'What makes Indian skin harder to treat?', answer: 'Darker skin (Fitzpatrick III–V) has more reactive melanocytes that can overproduce pigment if treatment is too aggressive. Our low-fluence approach avoids post-inflammatory hyperpigmentation.' },
      { question: 'Do I need to stop hormonal contraception?', answer: 'Hormonal contraception can worsen melasma. Dr. Omaima will discuss this during your consultation.' },
      { question: 'How important is sunscreen?', answer: 'SPF is non-negotiable with melasma. Even brief UV exposure can undo weeks of treatment. We recommend SPF 50 every morning, reapplied every 2 hours when outdoors.' },
    ],
    rating: 4.8, reviewCount: 290,
  },
  {
    slug: 'botox', name: 'Anti-Wrinkle Botox', category: 'Anti-Ageing',
    tagline: 'Expression line softening', order: 7,
    description: 'Botulinum toxin (Botox) is the gold standard for softening dynamic wrinkles caused by repeated facial muscle movements — forehead lines, frown lines, and crow\'s feet. When administered by Dr. Omaima, results are natural and refreshed, never frozen.',
    meta: { duration: '15–20 min', sessions: '1 (every 4–6 months)', recovery: 'None', results: '3–5 days' },
    howItWorks: [
      { step: 1, title: 'Facial Mapping', description: 'Dr. Omaima assesses your facial anatomy, muscle movement patterns, and areas of concern to plan precise injection points.' },
      { step: 2, title: 'Micro-injections', description: 'Tiny amounts of botulinum toxin are injected into targeted muscles using ultra-fine needles. The procedure takes under 20 minutes.' },
      { step: 3, title: 'Muscle Relaxation', description: 'The toxin temporarily blocks the nerve signal to treated muscles, softening the overlying wrinkles without affecting surrounding muscles.' },
      { step: 4, title: 'Results & Review', description: 'Results appear in 3–5 days and peak at 2 weeks. A 2-week review is included to assess and touch up if needed.' },
    ],
    benefits: ['Softens forehead lines', 'Smoothes frown lines (11s)', 'Reduces crow\'s feet', 'Natural, refreshed result', 'No downtime', 'Preventive for younger patients'],
    faqs: [
      { question: 'Will it look natural?', answer: 'Yes — Dr. Omaima\'s technique preserves full natural expression while softening lines. The goal is to look refreshed, not frozen.' },
      { question: 'Does it hurt?', answer: 'The needles used are ultra-fine and injection sites are small. Most patients describe it as tiny pinpricks. No anaesthetic is needed.' },
      { question: 'How long do results last?', answer: 'Results typically last 4–6 months. With regular treatments, muscles gradually weaken and results can last longer.' },
      { question: 'Who should avoid Botox?', answer: 'Botox is not recommended during pregnancy or breastfeeding, or if you have neuromuscular conditions. A full medical history is taken before any procedure.' },
    ],
    about: 'Botulinum toxin (Botox) is the world\'s most studied aesthetic treatment, with an unparalleled safety record built over 30 years of clinical use. It works by temporarily blocking the nerve signal to specific facial muscles, causing them to relax and the overlying dynamic wrinkles to soften naturally. The key to natural-looking Botox is expert dosing and anatomical placement. Dr. Omaima\'s philosophy is never to freeze expression but to soften lines while preserving the full range of facial movement.',
    idealCandidate: 'Ideal for adults aged 25–65 who have dynamic wrinkles (lines caused by muscle movement) on the forehead, between the brows, or around the eyes. Also suitable for patients wanting preventive treatment before wrinkles become permanent.',
    preparation: ['Avoid blood thinners and anti-inflammatories (aspirin, ibuprofen) for 1 week before', 'Avoid alcohol for 24 hours before to reduce bruising risk', 'Come to your appointment makeup-free if possible', 'Avoid vigorous exercise on the day of treatment'],
    aftercare: 'Results appear in 3–5 days and peak at 2 weeks. Avoid lying flat or bending forward for 4 hours after treatment. Do not rub or massage treated areas for 24 hours. Avoid saunas, steam rooms, and vigorous exercise for 24 hours.',
    risks: ['Mild temporary redness or swelling at injection points (resolves in hours)', 'Rare temporary bruising', 'Temporary mild headache (uncommon)', 'Temporary brow heaviness if too much product placed in forehead', 'All effects fully reverse over 4–6 months'],
    preventionTips: ['SPF 50 daily slows collagen breakdown and UV-induced wrinkle formation', 'A retinoid-based home care routine significantly reduces the rate of new wrinkle formation', 'Stay well-hydrated — skin plumpness masks fine lines naturally', 'Regular Botox every 4–6 months prevents lines deepening into permanent static wrinkles'],
    rating: 4.9, reviewCount: 380, featured: true,
  },
  {
    slug: 'fillers', name: 'Dermal Fillers', category: 'Anti-Ageing',
    tagline: 'Volume restoration & contouring', order: 8,
    description: 'Dermal fillers are hyaluronic acid-based injectable gels that restore lost facial volume, smooth deep folds, and enhance natural contours. Dr. Omaima uses only premium FDA-approved fillers and precise anatomical injection techniques to create subtle, harmonious results.',
    meta: { duration: '30–45 min', sessions: '1 (every 9–18 months)', recovery: '24–48 hrs mild swelling', results: 'Immediate' },
    howItWorks: [
      { step: 1, title: 'Aesthetic Consultation', description: 'Dr. Omaima discusses your goals, analyses facial proportions, and advises on the most appropriate filler type and placement for a natural result.' },
      { step: 2, title: 'Topical Numbing', description: 'A numbing cream is applied. Most fillers also contain built-in lidocaine for added comfort.' },
      { step: 3, title: 'Precise Injection', description: 'Filler is injected at the correct anatomical plane using a needle or cannula, depending on the treatment area, to ensure safety and precision.' },
      { step: 4, title: 'Moulding & Review', description: 'The filler is gently moulded to ensure symmetry. A follow-up assessment is recommended at 2–4 weeks.' },
    ],
    benefits: ['Restores cheek volume', 'Fills nasolabial folds', 'Enhances lip shape', 'Softens under-eye hollows', 'Sharpens jawline', 'Immediate natural results'],
    faqs: [
      { question: 'Are fillers safe?', answer: 'When administered by a trained medical professional using FDA-approved products, dermal fillers are extremely safe.' },
      { question: 'How long do fillers last?', answer: 'Depending on the product and treatment area, results last 9–18 months. Cheeks and jawline last longer; lips and tear troughs metabolise faster.' },
      { question: 'Is it reversible?', answer: 'Yes — hyaluronic acid fillers can be dissolved at any time with a hyaluronidase injection if you are unhappy with results.' },
      { question: 'Can fillers be combined with Botox?', answer: 'Yes — combining Botox and fillers in a "liquid facelift" protocol is common and synergistic.' },
    ],
    rating: 4.8, reviewCount: 210,
  },
  {
    slug: 'dermal-fillers', name: 'Dermal Fillers', category: 'Anti-Ageing',
    tagline: 'Volume restoration & contouring', order: 9,
    description: 'Dermal fillers are hyaluronic acid-based injectable gels that restore lost facial volume, smooth deep folds, and enhance natural facial contours. Dr. Omaima uses only premium FDA-approved fillers and precise anatomical injection techniques to create subtle, harmonious, and natural-looking results.',
    meta: { duration: '30–45 min', sessions: '1 (every 9–18 months)', recovery: '24–48 hrs mild swelling', results: 'Immediate' },
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
    rating: 4.8, reviewCount: 210, featured: true,
  },
  {
    slug: 'prp-hair', name: 'PRP Hair Restoration', category: 'Hair Restoration',
    tagline: 'Stimulate natural hair regrowth', order: 10,
    description: 'Platelet-Rich Plasma (PRP) therapy uses your own blood\'s growth factors to stimulate dormant hair follicles, increase hair density, and slow down hair loss. It is a safe, natural, and clinically proven treatment for androgenetic alopecia and diffuse thinning in both men and women.',
    meta: { duration: '45–60 min / session', sessions: '3–4 sessions (monthly)', recovery: 'None', results: '3–6 months' },
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
      { question: 'Is it effective for advanced hair loss?', answer: 'PRP works best for early to moderate androgenetic alopecia. Completely bald areas with no follicular activity will not respond.' },
      { question: 'Can PRP be combined with other treatments?', answer: 'Yes — PRP combined with GFC therapy gives superior results. It also complements oral minoxidil or finasteride if prescribed.' },
    ],
    about: 'Platelet-Rich Plasma (PRP) therapy is a regenerative medicine technique that harnesses your own blood\'s growth factors to stimulate dormant hair follicles. Platelets contain growth factors — PDGF, VEGF, EGF, and FGF — that signal stem cells to regenerate and repair tissue. When concentrated PRP is injected into the scalp, these growth factors activate follicles that have entered the resting (telogen) phase. PRP is entirely autologous — derived from your own blood — eliminating any risk of allergic reaction or rejection.',
    idealCandidate: 'PRP is ideal for men and women with androgenetic alopecia (pattern hair loss), diffuse thinning, or early-stage alopecia areata. It works best when some follicular activity is still present — completely bald areas with no follicles cannot respond.',
    preparation: ['Avoid blood thinners (aspirin, ibuprofen, omega-3) for 5–7 days before', 'Stay well-hydrated on the day of your session', 'Wash your hair normally the morning of the session', 'Eat a light meal before your appointment to avoid feeling faint during the blood draw', 'Avoid smoking for 24 hours before — nicotine affects platelet function'],
    aftercare: 'Mild scalp tenderness and pinpoint marks at injection sites are normal and resolve within 24–48 hours. Avoid washing your hair for 6–8 hours after treatment. Avoid intense scalp massage or vigorous exercise on the day of treatment.',
    risks: ['Mild scalp tenderness at injection sites (resolves in 1–2 days)', 'Occasional temporary headache', 'Very rarely, small bruises at injection points', 'Temporary shedding in the first 2–4 weeks (normal cycle activation)', 'Not suitable during active infection, chemotherapy, or with blood disorders'],
    preventionTips: ['Use a mild sulphate-free shampoo — harsh shampoos damage the scalp microbiome', 'Manage stress — cortisol is one of the most significant triggers for hair fall', 'Ensure adequate protein, iron, and B-vitamin intake in your diet', 'Avoid tight hairstyles that create traction alopecia', 'Maintenance PRP sessions every 4–6 months preserve results long-term'],
    rating: 4.8, reviewCount: 460, featured: true,
  },
  {
    slug: 'gfc-hair', name: 'GFC Hair Therapy', category: 'Hair Restoration',
    tagline: 'Next-gen growth factor therapy', order: 11,
    description: 'Growth Factor Concentrate (GFC) is an advanced evolution of PRP that isolates and concentrates specific growth factors at 5–8x higher concentration. The result is a more potent stimulus for dormant follicles — making it the most effective injectable option for hair loss currently available.',
    meta: { duration: '60 min / session', sessions: '3 sessions (monthly)', recovery: 'None', results: '2–4 months' },
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
      { question: 'Can GFC be combined with PRP?', answer: 'Some patients alternate between GFC primary sessions and PRP maintenance sessions as a cost-effective strategy.' },
    ],
    rating: 4.9, reviewCount: 180, featured: true,
  },
  {
    slug: 'laser-tattoo-removal', name: 'Laser Tattoo Removal', category: 'Skin & Glow',
    tagline: 'Safe tattoo fading & removal', order: 12,
    description: 'Laser tattoo removal uses Q-switched Nd:YAG laser technology to break down tattoo ink particles into fragments small enough for the immune system to eliminate. Multiple sessions are required depending on tattoo size, ink colour, age, and depth. Our laser is safe for Indian skin tones.',
    meta: { duration: '15–45 min', sessions: '6–12 sessions', recovery: '2–5 days healing', results: 'Progressive fading' },
    howItWorks: [
      { step: 1, title: 'Tattoo Assessment', description: 'Dr. Omaima evaluates ink colours, depth, age, and skin tone to estimate the number of sessions required and set realistic expectations.' },
      { step: 2, title: 'Laser Treatment', description: 'Q-switched Nd:YAG laser pulses break ink pigment into tiny particles. Black and dark blue inks respond fastest; greens and yellows take more sessions.' },
      { step: 3, title: 'Immune Clearance', description: 'The body\'s lymphatic system gradually eliminates the fragmented ink particles over 6–8 weeks between sessions.' },
      { step: 4, title: 'Progressive Fading', description: 'Each session delivers further fading. Complete removal depends on ink depth and colours but most tattoos can be significantly lightened or cleared.' },
    ],
    benefits: ['Gradual, safe removal', 'Safe for Indian skin tones', 'Minimal scarring risk', 'Can lighten for cover-up', 'Treats all tattoo colours', 'No permanent marks'],
    faqs: [
      { question: 'How many sessions will I need?', answer: 'Amateur tattoos typically need 4–6 sessions; professional tattoos need 8–12. Black ink responds fastest.' },
      { question: 'Does it hurt?', answer: 'The procedure feels like a rubber band snapping against the skin. Topical numbing cream is applied before treatment.' },
      { question: 'Will it leave a scar?', answer: 'When performed correctly, laser tattoo removal should not scar. Following aftercare instructions is critical.' },
      { question: 'How long between sessions?', answer: 'Sessions are spaced 6–8 weeks apart to allow the immune system to clear broken-down ink and for the skin to fully heal.' },
    ],
    rating: 4.7, reviewCount: 145,
  },
  {
    slug: 'exosomes-face', name: 'Exosomes Face Treatment', category: 'Hair Restoration',
    tagline: 'Next-gen skin & hair regeneration', order: 13,
    description: 'Exosomes are nano-sized vesicles derived from stem cells that carry powerful growth factors, proteins, and genetic signalling molecules. When applied to the skin or scalp, they trigger cellular regeneration, collagen synthesis, and hair follicle activation — representing the cutting edge of regenerative aesthetics.',
    meta: { duration: '45–60 min', sessions: '3–4 sessions', recovery: 'None', results: '4–8 weeks' },
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
    rating: 4.8, reviewCount: 72,
  },
  {
    slug: 'micro-mesotherapy', name: 'Micro-Mesotherapy', category: 'Hair Restoration',
    tagline: 'Micronutrient scalp & skin infusion', order: 14,
    description: 'Micro-mesotherapy delivers a customised cocktail of vitamins, minerals, amino acids, hyaluronic acid, and growth factors directly into the mesoderm (middle layer) of skin or scalp using a series of micro-injections. It nourishes hair follicles, hydrates skin, and stimulates cellular renewal at a targeted depth.',
    meta: { duration: '30–45 min', sessions: '4–6 sessions', recovery: 'None', results: '4–6 weeks' },
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
    rating: 4.7, reviewCount: 98,
  },
  {
    slug: 'cold-laser-therapy', name: 'Cold Laser Therapy (LLLT)', category: 'Hair Restoration',
    tagline: 'Low-level laser for hair & skin', order: 15,
    description: 'Low-Level Laser Therapy (LLLT) uses specific wavelengths of red or near-infrared light to stimulate cellular activity without generating heat. For hair loss, it increases blood flow to hair follicles and stimulates the anagen (growth) phase. For skin, it accelerates wound healing and reduces inflammation.',
    meta: { duration: '20–30 min', sessions: '12–16 sessions', recovery: 'None', results: '3–6 months' },
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
    rating: 4.6, reviewCount: 88,
  },
  {
    slug: 'scalp-micro-pigmentation', name: 'Scalp Micro Pigmentation (SMP)', category: 'Hair Restoration',
    tagline: 'Hair follicle tattoo for density illusion', order: 16,
    description: 'Scalp Micro Pigmentation is a specialised cosmetic tattooing technique that replicates the appearance of shaved hair follicles on the scalp. It creates the illusion of density, fills hairline recessions, and camouflages scars — making it ideal for patients with advanced baldness or alopecia who want an immediate, long-lasting solution.',
    meta: { duration: '3–5 hours / session', sessions: '2–3 sessions', recovery: '5–7 days', results: 'Immediate, lasts 3–5 years' },
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
    rating: 4.7, reviewCount: 62,
  },
  {
    slug: 'lip-enhancement', name: 'Lip Enhancement', category: 'Anti-Ageing',
    tagline: 'Fuller, defined, naturally beautiful lips', order: 17,
    description: 'Lip enhancement using hyaluronic acid fillers adds volume, definition, and symmetry to the lips without an artificial appearance. From subtle hydration to significant augmentation, Dr. Omaima tailors every lip treatment to your facial proportions and personal goals — prioritising a natural, kissable result.',
    meta: { duration: '30–45 min', sessions: '1 session', recovery: '24–48 hrs mild swelling', results: 'Immediate, lasts 9–12 months' },
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
    rating: 4.8, reviewCount: 175,
  },
  {
    slug: 'cheek-enhancement', name: 'Cheek Enhancement', category: 'Anti-Ageing',
    tagline: 'Lift, contour & restore cheek volume', order: 18,
    description: 'Cheek enhancement using dermal fillers restores the mid-face volume lost with ageing, creating a lifted, youthful facial contour. Strategic filler placement in the cheeks also indirectly lifts nasolabial folds and jowls, providing a natural non-surgical facelift effect.',
    meta: { duration: '30–45 min', sessions: '1 session', recovery: '24–48 hrs mild swelling', results: 'Immediate, lasts 12–18 months' },
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
    rating: 4.8, reviewCount: 130,
  },
  {
    slug: 'chin-enhancement', name: 'Chin Enhancement', category: 'Anti-Ageing',
    tagline: 'Define your jawline non-surgically', order: 19,
    description: 'Chin enhancement with dermal fillers projects and defines a weak or recessed chin, improving facial balance and profile. A well-projected chin also makes the jawline appear more defined and the neck slimmer — without surgery, anaesthesia, or significant downtime.',
    meta: { duration: '20–30 min', sessions: '1 session', recovery: '24–48 hrs mild swelling', results: 'Immediate, lasts 12–18 months' },
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
    rating: 4.7, reviewCount: 95,
  },
  {
    slug: 'nose-enhancement', name: 'Non-Surgical Nose Enhancement', category: 'Anti-Ageing',
    tagline: 'Reshape your nose without surgery', order: 20,
    description: 'Non-surgical rhinoplasty uses small amounts of dermal filler to smooth bumps, lift the nasal tip, straighten the nose, or improve symmetry — with immediate results and no surgical risk. It is an excellent option for patients who want to address a specific nasal concern without committing to rhinoplasty surgery.',
    meta: { duration: '20–30 min', sessions: '1 session', recovery: 'None to 24 hrs mild swelling', results: 'Immediate, lasts 9–12 months' },
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
    rating: 4.7, reviewCount: 82,
  },
  {
    slug: 'cryolipolysis', name: 'Cool Shape Cryolipolysis', category: 'Laser & Devices',
    tagline: 'Freeze away stubborn fat non-surgically', order: 21,
    description: 'Cryolipolysis uses controlled cooling to selectively destroy fat cells in targeted areas. Fat cells are more sensitive to cold than surrounding tissue, so the treatment eliminates them while leaving skin and nerves unaffected. The body then gradually eliminates the destroyed fat cells over 4–12 weeks.',
    meta: { duration: '45–60 min / area', sessions: '1–2 sessions per area', recovery: 'None', results: '4–12 weeks' },
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
    rating: 4.7, reviewCount: 118,
  },
  {
    slug: 'hifu', name: 'Ultralift — HIFU', category: 'Anti-Ageing',
    tagline: 'Non-surgical skin lifting & tightening', order: 22,
    description: 'High-Intensity Focused Ultrasound (HIFU) delivers focused ultrasound energy to the SMAS layer — the same layer targeted in surgical facelifts. This triggers collagen contraction and new collagen synthesis, providing a gradual, natural lifting and tightening effect on the face, neck, and brow without surgery.',
    meta: { duration: '60–90 min', sessions: '1 session (annual)', recovery: 'None to mild redness 24 hrs', results: '3–6 months (progressive)' },
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
    rating: 4.8, reviewCount: 156,
  },
  {
    slug: 'bio-re-peel', name: 'Bio Re Peel', category: 'Skin & Glow',
    tagline: 'Advanced no-downtime chemical peel', order: 23,
    description: 'Bio Re Peel is an innovative biostimulating chemical peel that works at the dermal level without surface peeling. Its unique tricholoroacetic acid (TCA) formula combines a keratolytic phase with a biostimulating phase, improving skin texture, tone, pores, and acne scars — with no visible peeling or downtime.',
    meta: { duration: '30 min', sessions: '4–6 sessions', recovery: 'None (no visible peeling)', results: '2–4 weeks' },
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
    rating: 4.8, reviewCount: 93,
  },
  {
    slug: 'intragen', name: 'Intragen Radiofrequency', category: 'Anti-Ageing',
    tagline: 'Deep RF for skin tightening & hair growth', order: 24,
    description: 'Intragen is a professional radiofrequency technology that delivers multi-polar RF energy to heat the deep dermis and stimulate collagen contraction and new synthesis. For the scalp, it improves blood circulation and follicle health. For the face, it tightens skin and reduces fine lines.',
    meta: { duration: '45–60 min', sessions: '4–6 sessions', recovery: 'None', results: '4–8 weeks' },
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
    rating: 4.6, reviewCount: 67,
  },
  {
    slug: 'vanquish', name: 'VANQUISH Body Contouring', category: 'Laser & Devices',
    tagline: 'Contactless fat reduction technology', order: 25,
    description: 'VANQUISH uses selective radiofrequency energy to heat and destroy subcutaneous fat cells without any contact with the body. Its large panel heats a wide area simultaneously, making it ideal for treating the full abdomen or flanks in a single session. It is a comfortable, completely non-invasive fat reduction treatment.',
    meta: { duration: '45 min', sessions: '4–6 sessions', recovery: 'None', results: '4–8 weeks' },
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
    rating: 4.6, reviewCount: 54,
  },
  {
    slug: 'laser-hair', name: 'Laser Hair Reduction', category: 'Laser & Devices',
    tagline: 'Permanent hair reduction', order: 26,
    description: 'Laser hair reduction uses concentrated light energy to target melanin in hair follicles, permanently damaging the follicle\'s ability to regrow hair. Our US-FDA cleared diode laser is calibrated for all skin tones including darker Indian skin types, delivering safe and effective results on the face and body.',
    meta: { duration: '15–60 min (area-dependent)', sessions: '6–8 sessions', recovery: 'None', results: 'Permanent reduction after full course' },
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
      { question: 'Is it painful?', answer: 'Most patients describe a snapping or rubber-band sensation. The built-in cooling tip significantly reduces discomfort.' },
      { question: 'How far apart are sessions?', answer: 'Sessions are spaced 4–6 weeks apart for body areas and 3–4 weeks for the face, aligned with hair growth cycles.' },
    ],
    rating: 4.8, reviewCount: 640, featured: true,
  },
  {
    slug: 'chemical-peel', name: 'Chemical Peel', category: 'Skin & Glow',
    tagline: 'Resurface, renew & brighten', order: 27,
    description: 'Chemical peels use clinically formulated acid solutions to remove damaged outer skin layers, triggering cellular renewal and revealing fresher, brighter skin. From superficial glycolic peels to medium-depth TCA peels, Dr. Omaima selects the right formulation for your skin type, concern, and tolerance.',
    meta: { duration: '30–45 min', sessions: '4–6 sessions', recovery: '3–7 days', results: '1–2 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Assessment', description: 'Dr. Omaima evaluates your skin type, Fitzpatrick scale, current concerns, and contraindications to select the appropriate peel formulation and strength.' },
      { step: 2, title: 'Pre-Peel Prep', description: 'The skin is cleansed and degreased with an acetone or alcohol prep solution to ensure even, controlled acid penetration.' },
      { step: 3, title: 'Peel Application', description: 'The acid solution is applied in controlled layers. Application time is monitored precisely — the peel is neutralised at the optimal point of skin response.' },
      { step: 4, title: 'Neutralisation & Aftercare', description: 'The peel is neutralised with bicarbonate solution, followed by a soothing mask and SPF application. Detailed post-peel home care instructions are provided.' },
    ],
    benefits: ['Brightens dull, uneven skin', 'Reduces acne and congestion', 'Fades pigmentation and dark spots', 'Stimulates collagen synthesis', 'Reduces fine lines and texture', 'Tightens enlarged pores'],
    faqs: [
      { question: 'Is it safe for dark Indian skin?', answer: 'Yes, when the correct peel type and strength are chosen. Dr. Omaima uses peels validated for Fitzpatrick III–V skin. Appropriate pre-peel priming prevents post-inflammatory hyperpigmentation.' },
      { question: 'How much peeling should I expect?', answer: 'Superficial peels cause minimal or no visible peeling. Medium peels cause visible flaking from day 3–7.' },
      { question: 'How many sessions for acne scars?', answer: 'Superficial scars typically need 4–6 sessions. Deeper scars benefit from combination therapy — a peel series combined with microneedling or MNRF for superior results.' },
      { question: 'Can I wear makeup after?', answer: 'Avoid makeup for 24 hours. During the peeling phase, use mineral makeup only if needed. Never manually pick or peel flaking skin.' },
    ],
    rating: 4.7, reviewCount: 224,
  },
  {
    slug: 'microneedling', name: 'Microneedling (MNRF)', category: 'Acne & Scars',
    tagline: 'Collagen induction for scar & skin repair', order: 28,
    description: 'Microneedling with Radiofrequency (MNRF) creates controlled micro-injuries in the dermis using insulated gold-plated needles that simultaneously deliver RF energy at precisely calibrated depths. This triggers intensive collagen and elastin remodelling — the most effective non-surgical treatment for acne scars, enlarged pores, and skin laxity.',
    meta: { duration: '60–75 min', sessions: '3–5 sessions', recovery: '2–3 days redness', results: '4–8 weeks per session' },
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
      { question: 'How many sessions for acne scars?', answer: 'Most patients need 3–5 sessions spaced 4–6 weeks apart.' },
      { question: 'Can it treat active acne?', answer: 'Microneedling should not be performed over active, inflamed acne lesions. We treat active acne first, then follow with microneedling once the skin has stabilised.' },
    ],
    rating: 4.8, reviewCount: 312,
  },
]

// ---------------------------------------------------------------------------
// CONCERNS
// ---------------------------------------------------------------------------

const CONCERNS = [
  {
    slug: 'acne', name: 'Acne & Breakouts', category: 'Skin & Face', order: 1,
    description: 'Acne is a chronic skin condition caused by excess sebum, clogged pores, and bacterial overgrowth. It affects over 85% of people at some point in their lives and can leave lasting scars and emotional impact if not treated early. At Tvak & Asthi, Dr. Omaima addresses acne with a root-cause approach — not just surface-level treatments.',
    tags: ['Active breakouts', 'Whiteheads', 'Blackheads', 'Cystic acne', 'Hormonal acne', 'Back acne'],
    approach: [
      { step: 1, title: 'Diagnosis & Grading', description: 'Dr. Omaima assesses your acne type (comedonal, inflammatory, cystic), grade, and triggers including hormonal, dietary, and lifestyle factors.' },
      { step: 2, title: 'Medical Treatment Plan', description: 'A personalised combination of in-clinic procedures and prescription topicals is designed. Oral medications are prescribed where needed.' },
      { step: 3, title: 'In-Clinic Procedures', description: 'Chemical peels, blue light therapy, and comedone extraction are used to clear active breakouts and reduce sebum production.' },
      { step: 4, title: 'Long-Term Control', description: 'A maintenance protocol prevents relapse. Trigger identification ensures acne stays controlled even after the treatment course.' },
    ],
    treatmentSlugs: ['acne-clearance', 'carbon-laser-facial', 'hydrafacial-md'],
  },
  {
    slug: 'acne-scars', name: 'Acne Scars', category: 'Skin & Face', order: 2,
    description: 'Acne scars form when inflamed acne lesions damage the dermis, causing either depressed (atrophic) or raised (hypertrophic) scars. Atrophic scars — including ice-pick, boxcar, and rolling types — are the most common in Indian skin and require specialised collagen-stimulating treatments to correct.',
    tags: ['Ice-pick scars', 'Boxcar scars', 'Rolling scars', 'Pitted skin', 'Post-acne marks', 'Uneven texture'],
    approach: [
      { step: 1, title: 'Scar Type Assessment', description: 'Dr. Omaima classifies your scar types and depth using the ECCA grading scale to design the most effective treatment combination.' },
      { step: 2, title: 'Collagen Remodelling', description: 'MNRF (Microneedling Radiofrequency) is used to deliver precise RF energy deep into the dermis, stimulating collagen production without surface damage.' },
      { step: 3, title: 'Surface Resurfacing', description: 'Fractional laser or chemical peels address superficial texture irregularities and post-inflammatory pigmentation.' },
      { step: 4, title: 'Combination Protocol', description: 'Depending on scar depth and type, a combination of MNRF, subcision, and TCA cross is used for comprehensive correction.' },
    ],
    treatmentSlugs: ['acne-scar-mnrf', 'carbon-laser-facial', 'hydrafacial-md'],
  },
  {
    slug: 'pigmentation', name: 'Pigmentation & Melasma', category: 'Skin & Face', order: 3,
    description: 'Pigmentation disorders including melasma, post-inflammatory hyperpigmentation (PIH), and sunspots affect a majority of Indian women and men. These conditions worsen with unprotected sun exposure and require a multi-modal approach combining laser treatments, peels, and strict photoprotection.',
    tags: ['Melasma', 'Dark patches', 'Sunspots', 'Post-acne marks', 'Uneven skin tone', 'Hyperpigmentation'],
    approach: [
      { step: 1, title: 'Pigmentation Mapping', description: 'A Wood\'s lamp examination and clinical assessment determines whether pigmentation is epidermal, dermal, or mixed — each requiring different treatment approaches.' },
      { step: 2, title: 'Laser Toning', description: 'Low-fluence Q-switched Nd:YAG laser breaks up melanin deposits without creating heat damage to surrounding skin — critical for darker Indian skin tones.' },
      { step: 3, title: 'Chemical Peels', description: 'Kojic acid, modified Jessner, or glycolic acid peels are used to accelerate cell turnover and fade pigmentation between laser sessions.' },
      { step: 4, title: 'Prescription Home Care', description: 'Prescription-strength depigmenting agents (hydroquinone-free where preferred) and broad-spectrum SPF 50 form the essential maintenance routine.' },
    ],
    treatmentSlugs: ['melasma', 'carbon-laser-facial', 'hydrafacial-md'],
  },
  {
    slug: 'dull-skin', name: 'Dull & Dry Skin', category: 'Skin & Face', order: 4,
    description: 'Dull skin lacks the luminosity and radiance of healthy skin due to dead cell buildup, dehydration, poor circulation, and environmental stressors. With the right combination of exfoliation, hydration, and antioxidant infusion, skin can regain its natural glow rapidly.',
    tags: ['Lack of glow', 'Rough texture', 'Dehydration', 'Uneven radiance', 'Tired-looking skin'],
    approach: [
      { step: 1, title: 'Skin Barrier Assessment', description: 'Dr. Omaima evaluates skin hydration levels, barrier integrity, and identifies dehydration vs. dryness (different conditions requiring different approaches).' },
      { step: 2, title: 'Deep Exfoliation', description: 'Dead cell buildup is cleared using enzymatic or chemical exfoliation to immediately reveal brighter skin beneath.' },
      { step: 3, title: 'Hydration Infusion', description: 'Hyaluronic acid and growth factor serums are infused into the skin to restore deep hydration and plumpness.' },
      { step: 4, title: 'Antioxidant Treatment', description: 'Vitamin C and antioxidant infusions brighten the complexion and protect against further environmental damage.' },
    ],
    treatmentSlugs: ['hydrafacial-md', 'carbon-laser-facial'],
  },
  {
    slug: 'pores', name: 'Pores & Texture', category: 'Skin & Face', order: 5,
    description: 'Enlarged pores and rough skin texture are common concerns in oily and combination skin types. They are caused by excess sebum, reduced collagen, and sun damage stretching pore walls. Targeted treatments can significantly tighten pores and smooth skin texture.',
    tags: ['Large pores', 'Rough texture', 'Oily skin', 'Orange-peel skin', 'Blackheads'],
    approach: [
      { step: 1, title: 'Pore Analysis', description: 'The cause of enlarged pores (sebum overproduction vs. collagen loss vs. sun damage) is identified to select the most effective treatment.' },
      { step: 2, title: 'Oil Regulation', description: 'Carbon laser and salicylic acid peels reduce sebum production and physically clear pore blockages.' },
      { step: 3, title: 'Collagen Stimulation', description: 'MNRF tightens pore walls by stimulating new collagen in the dermis surrounding each follicle.' },
      { step: 4, title: 'Maintenance', description: 'A retinoid-based home care routine maintains results and prevents sebum buildup between sessions.' },
    ],
    treatmentSlugs: ['carbon-laser-facial', 'hydrafacial-md', 'acne-scar-mnrf'],
  },
  {
    slug: 'hair-fall', name: 'Hair Fall & Thinning', category: 'Hair & Scalp', order: 6,
    description: 'Hair fall affecting more than 100 strands per day, or visible thinning of the hairline and crown, signals a medical condition that needs assessment. Androgenetic alopecia, stress-induced telogen effluvium, and nutritional deficiencies are the most common causes — each treatable with the right approach.',
    tags: ['Excessive hair fall', 'Thinning crown', 'Receding hairline', 'Postpartum hair loss', 'Diffuse thinning'],
    approach: [
      { step: 1, title: 'Trichoscopy & Blood Work', description: 'Dr. Omaima performs trichoscopy (scalp magnification) and orders relevant blood tests to identify the root cause of hair loss.' },
      { step: 2, title: 'Medical Management', description: 'Oral and topical medications (minoxidil, nutritional supplements) are prescribed to stabilise hair loss and support regrowth.' },
      { step: 3, title: 'Growth Factor Therapy', description: 'PRP or GFC injections into the scalp deliver concentrated growth factors directly to dormant follicles to stimulate reactivation.' },
      { step: 4, title: 'Scalp Health', description: 'Scalp treatments address dandruff, seborrhoea, or inflammation that may be contributing to hair loss.' },
    ],
    treatmentSlugs: ['gfc-hair', 'prp-hair'],
  },
  {
    slug: 'dandruff', name: 'Dandruff & Scalp Issues', category: 'Hair & Scalp', order: 7,
    description: 'Dandruff, seborrhoeic dermatitis, and scalp psoriasis cause flaking, itching, and inflammation that can accelerate hair loss if untreated. Medical-grade scalp treatments target the fungal and inflammatory triggers to restore a healthy scalp environment.',
    tags: ['Dandruff', 'Scalp itch', 'Flaking', 'Seborrhoeic dermatitis', 'Scalp inflammation'],
    approach: [
      { step: 1, title: 'Scalp Examination', description: 'Trichoscopy identifies whether the condition is dandruff, seborrhoeic dermatitis, or psoriasis — each requiring different treatment.' },
      { step: 2, title: 'Medical Scalp Treatment', description: 'Prescription-grade anti-fungal and anti-inflammatory scalp treatments are applied in-clinic for immediate relief.' },
      { step: 3, title: 'Home Regime', description: 'A medicated shampoo and scalp serum regime is prescribed to maintain results and prevent recurrence.' },
      { step: 4, title: 'Dietary Guidance', description: 'Dietary triggers including sugar, dairy, and processed foods are identified and managed to reduce seborrhoeic flare-ups.' },
    ],
    treatmentSlugs: ['prp-hair', 'gfc-hair'],
  },
  {
    slug: 'hair-regrowth', name: 'Hair Regrowth', category: 'Hair & Scalp', order: 8,
    description: 'For patients who have experienced hair loss and want to regrow hair in thinning areas, growth factor therapies combined with medical management offer the most effective results. Early intervention gives the best outcomes as follicles become permanently dormant over time.',
    tags: ['Regrow thinning areas', 'Crown density', 'Hairline restoration', 'Post-treatment regrowth'],
    approach: [
      { step: 1, title: 'Follicle Viability Assessment', description: 'Trichoscopy determines whether follicles in thinning areas are still active (miniaturised) or permanently dormant, setting realistic expectations.' },
      { step: 2, title: 'GFC / PRP Therapy', description: 'Growth factor therapies stimulate miniaturised follicles to produce thicker, longer hair through repeated treatment cycles.' },
      { step: 3, title: 'Oral Minoxidil Protocol', description: 'Low-dose oral minoxidil (prescribed by Dr. Omaima) significantly enhances regrowth results when combined with in-clinic treatment.' },
      { step: 4, title: 'Progress Monitoring', description: 'Standardised photographs and trichoscopy at each session track improvement objectively.' },
    ],
    treatmentSlugs: ['gfc-hair', 'prp-hair'],
  },
  {
    slug: 'unwanted-hair', name: 'Unwanted Body Hair', category: 'Hair & Scalp', order: 9,
    description: 'Unwanted hair on the face, underarms, legs, bikini area, or back can be permanently reduced with diode laser technology. Our laser is calibrated for Indian skin tones, making it safe and effective for Fitzpatrick III–V skin types.',
    tags: ['Facial hair', 'Underarms', 'Legs', 'Bikini area', 'Back and chest', 'Ingrown hairs'],
    approach: [
      { step: 1, title: 'Consultation & Skin Assessment', description: 'Dr. Omaima assesses your skin type, hair colour, and density to calibrate the laser parameters for safe and effective treatment.' },
      { step: 2, title: 'Patch Test', description: 'A patch test is performed 24–48 hours before the first full session to confirm skin tolerance.' },
      { step: 3, title: 'Laser Sessions', description: 'The treatment area is shaved and the diode laser is applied in a grid pattern. A built-in cooling system protects the skin throughout.' },
      { step: 4, title: 'Course Completion', description: '6–8 sessions spaced 4–6 weeks apart are required to catch hair in all growth phases for maximum permanent reduction.' },
    ],
    treatmentSlugs: ['laser-hair'],
  },
  {
    slug: 'wrinkles', name: 'Wrinkles & Fine Lines', category: 'Anti-Ageing', order: 10,
    description: 'Wrinkles and fine lines develop from repeated facial muscle movements, loss of collagen, and reduced skin elasticity. Dynamic wrinkles (expression lines) respond to Botox, while static wrinkles and skin laxity are best addressed with skin boosters and collagen-stimulating treatments.',
    tags: ['Forehead lines', 'Frown lines (11s)', 'Crow\'s feet', 'Smile lines', 'Lip lines', 'Neck lines'],
    approach: [
      { step: 1, title: 'Wrinkle Classification', description: 'Dr. Omaima distinguishes between dynamic wrinkles (caused by muscle movement) and static wrinkles (present at rest) as each requires a different treatment approach.' },
      { step: 2, title: 'Botulinum Toxin', description: 'Anti-wrinkle injections relax the muscles causing dynamic expression lines, smoothing the overlying skin without affecting natural expressions.' },
      { step: 3, title: 'Skin Boosters', description: 'Hyaluronic acid skin boosters are injected into the dermis to deeply hydrate and plump the skin, reducing the appearance of fine lines.' },
      { step: 4, title: 'Maintenance', description: 'Botox treatments are maintained every 4–6 months. A prescription retinoid routine slows new wrinkle formation.' },
    ],
    treatmentSlugs: ['botox', 'fillers'],
  },
  {
    slug: 'sagging', name: 'Sagging & Laxity', category: 'Anti-Ageing', order: 11,
    description: 'Skin laxity and sagging result from collagen breakdown, loss of facial fat, and gravitational changes over time. Non-surgical skin tightening treatments can lift and firm the skin, delaying the need for surgical intervention.',
    tags: ['Jowls', 'Loose neck skin', 'Sagging cheeks', 'Nasolabial folds', 'Drooping brows'],
    approach: [
      { step: 1, title: 'Laxity Assessment', description: 'Dr. Omaima assesses the degree of laxity, facial fat compartment changes, and bone structure to design the most effective non-surgical lifting plan.' },
      { step: 2, title: 'Volume Restoration', description: 'Strategic filler placement in the cheeks, temples, and jawline restores facial scaffolding, providing a natural lifting effect.' },
      { step: 3, title: 'Skin Tightening', description: 'MNRF or radiofrequency microneedling tightens loose skin by stimulating new collagen and elastin in the deeper dermal layers.' },
      { step: 4, title: 'Maintenance', description: 'Annual filler touch-ups and 6-monthly RF treatments maintain the lifting result over time.' },
    ],
    treatmentSlugs: ['fillers', 'acne-scar-mnrf'],
  },
  {
    slug: 'volume-loss', name: 'Volume Loss', category: 'Anti-Ageing', order: 12,
    description: 'Facial volume loss creates a gaunt, tired, or aged appearance — affecting the cheeks, temples, under-eyes, and lips. Hyaluronic acid fillers, when placed correctly, restore youthful facial contours without an overdone appearance.',
    tags: ['Hollow cheeks', 'Sunken temples', 'Under-eye hollows', 'Thin lips', 'Lost facial structure'],
    approach: [
      { step: 1, title: 'Facial Analysis', description: 'Dr. Omaima uses a facial thirds and proportions analysis to identify exactly where volume loss is creating an aged appearance.' },
      { step: 2, title: 'Treatment Planning', description: 'A bespoke treatment plan is designed — usually starting with the cheeks (mid-face) as restoring this structure lifts the lower face naturally.' },
      { step: 3, title: 'Filler Placement', description: 'Premium FDA-approved hyaluronic acid fillers are placed at the correct anatomical planes using advanced injection techniques.' },
      { step: 4, title: 'Review & Refinement', description: 'A 4-week review ensures symmetry and natural result. Refinements are made as needed at no extra cost.' },
    ],
    treatmentSlugs: ['fillers', 'botox'],
  },
  {
    slug: 'dark-circles', name: 'Dark Circles & Eye Area', category: 'Anti-Ageing', order: 13,
    description: 'Dark circles under the eyes can be caused by volume loss creating hollows (tear trough deformity), pigmentation, thin skin showing underlying vasculature, or a combination of all three. Treatment must address the correct underlying cause to be effective.',
    tags: ['Dark circles', 'Hollow under-eyes', 'Eye bags', 'Tired appearance', 'Tear trough hollows'],
    approach: [
      { step: 1, title: 'Cause Identification', description: 'Dr. Omaima identifies whether dark circles are due to hollow tear troughs, pigmentation, or visible blood vessels — each requiring a different approach.' },
      { step: 2, title: 'Tear Trough Fillers', description: 'For hollow under-eyes, a small amount of soft hyaluronic acid filler is placed in the tear trough using a cannula for safety and precision.' },
      { step: 3, title: 'Pigmentation Treatment', description: 'For pigment-based dark circles, Q-switched laser and skin-lightening prescriptions are used.' },
      { step: 4, title: 'Skincare Support', description: 'Topical vitamin C, retinol, and peptide eye creams are prescribed to support and maintain results.' },
    ],
    treatmentSlugs: ['fillers', 'melasma'],
  },
  {
    slug: 'rosacea', name: 'Rosacea', category: 'Skin & Face', order: 14,
    description: 'Rosacea is a chronic inflammatory skin condition causing persistent redness, visible blood vessels, and acne-like bumps on the face. It predominantly affects fair-skinned individuals and is often triggered by sun exposure, heat, spicy food, and stress. With the right medical management and laser treatment, rosacea can be well-controlled.',
    tags: ['Facial redness', 'Flushing', 'Visible blood vessels', 'Acne-like bumps', 'Sensitive skin', 'Broken capillaries'],
    approach: [
      { step: 1, title: 'Rosacea Assessment', description: 'Dr. Omaima identifies your rosacea subtype (erythematotelangiectatic, papulopustular, or phymatous) as each requires a different treatment approach.' },
      { step: 2, title: 'Trigger Identification', description: 'Common triggers including sun exposure, heat, alcohol, spicy foods, and skincare products are identified and managed through lifestyle advice.' },
      { step: 3, title: 'Laser & Light Therapy', description: 'Vascular lasers target broken capillaries and visible blood vessels, reducing persistent redness and flushing significantly.' },
      { step: 4, title: 'Medical Management', description: 'Topical and oral prescription medications reduce inflammation and control papulopustular rosacea during flare-ups.' },
    ],
    treatmentSlugs: ['carbon-laser-facial', 'hydrafacial-md'],
  },
  {
    slug: 'sensitive-skin', name: 'Sensitive Skin', category: 'Skin & Face', order: 15,
    description: 'Sensitive skin is characterised by a weakened skin barrier that reacts easily to environmental triggers, products, and temperature changes. Symptoms include redness, stinging, burning, tightness, and frequent flushing. Strengthening the skin barrier with medical-grade treatments can significantly reduce sensitivity over time.',
    tags: ['Easily irritated skin', 'Redness', 'Stinging', 'Burning', 'Tight skin', 'Reaction-prone'],
    approach: [
      { step: 1, title: 'Barrier Assessment', description: 'Dr. Omaima evaluates the integrity of your skin barrier, identifies triggers, and rules out underlying conditions such as rosacea or eczema.' },
      { step: 2, title: 'Barrier Repair', description: 'Gentle treatments using ceramide-rich and barrier-repairing serums restore the skin\'s protective function and reduce reactivity.' },
      { step: 3, title: 'Calming Procedures', description: 'HydraFacial and gentle chemical exfoliation using lactic acid improve skin texture without triggering sensitivity reactions.' },
      { step: 4, title: 'Personalised Home Regime', description: 'A minimal, fragrance-free skincare routine is designed to strengthen the skin barrier and prevent future sensitisation.' },
    ],
    treatmentSlugs: ['hydrafacial-md', 'carbon-laser-facial'],
  },
  {
    slug: 'moles', name: 'Moles', category: 'Skin & Face', order: 16,
    description: 'Moles are common pigmented skin growths that can be flat or raised, singular or multiple. While most moles are benign, some may change in appearance over time. At Tvak & Asthi, Dr. Omaima assesses and monitors moles, and can advise on removal options for cosmetic or medical reasons.',
    tags: ['Pigmented moles', 'Raised moles', 'Flat moles', 'Atypical moles', 'Cosmetic removal'],
    approach: [
      { step: 1, title: 'Dermoscopic Examination', description: 'Dr. Omaima performs a thorough clinical examination to classify moles and assess whether any require biopsy or referral.' },
      { step: 2, title: 'Risk Assessment', description: 'Moles showing the ABCDE signs (Asymmetry, Border, Colour, Diameter, Evolution) are assessed carefully and referred if needed.' },
      { step: 3, title: 'Cosmetic Removal', description: 'Benign moles causing cosmetic concern can be removed using radiofrequency ablation or laser, leaving minimal scarring.' },
      { step: 4, title: 'Post-removal Care', description: 'Scar management and sun protection are advised post-procedure to ensure the best cosmetic outcome.' },
    ],
    treatmentSlugs: ['carbon-laser-facial', 'melasma'],
  },
  {
    slug: 'fungal-infections', name: 'Fungal Infections', category: 'Skin & Face', order: 17,
    description: 'Fungal skin infections including ringworm, tinea versicolor, athlete\'s foot, and nail fungus are common in India\'s warm, humid climate. They present as scaly, itchy, discoloured patches. Medical dermatology treatment with prescription antifungals clears infections effectively and prevents recurrence.',
    tags: ['Ringworm', 'Tinea versicolor', 'Athlete\'s foot', 'Nail fungus', 'Itchy patches', 'Discolouration'],
    approach: [
      { step: 1, title: 'Clinical Diagnosis', description: 'Dr. Omaima confirms the fungal species and infection extent through clinical examination and, where needed, a skin scraping for microscopy.' },
      { step: 2, title: 'Prescription Antifungals', description: 'Oral antifungal medications (fluconazole, itraconazole) combined with topical antifungal creams deliver rapid and complete clearance.' },
      { step: 3, title: 'Lifestyle Guidance', description: 'Hygiene practices, clothing choices, and environmental factors contributing to recurrent infections are identified and managed.' },
      { step: 4, title: 'Maintenance', description: 'A maintenance plan prevents relapse, particularly for chronic nail fungus or recurrent tinea versicolor.' },
    ],
    treatmentSlugs: ['hydrafacial-md'],
  },
  {
    slug: 'skin-allergies', name: 'Skin Allergies', category: 'Skin & Face', order: 18,
    description: 'Skin allergies including contact dermatitis, urticaria (hives), and atopic eczema cause redness, itching, swelling, and rashes. They are triggered by food, medications, environmental allergens, or direct contact with irritants. Medical management with antihistamines and topical steroids provides relief while allergen identification prevents recurrence.',
    tags: ['Contact dermatitis', 'Hives', 'Eczema', 'Itchy rash', 'Skin swelling', 'Allergen reactions'],
    approach: [
      { step: 1, title: 'Allergen Identification', description: 'A detailed history and patch testing identify the specific triggers — whether food, cosmetic ingredients, metals, or environmental allergens.' },
      { step: 2, title: 'Immediate Relief', description: 'Antihistamines, topical corticosteroids, and calamine formulations rapidly reduce itching, swelling, and redness during acute flare-ups.' },
      { step: 3, title: 'Barrier Repair', description: 'Gentle barrier-repairing moisturisers reduce skin reactivity and prevent future allergic responses.' },
      { step: 4, title: 'Trigger Avoidance Plan', description: 'Dr. Omaima designs a practical trigger avoidance strategy tailored to your lifestyle to minimise future reactions.' },
    ],
    treatmentSlugs: ['hydrafacial-md'],
  },
  {
    slug: 'vitiligo', name: 'Vitiligo / Leucoderma', category: 'Skin & Face', order: 19,
    description: 'Vitiligo is an autoimmune condition causing progressive depigmentation of the skin in patches. It affects all skin tones but is more visible and emotionally distressing in darker Indian skin. Medical treatment can halt progression and restore pigment in many cases, especially when started early.',
    tags: ['Depigmented patches', 'White patches', 'Autoimmune skin condition', 'Leucoderma', 'Pigment loss'],
    approach: [
      { step: 1, title: 'Assessment & Staging', description: 'Dr. Omaima assesses the extent, activity, and duration of vitiligo to determine whether it is stable (suitable for surgical restoration) or active (requiring medical stabilisation first).' },
      { step: 2, title: 'Medical Stabilisation', description: 'Topical immunomodulators, oral immunosuppressants, and narrow-band UVB phototherapy halt the autoimmune attack on melanocytes.' },
      { step: 3, title: 'Repigmentation', description: 'Once stable, repigmentation is accelerated with targeted phototherapy, topical prostaglandins, and micro-needling into depigmented patches.' },
      { step: 4, title: 'Surgical Restoration', description: 'For stable, refractory vitiligo, surgical melanocyte transfer or suction blister grafting can restore pigment in resistant patches.' },
    ],
    treatmentSlugs: ['melasma'],
  },
  {
    slug: 'body-contouring', name: 'Body Contouring & Unwanted Fat', category: 'Skin & Face', order: 20,
    description: 'Non-surgical body contouring treatments target stubborn fat deposits that are resistant to diet and exercise. Modern technology allows targeted fat reduction and skin tightening without surgery, downtime, or anaesthesia — ideal for areas like the abdomen, flanks, thighs, and double chin.',
    tags: ['Stubborn fat', 'Love handles', 'Double chin', 'Belly fat', 'Skin laxity', 'Non-surgical slimming'],
    approach: [
      { step: 1, title: 'Body Analysis', description: 'Dr. Omaima performs a body composition assessment and identifies target areas where fat deposits are resistant to lifestyle interventions.' },
      { step: 2, title: 'Cryolipolysis', description: 'Controlled cooling destroys fat cells in targeted areas without damaging surrounding tissue. Results develop over 4–12 weeks as the body eliminates destroyed fat cells.' },
      { step: 3, title: 'HIFU / Radiofrequency', description: 'High-intensity focused ultrasound tightens skin laxity that may accompany fat loss, providing a smoother contoured result.' },
      { step: 4, title: 'Maintenance', description: 'A healthy diet and exercise plan is advised alongside treatment to maintain and enhance results long-term.' },
    ],
    treatmentSlugs: ['cryolipolysis', 'vanquish', 'hifu'],
  },
]

// ---------------------------------------------------------------------------
// Helpers to build Sanity document structure
// ---------------------------------------------------------------------------

function buildTreatmentDoc(t) {
  const doc = {
    _id: `treatment-${t.slug}`,
    _type: 'treatment',
    name: t.name,
    slug: { _type: 'slug', current: t.slug },
    category: t.category,
    tagline: t.tagline,
    description: t.description,
    meta: t.meta,
    howItWorks: t.howItWorks?.map((s, i) => ({ _key: k('hiw', i), step: s.step, title: s.title, description: s.description })) ?? [],
    benefits: t.benefits ?? [],
    faqs: t.faqs?.map((f, i) => ({ _key: k('faq', i), question: f.question, answer: f.answer })) ?? [],
    rating: t.rating,
    reviewCount: t.reviewCount,
    order: t.order,
  }
  if (t.about) doc.about = t.about
  if (t.idealCandidate) doc.idealCandidate = t.idealCandidate
  if (t.preparation) doc.preparation = t.preparation
  if (t.aftercare) doc.aftercare = t.aftercare
  if (t.risks) doc.risks = t.risks
  if (t.preventionTips) doc.preventionTips = t.preventionTips
  if (t.featured) doc.featured = t.featured
  return doc
}

function buildConcernDoc(c) {
  return {
    _id: `concern-${c.slug}`,
    _type: 'concern',
    name: c.name,
    slug: { _type: 'slug', current: c.slug },
    category: c.category,
    description: c.description,
    tags: c.tags ?? [],
    approach: c.approach?.map((s, i) => ({ _key: k('step', i), step: s.step, title: s.title, description: s.description })) ?? [],
    treatments: (c.treatmentSlugs ?? []).map((slug, i) => ({
      _key: k('tref', i),
      _type: 'reference',
      _ref: `treatment-${slug}`,
    })),
    order: c.order,
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed() {
  if (!client.config().token) {
    console.error('❌  SANITY_API_TOKEN is not set. Run with: node --env-file=.env.local scripts/seed-sanity.mjs')
    process.exit(1)
  }

  console.log('🌱 Seeding treatments…')
  for (const t of TREATMENTS) {
    await client.createOrReplace(buildTreatmentDoc(t))
    process.stdout.write(`  ✓ ${t.name} (${t.slug})\n`)
  }

  console.log('\n🌱 Seeding concerns…')
  for (const c of CONCERNS) {
    await client.createOrReplace(buildConcernDoc(c))
    process.stdout.write(`  ✓ ${c.name} (${c.slug})\n`)
  }

  console.log('\n✅  Done — check your Sanity Studio!')
}

seed().catch(err => {
  console.error('❌  Seed failed:', err.message)
  process.exit(1)
})
