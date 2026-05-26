import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, BarChart3, Code2, FileText, MapPin, Globe,
  FileBarChart, MessageCircle, ArrowRight, Check, X,
  Coins, CreditCard, Shield, Headset, Smartphone, ChevronRight,
} from 'lucide-react'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const fadeUpProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-60px' },
  variants: fadeUpVariant,
}

type Feature = {
  icon: typeof Search
  title: string
  description: string
  badge?: string
  image: string
  to: string
  accent: string
  accentRgb: string
}

const FEATURES: Feature[] = [
  {
    icon: Search,
    title: 'GEO Audit',
    description: 'Check if ChatGPT, Claude, Perplexity, Gemini and Bing know your business exists — in under 60 seconds.',
    badge: 'Free forever',
    image: '/feature-seo-dashboard.png',
    to: '/geo-audit',
    accent: 'var(--accent-amber)',
    accentRgb: '245,158,11',
  },
  {
    icon: BarChart3,
    title: 'LLM Rank Tracker',
    description: 'Track your brand mentions across 5 AI engines daily. Compare share-of-voice with up to 10 competitors.',
    badge: 'Multi-engine',
    image: '/feature-llm-tracker.png',
    to: '/dashboard',
    accent: 'var(--accent-purple)',
    accentRgb: '139,92,246',
  },
  {
    icon: Code2,
    title: 'Schema Markup Generator',
    description: 'Auto-generate JSON-LD schema for Nigerian business types — with CAC numbers, NIN refs and Naira pricing baked in.',
    image: '/feature-schema-generator.png',
    to: '/tools/schema',
    accent: 'var(--accent-blue)',
    accentRgb: '59,130,246',
  },
  {
    icon: FileText,
    title: 'LLMs.txt Generator',
    description: 'Create the LLMs.txt file your competitors don\'t have. Tells AI crawlers exactly what your site is about.',
    image: '/feature-schema-generator.png',
    to: '/tools/llms-txt',
    accent: 'var(--accent-teal)',
    accentRgb: '20,184,166',
  },
  {
    icon: MapPin,
    title: 'Nigerian Local SEO',
    description: 'Dominate "best X in Lagos" searches. 6 cities × 8 categories = 48 ranking opportunities, all SEO-ready.',
    image: '/feature-local-seo.png',
    to: '/local-seo',
    accent: 'var(--accent-green)',
    accentRgb: '16,185,129',
  },
  {
    icon: Globe,
    title: 'Competitor Monitor',
    description: 'See exactly which AI engines mention your rivals and which keywords they own. Steal their playbook.',
    image: '/feature-llm-tracker.png',
    to: '/tools/competitor',
    accent: 'var(--accent-red)',
    accentRgb: '239,68,68',
  },
  {
    icon: FileBarChart,
    title: 'Client Reporting',
    description: 'White-label PDF + interactive web reports. Your logo, your colours, your domain — branded for your agency.',
    badge: 'White-label',
    image: '/feature-reporting.png',
    to: '/reporting',
    accent: 'var(--accent-amber)',
    accentRgb: '245,158,11',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Reports',
    description: 'Schedule monthly GEO reports straight to your client\'s WhatsApp. The way Nigerians actually communicate.',
    badge: 'Nigeria-first',
    image: '/feature-reporting.png',
    to: '/reporting',
    accent: 'var(--accent-green)',
    accentRgb: '16,185,129',
  },
]

const TRUST_MARKERS = [
  { icon: Coins, label: 'Naira-native pricing' },
  { icon: CreditCard, label: 'Paystack + Flutterwave' },
  { icon: Shield, label: 'NDPR-compliant' },
  { icon: Headset, label: 'Lagos-based support' },
  { icon: Smartphone, label: 'WhatsApp-first' },
]

type ComparisonRow = {
  label: string
  us: boolean | string
  ahrefs: boolean | string
  semrush: boolean | string
  omnius: boolean | string
}

const COMPARISON: ComparisonRow[] = [
  { label: 'Tracks ChatGPT, Claude, Perplexity, Gemini', us: true, ahrefs: false, semrush: false, omnius: 'Partial' },
  { label: 'Naira pricing (no FX surprises)', us: true, ahrefs: false, semrush: false, omnius: false },
  { label: 'Nigerian city × category SEO', us: true, ahrefs: false, semrush: false, omnius: false },
  { label: 'WhatsApp report delivery', us: true, ahrefs: false, semrush: false, omnius: false },
  { label: 'Local-business schema with CAC/NIN', us: true, ahrefs: false, semrush: false, omnius: false },
  { label: 'Paystack + Flutterwave billing', us: true, ahrefs: false, semrush: false, omnius: false },
  { label: 'Lagos-based support team', us: true, ahrefs: false, semrush: false, omnius: false },
  { label: 'Traditional Google rank tracking', us: true, ahrefs: true, semrush: true, omnius: true },
]

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check className="w-5 h-5 text-[var(--accent-green)]" strokeWidth={3} />
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X className="w-5 h-5 text-[var(--text-muted)]" />
      </div>
    )
  }
  return (
    <div className="text-center text-xs text-[var(--accent-amber)] font-medium">
      {value}
    </div>
  )
}

