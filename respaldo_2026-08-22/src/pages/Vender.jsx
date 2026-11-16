import React from 'react'
import { Link } from 'react-router-dom'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'

const steps = [
  { n: '01', t: 'Evaluamos', d: 'Visita la propiedad y revisamos su condición documental y física.' },
  { n: '02', t: 'Valorizamos', d: 'Precio de venta basado en ventas reales comparables de la zona.' },
  { n: '03', t: 'Estrategia', d: 'Definimos posicionamiento, timing y plan comercial contigo.' },
  { n: '04', t: 'Publicamos', d: 'Fotografía profesional y presencia en los portales relevantes.' },
  { n: '05', t: 'Demanda', d: 'Generamos y calificamos interesados con intención real.' },
  { n: '06', t: 'Visitas', d: 'Coordinamos y acompañamos cada visita a la propiedad.' },
  { n: '07', t: 'Negociamos', d: 'Resguardamos tu precio y las condiciones de la operación.' },
  { n: '08', t: 'Cerramos', d: 'Promesa, escritura, pago y entrega coordinada.' },
]

export default function Vender() {
  useSEO({
    title: 'Vender mi propiedad',
    description:
      'Vende tu propiedad en Santiago con Saffie: valorización con datos reales, marketing profesional, gestión de visitas y negociación experta hasta el cierre.',
    path: '/vender',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Vender', path: '/vender' },
    ]),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Vender', href: '/vender' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Para propietarios"
        title="Vende tu propiedad con estrategia, no con suerte."
        lead="Un proceso probado en ocho etapas que resguarda tu precio y te libera del desgaste de vender por tu cuenta."
        crumbs={crumbs}
      />

      <section className="process">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">El proceso</span>
            <h2 className="section-title">De la evaluación a la entrega.</h2>
          </div>

          <div className="process__timeline">
            {steps.map((s, i) => (
              <div key={s.n} className="step" data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                <span className="step__num">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>

          <p className="process__note" data-reveal>
            ¿Prefieres arrendar en vez de vender?{' '}
            <Link to="/arrendar" className="link-line">
              Conoce el proceso de arriendo
            </Link>
          </p>
        </div>
      </section>

      <section className="lead-split">
        <div className="container">
          <div className="lead-split__grid">
            <div className="lead-split__content" data-reveal>
              <span className="eyebrow">Comencemos</span>
              <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
                Quiero vender mi propiedad.
              </h2>
              <p className="lead">
                Cuéntanos sobre tu propiedad y te contactaremos para coordinar una
                valorización sin costo ni compromiso.
              </p>
            </div>
            <div className="lead-split__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
              <LeadForm
                intent="vender-propiedad"
                source="/vender"
                submitLabel="Quiero vender mi propiedad"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
