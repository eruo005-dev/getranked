import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import {
  Sparkles,
  FileCode,
  Download,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Bot,
  ArrowRight,
  ShieldCheck,
  Globe,
} from 'lucide-react'

type PageRow = { id: string; label: string; url: string; description: string }

const BUSINESS_TYPES = [
  'Real Estate',
  'School',
  'Fertility Clinic',
  'Fintech',
  'Japa Agent',
  'Law Firm',
  'Restaurant',
  'Hotel',
  'Fashion',
  'Other',
] as const

type FormState = {
  siteName: string
  siteUrl: string
  shortDescription: string
  longDescription: string
  businessType: string
  city: string
  country: string
  contactEmail: string
  corePages: PageRow[]
  optionalPages: PageRow[]
}

const newRow = (): PageRow => ({
  id: Math.random().toString(36).slice(2, 9),
  label: '',
  url: '',
  description: '',
})

const INITIAL: FormState = {
  siteName: '',
  siteUrl: '',
  shortDescription: '',
  longDescription: '',
  businessType: 'Real Estate',
  city: '',
  country: 'Nigeria',
  contactEmail: '',
  corePages: [
    { id: 'p1', label: 'Home', url: '/', description: 'Main landing page' },
    { id: 'p2', label: 'About', url: '/about', description: 'About the company' },
  ],
  optionalPages: [
    { id: 'o1', label: 'Blog', url: '/blog', description: 'Latest articles and insights' },
  ],
}

