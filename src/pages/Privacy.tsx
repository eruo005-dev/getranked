import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldCheck, ChevronDown, Mail, ArrowRight, Lock, FileText, BookOpen,
} from 'lucide-react'

const LAST_UPDATED = 'May 26, 2026'

const sections = [
  { id: 'introduction', n: '1', title: 'Introduction' },
  { id: 'information-we-collect', n: '2', title: 'What information we collect' },
  { id: 'how-we-use', n: '3', title: 'How we use your information' },
  { id: 'sharing-disclosure', n: '4', title: 'Sharing and disclosure' },
  { id: 'storage-security', n: '5', title: 'Data storage & security' },
  { id: 'your-rights', n: '6', title: 'Your rights under NDPR' },
  { id: 'cookies', n: '7', title: 'Cookies and tracking' },
  { id: 'international-transfers', n: '8', title: 'International transfers' },
  { id: 'children-privacy', n: '9', title: "Children's privacy" },
  { id: 'changes', n: '10', title: 'Changes to this policy' },
  { id: 'contact', n: '11', title: 'Contact us' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Privacy() {
  const [tocOpen, setTocOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('introduction')

  useEffect(() => {
    document.title = 'Privacy Policy — getranked.ng'
    const meta = document.querySelector('meta[name="description"]')
    const description =
      "getranked.ng's privacy policy. How we collect, use and protect your data under Nigeria's NDPR — written in plain English for Nigerian businesses."
    if (meta) {
      meta.setAttribute('content', description)
    } else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = description
      document.head.appendChild(m)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[var(--bg-primary)]">
      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden bg-[var(--bg-primary)] pt-16 md:pt-24 pb-12 md:pb-16">
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '720px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,184,166,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.4) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="container-main relative z-10">
          <motion.div
            className="max-w-[820px]"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(20,184,166,0.25)] bg-[rgba(20,184,166,0.08)] text-[var(--accent-teal)] text-label">
              <ShieldCheck className="w-3.5 h-3.5" /> LEGAL · NDPR-COMPLIANT
            </span>
            <h1 className="text-display-2 text-[var(--text-primary)] mb-5">
              Privacy <span className="text-gradient-amber">Policy</span>
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[640px] mb-6">
              We treat your data the way we'd want ours treated — minimally collected, securely
              stored, and never sold. This page explains exactly what we do with it.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-body-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4" /> Last updated: {LAST_UPDATED}
              </span>
              <span className="hidden sm:inline opacity-40">·</span>
              <span className="inline-flex items-center gap-2">
                <Lock className="w-4 h-4" /> NDPR-aware
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ MOBILE TOC ACCORDION ══════ */}
      <div className="lg:hidden container-main pb-4">
        <button
          onClick={() => setTocOpen((o) => !o)}
          className="w-full card-base p-4 flex items-center justify-between text-left"
          aria-expanded={tocOpen}
        >
          <span className="inline-flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-[var(--accent-amber)]" />
            <span className="font-jakarta font-semibold text-[var(--text-primary)]">
              Table of contents
            </span>
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${tocOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {tocOpen && (
          <motion.ol
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 card-base p-2 overflow-hidden"
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setTocOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <span className="font-mono text-xs text-[var(--text-muted)] mt-0.5 min-w-[20px]">
                    {s.n}
                  </span>
                  <span className="text-body-sm text-[var(--text-primary)]">{s.title}</span>
                </a>
              </li>
            ))}
          </motion.ol>
        )}
      </div>

      {/* ══════ MAIN CONTENT ══════ */}
      <section className="container-main pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
          {/* Sticky desktop ToC */}
          <aside className="hidden lg:block">
            <div className="sticky top-[88px]">
              <p className="text-label text-[var(--text-muted)] mb-4">ON THIS PAGE</p>
              <ol className="space-y-1 border-l border-[var(--border-default)]">
                {sections.map((s) => {
                  const active = activeId === s.id
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`block pl-4 py-2 -ml-px border-l-2 transition-all duration-200 text-body-sm ${
                          active
                            ? 'border-[var(--accent-amber)] text-[var(--text-primary)] font-semibold'
                            : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                        }`}
                      >
                        <span className="font-mono text-xs text-[var(--text-muted)] mr-2">
                          {s.n}.
                        </span>
                        {s.title}
                      </a>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-8 card-base p-5">
                <p className="text-label text-[var(--accent-amber)] mb-2">QUESTIONS?</p>
                <p className="text-body-sm text-[var(--text-secondary)] mb-3">
                  Our Data Protection Officer is one email away.
                </p>
                <a
                  href="mailto:privacy@getranked.ng"
                  className="inline-flex items-center gap-2 text-body-sm font-semibold text-[var(--accent-amber)] hover:text-[var(--accent-amber-hover)] transition-colors"
                >
                  <Mail className="w-4 h-4" /> privacy@getranked.ng
                </a>
              </div>
            </div>
          </aside>

          {/* Policy content */}
          <article className="max-w-[760px]">
            <Section id="introduction" n="1" title="Introduction">
              <p>
                getranked.ng ("we", "us", "our") is a Nigerian SEO and Generative Engine Optimisation
                (GEO) platform operated from Lagos, Nigeria. This Privacy Policy explains what
                information we collect when you visit our website, run an audit, subscribe to a plan,
                or contact our support team — and what we do with that information once it's in our
                hands.
              </p>
              <p>
                We've written this policy to comply with the Nigeria Data Protection Regulation (NDPR)
                issued by the National Information Technology Development Agency (NITDA), as well as
                international best practice. By using getranked.ng, you agree to the practices
                described here. If you don't agree, please stop using the service.
              </p>
            </Section>

            <Section id="information-we-collect" n="2" title="What information we collect">
              <p>
                We collect four broad categories of data, and only what we genuinely need to deliver
                the service you signed up for.
              </p>
              <h3 className="text-heading-3 text-[var(--text-primary)] mt-6 mb-2">
                Account information
              </h3>
              <p>
                When you create an account, we collect your full name, business name, email address,
                Nigerian phone number (used for WhatsApp delivery), and the password you set. If you
                pay for a plan, we also store your billing address and the city your business operates
                in.
              </p>
              <h3 className="text-heading-3 text-[var(--text-primary)] mt-6 mb-2">Site data</h3>
              <p>
                When you submit a URL for auditing, we crawl publicly accessible pages on that domain
                and store HTML snapshots, structured data, headings, internal links, and metadata.
                This is the raw material we use to generate your SEO and GEO scores.
              </p>
              <h3 className="text-heading-3 text-[var(--text-primary)] mt-6 mb-2">
                Usage analytics
              </h3>
              <p>
                We log pages visited, features used, audits run, and approximate location derived from
                IP address. We use this data to improve the product and to detect abuse. We never sell
                it.
              </p>
              <h3 className="text-heading-3 text-[var(--text-primary)] mt-6 mb-2">Payment data</h3>
              <p>
                Payments are processed entirely by Paystack (and Flutterwave for selected plans). We
                never see or store your full card number, CVV, or bank credentials. Paystack returns
                only a transaction reference and the last four digits of your card, which we keep for
                receipts and refund handling.
              </p>
            </Section>

            <Section id="how-we-use" n="3" title="How we use your information">
              <p>
                We use your data to run the service you paid for and nothing more. That means:
                delivering audits and reports, generating WhatsApp scorecards, sending billing
                receipts, responding to your support requests, and detecting fraud or abuse on our
                platform.
              </p>
              <p>
                We also use aggregated, non-identifiable usage data to improve our scoring models, to
                understand which features Nigerian businesses actually use, and to benchmark the
                Nigerian SEO and GEO landscape. We do not use your data to train third-party AI
                models, and we do not sell your data to advertisers, data brokers, or anyone else —
                full stop.
              </p>
            </Section>

            <Section id="sharing-disclosure" n="4" title="Sharing and disclosure">
              <p>
                We share your data only with the vendors who help us deliver the service: Paystack and
                Flutterwave for payments, our cloud hosting provider for storage and compute, OpenAI
                and Google for the AI features you explicitly trigger, and our email and WhatsApp
                delivery providers for reports. Each of these vendors is contractually bound to use
                your data only for the purpose we engage them for.
              </p>
              <p>
                We will also disclose information when legally required — for example, in response to
                a valid Nigerian court order, NITDA enquiry, or law enforcement request. We will
                always push back on requests that are overbroad or unlawful, and we'll notify you
                where we are legally permitted to do so.
              </p>
            </Section>

            <Section id="storage-security" n="5" title="Data storage & security">
              <p>
                Your account data is stored primarily on infrastructure located in the European Union
                and the United States, operated by tier-1 cloud providers (AWS and Google Cloud).
                Site-audit data and reports are stored in encrypted-at-rest databases with
                role-restricted access. All connections between your browser and getranked.ng are
                encrypted using TLS 1.3.
              </p>
              <p>
                We follow NDPR security requirements: access controls, audit logging, regular
                vulnerability scans, and an incident response plan that requires us to notify NITDA
                and affected users within 72 hours of becoming aware of a personal-data breach. No
                online service can promise perfect security, but we take this seriously and we
                regularly review our practices.
              </p>
            </Section>

            <Section id="your-rights" n="6" title="Your rights under NDPR">
              <p>
                Under the Nigeria Data Protection Regulation, you have specific rights over the
                personal data we hold about you, and we have a duty to honour them within thirty (30)
                days of a verified request:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-body-lg text-[var(--text-secondary)]">
                <li>
                  <strong className="text-[var(--text-primary)]">Right of access</strong> — you can
                  request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">Right of correction</strong> — you
                  can ask us to fix inaccurate or incomplete data.
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">Right of deletion</strong> — you can
                  ask us to delete your account and the personal data attached to it.
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">Right to portability</strong> — you
                  can ask us to export your data in a machine-readable format (JSON or CSV).
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">Right to withdraw consent</strong> —
                  where we rely on your consent (e.g. marketing emails), you can withdraw it at any
                  time.
                </li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email{' '}
                <a
                  href="mailto:privacy@getranked.ng"
                  className="text-[var(--accent-amber)] underline-offset-4 hover:underline"
                >
                  privacy@getranked.ng
                </a>{' '}
                from the address on file. If we can't resolve your concern, you have the right to
                complain to NITDA directly.
              </p>
            </Section>

            <Section id="cookies" n="7" title="Cookies and tracking">
              <p>
                We use a small set of cookies: a session cookie to keep you signed in, a theme cookie
                to remember your light or dark mode preference, and a privacy-respecting analytics
                cookie (no cross-site tracking, no advertising profiles) to count visits and feature
                usage. We do not use Facebook Pixel, Google AdSense personalisation, or any
                third-party advertising tracker.
              </p>
              <p>
                You can disable cookies in your browser settings; the site will still work, but you'll
                need to sign in on every visit. We honour the "Do Not Track" browser signal where it
                is set.
              </p>
            </Section>

            <Section id="international-transfers" n="8" title="International transfers">
              <p>
                Because some of our infrastructure providers (AWS, Google Cloud, OpenAI, the email and
                WhatsApp delivery vendors) are headquartered outside Nigeria, your personal data may
                be transferred to, and processed in, jurisdictions other than Nigeria — typically the
                European Union and the United States.
              </p>
              <p>
                We only work with providers whose data-processing terms meet or exceed NDPR
                requirements, and we rely on standard contractual clauses or equivalent safeguards
                where required. If you would prefer your data not to leave Nigeria, please email us
                and we'll discuss what is feasible.
              </p>
            </Section>

            <Section id="children-privacy" n="9" title="Children's privacy">
              <p>
                getranked.ng is a B2B service for Nigerian businesses. It is not intended for, and we
                do not knowingly collect personal data from, anyone under the age of 18. If you
                believe a minor has created an account, please contact us and we will delete the
                account and any associated data without delay.
              </p>
            </Section>

            <Section id="changes" n="10" title="Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time — for example, when we launch a
                new feature, change a vendor, or respond to updated Nigerian regulation. When we make
                material changes, we will update the "Last updated" date at the top of this page and
                notify active subscribers by email at least 14 days before the changes take effect.
              </p>
              <p>
                Continued use of getranked.ng after a policy change means you accept the updated
                policy. If you don't agree, you can close your account at any time and we'll delete
                your data in line with section 6.
              </p>
            </Section>

            <Section id="contact" n="11" title="Contact us">
              <p>
                We have a NITDA-registered Data Protection Officer who handles all NDPR enquiries,
                data subject requests, and security disclosures. The fastest way to reach the DPO is
                by email — we aim to respond within two working days, and always within the
                thirty-day NDPR deadline.
              </p>
              <div className="card-base p-6 mt-6">
                <p className="text-label text-[var(--accent-amber)] mb-3">
                  DATA PROTECTION OFFICER
                </p>
                <p className="text-body-lg text-[var(--text-primary)] font-semibold mb-1">
                  getranked.ng — Office of the DPO
                </p>
                <p className="text-body-sm text-[var(--text-secondary)] mb-4">
                  Yaba, Lagos, Federal Republic of Nigeria
                </p>
                <a
                  href="mailto:privacy@getranked.ng"
                  className="inline-flex items-center gap-2 text-body-lg font-semibold text-[var(--accent-amber)] hover:text-[var(--accent-amber-hover)] transition-colors"
                >
                  <Mail className="w-5 h-5" /> privacy@getranked.ng
                </a>
              </div>
            </Section>

            {/* Bottom CTA */}
            <div className="mt-14 pt-10 border-t border-[var(--border-default)]">
              <p className="text-body-sm text-[var(--text-muted)] mb-4">RELATED</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/terms" className="btn-secondary">
                  Read our Terms <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/" className="btn-ghost">
                  Back to home
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-sm text-[var(--text-muted)]">{n.padStart(2, '0')}</span>
        <h2 className="text-heading-2 text-[var(--text-primary)]">{title}</h2>
      </div>
      <div className="space-y-4 text-body-lg text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  )
}
