import React from 'react'
import { Link } from 'react-router-dom'

const items = [
  { t: 'Análisis de mercado', d: 'Precios, oferta y demanda reales de la zona objetivo.' },
  { t: 'Rentabilidad', d: 'Yield estimado, vacancia y flujo de caja proyectado.' },
  { t: 'Plusvalía', d: 'Desarrollo urbano, conectividad y tendencias del barrio.' },
  { t: 'Financiamiento', d: 'Estructura de crédito y dividendo compatible con tu flujo.' },
  { t: 'Estrategia', d: 'Compra, arriendo o venta según horizonte y perfil.' },
]

export default function InvestorsSection() {
  return (
    <section className="investors" id="inversionistas">
      <div className="container">
        <div className="investors__head" data-reveal>
          <div>
            <span className="eyebrow">Para inversionistas</span>
            <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
              Invierte con información, no con intuición.
            </h2>
          </div>
          <p className="lead" style={{ justifySelf: 'end' }}>
            Evaluamos cada oportunidad con criterio patrimonial: rentabilidad
            esperada, riesgo y estrategia de salida antes de recomendar invertir.
          </p>
        </div>

        <div className="investors__grid">
          {items.map((it, i) => (
            <div key={it.t} className="marker" data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
              <h3>0{i + 1}</h3>
              <p>{it.t}</p>
              <small>{it.d}</small>
            </div>
          ))}
        </div>

        <div className="investors__cta" data-reveal>
          <Link to="/inversion" className="btn btn--primary">
            Quiero evaluar una inversión
          </Link>
        </div>
      </div>
    </section>
  )
}
