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
  tagline: 'Asesoría & Gestión Inmobiliaria',
  description:
    'Firma inmobiliaria boutique en Santiago de Chile. Corretaje, administración de arriendos, asesoría de inversión y subsidios habitacionales con gestión profesional y tecnología.',
  // [PLACEHOLDER] URL canónica — reemplazar al comprar dominio propio
  url: import.meta.env.VITE_SITE_URL || 'https://saffie-asesorias.vercel.app',

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
    { label: 'Propiedades', href: '/propiedades' },
    { label: 'Vender', href: '/vender' },
    { label: 'Arrendar', href: '/arrendar' },
    { label: 'Administración', href: '/administracion' },
    { label: 'Inversión', href: '/inversion' },
    { label: 'Subsidios', href: '/subsidios' },
    { label: 'Nosotros', href: '/nosotros' },
  ],
}

export const whatsappDefaultMessage =
  'Hola Saffie, quiero conversar con un asesor inmobiliario.'
