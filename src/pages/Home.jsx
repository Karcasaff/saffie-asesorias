import React from 'react'
import { useSEO, realEstateAgentSchema } from '../hooks/useSEO.js'
import HeroHome from '../components/home/HeroHome.jsx'
import FeaturedProperties from '../components/home/FeaturedProperties.jsx'
import ServicesSection from '../components/home/ServicesSection.jsx'
import DifferentialSection from '../components/home/DifferentialSection.jsx'
import OwnersSection from '../components/home/OwnersSection.jsx'
import InvestorsSection from '../components/home/InvestorsSection.jsx'
import TechSection from '../components/home/TechSection.jsx'
import InsightsSection from '../components/home/InsightsSection.jsx'
import CTASection from '../components/ui/CTASection.jsx'

export default function Home() {
  useSEO({
    title: 'Bienes Reposeidos en Chile | Compra Directa Bancaria | Saffie',
    description:
      'Inventario de bienes reposseidos bancarios libres de gravámenes. Compra directa, precio UF transparente, asesoría hipotecaria incluida.',
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
      <TechSection />
      <InsightsSection />
      <CTASection
        title="Conversemos sobre tu próxima inversión o vivienda propia."
        subtitle="Analizamos las oportunidades de bienes repo disponibles y te asesoramos sobre financiamiento bancario."
        primary={{ label: 'Ver Fichas de Bienes Reposeidos', to: '/propiedades' }}
        secondary={{ label: 'Solicitar Asesoría Crédito', to: '/legal' }}
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80"
      />
    </>
  )
}