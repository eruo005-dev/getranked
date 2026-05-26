import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Calendar, Clock, Mail, Sparkles, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { articles, categories, type Category } from '@/lib/blog-data'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })
}

function categoryColor(cat: string): string {
  switch (cat) {
    case 'GEO':
      return 'bg-[var(--accent-amber)]/15 text-[var(--accent-amber)] border-[var(--accent-amber)]/30'
    case 'Local SEO':
      return 'bg-[var(--accent-teal)]/15 text-[var(--accent-teal)] border-[var(--accent-teal)]/30'
    case 'AI Search':
      return 'bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] border-[var(--accent-purple)]/30'
    case 'Schema':
      return 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border-[var(--accent-blue)]/30'
    case 'Nigerian Market':
      return 'bg-[var(--accent-green)]/15 text-[var(--accent-green)] border-[var(--accent-green)]/30'
    default:
      return 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-default)]'
  }
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    document.title = 'Blog | GetRanked — The GEO + SEO Playbook for Nigerian Businesses'
  }, [])

  const featured = articles.find((a) => a.featured) ?? articles[0]

  const filtered = useMemo(() => {
    return articles
      .filter((a) => a.slug !== featured.slug)
      .filter((a) => (activeCategory === 'All' ? true : a.category === activeCategory))
      .filter((a) =>
        query.trim() === ''
          ? true
          : a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(query.toLowerCase()),
      )
  }, [activeCategory, query, featured.slug])

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim() === '') return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <section className="relative overflow-hidden border-b border-[var(--border-default)]">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, var(--accent-amber-glow), transparent 70%)' }}
        />
        <div className="container-main relative py-20 lg:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <span className="eyebrow bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] border border-[var(--accent-amber)]/20">
              <BookOpen className="w-3 h-3" />
              Blog
            </span>
            <h1 className="text-display-1 mt-6">
              The <span className="text-gradient-amber">GEO + SEO</span> Playbook
              <br />
              for Nigerian Businesses
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto">
              Field-tested research on how Nigerian brands rank on Google and earn citations from
              ChatGPT, Claude, Perplexity and Gemini. Written by the team at GetRanked.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-main py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={`/blog/${featured.slug}`}
            className="group block rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--accent-amber)]/50 hover:shadow-[0_20px_60px_-20px_var(--accent-amber-glow)] transition-all duration-500"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--bg-tertiary)]">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute top-5 left-5">
                  <Badge
                    variant="outline"
                    className="bg-black/50 backdrop-blur-md text-white border-white/20 font-semibold uppercase tracking-wider text-[10px]"
                  >
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className={`${categoryColor(featured.category)} font-semibold`}>
                    {featured.category}
                  </Badge>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {featured.readingTime}
                  </span>
                </div>
                <h2 className="text-heading-1 group-hover:text-[var(--accent-amber)] transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-body-lg text-[var(--text-secondary)] mt-4">{featured.excerpt}</p>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[var(--border-default)]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-amber)] to-[var(--accent-amber-hover)] flex items-center justify-center text-white text-sm font-bold">
                    {featured.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {featured.author.name}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] truncate">{formatDate(featured.date)}</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-amber)] group-hover:gap-3 transition-all">
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      <section className="container-main pb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-[var(--accent-amber)] text-[var(--brand-on-primary)] border-[var(--accent-amber)] shadow-sm'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--accent-amber)]/50 hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="pl-9 h-11 bg-[var(--bg-secondary)] border-[var(--border-default)]"
            />
          </div>
        </div>
      </section>

      <section className="container-main pb-20 lg:pb-28">
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[var(--border-default)] rounded-2xl">
            <BookOpen className="w-10 h-10 mx-auto text-[var(--text-muted)]" />
            <h3 className="text-heading-3 mt-4">No articles match your filter</h3>
            <p className="text-body-sm text-[var(--text-secondary)] mt-2">
              Try clearing the search or selecting "All"
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--accent-amber)]/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tertiary)]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className={`${categoryColor(article.category)} font-semibold`}>
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="text-heading-3 group-hover:text-[var(--accent-amber)] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-3 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-5 flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent-amber)] to-[var(--accent-amber-hover)] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {article.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <span className="truncate">{article.author.name}</span>
                      <Separator orientation="vertical" className="h-3" />
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        {article.readingTime}
                      </span>
                      <Separator orientation="vertical" className="h-3" />
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.date)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="container-main pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[var(--accent-amber)]/30 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-[var(--accent-amber)]/5 p-8 lg:p-14"
        >
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent-amber-glow), transparent 70%)' }}
          />
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="eyebrow bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] border border-[var(--accent-amber)]/20">
                <Mail className="w-3 h-3" />
                Newsletter
              </span>
              <h2 className="text-heading-1 mt-5">Weekly GEO tips, straight to your inbox</h2>
              <p className="text-body-lg text-[var(--text-secondary)] mt-4">
                One Nigerian-market-aware GEO and SEO insight every Tuesday. No fluff, no resold US content. Sign
                up free, unsubscribe in one click.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <label htmlFor="newsletter-email" className="text-sm font-semibold text-[var(--text-primary)]">
                Email address
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourcompany.ng"
                  className="h-12 bg-[var(--bg-primary)] border-[var(--border-default)] flex-1"
                />
                <Button
                  type="submit"
                  className="h-12 px-6 bg-[var(--accent-amber)] hover:bg-[var(--accent-amber-hover)] text-[var(--brand-on-primary)] font-semibold whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              {subscribed && (
                <p className="text-sm text-[var(--accent-green)] font-medium">
                  You are in. The next issue lands Tuesday at 8am WAT.
                </p>
              )}
              <p className="text-xs text-[var(--text-muted)]">
                We respect your inbox. ~1,200 Nigerian operators already read it.
              </p>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
