import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import {
  Target, Eye, Bell, CheckCircle2, ChevronRight, ArrowRight,
  Sparkles, TrendingUp, AlertTriangle,
} from 'lucide-react'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}
const fadeUpProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-60px' },
  variants: fadeUpVariant,
}

const MENTION_DATA = [
  { week: 'W1', yourBrand: 12, rival1: 28, rival2: 19 },
  { week: 'W2', yourBrand: 18, rival1: 30, rival2: 21 },
  { week: 'W3', yourBrand: 24, rival1: 29, rival2: 23 },
  { week: 'W4', yourBrand: 31, rival1: 27, rival2: 22 },
  { week: 'W5', yourBrand: 38, rival1: 26, rival2: 24 },
  { week: 'W6', yourBrand: 44, rival1: 25, rival2: 22 },
  { week: 'W7', yourBrand: 51, rival1: 23, rival2: 21 },
  { week: 'W8', yourBrand: 58, rival1: 22, rival2: 20 },
  { week: 'W9', yourBrand: 64, rival1: 21, rival2: 19 },
  { week: 'W10', yourBrand: 71, rival1: 20, rival2: 18 },
  { week: 'W11', yourBrand: 78, rival1: 19, rival2: 17 },
  { week: 'W12', yourBrand: 86, rival1: 18, rival2: 16 },
]

const HOW_IT_WORKS = [
  {
    icon: Target,
    title: 'Add competitors',
    desc: 'Drop in up to 10 rival websites. We auto-discover their key SEO + GEO keywords.',
    accent: 'var(--accent-amber)', rgb: '245,158,11',
  },
  {
    icon: Eye,
    title: 'We query the AIs',
    desc: 'Every 24 hours we ask ChatGPT, Claude, Perplexity, Gemini and Bing about your category.',
    accent: 'var(--accent-purple)', rgb: '139,92,246',
  },
  {
    icon: Bell,
    title: 'Spot the gaps',
    desc: 'Get WhatsApp alerts when competitors gain mentions — with the exact prompt that triggered it.',
    accent: 'var(--accent-blue)', rgb: '59,130,246',
  },
]

const CHECKLIST = [
  'Track mention share-of-voice across 5 AI engines',
  'Daily competitor crawl with sentiment analysis',
  'Keyword overlap detector — see what they own',
  'Backlink intersection report',
  'Content gap analysis with topic suggestions',
  'WhatsApp alerts when rivals overtake you',
  'Historical mention timeline up to 24 months',
  'Export to PDF + CSV for client reports',
]

const FAQS = [
  { q: 'How many competitors can I track?', a: 'Up to 10 on the Growth plan, unlimited on Enterprise. Most Nigerian SMEs only have 3–5 real rivals anyway.' },
  { q: 'Which AI engines do you query?', a: 'ChatGPT, Claude, Perplexity, Gemini and Bing Copilot. We add new engines within 30 days of launch.' },
  { q: 'How often is the data refreshed?', a: 'Mentions are refreshed every 24 hours. Sentiment and citation data refresh every 6 hours on Enterprise.' },
  { q: 'Can I track competitors outside Nigeria?', a: 'Yes — but we specialise in Nigerian markets. Add a global rival like Lemonade Fintech and we&apos;ll track them too.' },
  { q: 'Will my competitors know I&apos;m tracking them?', a: 'No. We query public AI engines, not their site. There is no fingerprint left on their servers.' },
]

