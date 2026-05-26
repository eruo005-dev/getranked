import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/context/ThemeContext'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const GeoAudit = lazy(() => import('@/pages/GeoAudit'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogArticle = lazy(() => import('@/pages/BlogArticle'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const Features = lazy(() => import('@/pages/Features'))
const CompetitorMonitor = lazy(() => import('@/pages/CompetitorMonitor'))
const LocalSeo = lazy(() => import('@/pages/LocalSeo'))
const Reporting = lazy(() => import('@/pages/Reporting'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const LLMsTxtGenerator = lazy(() => import('@/pages/tools/LLMsTxtGenerator'))
const SchemaGenerator = lazy(() => import('@/pages/tools/SchemaGenerator'))

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent-amber)] animate-spin"
        aria-label="Loading"
        role="status"
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
          },
        }}
      />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/geo-audit" element={<GeoAudit />} />
            <Route path="/tools/llms-txt" element={<LLMsTxtGenerator />} />
            <Route path="/tools/schema" element={<SchemaGenerator />} />
            <Route path="/tools/competitor" element={<CompetitorMonitor />} />
            <Route path="/local-seo" element={<LocalSeo />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}
