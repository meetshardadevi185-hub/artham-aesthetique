import Image from 'next/image'
import Link from 'next/link'
import { fetchHomePage, fetchSiteSettings, fetchDoctor, fetchTreatments, fetchConcerns, urlFor } from '@/sanity/client'
import AnimatedStats from '@/components/AnimatedStats'
import MarqueeTrustBar from '@/components/MarqueeTrustBar'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import AnimatedTestimonials from '@/components/AnimatedTestimonials'
import globalcss from "./globals.css"
export const revalidate = 10

export default async function HomePage() {
  const [[page, settings], doctor, sanityTreatments, sanityConcerns] = await Promise.all([
    Promise.all([fetchHomePage(), fetchSiteSettings()]).catch(() => [null, null]),
    fetchDoctor().catch(() => null),
    fetchTreatments().catch(() => []),
    fetchConcerns().catch(() => []),
  ])

  const treatmentImageMap = new Map(
    (sanityTreatments || []).filter(t => t.slug?.current && t.image).map(t => [t.slug.current, t.image])
  )
  const concernMap = new Map(
    (sanityConcerns || []).filter(c => c.slug?.current).map(c => [c.slug.current, c])
  )
  const concernCard = (fallback) => {
    const cms = concernMap.get(fallback.slug)
    return {
      ...fallback,
      name: cms?.name || fallback.name,
      image: cms?.image || cms?.heroImage,
      iconBg: cms?.iconBg,
    }
  }

  // Fallback data
  const hero = page?.hero || {}
  const trustBar = page?.trustBar || [
    { text: 'US-FDA Cleared Devices' }, { text: 'MBBS Aesthetic Physician' },
    { text: '500+ Happy Patients' }, { text: 'Doctor-Led Every Session' }, { text: '4.9 Google Rating' }
  ]
  const testimonials = page?.testimonials?.items || [
    { name: 'Priya S.', initials: 'PS', rating: 5, text: 'My skin has never looked this clear. The treatment plan was personalised and the results were visible after just 2 sessions.', treatment: 'Acne Clearance', date: '2 weeks ago' },
    { name: 'Rohan M.', initials: 'RM', rating: 5, text: 'Dr. Omaima is extremely thorough. She explained every step and the HydraFacial results were immediate.', treatment: 'HydraFacial MD', date: '1 month ago' },
    { name: 'Anjali K.', initials: 'AK', rating: 5, text: 'I had been struggling with melasma for years. After 4 sessions, there is a visible 60% improvement.', treatment: 'Melasma Treatment', date: '3 weeks ago' },
  ]
  const faqs = page?.faqs?.items || [
    { question: 'Are all treatments performed by a doctor?', answer: 'Yes. Every session at Tvak & Asthi is led by Dr. Omaima Jawed, MBBS. We do not delegate clinical procedures to non-medical staff.' },
    { question: 'How many sessions will I need?', answer: 'This varies by treatment and concern. Most treatments show results in 1–4 sessions. Dr. Omaima will outline a personalised plan during your first consultation.' },
    { question: 'Are the devices safe for Indian skin tones?', answer: 'All our devices are US-FDA cleared and selected specifically for darker Fitzpatrick skin types (III–V), which are common in India.' },
    { question: 'Do I need to take time off after a session?', answer: 'Most treatments have zero downtime. Procedures like peels or MNRF may have 2–3 days of mild redness, which we will discuss before booking.' },
    { question: 'How do I book a consultation?', answer: 'Call or WhatsApp 09811997993, or use the Book Now button. First consultations take 20–30 minutes and include a skin assessment.' },
  ]

  const heroStats = hero.stats || [
    { value: '5+', label: 'Years Experience' },
    { value: '500+', label: 'Patients Treated' },
    { value: '15+', label: 'Treatments Offered' },
    { value: '4.9★', label: 'Google Rating' },
  ]

  const services = [
    { title: 'PRP Hair Restoration', image: "images/prp-hair-restoration.webp", link: '/contact' },
    { title: 'Lip Enhancement', image: "images/lip-enhancement.webp", link: '/contact' },
    { title: 'Micro-Mesotherapy', image: "images/Micro-Mesotherapy.webp", link: '/contact' },
    { title: 'Laser Hair Reduction', image: "images/laserhairreduction.webp", link: '/contact' },
  ];

  return (
    <div style={{ background: 'var(--cream)', overflowX: 'hidden' }}>

      {/* PROMO BANNER */}
      {settings?.promoBanner?.enabled && (
        <div style={{ background: '#543213', padding: '10px 20px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 300, color: '#efdfc8' }}>
            <strong style={{ fontWeight: 500 }}>{settings.promoBanner.label}</strong>{' '}
            {settings.promoBanner.text}
            {settings.promoBanner.linkText && (
              <Link href={settings.promoBanner.linkUrl || '/contact'}
                style={{ color: '#feb847', fontWeight: 500, marginLeft: 8 }}>
                {settings.promoBanner.linkText} →
              </Link>
            )}
          </p>
        </div>
      )}

      {/* HERO — full-screen video, dark Artham palette */}
      {(() => {
        const videoSrc = page?.heroVideoUrl || page?.heroVideoFile?.asset?.url;
        const fallbackImg = page?.heroFallbackImage || page?.heroImage1;

        return (
          <section
            style={{
              position: "relative",
              minHeight: "100vh",
              overflow: "hidden",
            }}
          >
            {/* Background */}
            {videoSrc ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={
                  fallbackImg
                    ? urlFor(fallbackImg).width(1600).url()
                    : undefined
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                }}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : fallbackImg ? (
              <Image
                src={urlFor(fallbackImg).width(1600).height(900).fit("crop").url()}
                alt=""
                fill
                priority
                style={{
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg,#1a0c04,#543213)",
                }}
              />
            )}

            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.55) 40%, rgba(0,0,0,.30) 100%)",
                zIndex: 1,
              }}
            />

            {/* Social Left */}
            <div
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {["INSTAGRAM", "TWITTER", "FACEBOOK"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    color: "rgba(255,255,255,.6)",
                    textDecoration: "none",
                    fontSize: 10,
                    letterSpacing: ".25em",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Contact Right */}
            <div
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {[
                {
                  label: "CALL US",
                  href: "tel:09811997993",
                },
                {
                  label: "WHATSAPP",
                  href: "https://wa.me/919811997993",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    writingMode: "vertical-rl",
                    color: "rgba(255,255,255,.6)",
                    textDecoration: "none",
                    fontSize: 10,
                    letterSpacing: ".25em",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                padding: "0 8%",
              }}
            >
              <div
                style={{
                  maxWidth: "760px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {/* Heading */}
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 600,
                    fontSize: "clamp(40px,6vw,50px)",
                    lineHeight: 1.05,
                    color: "#fff",
                    marginBottom: 30,
                  }}
                >
                  {hero.headingLine1 || "The difference between"}{" "}
                  <span
                    style={{
                      color: "#FEB847",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {hero.headingItalic || "covering concerns"}
                  </span>

                  <br />

                  {hero.headingLine2 || "and"}{" "}
                  <span
                    style={{
                      color: "#FEB847",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {hero.headingItalic2 || "correcting them."}
                  </span>
                </h1>

                {/* Description */}
                <p
                  style={{
                    fontSize: 18,
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,.82)",
                    maxWidth: 620,
                    marginBottom: 30,
                  }}
                >
                  {hero.subtext ||
                    "Noida's MD-led aesthetic clinic. Evidence-based care for skin, hair and ageing concerns under expert supervision."}
                </p>

                {/* Bottom Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 28,
                  }}
                >
                  {/* Button */}
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      width: "fit-content",
                      background: "#F1D0B4",
                      color: "#543213",
                      padding: "16px 42px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {hero.ctaPrimary || "Book Consultation"}
                  </Link>

                  {/* Category */}
                  <div
                    style={{
                      color: "#FEB847",
                      textTransform: "uppercase",
                      letterSpacing: ".3em",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {hero.eyebrow ||
                      "Dermatology · Aesthetics · Trichology"}
                  </div>

                  {/* Stats */}
                  {/* <div
              style={{
                display: "flex",
                gap: 60,
                flexWrap: "wrap",
              }}
            >
              {heroStats.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 38,
                      color: "#FEB847",
                      fontWeight: 700,
                    }}
                  >
                    {s.value}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      color: "rgba(255,255,255,.75)",
                      fontSize: 15,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div> */}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* TRUST BAR — infinite marquee */}
      <MarqueeTrustBar items={trustBar} />

      {/* TREATMENTS */}
      <section
        className="py-20 overflow-hidden"
        style={{
          backgroundImage: "url('/images/bg-image.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#FFFBF8",
        }}
      >    <div className="max-w-7xl mx-auto px-5">
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: '#543213', opacity: 0.6 }}>
                {page?.treatmentsSection?.eyebrow || "Our Services"}
              </span>

              <h2 className="mt-3 text-4xl font-semibold" style={{ color: '#000000' }}>
                {page?.treatmentsSection?.heading || "Treatments we offer"}
              </h2>
            </div>
            <Link href="/treatments" style={{
              fontSize: 13,
              fontWeight: 400,
              color: '#543213',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: 0.7,
              transition: 'opacity 0.3s ease'
            }}
              className="hover:opacity-100"
            >View all treatments
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#543213" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { name: 'Hydrafacial', slug: 'hydrafacial', badge: 'SKIN', desc: 'Deep-cleanse, exfoliate and hydrate in one session. Instant glow, zero downtime.', duration: '45 min' },
              { name: 'Carbon Laser Facial', slug: 'carbon-laser-facial', badge: 'LASERS', desc: 'Tightens pores, controls oil and brightens dull skin — the Hollywood peel.', duration: '30 min' },
              { name: 'Acne Clearance Program', slug: 'acne-clearance', badge: 'SIGNATURE', desc: 'A complete medical plan combining therapy, peels and devices to clear active acne.', duration: '60 min' },
              { name: 'Acne Scar Revision (MNRF)', slug: 'acne-scar-mnrf', badge: 'ACNE SCARS', desc: 'Microneedling RF to rebuild collagen and smooth pitted scars.', duration: '60 min' },
            ].map((t, i) => (
              <Link
                key={i}
                href={`/treatments/${t.slug}`}
                className="group reveal relative h-[450px] rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                style={{ "--d": `${i * 50}ms` }}
              >
                {treatmentImageMap.get(t.slug) ? (
                  <Image
                    src={urlFor(treatmentImageMap.get(t.slug))
                      .width(620)
                      .height(900)
                      .fit("crop")
                      .url()}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="310px"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: '#F1D0B4' }} />
                )}

                {/* Light, airy gradient overlay */}
                {/* Default Black Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: "rgba(0,0,0,0.45)",
                  }}
                />

                {/* Darker Overlay on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: "rgba(0,0,0,0.70)",
                  }}
                />
                {/* Elegant border frame */}
                <div
                  className="absolute inset-5 pointer-events-none border border-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 z-30"
                  style={{
                    borderWidth: "1px",
                  }}
                />

                {/* Badge - Peach background with brown text */}
                {/* <div className="absolute top-5 right-5 z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full" style={{
                    backgroundColor: '#F1D0B4',
                    color: '#543213',
                    boxShadow: '0 2px 12px rgba(84,50,19,0.1)'
                  }}>
                    {t.badge}
                  </span>
                </div> */}

                {/* Duration - Clean white tag */}
                {/* <div className="absolute bottom-24 left-6 z-10">
                  <span className="text-[11px] font-medium tracking-wider px-3 py-1.5 rounded-full" style={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: '#543213',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
                  }}>
                    {t.duration}
                  </span>
                </div> */}

                {/* Content - Clean and minimal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pb-12">
                  <h3
                    className="text-xl font-light tracking-wide leading-tight"
                    style={{
                      color: "#fff",
                      fontWeight: 500,
                      lineHeight: "1.2",
                      letterSpacing: "0.05em",
                      textShadow: "0 2px 20px rgba(0,0,0,0.15)"
                    }}
                  >
                    {t.name}
                  </h3>

                  {/* Minimal gold accent */}
                  <div className="w-8 h-[1px] mt-4 mb-4" style={{ backgroundColor: '#FEB847' }} />

                  <p
                    className="mt-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                    style={{
                      color: "rgba(255,255,255,.9)",
                      fontSize: "14px",
                      lineHeight: "24px",
                      textShadow: "0 2px 10px rgba(0,0,0,.2)",
                      maxWidth: "260px",
                      fontWeight: 300
                    }}
                  >
                    {t.desc}
                  </p>

                  <span className="mt-6 rounded-full px-6 py-2 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-2" style={{
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(4px)',
                    fontWeight: 400
                  }}>
                    Learn more
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY CONCERN */}
      <section
        className="py-10 md:py-15"
        style={{
          backgroundImage: "url('/images/bg-image.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#FFFBF8",
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 16px' }}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-12">
            <div>
              <span className="uppercase tracking-[0.2em] text-xs font-semibold" style={{ color: '#543213', opacity: 0.7 }}>
                Browse by Concern
              </span>

              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "1.1",
                  color: "#000000",
                  marginBottom: "12px",
                  fontFamily: "Cormorant Garamond, serif",
                }}
                className="md:text-[44px]"
              >
                How can we help you?
              </h2>

              <p
                style={{
                  maxWidth: "100%",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "#543213",
                  opacity: 0.8,
                  whiteSpace: "pre-line",
                  marginBottom: "16px"
                }}
                className="md:max-w-[600px]"
              >
                {`At Artham Aesthetique, we believe aesthetic medicine should be guided by science, precision, and honesty. Led by Dr. Omaima Jawed, our clinic combines advanced medical technology with personalised treatment plans to deliver natural-looking, long-lasting results. Every consultation begins with understanding your concerns, followed by evidence-based recommendations tailored specifically to your skin, hair, or body goals.

Whether you're seeking healthier skin, effective acne solutions, advanced anti-ageing treatments, or hair restoration, our focus remains the same—safe procedures, transparent advice, and exceptional patient care. Using US-FDA cleared technologies and protocols designed for Indian skin, we are committed to helping every patient achieve confidence through results that are both beautiful and medically sound.`}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                <Link
                  href="/book"
                  style={{
                    background: "#543213",
                    color: "#fff",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all .3s ease",
                  }}
                  className="hover:opacity-80"
                >
                  Book Consultation
                </Link>

                <Link
                  href="/concerns"
                  style={{
                    border: "1px solid #543213",
                    color: "#543213",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all .3s ease",
                  }}
                  className="hover:bg-[#543213] hover:text-white"
                >
                  View All →
                </Link>
              </div>
            </div>

            <div className="relative h-[240px] md:h-[360px] rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Clinic"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, rgba(84,50,19,0.05) 0%, transparent 100%)'
              }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mt-10 md:mt-14">
            {[
              {
                cat: "Skin & Face",
                items: [
                  { name: "Acne & Breakouts", count: 5, slug: "acne" },
                  { name: "Acne Scars", count: 4, slug: "acne-scars" },
                  { name: "Pigmentation", count: 4, slug: "pigmentation" },
                ],
              },
              {
                cat: "Hair & Scalp",
                items: [
                  { name: "Hair Fall & Thinning", count: 4, slug: "hair-fall" },
                  { name: "Hair Regrowth", count: 3, slug: "hair-regrowth" },
                  { name: "Unwanted Body Hair", count: 2, slug: "unwanted-hair" },
                ],
              },
              {
                cat: "Anti-Ageing",
                items: [
                  { name: "Wrinkles & Fine Lines", count: 3, slug: "wrinkles" },
                  { name: "Volume Loss", count: 2, slug: "volume-loss" },
                  { name: "Sagging & Laxity", count: 3, slug: "sagging" },
                ],
              },
            ]
              .map((col) => ({
                ...col,
                item: concernCard(col.items[0]),
              }))
              .map((col, index) => (
                <Link
                  key={index}
                  href={`/concerns/${col.item.slug}`}
                  className="group"
                >
                  <div
                    className="
                relative overflow-hidden
                h-[240px] sm:h-[260px] md:h-[270px]
                rounded-2xl
                bg-white
                p-4 md:p-5
                shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:bg-[#b18d71]
                hover:shadow-[0_18px_45px_rgba(84,50,19,.25)]
              "
                  >
                    {/* Inner Border */}
                    <div
                      className="
                  pointer-events-none
                  absolute inset-3 md:inset-4
                  border border-[#DBA675]
                  transition-all
                  duration-300
                  group-hover:border-[#F6E6D2]
                "
                    />

                    {/* Icon */}
                    <div className="relative mx-auto mt-4 md:mt-6 mb-3 md:mb-5 h-[60px] w-[60px] md:h-[78px] md:w-[78px]">
                      {col.item.image ? (
                        <Image
                          src={urlFor(col.item.image)
                            .width(180)
                            .height(180)
                            .fit("crop")
                            .url()}
                          alt={col.item.name}
                          fill
                          sizes="(max-width: 768px) 60px, 78px"
                          className="object-contain transition duration-300 group-hover:brightness-110"
                        />
                      ) : (
                        <div className="h-full w-full rounded-full bg-[#f3e5d8]" />
                      )}
                    </div>

                    {/* Category */}
                    <p
                      className="
                  relative z-20
                  text-center
                  uppercase
                  tracking-[2px] md:tracking-[3px]
                  text-[10px] md:text-xs
                  text-[#8B7A68]
                  group-hover:!text-white
                  transition-all
                  duration-300
                "
                    >
                      {col.cat}
                    </p>

                    {/* Title */}
                    <h3
                      className="
                  mx-2 md:mx-3 mt-2 md:mt-3
                  text-center
                  text-xl md:text-2xl
                  leading-tight
                  font-normal
                  text-[#C47B45]
                  transition
                  duration-300
                  group-hover:text-[#FFF7EF]
                "
                    >
                      {col.item.name}
                    </h3>

                    {/* Count */}
                    <p
                      className="
                  relative z-20
                  mt-1 md:mt-2
                  text-center
                  text-sm md:text-base
                  text-[#7A6657]
                  group-hover:!text-white
                  transition-all
                  duration-300
                "
                    >
                      {col.item.count} Treatments
                    </p>

                    {/* Bottom Line */}
                    <div
                      className="
                  mx-auto mt-3 md:mt-5
                  h-[2px]
                  w-[50px] md:w-[70px]
                  bg-[#D8B394]
                  transition
                  duration-300
                  group-hover:bg-[#FFF7EF]
                "
                    />
                  </div>
                </Link>
              ))}
          </div>

          <div className="mt-8 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-16 md:w-24 z-10"
              style={{
                background:
                  "linear-gradient(to right,#FFFBF8 0%,rgba(255,251,248,0)100%)",
              }}
            />

            <Image
              src="/images/sendtionend.png"
              alt=""
              width={2000}
              height={40}
              className="w-full h-8 md:h-10 object-cover"
            />

            <div
              className="absolute inset-y-0 right-0 w-16 md:w-24 z-10"
              style={{
                background:
                  "linear-gradient(to left,#FFFBF8 0%,rgba(255,251,248,0)100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Decorative Divider */}

      {/* CURRENT OFFERS */}
      <section style={{ padding: '72px 20px', background: '#f1d0b4' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="eyebrow">Offers & Promotions</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>Current offers</h2>
          </div>
          <div className="grid-2">
            {[
              { bg: '#543213', eyebrow: 'Monsoon Special', heading: '20% off Acne & Scar treatments', sub: 'Valid through July 2026. Book now to lock in the offer.', btnBg: '#feb847', btn: 'Claim offer →', delay: '0ms', subColor: '#c8b09a' },
              { bg: '#844d28', eyebrow: 'New Patient Offer', heading: 'Free consultation for first-timers', sub: 'New to Tvak? Your first dermatologist consultation is on us.', btnBg: '#feb847', btn: 'Book free consult →', delay: '100ms', subColor: '#e8d0b4' },
            ].map((o, i) => (
              <div key={i} className="reveal" style={{ '--d': o.delay, background: o.bg, borderRadius: 20, padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#feb847', marginBottom: 16 }}>{o.eyebrow}</div>
                <h3 style={{ fontWeight: 600, fontSize: 22, color: '#efdfc8', marginBottom: 10, lineHeight: 1.2 }}>{o.heading}</h3>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: o.subColor, marginBottom: 28, lineHeight: 1.7 }}>{o.sub}</p>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: o.btnBg, color: '#543213', fontSize: 13, fontWeight: 500, padding: '11px 22px', borderRadius: 999, textDecoration: 'none' }}>{o.btn}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section style={{ padding: '56px 20px' }}>
        <div className="reveal doctor-card-home" style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28, alignItems: 'center', background: '#fff', borderRadius: 18, border: '1.5px solid rgba(84,50,19,0.08)', padding: 18, boxShadow: '0 14px 42px rgba(84,50,19,0.06)' }}>
          <div style={{ borderRadius: 14, overflow: 'hidden', background: '#e8d4be', aspectRatio: '4/5', position: 'relative' }}>
            {doctor?.photo && (
              <Image
                src={urlFor(doctor.photo).width(420).height(525).fit('crop').url()}
                alt={doctor.name || 'Dr. Omaima Jawed'}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                sizes="(max-width: 768px) 100vw, 240px"
              />
            )}
          </div>
          <div style={{ padding: '8px 10px 8px 0' }}>
            <span className="eyebrow">Your Doctor</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)', marginBottom: 10, fontSize: 'clamp(22px,3vw,30px)' }}>{doctor?.name || 'Dr. Omaima Jawed'}</h2>
            <p style={{ fontSize: 12.5, fontWeight: 400, color: '#844d28', marginBottom: 12, letterSpacing: '0.04em' }}>
              {doctor?.credentials || 'MBBS'} · {doctor?.title || 'Aesthetic Physician'} · {doctor?.experience || 5} Years Experience
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 300, color: '#7a6858', lineHeight: 1.7, marginBottom: 18, maxWidth: 560 }}>
              {doctor?.shortBio || 'Dr. Omaima completed her MBBS and trained in aesthetic dermatology at leading institutes. She personally leads every procedure — from your first consultation to each follow-up session.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
              {['Acne & Scar Treatment', 'Laser Procedures', 'Hair Restoration', 'Anti-Ageing', 'Chemical Peels'].map((s, si) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 400, color: '#543213', background: '#f1d0b4', padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(84,50,19,0.15)', animation: `fadeUp 0.4s cubic-bezier(.22,.68,0,.99) ${si * 60 + 200}ms both` }}>{s}</span>
              ))}
            </div>
            <Link href="/doctor" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#efdfc8', background: '#543213', padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>
              Full Profile →
            </Link>
          </div>
        </div>
      </section>

      <div
        style={{
          background: "#FFFBF8",
          padding: "24px 0",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Left Fade */}
          <div
            className="absolute inset-y-0 left-0 z-10"
            style={{
              width: "120px",
              background:
                "linear-gradient(to right,#FFFBF8 0%,rgba(255,251,248,0)100%)",
            }}
          />

          {/* Ornament */}
          <Image
            src="/images/sendtionend.png"
            alt="Divider"
            width={2000}
            height={40}
            style={{
              width: "100%",
              height: "40px",
              objectFit: "cover",
            }}
          />

          {/* Right Fade */}
          <div
            className="absolute inset-y-0 right-0 z-10"
            style={{
              width: "120px",
              background:
                "linear-gradient(to left,#FFFBF8 0%,rgba(255,251,248,0)100%)",
            }}
          />
        </div>
      </div>


      <section
        style={{
          padding: '72px 20px',
          background: '#FFFBF8',
          borderRadius: '8px',
        }}
      >

        <div
          className="reveal"
          style={{
            maxWidth: 1180,
            margin: "0 auto 50px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#543213",
              opacity: 0.7,
              marginBottom: "12px",
            }}
          >
            Signature Treatments
          </span>

          <h2
            style={{
              fontSize: "clamp(32px,4vw,46px)",
              fontWeight: 600,
              color: "#000",
              margin: "0 0 16px",
              lineHeight: 1.2,
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Our Services
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              color: "#543213",
              opacity: 0.8,
              fontSize: "15px",
              lineHeight: 1.8,
            }}
          >
            Discover our most sought-after aesthetic treatments, carefully designed to
            enhance your natural beauty using advanced technology and personalised
            care for safe, effective, and long-lasting results.
          </p>
        </div>
        <div
          className="reveal services-grid-home"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            width: '100%',
            maxWidth: 1180,
            margin: '0 auto',
            gap: '4px',
          }}
        >
          {(services || [
            { title: 'Potenza Face Makeover', image: null },
            { title: 'Potenza Post Partum Specials', image: null },
            { title: 'Potenza Body Contouring', image: null },
            { title: 'Potenza Anti-Ageing Treatment', image: null },
          ]).map((service, i) => (
            <div
              key={service?._key || i}
              className="group"
              style={{
                borderRadius: "8px",
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                background: '#F1D0B4',
              }}
            >
              {/* Background image */}
              {service?.image && (
                <Image
                  src={`/${service.image}`}
                  alt={service.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="
    object-cover
    transition-all
    duration-700
    ease-out
    group-hover:scale-110
    group-hover:rotate-[1deg]
"
                />
              )}

              {/* Gradient overlay with brand colors */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(84,50,19,0) 35%, rgba(84,50,19,0.55) 75%, rgba(84,50,19,0.85) 100%)',
                }}
              />

              {/* Gold accent line at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  background: '#FEB847',
                  opacity: 0,
                  transition: 'all 0.4s ease',
                }}
                className="group-hover:opacity-100 group-hover:w-[100px]"
              />

              {/* Content */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '0 24px 32px',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontWeight: 500,
                    color: '#fff',
                    fontSize: 'clamp(15px,2vw,20px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                    marginBottom: 20,
                    textShadow: '0 2px 10px rgba(0,0,0,0.25)',
                  }}
                >
                  {service?.title || 'Service Title'}
                </h3>

                <Link
                  href={service?.link || "/contact"}
                  className="
    inline-flex
    items-center
    justify-center
    uppercase
    opacity-0
    translate-y-5
    group-hover:opacity-100
    group-hover:translate-y-0
    transition-all
    duration-500
    ease-out
    hover:bg-[#543213]
    hover:text-white
    hover:shadow-lg
  "
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "#543213",
                    background: "#FEB847",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    width: "100%",
                    maxWidth: "220px",
                    margin: "0 auto",
                    boxShadow: "0 4px 15px rgba(254,184,71,.3)",
                  }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section style={{ padding: '72px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="eyebrow">Real Results</span>
              <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>Before & After</h2>
            </div>
            <Link href="/before-after" style={{ fontSize: 13, fontWeight: 400, color: '#543213', textDecoration: 'none' }}>View all results →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { treatment: 'Acne Clearance Program', result: 'Active acne cleared in 6 sessions', weeks: '8 weeks', cat: 'Acne & Scars', slug: 'acne-clearance', accent: '#FFF0EE', dot: '#844d28' },
              { treatment: 'Acne Scar Revision MNRF', result: 'Pitted scars visibly reduced', weeks: '12 weeks', cat: 'Acne & Scars', slug: 'acne-scar-mnrf', accent: '#f1d0b4', dot: '#844d28' },
              { treatment: 'Melasma Treatment', result: 'Dark patches significantly faded', weeks: '10 weeks', cat: 'Pigmentation', slug: 'melasma', accent: '#EEF6FF', dot: '#6B9EC7' },
              { treatment: 'PRP Hair Restoration', result: 'Visible density improvement', weeks: '16 weeks', cat: 'Hair Restoration', slug: 'prp-hair', accent: '#EEFAF2', dot: '#2E7D52' },
            ].map((item, i) => (
              <Link key={i} href={`/treatments/${item.slug}`} className="card-hover reveal" style={{ '--d': `${i * 80}ms`, textDecoration: 'none', background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 200, background: '#f1d0b4' }}>
                  <div style={{ background: '#E2D8CE', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.85)', color: '#543213', padding: '4px 8px', borderRadius: 4 }}>Before</span>
                  </div>
                  <div style={{ background: '#D4C9BC', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(84,50,19,0.85)', color: '#efdfc8', padding: '4px 8px', borderRadius: 4 }}>After</span>
                  </div>
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#543213" strokeWidth="2.5"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6" /></svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: item.accent, borderRadius: 6, padding: '3px 9px' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, color: item.dot, letterSpacing: '0.06em' }}>{item.cat}</span>
                  </div>
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontWeight: 500, fontSize: 14, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>{item.treatment}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: '#7a6858', marginBottom: 12, lineHeight: 1.55 }}>{item.result}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 400, color: '#543213', background: '#f1d0b4', padding: '4px 10px', borderRadius: 999 }}>Results in {item.weeks}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#844d28' }}>View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 300, color: '#7a6858', marginTop: 28 }}>
            Individual results may vary. All procedures performed by Dr. Omaima Jawed, MBBS.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS — auto-scrolling carousel */}
      <section style={{ padding: '72px 20px', background: '#efdfc8' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.testimonials?.eyebrow || 'Patient Stories'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.testimonials?.heading || 'Real results, real people'}</h2>
          </div>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ — smooth animated accordion */}
      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.faqs?.eyebrow || 'FAQ'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.faqs?.heading || 'Common questions'}</h2>
          </div>
          <AnimatedFAQ faqs={faqs} />
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '64px 20px', background: '#543213' }}>
        <div className="reveal" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#efdfc8', marginBottom: 12 }}>
            {page?.ctaBanner?.heading || 'Ready to correct, not just cover?'}
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#e8d0b4', marginBottom: 32 }}>
            {page?.ctaBanner?.subtext || 'Book a consultation with Dr. Omaima and get a personalised treatment plan.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#feb847', color: '#543213', fontSize: 13, fontWeight: 500, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>
              {page?.ctaBanner?.primaryCta || 'Book Appointment'}
            </Link>
            <a href="tel:09811997993" style={{ background: 'rgba(255,255,255,0.08)', color: '#efdfc8', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              {page?.ctaBanner?.secondaryCta || 'Call 09811997993'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