function isValidUrl(value: string): boolean {
  if (!value) return false
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function buildLlmsTxt(form: FormState): string {
  const lines: string[] = []
  const name = form.siteName.trim() || 'Your Site Name'
  const baseUrl = form.siteUrl.trim().replace(/\/$/, '')

  lines.push(`# ${name}`)
  lines.push('')

  if (form.shortDescription.trim()) {
    lines.push(`> ${form.shortDescription.trim()}`)
    lines.push('')
  }

  const metaBits: string[] = []
  if (form.businessType) metaBits.push(`**Business type:** ${form.businessType}`)
  if (form.city.trim()) metaBits.push(`**City:** ${form.city.trim()}`)
  if (form.country.trim()) metaBits.push(`**Country:** ${form.country.trim()}`)
  if (form.contactEmail.trim()) metaBits.push(`**Contact:** ${form.contactEmail.trim()}`)
  if (metaBits.length) {
    lines.push(metaBits.join('  \n'))
    lines.push('')
  }

  if (form.longDescription.trim()) {
    lines.push('## About')
    lines.push('')
    lines.push(form.longDescription.trim())
    lines.push('')
  }

  const renderRow = (p: PageRow) => {
    const label = p.label.trim() || 'Untitled'
    const rawUrl = p.url.trim()
    const fullUrl = rawUrl.startsWith('http')
      ? rawUrl
      : baseUrl
        ? `${baseUrl}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
        : rawUrl
    const desc = p.description.trim()
    return desc ? `- [${label}](${fullUrl}): ${desc}` : `- [${label}](${fullUrl})`
  }

  const validCore = form.corePages.filter(p => p.label.trim() || p.url.trim())
  if (validCore.length) {
    lines.push('## Core pages')
    lines.push('')
    validCore.forEach(p => lines.push(renderRow(p)))
    lines.push('')
  }

  const validOptional = form.optionalPages.filter(p => p.label.trim() || p.url.trim())
  if (validOptional.length) {
    lines.push('## Optional')
    lines.push('')
    validOptional.forEach(p => lines.push(renderRow(p)))
    lines.push('')
  }

  return lines.join('\n').trimEnd() + '\n'
}

export default function LLMsTxtGenerator() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    document.title = 'llms.txt Generator — getranked.ng'
  }, [])

  const preview = useMemo(() => buildLlmsTxt(form), [form])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key as string]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const updateRow = (
    listKey: 'corePages' | 'optionalPages',
    id: string,
    field: keyof PageRow,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [listKey]: prev[listKey].map(r => (r.id === id ? { ...r, [field]: value } : r)),
    }))
  }

  const addRow = (listKey: 'corePages' | 'optionalPages') => {
    setForm(prev => ({ ...prev, [listKey]: [...prev[listKey], newRow()] }))
  }

  const removeRow = (listKey: 'corePages' | 'optionalPages', id: string) => {
    setForm(prev => ({ ...prev, [listKey]: prev[listKey].filter(r => r.id !== id) }))
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.siteName.trim()) e.siteName = 'Site name is required'
    if (!form.siteUrl.trim()) e.siteUrl = 'Site URL is required'
    else if (!isValidUrl(form.siteUrl.trim())) e.siteUrl = 'Enter a valid URL (https://example.com)'
    if (!form.shortDescription.trim()) e.shortDescription = 'A short description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCopy = async () => {
    if (!validate()) {
      toast.error('Please fix the highlighted fields first.')
      return
    }
    try {
      await navigator.clipboard.writeText(preview)
      setCopied(true)
      toast.success('llms.txt copied to clipboard')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Clipboard access denied')
    }
  }

  const handleDownload = () => {
    if (!validate()) {
      toast.error('Please fix the highlighted fields first.')
      return
    }
    const blob = new Blob([preview], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'llms.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('llms.txt downloaded')
  }

  const handleReset = () => {
    setForm(INITIAL)
    setErrors({})
    toast.success('Form reset')
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 hover:border-[var(--border-hover)]'
  const errCls = 'border-red-500/60 focus:ring-red-500/40 focus:border-red-500/50'

  return (
    <div className="relative overflow-hidden">
      <Toaster richColors position="bottom-right" />

      <div
        className="absolute rounded-full blur-[120px] pointer-events-none w-[500px] h-[500px] bg-amber-500/10 -top-48 -left-48"
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none w-[400px] h-[400px] bg-teal-500/10 top-[30%] -right-48"
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
            <span className="eyebrow bg-amber-500/10 text-[var(--accent-amber)] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              FREE GEO TOOL
            </span>
            <h1 className="text-display-2 text-[var(--text-primary)] mb-5 max-w-4xl">
              Generate your <span className="text-gradient-amber">llms.txt</span> in 60 seconds
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mb-8">
              The markdown standard AI search engines use to understand your site.
              Fill the form, preview live, download, deploy.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#generator" className="btn-primary" aria-label="Jump to generator form">
                <FileCode className="w-4 h-4" />
                Start generating
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://llmstxt.org"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-secondary"
                aria-label="Open the llms.txt specification"
              >
                <Globe className="w-4 h-4" />
                Read the spec
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
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[var(--accent-amber)]" />
              </div>
              <div>
                <h2 className="text-heading-3 text-[var(--text-primary)]">What is llms.txt?</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Why every Nigerian business needs one
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'A markdown file that helps AI search engines (ChatGPT, Claude, Perplexity, Gemini) understand your site.',
                'Place it at https://yoursite.com/llms.txt so AI crawlers find it automatically.',
                'The GEO equivalent of robots.txt — but written for large language models.',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center">
                  <FileCode className="w-4 h-4 text-[var(--accent-amber)]" />
                </div>
                <h2 className="text-heading-3 text-[var(--text-primary)]">Your site details</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Site name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="GetRanked Nigeria"
                    value={form.siteName}
                    onChange={e => update('siteName', e.target.value)}
                    className={`${inputCls} ${errors.siteName ? errCls : ''}`}
                    aria-label="Site name"
                    aria-invalid={!!errors.siteName}
                  />
                  {errors.siteName && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.siteName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Site URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://getranked.ng"
                    value={form.siteUrl}
                    onChange={e => update('siteUrl', e.target.value)}
                    className={`${inputCls} ${errors.siteUrl ? errCls : ''}`}
                    aria-label="Site URL"
                    aria-invalid={!!errors.siteUrl}
                  />
                  {errors.siteUrl && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.siteUrl}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Short description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Nigeria's #1 SEO + GEO platform helping local businesses rank on Google and AI search."
                    value={form.shortDescription}
                    onChange={e => update('shortDescription', e.target.value)}
                    className={`${inputCls} resize-none ${errors.shortDescription ? errCls : ''}`}
                    aria-label="Short description"
                    aria-invalid={!!errors.shortDescription}
                  />
                  {errors.shortDescription && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.shortDescription}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Long description <span className="text-[var(--text-muted)] text-xs">(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell AI engines who you are, what you do, and who you serve. The more context, the better."
                    value={form.longDescription}
                    onChange={e => update('longDescription', e.target.value)}
                    className={`${inputCls} resize-none`}
                    aria-label="Long description"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Business type
                    </label>
                    <select
                      value={form.businessType}
                      onChange={e => update('businessType', e.target.value)}
                      className={inputCls}
                      aria-label="Business type"
                    >
                      {BUSINESS_TYPES.map(t => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Contact email <span className="text-[var(--text-muted)] text-xs">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@yoursite.com"
                      value={form.contactEmail}
                      onChange={e => update('contactEmail', e.target.value)}
                      className={inputCls}
                      aria-label="Contact email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Lagos"
                      value={form.city}
                      onChange={e => update('city', e.target.value)}
                      className={inputCls}
                      aria-label="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="Nigeria"
                      value={form.country}
                      onChange={e => update('country', e.target.value)}
                      className={inputCls}
                      aria-label="Country"
                    />
                  </div>
                </div>

                <PageListEditor
                  title="Core pages"
                  hint="Your most important URLs (Home, Services, Pricing, Contact)."
                  rows={form.corePages}
                  onAdd={() => addRow('corePages')}
                  onRemove={id => removeRow('corePages', id)}
                  onChange={(id, field, v) => updateRow('corePages', id, field, v)}
                />

                <PageListEditor
                  title="Optional pages"
                  hint="Secondary URLs you'd like AI to know about (Blog, Case Studies, Press)."
                  rows={form.optionalPages}
                  onAdd={() => addRow('optionalPages')}
                  onRemove={id => removeRow('optionalPages', id)}
                  onChange={(id, field, v) => updateRow('optionalPages', id, field, v)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-amber)] text-[#0A0F1A] font-jakarta font-semibold text-sm transition-all duration-200 hover:bg-[var(--accent-amber-hover)] hover:scale-[1.02] active:scale-[0.98]"
                    aria-label="Copy llms.txt to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy to clipboard
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] bg-transparent font-jakarta font-semibold text-sm transition-all duration-200 hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)] active:scale-[0.98]"
                    aria-label="Download llms.txt file"
                  >
                    <Download className="w-4 h-4" />
                    Download llms.txt
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] font-jakarta font-medium text-sm transition-all duration-200"
                    aria-label="Reset the form"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[#0A0F1A]">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <span className="text-xs font-mono text-white/60 ml-2">llms.txt</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                      live preview
                    </span>
                  </div>
                  <pre className="p-5 text-xs sm:text-sm font-mono leading-relaxed text-white/90 overflow-auto max-h-[640px] whitespace-pre-wrap break-words">
                    {highlightMarkdown(preview)}
                  </pre>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[var(--text-secondary)]">
                    Upload the downloaded file to your site root so it resolves at{' '}
                    <span className="font-mono text-[var(--accent-amber)]">
                      {(form.siteUrl.trim().replace(/\/$/, '') || 'https://yoursite.com')}/llms.txt
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PageListEditor({
  title,
  hint,
  rows,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string
  hint: string
  rows: PageRow[]
  onAdd: () => void
  onRemove: (id: string) => void
  onChange: (id: string, field: keyof PageRow, value: string) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
          <p className="text-xs text-[var(--text-muted)]">{hint}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 text-[var(--accent-amber)] text-xs font-semibold transition-colors hover:bg-amber-500/25"
          aria-label={`Add a row to ${title}`}
        >
          <Plus className="w-3.5 h-3.5" />
          Add row
        </button>
      </div>

      <div className="space-y-2">
        {rows.length === 0 && (
          <p className="text-xs text-[var(--text-muted)] italic px-1 py-2">
            No rows yet. Click "Add row" to start.
          </p>
        )}
        {rows.map((row, idx) => (
          <div
            key={row.id}
            className="grid grid-cols-12 gap-2 p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)]"
          >
            <input
              type="text"
              placeholder="Label"
              value={row.label}
              onChange={e => onChange(row.id, 'label', e.target.value)}
              className="col-span-12 sm:col-span-3 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              aria-label={`${title} row ${idx + 1} label`}
            />
            <input
              type="text"
              placeholder="/path or full URL"
              value={row.url}
              onChange={e => onChange(row.id, 'url', e.target.value)}
              className="col-span-12 sm:col-span-3 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              aria-label={`${title} row ${idx + 1} url`}
            />
            <input
              type="text"
              placeholder="Short description"
              value={row.description}
              onChange={e => onChange(row.id, 'description', e.target.value)}
              className="col-span-10 sm:col-span-5 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              aria-label={`${title} row ${idx + 1} description`}
            />
            <button
              type="button"
              onClick={() => onRemove(row.id)}
              className="col-span-2 sm:col-span-1 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
              aria-label={`Remove ${title} row ${idx + 1}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function highlightMarkdown(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    let className = ''
    if (line.startsWith('# ')) className = 'text-amber-400 font-semibold'
    else if (line.startsWith('## ')) className = 'text-teal-300 font-semibold'
    else if (line.startsWith('> ')) className = 'text-purple-300 italic'
    else if (line.startsWith('- ')) className = 'text-white/85'
    else if (line.includes('**')) className = 'text-emerald-300/90'
    return (
      <span key={i} className={className}>
        {line}
        {'\n'}
      </span>
    )
  })
}
