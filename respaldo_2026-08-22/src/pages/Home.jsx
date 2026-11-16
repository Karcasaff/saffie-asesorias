import React from 'react'
import { useSEO, realEstateAgentSchema } from '../hooks/useSEO.js'
import HeroHome from '../components/home/HeroHome.jsx'
import FeaturedProperties from '../components/home/FeaturedProperties.jsx'
import ServicesSection from '../components/home/ServicesSection.jsx'
import DifferentialSection from '../components/home/DifferentialSection.jsx'
import OwnersSection from '../components/home/OwnersSection.jsx'
import AdminSection from '../components/home/AdminSection.jsx'
import InvestorsSection from '../components/home/InvestorsSection.jsx'
import TechSection from '../components/home/TechSection.jsx'
import InsightsSection from '../components/home/InsightsSection.jsx'
import CTASection from '../components/ui/CTASection.jsx'

export default function Home() {
  useSEO({
    title: null,
    description:
      'Firma inmobiliaria boutique en Santiago: corretaje, administración de arriendos, inversión y subsidios habitacionales. Asesoría experta potenciada por tecnología.',
    path: '/',
    jsonLd: realEstateAgentSchema(),
  })

  return (
    <>
      <HeroHome />
      <FeaturedProperties />
      <ServicesSection />
      <DifferentialSection />
      <OwnersSection />
      <InvestorsSection />
      <AdminSection />
      <TechSection />
      <InsightsSection />
      <CTASection
        title="Conversemos sobre tu próximo movimiento inmobiliario."
        subtitle="Asesoría clara, datos de mercado y acompañamiento de principio a fin."
        primary={{ label: 'Hablar con un asesor', to: '/contacto' }}
        secondary={{ label: 'Ver propiedades', to: '/propiedades' }}
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80"
      />
    </>
  )
}
