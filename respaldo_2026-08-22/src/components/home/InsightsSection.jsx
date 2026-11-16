import React from 'react'
import { Link } from 'react-router-dom'

const insights = [
  {
    cat: 'Mercado',
    title: '¿Cómo se determina realmente el precio de una propiedad?',
    excerpt:
      'Valor comparativo, condición del inmueble y liquidez de la zona: los tres factores que explican la mayoría de las diferencias de precio.',
    tag: 'Próximamente',
  },
  {
    cat: 'Arriendos',
    title: 'Qué revisar antes de firmar un contrato de arrendamiento',
    excerpt:
      'Garantías, reajustes, gastos comunes y inventario: una guía clara para propietarios y arrendatarios.',
    tag: 'Próximamente',
  },
  {
    cat: 'Subsidios',
    title: 'Subsidios habitacionales: por dónde empezar',
    excerpt:
      'Las preguntas correctas antes de postular: qué subsidio se ajusta a tu situación y cómo prepararte.',
    tag: 'Próximamente',
  },
]

// Sección editorial "Insights inmobiliarios" — SEO + autoridad.
// Los artículos completos se publicarán en /insights (en construcción).
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
          Estamos preparando contenido propio sobre mercado, inversión y financiamiento.{' '}
          <Link to="/contacto" className="link-line">
            Suscríbete para recibirlo primero
          </Link>
        </p>
      </div>
    </section>
  )
}
