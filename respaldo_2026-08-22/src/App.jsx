import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import WhatsAppFloat from './components/ui/WhatsAppFloat.jsx'

import Home from './pages/Home.jsx'
import Propiedades from './pages/Propiedades.jsx'
import PropiedadDetalle from './pages/PropiedadDetalle.jsx'
import Vender from './pages/Vender.jsx'
import Arrendar from './pages/Arrendar.jsx'
import Administracion from './pages/Administracion.jsx'
import Inversion from './pages/Inversion.jsx'
import Subsidios from './pages/Subsidios.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Portal from './pages/Portal.jsx'
import NotFound from './pages/NotFound.jsx'

// Restaura el scroll y re-observa los elementos con animación de revelado.
function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
    )

    document
      .querySelectorAll('[data-reveal]:not(.is-visible)')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedades/:slug" element={<PropiedadDetalle />} />
          <Route path="/vender" element={<Vender />} />
          <Route path="/arrendar" element={<Arrendar />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/inversion" element={<Inversion />} />
          <Route path="/subsidios" element={<Subsidios />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
