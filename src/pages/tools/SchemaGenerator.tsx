import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import {
  Sparkles,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Check,
  Plus,
  Trash2,
  Building2,
  Briefcase,
  HelpCircle,
  Wrench,
  Newspaper,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'

type WeekDay = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
const WEEKDAYS: { code: WeekDay; label: string }[] = [
  { code: 'Mo', label: 'Mon' },
  { code: 'Tu', label: 'Tue' },
  { code: 'We', label: 'Wed' },
  { code: 'Th', label: 'Thu' },
  { code: 'Fr', label: 'Fri' },
  { code: 'Sa', label: 'Sat' },
  { code: 'Su', label: 'Sun' },
]

type LocalBusinessForm = {
  name: string
  street: string
  city: string
  state: string
  postal: string
  telephone: string
  email: string
  openDays: Record<WeekDay, boolean>
  openTime: string
  closeTime: string
  priceRange: string
  image: string
  lat: string
  lng: string
  areaServed: string
  url: string
}

type OrgForm = {
  name: string
  url: string
  logo: string
  founder: string
  foundingDate: string
  street: string
  city: string
  state: string
  postal: string
  sameAs: { id: string; value: string }[]
}

type FaqForm = {
  url: string
  items: { id: string; question: string; answer: string }[]
}

type ServiceForm = {
  name: string
  providerName: string
  areaServed: string
  description: string
  priceRange: string
  url: string
}

type ArticleForm = {
  headline: string
  image: string
  author: string
  datePublished: string
  publisherName: string
  publisherLogo: string
  url: string
}

const rid = () => Math.random().toString(36).slice(2, 9)

const INITIAL_LB: LocalBusinessForm = {
  name: '',
  street: '',
  city: 'Lagos',
  state: 'LA',
  postal: '',
  telephone: '+234',
  email: '',
  openDays: { Mo: true, Tu: true, We: true, Th: true, Fr: true, Sa: false, Su: false },
  openTime: '09:00',
  closeTime: '18:00',
  priceRange: '₦₦',
  image: '',
  lat: '',
  lng: '',
  areaServed: 'Lagos',
  url: '',
}

const INITIAL_ORG: OrgForm = {
  name: '',
  url: '',
  logo: '',
  founder: '',
  foundingDate: '',
  street: '',
  city: 'Lagos',
  state: 'LA',
  postal: '',
  sameAs: [
    { id: rid(), value: 'https://twitter.com/yourbrand' },
    { id: rid(), value: 'https://instagram.com/yourbrand' },
  ],
}

const INITIAL_FAQ: FaqForm = {
  url: '',
  items: [
    {
      id: rid(),
      question: 'What payment methods do you accept?',
      answer: 'We accept all major Nigerian bank transfers, USSD, and card payments via Paystack and Flutterwave.',
    },
    {
      id: rid(),
      question: 'Do you deliver nationwide?',
      answer: 'Yes — we deliver across all 36 states in Nigeria within 2–5 business days.',
    },
  ],
}

const INITIAL_SERVICE: ServiceForm = {
  name: '',
  providerName: '',
  areaServed: 'Nigeria',
  description: '',
  priceRange: '₦₦',
  url: '',
}

const INITIAL_ARTICLE: ArticleForm = {
  headline: '',
  image: '',
  author: '',
  datePublished: new Date().toISOString().slice(0, 10),
  publisherName: '',
  publisherLogo: '',
  url: '',
}

type SchemaTab = 'localbusiness' | 'organization' | 'faq' | 'service' | 'article'

function buildLocalBusiness(f: LocalBusinessForm): object {
  const openingHours: string[] = []
  const days = WEEKDAYS.filter(d => f.openDays[d.code]).map(d => d.code)
  if (days.length && f.openTime && f.closeTime) {
    openingHours.push(`${days.join(',')} ${f.openTime}-${f.closeTime}`)
  }

  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: f.name || 'Your Business Name',
  }
  if (f.url) node.url = f.url
  if (f.image) node.image = f.image
  if (f.telephone) node.telephone = f.telephone
  if (f.email) node.email = f.email
  if (f.priceRange) node.priceRange = f.priceRange

  if (f.street || f.city || f.state || f.postal) {
    node.address = {
      '@type': 'PostalAddress',
      ...(f.street && { streetAddress: f.street }),
      ...(f.city && { addressLocality: f.city }),
      ...(f.state && { addressRegion: f.state }),
      ...(f.postal && { postalCode: f.postal }),
      addressCountry: 'NG',
    }
  }
  if (f.lat && f.lng) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: Number(f.lat),
      longitude: Number(f.lng),
    }
  }
  if (openingHours.length) node.openingHours = openingHours
  if (f.areaServed) node.areaServed = f.areaServed
  return node
}

