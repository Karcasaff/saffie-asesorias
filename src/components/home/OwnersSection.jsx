import React from 'react'
import { Link } from 'react-router-dom'
import LeadForm from '../ui/LeadForm.jsx'

const steps = [
  { n: '01', t: 'Analizamos', d: 'Evaluamos tu cartera: rentabilidad actual, plusvalía y potencial de salida.' },
  { n: '02', t: 'Estrategiamos', d: 'Definimos el mejor momento y canal de venta por activo.' },
  { n: '03', t: 'Preparamos', d: 'Fichas técnicas con métricas de inversión (Cap Rate, flujo, RDI).' },
  { n: '04', t: 'Segmentamos', d: 'Dirigimos cada propiedad al perfil de inversor correcto.' },
  { n: '05', t: 'Negociamos', d: 'Resguardamos tu precio y condiciones en cada oferta.' },
  { n: '06', t: 'Cerramos', d: 'Coordinación legal, notarial y entrega sin fricciones.' },
]

// Sección de captación de propietarios de cartera de inversión.
export default function OwnersSection() {
  return (
    <section className="owners" id="propietarios">
      <div className="container">
        <div className="owners__grid">
          <div className="owners__content" data-reveal>
            <span className="eyebrow">Para propietarios de inversión</span>
            <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
              ¿Quieres vender tu propiedad de inversión o cartera?
            </h2>

            <p className="lead">
              Nos especializamos en la venta de activos inmobiliarios con foco en rentabilidad.
              No vendemos "hogares": vendemos activos financieros a inversores que analizan Cap Rate,
              flujo de caja y plusvalía. Maximizamos tu salida.
            </p>

            <ul className="check-list">
              <li>Valorización basada en métricas de inversión (no solo comparables de mercado)</li>
              <li>Acceso directo a red de inversores calificados</li>
              <li>Fichas técnicas con Cap Rate, flujo proyectado y factibilidad crediticia</li>
              <li>Acompañamiento legal y notarial incluido</li>
            </ul>

            <div className="owners__actions">
              <Link to="/propiedades" className="btn btn--primary">
                Ver cómo presentamos las oportunidades
              </Link>
              <Link to="/inversion" className="btn btn--outline">
                Conocer perfil de nuestros inversores
              </Link>
            </div>
          </div>

          <div className="owners__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
            <h3 className="owners__form-title">Recibe una valorización de inversión</h3>
            <p className="owners__form-sub">
              Déjanos los datos de tu propiedad y te contactamos para evaluar su potencial de venta sin costo.
            </p>
            <LeadForm
              intent="vender-inversion"
              source="home-propietarios"
              fields={[
                { name: 'name', label: 'Nombre', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'phone', label: 'Teléfono', type: 'tel', required: true },
                { name: 'direccion', label: 'Dirección de la propiedad', type: 'text', placeholder: 'Calle, número, comuna', required: true },
                { name: 'tipoPropiedad', label: 'Tipo', type: 'select', required: true, options: ['Departamento', 'Casa', 'Comercial', 'Terreno', 'Bodega', 'Otro'] },
                { name: 'arrendada', label: '¿Está arrendada?', type: 'select', required: true, options: [
                  { value: 'si', label: 'Sí, con arrendatario vigente' },
                  { value: 'no', label: 'No, está vacía (en blanco)' },
                  { value: 'verde', label: 'En verde / en construcción' },
                ]},
                { name: 'arriendoActual', label: 'Arriendo actual (UF/mes)', type: 'number', placeholder: 'Ej: 44', required: false },
              ]}
              submitLabel="Solicitar valorización"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  )
}