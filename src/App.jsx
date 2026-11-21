import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import WhatsAppFloat from './components/ui/WhatsAppFloat.jsx'
import { trackEvent } from './utils/analytics.js'

import Propiedades from './pages/Propiedades.jsx'
import PropiedadDetalle from './pages/PropiedadDetalle.jsx'
import Listado from './pages/Listado.jsx'
import NotFound from './pages/NotFound.jsx'

function PageTracker() {
  const { pathname } = useLocation()
  useEffect(() => {
    trackEvent('page_view', { page_name: pathname })
  }, [pathname])
  return null
}

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
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
          <Route path="/" element={<Propiedades />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedades/:slug" element={<PropiedadDetalle />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}