import React from 'react'
import { Link } from 'react-router-dom'

const pillars = [
  {
    num: '01',
    title: 'Compra Directa Bancaria',
    desc: 'Sin subastas, adquisición directa al reposesionario. Transparencia total de precio en UF y condiciones claras desde el primer contacto.',
    to: '/propiedades',
  },
  {
    num: '02',
    title: 'Gestión Legal y Títulos',
    desc: 'Estudios de título completos, liberación de gravámenes y escrituración garantizada. Seguridad jurídica en cada operación bancaria.',
    to: '/legal',
  },
  {
    num: '03',
    title: 'Crédito Hipotecario',
    desc: 'Asesoría para financiamiento bancario en compra de bienes repo. Gestionamos tu pre-aprobación y condiciones óptimas con los principales bancos.',
    to: '/inversion',
  },
]

export default function ServicesSection() {
  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Nuestros Pilares</span>
          <h2 className="section-title">Tres especialidades para tu operación bancaria.</h2>
        </div>

        <div className="service-tiles">
          {pillars.map((s, i) => (
            <Link
              key={s.title}
              to={s.to}
              className="service-tile"
              data-reveal
              style={{ '--reveal-delay': `${i * 70}ms` }}
            >
              <span className="service-tile__num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="link-line">Conocer más</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}