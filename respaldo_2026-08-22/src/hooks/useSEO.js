// ============================================================================
// SEO — hook para gestionar metadatos por página
// ----------------------------------------------------------------------------
// Actualiza title, meta description, canonical, Open Graph, Twitter Card
// e inyecta JSON-LD (schema.org) cuando se proporciona.
// ============================================================================

import { useEffect } from 'react'
import { site } from '../data/site.js'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertJsonLd(id, data) {
  const existing = document.getElementById(id)
  if (existing) existing.remove()
  if (!data) return
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

export function useSEO({
  title,
  description = site.description,
  path = '/',
  jsonLd,
  type = 'website',
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`
    const url = `${site.url}${path === '/' ? '' : path}`

    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:locale', 'es_CL')
    upsertMeta('property', 'og:site_name', site.name)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    upsertJsonLd('saffie-jsonld', jsonLd)

    return () => upsertJsonLd('saffie-jsonld', null)
  }, [title, description, path, type, JSON.stringify(jsonLd)])
}

// Schemas reutilizables ------------------------------------------------------

export function realEstateAgentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    areaServed: { '@type': 'City', name: site.contact.city },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.city,
      addressCountry: 'CL',
    },
    email: site.contact.email,
    telephone: site.contact.phone,
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${site.url}${item.path}`,
    })),
  }
}
