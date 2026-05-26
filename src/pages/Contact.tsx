import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

/* ─── Glow Orb (decorative) ─── */
function GlowOrb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

/* ─── Contact methods data ─── */
const contactMethods = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with our team',
    detail: '+234 801 234 5678',
    cta: 'Open WhatsApp',
    href: 'https://wa.me/2348012345678?text=Hi%20getranked',
    external: true,
    accent: 'text-[var(--accent-green)]',
    bgAccent: 'bg-[var(--accent-green)]/10',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'Drop us a line',
    detail: 'hello@getranked.ng',
    cta: 'Send Email',
    href: 'mailto:hello@getranked.ng',
    external: true,
    accent: 'text-[var(--accent-amber)]',
    bgAccent: 'bg-[var(--accent-amber)]/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: 'Talk to a strategist',
    detail: '+234 801 234 5678',
    cta: 'Call Now',
    href: 'tel:+2348012345678',
    external: true,
    accent: 'text-[var(--accent-blue)]',
    bgAccent: 'bg-[var(--accent-blue)]/10',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Lagos HQ',
    detail: '12 Admiralty Way, Lekki Phase 1, Lagos',
    cta: 'Get Directions',
    href: 'https://maps.google.com/?q=12+Admiralty+Way+Lekki+Phase+1+Lagos',
    external: true,
    accent: 'text-[var(--accent-purple)]',
    bgAccent: 'bg-[var(--accent-purple)]/10',
  },
] as const

/* ─── FAQ items ─── */
const faqs = [
  {
    q: 'How fast can you get my business mentioned by ChatGPT?',
    a: 'Most clients see their first ChatGPT/Perplexity mention within 30–60 days. Speed depends on your industry competitiveness, existing brand authority, and how aggressively we deploy LLMs.txt, schema, and authoritative citation work. We share weekly mention reports so you see the lift in real time.',
  },
  {
    q: 'Do you only work with Nigerian businesses?',
    a: 'Nigeria is our home and our specialty — we know the search patterns of Lagos, Abuja, and Port Harcourt better than anyone. That said, we work with diaspora brands, pan-African startups, and any business targeting Nigerian customers. Just bring the ambition.',
  },
  {
    q: 'Is GEO different from traditional SEO?',
    a: 'Yes. SEO optimizes for Google\'s blue links. GEO (Generative Engine Optimization) optimizes for the answers ChatGPT, Gemini, Perplexity, and Claude give when users ask questions. Different ranking signals, different content structures, different game. We do both — but GEO is where the next decade lives.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Paystack and Flutterwave for cards and bank transfers (Naira and USD). Direct bank transfer for enterprise contracts. Invoices issued for annual plans. We do not accept crypto for service payments.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Monthly plans cancel anytime, no questions asked — your dashboard access continues to the end of the billing period. Annual plans are pro-rated if you cancel after the first 60 days. We don\'t lock you in; results should keep you here.',
  },
  {
    q: 'Do you offer one-time audits?',
    a: 'Yes. Our free GEO Audit gives you an AI Search Visibility Score in 60 seconds. For a deeper deliverable, we offer a paid one-time Competitor & Mention Audit (₦150K) with a 30-page report and a 60-min strategy call. Most clients move to a subscription after.',
  },
]

/* ─── Zod schema ─── */
const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  businessType: z.string().min(1, 'Please select a business type'),
  monthlyMarketingBudget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: 'You must accept the terms to continue',
  }),
})

type ContactFormValues = z.infer<typeof contactSchema>

const businessTypes = [
  'Real Estate',
  'School',
  'Fertility Clinic',
  'Fintech',
  'Japa Agent',
  'Law Firm',
  'Restaurant/Hotel',
  'Fashion',
  'Other',
]

