// ============================================================================
// PROPIEDADES — CAPA DE DATOS
// ----------------------------------------------------------------------------
// ⚠ PLACEHOLDER: Las 6 propiedades siguientes son DEMO con imágenes de
//    Unsplash y precios de ejemplo. NO corresponden a propiedades reales.
//    Reemplazar por carga desde CMS / API / CRM manteniendo este schema.
//
// SCHEMA:
// {
//   id, code, slug, title,
//   operation: 'venta' | 'arriendo',
//   propertyType: 'departamento' | 'casa' | 'oficina',
//   price: Number (UF), currency: 'UF',
//   expenses: Number|null (gastos comunes UF),
//   commune, neighborhood, city,
//   bedrooms, bathrooms, parking, storage, area (m2 útiles), areaTotal,
//   images: [url], description, features: [string],
//   status: 'disponible' | 'reservada' | 'vendida',
//   featured: Boolean,
//   coords: { lat, lng } | null   // para mapa cuando exista dirección real
// }
// ============================================================================

const IMG = {
  dep1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  dep2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  casa1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  casa2: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  int1: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
  int2: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  int3: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
  int4: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=80',
}

export const properties = [
  // ── [PLACEHOLDER] Propiedad demo 1 ──────────────────────────────────
  {
    id: 'p1',
    code: 'SF-001', // [PLACEHOLDER]
    slug: 'departamento-providencia-parque',
    title: 'Departamento en Providencia',
    operation: 'venta',
    propertyType: 'departamento',
    price: 8500,
    expenses: 1.2,
    commune: 'Providencia',
    neighborhood: 'Barrio Parque',
    city: 'Santiago',
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    storage: true,
    area: 98,
    areaTotal: 112,
    images: [IMG.dep1, IMG.int1, IMG.int2, IMG.int3],
    description:
      '[PLACEHOLDER — Descripción demo] Departamento en edificio contemporáneo con orientación norte, amplio living-comedor integrado y cocina equipada. A pasos de parques, metro y servicios.',
    features: ['Orientación norte', 'Cocina equipada', 'Conserjería 24/7', 'Piscina', 'Quincho'],
    status: 'disponible',
    featured: true,
    coords: null,
  },
  // ── [PLACEHOLDER] Propiedad demo 2 ──────────────────────────────────
  {
    id: 'p2',
    code: 'SF-002',
    slug: 'casa-las-condes-jardin',
    title: 'Casa en Las Condes',
    operation: 'venta',
    propertyType: 'casa',
    price: 15900,
    expenses: null,
    commune: 'Las Condes',
    neighborhood: 'Sector San Damián',
    city: 'Santiago',
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    storage: true,
    area: 233,
    areaTotal: 320,
    images: [IMG.casa1, IMG.int4, IMG.int1, IMG.int2],
    description:
      '[PLACEHOLDER — Descripción demo] Casa familiar de dos pisos con jardín consolidado, estar de estar, pieza y baño de servicio. Excelente conectividad con colegios y comercio.',
    features: ['Jardín', 'Piscina', 'Pieza y baño de servicio', 'Calefacción central'],
    status: 'disponible',
    featured: true,
    coords: null,
  },
  // ── [PLACEHOLDER] Propiedad demo 3 ──────────────────────────────────
  {
    id: 'p3',
    code: 'SF-003',
    slug: 'departamento-nunoa-plaza',
    title: 'Departamento en Ñuñoa',
    operation: 'arriendo',
    propertyType: 'departamento',
    price: 26,
    expenses: 0.9,
    commune: 'Ñuñoa',
    neighborhood: 'Barrio Plaza Ñuñoa',
    city: 'Santiago',
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    storage: false,
    area: 58,
    areaTotal: 62,
    images: [IMG.dep2, IMG.int3, IMG.int1],
    description:
      '[PLACEHOLDER — Descripción demo] Departamento luminoso a pasos de Plaza Ñuñoa, ideal para parejas o profesionales. Cocina integrada, bodega y estacionamiento incluido.',
    features: ['A pasos del metro', 'Amoblado opcional', 'Edificio con gimnasio'],
    status: 'disponible',
    featured: true,
    coords: null,
  },
  // ── [PLACEHOLDER] Propiedad demo 4 ──────────────────────────────────
  {
    id: 'p4',
    code: 'SF-004',
    slug: 'casa-la-reina-quincho',
    title: 'Casa en La Reina',
    operation: 'venta',
    propertyType: 'casa',
    price: 11200,
    expenses: null,
    commune: 'La Reina',
    neighborhood: 'Sector Av. Ossa',
    city: 'Santiago',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    storage: false,
    area: 160,
    areaTotal: 240,
    images: [IMG.casa2, IMG.int2, IMG.int4],
    description:
      '[PLACEHOLDER — Descripción demo] Casa de un piso con quincho y patio, excelente estado. Zona tranquila con buena plusvalía y cerca de corredores gastronómicos.',
    features: ['Quincho', 'Patio consolidado', '1 piso'],
    status: 'disponible',
    featured: false,
    coords: null,
  },
  // ── [PLACEHOLDER] Propiedad demo 5 ──────────────────────────────────
  {
    id: 'p5',
    code: 'SF-005',
    slug: 'departamento-providencia-moderno',
    title: 'Departamento en Providencia',
    operation: 'arriendo',
    propertyType: 'departamento',
    price: 38,
    expenses: 1.1,
    commune: 'Providencia',
    neighborhood: 'Barrio Suecia',
    city: 'Santiago',
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    storage: true,
    area: 82,
    areaTotal: 88,
    images: [IMG.int1, IMG.dep1, IMG.int3],
    description:
      '[PLACEHOLDER — Descripción demo] Departamento moderno en el corazón de Providencia, triple orientación y terminaciones premium. Edificio con amenities completos.',
    features: ['Triple orientación', 'Amenities completos', 'Bodega'],
    status: 'disponible',
    featured: true,
    coords: null,
  },
  // ── [PLACEHOLDER] Propiedad demo 6 ──────────────────────────────────
  {
    id: 'p6',
    code: 'SF-006',
    slug: 'casa-vitacura-clasica',
    title: 'Casa en Vitacura',
    operation: 'venta',
    propertyType: 'casa',
    price: 21500,
    expenses: null,
    commune: 'Vitacura',
    neighborhood: 'Av. Kennedy Poniente',
    city: 'Santiago',
    bedrooms: 5,
    bathrooms: 4,
    parking: 3,
    storage: true,
    area: 320,
    areaTotal: 480,
    images: [IMG.int4, IMG.casa1, IMG.casa2],
    description:
      '[PLACEHOLDER — Descripción demo] Casa clásica de gran superficie, ideal para familias grandes o inversión patrimonial. Jardín maduro y espacios generosos.',
    features: ['Jardín maduro', 'Sala de estar', 'Piezas de servicio'],
    status: 'disponible',
    featured: false,
    coords: null,
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
