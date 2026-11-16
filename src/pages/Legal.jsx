import React from 'react'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'
import { Link } from 'react-router-dom'

const legalServices = [
  {
    title: 'Promesas & Contratos',
    icon: '📄',
    items: [
      'Redacción de Promesas de Compraventa con resguardos de señas, plazos de tasación y cláusulas penales',
      'Contratos de Corretaje en Exclusividad',
      'Mandatos especiales y poderes notariales',
      'Revisión y negociación de contratos terceros',
    ],
  },
  {
    title: 'Estudios & Notaría',
    icon: '🔍',
    items: [
      'Estudios de Títulos completos (20-30 años)',
      'Revisión de gravámenes, hipotecas y prohibiciones',
      'Coordinación con Notarías y Conservadores de Bienes Raíces',
      'Inscripción de escrituras en CBR',
      'Levantamiento de hipotecas y cancelación de gravámenes',
    ],
  },
  {
    title: 'Vehículos Societarios',
    icon: '🏢',
    items: [
      'Constitución de SpA y E.I.R.L. para inversión inmobiliaria',
      'Actas de directorio y junta de accionistas',
      'Mandatos para compra/venta por persona jurídica',
      'Estructuración patrimonial y planificación sucesoria',
      'Modificaciones societarias y aumentos de capital',
    ],
  },
]

export default function Legal() {
  useSEO({
    title: 'Legal & Documentos Inmobiliarios',
    description: 'Redacción y gestión legal inmobiliaria: promesas de compraventa, estudios de títulos, contratos, mandatos SpA/E.I.R.L. Seguridad jurídica en cada operación.',
    path: '/legal',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Legal & Documentos', path: '/legal' },
    ]),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Legal & Documentos', href: '/legal' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Unidad Legal & Documental"
        title="Redacción & Gestión Legal Inmobiliaria"
        lead="Seguridad jurídica en cada cláusula de tu operación. Especialistas en documentación inmobiliaria para inversionistas y corredores."
        crumbs={crumbs}
      />

      <section className="services" id="servicios-legales">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Servicios Legales</span>
            <h2 className="section-title">Tres áreas, cobertura total.</h2>
          </div>

          <div className="service-tiles">
            {legalServices.map((s, i) => (
              <article key={s.title} className="service-tile" data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                <span className="service-tile__icon" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'block' }}>{s.icon}</span>
                <h3>{s.title}</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: '1.8' }}>
                  {s.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lead-split">
        <div className="container">
          <div className="lead-split__grid">
            <div className="lead-split__content" data-reveal>
              <span className="eyebrow">Encarga tu documento</span>
              <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
                Solicita redacción o revisión legal
              </h2>
              <p className="lead">
                Completa el formulario y un abogado especialista en derecho inmobiliario
                te contactará en menos de 24h para definir alcance y honorarios.
              </p>
            </div>
            <div className="lead-split__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
              <LeadForm
                intent="redaccion-legal"
                source="/legal"
                fields={[
                  { name: 'name', label: 'Nombre', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'phone', label: 'Teléfono', type: 'tel', required: true },
                  { name: 'montoInversion', label: 'Monto de inversión (UF)', type: 'number', placeholder: 'Ej: 3000', required: true },
                  { name: 'bancoPreAprobacion', label: 'Banco con pre-aprobación', type: 'select', required: false, options: [
                    'BancoEstado',
                    'BancoChile',
                    'Bice',
                    'Santander',
                    'BBVA',
                    'Scotiabank',
                    'Otro',
                  ]},
                  { name: 'propósito', label: 'Propósito', type: 'select', required: true, options: [
                    'Vivienda propia',
                    'Inversión',
                  ]},
                  { name: 'tipoPropiedad', label: 'Tipo de propiedad interés', type: 'select', required: true, options: [
                    'Departamento',
                    'Casa',
                    'Terreno',
                  ]},
                  { name: 'tipoDocumento', label: 'Tipo de documento', type: 'select', required: true, options: [
                    'Promesa de Compraventa',
                    'Escritura Pública',
                    'Estudio de Títulos',
                    'Mandato SpA / E.I.R.L.',
                    'Contrato de Exclusividad',
                    'Contrato de Arriendo',
                    'Levantamiento de Hipoteca',
                    'Otro',
                  ]},
                  { name: 'urgencia', label: 'Urgencia', type: 'select', required: true, options: [
                    { value: 'normal', label: 'Normal (3-5 días hábiles)' },
                    { value: 'urgente', label: 'Urgente (48 horas)' },
                    { value: 'inmediata', label: 'Inmediata (mismo día)' },
                  ]},
                  { name: 'detalles', label: 'Detalles / Partes involucradas', type: 'textarea', placeholder: 'Describe la operación, partes, dirección del inmueble, plazos señalados...', required: false },
                ]}
                submitLabel="Solicitar cotización"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ padding: 'var(--section-pad) 0', background: 'var(--navy)', color: 'var(--ivory)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '1rem', fontWeight: 500 }}>
            ¿Eres corredor y necesitas apoyo legal para tus clientes?
          </h2>
          <p className="lead" style={{ marginBottom: '2rem', color: 'rgba(245,242,234,0.8)' }}>
            Ofrecemos servicios legales B2B para corredores independientes: redacción de promesas, estudios de títulos y gestión notarial. Tarifas preferenciales por volumen.
          </p>
          <Link to="/inversion" className="btn btn--light-outline">
            Alianza B2B Corredores
          </Link>
        </div>
      </section>
    </>
  )
}