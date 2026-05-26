import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  X,
  Shield,
  Lock,
  CreditCard,
  MessageCircle,
  Sparkles,
  Zap,
  TrendingUp,
  Building2,
  Star
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

/* ─── Animated Price Counter ─── */
function AnimatedPrice({ value, prefix = '₦', suffix = '' }: { value: string; prefix?: string; suffix?: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="inline-block"
      >
        {prefix}{value}{suffix}
      </motion.span>
    </AnimatePresence>
  )
}

/* ─── Glow Orb ─── */
function GlowOrb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

/* ─── Feature Row ─── */
const features = [
  { name: 'GEO Audit Report', geo: true, starter: true, growth: true, enterprise: true },
  { name: 'AI Search Visibility Score', geo: true, starter: true, growth: true, enterprise: true },
  { name: 'Brand Mention Analysis', geo: true, starter: true, growth: true, enterprise: true },
  { name: 'Sentiment Tracking', geo: true, starter: true, growth: true, enterprise: true },
  { name: 'Competitor Comparison', geo: true, starter: true, growth: true, enterprise: true },
  { name: 'LLMs.txt Generator', geo: false, starter: true, growth: true, enterprise: true },
  { name: 'Schema Markup Builder', geo: false, starter: true, growth: true, enterprise: true },
  { name: 'GEO Content Briefs', geo: false, starter: '5/mo', growth: '20/mo', enterprise: 'Unlimited' },
  { name: 'Citation Monitoring', geo: false, starter: true, growth: true, enterprise: true },
  { name: 'E-E-A-T Signals', geo: false, starter: true, growth: true, enterprise: true },
  { name: 'Keyword Rank Tracking', geo: false, starter: '50', growth: '500', enterprise: '5,000' },
  { name: 'API Access', geo: false, starter: false, growth: true, enterprise: true },
  { name: 'White-label Reports', geo: false, starter: false, growth: true, enterprise: true },
  { name: 'Multi-location Support', geo: false, starter: '1', growth: '10', enterprise: 'Unlimited' },
  { name: 'Team Members', geo: false, starter: '2', growth: '10', enterprise: 'Unlimited' },
  { name: 'Priority Support', geo: false, starter: false, growth: true, enterprise: true },
  { name: 'Dedicated Account Manager', geo: false, starter: false, growth: false, enterprise: true },
  { name: 'Custom Integrations', geo: false, starter: false, growth: false, enterprise: true },
  { name: 'Weekly Strategy Calls', geo: false, starter: false, growth: false, enterprise: true },
  { name: 'SLA Guarantee', geo: false, starter: false, growth: false, enterprise: true },
  { name: 'Onboarding & Training', geo: false, starter: 'Self-serve', growth: 'Guided', enterprise: 'White-glove' },
  { name: 'Data Retention', geo: false, starter: '6 months', growth: '1 year', enterprise: '3 years' },
]

