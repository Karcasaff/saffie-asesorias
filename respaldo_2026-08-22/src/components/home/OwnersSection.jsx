import React from 'react'
import { Link } from 'react-router-dom'
import LeadForm from '../ui/LeadForm.jsx'

const steps = [
  { n: '01', t: 'Valorizamos', d: 'Precio de mercado con datos reales de la zona.' },
  { n: '02', t: 'Preparamos', d: 'Fotografía editorial y ficha profesional.' },
  { n: '03', t: 'Publicamos', d: 'Portales, redes y nuestra red de contactos.' },
  { n: '04', t: 'Calificamos', d: 'Cada visita llega filtrada y con intención real.' },
  { n: '05', t: 'Negociamos', d: 'Resguardamos tu precio y tus condiciones.' },
  { n: '06', t: 'Cerramos', d: 'Documentación, firma y entrega sin sobresaltos.' },
]

// Sección de captación de propietarios.
export default function OwnersSection() {
  return (
    <section className="owners" id="propietarios">
      <div className="container">
        <div className="owners__grid">
          <div className="owners__content" data-reveal>
            <span className="eyebrow">Para propietarios</span>
            <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
              ¿Quieres vender o arrendar tu propiedad?
            </h2>

            <p className="lead">
              Nos hacemos cargo del proceso completo: valorización, marketing,
              gestión de interesados, visitas, negociación y documentación. Tú
              decides; nosotros ejecutamos.
            </p>

            <ul className="check-list">
              <li>Valorización gratuita basada en datos de mercado</li>
              <li>Marketing profesional y publicación destacada</li>
              <li>Selección rigurosa de compradores y arrendatarios</li>
              <li>Acompañamiento hasta la firma y la entrega</li>
            </ul>

            <div className="owners__actions">
              <Link to="/vender" className="btn btn--primary">
                Quiero vender mi propiedad
              </Link>
              <Link to="/arrendar" className="btn btn--outline">
                Quiero arrendar mi propiedad
              </Link>
            </div>
          </div>

          <div className="owners__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
            <h3 className="owners__form-title">Recibe una valorización</h3>
            <p className="owners__form-sub">
              Déjanos tus datos y te contactamos para evaluar tu propiedad sin costo.
            </p>
            <LeadForm
              intent="vender-o-arrendar"
              source="home-propietarios"
              submitLabel="Quiero mi valorización"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  )
}