export default function Features() {
  useEffect(() => {
    document.title = 'Platform Features — getranked.ng'
  }, [])

  return (
    <main className="bg-[var(--bg-primary)]">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%', left: '50%', transform: 'translateX(-50%)',
            width: '720px', height: '720px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="container-main relative z-10 text-center">
          <motion.div {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] text-[var(--accent-amber)] text-label">
              PLATFORM FEATURES
            </span>
          </motion.div>
          <motion.h1 className="text-display-1 text-[var(--text-primary)] mb-6 max-w-[920px] mx-auto" {...fadeUpProps} custom={1}>
            Everything you need to <span className="text-gradient-amber">dominate Nigerian search</span>
          </motion.h1>
          <motion.p className="text-body-lg text-[var(--text-secondary)] max-w-[640px] mx-auto mb-10" {...fadeUpProps} custom={2}>
            Eight tools, one platform. Built from the ground up for Nigerian businesses — not retrofitted from a US product.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeUpProps} custom={3}>
            <Link to="/geo-audit" className="btn-primary">
              Start Free GEO Audit <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              See Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 md:py-24">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUpProps} custom={i}>
                <Link
                  to={f.to}
                  className="card-base group p-7 md:p-8 h-full flex flex-col relative overflow-hidden"
                >
                  <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle, rgba(${f.accentRgb},0.12) 0%, transparent 70%)`, filter: 'blur(40px)' }}
                  />
                  <div className="flex items-start gap-4 mb-5 relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `rgba(${f.accentRgb},0.12)` }}
                    >
                      <f.icon className="w-6 h-6" style={{ color: f.accent }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-heading-3 text-[var(--text-primary)]">{f.title}</h3>
                        {f.badge && (
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ background: `rgba(${f.accentRgb},0.15)`, color: f.accent }}
                          >
                            {f.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-body-sm text-[var(--text-secondary)] mb-6 leading-relaxed flex-1">
                    {f.description}
                  </p>
                  <div
                    className="relative rounded-xl overflow-hidden border border-[var(--border-default)] mb-5 bg-[var(--bg-tertiary)]"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <img src={f.image} alt={f.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: f.accent }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR NIGERIA STRIP */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <div className="container-main">
          <motion.div className="text-center mb-10" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(20,184,166,0.2)] bg-[rgba(20,184,166,0.1)] text-[var(--accent-teal)] text-label">
              BUILT FOR NIGERIA
            </span>
            <h2 className="text-heading-2 text-[var(--text-primary)]">
              The local advantages global tools can&apos;t match
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TRUST_MARKERS.map((m, i) => (
              <motion.div
                key={m.label}
                className="card-base p-5 text-center flex flex-col items-center gap-3"
                {...fadeUpProps}
                custom={i}
              >
                <div className="w-11 h-11 rounded-lg bg-[var(--accent-amber)]/10 flex items-center justify-center">
                  <m.icon className="w-5 h-5 text-[var(--accent-amber)]" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 md:py-24">
        <div className="container-main">
          <motion.div className="text-center mb-12" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.1)] text-[var(--accent-purple)] text-label">
              COMPARISON
            </span>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
              How we stack up
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto">
              The big global SEO tools weren&apos;t built for Naira, Lagos, or AI search. We were.
            </p>
          </motion.div>

          <motion.div className="card-base overflow-hidden" {...fadeUpProps} custom={1}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th className="text-left text-sm font-semibold text-[var(--text-secondary)] py-5 px-6">Feature</th>
                    <th className="py-5 px-4 min-w-[120px]">
                      <div className="text-center">
                        <div className="text-sm font-bold text-[var(--accent-amber)]">getranked.ng</div>
                        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">You are here</div>
                      </div>
                    </th>
                    <th className="py-5 px-4 min-w-[110px]">
                      <div className="text-center text-sm font-semibold text-[var(--text-secondary)]">Ahrefs</div>
                    </th>
                    <th className="py-5 px-4 min-w-[110px]">
                      <div className="text-center text-sm font-semibold text-[var(--text-secondary)]">SEMrush</div>
                    </th>
                    <th className="py-5 px-4 min-w-[110px]">
                      <div className="text-center text-sm font-semibold text-[var(--text-secondary)]">Omnius</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-[var(--border-default)] last:border-0 ${
                        i % 2 === 1 ? 'bg-[var(--bg-tertiary)]/40' : ''
                      }`}
                    >
                      <td className="py-4 px-6 text-sm text-[var(--text-primary)] font-medium">{row.label}</td>
                      <td className="py-4 px-4 bg-[rgba(245,158,11,0.04)]"><ComparisonCell value={row.us} /></td>
                      <td className="py-4 px-4"><ComparisonCell value={row.ahrefs} /></td>
                      <td className="py-4 px-4"><ComparisonCell value={row.semrush} /></td>
                      <td className="py-4 px-4"><ComparisonCell value={row.omnius} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div className="max-w-[760px] mx-auto mt-20" {...fadeUpProps} custom={2}>
            <h3 className="text-heading-2 text-[var(--text-primary)] text-center mb-8">Common questions</h3>
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: 'Do I need technical knowledge to use the platform?', a: 'No. Every tool is built for non-technical founders. If you can use WhatsApp, you can use getranked.ng.' },
                { q: 'Can I cancel anytime?', a: 'Yes. No contracts. Cancel from your dashboard or via WhatsApp in one message.' },
                { q: 'How is this different from Ahrefs or SEMrush?', a: 'Those tools were built before generative AI search. We track ChatGPT, Claude, Perplexity and Gemini natively — and price in Naira.' },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="card-base px-6">
                  <AccordionTrigger className="text-left text-[var(--text-primary)] hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '800px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div className="container-main relative z-10 text-center" {...fadeUpProps} custom={0}>
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
            Ready to be found by AI <span className="text-gradient-amber">and Google?</span>
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[520px] mx-auto mb-10">
            Run your free GEO audit in 60 seconds. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/geo-audit" className="btn-primary px-8 py-4 text-lg">
              Start Free Audit <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
