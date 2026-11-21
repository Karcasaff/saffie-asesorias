import React, { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { properties, getComunas, getPropertyTypes } from '../data/properties.js'
import PropertyCard from '../components/ui/PropertyCard.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { whatsappLink } from '../utils/whatsapp.js'
import { whatsappDefaultMessage } from '../data/site.js'

// Página /propiedades — Buscador enfocado exclusivamente en Bienes Reposeídos
export default function Propiedades() {
  const [params, setParams] = useSearchParams()
  const [view, setView] = useState('grid')
  const [sort, setSort] = useState('recientes')
  const [code, setCode] = useState('')

  const f = {
    tipo: params.get('tipo') || '',
    comuna: params.get('comuna') || '',
    dormitorios: params.get('dormitorios') || '',
    precioMin: params.get('precioMin') || '',
    precioMax: params.get('precioMax') || '',
  }

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    let list = [...properties]

    if (f.tipo) list = list.filter((p) => p.propertyType === f.tipo)
    if (f.comuna) list = list.filter((p) => p.commune === f.comuna)
    if (f.dormitorios) list = list.filter((p) => p.bedrooms >= Number(f.dormitorios))
    if (f.precioMin) list = list.filter((p) => p.price >= Number(f.precioMin))
    if (f.precioMax) list = list.filter((p) => p.price <= Number(f.precioMax))
    if (code.trim()) {
      const c = code.trim().toLowerCase()
      list = list.filter(
        (p) => p.code.toLowerCase().includes(c) || p.slug.includes(c)
      )
    }

    switch (sort) {
      case 'precio-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'precio-desc':
        list.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    return list
  }, [params, sort, code])

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Bienes Reposeídos', href: '/propiedades' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Catálogo Oficial"
        title="Bienes Reposeídos y Recuperados"
        lead="Inventario actualizado de propiedades bancarias e hipotecarias disponibles. Compra directa con precio en UF y pesos chilenos."
        crumbs={crumbs}
      />

      <section className="props-page">
        <div className="container">
          {/* SECCIÓN HERO */}
          <section
            className="props-hero"
            style={{
              position: 'relative',
              padding: '4rem 2rem',
              borderRadius: '20px',
              marginBottom: '2.5rem',
              overflow: 'hidden',
              color: '#fff',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-7ad49c7330d5?auto=format&fit=crop&w=1920&q=80"
              alt="Bienes Reposeídos"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                filter: 'brightness(0.55) contrast(1.1)',
              }}
              aria-hidden="true"
            />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
              <span className="eyebrow" style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                Prosaffie · Bienes Reposeídos Bancarios en Chile
              </span>
              <h2 style={{ fontSize: '2.2rem', lineHeight: 1.25, marginBottom: '1rem', marginTop: 0, fontWeight: 600 }}>
                Compra directa de bienes reposeídos y recuperados
              </h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.95, maxWidth: '60ch', marginBottom: '1.5rem' }}>
                Inventario bancario actualizado con precios en UF y pesos chilenos calculados al día (UF $41.371).
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="/listado" className="btn btn--outline" style={{ borderColor: '#fff', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '0.9rem 1.5rem', fontSize: '1rem', borderRadius: '8px' }}>
                  Ver Catálogo de Propiedades
                </a>
                <a
                  href={whatsappLink(whatsappDefaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#fff', padding: '0.9rem 1.5rem', fontSize: '1rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  💬 Contactar Asesor
                </a>
              </div>
            </div>
          </section>

          {/* BARRA DE CONTACTO RÁPIDO */}
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', border: '1px solid #e2e8f0' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#0f172a' }}>¿Necesitas asesoría inmediata sobre una propiedad?</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>Te ayudamos con la revisión de antecedentes, tasación y oferta.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={whatsappLink(whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#fff' }}>
                Contactar Asesor
              </a>
              <Link to="/listado" className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center' }}>
                Descargar Excel Consolidado
              </Link>
            </div>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="filters" role="search" aria-label="Filtros de búsqueda">
            <div className="filters__row">
              <label className="field field--inline">
                <span>Código / Dirección</span>
                <input
                  type="text"
                  placeholder="Ej: SF-001 o Maitenes"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </label>
            </div>

            <div className="filters__row filters__row--fields">
              <label className="field field--inline">
                <span>Tipo</span>
                <select value={f.tipo} onChange={(e) => setFilter('tipo', e.target.value)}>
                  <option value="">Todos</option>
                  {getPropertyTypes().map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field field--inline">
                <span>Comuna</span>
                <select value={f.comuna} onChange={(e) => setFilter('comuna', e.target.value)}>
                  <option value="">Todas</option>
                  {getComunas().map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field field--inline">
                <span>Dorm.</span>
                <select
                  value={f.dormitorios}
                  onChange={(e) => setFilter('dormitorios', e.target.value)}
                >
                  <option value="">Todos</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}+
                    </option>
                  ))}
                </select>
              </label>

              <label className="field field--inline">
                <span>Precio mín. (UF)</span>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={f.precioMin}
                  onChange={(e) => setFilter('precioMin', e.target.value)}
                />
              </label>

              <label className="field field--inline">
                <span>Precio máx. (UF)</span>
                <input
                  type="number"
                  min="0"
                  placeholder="∞"
                  value={f.precioMax}
                  onChange={(e) => setFilter('precioMax', e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* RESULTADOS */}
          <div className="props-results__bar">
            <p className="props-results__count">
              {results.length}{' '}
              {results.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
              {code.trim() && ` para "${code.trim()}"`}
            </p>

            <div className="props-results__controls">
              <label className="field field--inline">
                <span>Ordenar</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="recientes">Más recientes</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                </select>
              </label>

              <div className="views-toggle" role="group" aria-label="Vista">
                <button
                  type="button"
                  className={`views-toggle__btn ${view === 'grid' ? 'is-active' : ''}`}
                  onClick={() => setView('grid')}
                  aria-label="Vista grilla"
                >
                  ▦
                </button>
                <button
                  type="button"
                  className={`views-toggle__btn ${view === 'list' ? 'is-active' : ''}`}
                  onClick={() => setView('list')}
                  aria-label="Vista lista"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {results.length > 0 ? (
            <div className={`props-grid ${view === 'list' ? 'props-grid--list' : ''}`}>
              {results.map((p) => (
                <PropertyCard key={p.id} property={p} view={view} />
              ))}
            </div>
          ) : (
            <div className="props-empty">
              <h3>Sin resultados para esta búsqueda</h3>
              <p>Ajusta los filtros o escríbenos directamente para revisar oportunidades fuera del catálogo web.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}