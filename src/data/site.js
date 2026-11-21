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
  name: 'Prosaffie',
  legalName: 'Prosaffie — Bienes Reposeídos',
  tagline: 'Bienes Reposeidos Bancarios',
  description:
    'Inventario exclusivo de bienes reposeídos y recuperados bancarios en Chile. Compra directa, precio UF y pesos transparente.',
  url: import.meta.env.VITE_SITE_URL || 'https://prosaffie.vercel.app',

  contact: {
    email: 'contacto@prosaffie.cl',
    phone: '+56 9 0000 0000',
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '56900000000',
    city: 'Santiago',
    country: 'Chile',
    coverage: 'Chile',
  },

  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],

  navigation: [
    { label: 'Bienes Reposeídos', href: '/propiedades' },
    { label: 'Descargar Listado Excel', href: '/listado' },
  ],
}

export const whatsappDefaultMessage =
  'Hola Prosaffie, quiero información sobre bienes reposeidos y asesoría comercial.'