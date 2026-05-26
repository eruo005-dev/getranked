import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import Wordmark from '@/components/Wordmark'

const toolsDropdown = [
  { label: 'GEO Audit', href: '/geo-audit' },
  { label: 'LLMs.txt Generator', href: '/tools/llms-txt' },
  { label: 'Schema Generator', href: '/tools/schema' },
  { label: 'Competitor Monitor', href: '/tools/competitor' },
  { label: 'Local SEO', href: '/local-seo' },
]

const resourcesDropdown = [
  { label: 'Blog', href: '/blog' },
  { label: 'Reporting', href: '/reporting' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setToolsOpen(false)
    setResourcesOpen(false)
  }, [location.pathname])

  const handleLinkClick = useCallback(() => {
    setMobileOpen(false)
    setToolsOpen(false)
    setResourcesOpen(false)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      } ${
        scrolled
          ? 'bg-[var(--bg-navbar)] backdrop-blur-[20px] border-b border-[var(--border-default)] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.12)]'
          : 'bg-[var(--bg-navbar)] backdrop-blur-[12px] border-b border-transparent'
      }`}
      style={{ height: '64px' }}
    >
      <div className="container-main h-full flex items-center justify-between">
        <div onClick={handleLinkClick} className="shrink-0 text-[var(--text-primary)]">
          <Wordmark size="md" />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            to="/features"
            className="px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]"
          >
            Pricing
          </Link>

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]">
              Tools
              <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 pt-2 w-60 z-50">
                <div className="py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] shadow-card">
                  {toolsDropdown.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:bg-[var(--bg-tertiary)] transition-colors"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]">
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {resourcesOpen && (
              <div className="absolute top-full left-0 pt-2 w-52 z-50">
                <div className="py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] shadow-card">
                  {resourcesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:bg-[var(--bg-tertiary)] transition-colors"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]"
          >
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link
            to="/login"
            className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-[10px] text-sm font-semibold bg-[var(--accent-amber)] text-[var(--brand-on-primary)] hover:bg-[var(--accent-amber-hover)] transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            Get Started
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-[var(--bg-primary)] z-40 overflow-y-auto">
          <div className="container-main py-8 flex flex-col gap-2">
            <Link
              to="/features"
              className="px-4 py-3 text-lg font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors"
              onClick={handleLinkClick}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="px-4 py-3 text-lg font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors"
              onClick={handleLinkClick}
            >
              Pricing
            </Link>
            <div className="px-4 py-2">
              <p className="text-label text-[var(--text-muted)] mb-3">Tools</p>
              <div className="flex flex-col gap-1 pl-2">
                {toolsDropdown.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] transition-colors"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-4 py-2">
              <p className="text-label text-[var(--text-muted)] mb-3">Resources</p>
              <div className="flex flex-col gap-1 pl-2">
                {resourcesDropdown.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-amber)] transition-colors"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about"
              className="px-4 py-3 text-lg font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors"
              onClick={handleLinkClick}
            >
              About
            </Link>
            <hr className="my-2 border-[var(--border-default)]" />
            <Link
              to="/login"
              className="px-4 py-3 text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors"
              onClick={handleLinkClick}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="mx-4 py-3 text-center text-base font-semibold bg-[var(--accent-amber)] text-[var(--brand-on-primary)] rounded-xl hover:bg-[var(--accent-amber-hover)] transition-colors"
              onClick={handleLinkClick}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
