import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Building2, GraduationCap, HeartPulse, CreditCard, Plane,
  Scale, BedDouble, Shirt, ChevronRight, ArrowRight, Code2, Check,
  Sparkles,
} from 'lucide-react'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}
const fadeUpProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-60px' },
  variants: fadeUpVariant,
}

const CITIES = [
  { name: 'Lagos', slug: 'lagos', state: 'LA' },
  { name: 'Abuja', slug: 'abuja', state: 'FC' },
  { name: 'Port Harcourt', slug: 'port-harcourt', state: 'RI' },
  { name: 'Kano', slug: 'kano', state: 'KN' },
  { name: 'Ibadan', slug: 'ibadan', state: 'OY' },
  { name: 'Enugu', slug: 'enugu', state: 'EN' },
]

const CATEGORIES = [
  { name: 'Real Estate', slug: 'real-estate', icon: Building2 },
  { name: 'Schools', slug: 'schools', icon: GraduationCap },
  { name: 'Fertility Clinics', slug: 'fertility-clinics', icon: HeartPulse },
  { name: 'Fintech', slug: 'fintech', icon: CreditCard },
  { name: 'Japa Agents', slug: 'japa-agents', icon: Plane },
  { name: 'Law Firms', slug: 'law-firms', icon: Scale },
  { name: 'Hotels', slug: 'hotels', icon: BedDouble },
  { name: 'Fashion', slug: 'fashion', icon: Shirt },
]

const SCHEMA_FEATURES = [
  'Nigerian state codes (LA, FC, RI, KN, OY, EN…)',
  'CAC business registration numbers',
  'NIN-verified business owner refs',
  'Naira-native price ranges',
  'Lagos / Abuja postcode structure',
  'WhatsApp & GTBank payment props',
]

