import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileBarChart, MessageCircle, FileText, Palette, Globe2, CalendarClock, Smartphone,
  ChevronRight, ArrowRight, Star, Building2, GraduationCap, CreditCard,
  TrendingUp, AlertCircle, Trophy, CheckCircle2,
} from 'lucide-react'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}
const fadeUpProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-60px' },
  variants: fadeUpVariant,
}

const FEATURES = [
  { icon: MessageCircle, title: 'WhatsApp delivery', desc: 'Auto-send monthly PDFs to your client\'s WhatsApp. They open it on the device they actually use.', accent: 'var(--accent-green)', rgb: '16,185,129' },
  { icon: FileText, title: 'PDF + interactive web', desc: 'Every report ships in two formats — a downloadable PDF and a shareable live URL.', accent: 'var(--accent-blue)', rgb: '59,130,246' },
  { icon: Palette, title: 'White-label branding', desc: 'Your logo, your colour palette, your fonts. Zero getranked.ng branding visible.', accent: 'var(--accent-amber)', rgb: '245,158,11' },
  { icon: Globe2, title: 'Custom domain', desc: 'Host reports on reports.youragency.ng. Enterprise plans get full DNS handover.', accent: 'var(--accent-purple)', rgb: '139,92,246' },
  { icon: CalendarClock, title: 'Scheduled monthly', desc: 'Set it once. Every client gets their PDF on the 1st of the month, automatically.', accent: 'var(--accent-teal)', rgb: '20,184,166' },
  { icon: Smartphone, title: 'Mobile-first design', desc: 'Most Nigerian clients open reports on phones. Ours are designed for thumbs, not desktops.', accent: 'var(--accent-red)', rgb: '239,68,68' },
]

const TEMPLATES = [
  {
    icon: Building2,
    industry: 'Real Estate',
    title: 'Lekki Heights Realty — November Report',
    geoScore: 82,
    badge: 'bg-[var(--accent-amber)]/15 text-[var(--accent-amber)]',
    metric1: { label: 'New AI mentions', value: '+34' },
    metric2: { label: 'Google rank avg', value: '#3.2' },
  },
  {
    icon: GraduationCap,
    industry: 'Education',
    title: 'Emerald Academy — November Report',
    geoScore: 76,
    badge: 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]',
    metric1: { label: 'Enquiry CTR', value: '+18%' },
    metric2: { label: 'Parent queries', value: '412' },
  },
  {
    icon: CreditCard,
    industry: 'Fintech',
    title: 'PaySwift NG — November Report',
    geoScore: 91,
    badge: 'bg-[var(--accent-purple)]/15 text-[var(--accent-purple)]',
    metric1: { label: 'ChatGPT mentions', value: '+127' },
    metric2: { label: 'Sentiment', value: '94% +' },
  },
]

