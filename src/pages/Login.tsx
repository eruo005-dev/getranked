import { useEffect, useState } from 'react'
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
  TrendingUp,
  ShieldCheck,
  Bot,
  Quote,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

const testimonials = [
  {
    quote:
      "Our Lagos clinic went from invisible in ChatGPT to the first answer for 'best dermatologist in Lekki'. Bookings doubled in 6 weeks.",
    name: 'Dr. Adaeze Okafor',
    role: 'Lumière Skin & Dermatology, Lagos',
  },
  {
    quote:
      "getranked helped our fintech get cited by Perplexity and Gemini. We finally show up where our customers actually search now.",
    name: 'Tunde Bakare',
    role: 'Head of Growth, PayCircle',
  },
  {
    quote:
      "The GEO Audit alone was worth the price. We fixed three critical issues and saw AI mentions climb 4x in a month.",
    name: 'Chiamaka Nwosu',
    role: 'Founder, Naija Bridal Co.',
  },
]

const highlights = [
  {
    icon: Bot,
    title: 'AI search ranking',
    desc: 'Track ChatGPT, Perplexity, Gemini mentions',
  },
  {
    icon: TrendingUp,
    title: 'GEO that converts',
    desc: 'Real Nigerian businesses, real revenue lift',
  },
  {
    icon: ShieldCheck,
    title: 'Local-first',
    desc: 'Built for Lagos, Abuja, PH & beyond',
  },
]

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

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  useEffect(() => {
    document.title = 'Sign in — getranked'
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  })

  const remember = watch('remember')

  const onSubmit = async (_values: LoginFormValues) => {
    await new Promise((r) => setTimeout(r, 1200))
    toast.success('Signed in!', { description: 'Welcome back to getranked' })
    navigate('/dashboard')
  }

  const activeTestimonial = testimonials[testimonialIdx]

  return (
    <div className="relative min-h-[calc(100dvh-64px)] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Mobile-only top banner */}
      <div className="lg:hidden relative bg-gradient-to-br from-[#04140C] via-[#0A2018] to-[#102C22] text-white px-6 py-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(5, 150, 105,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(20,184,166,0.25), transparent 50%)',
        }} />
        <div className="relative flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--accent-amber)]" />
          <span className="text-sm font-semibold tracking-tight">getranked</span>
          <span className="ml-auto text-xs text-white/60">Nigeria's #1 GEO platform</span>
        </div>
      </div>

      {/* LEFT — Form */}
      <section className="flex items-center justify-center px-5 sm:px-8 lg:px-12 py-10 lg:py-16 bg-[var(--bg-primary)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-display-2 text-[var(--text-primary)] mb-2">Welcome back</h1>
            <p className="text-body-lg text-[var(--text-secondary)]">
              Sign in to track your GEO rankings
            </p>
          </div>

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
              >
                Email
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
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[var(--text-primary)]"
                >
                  Password
                </label>
                <Link
                  to="#"
                  className="text-xs font-semibold text-[var(--accent-amber)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
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
              {errors.password && (
                <p className="mt-1.5 text-xs text-[var(--accent-red)]">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={!!remember}
                onCheckedChange={(c) => setValue('remember', c === true)}
                className="border-[var(--border-default)] data-[state=checked]:bg-[var(--accent-amber)] data-[state=checked]:border-[var(--accent-amber)] data-[state=checked]:text-[var(--brand-on-primary)]"
              />
              <label
                htmlFor="remember"
                className="text-sm text-[var(--text-secondary)] cursor-pointer select-none"
                onClick={() => setValue('remember', !remember)}
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full h-12 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing you in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-[var(--accent-amber)] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </section>

      {/* RIGHT — Decorative panel (desktop only) */}
      <aside className="hidden lg:flex relative overflow-hidden bg-[var(--accent-green-deep)] text-white">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 20%, rgba(5, 150, 105,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(20,184,166,0.18), transparent 45%), radial-gradient(circle at 60% 30%, rgba(139,92,246,0.12), transparent 50%)',
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
                Nigeria's #1 GEO platform
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
                © {new Date().getFullYear()} All rights reserved
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
