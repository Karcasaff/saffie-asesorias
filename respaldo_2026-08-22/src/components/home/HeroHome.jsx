import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPropertyTypes, getComunas } from '../../data/properties.js'

// Hero principal + buscador inmobiliario premium.
export default function HeroHome() {
  const navigate = useNavigate()
  const [q, setQ] = useState({
    operacion: 'venta',
    tipo: '',
    comuna: '',
    dormitorios: '',
  })

  const submit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set('operacion', q.operacion)
    if (q.tipo) params.set('tipo', q.tipo)
    if (q.comuna) params.set('comuna', q.comuna)
    if (q.dormitorios) params.set('dormitorios', q.dormitorios)
    navigate(`/propiedades?${params.toString()}`)
  }

  return (
    <section className="home-hero" id="inicio">
      <div className="container">
        <div className="home-hero__grid">
          <div>
            <span className="eyebrow" data-reveal>
              Saffie — Asesoría & Gestión Inmobiliaria
            </span>

            <h1 className="home-hero__title" data-reveal style={{ '--reveal-delay': '100ms' }}>
              Tu propiedad merece una <em>gestión inteligente</em>.
            </h1>

            <div className="hero__rule" data-reveal style={{ '--reveal-delay': '200ms' }} />

            <p className="hero__subtitle" data-reveal style={{ '--reveal-delay': '250ms' }}>
              Corretaje, administración e inversión inmobiliaria en Santiago.
              Asesoría humana experta, potenciada por tecnología y datos de mercado.
            </p>

            <div className="hero__actions" data-reveal style={{ '--reveal-delay': '350ms' }}>
              <a href="#buscador" className="btn btn--primary">
                Buscar propiedades
              </a>
              <a href="#propietarios" className="link-line">
                Quiero vender o arrendar
              </a>
            </div>
          </div>

          <figure className="home-hero__media" data-reveal style={{ '--reveal-delay': '200ms', margin: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt="Propiedad residencial de arquitectura contemporánea en Santiago"
              fetchpriority="high"
            />
          </figure>
        </div>

        {/* BUSCADOR */}
        <form
          id="buscador"
          className="search-band"
          onSubmit={submit}
          aria-label="Buscador de propiedades"
          data-reveal
          style={{ '--reveal-delay': '420ms' }}
        >
          <div className="search-band__tabs" role="tablist" aria-label="Operación">
            {['venta', 'arriendo'].map((op) => (
              <button
                key={op}
                type="button"
                role="tab"
                aria-selected={q.operacion === op}
                className={`search-band__tab ${q.operacion === op ? 'is-active' : ''}`}
                onClick={() => setQ({ ...q, operacion: op })}
              >
                {op === 'venta' ? 'Comprar' : 'Arrendar'}
              </button>
            ))}
          </div>

          <div className="search-band__fields">
            <label className="field">
              <span>Ubicación</span>
              <select value={q.comuna} onChange={(e) => setQ({ ...q, comuna: e.target.value })}>
                <option value="">Todas las comunas</option>
                {getComunas().map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Tipo</span>
              <select value={q.tipo} onChange={(e) => setQ({ ...q, tipo: e.target.value })}>
                <option value="">Todos</option>
                {getPropertyTypes().map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Dormitorios</span>
              <select
                value={q.dormitorios}
                onChange={(e) => setQ({ ...q, dormitorios: e.target.value })}
              >
                <option value="">Todos</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className="btn btn--primary search-band__submit">
              Buscar propiedades
            </button>
          </div>
        </form>

        {/* CIFRAS — [PLACEHOLDER] reemplazar con datos verificados */}
        <div className="hero__meta" data-reveal style={{ '--reveal-delay': '500ms' }}>
          <div className="hero__stat">
            <b>Venta</b>
            <span>y arriendo de propiedades</span>
          </div>
          <div className="hero__stat">
            <b>Integral</b>
            <span>administración de arriendos</span>
          </div>
          <div className="hero__stat">
            <b>Datos</b>
            <span>análisis de mercado real</span>
          </div>
          <div className="hero__stat">
            <b>1:1</b>
            <span>asesoría personalizada</span>
          </div>
        </div>
      </div>
    </section>
  )
}
