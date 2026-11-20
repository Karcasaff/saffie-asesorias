import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatInvestmentStatus, getInvestmentBadgeClass } from '../../data/properties.js'
import { getUF, fmtCLP, fmtUF } from '../../utils/uf.js'

// Tarjeta de propiedad reutilizable (grid y lista).
export default function PropertyCard({ property, view = 'grid' }) {
  const [ufValor, setUfValor] = useState(null)
  useEffect(() => { getUF().then(setUfValor) }, [])

  const clp = ufValor != null && property.price != null
    ? Math.round(property.price * ufValor)
    : property.price_clp

  const hasImg = Array.isArray(property.images) && property.images.length > 0

  return (
    <article className={`prop-card ${view === 'list' ? 'prop-card--list' : ''}`}>
      <Link to={`/propiedades/${property.slug}`} className="prop-card__media">
        {hasImg ? (
          <img src={property.images[0]} alt={property.title} loading="lazy" />
        ) : (
          <div className="prop-card__media-placeholder">
            <span className="prop-card__badge prop-card__badge--venta">Venta</span>
            <span className="prop-card__media-empty">Sin foto</span>
          </div>
        )}
        {property.investmentStatus && (
          <span className={`prop-card__badge prop-card__invest-badge ${getInvestmentBadgeClass(property.investmentStatus)}`}>
            {formatInvestmentStatus(property.investmentStatus)}
          </span>
        )}
        {property.status !== 'disponible' && (
          <span className="prop-card__status">{property.status}</span>
        )}
      </Link>

      <div className="prop-card__body">
        <div className="prop-card__top">
          <span className="prop-card__price">{fmtUF(property.price)}</span>
          {clp != null && (
            <span className="prop-card__price prop-card__price--clp">{fmtCLP(clp)}</span>
          )}
          {property.expenses != null && (
            <span className="prop-card__expenses">+ GC {fmtUF(property.expenses)}</span>
          )}
        </div>

        <h3 className="prop-card__title">
          <Link to={`/propiedades/${property.slug}`}>{property.title}</Link>
        </h3>

        <p className="prop-card__loc">
          {property.neighborhood ? property.neighborhood + ', ' : ''}{property.commune || ''}
        </p>

        <ul className="prop-card__features">
          {property.bedrooms != null && (
            <li><b>{property.bedrooms}</b> dorm.</li>
          )}
          {property.bathrooms != null && (
            <li><b>{property.bathrooms}</b> baños</li>
          )}
          {property.parking != null && property.parking > 0 && (
            <li><b>{property.parking}</b> estac.</li>
          )}
          {property.area != null && (
            <li><b>{property.area}</b> m²</li>
          )}
        </ul>

        {/* MÉTRICAS DE INVERSIÓN */}
        {property.capRate != null && property.projectedRent != null && (
          <div className="prop-card__investment">
            <span className="invest-metric">
              <b>{property.capRate}%</b> Cap Rate
            </span>
            <span className="invest-metric">
              <b>{property.projectedRent} UF</b> Arriendo Proy.
            </span>
            {property.investmentStatus && (
              <span className={`invest-badge ${getInvestmentBadgeClass(property.investmentStatus)}`}>
                {formatInvestmentStatus(property.investmentStatus)}
              </span>
            )}
          </div>
        )}

        <div className="prop-card__foot">
          <span className="prop-card__code">Cód. {property.code}</span>
          <Link to={`/propiedades/${property.slug}`} className="link-line">
            Ver propiedad
          </Link>
        </div>
      </div>
    </article>
  )
}