/* ─── Pricing Cards Data ─── */
const plans = [
  {
    id: 'geo',
    name: 'GEO Audit',
    description: 'Complete AI visibility assessment',
    eyebrow: 'ONE-TIME',
    eyebrowColor: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
    priceOriginal: '150,000',
    price: '100,000',
    period: '',
    featured: false,
    glowClass: '',
    features: [
      'Full GEO Audit Report',
      'AI Search Visibility Score',
      'Brand Mention Analysis',
      'Sentiment Tracking',
      'Competitor Comparison',
      'Actionable Recommendations',
      'PDF + Interactive Dashboard',
    ],
    cta: 'Get Your Audit',
    ctaStyle: 'secondary' as const,
    icon: Sparkles,
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses',
    eyebrow: 'STARTER',
    eyebrowColor: 'bg-emerald-500/15 text-emerald-500',
    price: '150,000',
    period: '/mo',
    featured: false,
    glowClass: 'ring-1 ring-emerald-500/30',
    features: [
      'Everything in GEO Audit',
      'LLMs.txt Generator',
      'Schema Markup Builder',
      '5 GEO Content Briefs/mo',
      'Citation Monitoring',
      'E-E-A-T Signals',
      '50 Keywords Tracked',
      '2 Team Members',
      'Email Support',
    ],
    cta: 'Start Growing',
    ctaStyle: 'secondary' as const,
    icon: Zap,
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'For scaling companies',
    eyebrow: 'MOST POPULAR',
    eyebrowColor: 'bg-emerald-500/15 text-emerald-500',
    price: '500,000',
    period: '/mo',
    featured: true,
    glowClass: 'ring-2 ring-emerald-500/50 animate-glow-pulse',
    features: [
      'Everything in Starter',
      '20 GEO Content Briefs/mo',
      'API Access',
      'White-label Reports',
      '10 Location Support',
      '500 Keywords Tracked',
      '10 Team Members',
      'Priority Support',
      'Weekly Strategy Digest',
    ],
    cta: 'Scale Up',
    ctaStyle: 'primary' as const,
    icon: TrendingUp,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    eyebrow: 'CUSTOM',
    eyebrowColor: 'bg-purple-500/15 text-purple-500',
    price: '1,500,000 – 3,000,000',
    period: '/mo',
    featured: false,
    glowClass: 'ring-1 ring-purple-500/30',
    features: [
      'Everything in Growth',
      'Unlimited Content Briefs',
      'Unlimited Locations',
      '5,000 Keywords Tracked',
      'Unlimited Team Members',
      'Dedicated Account Manager',
      'Custom Integrations',
      'Weekly Strategy Calls',
      'SLA Guarantee',
      'White-glove Onboarding',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'secondary' as const,
    icon: Building2,
  },
]

/* ─── FAQ Data ─── */
const faqs = [
  {
    question: 'What is a GEO Audit and what do I get?',
    answer: 'A GEO (Generative Engine Optimization) Audit is a comprehensive analysis of your brand\'s visibility across AI-powered search engines like ChatGPT, Google SGE, and Perplexity. You\'ll receive a detailed report with your visibility score, brand mention analysis, sentiment tracking, competitor comparison, and actionable recommendations to improve your AI presence.',
  },
  {
    question: 'How does the pricing work? Can I start with just an audit?',
    answer: 'Absolutely! The GEO Audit is a one-time ₦100,000 engagement with no commitment. After seeing your results, you can choose to subscribe to any monthly plan. There\'s no pressure — many clients start with the audit to understand their baseline before scaling up.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including Visa, Mastercard, and Verve cards, all processed securely through Paystack. For Enterprise plans, we also support bank transfers and can accommodate procurement processes with NET-30 terms.',
  },
  {
    question: 'Can I change plans or cancel anytime?',
    answer: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time from your dashboard. When you upgrade, you\'ll get immediate access to new features. When you downgrade, changes take effect at your next billing cycle.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'We offer a 7-day money-back guarantee on all monthly subscriptions. If you\'re not satisfied with our service within the first 7 days, contact us for a full refund — no questions asked. GEO Audits are non-refundable once the report is delivered.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes! When you choose annual billing, you save 20% compared to monthly payments. That\'s up to ₦7.2M in savings on our Enterprise plan. Annual subscribers also get priority support and early access to new features.',
  },
]

/* ─── Main Pricing Page ─── */
export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  const getAnnualPrice = (price: string) => {
    if (price.includes('–')) return price
    const num = parseInt(price.replace(/,/g, ''))
    if (isNaN(num)) return price
    return Math.round(num * 0.8).toLocaleString()
  }

  return (
    <div className="relative overflow-hidden">
      {/* ─── Ambient Glow Orbs ─── */}
      <GlowOrb className="w-[500px] h-[500px] bg-emerald-500/10 -top-48 -left-48" />
      <GlowOrb className="w-[400px] h-[400px] bg-purple-500/10 top-[20%] -right-48" />
      <GlowOrb className="w-[350px] h-[350px] bg-teal-500/8 top-[50%] -left-32" />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-20 pb-16">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="eyebrow bg-emerald-500/10 text-emerald-500 mb-6">
              <Star className="w-3.5 h-3.5" />
              PRICING
            </span>
            <h1 className="text-display-2 text-[var(--text-primary)] mb-5 max-w-3xl">
              Simple Pricing. <span className="text-gradient-amber">Powerful Results.</span>
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-xl">
              Start with a one-time GEO audit, then scale as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BILLING TOGGLE ═══════════ */}
      <section className="relative pb-12">
        <div className="container-main flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-flex items-center gap-0 p-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-default)]"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-6 py-2.5 rounded-full font-jakarta font-semibold text-sm transition-all duration-300 ${
                !isAnnual
                  ? 'bg-emerald-500 text-[var(--brand-on-primary)] shadow-glow'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-6 py-2.5 rounded-full font-jakarta font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                isAnnual
                  ? 'bg-emerald-500 text-[var(--brand-on-primary)] shadow-glow'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Annual
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isAnnual ? 'bg-[#04140C]/20' : 'bg-emerald-500/15 text-emerald-500'
              }`}>
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PRICING CARDS ═══════════ */}
      <section className="relative pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`relative flex flex-col ${plan.glowClass} rounded-2xl`}
                >
                  {/* Featured badge */}
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-[var(--brand-on-primary)] text-xs font-bold">
                        <Sparkles className="w-3 h-3" />
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className={`card-base p-6 flex flex-col flex-1 ${
                    plan.featured ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-500/5 to-transparent' : ''
                  }`}>
                    {/* Header */}
                    <div className="mb-5">
                      <span className={`eyebrow ${plan.eyebrowColor} mb-3`}>
                        {plan.eyebrow === 'ONE-TIME' && <Sparkles className="w-3.5 h-3.5" />}
                        {plan.eyebrow === 'STARTER' && <Zap className="w-3.5 h-3.5" />}
                        {plan.eyebrow === 'MOST POPULAR' && <Star className="w-3.5 h-3.5" />}
                        {plan.eyebrow === 'CUSTOM' && <Building2 className="w-3.5 h-3.5" />}
                        {plan.eyebrow}
                      </span>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${
                          plan.id === 'geo' ? 'text-[var(--text-muted)]' :
                          plan.id === 'starter' ? 'text-[var(--text-secondary)]' :
                          plan.id === 'growth' ? 'text-emerald-500' :
                          'text-purple-500'
                        }`} />
                        <h3 className="text-heading-3 text-[var(--text-primary)]">{plan.name}</h3>
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-5 pb-5 border-b border-[var(--border-default)]">
                      {plan.priceOriginal && (
                        <span className="text-sm text-[var(--text-muted)] line-through mr-2">
                          ₦{plan.priceOriginal}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-data-lg text-[var(--text-primary)]">
                          {plan.id === 'geo' ? (
                            <>
                              <AnimatedPrice value={plan.price} />
                            </>
                          ) : plan.id === 'enterprise' ? (
                            <span className="text-data-md">₦{plan.price}</span>
                          ) : (
                            <AnimatedPrice
                              value={isAnnual ? getAnnualPrice(plan.price) : plan.price}
                              suffix={isAnnual ? '/mo' : '/mo'}
                            />
                          )}
                        </span>
                      </div>
                      {plan.id === 'geo' ? (
                        <p className="text-xs text-[var(--text-muted)] mt-1">one-time payment &middot; ≈ $65 USD</p>
                      ) : plan.id === 'enterprise' ? (
                        <p className="text-xs text-[var(--text-muted)] mt-1">per month &middot; contact for quote</p>
                      ) : isAnnual ? (
                        <p className="text-xs text-emerald-500 mt-1 font-medium">
                          You save ₦{Math.round(parseInt(plan.price.replace(/,/g, '')) * 0.2 * 12).toLocaleString()}/year
                        </p>
                      ) : (
                        <p className="text-xs text-[var(--text-muted)] mt-1">per month &middot; billed monthly</p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            plan.featured ? 'text-emerald-500' : 'text-emerald-500'
                          }`} />
                          <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={plan.id === 'geo' ? '/geo-audit' : plan.id === 'enterprise' ? '/contact' : '/checkout'}
                      className={`w-full ${
                        plan.ctaStyle === 'primary' ? 'btn-primary' : 'btn-secondary'
                      } ${plan.featured ? 'shadow-glow' : ''}`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURE COMPARISON TABLE ═══════════ */}
      <section className="relative pb-24">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
              Compare All <span className="text-gradient-amber">Features</span>
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)]">
              Everything you need to dominate AI search results
            </p>
          </motion.div>

          <div ref={tableRef} className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                {/* Sticky Header */}
                <thead className="sticky top-0 z-10">
                  <tr className="border-b border-[var(--border-default)] bg-[var(--bg-secondary)]/80 backdrop-blur-sm">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[var(--text-primary)] w-[35%]">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-[var(--text-muted)] w-[16%]">
                      GEO Audit
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-[var(--text-secondary)] w-[16%]">
                      <span className="inline-flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        Starter
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-emerald-500 w-[16%] bg-emerald-500/5">
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        Growth
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-purple-500 w-[16%]">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={index}
                      className={`border-b border-[var(--border-default)] transition-colors hover:bg-[var(--bg-tertiary)]/30 ${
                        index % 2 === 0 ? 'bg-transparent' : 'bg-[var(--bg-tertiary)]/10'
                      }`}
                    >
                      <td className="py-3.5 px-6 text-sm text-[var(--text-primary)] font-medium">
                        {feature.name}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {renderCell(feature.geo)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {renderCell(feature.starter)}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-emerald-500/[0.04]">
                        {renderCell(feature.growth)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {renderCell(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PAYSTACK TRUST ═══════════ */}
      <section className="relative pb-24">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Paystack Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0AA1FF] flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Paystack</span>
              </div>

              <div className="hidden md:block w-px h-10 bg-[var(--border-default)]" />

              {/* Card Icons */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]">
                  <svg className="w-6 h-4" viewBox="0 0 48 16" fill="none">
                    <rect width="48" height="16" rx="2" fill="#1A1F71"/>
                    <path d="M19.2 13.2L20 2.8H22.8L22 13.2H19.2Z" fill="white"/>
                    <path d="M30.4 3C29.8 2.8 28.8 2.6 27.6 2.6C25 2.6 23.2 3.8 23.2 5.6C23.2 6.8 24.4 7.6 25.2 8C26 8.4 26.4 8.6 26.4 9C26.4 9.6 25.6 9.8 24.8 9.8C23.8 9.8 23 9.6 22.2 9.2L21.8 9L21.4 11.4C22.2 11.8 23.4 12 24.6 12C27.4 12 29.2 10.8 29.2 9C29.2 7.8 28.4 7 27 6.4C26.2 6 25.8 5.8 25.8 5.4C25.8 5 26.2 4.8 27 4.8C27.8 4.8 28.4 5 29 5.2L29.2 5.2L30.4 3Z" fill="white"/>
                  </svg>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Visa</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]">
                  <svg className="w-6 h-4" viewBox="0 0 48 16" fill="none">
                    <circle cx="16" cy="8" r="6" fill="#EB001B"/>
                    <circle cx="22" cy="8" r="6" fill="#F79E1B"/>
                    <path d="M19 3.5C20.2 4.5 21 6.1 21 8C21 9.9 20.2 11.5 19 12.5C17.8 11.5 17 9.9 17 8C17 6.1 17.8 4.5 19 3.5Z" fill="#FF5F00"/>
                  </svg>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Mastercard</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)]">
                  <svg className="w-6 h-4" viewBox="0 0 48 16" fill="none">
                    <rect width="48" height="16" rx="2" fill="#00A651"/>
                    <text x="24" y="11" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">VERVE</text>
                  </svg>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Verve</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-[var(--border-default)]" />

              {/* SSL / Security */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">PCI Compliant</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 pt-5 border-t border-[var(--border-default)]">
              <p className="text-sm text-[var(--text-muted)]">
                Secured by <span className="text-[var(--text-primary)] font-medium">Paystack</span>
                {' · '}
                SSL 256-bit Encryption
                {' · '}
                T+1 Settlement
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="relative pb-24">
        <div className="container-main max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
              Frequently Asked <span className="text-gradient-amber">Questions</span>
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)]">
              Everything you need to know about our pricing and plans
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="glass-panel border-0 rounded-xl overflow-hidden px-6 data-[state=open]:border-emerald-500/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-[var(--text-primary)] font-semibold text-sm py-5 hover:no-underline [&[data-state=open]>svg]:text-emerald-500">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--text-secondary)] text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="relative pb-24">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent border border-emerald-500/20 p-10 md:p-16 text-center"
          >
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
                Still have <span className="text-gradient-amber">questions?</span>
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                Our team is ready to help you choose the right plan. Reach out on WhatsApp and we&apos;ll respond within minutes.
              </p>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] font-jakarta font-semibold text-base bg-[#25D366] text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-whatsapp active:scale-[0.97]"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/* ─── Cell Renderer for Feature Table ─── */
function renderCell(value: boolean | string) {
  if (value === true) {
    return (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15">
        <Check className="w-3.5 h-3.5 text-emerald-500" />
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--bg-tertiary)]">
        <X className="w-3.5 h-3.5 text-[var(--text-muted)]" />
      </div>
    )
  }
  // String value
  if (value === 'Unlimited') {
    return <span className="text-xs font-semibold text-emerald-500">Unlimited</span>
  }
  return <span className="text-xs text-[var(--text-secondary)]">{value}</span>
}
