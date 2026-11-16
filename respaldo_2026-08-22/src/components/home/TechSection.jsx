import React from 'react'
import { Link } from 'react-router-dom'

const flow = [
  { k: 'Cliente', d: 'Llega por web, WhatsApp o referido.' },
  { k: 'Tecnología', d: 'Registramos y organizamos cada consulta al instante.' },
  { k: 'Automatización', d: 'Seguimientos y recordatorios sin perder detalle.' },
  { k: 'Asesor', d: 'Experto humano con toda la información a mano.' },
  { k: 'Resultado', d: 'Respuestas rápidas y decisiones bien informadas.' },
]

const capabilities = [
  'Registro inmediato de cada consulta',
  'Seguimiento automatizado de interesados',
  'Agenda de visitas coordinada',
  'Información de la operación siempre ordenada',
]

// Sección tecnología + IA — integración elegante, sin clichés futuristas.
export default function TechSection() {
  return (
    <section className="tech" id="tecnologia">
      <div className="container">
        <div className="tech__head" data-reveal>
          <div>
            <span className="eyebrow">Tecnología + criterio</span>
            <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
              Gestión inmobiliaria potenciada por tecnología.
            </h2>
          </div>
          <p className="lead" style={{ justifySelf: 'end' }}>
            La tecnología no reemplaza al asesor: lo potencia. Detrás de cada
            operación hay procesos digitales que ordenan información y liberan
            tiempo para lo que importa — asesorarte bien.
          </p>
        </div>

        <ol className="tech-flow">
          {flow.map((f, i) => (
            <li key={f.k} className="tech-flow__node" data-reveal style={{ '--reveal-delay': `${i * 100}ms` }}>
              <span className="tech-flow__label">{f.k}</span>
              <span className="tech-flow__desc">{f.d}</span>
              {i < flow.length - 1 && <span className="tech-flow__arrow" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div className="tech__bottom" data-reveal>
          <ul className="check-list check-list--dark">
            {capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="tech__note">
            Estamos integrando activamente un asistente con inteligencia artificial
            para responder consultas y recomendar propiedades.{' '}
            <Link to="/contacto" className="link-line">
              Quiero conocer más
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
