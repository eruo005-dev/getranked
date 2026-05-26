import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Sparkles,
  Zap,
  TrendingUp,
  Building2,
  ChevronRight,
  User,
  Package,
  Clock,
  Download,
  X,
  Banknote,
  Wallet
} from 'lucide-react'

/* ─── Glow Orb ─── */
function GlowOrb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

/* ─── Animated Checkmark ─── */
function AnimatedCheckmark() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-emerald-500/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8, delay: 0.1 }}
      />
      <motion.div
        className="absolute inset-4 rounded-full bg-emerald-500 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>
      {/* Glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  )
}

/* ─── Plan Type ─── */
type PlanType = 'starter' | 'growth' | 'enterprise'

interface Plan {
  id: PlanType
  name: string
  price: string
  annualPrice: string
  period: string
  description: string
  icon: typeof Zap
  color: string
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '150,000',
    annualPrice: '120,000',
    period: '/mo',
    description: 'Perfect for small businesses starting their GEO journey.',
    icon: Zap,
    color: 'text-amber-500',
    features: [
      'GEO Audit included',
      'LLMs.txt Generator',
      'Schema Markup Builder',
      '5 GEO Content Briefs/mo',
      'Citation Monitoring',
      '2 Team Members',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '500,000',
    annualPrice: '400,000',
    period: '/mo',
    description: 'For scaling companies ready to dominate AI search.',
    icon: TrendingUp,
    color: 'text-teal-500',
    features: [
      'Everything in Starter',
      '20 GEO Content Briefs/mo',
      'API Access',
      'White-label Reports',
      '10 Location Support',
      'Priority Support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '1,500,000',
    annualPrice: '1,200,000',
    period: '/mo',
    description: 'Custom solutions for large organizations.',
    icon: Building2,
    color: 'text-purple-500',
    features: [
      'Everything in Growth',
      'Unlimited Content Briefs',
      'Unlimited Locations',
      'Dedicated Account Manager',
      'Custom Integrations',
      'SLA Guarantee',
    ],
  },
]

/* ─── Payment Method ─── */
type PaymentMethod = 'paystack' | 'flutterwave' | 'bank'

const paymentMethods: { id: PaymentMethod; label: string; sub: string; icon: typeof CreditCard }[] = [
  { id: 'paystack', label: 'Paystack', sub: 'Card, USSD, Bank', icon: CreditCard },
  { id: 'flutterwave', label: 'Flutterwave', sub: 'Card, Mobile money', icon: Wallet },
  { id: 'bank', label: 'Bank Transfer', sub: 'Direct NGN transfer', icon: Banknote },
]

/* ─── Main Checkout Page ─── */
export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('starter')
  const [isAnnual, setIsAnnual] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack')

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  })

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0]
  const displayPrice = isAnnual ? currentPlan.annualPrice : currentPlan.price
  const totalPrice = parseInt(displayPrice.replace(/,/g, ''))
  const annualSavings = selectedPlan !== 'enterprise'
    ? Math.round((parseInt(currentPlan.price.replace(/,/g, '')) - parseInt(currentPlan.annualPrice.replace(/,/g, ''))) * 12).toLocaleString()
    : '7,200,000'

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields.')
      return
    }
    if (paymentMethod === 'paystack' && (!formData.cardNumber || formData.cardNumber.length < 16)) {
      setError('Please enter a valid card number.')
      return
    }

    setIsProcessing(true)

    // Simulate Paystack payment
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsSuccess(true)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(' ').substring(0, 19)
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="relative overflow-hidden">
      {/* ─── Ambient Glow Orbs ─── */}
      <GlowOrb className="w-[500px] h-[500px] bg-amber-500/8 -top-48 -right-48" />
      <GlowOrb className="w-[400px] h-[400px] bg-purple-500/8 top-[40%] -left-48" />

      {/* ═══════════ SUCCESS STATE ═══════════ */}
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.section
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative pt-20 pb-24 min-h-[80vh] flex items-center"
          >
            <div className="container-main max-w-lg mx-auto text-center">
              <AnimatedCheckmark />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h1 className="text-heading-1 text-[var(--text-primary)] mb-3">
                  Payment <span className="text-gradient-amber">Successful!</span>
                </h1>
                <p className="text-body-lg text-[var(--text-secondary)] mb-8">
                  Welcome to the {currentPlan.name} plan. Your account has been activated and you now have full access to all features.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-panel p-6 mb-8 text-left"
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border-default)]">
                  <span className="text-sm text-[var(--text-muted)]">Plan</span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{currentPlan.name}</span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border-default)]">
                  <span className="text-sm text-[var(--text-muted)]">Billing</span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{isAnnual ? 'Annual' : 'Monthly'}</span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border-default)]">
                  <span className="text-sm text-[var(--text-muted)]">Amount Paid</span>
                  <span className="text-sm font-semibold text-emerald-500">₦{displayPrice}{isAnnual ? '/mo' : ''}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-muted)]">Transaction ID</span>
                  <span className="text-sm font-mono text-[var(--text-primary)]">
                    GEO-{Date.now().toString(36).toUpperCase()}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to="/dashboard" className="btn-primary shadow-glow">
                  <Sparkles className="w-4 h-4" />
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button className="btn-secondary">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          /* ═══════════ CHECKOUT FORM ═══════════ */
          <motion.section
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative pt-16 pb-24"
          >
            <div className="container-main max-w-6xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Pricing
                </Link>
                <h1 className="text-heading-1 text-[var(--text-primary)]">
                  Complete Your <span className="text-gradient-amber">Purchase</span>
                </h1>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* ─── LEFT: Form ─── */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-3 space-y-6"
                >
                  {/* Plan Selection */}
                  <div className="glass-panel p-6">
                    <h2 className="text-heading-3 text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-amber-500" />
                      Select Your Plan
                    </h2>

                    {/* Billing Toggle */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`text-sm ${!isAnnual ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-muted)]'}`}>
                        Monthly
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          isAnnual ? 'bg-amber-500' : 'bg-[var(--bg-tertiary)] border border-[var(--border-default)]'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                          animate={{ left: isAnnual ? '28px' : '4px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                      <span className={`text-sm ${isAnnual ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-muted)]'}`}>
                        Annual
                      </span>
                      {isAnnual && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-medium">
                          Save 20%
                        </span>
                      )}
                    </div>

                    {/* Plan Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {plans.map(plan => {
                        const Icon = plan.icon
                        const isSelected = selectedPlan === plan.id
                        return (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                              isSelected
                                ? plan.id === 'starter' ? 'border-amber-500 bg-amber-500/5' :
                                  plan.id === 'growth' ? 'border-teal-500 bg-teal-500/5' :
                                  'border-purple-500 bg-purple-500/5'
                                : 'border-[var(--border-default)] bg-transparent hover:border-[var(--border-hover)]'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle2 className={`w-4 h-4 ${plan.color}`} />
                              </div>
                            )}
                            <Icon className={`w-5 h-5 ${plan.color} mb-2`} />
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{plan.name}</p>
                            <p className="text-xs text-[var(--text-muted)]">
                              ₦{isAnnual ? plan.annualPrice : plan.price}/mo
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="glass-panel p-6">
                    <h2 className="text-heading-3 text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-500" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={e => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={e => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234 800 000 0000"
                          value={formData.phone}
                          onChange={e => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          placeholder="Acme Inc."
                          value={formData.company}
                          onChange={e => handleInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-heading-3 text-[var(--text-primary)] flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-teal-500" />
                        Payment Method
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Lock className="w-3 h-3" />
                        SSL Encrypted
                      </div>
                    </div>

                    {/* Payment Method Tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {paymentMethods.map(method => {
                        const Icon = method.icon
                        const active = paymentMethod === method.id
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                              active
                                ? 'border-[var(--accent-amber)] bg-[var(--accent-amber)]/5'
                                : 'border-[var(--border-default)] hover:border-[var(--border-hover)]'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${active ? 'text-[var(--accent-amber)]' : 'text-[var(--text-secondary)]'}`} />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight truncate">{method.label}</p>
                              <p className="text-[10px] text-[var(--text-muted)] leading-tight mt-0.5 truncate">{method.sub}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {paymentMethod === 'bank' && (
                      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-5 mb-4 space-y-3">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Bank Transfer Details</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-[var(--text-muted)] mb-1">Bank</p>
                            <p className="text-[var(--text-primary)] font-medium">GTBank</p>
                          </div>
                          <div>
                            <p className="text-xs text-[var(--text-muted)] mb-1">Account Number</p>
                            <p className="text-[var(--text-primary)] font-mono font-semibold">0123456789</p>
                          </div>
                          <div>
                            <p className="text-xs text-[var(--text-muted)] mb-1">Account Name</p>
                            <p className="text-[var(--text-primary)] font-medium">Getranked NG Ltd</p>
                          </div>
                          <div>
                            <p className="text-xs text-[var(--text-muted)] mb-1">Reference</p>
                            <p className="text-[var(--text-primary)] font-mono font-semibold">GR-{currentPlan.id.toUpperCase()}</p>
                          </div>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-default)]">
                          After transfer, send proof to <a href="mailto:hello@getranked.ng" className="text-[var(--accent-amber)] hover:underline">hello@getranked.ng</a>. Your plan activates within 2 hours.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'flutterwave' && (
                      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-5 mb-4 flex items-start gap-3">
                        <Wallet className="w-5 h-5 text-[var(--accent-amber)] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Pay with Flutterwave</p>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                            You&apos;ll be redirected to Flutterwave&apos;s secure checkout to complete payment with card, USSD, bank transfer, or mobile money.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className={`space-y-4 ${paymentMethod !== 'paystack' ? 'opacity-50 pointer-events-none' : ''}`}>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={e => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                            maxLength={19}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)] font-mono tracking-wider"
                          />
                          <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Expiry <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={e => handleInputChange('cardExpiry', formatExpiry(e.target.value))}
                            maxLength={5}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)] font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="123"
                            value={formData.cardCvv}
                            onChange={e => handleInputChange('cardCvv', e.target.value.replace(/\D/g, '').substring(0, 3))}
                            maxLength={3}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)] font-mono tracking-widest"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            placeholder="JOHN DOE"
                            value={formData.cardName}
                            onChange={e => handleInputChange('cardName', e.target.value.toUpperCase())}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                        >
                          <X className="w-4 h-4 flex-shrink-0" />
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="w-full btn-primary mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-glow"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {paymentMethod === 'bank' ? 'Confirming...' : 'Processing Payment...'}
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          {paymentMethod === 'bank'
                            ? 'I have made the transfer'
                            : paymentMethod === 'flutterwave'
                            ? `Continue to Flutterwave — ₦${displayPrice}`
                            : `Pay ₦${displayPrice}`}
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Paystack Trust */}
                    <div className="mt-6 pt-5 border-t border-[var(--border-default)]">
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <div className="w-5 h-5 rounded bg-[#0AA1FF] flex items-center justify-center">
                            <CreditCard className="w-3 h-3 text-white" />
                          </div>
                          Paystack
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <Shield className="w-3.5 h-3.5" />
                          PCI Compliant
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <Lock className="w-3.5 h-3.5" />
                          256-bit SSL
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ─── RIGHT: Order Summary ─── */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="lg:sticky lg:top-24 space-y-4">
                    <div className="glass-panel p-6">
                      <h3 className="text-heading-3 text-[var(--text-primary)] mb-5">Order Summary</h3>

                      {/* Plan Details */}
                      <div className="flex items-start gap-4 mb-5 pb-5 border-b border-[var(--border-default)]">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedPlan === 'starter' ? 'bg-amber-500/15' :
                          selectedPlan === 'growth' ? 'bg-teal-500/15' :
                          'bg-purple-500/15'
                        }`}>
                          {(() => {
                            const Icon = currentPlan.icon
                            return <Icon className={`w-6 h-6 ${currentPlan.color}`} />
                          })()}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                            {currentPlan.name} Plan
                          </h4>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">{currentPlan.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                            <span className="text-xs text-[var(--text-muted)]">
                              {isAnnual ? 'Billed annually' : 'Billed monthly'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-3 mb-5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[var(--text-secondary)]">
                            {isAnnual ? 'Annual price' : 'Monthly price'}
                          </span>
                          <span className="text-sm text-[var(--text-primary)]">
                            ₦{displayPrice}/mo
                          </span>
                        </div>
                        {isAnnual && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--text-secondary)]">Annual total</span>
                            <span className="text-sm text-[var(--text-primary)]">
                              ₦{(totalPrice * 12).toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[var(--text-secondary)]">Setup fee</span>
                          <span className="text-sm text-emerald-500 font-medium">Free</span>
                        </div>
                      </div>

                      {isAnnual && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-xs text-emerald-500 font-medium">
                            You save ₦{annualSavings}/year with annual billing
                          </span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="flex items-center justify-between pt-5 border-t border-[var(--border-default)]">
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">Total today</p>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            ≈ ${Math.round((isAnnual ? totalPrice * 12 : totalPrice) / 1550).toLocaleString()} USD
                          </p>
                        </div>
                        <span className="text-data-md text-[var(--text-primary)]">
                          ₦{isAnnual ? (totalPrice * 12).toLocaleString() : displayPrice}
                        </span>
                      </div>
                    </div>

                    {/* Plan Features */}
                    <div className="glass-panel p-6">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                        What&apos;s included:
                      </h4>
                      <ul className="space-y-2.5">
                        {currentPlan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${currentPlan.color}`} />
                            <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Security Note */}
                    <div className="glass-panel p-5">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                            Secure Payment
                          </p>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                            Your payment is processed securely by Paystack. We never store your card details. 
                            You can cancel anytime from your dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
