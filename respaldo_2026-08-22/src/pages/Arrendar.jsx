import React from 'react'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'

const steps = [
  { n: '01', t: 'Evaluación', d: 'Revisamos la propiedad y definimos el arriendo objetivo.' },
  { n: '02', t: 'Publicación', d: 'Ficha profesional y difusión en canales relevantes.' },
  { n: '03', t: 'Selección', d: 'Examinamos documentación y solvencia de cada postulante.' },
  { n: '04', t: 'Contrato', d: 'Redacción y firma con garantías correspondientes.' },
  { n: '05', t: 'Entrega', d: 'Acta de entrega e inventario detallado.' },
  { n: '06', t: 'Administración', d: 'Cobranza, seguimiento y soporte durante todo el contrato.' },
]

export default function Arrendar() {
  useSEO({
    title: 'Arrendar mi propiedad',
    description:
      'Arrienda tu propiedad sin preocupaciones: evaluación, publicación, selección rigurosa de arrendatarios, contrato, entrega y administración integral en Santiago.',
    path: '/arrendar',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Arrendar', path: '/arrendar' },
    ]),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Arrendar', href: '/arrendar' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Para propietarios"
        title="Arrienda tu propiedad con la tranquilidad de estar bien acompañado."
        lead="Seleccionamos arrendatarios confiables y nos hacemos cargo del proceso completo — o de la administración si lo prefieres."
        crumbs={crumbs}
      />

      <section className="process">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">El proceso</span>
            <h2 className="section-title">Seis etapas, cero improvisación.</h2>
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
        </div>
      </section>

      <section className="lead-split">
        <div className="container">
          <div className="lead-split__grid">
            <div className="lead-split__content" data-reveal>
              <span className="eyebrow">Comencemos</span>
              <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
                Quiero arrendar mi propiedad.
              </h2>
              <p className="lead">
                Déjanos tus datos y te contactaremos para evaluar tu propiedad y
                explicarte el servicio en detalle.
              </p>
            </div>
            <div className="lead-split__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
              <LeadForm
                intent="arrendar-propiedad"
                source="/arrendar"
                submitLabel="Quiero arrendar mi propiedad"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
