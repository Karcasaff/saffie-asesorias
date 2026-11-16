import React, { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { properties, getComunas, getPropertyTypes } from '../data/properties.js'
import PropertyCard from '../components/ui/PropertyCard.jsx'
import PageHero from '../components/ui/PageHero.jsx'

// Página /propiedades — buscador inmobiliario con filtros, orden y vistas.
export default function Propiedades() {
  const [params, setParams] = useSearchParams()
  const [view, setView] = useState('grid')
  const [sort, setSort] = useState('recientes')
  const [code, setCode] = useState('')

  const f = {
    operacion: 'venta', // Hardcoded - solo venta
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

    // Solo propiedades en venta (todas lo son ahora)
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
    { label: 'Propiedades', href: '/propiedades' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Portafolio de Inversión"
        title="Propiedades para Inversionistas"
        lead="Selección curada con métricas de rentabilidad verificadas. Usa los filtros para encontrar la oportunidad correcta."
        crumbs={crumbs}
      />

      <section className="props-page">
        <div className="container">
          {/* BARRA DE FILTROS */}
          <div className="filters" role="search" aria-label="Filtros de búsqueda">
            <div className="filters__row">
              <label className="field field--inline">
                <span>Código</span>
                <input
                  type="text"
                  placeholder="Ej: SF-001"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </label>

              <Link to="/legal" className="btn btn--outline filters__legal-link" style={{ alignSelf: 'end' }}>
                Solicitar Redacción Legal / Promesa
              </Link>
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
              <p>Ajusta los filtros o escríbenos: buscamos propiedades fuera del portafolio publicado.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}