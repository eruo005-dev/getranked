import { Link } from 'react-router-dom'
import { Mail, MessageCircle } from 'lucide-react'

const productLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Local SEO', href: '/local-seo' },
  { label: 'Reporting', href: '/reporting' },
]

const toolsLinks = [
  { label: 'GEO Audit', href: '/geo-audit' },
  { label: 'LLMs.txt Generator', href: '/tools/llms-txt' },
  { label: 'Schema Generator', href: '/tools/schema' },
  { label: 'Competitor Monitor', href: '/tools/competitor' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Sign In', href: '/login' },
  { label: 'Get Started', href: '/register' },
]

const connectLinks = [
  { label: 'WhatsApp', href: 'https://wa.me/2348000000000', external: true },
  { label: 'Twitter / X', href: 'https://twitter.com/getrankedng', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/getrankedng', external: true },
  { label: 'hello@getranked.ng', href: 'mailto:hello@getranked.ng', external: true },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-footer)] border-t border-[var(--border-default)]">
      <div className="container-main py-16 lg:py-20">
        {/* Brand row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/logo-icon.svg" alt="" className="w-8 h-8" />
              <img src="/logo.svg" alt="getranked.ng" className="h-6" />
            </Link>
            <p className="text-body-sm text-[var(--text-secondary)] max-w-xs mb-6 leading-relaxed">
              Nigeria&apos;s #1 SEO &amp; GEO platform. Built for African businesses to dominate AI search and Google rankings.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 rounded-xl border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@getranked.ng"
                aria-label="Email us"
                className="w-9 h-9 rounded-xl border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product */}
            <div>
              <h4 className="text-label text-[var(--text-primary)] mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-label text-[var(--text-primary)] mb-4">Tools</h4>
              <ul className="space-y-3">
                {toolsLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-label text-[var(--text-primary)] mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-label text-[var(--text-primary)] mb-4">Connect</h4>
              <ul className="space-y-3">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] transition-colors break-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-default)]">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] order-2 md:order-1">
            &copy; {new Date().getFullYear()} getranked.ng &middot; All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] order-1 md:order-2">
            Made in Lagos <span aria-hidden>&#127475;&#127468;</span> &middot; Built for Africa
          </p>
          <div className="flex items-center gap-5 order-3">
            <span className="text-xs text-[var(--text-muted)] hidden sm:inline">Secured by Paystack</span>
            <Link to="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
