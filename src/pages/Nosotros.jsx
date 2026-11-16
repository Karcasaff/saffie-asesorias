import React from 'react'
import { Link } from 'react-router-dom'
import { useSEO, breadcrumbSchema, realEstateAgentSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'

const principles = [
  {
    t: 'Criterio antes que presión',
    d: 'No recomendamos una operación que no defenderíamos con nuestro propio patrimonio.',
  },
  {
    t: 'Información antes que promesas',
    d: 'Cada consejo se apoya en datos de mercado verificables y experiencia local.',
  },
  {
    t: 'Cercanía antes que volumen',
    d: 'Trabajamos un número acotado de clientes para acompañar cada caso de verdad.',
  },
]

export default function Nosotros() {
  useSEO({
    title: 'Nosotros',
    description:
      'Conoce Saffie: firma chilena especializada en brokerage de inversión inmobiliaria y servicios legales documentales. Asesoría experta para decisiones patrimoniales seguras.',
    path: '/nosotros',
    jsonLd: realEstateAgentSchema(),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        title="Una firma inmobiliaria con criterio propio."
        lead="Saffie nace de una convicción simple: las mejores decisiones inmobiliarias se toman con información honesta y acompañamiento experto."
        crumbs={crumbs}
      />

      <section className="story">
        <div className="container">
          <div className="statement__inner">
            <p className="statement__text" data-reveal>
              No somos una corredora más. Somos el equipo que te ayuda a{' '}
              <em>decidir bien</em>, no solo a transaccionar rápido.
            </p>
          </div>

          <div className="story__body">
            <p data-reveal>
              Saffie Asesoría & Gestión Inmobiliaria es una firma chilena
              especializada en <strong>brokerage para inversionistas</strong> (venta de cartera y propiedades de inversión)
              y <strong>servicios legales y documentales inmobiliarios</strong> (promesas, escrituras, estudios de títulos, mandatos SpA/E.I.R.L.).
              Combinamos el oficio tradicional del corretaje con procesos
              digitales modernos: cada consulta queda registrada, cada
              operación tiene seguimiento y cada cliente sabe siempre en qué
              etapa está.
            </p>
            <p data-reveal>
              Creemos en la tecnología como herramienta —no como espectáculo—.
              Por eso automatizamos lo operativo para dedicar el tiempo humano
              a lo que realmente define una buena decisión: escuchar,
              analizar y recomendar con honestidad.
            </p>
          </div>
        </div>
      </section>

      <section className="principles">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Nuestros principios</span>
            <h2 className="section-title">Cómo trabajamos.</h2>
          </div>

          <div className="benefits__grid benefits__grid--3">
            {principles.map((p, i) => (
              <div key={p.t} className="benefit" data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
                <span className="benefit__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS — [PLACEHOLDER] Se agregarán testimonios reales autorizados */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials__head" data-reveal>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Experiencias Saffie
            </span>
            <p className="testimonials__intro">
              Estamos recopilando testimonios reales y autorizados de nuestros
              clientes. Próximamente este espacio contará sus historias.
            </p>
          </div>
        </div>
      </section>

      <section className="insights">
        <div className="container">
          <div className="investors__cta" data-reveal style={{ textAlign: 'center' }}>
            <Link to="/inversion" className="btn btn--primary">
              Conversa con nosotros
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}