export default function Reporting() {
  useEffect(() => {
    document.title = 'White-Label Reporting — getranked.ng'
  }, [])

  return (
    <main className="bg-[var(--bg-primary)]">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute pointer-events-none"
          style={{ top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '760px', height: '760px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="container-main relative z-10 text-center">
          <motion.div {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] text-[var(--accent-amber)] text-label">
              WHITE-LABEL REPORTING
            </span>
          </motion.div>
          <motion.h1 className="text-display-1 text-[var(--text-primary)] mb-6 max-w-[920px] mx-auto" {...fadeUpProps} custom={1}>
            White-label reports your clients <span className="text-gradient-amber">will actually read</span>
          </motion.h1>
          <motion.p className="text-body-lg text-[var(--text-secondary)] max-w-[640px] mx-auto mb-10" {...fadeUpProps} custom={2}>
            Branded PDFs delivered on WhatsApp, the 1st of every month. No spreadsheets. No 40-page documents. Just the numbers Nigerian clients care about.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeUpProps} custom={3}>
            <Link to="/geo-audit" className="btn-primary">
              Try Reporting <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              See Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MOCK REPORT PREVIEW */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <motion.div className="max-w-[920px] mx-auto" {...fadeUpProps} custom={0}>
            <div
              className="absolute inset-x-0 -z-10 h-full max-h-[500px] mx-auto rounded-3xl blur-2xl opacity-40"
              style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(20,184,166,0.18))' }}
            />
            <div className="card-base p-6 md:p-10 relative overflow-hidden">
              {/* Branded header */}
              <div className="flex items-start justify-between mb-8 pb-6 border-b border-[var(--border-default)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-amber)] to-[var(--accent-red)] flex items-center justify-center">
                      <span className="text-xs font-bold text-white">LH</span>
                    </div>
                    <span className="font-semibold text-[var(--text-primary)]">Lekki Heights Realty</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">SEO + GEO Report · November 2025</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-green)]/15 text-[var(--accent-green)]">
                  Final
                </span>
              </div>

              {/* Executive Summary */}
              <div className="mb-7">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2">Executive Summary</div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Strong month. AI visibility up 41% MoM as the new schema markup landed in Google&apos;s knowledge graph. Lekki search clicks doubled. Two competitors lost mentions for &quot;luxury apartments Lekki&quot;.
                </p>
              </div>

              {/* GEO Score */}
              <div className="grid sm:grid-cols-3 gap-4 mb-7">
                <div className="rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] p-4">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">GEO Score</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-[var(--accent-amber)]">82</span>
                    <span className="text-xs text-[var(--accent-green)] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +14
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] p-4">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">AI Mentions</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-[var(--text-primary)]">127</span>
                    <span className="text-xs text-[var(--accent-green)] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +41%
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] p-4">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">Avg. Google Rank</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-[var(--text-primary)]">#3.2</span>
                    <span className="text-xs text-[var(--accent-green)] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +5
                    </span>
                  </div>
                </div>
              </div>

              {/* Competitor Mentions */}
              <div className="mb-7">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-3 h-3" /> Competitor Mentions
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'You — Lekki Heights', share: 38, color: 'var(--accent-amber)', leader: true },
                    { name: 'Rival 1 — Eko Real Estate', share: 24, color: 'var(--accent-blue)' },
                    { name: 'Rival 2 — Lagos Premier', share: 18, color: 'var(--accent-purple)' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="text-xs text-[var(--text-secondary)] w-36 sm:w-44 truncate">
                        {c.name}
                        {c.leader && <span className="ml-1 text-[var(--accent-amber)]">★</span>}
                      </div>
                      <div className="flex-1 h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${c.share}%`, background: c.color }}
                        />
                      </div>
                      <span className="text-xs font-mono text-[var(--text-primary)] w-10 text-right">{c.share}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" /> Action Items (3)
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Publish 4 LLM-optimised landing pages for Ikoyi properties this month',
                    'Add price-range schema to top 12 listings — boosts ChatGPT mentions',
                    'Reply to 5 new Google reviews flagged in dashboard',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border-default)] flex items-center justify-between flex-wrap gap-3">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Generated by Lekki Heights Realty · Powered by your reporting workspace</div>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-md bg-[var(--accent-green)]/15 text-[var(--accent-green)] font-semibold">PDF</span>
                  <span className="text-[10px] px-2 py-1 rounded-md bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] font-semibold">Web</span>
                  <span className="text-[10px] px-2 py-1 rounded-md bg-[var(--accent-amber)]/15 text-[var(--accent-amber)] font-semibold">WhatsApp</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 md:py-24">
        <div className="container-main">
          <motion.div className="text-center mb-12" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.1)] text-[var(--accent-purple)] text-label">
              FEATURES
            </span>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
              Reports clients open. Not delete.
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto">
              Designed for the way Nigerian businesses actually consume information — mobile-first, WhatsApp-delivered.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} className="card-base p-7 group" {...fadeUpProps} custom={i}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `rgba(${f.rgb},0.12)` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.accent }} />
                </div>
                <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">{f.title}</h3>
                <p className="text-body-sm text-[var(--text-secondary)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE TEMPLATES */}
      <section className="py-20 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <div className="container-main">
          <motion.div className="text-center mb-12" {...fadeUpProps} custom={0}>
            <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(20,184,166,0.2)] bg-[rgba(20,184,166,0.1)] text-[var(--accent-teal)] text-label">
              SAMPLE REPORTS
            </span>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
              Industry templates ready to go
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto">
              Start from a Nigerian-tested template. Tweak. Schedule. Done.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEMPLATES.map((t, i) => (
              <motion.div key={t.title} {...fadeUpProps} custom={i}>
                <div className="card-base p-7 h-full group cursor-pointer relative overflow-hidden">
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
                  />
                  <div className="flex items-start justify-between mb-4 relative">
                    <div className="w-11 h-11 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] flex items-center justify-center">
                      <t.icon className="w-5 h-5 text-[var(--text-secondary)]" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${t.badge}`}>
                      {t.industry}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4 leading-snug">{t.title}</h3>

                  <div className="rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)] p-4 mb-4">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">GEO Score</div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-3xl font-bold text-[var(--accent-amber)]">{t.geoScore}</span>
                      <div className="flex-1 mx-3 h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--accent-amber)]" style={{ width: `${t.geoScore}%` }} />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] font-mono">/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{t.metric1.label}</div>
                      <div className="text-sm font-mono font-semibold text-[var(--text-primary)] mt-0.5">{t.metric1.value}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{t.metric2.label}</div>
                      <div className="text-sm font-mono font-semibold text-[var(--text-primary)] mt-0.5">{t.metric2.value}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[var(--accent-amber)] font-medium group-hover:gap-3 transition-all">
                    Use this template <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 md:py-24">
        <div className="container-main">
          <motion.div className="max-w-[820px] mx-auto" {...fadeUpProps} custom={0}>
            <div className="card-base p-8 md:p-12 relative overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
              />
              <span className="absolute top-6 left-6 text-7xl font-outfit font-extrabold text-[var(--accent-amber)] opacity-20 leading-none">&ldquo;</span>
              <div className="relative pt-6">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--accent-amber)] text-[var(--accent-amber)]" />
                  ))}
                </div>
                <p className="text-body-lg text-[var(--text-primary)] mb-6 leading-relaxed">
                  Before getranked, we used to lose two clients a quarter because our reports were ugly Excel files. Now every client gets a clean PDF on WhatsApp on the 1st. Retention is up 40%, and we look like a proper agency.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-amber)] to-[var(--accent-red)] flex items-center justify-center">
                    <span className="text-sm font-bold text-white">CO</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Chiamaka O.</div>
                    <div className="text-sm text-[var(--text-muted)]">Founder, LagosSEO Agency · 32 clients</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
        <div
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div className="container-main relative z-10 text-center" {...fadeUpProps} custom={0}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-amber)]/15 flex items-center justify-center">
              <FileBarChart className="w-7 h-7 text-[var(--accent-amber)]" />
            </div>
          </div>
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
            Make your reports a reason <span className="text-gradient-amber">to stay.</span>
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[520px] mx-auto mb-10">
            Spin up your first white-label report in under 10 minutes. Free on every paid plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/geo-audit" className="btn-primary px-8 py-4 text-lg">
              Try Reporting <ChevronRight className="w-5 h-5" />
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
