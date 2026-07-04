import Image from 'next/image'
import Link from 'next/link'
import { fetchConcern, fetchConcerns, urlFor } from '@/sanity/client'

export const revalidate = 10

export async function generateStaticParams() {
  const base = [
    'acne','acne-scars','pigmentation','dull-skin','pores',
    'hair-fall','dandruff','hair-regrowth','unwanted-hair',
    'wrinkles','sagging','volume-loss','dark-circles',
    'rosacea','sensitive-skin','moles','fungal-infections',
    'skin-allergies','vitiligo','body-contouring',
  ].map(slug => ({ slug }))
  try {
    const concerns = await fetchConcerns()
    const extra = concerns
      .map(c => c.slug?.current)
      .filter(s => s && !base.some(b => b.slug === s))
      .map(slug => ({ slug }))
    return [...base, ...extra]
  } catch {
    return base
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const c = await fetchConcern(slug).catch(() => null)
  const fallback = FALLBACK_CONCERNS[slug]
  const metaConcern = c || fallback
  return {
    title: metaConcern ? `${metaConcern.name} Treatment in Noida — Tvak & Asthi` : 'Concern — Tvak & Asthi',
    description: metaConcern?.description?.slice(0, 155) || 'Doctor-led skin, hair, and aesthetic concern treatment at Tvak & Asthi by Artham.',
  }
}

const FALLBACK_CONCERNS = {
  'acne': {
    name: 'Acne & Breakouts', category: 'Skin & Face',
    description: 'Acne is a chronic skin condition caused by excess sebum, clogged pores, and bacterial overgrowth. It affects over 85% of people at some point in their lives and can leave lasting scars and emotional impact if not treated early. At Tvak & Asthi, Dr. Omaima addresses acne with a root-cause approach — not just surface-level treatments.',
    tags: ['Active breakouts', 'Whiteheads', 'Blackheads', 'Cystic acne', 'Hormonal acne', 'Back acne'],
    approach: [
      { step: 1, title: 'Diagnosis & Grading', description: 'Dr. Omaima assesses your acne type (comedonal, inflammatory, cystic), grade, and triggers including hormonal, dietary, and lifestyle factors.' },
      { step: 2, title: 'Medical Treatment Plan', description: 'A personalised combination of in-clinic procedures and prescription topicals is designed. Oral medications are prescribed where needed.' },
      { step: 3, title: 'In-Clinic Procedures', description: 'Chemical peels, blue light therapy, and comedone extraction are used to clear active breakouts and reduce sebum production.' },
      { step: 4, title: 'Long-Term Control', description: 'A maintenance protocol prevents relapse. Trigger identification ensures acne stays controlled even after the treatment course.' },
    ],
    treatments: [
      { name: 'Acne Clearance Program', slug: { current: 'acne-clearance' }, rating: 4.9, reviewCount: 930 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'acne-scars': {
    name: 'Acne Scars', category: 'Skin & Face',
    description: 'Acne scars form when inflamed acne lesions damage the dermis, causing either depressed (atrophic) or raised (hypertrophic) scars. Atrophic scars — including ice-pick, boxcar, and rolling types — are the most common in Indian skin and require specialised collagen-stimulating treatments to correct.',
    tags: ['Ice-pick scars', 'Boxcar scars', 'Rolling scars', 'Pitted skin', 'Post-acne marks', 'Uneven texture'],
    approach: [
      { step: 1, title: 'Scar Type Assessment', description: 'Dr. Omaima classifies your scar types and depth using the ECCA grading scale to design the most effective treatment combination.' },
      { step: 2, title: 'Collagen Remodelling', description: 'MNRF (Microneedling Radiofrequency) is used to deliver precise RF energy deep into the dermis, stimulating collagen production without surface damage.' },
      { step: 3, title: 'Surface Resurfacing', description: 'Fractional laser or chemical peels address superficial texture irregularities and post-inflammatory pigmentation.' },
      { step: 4, title: 'Combination Protocol', description: 'Depending on scar depth and type, a combination of MNRF, subcision, and TCA cross is used for comprehensive correction.' },
    ],
    treatments: [
      { name: 'Acne Scar Revision — MNRF', slug: { current: 'acne-scar-mnrf' }, rating: 4.8, reviewCount: 540 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'pigmentation': {
    name: 'Pigmentation & Melasma', category: 'Skin & Face',
    description: 'Pigmentation disorders including melasma, post-inflammatory hyperpigmentation (PIH), and sunspots affect a majority of Indian women and men. These conditions worsen with unprotected sun exposure and require a multi-modal approach combining laser treatments, peels, and strict photoprotection.',
    tags: ['Melasma', 'Dark patches', 'Sunspots', 'Post-acne marks', 'Uneven skin tone', 'Hyperpigmentation'],
    approach: [
      { step: 1, title: 'Pigmentation Mapping', description: 'A Wood\'s lamp examination and clinical assessment determines whether pigmentation is epidermal, dermal, or mixed — each requiring different treatment approaches.' },
      { step: 2, title: 'Laser Toning', description: 'Low-fluence Q-switched Nd:YAG laser breaks up melanin deposits without creating heat damage to surrounding skin — critical for darker Indian skin tones.' },
      { step: 3, title: 'Chemical Peels', description: 'Kojic acid, modified Jessner, or glycolic acid peels are used to accelerate cell turnover and fade pigmentation between laser sessions.' },
      { step: 4, title: 'Prescription Home Care', description: 'Prescription-strength depigmenting agents (hydroquinone-free where preferred) and broad-spectrum SPF 50 form the essential maintenance routine.' },
    ],
    treatments: [
      { name: 'Melasma Treatment', slug: { current: 'melasma' }, rating: 4.8, reviewCount: 290 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'dull-skin': {
    name: 'Dull & Dry Skin', category: 'Skin & Face',
    description: 'Dull skin lacks the luminosity and radiance of healthy skin due to dead cell buildup, dehydration, poor circulation, and environmental stressors. With the right combination of exfoliation, hydration, and antioxidant infusion, skin can regain its natural glow rapidly.',
    tags: ['Lack of glow', 'Rough texture', 'Dehydration', 'Uneven radiance', 'Tired-looking skin'],
    approach: [
      { step: 1, title: 'Skin Barrier Assessment', description: 'Dr. Omaima evaluates skin hydration levels, barrier integrity, and identifies dehydration vs. dryness (different conditions requiring different approaches).' },
      { step: 2, title: 'Deep Exfoliation', description: 'Dead cell buildup is cleared using enzymatic or chemical exfoliation to immediately reveal brighter skin beneath.' },
      { step: 3, title: 'Hydration Infusion', description: 'Hyaluronic acid and growth factor serums are infused into the skin to restore deep hydration and plumpness.' },
      { step: 4, title: 'Antioxidant Treatment', description: 'Vitamin C and antioxidant infusions brighten the complexion and protect against further environmental damage.' },
    ],
    treatments: [
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
    ],
  },
  'pores': {
    name: 'Pores & Texture', category: 'Skin & Face',
    description: 'Enlarged pores and rough skin texture are common concerns in oily and combination skin types. They are caused by excess sebum, reduced collagen, and sun damage stretching pore walls. Targeted treatments can significantly tighten pores and smooth skin texture.',
    tags: ['Large pores', 'Rough texture', 'Oily skin', 'Orange-peel skin', 'Blackheads'],
    approach: [
      { step: 1, title: 'Pore Analysis', description: 'The cause of enlarged pores (sebum overproduction vs. collagen loss vs. sun damage) is identified to select the most effective treatment.' },
      { step: 2, title: 'Oil Regulation', description: 'Carbon laser and salicylic acid peels reduce sebum production and physically clear pore blockages.' },
      { step: 3, title: 'Collagen Stimulation', description: 'MNRF tightens pore walls by stimulating new collagen in the dermis surrounding each follicle.' },
      { step: 4, title: 'Maintenance', description: 'A retinoid-based home care routine maintains results and prevents sebum buildup between sessions.' },
    ],
    treatments: [
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
      { name: 'Acne Scar Revision — MNRF', slug: { current: 'acne-scar-mnrf' }, rating: 4.8, reviewCount: 540 },
    ],
  },
  'hair-fall': {
    name: 'Hair Fall & Thinning', category: 'Hair & Scalp',
    description: 'Hair fall affecting more than 100 strands per day, or visible thinning of the hairline and crown, signals a medical condition that needs assessment. Androgenetic alopecia, stress-induced telogen effluvium, and nutritional deficiencies are the most common causes — each treatable with the right approach.',
    tags: ['Excessive hair fall', 'Thinning crown', 'Receding hairline', 'Postpartum hair loss', 'Diffuse thinning'],
    approach: [
      { step: 1, title: 'Trichoscopy & Blood Work', description: 'Dr. Omaima performs trichoscopy (scalp magnification) and orders relevant blood tests to identify the root cause of hair loss.' },
      { step: 2, title: 'Medical Management', description: 'Oral and topical medications (minoxidil, nutritional supplements) are prescribed to stabilise hair loss and support regrowth.' },
      { step: 3, title: 'Growth Factor Therapy', description: 'PRP or GFC injections into the scalp deliver concentrated growth factors directly to dormant follicles to stimulate reactivation.' },
      { step: 4, title: 'Scalp Health', description: 'Scalp treatments address dandruff, seborrhoea, or inflammation that may be contributing to hair loss.' },
    ],
    treatments: [
      { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, rating: 4.9, reviewCount: 180 },
      { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, rating: 4.8, reviewCount: 460 },
    ],
  },
  'dandruff': {
    name: 'Dandruff & Scalp Issues', category: 'Hair & Scalp',
    description: 'Dandruff, seborrhoeic dermatitis, and scalp psoriasis cause flaking, itching, and inflammation that can accelerate hair loss if untreated. Medical-grade scalp treatments target the fungal and inflammatory triggers to restore a healthy scalp environment.',
    tags: ['Dandruff', 'Scalp itch', 'Flaking', 'Seborrhoeic dermatitis', 'Scalp inflammation'],
    approach: [
      { step: 1, title: 'Scalp Examination', description: 'Trichoscopy identifies whether the condition is dandruff, seborrhoeic dermatitis, or psoriasis — each requiring different treatment.' },
      { step: 2, title: 'Medical Scalp Treatment', description: 'Prescription-grade anti-fungal and anti-inflammatory scalp treatments are applied in-clinic for immediate relief.' },
      { step: 3, title: 'Home Regime', description: 'A medicated shampoo and scalp serum regime is prescribed to maintain results and prevent recurrence.' },
      { step: 4, title: 'Dietary Guidance', description: 'Dietary triggers including sugar, dairy, and processed foods are identified and managed to reduce seborrhoeic flare-ups.' },
    ],
    treatments: [
      { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, rating: 4.8, reviewCount: 460 },
      { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, rating: 4.9, reviewCount: 180 },
    ],
  },
  'hair-regrowth': {
    name: 'Hair Regrowth', category: 'Hair & Scalp',
    description: 'For patients who have experienced hair loss and want to regrow hair in thinning areas, growth factor therapies combined with medical management offer the most effective results. Early intervention gives the best outcomes as follicles become permanently dormant over time.',
    tags: ['Regrow thinning areas', 'Crown density', 'Hairline restoration', 'Post-treatment regrowth'],
    approach: [
      { step: 1, title: 'Follicle Viability Assessment', description: 'Trichoscopy determines whether follicles in thinning areas are still active (miniaturised) or permanently dormant, setting realistic expectations.' },
      { step: 2, title: 'GFC / PRP Therapy', description: 'Growth factor therapies stimulate miniaturised follicles to produce thicker, longer hair through repeated treatment cycles.' },
      { step: 3, title: 'Oral Minoxidil Protocol', description: 'Low-dose oral minoxidil (prescribed by Dr. Omaima) significantly enhances regrowth results when combined with in-clinic treatment.' },
      { step: 4, title: 'Progress Monitoring', description: 'Standardised photographs and trichoscopy at each session track improvement objectively.' },
    ],
    treatments: [
      { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, rating: 4.9, reviewCount: 180 },
      { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, rating: 4.8, reviewCount: 460 },
    ],
  },
  'unwanted-hair': {
    name: 'Unwanted Body Hair', category: 'Hair & Scalp',
    description: 'Unwanted hair on the face, underarms, legs, bikini area, or back can be permanently reduced with diode laser technology. Our laser is calibrated for Indian skin tones, making it safe and effective for Fitzpatrick III–V skin types.',
    tags: ['Facial hair', 'Underarms', 'Legs', 'Bikini area', 'Back and chest', 'Ingrown hairs'],
    approach: [
      { step: 1, title: 'Consultation & Skin Assessment', description: 'Dr. Omaima assesses your skin type, hair colour, and density to calibrate the laser parameters for safe and effective treatment.' },
      { step: 2, title: 'Patch Test', description: 'A patch test is performed 24–48 hours before the first full session to confirm skin tolerance.' },
      { step: 3, title: 'Laser Sessions', description: 'The treatment area is shaved and the diode laser is applied in a grid pattern. A built-in cooling system protects the skin throughout.' },
      { step: 4, title: 'Course Completion', description: '6–8 sessions spaced 4–6 weeks apart are required to catch hair in all growth phases for maximum permanent reduction.' },
    ],
    treatments: [
      { name: 'Laser Hair Reduction', slug: { current: 'laser-hair' }, rating: 4.8, reviewCount: 640 },
    ],
  },
  'wrinkles': {
    name: 'Wrinkles & Fine Lines', category: 'Anti-Ageing',
    description: 'Wrinkles and fine lines develop from repeated facial muscle movements, loss of collagen, and reduced skin elasticity. Dynamic wrinkles (expression lines) respond to Botox, while static wrinkles and skin laxity are best addressed with skin boosters and collagen-stimulating treatments.',
    tags: ['Forehead lines', 'Frown lines (11s)', 'Crow\'s feet', 'Smile lines', 'Lip lines', 'Neck lines'],
    approach: [
      { step: 1, title: 'Wrinkle Classification', description: 'Dr. Omaima distinguishes between dynamic wrinkles (caused by muscle movement) and static wrinkles (present at rest) as each requires a different treatment approach.' },
      { step: 2, title: 'Botulinum Toxin', description: 'Anti-wrinkle injections relax the muscles causing dynamic expression lines, smoothing the overlying skin without affecting natural expressions.' },
      { step: 3, title: 'Skin Boosters', description: 'Hyaluronic acid skin boosters are injected into the dermis to deeply hydrate and plump the skin, reducing the appearance of fine lines.' },
      { step: 4, title: 'Maintenance', description: 'Botox treatments are maintained every 4–6 months. A prescription retinoid routine slows new wrinkle formation.' },
    ],
    treatments: [
      { name: 'Anti-Wrinkle Botox', slug: { current: 'botox' }, rating: 4.9, reviewCount: 380 },
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
    ],
  },
  'sagging': {
    name: 'Sagging & Laxity', category: 'Anti-Ageing',
    description: 'Skin laxity and sagging result from collagen breakdown, loss of facial fat, and gravitational changes over time. Non-surgical skin tightening treatments can lift and firm the skin, delaying the need for surgical intervention.',
    tags: ['Jowls', 'Loose neck skin', 'Sagging cheeks', 'Nasolabial folds', 'Drooping brows'],
    approach: [
      { step: 1, title: 'Laxity Assessment', description: 'Dr. Omaima assesses the degree of laxity, facial fat compartment changes, and bone structure to design the most effective non-surgical lifting plan.' },
      { step: 2, title: 'Volume Restoration', description: 'Strategic filler placement in the cheeks, temples, and jawline restores facial scaffolding, providing a natural lifting effect.' },
      { step: 3, title: 'Skin Tightening', description: 'MNRF or radiofrequency microneedling tightens loose skin by stimulating new collagen and elastin in the deeper dermal layers.' },
      { step: 4, title: 'Maintenance', description: 'Annual filler touch-ups and 6-monthly RF treatments maintain the lifting result over time.' },
    ],
    treatments: [
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
      { name: 'Acne Scar Revision — MNRF', slug: { current: 'acne-scar-mnrf' }, rating: 4.8, reviewCount: 540 },
    ],
  },
  'volume-loss': {
    name: 'Volume Loss', category: 'Anti-Ageing',
    description: 'Facial volume loss creates a gaunt, tired, or aged appearance — affecting the cheeks, temples, under-eyes, and lips. Hyaluronic acid fillers, when placed correctly, restore youthful facial contours without an overdone appearance.',
    tags: ['Hollow cheeks', 'Sunken temples', 'Under-eye hollows', 'Thin lips', 'Lost facial structure'],
    approach: [
      { step: 1, title: 'Facial Analysis', description: 'Dr. Omaima uses a facial thirds and proportions analysis to identify exactly where volume loss is creating an aged appearance.' },
      { step: 2, title: 'Treatment Planning', description: 'A bespoke treatment plan is designed — usually starting with the cheeks (mid-face) as restoring this structure lifts the lower face naturally.' },
      { step: 3, title: 'Filler Placement', description: 'Premium FDA-approved hyaluronic acid fillers are placed at the correct anatomical planes using advanced injection techniques.' },
      { step: 4, title: 'Review & Refinement', description: 'A 4-week review ensures symmetry and natural result. Refinements are made as needed at no extra cost.' },
    ],
    treatments: [
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
      { name: 'Anti-Wrinkle Botox', slug: { current: 'botox' }, rating: 4.9, reviewCount: 380 },
    ],
  },
  'dark-circles': {
    name: 'Dark Circles & Eye Area', category: 'Anti-Ageing',
    description: 'Dark circles under the eyes can be caused by volume loss creating hollows (tear trough deformity), pigmentation, thin skin showing underlying vasculature, or a combination of all three. Treatment must address the correct underlying cause to be effective.',
    tags: ['Dark circles', 'Hollow under-eyes', 'Eye bags', 'Tired appearance', 'Tear trough hollows'],
    approach: [
      { step: 1, title: 'Cause Identification', description: 'Dr. Omaima identifies whether dark circles are due to hollow tear troughs, pigmentation, or visible blood vessels — each requiring a different approach.' },
      { step: 2, title: 'Tear Trough Fillers', description: 'For hollow under-eyes, a small amount of soft hyaluronic acid filler is placed in the tear trough using a cannula for safety and precision.' },
      { step: 3, title: 'Pigmentation Treatment', description: 'For pigment-based dark circles, Q-switched laser and skin-lightening prescriptions are used.' },
      { step: 4, title: 'Skincare Support', description: 'Topical vitamin C, retinol, and peptide eye creams are prescribed to support and maintain results.' },
    ],
    treatments: [
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
      { name: 'Melasma Treatment', slug: { current: 'melasma' }, rating: 4.8, reviewCount: 290 },
    ],
  },
  'rosacea': {
    name: 'Rosacea', category: 'Skin & Face',
    description: 'Rosacea is a chronic inflammatory skin condition causing persistent redness, visible blood vessels, and acne-like bumps on the face. It predominantly affects fair-skinned individuals and is often triggered by sun exposure, heat, spicy food, and stress. With the right medical management and laser treatment, rosacea can be well-controlled.',
    tags: ['Facial redness', 'Flushing', 'Visible blood vessels', 'Acne-like bumps', 'Sensitive skin', 'Broken capillaries'],
    approach: [
      { step: 1, title: 'Rosacea Assessment', description: 'Dr. Omaima identifies your rosacea subtype (erythematotelangiectatic, papulopustular, or phymatous) as each requires a different treatment approach.' },
      { step: 2, title: 'Trigger Identification', description: 'Common triggers including sun exposure, heat, alcohol, spicy foods, and skincare products are identified and managed through lifestyle advice.' },
      { step: 3, title: 'Laser & Light Therapy', description: 'Vascular lasers target broken capillaries and visible blood vessels, reducing persistent redness and flushing significantly.' },
      { step: 4, title: 'Medical Management', description: 'Topical and oral prescription medications reduce inflammation and control papulopustular rosacea during flare-ups.' },
    ],
    treatments: [
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'sensitive-skin': {
    name: 'Sensitive Skin', category: 'Skin & Face',
    description: 'Sensitive skin is characterised by a weakened skin barrier that reacts easily to environmental triggers, products, and temperature changes. Symptoms include redness, stinging, burning, tightness, and frequent flushing. Strengthening the skin barrier with medical-grade treatments can significantly reduce sensitivity over time.',
    tags: ['Easily irritated skin', 'Redness', 'Stinging', 'Burning', 'Tight skin', 'Reaction-prone'],
    approach: [
      { step: 1, title: 'Barrier Assessment', description: 'Dr. Omaima evaluates the integrity of your skin barrier, identifies triggers, and rules out underlying conditions such as rosacea or eczema.' },
      { step: 2, title: 'Barrier Repair', description: 'Gentle treatments using ceramide-rich and barrier-repairing serums restore the skin\'s protective function and reduce reactivity.' },
      { step: 3, title: 'Calming Procedures', description: 'HydraFacial and gentle chemical exfoliation using lactic acid improve skin texture without triggering sensitivity reactions.' },
      { step: 4, title: 'Personalised Home Regime', description: 'A minimal, fragrance-free skincare routine is designed to strengthen the skin barrier and prevent future sensitisation.' },
    ],
    treatments: [
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
    ],
  },
  'moles': {
    name: 'Moles', category: 'Skin & Face',
    description: 'Moles are common pigmented skin growths that can be flat or raised, singular or multiple. While most moles are benign, some may change in appearance over time. At Tvak & Asthi, Dr. Omaima assesses and monitors moles, and can advise on removal options for cosmetic or medical reasons.',
    tags: ['Pigmented moles', 'Raised moles', 'Flat moles', 'Atypical moles', 'Cosmetic removal'],
    approach: [
      { step: 1, title: 'Dermoscopic Examination', description: 'Dr. Omaima performs a thorough clinical examination to classify moles and assess whether any require biopsy or referral.' },
      { step: 2, title: 'Risk Assessment', description: 'Moles showing the ABCDE signs (Asymmetry, Border, Colour, Diameter, Evolution) are assessed carefully and referred if needed.' },
      { step: 3, title: 'Cosmetic Removal', description: 'Benign moles causing cosmetic concern can be removed using radiofrequency ablation or laser, leaving minimal scarring.' },
      { step: 4, title: 'Post-removal Care', description: 'Scar management and sun protection are advised post-procedure to ensure the best cosmetic outcome.' },
    ],
    treatments: [
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'Melasma Treatment', slug: { current: 'melasma' }, rating: 4.8, reviewCount: 290 },
    ],
  },
  'fungal-infections': {
    name: 'Fungal Infections', category: 'Skin & Face',
    description: 'Fungal skin infections including ringworm, tinea versicolor, athlete\'s foot, and nail fungus are common in India\'s warm, humid climate. They present as scaly, itchy, discoloured patches. Medical dermatology treatment with prescription antifungals clears infections effectively and prevents recurrence.',
    tags: ['Ringworm', 'Tinea versicolor', 'Athlete\'s foot', 'Nail fungus', 'Itchy patches', 'Discolouration'],
    approach: [
      { step: 1, title: 'Clinical Diagnosis', description: 'Dr. Omaima confirms the fungal species and infection extent through clinical examination and, where needed, a skin scraping for microscopy.' },
      { step: 2, title: 'Prescription Antifungals', description: 'Oral antifungal medications (fluconazole, itraconazole) combined with topical antifungal creams deliver rapid and complete clearance.' },
      { step: 3, title: 'Lifestyle Guidance', description: 'Hygiene practices, clothing choices, and environmental factors contributing to recurrent infections are identified and managed.' },
      { step: 4, title: 'Maintenance', description: 'A maintenance plan prevents relapse, particularly for chronic nail fungus or recurrent tinea versicolor.' },
    ],
    treatments: [
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'skin-allergies': {
    name: 'Skin Allergies', category: 'Skin & Face',
    description: 'Skin allergies including contact dermatitis, urticaria (hives), and atopic eczema cause redness, itching, swelling, and rashes. They are triggered by food, medications, environmental allergens, or direct contact with irritants. Medical management with antihistamines and topical steroids provides relief while allergen identification prevents recurrence.',
    tags: ['Contact dermatitis', 'Hives', 'Eczema', 'Itchy rash', 'Skin swelling', 'Allergen reactions'],
    approach: [
      { step: 1, title: 'Allergen Identification', description: 'A detailed history and patch testing identify the specific triggers — whether food, cosmetic ingredients, metals, or environmental allergens.' },
      { step: 2, title: 'Immediate Relief', description: 'Antihistamines, topical corticosteroids, and calamine formulations rapidly reduce itching, swelling, and redness during acute flare-ups.' },
      { step: 3, title: 'Barrier Repair', description: 'Gentle barrier-repairing moisturisers reduce skin reactivity and prevent future allergic responses.' },
      { step: 4, title: 'Trigger Avoidance Plan', description: 'Dr. Omaima designs a practical trigger avoidance strategy tailored to your lifestyle to minimise future reactions.' },
    ],
    treatments: [
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'vitiligo': {
    name: 'Vitiligo / Leucoderma', category: 'Skin & Face',
    description: 'Vitiligo is an autoimmune condition causing progressive depigmentation of the skin in patches. It affects all skin tones but is more visible and emotionally distressing in darker Indian skin. Medical treatment can halt progression and restore pigment in many cases, especially when started early.',
    tags: ['Depigmented patches', 'White patches', 'Autoimmune skin condition', 'Leucoderma', 'Pigment loss'],
    approach: [
      { step: 1, title: 'Assessment & Staging', description: 'Dr. Omaima assesses the extent, activity, and duration of vitiligo to determine whether it is stable (suitable for surgical restoration) or active (requiring medical stabilisation first).' },
      { step: 2, title: 'Medical Stabilisation', description: 'Topical immunomodulators, oral immunosuppressants, and narrow-band UVB phototherapy halt the autoimmune attack on melanocytes.' },
      { step: 3, title: 'Repigmentation', description: 'Once stable, repigmentation is accelerated with targeted phototherapy, topical prostaglandins, and micro-needling into depigmented patches.' },
      { step: 4, title: 'Surgical Restoration', description: 'For stable, refractory vitiligo, surgical melanocyte transfer or suction blister grafting can restore pigment in resistant patches.' },
    ],
    treatments: [
      { name: 'Melasma Treatment', slug: { current: 'melasma' }, rating: 4.8, reviewCount: 290 },
    ],
  },
  'body-contouring': {
    name: 'Body Contouring & Unwanted Fat', category: 'Skin & Face',
    description: 'Non-surgical body contouring treatments target stubborn fat deposits that are resistant to diet and exercise. Modern technology allows targeted fat reduction and skin tightening without surgery, downtime, or anaesthesia — ideal for areas like the abdomen, flanks, thighs, and double chin.',
    tags: ['Stubborn fat', 'Love handles', 'Double chin', 'Belly fat', 'Skin laxity', 'Non-surgical slimming'],
    approach: [
      { step: 1, title: 'Body Analysis', description: 'Dr. Omaima performs a body composition assessment and identifies target areas where fat deposits are resistant to lifestyle interventions.' },
      { step: 2, title: 'Cryolipolysis', description: 'Controlled cooling destroys fat cells in targeted areas without damaging surrounding tissue. Results develop over 4–12 weeks as the body eliminates destroyed fat cells.' },
      { step: 3, title: 'HIFU / Radiofrequency', description: 'High-intensity focused ultrasound tightens skin laxity that may accompany fat loss, providing a smoother contoured result.' },
      { step: 4, title: 'Maintenance', description: 'A healthy diet and exercise plan is advised alongside treatment to maintain and enhance results long-term.' },
    ],
    treatments: [
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
    ],
  },
}

const categoryContext = {
  'Hair & Scalp': {
    anatomy: 'scalp and hair follicle health',
  },
  'Anti-Ageing': {
    anatomy: 'collagen, elastin, facial volume, and skin quality',
  },
  'Skin & Face': {
    anatomy: 'skin barrier, pigment, oil glands, inflammation, and texture',
  },
}

function sentenceList(items, fallback) {
  return items?.length ? items : fallback
}

function buildSeoContent(c) {
  const context = categoryContext[c.category] || categoryContext['Skin & Face']
  const treatmentNames = c.treatments?.length ? c.treatments.map(t => t.name).join(', ') : 'medical skincare, procedure-based care, and follow-up reviews'
  const tags = c.tags?.length ? c.tags.slice(0, 4).join(', ') : `${c.name.toLowerCase()} patterns`
  const approachSummary = c.approach?.length
    ? c.approach.map(step => step.title).filter(Boolean).join(', ')
    : 'consultation, diagnosis, treatment planning, and maintenance'

  return {
    intro: c.longDescription || `${c.name} is best treated when the visible concern and its underlying triggers are assessed together. At Tvak & Asthi by Artham, Dr. Omaima Jawed evaluates ${context.anatomy} before recommending any procedure, so the plan is based on diagnosis rather than guesswork. The aim is not only to improve what you see today, but also to reduce recurrence, protect the skin or scalp barrier, and help you maintain results safely.`,
    what: `${c.description} Because every patient has a different skin type, lifestyle, medical history, and treatment goal, ${c.name.toLowerCase()} needs a personalised plan. A consultation helps distinguish whether the concern is active, stable, inflammatory, pigment-related, hormonal, structural, or maintenance-related. That distinction matters because the same visible symptom can need very different treatment pathways.`,
    causes: sentenceList(c.causes, [
      `Genetic tendency, hormones, age-related change, or individual skin biology can make some people more prone to ${c.name.toLowerCase()}.`,
      `Sun exposure, pollution, heat, friction, harsh products, or inconsistent skincare can worsen ${tags}.`,
      `Delayed treatment, picking, over-the-counter steroid use, or mismatched home routines may make the concern more persistent.`,
      `Lifestyle factors such as stress, poor sleep, nutritional gaps, and irregular aftercare can slow improvement.`,
    ]),
    symptoms: sentenceList(c.symptoms, [
      `Visible change in the affected area, often noticed as ${tags}.`,
      'Texture, tone, density, redness, flaking, pigmentation, or laxity changes that do not settle with basic home care.',
      'Recurring flare-ups or gradual progression over weeks to months.',
      'Reduced confidence, cosmetic concern, or discomfort that affects daily routines.',
    ]),
    diagnosis: c.diagnosis || `Diagnosis starts with a detailed consultation, medical history, medication review, and close examination of the affected area. Dr. Omaima may assess severity, distribution, triggers, previous treatments, and response to skincare or medicines. For some patients, dermoscopy, trichoscopy, Wood's lamp examination, photographs, or blood tests may be advised. The goal is to confirm what is driving ${c.name.toLowerCase()} before choosing a procedure, because correct diagnosis prevents unnecessary sessions and reduces the risk of irritation, pigmentation, or relapse.`,
    treatmentOptions: sentenceList(c.treatmentOptions, [
      `A doctor-led plan may combine prescription home care with in-clinic procedures such as ${treatmentNames}.`,
      `The clinic approach usually follows: ${approachSummary}.`,
      'Treatment intensity is adjusted to your skin tone, sensitivity, downtime preference, and medical history.',
      'Maintenance sessions and review visits are planned once the active concern has improved, so results do not fade quickly.',
    ]),
    benefits: sentenceList(c.treatmentBenefits, [
      `A structured plan can improve the visible signs of ${c.name.toLowerCase()} while reducing avoidable irritation.`,
      'Doctor supervision helps match procedure depth, device settings, and active ingredients to Indian skin tones.',
      'Patients get clearer expectations about timelines, downtime, number of sessions, and maintenance.',
      'Treating the cause as well as the surface concern helps results look more natural and last longer.',
    ]),
    aftercare: c.recoveryAftercare || `Recovery depends on the treatment selected. Many plans have little to no downtime, while peels, lasers, injectables, or collagen-stimulating procedures can involve temporary redness, dryness, swelling, or sensitivity. Aftercare usually includes gentle cleansing, moisturiser, strict SPF, avoiding heat or active exfoliants for a short period, and following any prescription routine exactly. Dr. Omaima explains what is normal after each session, when to restart actives, and when to return for review.`,
    why: sentenceList(c.whyChooseClinic, [
      'Every consultation and procedure is doctor-led by Dr. Omaima Jawed.',
      'Treatment planning is personalised for Indian skin tones and local climate triggers.',
      'The clinic combines medical diagnosis, evidence-based technology, and realistic maintenance advice.',
      'Patients receive clear guidance on preparation, downtime, aftercare, and follow-up.',
    ]),
    faqs: c.faqs?.length ? c.faqs : [
      { question: `How many sessions are needed for ${c.name}?`, answer: 'The number of sessions depends on severity, duration, skin type, and the treatment selected. Mild concerns may improve within a few visits, while long-standing or deeper concerns usually need a structured course with maintenance.' },
      { question: `Is treatment for ${c.name.toLowerCase()} safe for Indian skin?`, answer: 'Yes, when the diagnosis, device settings, peel strength, and home care are selected carefully. The clinic uses conservative, skin-tone-aware protocols to reduce the risk of post-inflammatory pigmentation.' },
      { question: 'Will the results be permanent?', answer: 'Some improvements can be long-lasting, but ageing, hormones, sun exposure, lifestyle, and genetics can still influence recurrence. Maintenance skincare and periodic reviews help preserve results.' },
      { question: 'Can I combine treatments?', answer: 'Combination plans are common, but they should be sequenced properly. Dr. Omaima decides what can be combined safely and what should be spaced apart.' },
    ],
  }
}

export default async function ConcernPage({ params }) {
  const { slug } = await params
  const concern = await fetchConcern(slug).catch(() => null)
  const c = concern || FALLBACK_CONCERNS[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()),
    category: 'Skin & Face', description: 'Our doctor-led approach addresses this concern with a personalised treatment plan.',
    tags: [], approach: [], treatments: [],
  }
  const seo = buildSeoContent(c)

  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HERO */}
      <section style={{ padding: '44px 20px 36px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: (c.heroImage || c.image) ? '1.35fr 0.65fr' : '1fr', gap: 32, alignItems: 'center' }} className="concern-hero-grid">
          <div>
          <div style={{ fontSize: 12.5, color: '#9A8A7A', fontWeight: 300, marginBottom: 20, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: '#9A8A7A' }}>Home</Link><span>/</span>
            <Link href="/concerns" style={{ color: '#9A8A7A' }}>Concerns</Link><span>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 400 }}>{c.name}</span>
          </div>
          <span className="eyebrow">{c.category}</span>
          <h1 style={{ fontWeight: 500, marginBottom: 14 }}>{c.name}</h1>
          <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', maxWidth: 640, lineHeight: 1.85 }}>{c.description}</p>
          {c.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
              {c.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: 12.5, fontWeight: 400, color: '#4A3728', background: '#fff', padding: '5px 13px', borderRadius: 999, border: '1px solid rgba(26,17,9,0.12)' }}>{tag}</span>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#1A2744', color: '#fff', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
            <a href="tel:09811997993" style={{ background: 'transparent', color: '#1A2744', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, border: '1.5px solid rgba(26,39,68,0.2)', textDecoration: 'none' }}>Call 098119 97993</a>
          </div>
          </div>
          {(c.heroImage || c.image) && (
            <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 18, overflow: 'hidden', background: '#E8DED4', boxShadow: '0 18px 48px rgba(26,17,9,0.10)' }}>
              <Image
                src={urlFor(c.heroImage || c.image).width(620).height(465).fit('crop').url()}
                alt={c.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 360px"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* SEO CONTENT */}
      <section style={{ padding: '64px 20px', background: '#fff' }}>
        <article className="concern-article" style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: '#4A3728', marginBottom: 28 }}>{seo.intro}</p>

          <h2>What is {c.name}?</h2>
          <p>{seo.what}</p>

          <h2>Causes of {c.name}</h2>
          <p>The cause is often multi-factorial, which is why a one-size-fits-all cream or procedure rarely works well for every patient. Common contributors include:</p>
          <ul>
            {seo.causes.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>Symptoms and signs to watch for</h2>
          <p>Patients often seek help when the concern becomes recurrent, visible in photographs, difficult to conceal, or uncomfortable. Typical signs include:</p>
          <ul>
            {seo.symptoms.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>Diagnosis</h2>
          <p>{seo.diagnosis}</p>

          <h2>Treatment options</h2>
          <p>At Tvak & Asthi, treatment is selected after the diagnosis, not before it. Depending on your examination, Dr. Omaima may recommend a staged plan that starts by calming active disease or irritation, then moves toward correction and maintenance.</p>
          <ul>
            {seo.treatmentOptions.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>Benefits of timely treatment</h2>
          <p>Early, medically guided care can prevent the concern from becoming deeper, more resistant, or more expensive to correct later. Benefits can include:</p>
          <ul>
            {seo.benefits.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>Recovery and aftercare</h2>
          <p>{seo.aftercare}</p>

          <h2>Why choose Tvak & Asthi by Artham?</h2>
          <p>The clinic is designed for patients who want aesthetic improvement without losing medical judgement. You receive a clear explanation of what is happening, why it is happening, and what each step of treatment is meant to achieve.</p>
          <ul>
            {seo.why.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>FAQs about {c.name}</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {seo.faqs.map((faq, i) => (
              <section key={i} style={{ padding: '20px 22px', borderRadius: 14, background: '#FAF7F2', border: '1px solid rgba(26,17,9,0.08)' }}>
                <h3 style={{ fontSize: 15, marginBottom: 8, color: 'var(--text)' }}>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      {/* OUR APPROACH */}
      {c.approach?.length > 0 && (
        <section style={{ padding: '64px 20px', background: '#1A2744' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <span className="eyebrow" style={{ color: '#B8916A' }}>How We Treat It</span>
              <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 0 }}>Our approach</h2>
            </div>
            <div className="grid-2" style={{ gap: 16 }}>
              {c.approach.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '28px 26px', background: 'rgba(255,255,255,0.06)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', background: '#B8916A', color: '#fff', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.step || i + 1}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: '#FAF7F2', marginBottom: 8 }}>{step.title}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', lineHeight: 1.75 }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RECOMMENDED TREATMENTS */}
      {c.treatments?.length > 0 && (
        <section style={{ padding: '64px 20px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <span className="eyebrow">Treatments</span>
            <h2 style={{ fontWeight: 500, marginBottom: 32 }}>Recommended treatments</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {c.treatments.map((t, i) => (
                <Link key={i} href={`/treatments/${t.slug?.current || '#'}`} className="card-hover" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.09)' }}>
                  <div style={{ height: 252, background: '#F0E8DF', flexShrink: 0, position: 'relative' }}>
                    {t.image ? (
                      <Image
                        src={urlFor(t.image).width(363).height(252).fit('crop').url()}
                        alt={t.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 100vw, 363px"
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(184,145,106,0.5)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', marginBottom: 10 }}>{t.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingTop: 12, borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 'auto' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/></svg>
                      <span style={{ fontSize: 12.5, fontWeight: 400, color: '#4A3728' }}>{t.rating}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 300, color: '#9A8A7A' }}>· {t.reviewCount} reviews</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '56px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 10 }}>Concerned about {c.name}?</h2>
          <p style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', marginBottom: 28 }}>Book a consultation with Dr. Omaima for a personalised treatment plan.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#C4847E', color: '#fff', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
            <a href="https://wa.me/919811997993" target="_blank" rel="noopener" style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF7F2', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
