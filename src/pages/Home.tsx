import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, ChevronRight, Check, Play, Star, Sparkles,
  Search, Wrench, LineChart, BarChart3, TrendingUp, Code2,
  MapPin, Globe, Zap, Building2, GraduationCap, HeartPulse,
  CreditCard, Plane, Scale, UtensilsCrossed, Shirt,
  ShieldCheck, Quote, X as XIcon, Plus, Minus,
} from 'lucide-react'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const reveal = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-60px' },
  variants: fadeUp,
}

function Eyebrow({
  color = 'amber',
  children,
}: {
  color?: 'amber' | 'teal' | 'purple' | 'blue'
  children: React.ReactNode
}) {
  const map = {
    amber: 'border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.08)] text-[var(--accent-amber)]',
    teal: 'border-[rgba(20,184,166,0.25)] bg-[rgba(20,184,166,0.08)] text-[var(--accent-teal)]',
    purple: 'border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.08)] text-[var(--accent-purple)]',
    blue: 'border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.08)] text-[var(--accent-blue)]',
  } as const
  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-semibold tracking-[0.14em] uppercase ${map[color]}`}
    >
      {children}
    </span>
  )
}

function SectionHeader({
  eyebrow,
  eyebrowColor = 'amber',
  title,
  sub,
  align = 'center',
}: {
  eyebrow: string
  eyebrowColor?: 'amber' | 'teal' | 'purple' | 'blue'
  title: React.ReactNode
  sub?: React.ReactNode
  align?: 'center' | 'left'
}) {
  return (
    <motion.div
      className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-[720px] mb-12 md:mb-16`}
      {...reveal}
    >
      <div className="mb-5">
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
      </div>
      <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">{title}</h2>
      {sub && <p className="text-body-lg text-[var(--text-secondary)]">{sub}</p>}
    </motion.div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.55] dark:opacity-100"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(245,158,11,0.18) 0%, transparent 65%), radial-gradient(40% 40% at 90% 30%, rgba(139,92,246,0.10) 0%, transparent 70%), radial-gradient(40% 40% at 10% 60%, rgba(20,184,166,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
        }}
      />

      <div className="container-main relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-6"
        >
          <Eyebrow color="teal">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
            Nigeria&apos;s #1 SEO + GEO Platform
          </Eyebrow>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-display-1 text-center text-[var(--text-primary)] max-w-[1000px] mx-auto"
        >
          Get found on Google.{' '}
          <span className="text-gradient-amber">Get cited by AI.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-body-lg text-[var(--text-secondary)] max-w-[640px] mx-auto text-center"
        >
          The only platform built for Nigerian businesses to rank on Google
          and get recommended by ChatGPT, Claude, Perplexity and Gemini.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/geo-audit" className="btn-primary w-full sm:w-auto">
            Run free GEO audit
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link to="/pricing" className="btn-secondary w-full sm:w-auto">
            <Play className="w-4 h-4" />
            See pricing
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-[var(--text-muted)]"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent-amber)] text-[var(--accent-amber)]" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
              4.9/5 from 200+ Nigerian businesses
            </span>
          </div>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-[var(--text-muted)]" />
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-green)]" />
            <span className="text-[var(--text-secondary)]">Pay in ₦ via Paystack</span>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 md:mt-20 max-w-[1180px] mx-auto"
        >
          <div
            aria-hidden
            className="absolute -inset-x-20 -inset-y-10 -z-10 rounded-[40px] opacity-70 blur-3xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(139,92,246,0.14), rgba(20,184,166,0.12))',
            }}
          />
          <div className="rounded-2xl md:rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-tertiary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/70" />
              <span className="ml-3 text-xs font-mono text-[var(--text-muted)]">
                app.getranked.ng / dashboard
              </span>
            </div>
            <img
              src="/hero-dashboard-mockup.png"
              alt="getranked.ng dashboard showing AI visibility scoring, LLM citations and Nigerian local SEO"
              className="block w-full h-auto"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LogoStrip() {
  const items = ['Lekki Heights', 'Emerald Academy', 'PaySwift NG', 'NaijaCare', 'JapaPro', 'Brila Law']
  return (
    <section className="border-y border-[var(--border-default)] bg-[var(--bg-secondary)]">
      <div className="container-main py-10">
        <p className="text-center text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-6">
          Trusted by Nigerian businesses from Lagos to Abuja
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
          {items.map((name) => (
            <span
              key={name}
              className="text-[15px] font-outfit font-semibold tracking-tight text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  const stats = [
    { value: '73%', label: 'of Nigerian SMEs are invisible on ChatGPT, Claude and Perplexity' },
    { value: '₦5.1B', label: 'in Google searches happen in Nigeria every year' },
    { value: '0', label: 'local agencies offer GEO before getranked.ng' },
  ]
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="The problem"
          eyebrowColor="teal"
          title={
            <>
              Your business is invisible to <span className="text-gradient-amber">AI search</span>.
            </>
          }
          sub="Nigerians are asking ChatGPT, Claude, Perplexity and Gemini for recommendations every day. If you&apos;re not cited, you don&apos;t exist."
        />
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              {...reveal}
              className="relative card-base p-8 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, var(--accent-amber), transparent 70%)' }}
              />
              <div className="font-mono font-bold text-[44px] md:text-[56px] leading-none text-gradient-amber mb-3">
                {s.value}
              </div>
              <p className="text-body-sm text-[var(--text-secondary)]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    num: '01',
    icon: Search,
    accent: 'var(--accent-amber)',
    title: 'Audit',
    desc: 'Enter your domain. We query every major AI engine and score how visible your business is right now.',
  },
  {
    num: '02',
    icon: Wrench,
    accent: 'var(--accent-purple)',
    title: 'Optimize',
    desc: 'We deploy schema, LLMs.txt, content fixes and local SEO tuned for Nigerian cities and industries.',
  },
  {
    num: '03',
    icon: LineChart,
    accent: 'var(--accent-teal)',
    title: 'Track',
    desc: 'Watch your AI Visibility Score, citation count and rankings climb in a single dashboard.',
  },
  {
    num: '04',
    icon: Sparkles,
    accent: 'var(--accent-blue)',
    title: 'Rank',
    desc: 'Become the answer when Nigerians ask AI — and when they Google your category.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="How it works"
          eyebrowColor="purple"
          title={<>From invisible to <span className="text-gradient-amber">unmissable</span> in four steps.</>}
          sub="No agency calls. No 60-page proposals. Start in under 5 minutes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              {...reveal}
              className="relative card-base p-7"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${step.accent} 12%, transparent)`,
                  }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.accent }} />
                </div>
                <span className="font-mono text-sm text-[var(--text-muted)]">{step.num}</span>
              </div>
              <h3 className="font-outfit font-semibold text-xl text-[var(--text-primary)] mb-2">
                {step.title}
              </h3>
              <p className="text-body-sm text-[var(--text-secondary)]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  {
    icon: BarChart3,
    color: 'var(--accent-purple)',
    title: 'LLM Rank Tracker',
    desc: 'Track citations on ChatGPT, Claude, Perplexity, Gemini and Bing with sentiment and competitor benchmarks.',
    img: '/feature-llm-tracker.png',
    href: '/dashboard',
  },
  {
    icon: TrendingUp,
    color: 'var(--accent-teal)',
    title: 'SEO Dashboard',
    desc: 'Rankings, traffic, backlinks and your AI Visibility Score — unified into one Nigerian-optimised view.',
    img: '/feature-seo-dashboard.png',
    href: '/dashboard',
  },
  {
    icon: Code2,
    color: 'var(--accent-blue)',
    title: 'Schema + LLMs.txt',
    desc: 'Auto-generate JSON-LD and LLMs.txt tuned to Nigerian business types so AI crawlers understand you.',
    img: '/feature-schema-generator.png',
    href: '/tools/schema',
  },
  {
    icon: MapPin,
    color: 'var(--accent-amber)',
    title: 'Nigerian Local SEO',
    desc: 'Dominate Lagos, Abuja, PH, Kano, Ibadan and Enugu with city × category pages built for you.',
    img: '/feature-local-seo.png',
    href: '/local-seo',
  },
  {
    icon: Globe,
    color: 'var(--accent-red)',
    title: 'Competitor Monitor',
    desc: 'See where your rivals are being cited by AI — and exactly what content earned them those mentions.',
    img: '/feature-llm-tracker.png',
    href: '/tools/competitor',
  },
  {
    icon: Zap,
    color: 'var(--accent-green)',
    title: 'White-Label Reports',
    desc: 'One-click branded PDF reports for clients. Share to WhatsApp or email in seconds, in naira.',
    img: '/feature-reporting.png',
    href: '/reporting',
  },
]

function FeaturesGrid() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="Platform"
          eyebrowColor="amber"
          title="Every tool you need to dominate Nigerian search."
          sub="Built specifically for Nigerian SMEs. No technical knowledge required."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} custom={i % 3} {...reveal}>
              <Link
                to={f.href}
                className="group block h-full card-base p-7 relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(360px circle at 50% 0%, color-mix(in oklab, ${f.color} 12%, transparent), transparent 65%)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `color-mix(in oklab, ${f.color} 12%, transparent)` }}
                  >
                    <f.icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-outfit font-semibold text-xl text-[var(--text-primary)] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-body-sm text-[var(--text-secondary)] mb-4">{f.desc}</p>
                  <div
                    className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                    style={{ color: f.color }}
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LiveDemo() {
  const tabs = [
    { value: 'dashboard', label: 'SEO Dashboard', img: '/feature-seo-dashboard.png', desc: 'Track rankings, traffic and AI visibility — all in naira-native reporting.' },
    { value: 'llm', label: 'LLM Tracker', img: '/feature-llm-tracker.png', desc: 'See exactly when ChatGPT, Claude and Perplexity cite you (or your competitor).' },
    { value: 'schema', label: 'Schema Generator', img: '/feature-schema-generator.png', desc: 'Generate JSON-LD for Nigerian business types in one click.' },
    { value: 'local', label: 'Local SEO', img: '/feature-local-seo.png', desc: 'Lagos, Abuja, PH, Kano, Ibadan, Enugu — city × category coverage.' },
  ]
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="Live preview"
          eyebrowColor="blue"
          title={<>See the product before you <span className="text-gradient-amber">spend a naira</span>.</>}
          sub="Switch between the four core surfaces. No signup. No demo call."
        />
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[var(--bg-tertiary)] border border-[var(--border-default)] p-1 h-auto rounded-xl flex flex-wrap">
              {tabs.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-[var(--accent-amber)] data-[state=active]:text-[#0A0F1A] data-[state=active]:shadow"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-[1100px] mx-auto"
              >
                <div
                  aria-hidden
                  className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-3xl opacity-60 blur-3xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(245,158,11,0.16), rgba(139,92,246,0.12))',
                  }}
                />
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] overflow-hidden shadow-xl">
                  <img src={t.img} alt={t.label} className="w-full h-auto block" loading="lazy" />
                </div>
                <p className="text-center text-body-sm text-[var(--text-secondary)] mt-6 max-w-[520px] mx-auto">
                  {t.desc}
                </p>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function NigerianMarket() {
  const cities = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Benin City', 'Kaduna']
  const industries = [
    { icon: Building2, label: 'Real Estate' },
    { icon: GraduationCap, label: 'Schools' },
    { icon: HeartPulse, label: 'Fertility Clinics' },
    { icon: CreditCard, label: 'Fintech' },
    { icon: Plane, label: 'Japa Agents' },
    { icon: Scale, label: 'Law Firms' },
    { icon: UtensilsCrossed, label: 'Restaurants' },
    { icon: Shirt, label: 'Fashion' },
  ]
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="Built for Nigeria"
          eyebrowColor="teal"
          title={<>Local intelligence international tools <span className="text-gradient-amber">don&apos;t have</span>.</>}
          sub="Trained on Nigerian search patterns, business types, and the exact way Nigerians ask AI for help."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div {...reveal} custom={0} className="card-base p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-teal)] mb-1">
                  Cities covered
                </p>
                <h3 className="font-outfit font-semibold text-2xl text-[var(--text-primary)]">
                  Every major Nigerian metro.
                </h3>
              </div>
              <MapPin className="w-6 h-6 text-[var(--accent-teal)]" />
            </div>
            <div className="rounded-xl border border-[var(--border-default)] overflow-hidden mb-6 bg-[var(--bg-tertiary)]">
              <img src="/nigerian-cities.png" alt="Nigerian cities coverage map" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-xs font-medium text-[var(--text-secondary)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)]" />
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} custom={1} className="card-base p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-amber)] mb-1">
                  Industries served
                </p>
                <h3 className="font-outfit font-semibold text-2xl text-[var(--text-primary)]">
                  Tuned to Nigerian categories.
                </h3>
              </div>
              <Building2 className="w-6 h-6 text-[var(--accent-amber)]" />
            </div>
            <div className="rounded-xl border border-[var(--border-default)] overflow-hidden mb-6 bg-[var(--bg-tertiary)]">
              <img src="/nigerian-industries.png" alt="Nigerian industries we support" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {industries.map((i) => (
                <div
                  key={i.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]"
                >
                  <i.icon className="w-4 h-4 text-[var(--accent-amber)]" />
                  <span className="text-xs font-medium text-[var(--text-primary)] truncate">{i.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const COMPARE_ROWS: Array<{ label: string; us: string | boolean; them: string | boolean }> = [
  { label: 'Tracks ChatGPT, Claude, Perplexity, Gemini', us: true, them: 'Partial (Ahrefs/SEMrush only Google)' },
  { label: 'Pricing in Nigerian Naira', us: '₦100K - ₦1.5M', them: '$129 - $999 USD' },
  { label: 'Local payments via Paystack', us: true, them: false },
  { label: 'Nigerian cities + industries tuned', us: true, them: false },
  { label: 'WhatsApp client reports', us: true, them: false },
  { label: 'GEO (Generative Engine Optimization)', us: true, them: false },
  { label: 'Local support hours (WAT)', us: true, them: false },
]

function Comparison() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="Comparison"
          eyebrowColor="amber"
          title={<>Why Nigerian businesses choose <span className="text-gradient-amber">getranked.ng</span>.</>}
          sub="International tools were built for the US market. We were built for ours."
        />

        <motion.div {...reveal} className="card-base overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] text-xs md:text-sm">
            <div className="p-4 md:p-5 bg-[var(--bg-tertiary)] font-semibold text-[var(--text-muted)] uppercase tracking-wider text-[11px]">
              Feature
            </div>
            <div className="p-4 md:p-5 bg-[rgba(245,158,11,0.08)] border-l border-[var(--border-default)]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-amber)]">getranked.ng</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-amber)] text-[#0A0F1A]">NG</span>
              </div>
            </div>
            <div className="p-4 md:p-5 bg-[var(--bg-tertiary)] border-l border-[var(--border-default)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Ahrefs / SEMrush
            </div>

            {COMPARE_ROWS.map((row, i) => (
              <div key={i} className="contents">
                <div className="p-4 md:p-5 border-t border-[var(--border-default)] text-[var(--text-secondary)]">
                  {row.label}
                </div>
                <div className="p-4 md:p-5 border-t border-l border-[var(--border-default)] bg-[rgba(245,158,11,0.04)]">
                  {typeof row.us === 'boolean' ? (
                    row.us ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent-green)]/15">
                        <Check className="w-3.5 h-3.5 text-[var(--accent-green)]" />
                      </span>
                    ) : (
                      <XIcon className="w-4 h-4 text-[var(--text-muted)]" />
                    )
                  ) : (
                    <span className="text-[var(--text-primary)] font-medium">{row.us}</span>
                  )}
                </div>
                <div className="p-4 md:p-5 border-t border-l border-[var(--border-default)]">
                  {typeof row.them === 'boolean' ? (
                    row.them ? (
                      <Check className="w-4 h-4 text-[var(--accent-green)]" />
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent-red)]/10">
                        <XIcon className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                      </span>
                    )
                  ) : (
                    <span className="text-[var(--text-muted)]">{row.them}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const PRICING = [
  {
    name: 'Audit',
    naira: '₦100,000',
    usd: '~$65',
    period: 'one-time',
    desc: 'A full GEO + SEO snapshot of where your business stands today.',
    features: ['Full GEO + SEO audit', 'Citation check across 5 LLMs', 'Local SEO snapshot', 'PDF report delivered in 48h'],
    cta: 'Buy audit',
    href: '/checkout?plan=audit',
    featured: false,
  },
  {
    name: 'Starter',
    naira: '₦150,000',
    usd: '~$100',
    period: '/ month',
    desc: 'For small businesses starting their SEO + GEO journey.',
    features: ['1 website tracked', 'LLM Rank Tracker (5 engines)', 'SEO dashboard', 'Schema generator (10/mo)'],
    cta: 'Start Starter',
    href: '/checkout?plan=starter',
    featured: false,
  },
  {
    name: 'Growth',
    naira: '₦500,000',
    usd: '~$330',
    period: '/ month',
    desc: 'For growing businesses ready to dominate Nigerian search.',
    features: ['5 websites tracked', 'Competitor LLM monitor', 'Nigerian Local SEO', 'Unlimited schema + LLMs.txt'],
    cta: 'Start Growth',
    href: '/checkout?plan=growth',
    featured: true,
  },
  {
    name: 'Enterprise',
    naira: '₦1.5M+',
    usd: '~$1,000',
    period: '/ month',
    desc: 'For agencies and multi-location brands across Nigeria.',
    features: ['Unlimited projects', 'Multi-location support', 'API access', 'Dedicated WAT support'],
    cta: 'Talk to sales',
    href: '/contact',
    featured: false,
  },
]

function PricingTeaser() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="Pricing"
          eyebrowColor="amber"
          title="Premium tooling, priced in naira."
          sub="No surprise dollar bills. Pay with Paystack in NGN. Cancel anytime."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.name}
              custom={i}
              {...reveal}
              className={`relative p-7 rounded-2xl flex flex-col ${
                p.featured
                  ? 'border-2 border-[var(--accent-amber)] bg-[var(--bg-secondary)] shadow-glow lg:-translate-y-3'
                  : 'card-base'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 rounded-full bg-[var(--accent-amber)] text-[#0A0F1A] text-[11px] font-bold tracking-wider uppercase">
                    Most popular
                  </span>
                </div>
              )}
              <h3 className="font-outfit font-semibold text-lg text-[var(--text-primary)] mb-1">{p.name}</h3>
              <p className="text-xs text-[var(--text-muted)] mb-5">{p.desc}</p>
              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono font-bold text-3xl text-[var(--text-primary)]">{p.naira}</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs text-[var(--text-muted)]">{p.period}</span>
                  <span className="text-xs text-[var(--text-muted)]">·</span>
                  <span className="text-xs text-[var(--text-muted)]">{p.usd}</span>
                </div>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--accent-green)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={p.href} className={p.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...reveal} className="mt-10 flex items-center justify-center gap-2 text-sm">
          <img src="/paystack-logo.png" alt="Paystack" className="h-5 opacity-80" />
          <span className="text-[var(--text-secondary)]">Secure payments via Paystack</span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
          <Link to="/pricing" className="text-[var(--accent-amber)] font-medium hover:underline inline-flex items-center gap-1">
            Compare all plans <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const TESTIMONIALS = [
  {
    quote: 'We went from zero AI mentions to being recommended by ChatGPT for "luxury apartments in Lekki" in 3 months. Booked enquiries doubled.',
    name: 'Oluwaseun A.',
    role: 'Marketing Director · Lekki Heights',
    tag: 'Real Estate',
    tagColor: 'var(--accent-teal)',
  },
  {
    quote: 'Parents now find us through ChatGPT. Our enrolment enquiries doubled after the first quarter of GEO tracking with getranked.',
    name: 'Dr. Ngozi M.',
    role: 'Principal · Emerald Academy',
    tag: 'Education',
    tagColor: 'var(--accent-blue)',
  },
  {
    quote: 'The competitor LLM monitor showed us exactly where our rivals were cited. We closed the gap in six weeks and overtook them.',
    name: 'Tunde K.',
    role: 'CEO · PaySwift NG',
    tag: 'Fintech',
    tagColor: 'var(--accent-purple)',
  },
]

function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
      <div className="container-main">
        <SectionHeader
          eyebrow="Loved by Nigerian SMEs"
          eyebrowColor="purple"
          title={<>200+ Nigerian businesses trust <span className="text-gradient-amber">getranked.ng</span>.</>}
          sub="From Lekki to Abuja, we help SMEs become the answer when Nigerians search."
        />
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} custom={i} {...reveal} className="card-base p-7 relative">
              <Quote className="absolute top-5 right-5 w-7 h-7 text-[var(--accent-amber)] opacity-20" />
              <div className="flex items-center gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[var(--accent-amber)] text-[var(--accent-amber)]" />
                ))}
              </div>
              <p className="text-body-sm text-[var(--text-primary)] leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-default)]">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)] truncate">{t.role}</p>
                </div>
                <span
                  className="shrink-0 ml-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                  style={{
                    background: `color-mix(in oklab, ${t.tagColor} 12%, transparent)`,
                    color: t.tagColor,
                  }}
                >
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  {
    q: 'What is GEO (Generative Engine Optimization)?',
    a: 'GEO is the practice of optimising your brand to be cited and recommended by AI engines like ChatGPT, Claude, Perplexity and Gemini — the way SEO optimises you for Google. Nigerians increasingly ask AI for recommendations, so GEO is now non-negotiable.',
  },
  {
    q: 'Do you actually rank Nigerian businesses on ChatGPT and Claude?',
    a: 'Yes. We deploy schema markup, LLMs.txt files, Wikipedia-tier content seeding and citation engineering proven to get Nigerian brands surfaced as AI recommendations. Our average client sees citations within 60–90 days.',
  },
  {
    q: 'How is this different from Ahrefs or SEMrush?',
    a: 'International tools were built for the US market. They track Google but ignore AI engines, charge in USD (₦1,500/$ kills budgets) and have no Nigerian local SEO data. We built getranked.ng for our market from day one.',
  },
  {
    q: 'Can I pay with my Nigerian bank card?',
    a: 'Yes. We use Paystack so you can pay with any Verve, Mastercard or Visa card issued by a Nigerian bank. Bank transfers and USSD also supported. Pricing is in naira.',
  },
  {
    q: 'How long until I see results?',
    a: 'Most clients see their first AI citations within 60–90 days. SEO ranking improvements typically begin in 90–120 days. We send weekly progress reports and a monthly white-label PDF you can share with your team.',
  },
  {
    q: 'Do you offer a free audit?',
    a: 'Yes. Run our free GEO audit by entering your domain. You get a snapshot of your AI visibility across the five major engines, plus the three biggest fixes you can deploy today.',
  },
]

