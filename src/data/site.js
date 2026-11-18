// ============================================================================
// SAFFIE — CONFIGURACIÓN CENTRAL DEL SITIO
// ----------------------------------------------------------------------------
// PLACEHOLDERS MARCADOS con [PLACEHOLDER]: reemplazar con datos reales.
// Variables de entorno (archivo .env):
//   VITE_SITE_URL          URL canónica del sitio
//   VITE_WHATSAPP_NUMBER   Número WhatsApp formato internacional sin "+"
//   VITE_LEAD_WEBHOOK_URL  Webhook n8n / CRM para recibir leads
// ============================================================================

export const site = {
  name: 'Saffie',
  legalName: 'Saffie Asesoría & Gestión Inmobiliaria SpA',
  tagline: 'Bienes Reposeidos Bancarios',
  description:
    'Inventario de bienes reposseidos bancarios libres de gravámenes. Compra directa, precio UF transparente, asesoría hipotecaria incluida.',
  // [PLACEHOLDER] URL canónica — reemplazar al comprar dominio propio
  url: import.meta.env.VITE_SITE_URL || 'https://saffie-propiedades.vercel.app',

  // [PLACEHOLDER] Datos de contacto oficiales pendientes
  contact: {
    email: 'contacto@saffieasesorias.cl', // [PLACEHOLDER]
    phone: '+56 9 0000 0000', // [PLACEHOLDER]
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '56900000000', // [PLACEHOLDER]
    city: 'Santiago',
    country: 'Chile',
    coverage: 'Santiago · Chile',
  },

  social: [
    { label: 'Instagram', href: '#' }, // [PLACEHOLDER]
    { label: 'LinkedIn', href: '#' }, // [PLACEHOLDER]
  ],

  // Navegación principal
  navigation: [
    { label: 'Bienes Reposeidos', href: '/propiedades' },
    { label: 'Inversión', href: '/inversion' },
    { label: 'Legal & Documentos', href: '/legal' },
    { label: 'Nosotros', href: '/nosotros' },
  ],
}

export const whatsappDefaultMessage =
  'Hola Saffie, quiero información sobre bien reposesido y asesoría de crédito hipotecario.'