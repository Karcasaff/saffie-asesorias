import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBySlug, getSimilar, formatInvestmentStatus } from '../data/properties.js'
import { formatUF } from '../utils/format.js'
import { getUF, fmtCLP, fmtUF } from '../utils/uf.js'
import { whatsappLink, waMessages } from '../utils/whatsapp.js'
import { useSEO } from '../hooks/useSEO.js'
import { site } from '../data/site.js'
import PropertyCard from '../components/ui/PropertyCard.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'

// Ficha de propiedad — experiencia premium con galería y conversión contextual.
export default function PropiedadDetalle() {
  const { slug } = useParams()
  const property = getBySlug(slug)
  const [activeImg, setActiveImg] = useState(0)
  const [copied, setCopied] = useState(false)
  const [ufValor, setUfValor] = useState(null)
  useEffect(() => { getUF().then(setUfValor) }, [])

  const clp = ufValor != null && property.price != null
    ? Math.round(property.price * ufValor)
    : property.price_clp

  const status = property.status || 'disponible'

  useSEO({
    title: property ? `${property.title} — Venta en ${property.commune}` : 'Propiedad no encontrada',
    description: property
      ? property.description.replace('[PLACEHOLDER — Descripción demo] ', '')
      : 'Propiedad no encontrada.',
    path: `/propiedades/${slug}`,
    type: 'product',
    jsonLd: property
      ? {
          '@context': 'https://schema.org',
          '@type': 'Residence',
          name: property.title,
          numberOfRooms: property.bedrooms,
          numberOfBathroomsTotal: property.bathrooms,
          floorSize: { '@type': 'QuantitativeValue', value: property.area, unitCode: 'MTK' },
          address: {
            '@type': 'PostalAddress',
            addressLocality: property.commune,
            addressRegion: 'Región Metropolitana',
            addressCountry: 'CL',
          },
          offers: {
            '@type': 'Offer',
            price: property.price != null ? property.price : undefined,
            priceCurrency: 'CLF',
            availability:
              property.status === 'disponible'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/SoldOut',
          },
        }
      : undefined,
  })

  if (!property) {
    return (
      <section className="props-page">
        <div className="container props-empty">
          <h1>Propiedad no encontrada</h1>
          <p>Es posible que haya sido vendida, arrendada o retirada del portafolio.</p>
          <Link to="/propiedades" className="btn btn--primary">
            Ver todas las propiedades
          </Link>
        </div>
      </section>
    )
  }

  const waVisit = whatsappLink(waMessages.visit(property))
  const waProp = whatsappLink(waMessages.property(property))

  const shareUrl = `${site.url}/propiedades/${property.slug}`
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard no disponible */
    }
  }

  const similar = getSimilar(property)

  return (
    <>
      {/* BREADCRUMB */}
      <nav className="breadcrumb breadcrumb--page" aria-label="Miga de pan" data-reveal>
        <div className="container" style={{ display: 'flex', gap: '0.6rem' }}>
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/propiedades">Propiedades</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{property.code}</span>
        </div>
      </nav>

      <article className="detail">
        <div className="container">
          {/* GALERÍA */}
          <div className="detail__gallery" data-reveal>
            <div className="detail__main-img">
              {property.images && property.images.length > 0 ? (
                <>
                  <img src={property.images[activeImg]} alt={`${property.title} — imagen ${activeImg + 1}`} />
                  <span className="prop-card__badge prop-card__badge--venta">
                    Venta
                  </span>
                </>
              ) : (
                <div className="prop-card__media-placeholder">
                  <span className="prop-card__badge prop-card__badge--venta">
                    Venta
                  </span>
                  <span className="prop-card__media-empty">Sin foto</span>
                </div>
              )}
            </div>
            <div className="detail__thumbs" role="tablist" aria-label="Galería de imágenes">
              {(property.images || []).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={activeImg === i}
                  aria-label={`Imagen ${i + 1}`}
                  className={`detail__thumb ${activeImg === i ? 'is-active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="detail__grid">
            {/* INFORMACIÓN */}
            <div className="detail__info">
              <header className="detail__header" data-reveal>
                <div>
                  <h1 className="detail__title">{property.title}</h1>
                  <p className="detail__loc">
                    {property.neighborhood ? property.neighborhood + ', ' : ''}{property.commune || ''} · Cód. {property.code}
                  </p>
                </div>

                <div className="detail__share">
                  {waProp && (
                    <a href={waProp} target="_blank" rel="noopener noreferrer" aria-label="Compartir por WhatsApp">
                      WhatsApp
                    </a>
                  )}
                  <button type="button" onClick={copyLink}>
                    {copied ? '¡Copiado!' : 'Copiar enlace'}
                  </button>
                </div>
              </header>

              <ul className="detail__features-strip" data-reveal>
                {property.bedrooms != null && (
                  <li>
                    <b>{property.bedrooms}</b>
                    <span>Dormitorios</span>
                  </li>
                )}
                {property.bathrooms != null && (
                  <li>
                    <b>{property.bathrooms}</b>
                    <span>Baños</span>
                  </li>
                )}
                {property.parking != null && property.parking > 0 && (
                  <li>
                    <b>{property.parking}</b>
                    <span>Estac.</span>
                  </li>
                )}
                {property.storage != null && (
                  <li>
                    <b>{property.storage ? 'Sí' : 'No'}</b>
                    <span>Bodega</span>
                  </li>
                )}
                {property.capRate != null && (
                  <li>
                    <b>{property.capRate}%</b>
                    <span>Cap Rate</span>
                  </li>
                )}
                {property.investmentStatus != null && (
                  <li>
                    <b>{formatInvestmentStatus(property.investmentStatus)}</b>
                    <span>Estado</span>
                  </li>
                )}
              </ul>

              {property.capRate != null && property.projectedRent != null && (
                <div className="detail__investment-highlights" data-reveal style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--ink)' }}>Métricas de Inversión</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: '0.3rem' }}>Rentabilidad Neta (Cap Rate)</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--gold)' }}>{property.capRate}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: '0.3rem' }}>Arriendo Proyectado</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--ink)' }}>{property.projectedRent} UF/mes</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: '0.3rem' }}>Estado de Inversión</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--ink)' }}>{formatInvestmentStatus(property.investmentStatus)}</div>
                    </div>
                  </div>
                </div>
              )}

              <h2 className="detail__h2" data-reveal>Sobre la propiedad</h2>
              <p className="detail__desc" data-reveal>{property.description}</p>

              <h2 className="detail__h2" data-reveal>Características</h2>
              <ul className="check-list" data-reveal>
                {(property.features || []).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            {/* SIDEBAR DE CONVERSIÓN */}
            <aside className="detail__aside">
              <div className="detail__price-card" data-reveal>
                <div className="detail__price-row">
                  <div>
                    <small>Precio de venta</small>
                    <strong>{fmtUF(property.price)}</strong>
                  </div>
                  {clp != null && (
                    <div className="detail__expenses">
                      <small>Valor aproximado (CLP)</small>
                      <span>{fmtCLP(clp)}</span>
                    </div>
                  )}
                  {property.expenses != null && (
                    <div className="detail__expenses">
                      <small>Gastos comunes</small>
                      <span>{formatUF(property.expenses)}</span>
                    </div>
                  )}
                </div>

                <span className={`detail__status detail__status--${status}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>

                {waVisit && (
                  <a href={waVisit} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ width: '100%' }}>
                    Agendar visita por WhatsApp
                  </a>
                )}
              </div>

              <div className="detail__form" data-reveal style={{ '--reveal-delay': '120ms' }}>
                <h3>Solicitar visita o información</h3>
                <LeadForm
                  intent="comprar-inversion"
                  source={`ficha-${property.code}`}
                  property={property.code}
                  submitLabel="Solicitar visita"
                  compact
                />
              </div>
            </aside>
          </div>

          {/* SIMILARES */}
          {similar.length > 0 && (
            <section className="detail__similar">
              <h2 className="section-title" data-reveal>
                Propiedades similares
              </h2>
              <div className="props-grid">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
