import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '../../data/site.js'
import Logo from '../ui/Logo.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`header ${scrolled || open ? 'header--scrolled' : ''}`}
      aria-label="Header principal"
    >
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label="Saffie — Inicio" onClick={close}>
          <Logo variant="blue" size="md" />
        </Link>

        <nav
          className={`header__nav ${open ? 'header__nav--open' : ''}`}
          aria-label="Navegación principal"
        >
          {site.navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : ''}`
              }
              onClick={close}
            >
              {item.label}
            </NavLink>
          ))}

          <Link to="/inversion" className="btn btn--outline header__cta" onClick={close}>
            Quiero hablar con un asesor
          </Link>
        </nav>

        <button
          className="header__toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
