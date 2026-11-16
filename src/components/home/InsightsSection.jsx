import React from 'react'
import { Link } from 'react-router-dom'

const insights = [
  {
    cat: 'Inversión',
    title: 'Cómo evaluar el Cap Rate real de una propiedad en Santiago',
    excerpt:
      'Más allá de la fórmula básica: ajustes por vacancia, gastos operativos, impuestos y riesgo de zona. La metodología que usamos en Saffie.',
    tag: 'Próximamente',
  },
  {
    cat: 'Legal',
    title: 'Cláusulas clave que no pueden faltar en tu Promesa de Compraventa',
    excerpt:
      'Señas y plazos, condiciones suspensivas de tasación y financiamiento, multas por incumplimiento, entrega del inmueble. Lista de verificación práctica.',
    tag: 'Próximamente',
  },
  {
    cat: 'Estrategia',
    title: 'Apalancamiento bancario para tu segunda propiedad de inversión',
    excerpt:
      'Cómo estructurar el pie, evaluar la carga financiera (RDI) y negociar tasas. Diferencias entre crédito hipotecario y mutuaria para inversionistas.',
    tag: 'Próximamente',
  },
]

// Sección editorial "Insights inmobiliarios" — SEO + autoridad.
export default function InsightsSection() {
  return (
    <section className="insights" id="insights">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Insights inmobiliarios</span>
          <h2 className="section-title">Información para decidir mejor.</h2>
        </div>

        <div className="insights__grid">
          {insights.map((post, i) => (
            <article key={post.title} className="insight-card" data-reveal style={{ '--reveal-delay': `${i * 100}ms` }}>
              <span className="insight-card__cat">{post.cat}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="insight-card__tag">{post.tag}</span>
            </article>
          ))}
        </div>

        <p className="insights__note" data-reveal>
          Estamos preparando contenido propio sobre inversión, legal y financiamiento.{' '}
          <Link to="/inversion" className="link-line">
            Suscríbete para recibirlo primero
          </Link>
        </p>
      </div>
    </section>
  )
}