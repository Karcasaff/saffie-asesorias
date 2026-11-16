import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPropertyTypes, getComunas } from '../../data/properties.js'

// Hero principal + buscador de bienes repo premium.
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
              Bienes Reposeidos Bancarios
            </span>

            <h1 className="home-hero__title" data-reveal style={{ '--reveal-delay': '100ms' }}>
              Oportunidades de Compra Directa Bancaria
            </h1>

            <div className="hero__rule" data-reveal style={{ '--reveal-delay': '200ms' }} />

            <p className="hero__subtitle" data-reveal style={{ '--reveal-delay': '250ms' }}>
              Inventario actual de propiedades liberadas de gravámenes. Compra sin subasta, precio UF transparente.
            </p>

            <div className="hero__actions" data-reveal style={{ '--reveal-delay': '350ms' }}>
              <a href="/propiedades" className="btn btn--primary">
                Ver Fichas de Bienes Reposeidos
              </a>
              <a href="/legal" className="link-line">
                Asesoría Crédito Hipotecario
              </a>
            </div>
          </div>

          <figure className="home-hero__media" data-reveal style={{ '--reveal-delay': '200ms', margin: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt="Propiedad bancaria disponible para compra"
              fetchpriority="high"
            />
          </figure>
        </div>

        {/* BUSCADOR — Solo Comprar */}
        <form
          id="buscador"
          className="search-band"
          onSubmit={submit}
          aria-label="Buscador de propiedades repo"
          data-reveal
          style={{ '--reveal-delay': '420ms' }}
        >
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

        {/* CIFRAS HERO — Métricas repo */}
        <div className="hero__meta" data-reveal style={{ '--reveal-delay': '500ms' }}>
          <div className="hero__stat">
            <b>100%</b>
            <span>Libres de gravámenes</span>
          </div>
          <div className="hero__stat">
            <b>Precio UF</b>
            <span>Transparente y directo</span>
          </div>
          <div className="hero__stat">
            <b>Compra Directa</b>
            <span>Sin subastas bancarias</span>
          </div>
          <div className="hero__stat">
            <b>Asesoría Hipotecaria</b>
            <span>Disponible para todas las propiedades</span>
          </div>
        </div>
      </div>
    </section>
  )
}