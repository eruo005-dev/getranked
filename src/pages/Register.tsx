import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Sparkles,
  User,
  Building2,
  ChevronDown,
  Check,
  Quote,
  TrendingUp,
  Bot,
  ShieldCheck,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const businessCategories = [
  'Real Estate',
  'Schools & Education',
  'Hospitals & Healthcare',
  'Fintech',
  'Law Firms',
  'Restaurants & Hospitality',
  'Fashion & Retail',
  'Japa Consultants',
  'Beauty & Wellness',
  'Logistics & Delivery',
  'Agency / Consultancy',
  'Other',
] as const

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Please enter your full name'),
    businessName: z.string().min(2, 'Business name is required'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    businessCategory: z.string().min(1, 'Pick a category'),
    agree: z.boolean().refine((v) => v === true, {
      message: 'You must agree to the Terms to continue',
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

const testimonials = [
  {
    quote:
      "We launched on getranked and within 5 weeks our school was the recommended pick on ChatGPT for 'best secondary school in Abuja'.",
    name: 'Mr. Emeka Eze',
    role: 'Director, Bright Horizons Academy',
  },
  {
    quote:
      "Our property listings finally get pulled into AI answers. Inbound leads from Perplexity tripled in the first quarter.",
    name: 'Funmi Adebayo',
    role: 'CEO, Ikoyi Realty',
  },
]

const highlights = [
  { icon: Bot, title: 'Rank in AI search', desc: 'ChatGPT, Gemini, Perplexity, Claude' },
  { icon: TrendingUp, title: '7-day free trial', desc: 'No card needed to start' },
  { icon: ShieldCheck, title: 'Cancel anytime', desc: 'Month-to-month, no lock-in' },
]

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.5 14.6 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.9-1.5-.1-2.9.9-3.6.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-3.9zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.4z" />
    </svg>
  )
}

function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] border-[1.5px] border-[var(--border-default)] text-[var(--text-primary)] bg-[var(--bg-secondary)] text-sm font-semibold transition-all duration-200 hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)] active:scale-[0.97]"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ').pop()}</span>
    </button>
  )
}

function computeStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: '', color: 'var(--border-default)' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++

  const labels = ['Weak', 'Weak', 'Medium', 'Strong', 'Excellent']
  const colors = [
    'var(--accent-red)',
    'var(--accent-red)',
    'var(--accent-amber)',
    'var(--accent-blue)',
    'var(--accent-green)',
  ]
  return { score, label: labels[score], color: colors[score] }
}

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: 'Account' },
    { n: 2, label: 'Business' },
    { n: 3, label: 'Verify' },
  ]
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-8">
      {steps.map((s, i) => {
        const active = s.n === step
        const done = s.n < step
        return (
          <div key={s.n} className="flex items-center gap-2 sm:gap-3 flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  active
                    ? 'bg-[var(--accent-amber)] text-[#0A0F1A] shadow-[0_0_0_4px_var(--accent-amber-glow)]'
                    : done
                    ? 'bg-[var(--accent-green)] text-white'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-default)]'
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : s.n}
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  active
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-[var(--border-default)] min-w-[12px]" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  useEffect(() => {
    document.title = 'Create your account — getranked.ng'
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessCategory: '',
      agree: false,
    },
  })

  const password = watch('password')
  const agree = watch('agree')
  const businessCategory = watch('businessCategory')

  const strength = useMemo(() => computeStrength(password || ''), [password])

  const onSubmit = async (_values: RegisterFormValues) => {
    await new Promise((r) => setTimeout(r, 1400))
    toast.success('Account created!', {
      description: 'Welcome to getranked.ng — your trial is active.',
    })
    navigate('/dashboard')
  }

  const activeTestimonial = testimonials[testimonialIdx]

  return (
    <div className="relative min-h-[calc(100dvh-64px)] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Mobile top banner */}
      <div className="lg:hidden relative bg-gradient-to-br from-[#0A0F1A] via-[#111827] to-[#1A2235] text-white px-6 py-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(245,158,11,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(20,184,166,0.25), transparent 50%)',
        }} />
        <div className="relative flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--accent-amber)]" />
          <span className="text-sm font-semibold tracking-tight">getranked.ng</span>
          <span className="ml-auto text-xs text-white/60">Free 7-day trial</span>
        </div>
      </div>

      {/* LEFT — Form */}
      <section className="flex items-center justify-center px-5 sm:px-8 lg:px-12 py-10 lg:py-14 bg-[var(--bg-primary)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg"
        >
          <div className="mb-6">
            <h1 className="text-display-2 text-[var(--text-primary)] mb-2">Get found by AI</h1>
            <p className="text-body-lg text-[var(--text-secondary)]">
              Create your getranked.ng account — free 7-day trial
            </p>
          </div>

          <StepIndicator step={1} />

          <div className="flex gap-3 mb-6">
            <SocialButton label="Continue with Google" icon={<GoogleIcon />} />
            <SocialButton label="Continue with Apple" icon={<AppleIcon />} />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-[var(--border-default)]" />
            <span className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] font-semibold">
              or with email
            </span>
            <div className="h-px flex-1 bg-[var(--border-default)]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  Full name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
                    aria-hidden="true"
                  />
                  <Input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Adaeze Okafor"
                    aria-invalid={!!errors.fullName}
                    className="h-12 pl-10 pr-3 bg-[var(--bg-secondary)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-[10px] focus-visible:border-[var(--accent-amber)] focus-visible:ring-[var(--accent-amber)]/30"
                    {...register('fullName')}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-[var(--accent-red)]">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  Business name
                </label>
                <div className="relative">
                  <Building2
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
                    aria-hidden="true"
                  />
                  <Input
                    id="businessName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Lumière Skin & Co."
                    aria-invalid={!!errors.businessName}
                    className="h-12 pl-10 pr-3 bg-[var(--bg-secondary)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-[10px] focus-visible:border-[var(--accent-amber)] focus-visible:ring-[var(--accent-amber)]/30"
                    {...register('businessName')}
                  />
                </div>
                {errors.businessName && (
                  <p className="mt-1.5 text-xs text-[var(--accent-red)]">
                    {errors.businessName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
              >
                Work email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  className="h-12 pl-10 pr-3 bg-[var(--bg-secondary)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-[10px] focus-visible:border-[var(--accent-amber)] focus-visible:ring-[var(--accent-amber)]/30"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-[var(--accent-red)]">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="businessCategory"
                className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
              >
                Business category
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none z-10"
                  aria-hidden="true"
                />
                <select
                  id="businessCategory"
                  aria-invalid={!!errors.businessCategory}
                  value={businessCategory}
                  onChange={(e) => setValue('businessCategory', e.target.value, { shouldValidate: true })}
                  className={`h-12 pl-10 pr-10 w-full appearance-none rounded-[10px] bg-[var(--bg-secondary)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--accent-amber)] focus:ring-[3px] focus:ring-[var(--accent-amber)]/30 hover:border-[var(--border-hover)] ${
                    !businessCategory ? 'text-[var(--text-muted)]' : ''
                  }`}
                >
                  <option value="" disabled>
                    Select your category
                  </option>
                  {businessCategories.map((c) => (
                    <option key={c} value={c} className="text-[var(--text-primary)] bg-[var(--bg-secondary)]">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
                  aria-hidden="true"
                />
              </div>
              {errors.businessCategory && (
                <p className="mt-1.5 text-xs text-[var(--accent-red)]">
                  {errors.businessCategory.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  aria-invalid={!!errors.password}
                  className="h-12 pl-10 pr-11 bg-[var(--bg-secondary)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-[10px] focus-visible:border-[var(--accent-amber)] focus-visible:ring-[var(--accent-amber)]/30"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-2">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          i < strength.score ? strength.color : 'var(--border-default)',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-1.5 min-h-[16px]">
                  <span className="text-xs text-[var(--text-muted)]">
                    Use 8+ chars, mix upper/lower, numbers & symbols
                  </span>
                  {strength.label && (
                    <span
                      className="text-xs font-semibold"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-[var(--accent-red)]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  aria-invalid={!!errors.confirmPassword}
                  className="h-12 pl-10 pr-11 bg-[var(--bg-secondary)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-[10px] focus-visible:border-[var(--accent-amber)] focus-visible:ring-[var(--accent-amber)]/30"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-[var(--accent-red)]">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="agree"
                checked={!!agree}
                onCheckedChange={(c) =>
                  setValue('agree', c === true, { shouldValidate: true })
                }
                className="mt-0.5 border-[var(--border-default)] data-[state=checked]:bg-[var(--accent-amber)] data-[state=checked]:border-[var(--accent-amber)] data-[state=checked]:text-[#0A0F1A]"
              />
              <label
                htmlFor="agree"
                className="text-sm text-[var(--text-secondary)] cursor-pointer select-none leading-relaxed"
              >
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-[var(--accent-amber)] hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-semibold text-[var(--accent-amber)] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agree && (
              <p className="text-xs text-[var(--accent-red)]">{errors.agree.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full h-12 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating your account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[var(--accent-amber)] hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </section>

      {/* RIGHT — Decorative panel */}
      <aside className="hidden lg:flex relative overflow-hidden bg-[#0A0F1A] text-white">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(245,158,11,0.28), transparent 45%), radial-gradient(circle at 20% 80%, rgba(20,184,166,0.18), transparent 45%), radial-gradient(circle at 60% 50%, rgba(139,92,246,0.12), transparent 50%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col justify-between w-full px-10 xl:px-16 py-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
              <span className="text-xs font-semibold tracking-tight">
                Free 7-day trial · No card needed
              </span>
            </div>
          </div>

          <div>
            <Quote className="w-10 h-10 text-[var(--accent-amber)] mb-5 opacity-90" />
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-2xl xl:text-[28px] leading-snug font-medium text-white/95 mb-6">
                  "{activeTestimonial.quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-white">{activeTestimonial.name}</p>
                  <p className="text-xs text-white/60">{activeTestimonial.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-1.5 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === testimonialIdx ? 'w-8 bg-[var(--accent-amber)]' : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-3 mb-10">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-[var(--accent-amber)]/15 border border-[var(--accent-amber)]/30 flex items-center justify-center">
                    <h.icon className="w-4 h-4 text-[var(--accent-amber)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{h.title}</p>
                    <p className="text-xs text-white/60 mt-0.5">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold tracking-tight">
                getranked<span className="text-[var(--accent-amber)]">.ng</span>
              </div>
              <div className="text-xs text-white/40">
                Trusted by 1,200+ Nigerian businesses
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
