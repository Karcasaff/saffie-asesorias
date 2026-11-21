import React from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero.jsx'
import { whatsappLink } from '../utils/whatsapp.js'
import { whatsappDefaultMessage } from '../data/site.js'

export default function Listado() {
  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Descargar Listado', href: '/listado' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Documento Oficial"
        title="Descarga el Listado Consolidado de Bienes Reposeídos"
        lead="Obtén el archivo Excel con todas las propiedades bancarias consolidadas, incluyendo su valor en UF y cálculo exacto en pesos chilenos (UF $41.371)."
        crumbs={crumbs}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a
            href="/listado-completo.xlsx"
            download="bienes-reposeidos-prosaffie.xlsx"
            className="btn btn--primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', fontSize: '1rem' }}
          >
            ⬇ Descargar Listado Excel Oficial (.xlsx)
          </a>
          <a
            href={whatsappLink(whatsappDefaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', fontSize: '1rem' }}
          >
            💬 Consultar por WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="props-page" style={{ paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0f172a' }}>Información importante sobre el archivo</h2>
            <ul style={{ paddingLeft: '1.25rem', color: '#475569', display: 'grid', gap: '0.75rem', fontSize: '1rem' }}>
              <li><strong>Actualización vigente:</strong> Catálogo consolidado con todas las propiedades recuperadas y reposeídas bancarias.</li>
              <li><strong>Precios Transparentes:</strong> Cada registro contiene su valor en UF original y su respectiva equivalencia en pesos chilenos calculada a la UF de hoy ($41.371).</li>
              <li><strong>Gestión Directa:</strong> Si requieres revisar antecedentes legales, estado de ocupación o coordinar una visita, contáctanos directamente a través de nuestros canales oficiales.</li>
            </ul>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <Link to="/propiedades" className="btn btn--outline">
                ← Volver al buscador de propiedades
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
