import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  CheckCircle2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  getArticleBySlug,
  getRelatedArticles,
  type ArticleSection,
} from '@/lib/blog-data'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })
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

function SectionRenderer({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 className="font-outfit font-bold text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-[-0.02em] mt-14 mb-5 text-[var(--text-primary)]">
          {section.content}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="font-outfit font-semibold text-xl sm:text-2xl leading-snug mt-10 mb-3 text-[var(--text-primary)]">
          {section.content}
        </h3>
      )
    case 'p':
      return (
        <p className="text-[17px] leading-[1.75] text-[var(--text-secondary)] mb-6 font-jakarta">
          {section.content}
        </p>
      )
    case 'list':
      return (
        <ul className="space-y-3 mb-7 pl-1">
          {section.content.map((item, i) => (
            <li key={i} className="flex gap-3 text-[17px] leading-[1.7] text-[var(--text-secondary)] font-jakarta">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ordered':
      return (
        <ol className="space-y-4 mb-7 counter-reset-list">
          {section.content.map((item, i) => (
            <li key={i} className="flex gap-4 text-[17px] leading-[1.7] text-[var(--text-secondary)] font-jakarta">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--accent-amber)]/15 text-[var(--accent-amber)] text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <div className="my-8 rounded-2xl border-l-4 border-[var(--accent-amber)] bg-[var(--accent-amber)]/8 px-6 py-5">
          <div className="flex gap-3 items-start">
            <Sparkles className="w-5 h-5 text-[var(--accent-amber)] flex-shrink-0 mt-1" />
            <p className="text-[17px] leading-[1.7] text-[var(--text-primary)] font-jakarta font-medium m-0">
              {section.content}
            </p>
          </div>
        </div>
      )
    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-2 border-[var(--accent-amber)] italic text-xl text-[var(--text-primary)] font-outfit leading-relaxed">
          {section.content}
        </blockquote>
      )
    case 'faq':
      return (
        <div className="my-10 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-2 sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {section.content.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-[var(--border-default)] px-3 sm:px-4"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold py-5 text-[var(--text-primary)] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-[1.7] text-[var(--text-secondary)] pb-5 font-jakarta">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )
    default:
      return null
  }
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = useMemo(() => (slug ? getArticleBySlug(slug) : undefined), [slug])
  const related = useMemo(() => (slug ? getRelatedArticles(slug, 3) : []), [slug])
  const [copied, setCopied] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | GetRanked Blog`
    } else {
      document.title = 'Article not found | GetRanked Blog'
    }
  }, [article])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [slug])

  useEffect(() => {
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0
      setScrollProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h1 className="text-heading-1">Article not found</h1>
          <p className="text-body-lg text-[var(--text-secondary)] mt-4">
            The article you are looking for may have moved, or the URL is incorrect.
          </p>
          <Link
            to="/blog"
            className="btn-primary mt-8 inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </main>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = encodeURIComponent(article.title)
  const encodedUrl = encodeURIComponent(shareUrl)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [`https://getranked.ng${article.coverImage}`],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GetRanked',
      logo: {
        '@type': 'ImageObject',
        url: 'https://getranked.ng/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://getranked.ng/blog/${article.slug}`,
    },
    articleSection: article.category,
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-[var(--accent-amber)] origin-left"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <div className="container-main pt-10 pb-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to all articles
        </Link>
      </div>

      <article className="container-main pb-20">
        <header className="max-w-3xl mx-auto pt-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="outline" className={`${categoryColor(article.category)} font-semibold`}>
                {article.category}
              </Badge>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {article.readingTime}
              </span>
              <Separator orientation="vertical" className="h-3" />
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {formatDate(article.date)}
              </span>
            </div>

            <h1 className="font-outfit font-extrabold leading-[1.1] tracking-[-0.025em] text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
              {article.title}
            </h1>

            <p className="text-body-lg text-[var(--text-secondary)] mt-6">{article.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 pt-6 border-t border-[var(--border-default)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-amber)] to-[var(--accent-amber-hover)] flex items-center justify-center text-white text-base font-bold">
                  {article.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{article.author.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{article.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] mr-1 hidden sm:inline">Share</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:border-[var(--accent-amber)] transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:border-[var(--accent-amber)] transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:border-[var(--accent-amber)] transition-colors"
                  aria-label="Copy link"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)]" /> : <LinkIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-tertiary)] aspect-[16/9]"
        >
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="max-w-3xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--accent-amber)]/30 bg-gradient-to-br from-[var(--accent-amber)]/5 to-transparent p-6 sm:p-8 mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--accent-amber)]" />
              <h2 className="font-outfit font-bold text-lg sm:text-xl text-[var(--text-primary)] m-0">
                Key takeaways
              </h2>
            </div>
            <ul className="space-y-3">
              {article.keyTakeaways.map((t, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-amber)] flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="font-jakarta">
            {article.body.map((section, i) => (
              <SectionRenderer key={i} section={section} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 pt-10 border-t border-[var(--border-default)]"
          >
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-amber)] to-[var(--accent-amber-hover)] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {article.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">
                    Written by
                  </div>
                  <div className="font-outfit font-bold text-lg text-[var(--text-primary)]">{article.author.name}</div>
                  <div className="text-sm text-[var(--accent-amber)] font-medium">{article.author.role}</div>
                  <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)] mt-3">{article.author.bio}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[var(--border-default)]">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Share2 className="w-4 h-4" />
              Enjoyed this? Share it.
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:border-[var(--accent-amber)] transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:border-[var(--accent-amber)] transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-9 h-9 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:border-[var(--accent-amber)] transition-colors"
                aria-label="Copy link"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)]" /> : <LinkIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]/40 py-16 lg:py-20">
          <div className="container-main">
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <span className="eyebrow bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] border border-[var(--accent-amber)]/20">
                  Keep reading
                </span>
                <h2 className="text-heading-2 mt-3">Related articles</h2>
              </div>
              <Link
                to="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-amber)] hover:gap-3 transition-all"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--accent-amber)]/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tertiary)]">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className={`${categoryColor(rel.category)} font-semibold`}>
                          {rel.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col p-6">
                      <h3 className="font-outfit font-bold text-lg leading-snug group-hover:text-[var(--accent-amber)] transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-3 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Clock className="w-3 h-3" />
                        {rel.readingTime}
                        <Separator orientation="vertical" className="h-3" />
                        <Calendar className="w-3 h-3" />
                        {formatDate(rel.date)}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-main py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-heading-1">Ready to get cited by ChatGPT?</h2>
          <p className="text-body-lg text-[var(--text-secondary)] mt-4">
            Run a free GEO audit on your Nigerian business and see exactly what AI engines say about you today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/geo-audit" className="btn-primary">
              Run a free GEO audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/blog" className="btn-secondary">
              <ArrowLeft className="w-4 h-4" />
              More articles
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