function buildOrganization(f: OrgForm): object {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: f.name || 'Your Organization',
  }
  if (f.url) node.url = f.url
  if (f.logo) node.logo = f.logo
  if (f.founder) node.founder = { '@type': 'Person', name: f.founder }
  if (f.foundingDate) node.foundingDate = f.foundingDate
  if (f.street || f.city || f.state || f.postal) {
    node.address = {
      '@type': 'PostalAddress',
      ...(f.street && { streetAddress: f.street }),
      ...(f.city && { addressLocality: f.city }),
      ...(f.state && { addressRegion: f.state }),
      ...(f.postal && { postalCode: f.postal }),
      addressCountry: 'NG',
    }
  }
  const sameAs = f.sameAs.map(s => s.value.trim()).filter(Boolean)
  if (sameAs.length) node.sameAs = sameAs
  return node
}

function buildFaq(f: FaqForm): object {
  const items = f.items
    .filter(i => i.question.trim() && i.answer.trim())
    .map(i => ({
      '@type': 'Question',
      name: i.question.trim(),
      acceptedAnswer: { '@type': 'Answer', text: i.answer.trim() },
    }))
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items,
  }
  if (f.url) node.url = f.url
  return node
}

function buildService(f: ServiceForm): object {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: f.name || 'Your Service',
  }
  if (f.providerName) {
    node.provider = { '@type': 'Organization', name: f.providerName }
  }
  if (f.areaServed) node.areaServed = f.areaServed
  if (f.description) node.description = f.description
  if (f.priceRange) node.priceRange = f.priceRange
  if (f.url) node.url = f.url
  return node
}

function buildArticle(f: ArticleForm): object {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: f.headline || 'Your headline',
  }
  if (f.image) node.image = f.image
  if (f.author) node.author = { '@type': 'Person', name: f.author }
  if (f.datePublished) node.datePublished = f.datePublished
  if (f.publisherName) {
    node.publisher = {
      '@type': 'Organization',
      name: f.publisherName,
      ...(f.publisherLogo && {
        logo: { '@type': 'ImageObject', url: f.publisherLogo },
      }),
    }
  }
  if (f.url) {
    node.mainEntityOfPage = { '@type': 'WebPage', '@id': f.url }
  }
  return node
}

