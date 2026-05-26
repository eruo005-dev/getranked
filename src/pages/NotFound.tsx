import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home as HomeIcon, Target, Wallet, Search, MapPin, ArrowLeft, ChevronRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const quickLinks = [
  {
    to: '/',
    icon: HomeIcon,
    title: 'Home',
    body: 'Start at the front door. Meet the platform built in Lagos.',
    color: 'var(--accent-amber)',
    tint: 'rgba(5, 150, 105,0.12)',
  },
  {
    to: '/geo-audit',
    icon: Target,
    title: 'Free GEO audit',
    body: 'See exactly how ChatGPT, Claude and Perplexity see your brand — in under 5 minutes.',
    color: 'var(--accent-teal)',
    tint: 'rgba(20,184,166,0.12)',
    badge: 'FREE',
  },
  {
    to: '/pricing',
    icon: Wallet,
    title: 'Pricing',
    body: 'Naira pricing, Paystack, no FX surprises. Plans that scale from solo to enterprise.',
    color: 'var(--accent-purple)',
    tint: 'rgba(139,92,246,0.12)',
  },
]

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page not found'
    const meta = document.querySelector('meta[name="description"]')
    const description =
      "We couldn't find that page on getranked. Try the free GEO audit, the pricing page, or head back home."
    if (meta) {
      meta.setAttribute('content', description)
    } else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = description
      document.head.appendChild(m)
    }
  }, [])

  return (
    <div className="bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(5, 150, 105,0.14) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          right: '-10%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(5, 150, 105,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 150, 105,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <section className="container-main relative z-10 pt-12 md:pt-20 pb-16 md:pb-24 min-h-[80vh] flex flex-col items-center justify-center">
        {/* Floating icons */}
        <motion.div
          className="relative mb-8 md:mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <div className="flex items-center justify-center gap-5 md:gap-8 text-[var(--text-muted)]">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center justify-center"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--bg-secondary)] border-2 border-[var(--accent-amber)] flex items-center justify-center"
              style={{ boxShadow: '0 0 32px rgba(5, 150, 105,0.25)' }}
            >
              <MapPin className="w-6 h-6 md:w-7 md:h-7 text-[var(--accent-amber)]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          </div>
        </motion.div>

        {/* 404 + copy */}
        <motion.div
          className="text-center max-w-[720px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <p className="text-label text-[var(--text-muted)] mb-3">ERROR · NOT FOUND</p>
          <h1
            className="text-display-1 mb-5 leading-none"
            style={{ color: 'var(--accent-amber)' }}
            aria-label="404 not found"
          >
            404
          </h1>
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
            This page got lost on its way to{' '}
            <span className="text-gradient-amber">Lagos</span>.
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto mb-9">
            The page you're looking for doesn't exist — or maybe it's not optimized for AI yet.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/" className="btn-primary w-full sm:w-auto">
              <ArrowLeft className="w-5 h-5" /> Back to home
            </Link>
            <Link to="/geo-audit" className="btn-secondary w-full sm:w-auto">
              Run free GEO audit <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          className="w-full mt-14 md:mt-20 max-w-[1080px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          <p className="text-label text-[var(--text-muted)] text-center mb-6">
            OR TRY ONE OF THESE
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <Link
                    to={link.to}
                    className="card-base p-6 h-full block group focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: link.tint }}
                      >
                        <Icon className="w-5 h-5" style={{ color: link.color }} />
                      </div>
                      {link.badge && (
                        <span
                          className="text-label px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(16,185,129,0.12)',
                            color: 'var(--accent-green)',
                          }}
                        >
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-heading-3 text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-amber)] transition-colors duration-200">
                      {link.title}
                    </h3>
                    <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {link.body}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-amber)] group-hover:gap-2.5 transition-all duration-200">
                      Go there <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          className="text-body-sm text-[var(--text-muted)] mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Lost on purpose? Email{' '}
          <a
            href="mailto:support@getranked.ng"
            className="text-[var(--accent-amber)] underline-offset-4 hover:underline"
          >
            support@getranked.ng
          </a>{' '}
          and we'll find what you were looking for.
        </motion.p>
      </section>
    </div>
  )
}
