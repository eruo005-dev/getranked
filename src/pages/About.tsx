import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Sparkles, MessageCircle, Wallet, ShieldCheck, Smartphone,
  Globe2, Rocket, Target, Heart, ArrowRight, ChevronRight,
} from 'lucide-react'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const fadeUpProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
  variants: fadeUpVariant,
}

const stats = [
  { value: '5.1B', label: 'Google Nigeria searches per year', accent: 'var(--accent-amber)' },
  { value: '3M+', label: 'ChatGPT users in Nigeria', accent: 'var(--accent-purple)' },
  { value: '0', label: 'Local GEO agencies before us', accent: 'var(--accent-teal)' },
  { value: '₦100K', label: 'Starting price for a GEO audit', accent: 'var(--accent-blue)' },
]

const thesisCards = [
  {
    icon: Wallet,
    title: 'Naira pricing & Paystack',
    body: 'Pay in Naira via Paystack, Flutterwave or Squad. No FX swings, no $5K/mo Omnius bills, no card declines on Stripe. Settlement is T+1 to a Nigerian bank account.',
    color: 'var(--accent-amber)',
    tint: 'rgba(245,158,11,0.12)',
  },
  {
    icon: MapPin,
    title: 'Local schema, real entities',
    body: 'CAC numbers, NIN, POS terminals, japa consultants, fertility clinics, Lekki vs Ikoyi vs Maitama. We model the Nigerian web — Omnius models Berlin.',
    color: 'var(--accent-teal)',
    tint: 'rgba(20,184,166,0.12)',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp-native reporting',
    body: 'Weekly GEO scorecards delivered to WhatsApp. PDFs your MD will actually open from his iPhone in traffic on Third Mainland Bridge. Email is optional.',
    color: 'var(--accent-green)',
    tint: 'rgba(16,185,129,0.12)',
  },
]

const team = [
  {
    img: '/team-avatar-1.png',
    name: 'Adewale Okafor',
    role: 'Founder & CEO',
    bio: 'Ex-Andela engineer. Spent 2024 watching Nigerian brands disappear from ChatGPT answers. Built getranked.ng to fix it.',
  },
  {
    img: '/team-avatar-2.png',
    name: 'Chiamaka Eze',
    role: 'Head of GEO',
    bio: 'Spent 4 years optimising Nigerian SMEs for Google. Now teaching ChatGPT, Claude, Perplexity and Gemini to recommend them.',
  },
  {
    img: '/team-avatar-3.png',
    name: 'Babatunde Ibrahim',
    role: 'Head of Customer Success',
    bio: 'Runs WhatsApp support and onboarding. Speaks Yoruba, Igbo, Hausa and Pidgin — so your founder never has to translate a report.',
  },
]

const values = [
  {
    icon: Globe2,
    title: 'Local-first',
    body: 'Lagos, Abuja, PH, Kano and Ibadan are first-class cities — not a "rest of world" tab in someone else\'s dashboard.',
    color: 'var(--accent-amber)',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent pricing',
    body: 'Naira on the front, USD as a footnote. No "request a demo to see pricing". No surprise renewals.',
    color: 'var(--accent-teal)',
  },
  {
    icon: Sparkles,
    title: 'AI-native',
    body: 'We treat ChatGPT, Claude, Perplexity and Gemini as the new SERP. Schema, citations and LLMs.txt are core, not an upsell.',
    color: 'var(--accent-purple)',
  },
  {
    icon: Smartphone,
    title: 'Built for mobile',
    body: '80%+ of Nigerians are mobile-first. Every dashboard, audit and report works on a 4G connection from a 6.1-inch screen.',
    color: 'var(--accent-blue)',
  },
]

const backers = [
  'Paystack', 'Flutterwave', 'Lagos Innovates', 'GTBank for Business', 'Andela alumni',
]