const budgetRanges = [
  '<₦100K',
  '₦100K–500K',
  '₦500K–1M',
  '₦1M–3M',
  '₦3M+',
]

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Contact — getranked'
  }, [])

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      businessType: '',
      monthlyMarketingBudget: '',
      message: '',
      acceptTerms: false,
    },
  })

  const onSubmit = async (_values: ContactFormValues) => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    toast.success("Thanks! We'll reach out within 24 hours.")
    form.reset()
    setSubmitting(false)
  }

  return (
    <div className="relative overflow-hidden bg-[var(--bg-primary)]">
      {/* ───────── HERO ───────── */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
        <GlowOrb className="w-[500px] h-[500px] bg-[var(--accent-amber)]/20 -top-40 -right-40" />
        <GlowOrb className="w-[400px] h-[400px] bg-[var(--accent-teal)]/15 top-20 -left-32" />

        <div className="container-main relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow border border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--accent-amber)]">
                <Sparkles className="w-3.5 h-3.5" />
                Talk to a strategist
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-display-2 text-[var(--text-primary)] mt-6"
            >
              Let's get your business{' '}
              <span className="text-gradient-amber">found.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-body-lg text-[var(--text-secondary)] mt-6 max-w-2xl"
            >
              Whether you want a free GEO audit, a custom strategy, or just to know
              if we're the right fit — we reply fast. Most messages get a human
              response within 2 hours during Lagos business hours.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-body-sm text-[var(--text-secondary)]"
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)]" />
                Reply within 2 hours
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)]" />
                Free 30-min strategy call
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)]" />
                No spam, ever
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───────── CONTACT METHODS GRID ───────── */}
      <section className="relative pb-16 sm:pb-20">
        <div className="container-main">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {contactMethods.map((m) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  variants={fadeUp}
                  className="card-base p-6 flex flex-col"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${m.bgAccent} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-6 h-6 ${m.accent}`} />
                  </div>
                  <div className="text-label text-[var(--text-muted)] mb-2">
                    {m.label}
                  </div>
                  <div className="text-heading-3 text-[var(--text-primary)] mb-1">
                    {m.value}
                  </div>
                  <div className="text-body-sm text-[var(--text-secondary)] mb-6 flex-1 break-words">
                    {m.detail}
                  </div>
                  <a
                    href={m.href}
                    target={m.external ? '_blank' : undefined}
                    rel={m.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-amber)] hover:gap-2.5 transition-all"
                  >
                    {m.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ───────── FORM + SIDE PANEL ───────── */}
      <section className="relative py-16 sm:py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <GlowOrb className="w-[400px] h-[400px] bg-[var(--accent-amber)]/10 top-1/2 -right-32" />

        <div className="container-main relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* LEFT — Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="mb-8">
                <span className="text-label text-[var(--accent-amber)] mb-3 inline-block">
                  Send us a message
                </span>
                <h2 className="text-heading-1 text-[var(--text-primary)]">
                  Tell us about your business
                </h2>
                <p className="text-body-lg text-[var(--text-secondary)] mt-3">
                  The more we know, the sharper our first reply.
                </p>
              </div>

              <div className="card-base p-6 sm:p-8 hover:-translate-y-0 hover:shadow-none">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--text-primary)] font-semibold">
                              Full name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Adaeze Okonkwo"
                                autoComplete="name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--text-primary)] font-semibold">
                              Work email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@company.com"
                                autoComplete="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--text-primary)] font-semibold">
                            Company
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="getranked"
                              autoComplete="organization"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--text-primary)] font-semibold">
                              Business type
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {businessTypes.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="monthlyMarketingBudget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--text-primary)] font-semibold">
                              Monthly marketing budget
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Pick a range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetRanges.map((b) => (
                                  <SelectItem key={b} value={b}>
                                    {b}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--text-primary)] font-semibold">
                            How can we help?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your goals, current visibility issues, or what success looks like for you in the next 90 days..."
                              rows={5}
                              className="resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <div className="grid gap-1.5 leading-none">
                            <FormLabel className="text-body-sm text-[var(--text-secondary)] font-normal cursor-pointer">
                              I agree to be contacted by getranked and accept
                              the{' '}
                              <Link
                                to="/terms"
                                className="text-[var(--accent-amber)] underline underline-offset-2 hover:text-[var(--accent-amber-hover)]"
                              >
                                terms
                              </Link>{' '}
                              &{' '}
                              <Link
                                to="/privacy"
                                className="text-[var(--accent-amber)] underline underline-offset-2 hover:text-[var(--accent-amber-hover)]"
                              >
                                privacy policy
                              </Link>
                              .
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {submitting ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>

            {/* RIGHT — Talk live panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start"
            >
              <div className="glass-panel p-7 sm:p-8">
                <div className="text-label text-[var(--accent-teal)] mb-3">
                  Want it faster?
                </div>
                <h3 className="text-heading-2 text-[var(--text-primary)] mb-3">
                  Prefer to talk live?
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)] mb-7">
                  Skip the form. Jump on WhatsApp or book a 30-minute strategy
                  call with a senior GEO strategist.
                </p>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/2348012345678?text=Hi%20getranked"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>

                  <Link to="/pricing#book" className="btn-secondary w-full">
                    <Calendar className="w-5 h-5" />
                    Book a 30-min strategy call
                  </Link>
                </div>

                <div className="mt-7 pt-6 border-t border-[var(--border-default)] flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-green)]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[var(--accent-green)]" />
                  </div>
                  <div>
                    <div className="text-body-sm font-semibold text-[var(--text-primary)]">
                      Average reply time:{' '}
                      <span className="text-[var(--accent-green)]">
                        &lt; 2 hours
                      </span>
                    </div>
                    <div className="text-body-sm text-[var(--text-secondary)] mt-0.5">
                      During Lagos business hours (Mon–Fri, 9am–6pm WAT)
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative py-16 sm:py-24">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-label text-[var(--accent-amber)] mb-3 inline-block">
                FAQ
              </span>
              <h2 className="text-heading-1 text-[var(--text-primary)]">
                Common questions
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mt-3">
                Quick answers before you reach out.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-3"
              >
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="card-base hover:-translate-y-0 hover:shadow-none px-5 sm:px-6 border-b-0"
                  >
                    <AccordionTrigger className="text-left text-[var(--text-primary)] font-semibold hover:no-underline py-5">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-body-sm text-[var(--text-secondary)] leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── OFFICE MAP PLACEHOLDER ───────── */}
      <section className="relative pb-16 sm:pb-24">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-base hover:-translate-y-0 relative overflow-hidden p-8 sm:p-12"
          >
            {/* Decorative grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Glow accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[var(--accent-amber)]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-amber)]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-[var(--accent-amber)]" />
                </div>
                <div>
                  <div className="text-label text-[var(--text-muted)] mb-2">
                    Where we work
                  </div>
                  <h3 className="text-heading-2 text-[var(--text-primary)] mb-2">
                    Lagos · Abuja · Port Harcourt
                  </h3>
                  <p className="text-body-sm text-[var(--text-secondary)] max-w-md">
                    Headquartered in Lekki, working with brands across all three
                    major Nigerian commercial hubs and beyond.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Lagos · HQ', 'Abuja', 'Port Harcourt'].map((city) => (
                  <span
                    key={city}
                    className="px-3 py-1.5 rounded-full text-body-sm font-medium bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-default)]"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────── BOTTOM CTA ───────── */}
      <section className="relative py-16 sm:py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-default)] overflow-hidden">
        <GlowOrb className="w-[500px] h-[500px] bg-[var(--accent-amber)]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="eyebrow border border-[var(--border-default)] bg-[var(--bg-primary)] text-[var(--accent-amber)]">
              <Sparkles className="w-3.5 h-3.5" />
              Free, no credit card
            </span>
            <h2 className="text-display-2 text-[var(--text-primary)] mt-6">
              Or skip the chat — see your{' '}
              <span className="text-gradient-amber">AI visibility score</span>{' '}
              in 60 seconds.
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] mt-5 max-w-2xl mx-auto">
              Run a free GEO Audit. We'll show you exactly where ChatGPT,
              Gemini, and Perplexity rank your brand today — and what to fix
              first.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
              <Link to="/geo-audit" className="btn-primary">
                <Sparkles className="w-5 h-5" />
                Run free GEO audit
              </Link>
              <a
                href="https://wa.me/2348012345678?text=Hi%20getranked"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp us instead
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