export default function SchemaGenerator() {
  const [tab, setTab] = useState<SchemaTab>('localbusiness')
  const [lb, setLb] = useState<LocalBusinessForm>(INITIAL_LB)
  const [org, setOrg] = useState<OrgForm>(INITIAL_ORG)
  const [faq, setFaq] = useState<FaqForm>(INITIAL_FAQ)
  const [service, setService] = useState<ServiceForm>(INITIAL_SERVICE)
  const [article, setArticle] = useState<ArticleForm>(INITIAL_ARTICLE)
  const [copied, setCopied] = useState<'json' | 'script' | null>(null)

  useEffect(() => {
    document.title = 'Schema Markup Generator — getranked'
  }, [])

  const schema = useMemo(() => {
    switch (tab) {
      case 'localbusiness':
        return buildLocalBusiness(lb)
      case 'organization':
        return buildOrganization(org)
      case 'faq':
        return buildFaq(faq)
      case 'service':
        return buildService(service)
      case 'article':
        return buildArticle(article)
    }
  }, [tab, lb, org, faq, service, article])

  const jsonString = useMemo(() => JSON.stringify(schema, null, 2), [schema])
  const scriptString = useMemo(
    () => `<script type="application/ld+json">\n${jsonString}\n</script>`,
    [jsonString]
  )

  const currentUrl = useMemo(() => {
    switch (tab) {
      case 'localbusiness':
        return lb.url
      case 'organization':
        return org.url
      case 'faq':
        return faq.url
      case 'service':
        return service.url
      case 'article':
        return article.url
    }
  }, [tab, lb.url, org.url, faq.url, service.url, article.url])

  const copy = async (kind: 'json' | 'script') => {
    try {
      await navigator.clipboard.writeText(kind === 'json' ? jsonString : scriptString)
      setCopied(kind)
      toast.success(kind === 'json' ? 'JSON-LD copied' : 'Copied with <script> tag')
      window.setTimeout(() => setCopied(null), 2000)
    } catch {
      toast.error('Clipboard access denied')
    }
  }

  const download = () => {
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${tab}-schema.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Schema downloaded')
  }

  const validate = () => {
    if (!currentUrl.trim()) {
      toast.error('Enter a URL in the form to test rich results.')
      return
    }
    try {
      const u = new URL(currentUrl.trim())
      if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error('bad protocol')
    } catch {
      toast.error('Enter a valid URL first (https://…).')
      return
    }
    const validatorUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(
      currentUrl.trim()
    )}`
    window.open(validatorUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative overflow-hidden">
      <Toaster richColors position="bottom-right" />

      <div
        className="absolute rounded-full blur-[120px] pointer-events-none w-[500px] h-[500px] bg-teal-500/10 -top-48 -right-48"
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none w-[400px] h-[400px] bg-emerald-500/10 top-[40%] -left-48"
        aria-hidden="true"
      />

      <section className="relative pt-20 pb-10">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="eyebrow bg-teal-500/10 text-[var(--accent-teal)] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              FREE GEO TOOL
            </span>
            <h1 className="text-display-2 text-[var(--text-primary)] mb-5 max-w-4xl">
              Generate <span className="text-gradient-amber">Schema Markup</span> for Nigerian businesses
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mb-8">
              Help Google, ChatGPT, and Perplexity understand your business. Pick a schema type, fill the form, paste the JSON-LD into your site.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#generator" className="btn-primary" aria-label="Jump to the schema generator">
                <Code2 className="w-4 h-4" />
                Start generating
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://schema.org"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-secondary"
                aria-label="Open schema.org documentation"
              >
                <ExternalLink className="w-4 h-4" />
                schema.org docs
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-10">
        <div className="container-main max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-teal)]" />
              </div>
              <div>
                <h2 className="text-heading-3 text-[var(--text-primary)]">
                  Why schema matters for GEO
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Structured facts are AI fuel
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'AI engines parse JSON-LD to extract structured facts about your business — name, location, hours, prices, services.',
                'Schema dramatically increases your chance of being cited in ChatGPT, Perplexity, and Google AI Overviews.',
                'Local businesses with schema get up to 4x more clicks from AI search than those without.',
              ].map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)]"
                >
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-secondary)]">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="generator" className="relative pb-24">
        <div className="container-main max-w-6xl">
          <Tabs value={tab} onValueChange={v => setTab(v as SchemaTab)} className="gap-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] p-1.5 rounded-2xl">
              <TabTrigger value="localbusiness" icon={Building2} label="Local Business" />
              <TabTrigger value="organization" icon={Briefcase} label="Organization" />
              <TabTrigger value="faq" icon={HelpCircle} label="FAQ Page" />
              <TabTrigger value="service" icon={Wrench} label="Service" />
              <TabTrigger value="article" icon={Newspaper} label="Article" />
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 md:p-8"
              >
                <TabsContent value="localbusiness" className="mt-0">
                  <LocalBusinessFields value={lb} onChange={setLb} />
                </TabsContent>
                <TabsContent value="organization" className="mt-0">
                  <OrganizationFields value={org} onChange={setOrg} />
                </TabsContent>
                <TabsContent value="faq" className="mt-0">
                  <FaqFields value={faq} onChange={setFaq} />
                </TabsContent>
                <TabsContent value="service" className="mt-0">
                  <ServiceFields value={service} onChange={setService} />
                </TabsContent>
                <TabsContent value="article" className="mt-0">
                  <ArticleFields value={article} onChange={setArticle} />
                </TabsContent>
              </motion.div>

              <div className="relative">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copy('json')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-amber)] text-[var(--brand-on-primary)] font-jakarta font-semibold text-sm transition-all duration-200 hover:bg-[var(--accent-amber-hover)] hover:scale-[1.02] active:scale-[0.98]"
                      aria-label="Copy JSON-LD to clipboard"
                    >
                      {copied === 'json' ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy JSON-LD
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => copy('script')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] bg-transparent font-jakarta font-semibold text-sm transition-all duration-200 hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)] active:scale-[0.98]"
                      aria-label="Copy JSON-LD wrapped in a script tag"
                    >
                      {copied === 'script' ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy with &lt;script&gt;
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={download}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] bg-transparent font-jakarta font-semibold text-sm transition-all duration-200 hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)] active:scale-[0.98]"
                      aria-label="Download schema as JSON file"
                    >
                      <Download className="w-4 h-4" />
                      Download .json
                    </button>
                    <button
                      type="button"
                      onClick={validate}
                      className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] font-jakarta font-medium text-sm transition-all duration-200"
                      aria-label="Validate with Google Rich Results test"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Validate
                    </button>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[#0A0F1A]">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.03]">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        </div>
                        <span className="text-xs font-mono text-white/60 ml-2">
                          {tab}-schema.json
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                        live preview
                      </span>
                    </div>
                    <pre className="p-5 text-xs sm:text-sm font-mono leading-relaxed overflow-auto max-h-[640px] whitespace-pre-wrap break-words">
                      <span className="text-purple-300/80">
                        &lt;script type="application/ld+json"&gt;
                      </span>
                      {'\n'}
                      {highlightJson(jsonString)}
                      {'\n'}
                      <span className="text-purple-300/80">&lt;/script&gt;</span>
                    </pre>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)]">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[var(--text-secondary)]">
                      Paste the full <span className="font-mono text-[var(--accent-amber)]">&lt;script&gt;</span> block inside your page's{' '}
                      <span className="font-mono text-[var(--accent-amber)]">&lt;head&gt;</span>. Then click Validate to verify with Google.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

function TabTrigger({
  value,
  icon: Icon,
  label,
}: {
  value: string
  icon: typeof Building2
  label: string
}) {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] data-[state=active]:bg-[var(--accent-amber)] data-[state=active]:text-[var(--brand-on-primary)] data-[state=active]:shadow-sm transition-all"
    >
      <Icon className="w-4 h-4" />
      <span className="truncate">{label}</span>
    </TabsTrigger>
  )
}

const fieldCls =
  'w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 hover:border-[var(--border-hover)]'

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
      {children}
      {hint && <span className="text-[var(--text-muted)] text-xs ml-1">({hint})</span>}
    </label>
  )
}

function LocalBusinessFields({
  value,
  onChange,
}: {
  value: LocalBusinessForm
  onChange: (v: LocalBusinessForm) => void
}) {
  const u = <K extends keyof LocalBusinessForm>(k: K, v: LocalBusinessForm[K]) =>
    onChange({ ...value, [k]: v })

  return (
    <div className="space-y-4">
      <Section icon={Building2} title="Local Business" subtitle="Restaurants, clinics, shops, agencies — Nigerian SMEs." />

      <div>
        <FieldLabel>Business name</FieldLabel>
        <input
          type="text"
          placeholder="Lagos Premium Properties"
          value={value.name}
          onChange={e => u('name', e.target.value)}
          className={fieldCls}
          aria-label="Business name"
        />
      </div>

      <div>
        <FieldLabel>Page URL</FieldLabel>
        <input
          type="url"
          placeholder="https://yoursite.com"
          value={value.url}
          onChange={e => u('url', e.target.value)}
          className={fieldCls}
          aria-label="Page URL"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Street address</FieldLabel>
          <input
            type="text"
            placeholder="12 Adeola Odeku Street"
            value={value.street}
            onChange={e => u('street', e.target.value)}
            className={fieldCls}
            aria-label="Street address"
          />
        </div>
        <div>
          <FieldLabel>City</FieldLabel>
          <input
            type="text"
            placeholder="Lagos"
            value={value.city}
            onChange={e => u('city', e.target.value)}
            className={fieldCls}
            aria-label="City"
          />
        </div>
        <div>
          <FieldLabel>State</FieldLabel>
          <input
            type="text"
            placeholder="LA"
            value={value.state}
            onChange={e => u('state', e.target.value)}
            className={fieldCls}
            aria-label="State"
          />
        </div>
        <div>
          <FieldLabel>Postal code</FieldLabel>
          <input
            type="text"
            placeholder="101241"
            value={value.postal}
            onChange={e => u('postal', e.target.value)}
            className={fieldCls}
            aria-label="Postal code"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Telephone</FieldLabel>
          <input
            type="tel"
            placeholder="+234 800 000 0000"
            value={value.telephone}
            onChange={e => u('telephone', e.target.value)}
            className={fieldCls}
            aria-label="Telephone"
          />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <input
            type="email"
            placeholder="hello@yourbiz.com"
            value={value.email}
            onChange={e => u('email', e.target.value)}
            className={fieldCls}
            aria-label="Email"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Opening hours</FieldLabel>
        <div className="flex flex-wrap gap-2 mb-3">
          {WEEKDAYS.map(d => {
            const active = value.openDays[d.code]
            return (
              <button
                type="button"
                key={d.code}
                onClick={() =>
                  u('openDays', { ...value.openDays, [d.code]: !active })
                }
                aria-pressed={active}
                aria-label={`Toggle ${d.label}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  active
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-[var(--accent-amber)]'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                }`}
              >
                {d.label}
              </button>
            )
          })}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel hint="open">Time</FieldLabel>
            <input
              type="time"
              value={value.openTime}
              onChange={e => u('openTime', e.target.value)}
              className={fieldCls}
              aria-label="Open time"
            />
          </div>
          <div>
            <FieldLabel hint="close">Time</FieldLabel>
            <input
              type="time"
              value={value.closeTime}
              onChange={e => u('closeTime', e.target.value)}
              className={fieldCls}
              aria-label="Close time"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Price range</FieldLabel>
          <select
            value={value.priceRange}
            onChange={e => u('priceRange', e.target.value)}
            className={fieldCls}
            aria-label="Price range"
          >
            <option value="₦">₦ (Budget)</option>
            <option value="₦₦">₦₦ (Mid-range)</option>
            <option value="₦₦₦">₦₦₦ (Premium)</option>
          </select>
        </div>
        <div>
          <FieldLabel>Area served</FieldLabel>
          <input
            type="text"
            placeholder="Lagos, Abuja, Port Harcourt"
            value={value.areaServed}
            onChange={e => u('areaServed', e.target.value)}
            className={fieldCls}
            aria-label="Area served"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Image URL</FieldLabel>
        <input
          type="url"
          placeholder="https://yoursite.com/cover.jpg"
          value={value.image}
          onChange={e => u('image', e.target.value)}
          className={fieldCls}
          aria-label="Image URL"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel hint="optional">Latitude</FieldLabel>
          <input
            type="number"
            step="0.000001"
            placeholder="6.4281"
            value={value.lat}
            onChange={e => u('lat', e.target.value)}
            className={fieldCls}
            aria-label="Latitude"
          />
        </div>
        <div>
          <FieldLabel hint="optional">Longitude</FieldLabel>
          <input
            type="number"
            step="0.000001"
            placeholder="3.4216"
            value={value.lng}
            onChange={e => u('lng', e.target.value)}
            className={fieldCls}
            aria-label="Longitude"
          />
        </div>
      </div>
    </div>
  )
}

