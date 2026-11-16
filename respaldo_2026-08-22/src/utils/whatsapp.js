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
  general: () => 'Hola Saffie, quiero conversar con un asesor inmobiliario.',
  sell: () => 'Hola Saffie, quiero vender mi propiedad.',
  rent: () => 'Hola Saffie, quiero arrendar mi propiedad.',
  admin: () => 'Hola Saffie, quiero información sobre administración de arriendos.',
  invest: () => 'Hola Saffie, quiero evaluar una inversión inmobiliaria.',
  subsidy: () => 'Hola Saffie, quiero saber si puedo acceder a un subsidio habitacional.',
  visit: (property) =>
    `Hola Saffie, quiero agendar una visita a la propiedad ${property.code} (${property.title}).`,
  property: (property) =>
    `Hola Saffie, tengo interés en la propiedad ${property.code} (${property.title}).`,
}