type TooltipPayloadItem = { color?: string; name?: string; value?: number | string }

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="glass-panel p-3 text-xs">
      <div className="font-semibold text-[var(--text-primary)] mb-1.5">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)]">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
          <span>{p.name}:</span>
          <span className="font-mono font-medium text-[var(--text-primary)]">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function CompetitorMonitor() {
  useEffect(() => {
    document.title = 'Competitor Monitor — getranked.ng'
  }, [])

  return (
    <main className="bg-[var(--bg-primary)]">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute pointer-events-none"
          style={{ top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '720px', height: '720px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="container-main relative z-10 text-center">
          <motion.div {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.1)] text-[var(--accent-purple)] text-label">
              COMPETITOR MONITOR
            </span>
          </motion.div>
          <motion.h1 className="text-display-1 text-[var(--text-primary)] mb-6 max-w-[920px] mx-auto" {...fadeUpProps} custom={1}>
            Track competitors across <span className="text-gradient-amber">Google AND AI engines</span>
          </motion.h1>
          <motion.p className="text-body-lg text-[var(--text-secondary)] max-w-[640px] mx-auto mb-10" {...fadeUpProps} custom={2}>
            See exactly which AI engines mention your rivals, the keywords they own, and the gaps you can fill — all updated daily.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeUpProps} custom={3}>
            <Link to="/geo-audit" className="btn-primary">
              Track My Competitors <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              See Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* LIVE DASHBOARD PREVIEW */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <motion.div className="card-base p-5 md:p-8 relative overflow-hidden" {...fadeUpProps} custom={0}>
            {/* glow */}
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6 relative">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-green)]">Live data</span>
                </div>
                <h3 className="text-heading-3 text-[var(--text-primary)]">AI Mention Share — last 12 weeks</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">Tracking &quot;best fintech in Nigeria&quot; across 5 LLMs</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">You</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono font-semibold text-[var(--text-primary)]">86</span>
                    <span className="text-xs text-[var(--accent-green)] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +617%
                    </span>
                  </div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Rival 1</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono font-semibold text-[var(--text-primary)]">18</span>
                    <span className="text-xs text-[var(--accent-red)]">-36%</span>
                  </div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Rival 2</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono font-semibold text-[var(--text-primary)]">16</span>
                    <span className="text-xs text-[var(--accent-red)]">-16%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[340px] md:h-[400px] -mx-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MENTION_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradYou" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradR1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradR2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.4} vertical={false} />
                  <XAxis dataKey="week" stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                    iconType="circle"
                    formatter={(value) => <span className="text-[var(--text-secondary)]">{value}</span>}
                  />
                  <Area type="monotone" dataKey="yourBrand" name="Your brand" stroke="var(--accent-amber)" strokeWidth={2.5} fill="url(#gradYou)" />
                  <Area type="monotone" dataKey="rival1" name="Rival 1 — Kuda" stroke="var(--accent-blue)" strokeWidth={2} fill="url(#gradR1)" />
                  <Area type="monotone" dataKey="rival2" name="Rival 2 — OPay" stroke="var(--accent-purple)" strokeWidth={2} fill="url(#gradR2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border-default)] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-amber)]/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[var(--accent-amber)]" />
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--text-primary)] font-semibold">AI insight:</span> You overtook Kuda in week 4 thanks to your fintech schema markup + 12 new LLM-optimised landing pages. Keep publishing.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-24">
        <div className="container-main">
          <motion.div className="text-center mb-14" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(20,184,166,0.2)] bg-[rgba(20,184,166,0.1)] text-[var(--accent-teal)] text-label">
              HOW IT WORKS
            </span>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
              From competitor blindness to total clarity
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto">
              Set up in 5 minutes. First report lands in your dashboard within 24 hours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.title} className="card-base p-7 relative" {...fadeUpProps} custom={i}>
                <div
                  className="absolute top-6 right-6 text-5xl font-outfit font-extrabold opacity-10"
                  style={{ color: step.accent }}
                >
                  0{i + 1}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `rgba(${step.rgb},0.12)` }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.accent }} />
                </div>
                <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-body-sm text-[var(--text-secondary)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CHECKLIST */}
      <section className="py-20 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUpProps} custom={0}>
              <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] text-[var(--accent-amber)] text-label">
                WHAT YOU GET
              </span>
              <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
                Everything in one workspace
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mb-8">
                No more cobbling together 4 tools to stalk your competition. One dashboard does it all — Lagos-built.
              </p>
              <Link to="/geo-audit" className="btn-primary">
                Try Free <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div className="grid sm:grid-cols-2 gap-3" {...fadeUpProps} custom={1}>
              {CHECKLIST.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-default)]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-green)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-primary)] leading-snug">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ALERT CALLOUT */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <motion.div
            className="card-base p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden"
            {...fadeUpProps}
            custom={0}
          >
            <div
              className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)]/10 flex items-center justify-center shrink-0 relative">
              <AlertTriangle className="w-6 h-6 text-[var(--accent-red)]" />
            </div>
            <div className="flex-1 relative">
              <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">Sample WhatsApp alert</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3">You get a message like this the moment a rival overtakes you:</p>
              <div className="rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] p-4 text-sm font-mono text-[var(--text-primary)] leading-relaxed">
                <div className="text-[var(--accent-green)] mb-1">getranked.ng • now</div>
                Heads up — Kuda just got mentioned by ChatGPT for &quot;best Nigerian neobank for SMEs&quot;. They overtook you by 4 mentions this week. Tap to see the prompt and our 3 recommended fixes.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <div className="container-main">
          <motion.div className="text-center mb-12" {...fadeUpProps} custom={0}>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">Frequently asked</h2>
            <p className="text-body-lg text-[var(--text-secondary)]">Got more questions? <a href="https://wa.me/2348000000000" className="text-[var(--accent-amber)] hover:underline">WhatsApp us</a>.</p>
          </motion.div>

          <motion.div className="max-w-[760px] mx-auto" {...fadeUpProps} custom={1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="card-base px-6">
                  <AccordionTrigger className="text-left text-[var(--text-primary)] hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-[var(--text-secondary)] text-sm leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div className="container-main relative z-10 text-center" {...fadeUpProps} custom={0}>
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
            Stop guessing. <span className="text-gradient-amber">Start tracking.</span>
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[520px] mx-auto mb-10">
            Add your first 3 competitors free. See where you stand in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/geo-audit" className="btn-primary px-8 py-4 text-lg">
              Start Free Trial <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              View Plans
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
