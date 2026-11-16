// ============================================================================
// PROPIEDADES — CAPA DE DATOS (PORTAFOLIO REAL SAFFIE)
// ----------------------------------------------------------------------------
// Datos extraídos de cartera propia: BIENES RECUPERADOS CLIENTES
// Precios en UF (1 UF ≈ 38,000 CLP aprox.)
// ============================================================================

const IMG = {
  dep1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  dep2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  dep3: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
  dep4: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  dep5: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
  casa1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  casa2: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  casa3: 'https://images.unsplash.com/photo-1600566752347-1b3e7b3e3b3e?auto=format&fit=crop&w=1200&q=80',
  terreno1: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  oficina1: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
}

const CLP_TO_UF = 38000

function clpToUf(clp) {
  return Math.round(clp / CLP_TO_UF)
}

function estimateRent(priceUf, propertyType, commune) {
  // Cap rate estimado por zona y tipo
  const capRates = {
    'Estación Central': 0.075,
    'La Florida': 0.068,
    'Huechuraba': 0.065,
    'Quinta Normal': 0.072,
    'San Felipe': 0.080,
    'Temuco': 0.085,
    'Puchuncaví': 0.060,
    'Curauma': 0.055,
  }
  const baseRate = capRates[commune] || 0.07
  const typeMultiplier = propertyType === 'departamento' ? 1.0 : propertyType === 'casa' ? 0.9 : 0.85
  const annualRent = priceUf * baseRate * typeMultiplier
  return Math.round(annualRent / 12)
}

function estimateCapRate(priceUf, projectedRent, expenses = 0) {
  const annualRent = projectedRent * 12
  const noi = annualRent - (expenses * 12)
  return Math.round((noi / priceUf) * 100) / 10
}

