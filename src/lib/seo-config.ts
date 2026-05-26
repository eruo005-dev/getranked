export const SITE_URL = 'https://getranked.ng'
export const SITE_NAME = 'getranked'
export const DEFAULT_OG = '/og-image.png'
export const TWITTER_HANDLE = '@getrankedng'
export const DEFAULT_DESCRIPTION =
  "Nigeria's #1 SEO + GEO platform. Rank on Google AND get mentioned by ChatGPT, Claude, Perplexity & Gemini. Built for Nigerian businesses."

export type RouteMeta = {
  title: string
  description: string
  keywords?: string[]
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: "Nigeria's #1 SEO + GEO Platform",
    description:
      'Rank on Google AND get mentioned by ChatGPT, Claude, Perplexity & Gemini. The only SEO + GEO platform built for Nigerian businesses.',
    keywords: [
      'SEO Nigeria',
      'GEO Nigeria',
      'generative engine optimization',
      'rank on ChatGPT',
      'SEO platform Nigeria',
      'Lagos SEO',
      'AI search optimization',
    ],
  },
  '/pricing': {
    title: 'Pricing — Plans for Every Nigerian Business',
    description:
      'Transparent SEO + GEO pricing in Naira. Plans for SMEs, agencies and enterprises. Pay with Paystack. Cancel anytime.',
    keywords: ['SEO pricing Nigeria', 'GEO pricing', 'SEO plans Naira', 'Paystack SEO', 'affordable SEO Nigeria'],
  },
  '/geo-audit': {
    title: 'Free GEO Audit — See How AI Models See Your Brand',
    description:
      'Run a free Generative Engine Optimization audit. See exactly how ChatGPT, Claude, Perplexity & Gemini describe your business — and how to fix it.',
    keywords: ['GEO audit', 'AI visibility audit', 'ChatGPT brand audit', 'LLM SEO audit', 'Perplexity ranking'],
  },
  '/about': {
    title: 'About — Built in Lagos for Nigerian Businesses',
    description:
      'Built in Lagos by SEO operators who got tired of foreign tools that ignore Nigerian search intent. Meet the team behind getranked.',
    keywords: ['about getranked', 'Nigerian SEO company', 'Lagos SEO startup'],
  },
  '/contact': {
    title: 'Contact — Talk to the getranked Team',
    description:
      'Reach the getranked team. WhatsApp, email or book a demo. Lagos-based support, Nigerian business hours, fast replies.',
    keywords: ['contact getranked', 'SEO support Nigeria', 'book SEO demo Lagos'],
  },
  '/blog': {
    title: 'Blog — SEO + GEO Insights for the Nigerian Market',
    description:
      'Deep dives on SEO, GEO and AI search — written for operators selling to Nigerian customers. Tactics, case studies, and benchmarks.',
    keywords: ['SEO blog Nigeria', 'GEO blog', 'Nigerian marketing blog', 'AI search insights'],
  },
  '/features': {
    title: 'Features — The Complete SEO + GEO Stack',
    description:
      'LLM citation tracking, schema generator, local SEO, competitor monitoring and reporting — every tool a Nigerian brand needs to win search.',
    keywords: ['SEO features', 'GEO tools', 'LLM tracker', 'schema generator', 'local SEO Nigeria'],
  },
  '/tools/llms-txt': {
    title: 'llms.txt Generator — Free Tool for AI Discoverability',
    description:
      'Generate a production-grade llms.txt file for your website in seconds. Tell ChatGPT, Claude and Perplexity exactly who you are.',
    keywords: ['llms.txt generator', 'AI crawler file', 'GEO tool', 'ChatGPT llms.txt'],
  },
  '/tools/schema': {
    title: 'Schema Generator — Free Structured Data Tool',
    description:
      'Generate valid JSON-LD schema for Organization, LocalBusiness, FAQ, Article and Product. Built for Nigerian businesses with NGN-aware fields.',
    keywords: ['schema generator', 'JSON-LD generator', 'structured data Nigeria', 'LocalBusiness schema'],
  },
  '/tools/competitor': {
    title: 'Competitor Monitor — Track Rivals on Google + AI',
    description:
      'See where competitors rank on Google and how often they get cited by ChatGPT, Claude and Perplexity. Daily checks, Nigerian SERPs.',
    keywords: ['competitor SEO Nigeria', 'AI citation tracking', 'SERP tracker Nigeria'],
  },
  '/local-seo': {
    title: 'Local SEO — Dominate Lagos, Abuja, Port Harcourt & More',
    description:
      'Rank in Google Maps and local packs across Nigerian cities. Citation building, GBP optimization and review automation — all in one platform.',
    keywords: ['local SEO Nigeria', 'Google Business Profile Nigeria', 'Lagos local SEO', 'Abuja SEO'],
  },
  '/reporting': {
    title: 'Reporting — White-Label SEO + GEO Reports',
    description:
      'Beautiful, client-ready reports covering Google rankings, AI citations, traffic and conversions. Branded for your agency in one click.',
    keywords: ['SEO reporting', 'white label SEO', 'agency reporting Nigeria', 'GEO reports'],
  },
  '/login': {
    title: 'Sign In',
    description: 'Sign in to your getranked account to manage SEO + GEO campaigns, track AI citations and view reports.',
    keywords: ['login getranked', 'SEO dashboard login'],
  },
  '/register': {
    title: 'Get Started — Create Your getranked Account',
    description:
      'Start your free GEO audit and 14-day trial. No card required. Built for Nigerian businesses ready to rank everywhere search happens.',
    keywords: ['signup getranked', 'free SEO trial Nigeria', 'GEO trial'],
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      "How getranked collects, uses and protects your data. NDPR-compliant, Nigerian-first privacy practices.",
    keywords: ['privacy policy', 'NDPR compliance'],
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'The terms governing your use of getranked SEO + GEO products and services.',
    keywords: ['terms of service', 'getranked terms'],
  },
}