export default function LocalSeo() {
  const [activeCategory, setActiveCategory] = useState<string>('real-estate')

  useEffect(() => {
    document.title = 'Nigerian Local SEO — getranked'
  }, [])

  const activeCat = CATEGORIES.find((c) => c.slug === activeCategory) ?? CATEGORIES[0]

  return (
    <main className="bg-[var(--bg-primary)]">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute pointer-events-none"
          style={{ top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '760px', height: '760px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="container-main relative z-10 text-center">
          <motion.div {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.1)] text-[var(--accent-green)] text-label">
              LOCAL SEO + GEO
            </span>
          </motion.div>
          <motion.h1 className="text-display-1 text-[var(--text-primary)] mb-6 max-w-[960px] mx-auto" {...fadeUpProps} custom={1}>
            Rank #1 in every Nigerian city — <span className="text-gradient-amber">and every AI answer</span>
          </motion.h1>
          <motion.p className="text-body-lg text-[var(--text-secondary)] max-w-[680px] mx-auto mb-10" {...fadeUpProps} custom={2}>
            48 ready-made landing-page templates, NDPR-safe local schema, and AI-optimised content for every major Nigerian metro.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeUpProps} custom={3}>
            <Link to="/geo-audit" className="btn-primary">
              Audit My Local Visibility <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              See Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CITY × CATEGORY GRID */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <motion.div className="text-center mb-10" {...fadeUpProps} custom={0}>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
              Pick a city × category combo
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto">
              Every cell is a pre-built ranking opportunity. Click one to see a sample.
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div className="flex flex-wrap justify-center gap-2 mb-8" {...fadeUpProps} custom={1}>
            {CATEGORIES.map((cat) => {
              const active = cat.slug === activeCategory
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    active
                      ? 'bg-[var(--accent-amber)] text-[var(--brand-on-primary)] border-[var(--accent-amber)] shadow-glow'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)]'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              )
            })}
          </motion.div>

          {/* City × Category cells */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CITIES.map((city, i) => (
              <motion.div key={city.slug} {...fadeUpProps} custom={i}>
                <Link
                  to="/local-seo"
                  className="card-base p-6 group block relative overflow-hidden h-full"
                >
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(5, 150, 105,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}
                  />
                  <div className="flex items-start justify-between mb-4 relative">
                    <div className="w-11 h-11 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center">
                      <activeCat.icon className="w-5 h-5 text-[var(--accent-green)]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                      {city.state}
                    </span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">{activeCat.name} in</div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-heading-3 text-[var(--text-primary)]">{city.name}</h3>
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-amber)] group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--border-default)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Avg. monthly searches</span>
                    <span className="font-mono font-medium text-[var(--text-primary)]">{1200 + i * 340}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP ILLUSTRATION */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUpProps} custom={0}>
              <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(20,184,166,0.2)] bg-[rgba(20,184,166,0.1)] text-[var(--accent-teal)] text-label">
                COVERAGE
              </span>
              <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
                Built for the 6 biggest Nigerian metros
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mb-6">
                We&apos;ve mapped search demand, dialect quirks, and local landmarks across Lagos, Abuja, PH, Kano, Ibadan and Enugu — so your pages rank for the way Nigerians actually search.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Pidgin + English keyword variants',
                  'Lagos LGA-level targeting (Lekki, Ikeja, VI, Yaba)',
                  'Local landmark co-occurrence',
                  'Hausa, Yoruba and Igbo geo-tagging',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--accent-green)] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/geo-audit" className="btn-primary">
                Run Local Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div className="relative" {...fadeUpProps} custom={1}>
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-tertiary)]">
                <img
                  src="/nigerian-cities.png"
                  alt="Map of major Nigerian cities"
                  className="w-full h-auto"
                  loading="lazy"
                />
                {/* City pins overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {[
                    { city: 'Lagos', x: '18%', y: '78%' },
                    { city: 'Abuja', x: '52%', y: '48%' },
                    { city: 'PH', x: '46%', y: '85%' },
                    { city: 'Kano', x: '58%', y: '20%' },
                    { city: 'Ibadan', x: '24%', y: '70%' },
                    { city: 'Enugu', x: '54%', y: '70%' },
                  ].map((pin) => (
                    <div
                      key={pin.city}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: pin.x, top: pin.y }}
                    >
                      <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-[var(--accent-amber)] opacity-40 animate-ping" />
                        <span className="relative block w-3 h-3 rounded-full bg-[var(--accent-amber)] shadow-glow" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl -z-10"
                style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105,0.25), rgba(20,184,166,0.2))' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCHEMA SECTION */}
      <section className="py-20 md:py-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUpProps} custom={0}>
              <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.1)] text-[var(--accent-blue)] text-label">
                SCHEMA MARKUP
              </span>
              <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
                Local-business schema, Nigerian-flavour
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mb-8">
                We auto-generate JSON-LD local-business schema with Nigerian state codes, CAC references, NIN ownership proofs and Naira pricing. AI engines and Google both love it.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                {SCHEMA_FEATURES.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--accent-blue)] shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link to="/tools/schema" className="btn-secondary">
                Generate Schema <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div {...fadeUpProps} custom={1}>
              <div className="card-base p-1 overflow-hidden relative">
                <div className="rounded-xl bg-[var(--accent-green-deep)] p-5 overflow-x-auto">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-3 h-3 rounded-full bg-[var(--accent-red)]" />
                    <span className="w-3 h-3 rounded-full bg-[var(--accent-amber)]" />
                    <span className="w-3 h-3 rounded-full bg-[var(--accent-green)]" />
                    <span className="ml-2 text-[10px] font-mono text-[#8B9DBF]">schema.jsonld</span>
                  </div>
                  <pre className="text-xs font-mono leading-relaxed text-[#F0F4F8] whitespace-pre">
{`{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Lekki Heights Realty",
  "@id": "https://lekkiheights.ng",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lekki",
    "addressRegion": "LA",
    "postalCode": "106104",
    "addressCountry": "NG"
  },
  "priceRange": "₦₦₦",
  "telephone": "+234-901-234-5678",
  "areaServed": [
    "Lekki", "Victoria Island", "Ikoyi"
  ],
  "cacRegistration": "RC-1234567",
  "currenciesAccepted": "NGN"
}`}
                  </pre>
                </div>
                <div
                  className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full pointer-events-none -z-0"
                  style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 70%)', filter: 'blur(40px)' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <div className="container-main">
          <motion.div
            className="card-base p-8 md:p-10 max-w-[840px] mx-auto relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6"
            {...fadeUpProps}
            custom={0}
          >
            <div
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(5, 150, 105,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-amber)]/10 flex items-center justify-center shrink-0 relative">
              <Sparkles className="w-6 h-6 text-[var(--accent-amber)]" />
            </div>
            <div className="flex-1 relative">
              <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">Local SEO is included on Growth & Enterprise</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-0">
                From <span className="font-mono font-semibold text-[var(--text-primary)]">₦500,000</span>/month. Cover all 6 cities × 8 categories with one subscription.
              </p>
            </div>
            <Link to="/pricing" className="btn-primary whitespace-nowrap shrink-0">
              See Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div className="container-main relative z-10 text-center" {...fadeUpProps} custom={0}>
          <div className="flex items-center justify-center mb-6">
            <MapPin className="w-10 h-10 text-[var(--accent-amber)]" />
          </div>
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
            Own your city. <span className="text-gradient-amber">Own the AI answer.</span>
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[520px] mx-auto mb-10">
            Free local-visibility audit. See your gaps before your competitors do.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/geo-audit" className="btn-primary px-8 py-4 text-lg">
              Run Free Audit <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/tools/schema" className="btn-secondary">
              <Code2 className="w-4 h-4" /> Generate Schema
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
