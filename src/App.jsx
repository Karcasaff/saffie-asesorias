import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import WhatsAppFloat from './components/ui/WhatsAppFloat.jsx'
import { trackEvent } from './utils/analytics.js'

import Home from './pages/Home.jsx'
import Propiedades from './pages/Propiedades.jsx'
import PropiedadDetalle from './pages/PropiedadDetalle.jsx'
import Inversion from './pages/Inversion.jsx'
import Legal from './pages/Legal.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Portal from './pages/Portal.jsx'
import Listado from './pages/Listado.jsx'
import NotFound from './pages/NotFound.jsx'

// Track page views on route change
function PageTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    trackEvent('page_view', { page_name: pathname })
  }, [pathname])

  return null
}

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
      <PageTracker />
      <RouteEffects />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedades/:slug" element={<PropiedadDetalle />} />
          <Route path="/inversion" element={<Inversion />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}