function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="container-main max-w-[860px]">
        <SectionHeader
          eyebrow="FAQ"
          eyebrowColor="teal"
          title="Questions Nigerian founders ask us."
          sub="Still curious? Talk to us on WhatsApp — we reply in WAT."
        />
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="card-base px-6 py-1 border data-[state=open]:border-[var(--accent-amber)]/40"
            >
              <AccordionTrigger className="text-left text-[var(--text-primary)] hover:no-underline py-5 [&>svg]:hidden group">
                <span className="flex items-center justify-between w-full gap-4">
                  <span className="font-jakarta font-semibold text-base">{f.q}</span>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] group-data-[state=open]:bg-[var(--accent-amber)] group-data-[state=open]:text-[#0A0F1A] group-data-[state=open]:border-[var(--accent-amber)] transition-colors">
                    <Plus className="w-4 h-4 group-data-[state=open]:hidden" />
                    <Minus className="w-4 h-4 hidden group-data-[state=open]:block" />
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-body-sm text-[var(--text-secondary)] pb-5 pr-12">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 50%, rgba(245,158,11,0.18) 0%, transparent 60%), radial-gradient(40% 50% at 80% 80%, rgba(139,92,246,0.12) 0%, transparent 70%), radial-gradient(40% 50% at 20% 20%, rgba(20,184,166,0.10) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)',
        }}
      />
      <div className="container-main relative text-center">
        <motion.div {...reveal}>
          <div className="inline-flex items-center gap-2 mb-6">
            <Eyebrow color="amber">
              <Sparkles className="w-3.5 h-3.5" />
              Free to start
            </Eyebrow>
          </div>
          <h2 className="text-display-2 text-[var(--text-primary)] max-w-[800px] mx-auto mb-5">
            Become the answer when Nigerians{' '}
            <span className="text-gradient-amber">ask AI</span>.
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto mb-10">
            Join 200+ Nigerian businesses already getting cited by ChatGPT, Claude, Perplexity and Gemini — and ranking #1 on Google.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link to="/geo-audit" className="btn-primary w-full sm:w-auto">
              Run free GEO audit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary w-full sm:w-auto">
              See pricing
            </Link>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            No credit card required · Audit delivered in 48 hours · Pay in naira
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    document.title = "getranked.ng - Nigeria's #1 SEO + GEO Platform"
    setMounted(true)
  }, [])

  return (
    <div ref={containerRef} className={mounted ? '' : ''}>
      <Hero />
      <LogoStrip />
      <ProblemSection />
      <HowItWorks />
      <FeaturesGrid />
      <LiveDemo />
      <NigerianMarket />
      <Comparison />
      <PricingTeaser />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  )
}
