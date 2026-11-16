// WhatsApp — construcción de enlaces dinámicos según contexto.
// El número se configura en VITE_WHATSAPP_NUMBER (ver src/data/site.js).

import { site } from '../data/site.js'

export function whatsappLink(message, context = '') {
  const text = context ? `${message}\n\n${context}` : message
  const number = site.contact.whatsapp
  if (!number) return null
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

// Mensajes contextuales reutilizables
export const waMessages = {
  general: () => 'Hola Saffie, quiero hablar con un Asesor de Inversión.',
  sell: () => 'Hola Saffie, quiero vender mi propiedad.',
  invest: () => 'Hola Saffie, quiero evaluar oportunidades de inversión inmobiliaria.',
  legal: () => 'Hola Saffie, necesito asesoría legal inmobiliaria (promesas, escrituras, estudios de títulos).',
  visit: (property) =>
    `Hola Saffie, quiero agendar una visita a la propiedad ${property.code} (${property.title}).`,
  property: (property) =>
    `Hola Saffie, tengo interés en la propiedad ${property.code} (${property.title}).`,
  legalPromesa: (property) =>
    `Hola Saffie, quiero encargar la redacción de una Promesa de Compraventa para la propiedad ${property.code} (${property.title}).`,
}