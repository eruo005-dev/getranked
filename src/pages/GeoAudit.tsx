import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Search,
  BarChart3,
  TrendingUp,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Download,
  Loader2,
  ArrowRight,
  FileText,
  Zap,
  Shield,
  MessageSquare,
  ChevronRight,
  Send
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

/* ─── Types ─── */
interface AuditResult {
  overallScore: number
  visibilityScore: number
  sentimentScore: number
  mentionCount: number
  competitorGap: number
  recommendations: string[]
  topKeywords: string[]
  brandMentions: { source: string; count: number; sentiment: 'positive' | 'neutral' | 'negative' }[]
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

/* ─── Animated Score Ring ─── */
function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[120px] h-[120px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth="8"
          />
          <motion.circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-data-md font-mono font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}%
          </motion.span>
        </div>
      </div>
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
    </div>
  )
}

/* ─── Loading Stage ─── */
const loadingStages = [
  { label: 'Initializing audit engine...', progress: 10 },
  { label: 'Scanning AI search platforms...', progress: 25 },
  { label: 'Analyzing brand mentions...', progress: 45 },
  { label: 'Evaluating sentiment signals...', progress: 65 },
  { label: 'Comparing against competitors...', progress: 80 },
  { label: 'Generating recommendations...', progress: 95 },
  { label: 'Finalizing your report...', progress: 100 },
]

