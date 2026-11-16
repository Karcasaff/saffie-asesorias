import React from 'react'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'

// IMPORTANTE: No se afirman requisitos legales específicos. La normativa de
// subsidios habitacionales cambia periódicamente; la información definitiva
// debe validarse en fuentes oficiales (MINVU / Serviu).

const subsidies = [
  {
    code: 'DS1',
    name: 'Subsidio DS1 (tradicional)',
    forWho:
      'Familias que necesitan comprar o construir su primera vivienda, con ahorro previo.',
    how: 'Postulación a través del Serviu, con asignación según puntaje y disponibilidad regional.',
  },
  {
    code: 'DS49',
    name: 'Subsidio DS49 (integración social)',
    forWho:
      'Familias de sectores medios, incluida la clase media emergente, para compra de viviendas nuevas.',
    how: 'Postulación en tiempos definidos por el MINVU, con montos y condiciones vigentes en cada llamado.',
  },
]

export default function Subsidios() {
  useSEO({
    title: 'Subsidios habitacionales DS1 y DS49',
    description:
      'Orientación clara y acompañamiento en subsidios habitacionales DS1 y DS49: evaluamos tu situación, te preparamos para postular y te acompañamos hasta la compra.',
    path: '/subsidios',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Subsidios', path: '/subsidios' },
    ]),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Subsidios', href: '/subsidios' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Subsidios habitacionales"
        title="Tu subsidio, bien entendido y bien usado."
        lead="Los subsidios habitacionales pueden transformar una posibilidad en un hogar. Te ayudamos a entenderlos y a usarlos correctamente."
        crumbs={crumbs}
      />

      <section className="subsidies">
        <div className="container">
          <div className="subsidies__grid">
            {subsidies.map((s, i) => (
              <article key={s.code} className="subsidy-card" data-reveal style={{ '--reveal-delay': `${i * 120}ms` }}>
                <span className="subsidy-card__code">{s.code}</span>
                <h3>{s.name}</h3>
                <dl>
                  <dt>¿Qué es?</dt>
                  <dd>{s.forWho}</dd>
                  <dt>¿Cómo funciona?</dt>
                  <dd>{s.how}</dd>
                </dl>
              </article>
            ))}
          </div>

          <div className="subsidies__note" data-reveal>
            <p>
              <b>Nota importante:</b> los requisitos, montos y fechas de
              postulación son definidos por el MINVU y el Serviu, y cambian
              entre llamados. La información oficial y definitiva corresponde a
              esas entidades; nosotros te orientamos y te acompañamos durante
              todo el proceso.
            </p>
          </div>

          <div className="section-head" data-reveal>
            <span className="eyebrow">Cómo te ayudamos</span>
            <h2 className="section-title">Acompañamiento real, no solo información.</h2>
          </div>

          <div className="process__timeline">
            {[
              { n: '01', t: 'Evaluamos', d: 'Analizamos tu situación y qué subsidio se ajusta a ella.' },
              { n: '02', t: 'Preparamos', d: 'Ordenamos tus antecedentes y ahorro antes de postular.' },
              { n: '03', t: 'Acompañamos', d: 'Te guiamos durante toda la postulación.' },
              { n: '04', t: 'Buscamos', d: 'Identificamos propiedades elegibles según tu subsidio.' },
            ].map((s, i) => (
              <div key={s.n} className="step" data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
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
              <span className="eyebrow">Da el primer paso</span>
              <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
                ¿Quieres saber si puedes acceder?
              </h2>
              <p className="lead">
                Cuéntanos tu situación y evaluaremos contigo las opciones
                disponibles.
              </p>
            </div>
            <div className="lead-split__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
              <LeadForm
                intent="subsidios"
                source="/subsidios"
                submitLabel="Quiero saber si puedo acceder"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
