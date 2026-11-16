import React from 'react'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'

const dimensions = [
  { t: 'Rentabilidad', d: 'Yield esperado comparado con alternativas de la zona.' },
  { t: 'Flujo de caja', d: 'Ingresos, gastos y dividendo proyectados mes a mes.' },
  { t: 'Plusvalía', d: 'Desarrollo urbano, proyectos y tendencia del barrio.' },
  { t: 'Vacancia', d: 'Demanda real de arriendo y tiempos estimados de ocupación.' },
  { t: 'Financiamiento', d: 'Estructura crediticia compatible con tu capacidad.' },
  { t: 'Estrategia', d: 'Horizonte de inversión y plan de salida desde el día uno.' },
]

export default function Inversion() {
  useSEO({
    title: 'Inversión inmobiliaria',
    description:
      'Asesoría de inversión inmobiliaria en Santiago: análisis de rentabilidad, flujo de caja, plusvalía y estrategia patrimonial para invertir con información.',
    path: '/inversion',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Inversión', path: '/inversion' },
    ]),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Inversión', href: '/inversion' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Para inversionistas"
        title="Invierte con información, no con intuición."
        lead="Cada oportunidad se evalúa con criterio patrimonial antes de recomendarla. Si los números no convencen, te lo diremos."
        crumbs={crumbs}
      />

      <section className="benefits">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Cómo evaluamos</span>
            <h2 className="section-title">Seis dimensiones de cada decisión.</h2>
          </div>

          <div className="benefits__grid benefits__grid--3">
            {dimensions.map((b, i) => (
              <div key={b.t} className="benefit" data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                <span className="benefit__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>

          <div className="investor-profile" data-reveal>
            <h3>Trabajamos con tres perfiles</h3>
            <ul>
              <li>
                <b>Primer inversionista</b> — quien compra su primera propiedad para arriendo.
              </li>
              <li>
                <b>Inversionista patrimonial</b> — quien diversifica y protege valor en el tiempo.
              </li>
              <li>
                <b>Vendedor ocasional</b> — quien necesita vender un activo heredado o desinvertir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="lead-split">
        <div className="container">
          <div className="lead-split__grid">
            <div className="lead-split__content" data-reveal>
              <span className="eyebrow">Evalúa tu próxima inversión</span>
              <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
                Cuéntanos qué buscas.
              </h2>
              <p className="lead">
                Analizamos tu objetivo y te presentamos oportunidades que
                realmente cumplan tus criterios.
              </p>
            </div>
            <div className="lead-split__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
              <LeadForm
                intent="inversion"
                source="/inversion"
                submitLabel="Evaluar inversión"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