/* ─── Main GeoAudit Page ─── */
export default function GeoAudit() {
  const [url, setUrl] = useState('')
  const [brandName, setBrandName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    setCurrentStage(0)
    setResult(null)

    // Simulate audit process
    for (let i = 0; i < loadingStages.length; i++) {
      setCurrentStage(i)
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    // Simulated result
    setResult({
      overallScore: Math.floor(Math.random() * 40) + 45,
      visibilityScore: Math.floor(Math.random() * 50) + 30,
      sentimentScore: Math.floor(Math.random() * 30) + 60,
      mentionCount: Math.floor(Math.random() * 500) + 50,
      competitorGap: Math.floor(Math.random() * 30) + 10,
      recommendations: [
        'Optimize your LLMs.txt file for better AI crawler access',
        'Increase brand mention frequency on high-authority platforms',
        'Implement structured data markup across key pages',
        'Develop GEO-specific content briefs targeting AI overviews',
        'Build citation signals from trusted industry sources',
        'Enhance E-E-A-T signals with author bios and credentials',
      ],
      topKeywords: ['brand name', 'industry service', 'location based', 'product category', 'company reviews'],
      brandMentions: [
        { source: 'ChatGPT / OpenAI', count: 245, sentiment: 'positive' },
        { source: 'Google SGE', count: 189, sentiment: 'neutral' },
        { source: 'Perplexity', count: 98, sentiment: 'positive' },
        { source: 'Bing Copilot', count: 67, sentiment: 'neutral' },
        { source: 'Industry Forums', count: 134, sentiment: 'negative' },
      ],
    })

    setIsLoading(false)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  const handleDownload = () => {
    // Simulated PDF download
    const element = document.createElement('a')
    const file = new Blob(['GEO Audit Report - ' + brandName], { type: 'application/pdf' })
    element.href = URL.createObjectURL(file)
    element.download = `GEO-Audit-${brandName.replace(/\s+/g, '-')}.pdf`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#10B981'
    if (score >= 50) return '#F59E0B'
    return '#EF4444'
  }

  return (
    <div className="relative overflow-hidden">
      {/* ─── Ambient Glow Orbs ─── */}
      <GlowOrb className="w-[500px] h-[500px] bg-purple-500/10 -top-48 -left-48" />
      <GlowOrb className="w-[400px] h-[400px] bg-amber-500/10 top-[30%] -right-48" />
      <GlowOrb className="w-[300px] h-[300px] bg-teal-500/8 top-[60%] -left-24" />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-20 pb-16">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="eyebrow bg-purple-500/10 text-purple-500 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              GEO AUDIT
            </span>
            <h1 className="text-display-2 text-[var(--text-primary)] mb-5 max-w-4xl">
              Discover Your <span className="text-gradient-amber">AI Visibility</span> Score
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mb-8">
              Get a comprehensive analysis of how your brand appears across AI search engines, 
              chatbots, and generative platforms. Identify gaps and unlock growth opportunities.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: Search, label: 'Platforms Scanned', value: '15+' },
                { icon: BarChart3, label: 'Data Points', value: '10K+' },
                { icon: Zap, label: 'Report Ready In', value: '< 2 min' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 glass-panel px-5 py-3"
                >
                  <stat.icon className="w-5 h-5 text-[var(--accent-amber)]" />
                  <div className="text-left">
                    <p className="text-lg font-bold text-[var(--text-primary)] leading-none">{stat.value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ AUDIT FORM ═══════════ */}
      <section className="relative pb-20">
        <div className="container-main max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-heading-3 text-[var(--text-primary)]">Start Your Audit</h2>
                <p className="text-sm text-[var(--text-muted)]">Fill in your details below</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://yourcompany.com"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50 hover:border-[var(--border-hover)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your brand or company name"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50 hover:border-[var(--border-hover)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50 hover:border-[var(--border-hover)]"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                >
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running Audit...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Run Free GEO Audit
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-[var(--text-muted)]">
                One-time ₦100,000 value — Free for a limited time. No credit card required.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ LOADING STATE ═══════════ */}
      <AnimatePresence>
        {isLoading && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative pb-20 overflow-hidden"
          >
            <div className="container-main max-w-2xl">
              <div className="glass-panel p-8 md:p-10 text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[var(--bg-tertiary)]" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                  </div>
                </div>

                <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">
                  Analyzing {brandName}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-8">
                  {loadingStages[currentStage]?.label}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <Progress
                    value={loadingStages[currentStage]?.progress || 0}
                    className="h-2.5 bg-[var(--bg-tertiary)]"
                  />
                </div>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {loadingStages[currentStage]?.progress || 0}%
                </p>

                {/* Scanning Animation */}
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {['ChatGPT', 'Google SGE', 'Perplexity', 'Bing', 'Claude', 'Gemini'].map((platform, i) => (
                    <motion.div
                      key={platform}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: currentStage >= i ? 1 : 0.3,
                        scale: currentStage >= i ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        currentStage >= i
                          ? 'bg-purple-500/15 border-purple-500/30 text-purple-500'
                          : 'bg-[var(--bg-tertiary)] border-[var(--border-default)] text-[var(--text-muted)]'
                      }`}
                    >
                      {platform}
                      {currentStage >= i && (
                        <CheckCircle2 className="w-3 h-3 inline ml-1.5" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════════ RESULTS ═══════════ */}
      <AnimatePresence>
        {result && (
          <motion.section
            ref={resultRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative pb-24"
          >
            <div className="container-main max-w-5xl">
              {/* Results Header */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-500 text-sm font-semibold mb-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Audit Complete
                </motion.div>
                <h2 className="text-heading-1 text-[var(--text-primary)] mb-2">
                  {brandName} — Audit Results
                </h2>
                <p className="text-body-lg text-[var(--text-secondary)]">
                  Here&apos;s how your brand performs across AI search platforms
                </p>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-panel p-6 flex flex-col items-center"
                >
                  <ScoreRing score={result.overallScore} label="Overall Score" color={getScoreColor(result.overallScore)} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-panel p-6 flex flex-col items-center"
                >
                  <ScoreRing score={result.visibilityScore} label="Visibility" color={getScoreColor(result.visibilityScore)} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-panel p-6 flex flex-col items-center"
                >
                  <ScoreRing score={result.sentimentScore} label="Sentiment" color={getScoreColor(result.sentimentScore)} />
                </motion.div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Total Mentions', value: result.mentionCount.toLocaleString(), icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Competitor Gap', value: `-${result.competitorGap}%`, icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-500/10' },
                  { label: 'Platforms Found', value: '12', icon: Globe, color: 'text-teal-500', bg: 'bg-teal-500/10' },
                  { label: 'Action Items', value: `${result.recommendations.length}`, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="card-base p-5"
                  >
                    <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <p className="text-data-md text-[var(--text-primary)]">{stat.value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Recommendations */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-panel p-6"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <h3 className="text-heading-3 text-[var(--text-primary)]">Recommendations</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-amber-500">{i + 1}</span>
                        </span>
                        <span className="text-sm text-[var(--text-secondary)]">{rec}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Brand Mentions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-panel p-6"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    <h3 className="text-heading-3 text-[var(--text-primary)]">Mentions by Platform</h3>
                  </div>
                  <div className="space-y-4">
                    {result.brandMentions.map((mention, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.08 }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-[var(--text-primary)] font-medium">{mention.source}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-[var(--text-secondary)]">{mention.count}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              mention.sentiment === 'positive' ? 'bg-emerald-500/15 text-emerald-500' :
                              mention.sentiment === 'negative' ? 'bg-red-500/15 text-red-500' :
                              'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                            }`}>
                              {mention.sentiment}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              mention.sentiment === 'positive' ? 'bg-emerald-500' :
                              mention.sentiment === 'negative' ? 'bg-red-500' :
                              'bg-amber-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(mention.count / 250) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Top Keywords */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-panel p-6 mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-5 h-5 text-teal-500" />
                  <h3 className="text-heading-3 text-[var(--text-primary)]">Top Associated Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.topKeywords.map((kw, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.08 }}
                      className="px-4 py-2 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] hover:border-teal-500/40 hover:text-teal-500 transition-colors cursor-default"
                    >
                      {kw}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button
                  onClick={handleDownload}
                  className="btn-secondary"
                >
                  <Download className="w-4 h-4" />
                  Download PDF Report
                </button>
                <Link to="/pricing" className="btn-primary shadow-glow">
                  <Sparkles className="w-4 h-4" />
                  Unlock Full Analysis
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      {!result && !isLoading && (
        <section className="relative pb-24">
          <div className="container-main max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-heading-1 text-[var(--text-primary)] mb-3">
                How the <span className="text-gradient-amber">GEO Audit</span> Works
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)]">
                Three simple steps to understand your AI search presence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  icon: Send,
                  title: 'Submit Your Details',
                  description: 'Enter your website URL, brand name, and email. No credit card or signup required.',
                  color: 'text-purple-500',
                  bg: 'bg-purple-500/10',
                },
                {
                  step: '02',
                  icon: Search,
                  title: 'We Scan AI Platforms',
                  description: 'Our engine scans ChatGPT, Google SGE, Perplexity, Bing Copilot, and 10+ other AI platforms.',
                  color: 'text-amber-500',
                  bg: 'bg-amber-500/10',
                },
                {
                  step: '03',
                  icon: FileText,
                  title: 'Get Your Report',
                  description: 'Receive a detailed analysis with scores, recommendations, and actionable insights in under 2 minutes.',
                  color: 'text-teal-500',
                  bg: 'bg-teal-500/10',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="card-base p-6 text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)] mb-2 block">{item.step}</span>
                  <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TRUST SIGNALS ═══════════ */}
      {!result && !isLoading && (
        <section className="relative pb-24">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 md:p-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {[
                  { icon: Shield, label: 'Your data is secure', desc: '256-bit encryption, never shared with third parties.' },
                  { icon: CheckCircle2, label: 'No credit card required', desc: 'Start your audit completely free of charge.' },
                  { icon: Sparkles, label: 'Powered by AI', desc: 'Advanced NLP models analyze your brand presence.' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-amber-500" />
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.label}</h4>
                    <p className="text-xs text-[var(--text-muted)] max-w-[200px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
