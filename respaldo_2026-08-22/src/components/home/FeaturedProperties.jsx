import React from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../ui/PropertyCard.jsx'
import { getFeatured } from '../../data/properties.js'

export default function FeaturedProperties() {
  const featured = getFeatured()

  return (
    <section className="featured-props" id="destacadas">
      <div className="container">
        <div className="featured-props__head" data-reveal>
          <div>
            <span className="eyebrow">Propiedades destacadas</span>
            <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
              Selección actual del portafolio.
            </h2>
          </div>
          <Link to="/propiedades" className="link-line" style={{ justifySelf: 'end' }}>
            Ver todas las propiedades
          </Link>
        </div>

        <div className="props-grid">
          {featured.map((p, i) => (
            <div key={p.id} data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