export default function About() {
  useEffect(() => {
    document.title = 'About — getranked.ng'
    const meta = document.querySelector('meta[name="description"]')
    const description =
      'getranked.ng is Nigeria\'s first SEO + GEO platform — built in Lagos to help Nigerian businesses rank on Google and get mentioned by ChatGPT, Claude, Perplexity and Gemini.'
    if (meta) {
      meta.setAttribute('content', description)
    } else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = description
      document.head.appendChild(m)
    }
  }, [])

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'getranked.ng',
    url: 'https://getranked.ng',
    logo: 'https://getranked.ng/logo.svg',
    description:
      'Nigeria\'s first SEO + GEO platform. We help Nigerian businesses rank on Google and get mentioned by ChatGPT, Claude, Perplexity and Gemini.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Lagos, Nigeria',
    },
    areaServed: 'NG',
    sameAs: ['https://twitter.com/getrankedng', 'https://wa.me/2348000000000'],
  }

  return (
    <div className="bg-[var(--bg-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden bg-[var(--bg-primary)] pt-24 md:pt-32 pb-16 md:pb-24">
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '720px',
            height: '720px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: '20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,158,11,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.25) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="container-main relative z-10">
          <motion.div className="text-center max-w-[820px] mx-auto" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.08)] text-[var(--accent-amber)] text-label">
              <MapPin className="w-3.5 h-3.5" /> ABOUT GETRANKED.NG
            </span>
            <h1 className="text-display-1 text-[var(--text-primary)] mb-6">
              Built in <span className="text-gradient-amber">Lagos</span>,
              <br className="hidden sm:block" /> for Africa.
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[640px] mx-auto mb-10">
              getranked.ng is the only platform built for Nigerian businesses to rank on Google
              <em className="not-italic text-[var(--text-primary)]"> and</em> get recommended by ChatGPT,
              Claude, Perplexity and Gemini. We&apos;re here because nobody else was.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/geo-audit" className="btn-primary w-full sm:w-auto">
                Try free GEO audit <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto"
              >
                Book a strategy call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ MISSION ══════ */}
      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-default)] py-16 md:py-24">
        <div className="container-main">
          <motion.div className="max-w-[860px] mx-auto" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(20,184,166,0.2)] bg-[rgba(20,184,166,0.1)] text-[var(--accent-teal)] text-label">
              OUR MISSION
            </span>
            <p className="text-heading-2 text-[var(--text-primary)] leading-[1.35] tracking-[-0.01em]">
              Nigerian businesses spend{' '}
              <span className="text-[var(--accent-amber)] font-semibold">₦100K to ₦2M every month</span>{' '}
              chasing visibility — yet the tools they pay for were built in Berlin, San Francisco and Singapore.
              Ahrefs doesn&apos;t know what a POS agent is. SEMrush can&apos;t parse a CAC number. Omnius charges
              $5,000 a month and won&apos;t take a Naira card. Meanwhile, 3 million Nigerians are quietly
              asking ChatGPT &ldquo;what&apos;s the best school in Lekki&rdquo; and getting answers that
              don&apos;t mention your business. We built getranked.ng so that the next time an
              AI answers a question about Nigeria, it answers with you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════ STATS STRIP ══════ */}
      <section className="bg-[var(--bg-primary)] py-12 md:py-16">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="card-base p-6 md:p-8 text-center"
                {...fadeUpProps}
                custom={i}
              >
                <div
                  className="stat-value font-mono font-bold text-data-lg mb-2"
                  style={{ color: s.accent }}
                >
                  {s.value}
                </div>
                <p className="text-body-sm text-[var(--text-secondary)]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ NIGERIA-FIRST THESIS ══════ */}
      <section className="bg-[var(--bg-secondary)] py-16 md:py-24">
        <div className="container-main">
          <motion.div className="text-center mb-14 max-w-[680px] mx-auto" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] text-[var(--accent-amber)] text-label">
              THE NIGERIA-FIRST THESIS
            </span>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
              Three things international tools will never do for you
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)]">
              Ahrefs, SEMrush and Omnius are great products. They are not, however, built for the
              Nigerian web. We are.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {thesisCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  className="card-base p-8 h-full"
                  {...fadeUpProps}
                  custom={i}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: card.tint }}
                  >
                    <Icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <h3 className="text-heading-3 text-[var(--text-primary)] mb-3">{card.title}</h3>
                  <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">{card.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════ FOUNDING STORY ══════ */}
      <section className="bg-[var(--bg-primary)] py-16 md:py-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUpProps} custom={0}>
              <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.1)] text-[var(--accent-purple)] text-label">
                THE FOUNDING STORY
              </span>
              <h2 className="text-heading-1 text-[var(--text-primary)] mb-6">
                We spotted the GEO gap in 2025. Then we filled it.
              </h2>
              <div className="space-y-5 text-body-lg text-[var(--text-secondary)]">
                <p>
                  In early 2025, our founder Adewale was helping a Lekki real-estate developer figure out
                  why enquiries had dropped 40% in six months. The Google rankings looked fine. The
                  ads were converting. The website was loading fast on 4G.
                </p>
                <p>
                  Then he asked ChatGPT: <em className="text-[var(--text-primary)] not-italic font-medium">
                  &ldquo;What are the best luxury apartments in Lekki Phase 1?&rdquo;</em> The
                  answer listed five developers. None of them were his client. None of them were even
                  in the top ten of Google. They were just better at being read by AI.
                </p>
                <p>
                  That was the gap. Zero Nigerian agencies were doing GEO. The closest equivalent
                  charged $5,000 a month and didn&apos;t take Naira. Within ninety days, getranked.ng
                  was live, the first Nigerian businesses were onboarded, and the same Lekki developer
                  was being recommended by ChatGPT, Claude and Perplexity.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative" {...fadeUpProps} custom={1}>
              <div
                className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(139,92,246,0.18))',
                }}
              />
              <div className="relative card-base p-3 rounded-3xl overflow-hidden">
                <img
                  src="/team-avatar-1.png"
                  alt="Adewale Okafor, founder of getranked.ng, in Lagos"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 glass-panel px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Adewale Okafor
                    </p>
                    <span className="text-xs text-[var(--text-muted)]">Founder & CEO</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> Yaba, Lagos
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ TEAM ══════ */}
      <section className="bg-[var(--bg-secondary)] py-16 md:py-24">
        <div className="container-main">
          <motion.div className="text-center mb-14 max-w-[640px] mx-auto" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-[rgba(20,184,166,0.2)] bg-[rgba(20,184,166,0.1)] text-[var(--accent-teal)] text-label">
              THE TEAM
            </span>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
              A small Lagos team, deep operator scars.
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)]">
              Engineers, SEO operators and customer-success leads who have actually run Nigerian
              campaigns for Nigerian brands.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="card-base p-6 group"
                {...fadeUpProps}
                custom={i}
              >
                <div className="relative mb-5 overflow-hidden rounded-2xl bg-[var(--bg-tertiary)]">
                  <img
                    src={member.img}
                    alt={`${member.name}, ${member.role} at getranked.ng`}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> Lagos
                  </div>
                </div>
                <h3 className="text-heading-3 text-[var(--text-primary)] mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[var(--accent-amber)] mb-3">{member.role}</p>
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ VALUES ══════ */}
      <section className="bg-[var(--bg-primary)] py-16 md:py-24">
        <div className="container-main">
          <motion.div className="text-center mb-14 max-w-[640px] mx-auto" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] text-[var(--accent-amber)] text-label">
              WHAT WE BELIEVE
            </span>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
              Four values we won&apos;t compromise on.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="card-base p-6 h-full"
                  {...fadeUpProps}
                  custom={i}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${value.color}1F` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">{value.title}</h3>
                  <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                    {value.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════ BACKERS / PARTNERS ══════ */}
      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-default)] py-12 md:py-16">
        <div className="container-main">
          <motion.div className="text-center mb-8" {...fadeUpProps} custom={0}>
            <p className="text-label text-[var(--text-muted)] mb-2">
              BUILT WITH & BACKED BY
            </p>
            <p className="text-body-sm text-[var(--text-secondary)]">
              Operators, founders and infrastructure partners who already power the Nigerian internet.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
            {...fadeUpProps}
            custom={1}
          >
            {backers.map((b) => (
              <span
                key={b}
                className="font-outfit font-semibold text-lg md:text-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 cursor-default tracking-tight"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="relative overflow-hidden bg-[var(--bg-primary)] py-20 md:py-28">
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-amber)] to-transparent opacity-60" />

        <motion.div
          className="container-main relative z-10 text-center"
          {...fadeUpProps}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.08)] text-[var(--accent-amber)] text-label">
            <Rocket className="w-3.5 h-3.5" /> READY WHEN YOU ARE
          </div>
          <h2 className="text-display-2 text-[var(--text-primary)] mb-5">
            Ready to get found by <span className="text-gradient-amber">AI?</span>
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto mb-10">
            Run a free GEO audit in under 5 minutes, or see exactly what you get on every plan.
            No credit card, no Stripe, no FX surprises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/geo-audit" className="btn-primary px-8 py-4 text-lg">
              <Target className="w-5 h-5" /> Run free GEO audit
            </Link>
            <Link to="/pricing" className="btn-secondary">
              See pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <Heart className="w-4 h-4 text-[var(--accent-red)]" />
            <span>Made in Lagos. Trusted across Nigeria.</span>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
