import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="props-page">
      <div className="container props-empty">
        <h1>Página no encontrada</h1>
        <p>El enlace que seguiste no existe o cambió de dirección.</p>
        <Link to="/" className="btn btn--primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
