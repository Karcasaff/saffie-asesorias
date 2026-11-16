import React from 'react'
import { Link } from 'react-router-dom'

const items = [
  { t: 'Cobranza', d: 'Seguimiento de pagos y gestión oportuna de atrasos.' },
  { t: 'Contratos', d: 'Renovaciones, reajustes y documentación al día.' },
  { t: 'Mantención', d: 'Coordinación de reparaciones y visitas técnicas.' },
  { t: 'Reportes', d: 'Información clara y periódica de tu propiedad.' },
]

// Teaser administración — página completa en /administracion.
export default function AdminSection() {
  return (
    <section className="admin-teaser">
      <div className="container">
        <div className="admin-teaser__grid" data-reveal>
          <div>
            <span className="eyebrow">Administración de arriendos</span>
            <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
              Tu propiedad, administrada de principio a fin.
            </h2>
            <p className="lead" style={{ marginTop: '1.6rem' }}>
              Nos encargamos de la operación diaria para que tu inversión genere
              valor sin sacarte tiempo: cobranza, contratos, mantenciones,
              comunicación con arrendatarios y reportes periódicos.
            </p>
            <Link to="/administracion" className="btn btn--light-outline" style={{ marginTop: '2.2rem' }}>
              Conocer administración
            </Link>
          </div>

          <div className="admin-teaser__items">
            {items.map((it) => (
              <div key={it.t} className="admin-teaser__item">
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
