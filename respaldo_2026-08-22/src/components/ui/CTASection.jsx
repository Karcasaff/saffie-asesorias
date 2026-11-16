import React from 'react'
import { Link } from 'react-router-dom'

// CTA de cierre reutilizable con fondo cinematográfico opcional.
export default function CTASection({
  eyebrow = 'Hablemos',
  title,
  subtitle,
  primary = { label: 'Hablar con un asesor', to: '/contacto' },
  secondary = null,
  image = null,
}) {
  return (
    <section
      className="final-cta"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="container">
        <div className="final-cta__inner">
          <span
            className="eyebrow"
            data-reveal
            style={{ justifyContent: 'center', color: 'var(--gold-soft)' }}
          >
            {eyebrow}
          </span>

          <h2 className="final-cta__title" data-reveal style={{ '--reveal-delay': '100ms' }}>
            {title}
          </h2>

          {subtitle && (
            <p className="final-cta__subtitle" data-reveal style={{ '--reveal-delay': '200ms' }}>
              {subtitle}
            </p>
          )}

          <div className="final-cta__actions" data-reveal style={{ '--reveal-delay': '300ms' }}>
            <Link to={primary.to} className="btn btn--primary">
              {primary.label}
            </Link>
            {secondary && (
              <Link to={secondary.to} className="btn btn--light-outline">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
