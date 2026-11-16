import React from 'react'
import { Link } from 'react-router-dom'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'

// /portal — Arquitectura preparada para el futuro portal del cliente.
// La autenticación y las vistas privadas se incorporarán en una fase posterior.
const roles = [
  {
    role: 'Propietario',
    items: ['Mis propiedades', 'Visitas agendadas', 'Interesados y ofertas', 'Contratos y documentos', 'Pagos recibidos', 'Reportes de administración'],
  },
  {
    role: 'Comprador',
    items: ['Propiedades favoritas', 'Visitas coordinadas', 'Documentos de la operación', 'Estado de mi compra'],
  },
  {
    role: 'Arrendatario',
    items: ['Mi contrato', 'Pagos y comprobantes', 'Solicitudes de mantención', 'Comunicaciones'],
  },
]

export default function Portal() {
  useSEO({
    title: 'Portal del cliente (próximamente)',
    description:
      'El futuro portal de clientes Saffie: propietarios, compradores y arrendatarios con información de su operación en línea.',
    path: '/portal',
  })

  return (
    <section className="portal">
      <div className="container">
        <div className="section-head section-head--center" data-reveal>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Próximamente
          </span>
          <h1 className="section-title" style={{ margin: '1.4rem auto 0' }}>
            Portal del cliente Saffie
          </h1>
          <p className="lead" style={{ marginInline: 'auto' }}>
            Estamos construyendo un espacio privado donde cada cliente seguirá su
            operación en tiempo real. Esta es la vista previa de lo que viene.
          </p>
        </div>

        <div className="portal__grid">
          {roles.map((r, i) => (
            <article key={r.role} className="portal__card" data-reveal style={{ '--reveal-delay': `${i * 100}ms` }}>
              <h3>{r.role}</h3>
              <ul>
                {r.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="portal__note" data-reveal>
          Mientras tanto,{' '}
          <Link to="/contacto" className="link-line">
            escríbenos
          </Link>{' '}
          y recibirás actualizaciones directas de tu asesor.
        </p>
      </div>
    </section>
  )
}
