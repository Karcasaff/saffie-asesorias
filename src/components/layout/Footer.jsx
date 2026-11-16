import React from 'react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site.js'
import Logo from '../ui/Logo.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="header__brand" aria-label="Saffie — Inicio">
              <Logo variant="light" size="md" />
            </Link>
            <p className="footer__desc">{site.description}</p>
          </div>

          <div>
            <h3 className="footer__heading">Servicios</h3>
            <ul className="footer__list">
              <li><Link to="/propiedades">Comprar / Invertir</Link></li>
              <li><Link to="/inversion">Asesoría de Inversión</Link></li>
              <li><Link to="/legal">Legal & Documentos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Empresa</h3>
            <ul className="footer__list">
              <li><Link to="/nosotros">Quiénes somos</Link></li>
              <li><Link to="/nosotros#insights">Insights inmobiliarios</Link></li>
              <li><Link to="/portal">Portal del cliente</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            © {year} {site.legalName}. Todos los derechos reservados.
          </span>

          <div className="footer__legal">
            <a href="#" onClick={(e) => e.preventDefault()} title="Disponible próximamente">
              Política de privacidad
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} title="Disponible próximamente">
              Términos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}