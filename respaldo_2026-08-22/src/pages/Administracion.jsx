import React from 'react'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'

const benefits = [
  { t: 'Cobranza', d: 'Seguimiento de pagos, recordatorios y gestión oportuna de atrasos.' },
  { t: 'Contratos', d: 'Renovaciones, reajustes según lo pactado y documentación siempre vigente.' },
  { t: 'Mantención', d: 'Coordinación de reparaciones con proveedores verificados.' },
  { t: 'Atención al arrendatario', d: 'Un canal único para solicitudes, consultas y coordinación.' },
  { t: 'Gestión documental', d: 'Inventarios, actas y garantías organizadas y disponibles.' },
  { t: 'Reportes periódicos', d: 'Estado de tu propiedad y del contrato, claro y sin sorpresas.' },
]

export default function Administracion() {
  useSEO({
    title: 'Administración de arriendos',
    description:
      'Administración integral de propiedades en arriendo en Santiago: cobranza, contratos, mantenciones, atención al arrendatario y reportes periódicos.',
    path: '/administracion',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Administración', path: '/administracion' },
    ]),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Administración', href: '/administracion' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Gestión integral"
        title="Tu propiedad, administrada de principio a fin."
        lead="La administración correcta protege tu inversión y tu tiempo. Nos hacemos cargo de la operación diaria con procesos claros y comunicación constante."
        crumbs={crumbs}
      />

      <section className="benefits">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Qué incluye</span>
            <h2 className="section-title">Todo lo que tu propiedad necesita.</h2>
          </div>

          <div className="benefits__grid">
            {benefits.map((b, i) => (
              <div key={b.t} className="benefit" data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                <span className="benefit__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>

          <p className="benefits__note" data-reveal>
            El alcance y la tarifa de la administración se definen caso a caso,
            según las características de la propiedad y el nivel de servicio que
            necesitas.{' '}
          </p>
        </div>
      </section>

      <section className="lead-split lead-split--dark">
        <div className="container">
          <div className="lead-split__grid">
            <div className="lead-split__content" data-reveal>
              <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
                Solicita tu evaluación
              </span>
              <h2 className="section-title" style={{ marginTop: '1.4rem', color: 'var(--ivory)' }}>
                Conversemos sobre tu propiedad.
              </h2>
              <p className="lead" style={{ color: 'rgba(245,242,234,0.7)' }}>
                Te presentaremos una propuesta de administración adaptada a tu
                caso, sin costo ni compromiso.
              </p>
            </div>
            <div className="lead-split__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
              <LeadForm
                intent="administracion"
                source="/administracion"
                submitLabel="Solicitar evaluación"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
