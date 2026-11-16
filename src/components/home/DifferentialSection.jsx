import React from 'react'

// Sección diferencial — "Más que una corredora"
export default function DifferentialSection() {
  return (
    <section className="statement" id="diferencial">
      <div className="container">
        <div className="statement__inner">
          <span className="eyebrow" data-reveal>
            Más que una corredora
          </span>

          <p className="statement__text" data-reveal style={{ '--reveal-delay': '100ms' }}>
            Combinamos experiencia inmobiliaria, gestión personalizada y{' '}
            <em>tecnología que trabaja por ti</em>.
          </p>

          <p className="statement__support" data-reveal style={{ '--reveal-delay': '200ms' }}>
            Cada operación en Saffie es acompañada por un asesor experto y respaldada
            por procesos digitales: información ordenada, seguimiento transparente y
            tiempos de respuesta que marcan la diferencia.
          </p>
        </div>
      </div>
    </section>
  )
}