export const properties = [
  // ── MOCK: Propiedades Reposeidos Bancarios ───────────────────────────────
  // Datos de ejemplo con formato repo. Todos libres de gravámenes.
  // Cuando lleguen los datos reales del Excel, reemplazar este array manteniendo
  // la estructura de campos añadidos: foreclosureStatus, bankOrigin, condition, etc.

  // ── 1. DPTO Santiago Centro - BancoEstado ────────────────────────────────
  {
    id: 'repo1',
    code: 'SF-REPO-01',
    slug: 'departamento-embargado-santiago-centro',
    title: 'Departamento - BancoEstado Santiago Centro',
    operation: 'venta',
    propertyType: 'departamento',
    price: clpToUf(35000000),
    expenses: 0.5,
    commune: 'Centro',
    neighborhood: 'Santiago Centro',
    city: 'Santiago',
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    storage: false,
    area: 55,
    areaTotal: 65,
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'],
    description: 'Departamento en zona céntrica, antigua intervención bancaria. Ideal para inversión o vivienda propia.',
    features: ['Zona céntrica', 'Luz y agua al día', 'Estacionamiento'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.44, lng: -70.65 },
    // NUEVOS CAMPOS REPO (obligatorios):
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 7.5,
    projectedRent: 300,
    investmentStatus: null,
  },

  // ── 2. DPTO La Florida - BancoChile ──────────────────────────────────────
  {
    id: 'repo2',
    code: 'SF-REPO-02',
    slug: 'casa-alicahue-la-florida-repo',
    title: 'Casa - BancoChile La Florida',
    operation: 'venta',
    propertyType: 'casa',
    price: clpToUf(180000000),
    expenses: null,
    commune: 'La Florida',
    neighborhood: 'Alicahue',
    city: 'Santiago',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    storage: true,
    area: 150,
    areaTotal: 250,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    description: 'Casa de 3 dormitorios en condominio consolidado. Entrega inmediata. Espacio ideal para familia o inversión.',
    features: ['3 dormitorios', 'Piscina', 'Jardín', '2 estacionamientos'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.52, lng: -70.59 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 6.8,
    projectedRent: 450,
    investmentStatus: null,
  },

  // ── 3. Terreno Parque Arauco - Bice ──────────────────────────────────────
  {
    id: 'repo3',
    code: 'SF-REPO-03',
    slug: 'terreno-parque-arauco-repo',
    title: 'Terreno - Bice Parque Arauco',
    operation: 'venta',
    propertyType: 'terreno',
    price: clpToUf(80000000),
    expenses: null,
    commune: 'Las Condes',
    neighborhood: 'Parque Arauco',
    city: 'Santiago',
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    storage: false,
    area: 500,
    areaTotal: 5000,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
    description: 'Terreno de 5.000 m² en zona de alta plusvalía. Factibilidad de servicios al día. Oportunidad de desarrollo residencial o comercial.',
    features: ['5.000 m²', 'Luz y agua al día', 'Vista a la ciudad'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.42, lng: -70.60 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 0,
    projectedRent: 0,
    investmentStatus: null,
  },

  // ── 4. DPTO Estación Central - Santander ─────────────────────────────────
  {
    id: 'repo4',
    code: 'SF-REPO-04',
    slug: 'departamento-ec-santander',
    title: 'Departamento - Santander Estación Central',
    operation: 'venta',
    propertyType: 'departamento',
    price: clpToUf(42000000),
    expenses: 0.8,
    commune: 'Estación Central',
    neighborhood: 'Centro',
    city: 'Santiago',
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    storage: false,
    area: 48,
    areaTotal: 55,
    images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'],
    description: 'Departamento 2 dormitorios en edificio consolidado. Buena ubicación y conectividad.',
    features: ['2 dormitorios', 'Metro cercano', 'Gastos comunes razonables'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.45, lng: -70.68 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 7.2,
    projectedRent: 280,
    investmentStatus: null,
  },

  // ── 5. Casa Vitacura - BBVA ──────────────────────────────────────────────
  {
    id: 'repo5',
    code: 'SF-REPO-05',
    slug: 'casa-vitacura-bbva',
    title: 'Casa - BBVA Vitacura',
    operation: 'venta',
    propertyType: 'casa',
    price: clpToUf(250000000),
    expenses: 1.0,
    commune: 'Vitacura',
    neighborhood: 'Mansión',
    city: 'Santiago',
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    storage: true,
    area: 200,
    areaTotal: 350,
    images: ['https://images.unsplash.com/photo-1600566752347-1b3e7b3e3b3e?auto=format&fit=crop&w=1200&q=80'],
    description: 'Casa de 4 dormitorios en sector de alta plusvalía. Propiedad lista para escriturar.',
    features: ['4 dormitorios', 'Piscina', 'Gimnasio', '3 estacionamientos'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.41, lng: -70.62 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 6.5,
    projectedRent: 500,
    investmentStatus: null,
  },

  // ── 6. DPTO Quinta Normal - Scotiabank ──────────────────────────────────
  {
    id: 'repo6',
    code: 'SF-REPO-06',
    slug: 'departamento-quinta-normal-scotiabank',
    title: 'Departamento - Scotiabank Quinta Normal',
    operation: 'venta',
    propertyType: 'departamento',
    price: clpToUf(95000000),
    expenses: 1.1,
    commune: 'Quinta Normal',
    neighborhood: 'Catedral',
    city: 'Santiago',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    storage: true,
    area: 62,
    areaTotal: 70,
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
    description: 'Departamento 2D/2B en sector universitario. Alta demanda de arriendo estudiantil y profesional.',
    features: ['2D/2B', 'Metro Lourdes', 'Gimnasio', 'Bodega'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.44, lng: -70.68 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 7.0,
    projectedRent: 350,
    investmentStatus: null,
  },

  // ── 7. Terreno Pullach - Otro Banco ───────────────────────────────────────
  {
    id: 'repo7',
    code: 'SF-REPO-07',
    slug: 'terreno-pullach-repo',
    title: 'Terreno - Otro Banco Pullach',
    operation: 'venta',
    propertyType: 'terreno',
    price: clpToUf(150000000),
    expenses: null,
    commune: 'Las Condes',
    neighborhood: 'Vía Apoquindo',
    city: 'Santiago',
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    storage: false,
    area: 800,
    areaTotal: 8000,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
    description: 'Terreno rústico de 8.000 m² en zona de crecimiento urbano. Proyecto de parcelación en estudio.',
    features: ['8.000 m²', 'Proyecto parcelación', 'Vista al valle'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.35, lng: -70.55 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 0,
    projectedRent: 0,
    investmentStatus: null,
  },

  // ── 8. DPDO La Reina - BancoEstado 2──────────────────────────────────────
  {
    id: 'repo8',
    code: 'SF-REPO-08',
    slug: 'departamento-la-reina',
    title: 'Departamento - BancoEstado La Reina',
    operation: 'venta',
    propertyType: 'departamento',
    price: clpToUf(75000000),
    expenses: 0.9,
    commune: 'La Reina',
    neighborhood: 'Virgen María',
    city: 'Santiago',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    storage: true,
    area: 65,
    areaTotal: 75,
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'],
    description: 'Departamento 2D/2B en sector residencial de alta gama. Entrega rápida.',
    features: ['2D/2B', 'Seguridad 24/7', 'Quincho'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.43, lng: -70.58 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 6.8,
    projectedRent: 380,
    investmentStatus: null,
  },

  // ── 9. Casa Puente Alto - Banco de Chile 2 ───────────────────────────────
  {
    id: 'repo9',
    code: 'SF-REPO-09',
    slug: 'casa-puente-alto',
    title: 'Casa - Banco de Chile Puente Alto',
    operation: 'venta',
    propertyType: 'casa',
    price: clpToUf(120000000),
    expenses: null,
    commune: 'Puente Alto',
    neighborhood: 'Centro',
    city: 'Santiago',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    storage: true,
    area: 180,
    areaTotal: 280,
    images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'],
    description: 'Casa de 3 dormitorios en comuna suburbanana. Buena para inversión o vivienda propia.',
    features: ['3 dormitorios', 'Terreno 200 m²', '2 estacionamientos'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.58, lng: -70.70 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 7.0,
    projectedRent: 420,
    investmentStatus: null,
  },

  // ── 10. DPTO Cerro Navia - Banco Popular ─────────────────────────────────
  {
    id: 'repo10',
    code: 'SF-REPO-10',
    slug: 'departamento-cerro-navia',
    title: 'Departamento - Banco Popular Cerro Navia',
    operation: 'venta',
    propertyType: 'departamento',
    price: clpToUf(22000000),
    expenses: 0.6,
    commune: 'Cerro Navia',
    neighborhood: 'Villa Cerro',
    city: 'Santiago',
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    storage: false,
    area: 35,
    areaTotal: 42,
    images: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80'],
    description: 'Departamento 1 dormitorio en sector accesible. Precio de entrada para inversión.',
    features: ['1 dormitorio', 'Precio accesible', 'Estacionamiento'],
    status: 'disponible',
    featured: true,
    coords: { lat: -33.49, lng: -70.67 },
    foreclosureStatus: 'libre_gravamen',
    bankOrigin: null,
    condition: 'usada',
    auctionDate: null,
    minimumBid: null,
    capRate: 8.0,
    projectedRent: 200,
    investmentStatus: null,
  },
]

// Utilidades de consulta sobre la capa de datos -----------------------------

export const getFeatured = () => properties.filter((p) => p.featured)

export const getBySlug = (slug) => properties.find((p) => p.slug === slug)

export const getSimilar = (property) =>
  properties.filter(
    (p) => p.id !== property.id && p.operation === property.operation
  ).slice(0, 3)

export const getComunas = () => [...new Set(properties.map((p) => p.commune))].sort()

export const getPropertyTypes = () => [...new Set(properties.map((p) => p.propertyType))]

// Helpers para inversión
export const formatInvestmentStatus = (status) => {
  const labels = {
    'con-arrendatario': 'Con arrendatario',
    'en-verde': 'En verde',
    'en-blanco': 'En blanco',
  }
  return labels[status] || status
}

export const getInvestmentBadgeClass = (status) => {
  const classes = {
    'con-arrendatario': 'invest-badge--con-arrendatario',
    'en-verde': 'invest-badge--en-verde',
    'en-blanco': 'invest-badge--en-blanco',
  }
  return classes[status] || 'invest-badge--default'
}