function OrganizationFields({
  value,
  onChange,
}: {
  value: OrgForm
  onChange: (v: OrgForm) => void
}) {
  const u = <K extends keyof OrgForm>(k: K, v: OrgForm[K]) =>
    onChange({ ...value, [k]: v })

  return (
    <div className="space-y-4">
      <Section icon={Briefcase} title="Organization" subtitle="Company-level schema. Add once to your home page." />

      <div>
        <FieldLabel>Organization name</FieldLabel>
        <input
          type="text"
          placeholder="GetRanked Nigeria"
          value={value.name}
          onChange={e => u('name', e.target.value)}
          className={fieldCls}
          aria-label="Organization name"
        />
      </div>
      <div>
        <FieldLabel>Website URL</FieldLabel>
        <input
          type="url"
          placeholder="https://getranked.ng"
          value={value.url}
          onChange={e => u('url', e.target.value)}
          className={fieldCls}
          aria-label="Website URL"
        />
      </div>
      <div>
        <FieldLabel>Logo URL</FieldLabel>
        <input
          type="url"
          placeholder="https://getranked.ng/logo.png"
          value={value.logo}
          onChange={e => u('logo', e.target.value)}
          className={fieldCls}
          aria-label="Logo URL"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Founder</FieldLabel>
          <input
            type="text"
            placeholder="Adaobi Okonkwo"
            value={value.founder}
            onChange={e => u('founder', e.target.value)}
            className={fieldCls}
            aria-label="Founder"
          />
        </div>
        <div>
          <FieldLabel>Founding date</FieldLabel>
          <input
            type="date"
            value={value.foundingDate}
            onChange={e => u('foundingDate', e.target.value)}
            className={fieldCls}
            aria-label="Founding date"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <FieldLabel>Street address</FieldLabel>
          <input
            type="text"
            value={value.street}
            onChange={e => u('street', e.target.value)}
            className={fieldCls}
            placeholder="123 Marina Road"
            aria-label="Street address"
          />
        </div>
        <div>
          <FieldLabel>City</FieldLabel>
          <input
            type="text"
            value={value.city}
            onChange={e => u('city', e.target.value)}
            className={fieldCls}
            aria-label="City"
          />
        </div>
        <div>
          <FieldLabel>State</FieldLabel>
          <input
            type="text"
            value={value.state}
            onChange={e => u('state', e.target.value)}
            className={fieldCls}
            aria-label="State"
          />
        </div>
        <div>
          <FieldLabel>Postal code</FieldLabel>
          <input
            type="text"
            value={value.postal}
            onChange={e => u('postal', e.target.value)}
            className={fieldCls}
            aria-label="Postal code"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <FieldLabel>Social profiles (sameAs)</FieldLabel>
          <button
            type="button"
            onClick={() =>
              u('sameAs', [...value.sameAs, { id: rid(), value: '' }])
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-[var(--accent-amber)] text-xs font-semibold transition-colors hover:bg-emerald-500/25"
            aria-label="Add a social profile URL"
          >
            <Plus className="w-3.5 h-3.5" />
            Add URL
          </button>
        </div>
        <div className="space-y-2">
          {value.sameAs.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2">
              <input
                type="url"
                placeholder="https://twitter.com/yourbrand"
                value={s.value}
                onChange={e =>
                  u(
                    'sameAs',
                    value.sameAs.map(x =>
                      x.id === s.id ? { ...x, value: e.target.value } : x
                    )
                  )
                }
                className={fieldCls}
                aria-label={`Social URL ${idx + 1}`}
              />
              <button
                type="button"
                onClick={() => u('sameAs', value.sameAs.filter(x => x.id !== s.id))}
                className="p-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                aria-label={`Remove social URL ${idx + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FaqFields({
  value,
  onChange,
}: {
  value: FaqForm
  onChange: (v: FaqForm) => void
}) {
  return (
    <div className="space-y-4">
      <Section icon={HelpCircle} title="FAQ Page" subtitle="Answer customer questions inline — AI loves this." />

      <div>
        <FieldLabel hint="optional">Page URL</FieldLabel>
        <input
          type="url"
          placeholder="https://yoursite.com/faq"
          value={value.url}
          onChange={e => onChange({ ...value, url: e.target.value })}
          className={fieldCls}
          aria-label="FAQ page URL"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <FieldLabel>Questions &amp; answers</FieldLabel>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                items: [...value.items, { id: rid(), question: '', answer: '' }],
              })
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-[var(--accent-amber)] text-xs font-semibold transition-colors hover:bg-emerald-500/25"
            aria-label="Add an FAQ item"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Q&amp;A
          </button>
        </div>
        <div className="space-y-3">
          {value.items.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Q{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      items: value.items.filter(x => x.id !== item.id),
                    })
                  }
                  className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                  aria-label={`Remove FAQ item ${idx + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Question..."
                value={item.question}
                onChange={e =>
                  onChange({
                    ...value,
                    items: value.items.map(x =>
                      x.id === item.id ? { ...x, question: e.target.value } : x
                    ),
                  })
                }
                className={fieldCls}
                aria-label={`Question ${idx + 1}`}
              />
              <textarea
                rows={3}
                placeholder="Answer..."
                value={item.answer}
                onChange={e =>
                  onChange({
                    ...value,
                    items: value.items.map(x =>
                      x.id === item.id ? { ...x, answer: e.target.value } : x
                    ),
                  })
                }
                className={`${fieldCls} resize-none`}
                aria-label={`Answer ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServiceFields({
  value,
  onChange,
}: {
  value: ServiceForm
  onChange: (v: ServiceForm) => void
}) {
  const u = <K extends keyof ServiceForm>(k: K, v: ServiceForm[K]) =>
    onChange({ ...value, [k]: v })

  return (
    <div className="space-y-4">
      <Section icon={Wrench} title="Service" subtitle="Individual offerings — visa processing, audits, legal, etc." />

      <div>
        <FieldLabel>Service name</FieldLabel>
        <input
          type="text"
          placeholder="Canadian Express Entry Application"
          value={value.name}
          onChange={e => u('name', e.target.value)}
          className={fieldCls}
          aria-label="Service name"
        />
      </div>
      <div>
        <FieldLabel>Provider name</FieldLabel>
        <input
          type="text"
          placeholder="Your company name"
          value={value.providerName}
          onChange={e => u('providerName', e.target.value)}
          className={fieldCls}
          aria-label="Provider name"
        />
      </div>
      <div>
        <FieldLabel>Page URL</FieldLabel>
        <input
          type="url"
          placeholder="https://yoursite.com/service"
          value={value.url}
          onChange={e => u('url', e.target.value)}
          className={fieldCls}
          aria-label="Service page URL"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Area served</FieldLabel>
          <input
            type="text"
            placeholder="Nigeria"
            value={value.areaServed}
            onChange={e => u('areaServed', e.target.value)}
            className={fieldCls}
            aria-label="Area served"
          />
        </div>
        <div>
          <FieldLabel>Price range</FieldLabel>
          <select
            value={value.priceRange}
            onChange={e => u('priceRange', e.target.value)}
            className={fieldCls}
            aria-label="Price range"
          >
            <option value="₦">₦ (Budget)</option>
            <option value="₦₦">₦₦ (Mid-range)</option>
            <option value="₦₦₦">₦₦₦ (Premium)</option>
          </select>
        </div>
      </div>
      <div>
        <FieldLabel>Description</FieldLabel>
        <textarea
          rows={4}
          placeholder="What does this service include?"
          value={value.description}
          onChange={e => u('description', e.target.value)}
          className={`${fieldCls} resize-none`}
          aria-label="Service description"
        />
      </div>
    </div>
  )
}

function ArticleFields({
  value,
  onChange,
}: {
  value: ArticleForm
  onChange: (v: ArticleForm) => void
}) {
  const u = <K extends keyof ArticleForm>(k: K, v: ArticleForm[K]) =>
    onChange({ ...value, [k]: v })

  return (
    <div className="space-y-4">
      <Section icon={Newspaper} title="Article" subtitle="Blog posts, news articles, long-form guides." />

      <div>
        <FieldLabel>Headline</FieldLabel>
        <input
          type="text"
          placeholder="How to rank on Google in Nigeria in 2026"
          value={value.headline}
          onChange={e => u('headline', e.target.value)}
          className={fieldCls}
          aria-label="Article headline"
        />
      </div>
      <div>
        <FieldLabel>Article URL</FieldLabel>
        <input
          type="url"
          placeholder="https://yoursite.com/blog/post-slug"
          value={value.url}
          onChange={e => u('url', e.target.value)}
          className={fieldCls}
          aria-label="Article URL"
        />
      </div>
      <div>
        <FieldLabel>Featured image URL</FieldLabel>
        <input
          type="url"
          placeholder="https://yoursite.com/blog/cover.jpg"
          value={value.image}
          onChange={e => u('image', e.target.value)}
          className={fieldCls}
          aria-label="Featured image URL"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Author name</FieldLabel>
          <input
            type="text"
            placeholder="Adaobi Okonkwo"
            value={value.author}
            onChange={e => u('author', e.target.value)}
            className={fieldCls}
            aria-label="Author name"
          />
        </div>
        <div>
          <FieldLabel>Date published</FieldLabel>
          <input
            type="date"
            value={value.datePublished}
            onChange={e => u('datePublished', e.target.value)}
            className={fieldCls}
            aria-label="Date published"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Publisher name</FieldLabel>
          <input
            type="text"
            placeholder="GetRanked"
            value={value.publisherName}
            onChange={e => u('publisherName', e.target.value)}
            className={fieldCls}
            aria-label="Publisher name"
          />
        </div>
        <div>
          <FieldLabel>Publisher logo URL</FieldLabel>
          <input
            type="url"
            placeholder="https://yoursite.com/logo.png"
            value={value.publisherLogo}
            onChange={e => u('publisherLogo', e.target.value)}
            className={fieldCls}
            aria-label="Publisher logo URL"
          />
        </div>
      </div>
    </div>
  )
}

function Section({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Building2
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3 pb-2">
      <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
        <Icon className="w-4 h-4 text-[var(--accent-amber)]" />
      </div>
      <div>
        <h3 className="text-heading-3 text-[var(--text-primary)]">{title}</h3>
        <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
      </div>
    </div>
  )
}

function highlightJson(json: string) {
  const tokens = json.split(/("(?:\\.|[^"\\])*"\s*:|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g)
  return tokens.map((tok, i) => {
    if (!tok) return null
    if (/^"(?:\\.|[^"\\])*"\s*:$/.test(tok)) {
      return (
        <span key={i} className="text-emerald-300">
          {tok}
        </span>
      )
    }
    if (/^"(?:\\.|[^"\\])*"$/.test(tok)) {
      return (
        <span key={i} className="text-emerald-300">
          {tok}
        </span>
      )
    }
    if (/^(true|false|null)$/.test(tok)) {
      return (
        <span key={i} className="text-purple-300">
          {tok}
        </span>
      )
    }
    if (/^-?\d/.test(tok)) {
      return (
        <span key={i} className="text-teal-300">
          {tok}
        </span>
      )
    }
    return (
      <span key={i} className="text-white/85">
        {tok}
      </span>
    )
  })
}
