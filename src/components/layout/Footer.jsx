import React from 'react'
import { Link } from 'react-router-dom'
import { site, whatsappDefaultMessage } from '../../data/site.js'
import { whatsappLink } from '../../utils/whatsapp.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div className="footer__brand">
            <Link to="/" className="header__brand" aria-label="Prosaffie — Inicio">
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Prosaffie</span>
            </Link>
            <p className="footer__desc">{site.description}</p>
          </div>

          <div>
            <h3 className="footer__heading">Navegación</h3>
            <ul className="footer__list">
              <li><Link to="/propiedades">Bienes Reposeídos</Link></li>
              <li><Link to="/listado">Descargar Listado Excel</Link></li>
              <li><a href={whatsappLink(whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer">Contacto WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            © {year} Prosaffie. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}