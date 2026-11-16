import React from 'react'
import { Link } from 'react-router-dom'

// Encabezado de página interior con breadcrumb.
// El SEO (incluido breadcrumbSchema) lo gestiona cada página con useSEO.
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  children,
}) {
  const buildCrumb = (crumb) =>
    crumb.href?.startsWith('/') ? (
      <Link key={crumb.label} to={crumb.href}>
        {crumb.label}
      </Link>
    ) : (
      <a key={crumb.label} href={crumb.href || '#'}>
        {crumb.label}
      </a>
    )

  return (
    <section className="page-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Miga de pan" data-reveal>
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.label}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {buildCrumb(crumb)}
            </React.Fragment>
          ))}
        </nav>

        <div className="page-hero__body">
          {eyebrow && (
            <span className="eyebrow" data-reveal>
              {eyebrow}
            </span>
          )}
          <h1 className="page-hero__title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            {title}
          </h1>
          {lead && (
            <p className="page-hero__lead" data-reveal style={{ '--reveal-delay': '160ms' }}>
              {lead}
            </p>
          )}
          {children && (
            <div className="page-hero__actions" data-reveal style={{ '--reveal-delay': '240ms' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
