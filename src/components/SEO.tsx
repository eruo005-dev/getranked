import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG,
  TWITTER_HANDLE,
  DEFAULT_DESCRIPTION,
} from '@/lib/seo-config'

type JsonLd = Record<string, unknown> | Record<string, unknown>[]

export interface PageSEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product' | 'profile'
  noIndex?: boolean
  jsonLd?: JsonLd
  keywords?: string[]
}

function absUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

export function PageSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  ogType = 'website',
  noIndex = false,
  jsonLd,
  keywords,
}: PageSEOProps) {
  const location = useLocation()
  const path = canonical ?? location.pathname
  const url = absUrl(path)
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const image = absUrl(ogImage)
  const trimmedDesc = description.length > 160 ? `${description.slice(0, 157)}...` : description

  const ldArray: Record<string, unknown>[] = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={trimmedDesc} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={url} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={trimmedDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_NG" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={trimmedDesc} />
      <meta name="twitter:image" content={image} />

      {ldArray.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  )
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'getranked',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: DEFAULT_DESCRIPTION,
    foundingDate: '2025',
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    },
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    sameAs: [
      'https://twitter.com/getrankedng',
      'https://www.linkedin.com/company/getrankedng',
      'https://www.instagram.com/getrankedng',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      areaServed: 'NG',
      availableLanguage: ['English'],
      email: 'hello@getranked.ng',
    },
  }
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'NGN',
      lowPrice: '15000',
      highPrice: '250000',
      offerCount: '4',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.url),
    })),
  }
}

export function articleSchema(args: {
  title: string
  datePublished: string
  author: string
  image?: string
  description: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description,
    image: absUrl(args.image ?? DEFAULT_OG),
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { '@type': 'Person', name: args.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
  }
}

const NIGERIAN_CITY_DATA: Record<string, { state: string; lat: number; lng: number }> = {
  Lagos: { state: 'LA', lat: 6.5244, lng: 3.3792 },
  Abuja: { state: 'FC', lat: 9.0765, lng: 7.3986 },
  'Port Harcourt': { state: 'RI', lat: 4.8156, lng: 7.0498 },
  Kano: { state: 'KN', lat: 12.0022, lng: 8.591 },
  Ibadan: { state: 'OY', lat: 7.3775, lng: 3.947 },
  'Benin City': { state: 'ED', lat: 6.335, lng: 5.6037 },
  Kaduna: { state: 'KD', lat: 10.5222, lng: 7.4383 },
  Enugu: { state: 'EN', lat: 6.5244, lng: 7.5086 },
}

export function localBusinessSchema(city: string) {
  const data = NIGERIAN_CITY_DATA[city] ?? NIGERIAN_CITY_DATA.Lagos
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${SITE_NAME} — ${city}`,
    url: `${SITE_URL}/local-seo/${city.toLowerCase().replace(/\s+/g, '-')}`,
    image: `${SITE_URL}${DEFAULT_OG}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: data.state,
      addressCountry: 'NG',
    },
    geo: { '@type': 'GeoCoordinates', latitude: data.lat, longitude: data.lng },
    areaServed: city,
    priceRange: '₦₦',
  }
}
