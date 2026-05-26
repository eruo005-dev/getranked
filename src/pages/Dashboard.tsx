import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Globe,
  Users,
  FileText,
  MapPin,
  Settings,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Zap,
  Plus,
  Menu,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

/* ─────────────────────────── Mock Data ─────────────────────────── */

const lineChartData = [
  { date: 'Mon', ChatGPT: 4, Claude: 2, Perplexity: 3, Gemini: 1, Bing: 2 },
  { date: 'Tue', ChatGPT: 6, Claude: 3, Perplexity: 4, Gemini: 2, Bing: 3 },
  { date: 'Wed', ChatGPT: 5, Claude: 4, Perplexity: 5, Gemini: 3, Bing: 4 },
  { date: 'Thu', ChatGPT: 8, Claude: 5, Perplexity: 6, Gemini: 2, Bing: 5 },
  { date: 'Fri', ChatGPT: 7, Claude: 6, Perplexity: 7, Gemini: 4, Bing: 6 },
  { date: 'Sat', ChatGPT: 9, Claude: 7, Perplexity: 8, Gemini: 5, Bing: 7 },
  { date: 'Sun', ChatGPT: 11, Claude: 8, Perplexity: 9, Gemini: 6, Bing: 8 },
]

const barChartData = [
  { range: '1-3', count: 4 },
  { range: '4-10', count: 8 },
  { range: '11-20', count: 15 },
  { range: '21-50', count: 23 },
  { range: '50+', count: 12 },
]

const areaChartData = [
  { month: 'Jan', traffic: 2.1, mentions: 8 },
  { month: 'Feb', traffic: 2.4, mentions: 10 },
  { month: 'Mar', traffic: 2.8, mentions: 12 },
  { month: 'Apr', traffic: 3.2, mentions: 15 },
  { month: 'May', traffic: 3.6, mentions: 18 },
  { month: 'Jun', traffic: 4.2, mentions: 23 },
]

const llmTableData = [
  { query: 'Best SEO agency Lagos', ChatGPT: 'Mentioned', Claude: 'Mentioned', Perplexity: 'Mentioned', Gemini: 'Not Mentioned', Bing: 'Mentioned', Overall: 'Mentioned' },
  { query: 'Top digital marketing Nigeria', ChatGPT: 'Mentioned', Claude: 'Not Mentioned', Perplexity: 'Mentioned', Gemini: 'Mentioned', Bing: 'Not Mentioned', Overall: 'Partial' },
  { query: 'GEO optimization services', ChatGPT: 'Not Mentioned', Claude: 'Mentioned', Perplexity: 'Mentioned', Gemini: 'Not Mentioned', Bing: 'Mentioned', Overall: 'Partial' },
  { query: 'AI search ranking experts', ChatGPT: 'Mentioned', Claude: 'Mentioned', Perplexity: 'Mentioned', Gemini: 'Mentioned', Bing: 'Mentioned', Overall: 'Mentioned' },
  { query: 'Local SEO consultant', ChatGPT: 'Mentioned', Claude: 'Not Mentioned', Perplexity: 'Not Mentioned', Gemini: 'Mentioned', Bing: 'Not Mentioned', Overall: 'Partial' },
  { query: 'Best SEO tools 2024', ChatGPT: 'Mentioned', Claude: 'Mentioned', Perplexity: 'Mentioned', Gemini: 'Mentioned', Bing: 'Mentioned', Overall: 'Mentioned' },
  { query: 'Nigeria SEO company', ChatGPT: 'Not Mentioned', Claude: 'Not Mentioned', Perplexity: 'Mentioned', Gemini: 'Not Mentioned', Bing: 'Mentioned', Overall: 'Partial' },
]

