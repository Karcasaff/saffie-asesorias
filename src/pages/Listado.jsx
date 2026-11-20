import React from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/listado.js'
import { fmtUF, fmtCLP } from '../utils/uf.js'

export default function Listado() {
  return (
    <section className="props-page">
      <div className="container">
        <div className="featured-props__head" data-reveal>
          <div>
            <span className="eyebrow">Propiedades sin foto</span>
            <h2 className="section-title">Listado completo para inversores</h2>
            <p className="lead">
              Estas propiedades aún no tienen fotografías publicadas. Contáctanos por WhatsApp para gestionar las imágenes y coordinar una visita.
            </p>
            <a href="/listado-completo.xlsx" className="btn btn--primary" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              ⬇ Descargar Excel con todas las propiedades
            </a>
          </div>
          <Link to="/" className="btn btn--outline" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            ← Volver al inicio
          </Link>
        </div>

        <div className="props-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {properties.map((p) => (
            <div key={p.id} className="prop-card" data-reveal>
              <div className="prop-card__media-placeholder">
                <span className="prop-card__badge prop-card__badge--venta">Venta</span>
                <span className="prop-card__media-empty">Sin foto</span>
              </div>
              <div className="prop-card__body">
                <div className="prop-card__top">
                  <span className="prop-card__price">{fmtUF(p.price)}</span>
                  {p.price_clp != null && <span className="prop-card__price prop-card__price--clp">{fmtCLP(p.price_clp)}</span>}
                </div>
                <h3 className="prop-card__title">
                  <Link to={`/propiedades/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="prop-card__loc">{p.commune}</p>
                <ul className="prop-card__features">
                  {p.bedrooms != null && <li><b>{p.bedrooms}</b> dorm.</li>}
                  {p.bathrooms != null && <li><b>{p.bathrooms}</b> baños</li>}
                  {p.area != null && <li><b>{p.area}</b> m²</li>}
                </ul>
                <div className="prop-card__foot">
                  <span className="prop-card__code">Cód. {p.code}</span>
                  <a href={`https://wa.me/56900000000?text=${encodeURIComponent('Hola Saffie, quiero información de la propiedad ' + p.code + ': ' + p.title)}`} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ width: '100%' }}>
                    Gestionar fotos por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
          {properties.length === 0 && (
            <div className="props-empty">
              <h3>No hay propiedades sin foto</h3>
              <p>Todas las propiedades ya cuentan con imagen.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
