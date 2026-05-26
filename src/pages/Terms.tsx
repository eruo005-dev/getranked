import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ScrollText, ChevronDown, Mail, ArrowRight, Scale, FileText, BookOpen,
} from 'lucide-react'

const LAST_UPDATED = 'May 26, 2026'

const sections = [
  { id: 'acceptance', n: '1', title: 'Acceptance of terms' },
  { id: 'account-registration', n: '2', title: 'Account registration' },
  { id: 'subscription-billing', n: '3', title: 'Subscription & billing' },
  { id: 'acceptable-use', n: '4', title: 'Acceptable use' },
  { id: 'intellectual-property', n: '5', title: 'Intellectual property' },
  { id: 'third-party-services', n: '6', title: 'Third-party services' },
  { id: 'disclaimers', n: '7', title: 'Disclaimers' },
  { id: 'limitation-liability', n: '8', title: 'Limitation of liability' },
  { id: 'termination', n: '9', title: 'Termination' },
  { id: 'governing-law', n: '10', title: 'Governing law' },
  { id: 'dispute-resolution', n: '11', title: 'Dispute resolution' },
  { id: 'changes', n: '12', title: 'Changes to terms' },
  { id: 'contact', n: '13', title: 'Contact' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Terms() {
  const [tocOpen, setTocOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('acceptance')

  useEffect(() => {
    document.title = 'Terms of Service — getranked'
    const meta = document.querySelector('meta[name="description"]')
    const description =
      "The Terms of Service for getranked — Nigeria's first SEO + GEO platform. Billing, refunds, acceptable use and governing law under Nigerian jurisdiction."
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
            background: 'radial-gradient(circle, rgba(5, 150, 105,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(5, 150, 105,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 150, 105,0.4) 1px, transparent 1px)',
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[rgba(5, 150, 105,0.25)] bg-[rgba(5, 150, 105,0.08)] text-[var(--accent-amber)] text-label">
              <ScrollText className="w-3.5 h-3.5" /> LEGAL · GOVERNED BY NIGERIAN LAW
            </span>
            <h1 className="text-display-2 text-[var(--text-primary)] mb-5">
              Terms of <span className="text-gradient-amber">Service</span>
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[640px] mb-6">
              The agreement between you and getranked. Written in plain English so you can
              actually read it. Read carefully — using the service means you accept these terms.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-body-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4" /> Last updated: {LAST_UPDATED}
              </span>
              <span className="hidden sm:inline opacity-40">·</span>
              <span className="inline-flex items-center gap-2">
                <Scale className="w-4 h-4" /> Lagos, Nigeria
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
                <p className="text-label text-[var(--accent-amber)] mb-2">LEGAL CONTACT</p>
                <p className="text-body-sm text-[var(--text-secondary)] mb-3">
                  Questions about these terms? Email our legal desk.
                </p>
                <a
                  href="mailto:legal@getranked.ng"
                  className="inline-flex items-center gap-2 text-body-sm font-semibold text-[var(--accent-amber)] hover:text-[var(--accent-amber-hover)] transition-colors"
                >
                  <Mail className="w-4 h-4" /> legal@getranked.ng
                </a>
              </div>
            </div>
          </aside>

          {/* Terms content */}
          <article className="max-w-[760px]">
            <Section id="acceptance" n="1" title="Acceptance of terms">
              <p>
                These Terms of Service ("Terms") form a binding agreement between you (or the
                business you represent) and getranked ("we", "us", "the service"). They cover your
                use of our website, dashboards, audit tools, APIs and any related services.
              </p>
              <p>
                By creating an account, running an audit, subscribing to a plan, or otherwise using
                getranked, you confirm that you have read these Terms, that you agree to them, and
                that you are at least 18 years old and authorised to enter into this agreement on
                behalf of the business you represent. If you don't agree, please don't use the
                service.
              </p>
            </Section>

            <Section id="account-registration" n="2" title="Account registration">
              <p>
                You need an account to use most parts of getranked. When you register, you agree to
                provide accurate, current and complete information — including a working email
                address, a Nigerian phone number for WhatsApp delivery (where applicable), and the
                legal name of the business you represent.
              </p>
              <p>
                You are responsible for keeping your account credentials confidential, for everything
                that happens under your account, and for notifying us immediately if you suspect
                unauthorised access. We reserve the right to suspend any account that we reasonably
                believe has been compromised, until ownership can be verified.
              </p>
            </Section>

            <Section id="subscription-billing" n="3" title="Subscription & billing">
              <p>
                getranked is offered on monthly and annual subscription plans, billed in Nigerian
                Naira. All payments are processed through Paystack as our primary processor, with
                Flutterwave available as a fallback for selected plans. We never store your full card
                details — only the transaction reference and the last four digits.
              </p>
              <p>
                Monthly plans renew automatically on the same date each month. Annual plans renew on
                the anniversary of your subscription start date and include a discount over the
                monthly equivalent. You can cancel at any time from your dashboard or by emailing
                support; cancellation takes effect at the end of your current billing period.
              </p>
              <h3 className="text-heading-3 text-[var(--text-primary)] mt-6 mb-2">
                7-day money-back guarantee
              </h3>
              <p>
                We offer a no-questions-asked refund within seven (7) days of your first paid month,
                provided you have not exceeded the fair-use thresholds published on our pricing page.
                After day seven, fees for the current billing period are non-refundable, but you
                won't be charged again once you cancel. Refunds are returned to the original payment
                method via Paystack within 5–10 working days.
              </p>
              <p>
                If a renewal payment fails, we will retry the charge over the following three days
                and notify you by email and WhatsApp. If we cannot collect after that, your account
                will be paused until payment is resolved. Persistent non-payment may result in
                account closure under section 9.
              </p>
            </Section>

            <Section id="acceptable-use" n="4" title="Acceptable use">
              <p>
                We've built getranked to help Nigerian businesses grow honestly. To keep the
                service useful for everyone, you agree not to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-body-lg text-[var(--text-secondary)]">
                <li>
                  use the service to crawl, audit or analyse websites you do not own or have explicit
                  permission to audit;
                </li>
                <li>
                  attempt to reverse-engineer, scrape, or otherwise extract our scoring models,
                  databases, or proprietary data;
                </li>
                <li>
                  resell, sublicense, or white-label getranked without a written reseller
                  agreement signed by both parties;
                </li>
                <li>
                  upload malicious code, attempt to gain unauthorised access to other accounts, or
                  interfere with the service's normal operation;
                </li>
                <li>
                  use the service for activity that violates Nigerian law, including but not limited
                  to financial fraud, impersonation, or distribution of unlawful content.
                </li>
              </ul>
              <p className="mt-4">
                We reserve the right to suspend or terminate accounts that breach this section,
                without refund, and to cooperate with Nigerian law enforcement where required.
              </p>
            </Section>

            <Section id="intellectual-property" n="5" title="Intellectual property">
              <p>
                The getranked platform — including our scoring algorithms, dashboards, copy,
                designs, logos, and documentation — is owned by us and protected by Nigerian and
                international copyright, trademark and trade-secret law. Subscribing to a plan gives
                you a limited, non-exclusive, non-transferable licence to use the service for your
                own business; it does not transfer ownership of any of our intellectual property.
              </p>
              <p>
                You retain full ownership of the websites, content and data you submit to the
                platform. By using the service, you grant us a limited licence to crawl, store and
                process that data solely to deliver the audits, reports and features you have asked
                for. We never claim ownership of your content.
              </p>
            </Section>

            <Section id="third-party-services" n="6" title="Third-party services">
              <p>
                getranked relies on a small number of trusted third-party services to deliver
                payments, AI features and integrations. These currently include Paystack and
                Flutterwave for payment processing, OpenAI for selected GEO content analysis, and the
                Google Search Console, Google Business Profile and Google PageSpeed Insights APIs for
                ranking and performance data.
              </p>
              <p>
                Your use of any feature that depends on a third-party provider is also subject to
                that provider's own terms and privacy policies. We are not responsible for outages,
                pricing changes, or policy changes on those platforms, but we will always communicate
                clearly when a third-party change materially affects how getranked works.
              </p>
            </Section>

            <Section id="disclaimers" n="7" title="Disclaimers">
              <p>
                getranked is provided on an "as is" and "as available" basis. While we work hard
                to deliver accurate audits, sound recommendations and reliable infrastructure, search
                engines and AI assistants are external systems that we do not control.
              </p>
              <p>
                We do not guarantee specific rankings on Google, specific mentions in ChatGPT, Claude,
                Perplexity or Gemini, specific traffic outcomes, or specific revenue results. Our
                recommendations are based on current best practice and our analysis of your site — the
                actual results depend on competition, market conditions, the quality of your
                implementation, and changes to underlying platforms. Anyone promising you guaranteed
                rankings on the Nigerian internet is selling you a story.
              </p>
            </Section>

            <Section id="limitation-liability" n="8" title="Limitation of liability">
              <p>
                To the maximum extent permitted by Nigerian law, getranked, its officers,
                employees and partners are not liable for any indirect, incidental, special,
                consequential or punitive damages — including lost profits, lost revenue, lost data,
                or business interruption — arising from your use of the service.
              </p>
              <p>
                Our total aggregate liability for any claim arising out of or related to these Terms
                is limited to the amount you paid us in the twelve (12) months preceding the event
                giving rise to the claim. Nothing in this section excludes any liability that cannot
                be excluded under Nigerian law, including liability for gross negligence or wilful
                misconduct.
              </p>
            </Section>

            <Section id="termination" n="9" title="Termination">
              <p>
                You may close your account at any time from the dashboard or by emailing support.
                Once closed, your access to the service ends at the end of the current billing
                period, and we will delete or anonymise your personal data in line with our Privacy
                Policy.
              </p>
              <p>
                We may suspend or terminate your account if you materially breach these Terms, if
                payment fails persistently, or if we are legally required to do so. Where we
                terminate for cause, no refund of any prepaid fees is due. We will always give you
                reasonable notice and an opportunity to remedy a breach where it is practical to do
                so.
              </p>
            </Section>

            <Section id="governing-law" n="10" title="Governing law">
              <p>
                These Terms, and any non-contractual obligations arising out of them, are governed by
                and construed in accordance with the laws of the Federal Republic of Nigeria. Subject
                to the dispute-resolution process in section 11, the courts of Lagos State, Nigeria,
                have exclusive jurisdiction to settle any dispute that cannot be resolved otherwise.
              </p>
            </Section>

            <Section id="dispute-resolution" n="11" title="Dispute resolution">
              <p>
                If you have a dispute with us, please email{' '}
                <a
                  href="mailto:legal@getranked.ng"
                  className="text-[var(--accent-amber)] underline-offset-4 hover:underline"
                >
                  legal@getranked.ng
                </a>{' '}
                with a clear description of the issue. We commit to acknowledging your complaint
                within five working days and to working with you in good faith to reach an amicable
                resolution within thirty (30) days.
              </p>
              <p>
                If we cannot resolve the dispute through direct discussion, both parties agree to
                attempt mediation through the Lagos Multi-Door Courthouse before commencing any
                formal court proceedings. Nothing in this section prevents either party from seeking
                urgent injunctive or equitable relief from a Nigerian court where necessary.
              </p>
            </Section>

            <Section id="changes" n="12" title="Changes to terms">
              <p>
                We may revise these Terms from time to time to reflect new features, pricing
                adjustments, or changes in Nigerian law. When we make material changes, we will
                update the "Last updated" date at the top of this page and notify active subscribers
                by email at least 14 days before the changes take effect.
              </p>
              <p>
                Continued use of the service after a change takes effect means you accept the
                updated Terms. If you don't agree with a change, you can cancel before it takes
                effect and we'll honour a pro-rata refund of any prepaid annual fees for the
                remaining unused months.
              </p>
            </Section>

            <Section id="contact" n="13" title="Contact">
              <p>
                For legal matters relating to these Terms — including refund disputes, account
                suspensions, intellectual property concerns, or reseller enquiries — please contact
                our legal desk. For general support questions, the support team in your dashboard
                will get you a faster answer.
              </p>
              <div className="card-base p-6 mt-6">
                <p className="text-label text-[var(--accent-amber)] mb-3">LEGAL DESK</p>
                <p className="text-body-lg text-[var(--text-primary)] font-semibold mb-1">
                  getranked Limited
                </p>
                <p className="text-body-sm text-[var(--text-secondary)] mb-4">
                  Yaba, Lagos, Federal Republic of Nigeria
                </p>
                <a
                  href="mailto:legal@getranked.ng"
                  className="inline-flex items-center gap-2 text-body-lg font-semibold text-[var(--accent-amber)] hover:text-[var(--accent-amber-hover)] transition-colors"
                >
                  <Mail className="w-5 h-5" /> legal@getranked.ng
                </a>
              </div>
            </Section>

            {/* Bottom CTA */}
            <div className="mt-14 pt-10 border-t border-[var(--border-default)]">
              <p className="text-body-sm text-[var(--text-muted)] mb-4">RELATED</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/privacy" className="btn-secondary">
                  Read our Privacy Policy <ArrowRight className="w-4 h-4" />
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
