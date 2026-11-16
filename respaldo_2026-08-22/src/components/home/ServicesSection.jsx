import React from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Comprar',
    desc: 'Búsqueda personalizada, evaluación técnica y negociación experta para tu próxima propiedad.',
    to: '/propiedades?operacion=venta',
    num: '01',
  },
  {
    title: 'Arrendar',
    desc: 'Publicamos tu propiedad, seleccionamos arrendatarios y gestionamos el contrato completo.',
    to: '/arrendar',
    num: '02',
  },
  {
    title: 'Vender',
    desc: 'Valorización con datos de mercado, estrategia comercial y cierre seguro.',
    to: '/vender',
    num: '03',
  },
  {
    title: 'Administrar',
    desc: 'Administración integral de arriendos: cobranza, contratos, mantención y reportes.',
    to: '/administracion',
    num: '04',
  },
  {
    title: 'Invertir',
    desc: 'Análisis de rentabilidad, plusvalía y riesgo para decisiones patrimoniales.',
    to: '/inversion',
    num: '05',
  },
  {
    title: 'Subsidios',
    desc: 'Orientación clara en subsidios habitacionales DS1 y DS49, de la postulación a la llave.',
    to: '/subsidios',
    num: '06',
  },
]

export default function ServicesSection() {
  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Servicios</span>
          <h2 className="section-title">Una firma para todo tu ciclo inmobiliario.</h2>
        </div>

        <div className="service-tiles">
          {services.map((s, i) => (
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
