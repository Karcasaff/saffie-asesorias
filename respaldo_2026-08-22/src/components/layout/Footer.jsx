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
              <li><Link to="/propiedades?operacion=venta">Comprar</Link></li>
              <li><Link to="/arrendar">Arrendar</Link></li>
              <li><Link to="/vender">Vender</Link></li>
              <li><Link to="/administracion">Administración</Link></li>
              <li><Link to="/inversion">Inversión</Link></li>
              <li><Link to="/subsidios">Subsidios</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Nosotros</h3>
            <ul className="footer__list">
              <li><Link to="/nosotros">Quiénes somos</Link></li>
              <li><Link to="/nosotros#insights">Insights inmobiliarios</Link></li>
              <li><Link to="/portal">Portal del cliente</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Contacto</h3>
            <ul className="footer__list">
              <li>{site.contact.email} {/* [PLACEHOLDER] */}</li>
              <li>{site.contact.phone} {/* [PLACEHOLDER] */}</li>
              <li>{site.contact.coverage}</li>
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
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