const activities = [
  { icon: Zap, title: 'GEO Audit Completed', desc: 'Full site analysis finished — score improved to 78', time: '2 hours ago', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { icon: Bot, title: 'New LLM Mention', desc: 'ChatGPT mentioned getranked.ng for "SEO agency Lagos"', time: '5 hours ago', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: TrendingUp, title: 'Keyword Ranked #3', desc: '"best SEO agency Nigeria" moved from #8 to #3', time: '1 day ago', color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { icon: Globe, title: 'Competitor Alert', desc: 'Competitor X published 3 new GEO-optimized pages', time: '1 day ago', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: FileText, title: 'Report Generated', desc: 'Weekly GEO performance report is ready for download', time: '2 days ago', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
]

const llmColors: Record<string, string> = {
  ChatGPT: '#10A37F',
  Claude: '#D4A574',
  Perplexity: '#22D3EE',
  Gemini: '#8B5CF6',
  Bing: '#0EA5E9',
}

/* ─────────────────────────── Components ─────────────────────────── */

const sidebarNav = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard', active: true },
  { icon: Bot, label: 'LLM Tracker', href: '/dashboard/llm', active: false },
  { icon: BarChart3, label: 'SEO Metrics', href: '/dashboard/seo', active: false },
  { icon: Globe, label: 'GEO Score', href: '/geo-audit', active: false },
  { icon: Users, label: 'Competitors', href: '/tools/competitor', active: false },
  { icon: FileText, label: 'Reports', href: '/reporting', active: false },
  { icon: MapPin, label: 'Local SEO', href: '/local-seo', active: false },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', active: false },
]

function CircularProgress({ value, max, color }: { value: number; max: number; color: string }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference

  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="currentColor" strokeWidth="6"
          className="text-[var(--border-default)]" />
        <motion.circle cx="44" cy="44" r={radius} fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-[var(--text-primary)]">{value}</span>
      </div>
    </div>
  )
}

function MiniSparkline({ data, color, type = 'line' }: { data: number[]; color: string; type?: 'line' | 'area' }) {
  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <div className="w-24 h-10">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'area' ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${color.replace('#', '')})`} strokeWidth={2} dot={false} />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Mentioned') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
        <CheckCircle2 size={12} /> Mentioned
      </span>
    )
  }
  if (status === 'Not Mentioned') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
        <XCircle size={12} /> Missing
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
      <AlertCircle size={12} /> Partial
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div className="glass-panel px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[var(--text-secondary)]">{p.name}:</span>
          <span className="font-mono font-semibold text-[var(--text-primary)]">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────── Main Page ─────────────────────────── */

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('7D')
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  /* close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  /* sort handler */
  const handleSort = useCallback((col: string) => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
  }, [sortCol])

  const sortedTable = [...llmTableData].sort((a: any, b: any) => {
    if (!sortCol) return 0
    const av = a[sortCol]
    const bv = b[sortCol]
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const tableColumns = ['Query', 'ChatGPT', 'Claude', 'Perplexity', 'Gemini', 'Bing', 'Overall']

  /* Sparkline data */
  const sparkKeywords = [5, 6, 8, 9, 10, 12]
  const sparkMentions = [5, 8, 10, 14, 18, 23]
  const sparkTraffic = [2.1, 2.4, 2.8, 3.2, 3.6, 4.2]

  return (
    <div className="min-h-[100dvh] flex bg-[var(--bg-primary)]">
      {/* ─────────── Mobile Overlay ─────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─────────── Sidebar ─────────── */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-[var(--bg-secondary)] border-r border-[var(--border-default)] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[var(--border-default)]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-amber)] flex items-center justify-center">
                <BarChart3 size={16} className="text-[#0A0F1A]" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--accent-amber)] border-2 border-[var(--bg-secondary)]" />
            </div>
            <span className="font-outfit font-bold text-lg text-[var(--text-primary)]">getranked.ng</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarNav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                item.active
                  ? 'text-[var(--accent-amber)] bg-[var(--accent-amber)]/10 border-l-2 border-[var(--accent-amber)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom - Plan */}
        <div className="p-4 border-t border-[var(--border-default)]">
          <div className="glass-panel rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Plan</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] border border-[var(--accent-amber)]/20">
                Growth
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent-amber)] to-[#D4A843]"
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
              />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-2">78% of monthly quota used</p>
          </div>
        </div>
      </motion.aside>

      {/* ─────────── Main Content ─────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-[var(--bg-navbar)] backdrop-blur-[20px] border-b border-[var(--border-default)] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
            >
              <Menu size={20} />
            </button>
            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-[var(--text-muted)]">Dashboard</span>
              <ChevronRight size={14} className="text-[var(--text-muted)]" />
              <span className="text-[var(--text-primary)] font-medium">Overview</span>
            </nav>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-[var(--bg-tertiary)] rounded-xl px-3.5 py-2 w-64 border border-[var(--border-default)] focus-within:border-[var(--accent-amber)] focus-within:ring-2 focus-within:ring-[var(--accent-amber)]/20 transition-all">
              <Search size={16} className="text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search analytics..."
                className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] w-full"
              />
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-amber)] border-2 border-[var(--bg-primary)]" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-80 glass-panel border border-[var(--border-default)] rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-[var(--border-default)] flex items-center justify-between">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">Notifications</span>
                      <span className="text-xs text-[var(--text-muted)]">3 new</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {activities.slice(0, 4).map((a, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--border-default)]/50">
                          <div className={`p-1.5 rounded-lg ${a.bg} ${a.color}`}>
                            <a.icon size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[var(--text-primary)]">{a.title}</p>
                            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{a.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Date Range */}
            <button className="hidden lg:flex items-center gap-2 bg-[var(--bg-tertiary)] rounded-xl px-3 py-2 border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors">
              <span className="text-xs text-[var(--text-secondary)] font-medium">Last 7 days</span>
              <ChevronDown size={14} className="text-[var(--text-muted)]" />
            </button>

            {/* User Avatar */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-amber)] to-[#D4A843] flex items-center justify-center text-sm font-bold text-[#0A0F1A]">
                  A
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">Admin User</p>
                  <p className="text-[10px] text-[var(--text-muted)] leading-tight">admin@getranked.ng</p>
                </div>
                <ChevronDown size={14} className="hidden md:block text-[var(--text-muted)]" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-56 glass-panel border border-[var(--border-default)] rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-[var(--border-default)]">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">Admin User</p>
                      <p className="text-xs text-[var(--text-muted)]">admin@getranked.ng</p>
                    </div>
                    <div className="py-1">
                      {['Profile', 'Settings', 'Billing'].map(item => (
                        <button key={item} className="w-full text-left px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-[var(--border-default)] py-1">
                      <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* ───── Scrollable Content ───── */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-heading-2 text-[var(--text-primary)]">Dashboard Overview</h1>
            <p className="text-body-sm text-[var(--text-secondary)] mt-1">Track your GEO performance, LLM mentions, and SEO metrics in real-time.</p>
          </motion.div>

          {/* ───── KPI Cards ───── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* GEO Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-base p-5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 rounded-2xl border border-[var(--accent-amber)]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="eyebrow bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] mb-3">GEO Score</span>
              <div className="flex items-end justify-between mt-3 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <CircularProgress value={78} max={100} color="var(--accent-amber)" />
                  <div>
                    <p className="stat-value text-2xl font-bold text-[var(--text-primary)] leading-none">78<span className="text-sm text-[var(--text-muted)] font-normal">/100</span></p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 mt-2">
                      <TrendingUp size={12} /> +5 pts
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Keywords in Top 10 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-base p-5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 rounded-2xl border border-[var(--accent-teal)]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="eyebrow bg-teal-500/10 text-teal-500 mb-3">Keywords in Top 10</span>
              <div className="flex items-end justify-between mt-3">
                <div>
                  <p className="stat-value text-3xl font-bold text-[var(--text-primary)]">12</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 mt-1">
                    <TrendingUp size={12} /> +3 this week
                  </span>
                </div>
                <MiniSparkline data={sparkKeywords} color="var(--accent-teal)" type="area" />
              </div>
            </motion.div>

            {/* LLM Mentions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card-base p-5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 rounded-2xl border border-[var(--accent-purple)]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="eyebrow bg-purple-500/10 text-purple-500 mb-3">LLM Mentions</span>
              <div className="flex items-end justify-between mt-3">
                <div>
                  <p className="stat-value text-3xl font-bold text-[var(--text-primary)]">23</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 mt-1">
                    <TrendingUp size={12} /> +8 this month
                  </span>
                </div>
                <MiniSparkline data={sparkMentions} color="var(--accent-purple)" type="area" />
              </div>
            </motion.div>

            {/* Organic Traffic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-base p-5"
            >
              <span className="eyebrow bg-blue-500/10 text-blue-500 mb-3">Organic Traffic</span>
              <div className="flex items-end justify-between mt-3">
                <div>
                  <p className="stat-value text-3xl font-bold text-[var(--text-primary)]">4.2K</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 mt-1">
                    <TrendingUp size={12} /> +12%
                  </span>
                </div>
                <MiniSparkline data={sparkTraffic} color="var(--accent-blue)" type="area" />
              </div>
            </motion.div>
          </div>

          {/* ───── Line Chart ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-base p-5 lg:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="eyebrow bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]">Trends</span>
                </div>
                <h3 className="text-heading-3 text-[var(--text-primary)]">GEO Mentions Over Time</h3>
              </div>
              <div className="inline-flex items-center gap-1 rounded-xl p-1 border border-[var(--border-default)] bg-[var(--bg-tertiary)]">
                {(['7D', '30D', '90D'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      timeRange === r
                        ? 'bg-[var(--accent-amber)] text-[#0A0F1A] shadow-glow'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" strokeOpacity={0.5} />
                  <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  {Object.keys(llmColors).map(key => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={llmColors[key]}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: llmColors[key], strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--bg-secondary)' }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[var(--border-default)]">
              {Object.entries(llmColors).map(([name, color]) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-xs text-[var(--text-secondary)]">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ───── Bar + Area Charts Row ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-base p-5 lg:p-6"
            >
              <span className="eyebrow bg-teal-500/10 text-teal-500 mb-1">Distribution</span>
              <h3 className="text-heading-3 text-[var(--text-primary)] mb-6">Keyword Rankings</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" strokeOpacity={0.5} vertical={false} />
                    <XAxis dataKey="range" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                      <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14B8A6" />
                        <stop offset="100%" stopColor="#0D9488" />
                      </linearGradient>
                    </defs>
                    <Bar dataKey="count" fill="url(#tealGrad)" radius={[8, 8, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Area Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card-base p-5 lg:p-6"
            >
              <span className="eyebrow bg-blue-500/10 text-blue-500 mb-1">Correlation</span>
              <h3 className="text-heading-3 text-[var(--text-primary)] mb-6">Traffic vs LLM Mentions</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" strokeOpacity={0.5} />
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                      <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="mentionGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area yAxisId="left" type="monotone" dataKey="traffic" stroke="#3B82F6" fill="url(#trafficGrad)" strokeWidth={2} />
                    <Area yAxisId="right" type="monotone" dataKey="mentions" stroke="#8B5CF6" fill="url(#mentionGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* ───── LLM Mention Table ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card-base overflow-hidden"
          >
            <div className="p-5 lg:p-6 border-b border-[var(--border-default)]">
              <span className="eyebrow bg-purple-500/10 text-purple-500 mb-1">Breakdown</span>
              <h3 className="text-heading-3 text-[var(--text-primary)]">LLM Mention Breakdown</h3>
              <p className="text-body-sm text-[var(--text-secondary)] mt-1">Track how your brand appears across AI platforms for key queries.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-[var(--bg-tertiary)]/50">
                    {tableColumns.map(col => (
                      <th
                        key={col}
                        onClick={() => handleSort(col)}
                        className="text-left px-5 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--text-primary)] transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          {col}
                          {sortCol === col && (
                            sortDir === 'asc' ? <TrendingUp size={12} /> : <TrendingDown size={12} />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedTable.slice((currentPage - 1) * 5, currentPage * 5).map((row: any, i: number) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-[var(--border-default)]/50 hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">{row.Query}</td>
                      <td className="px-5 py-4"><StatusBadge status={row.ChatGPT} /></td>
                      <td className="px-5 py-4"><StatusBadge status={row.Claude} /></td>
                      <td className="px-5 py-4"><StatusBadge status={row.Perplexity} /></td>
                      <td className="px-5 py-4"><StatusBadge status={row.Gemini} /></td>
                      <td className="px-5 py-4"><StatusBadge status={row.Bing} /></td>
                      <td className="px-5 py-4"><StatusBadge status={row.Overall} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--border-default)]">
              <p className="text-xs text-[var(--text-muted)]">
                Showing {Math.min((currentPage - 1) * 5 + 1, sortedTable.length)}-{Math.min(currentPage * 5, sortedTable.length)} of {sortedTable.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {[1, 2].map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                      currentPage === p
                        ? 'bg-[var(--accent-amber)] text-[#0A0F1A]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(2, p + 1))}
                  disabled={currentPage === 2}
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ───── Activity + Quick Actions Row ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Recent Activity Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card-base p-5 lg:p-6"
            >
              <span className="eyebrow bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] mb-1">Activity</span>
              <h3 className="text-heading-3 text-[var(--text-primary)] mb-6">Recent Activity</h3>
              <div className="relative">
                {/* Timeline line — centered on the 8x8 icon column (icon center = 16px) */}
                <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent-amber)] via-[var(--accent-amber)]/30 to-transparent" />
                <div className="space-y-5">
                  {activities.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.08 }}
                      className="relative flex items-start gap-4"
                    >
                      <div className={`relative z-10 w-8 h-8 rounded-lg ${a.bg} ${a.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <a.icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{a.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{a.desc}</p>
                        <p className="text-[11px] text-[var(--text-muted)] mt-1">{a.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card-base p-5 lg:p-6"
            >
              <span className="eyebrow bg-emerald-500/10 text-emerald-500 mb-1">Actions</span>
              <h3 className="text-heading-3 text-[var(--text-primary)] mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: Zap, title: 'Run GEO Audit', desc: 'Analyze your site for generative engine optimization', href: '/geo-audit', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', hoverBg: 'hover:bg-amber-500/15' },
                  { icon: FileText, title: 'Generate Report', desc: 'Create a comprehensive performance report', href: '/reporting', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hoverBg: 'hover:bg-blue-500/15' },
                  { icon: Plus, title: 'Add Competitor', desc: 'Track a new competitor for comparison', href: '/tools/competitor', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', hoverBg: 'hover:bg-purple-500/15' },
                ].map((action, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <Link
                      to={action.href}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${action.border} ${action.bg} ${action.hoverBg} transition-all duration-200 group`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-[var(--bg-secondary)] ${action.color} flex items-center justify-center flex-shrink-0 border ${action.border}`}>
                        <action.icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{action.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{action.desc}</p>
                      </div>
                      <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-amber)] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom spacer */}
          <div className="h-4" />
        </main>
      </div>
    </div>
  )
}
