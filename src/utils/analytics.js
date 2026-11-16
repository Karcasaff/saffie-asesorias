// Analytics utility - GA4 via GTM dataLayer
// Configura GTM_ID en .env: VITE_GTM_ID=GTM-XXXXXXX

const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-XXXXXXX'

export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
      timestamp: new Date().toISOString(),
    })
  }
}

// Eventos predefinidos
export const AnalyticsEvents = {
  // Hero / Home
  hero_cta_click: (ctaLabel) => trackEvent('hero_cta_click', { cta_label: ctaLabel }),

  // Buscador
  search_submit: (filters) => trackEvent('search_submit', { filters }),

  // Propiedades
  property_view: (propertyCode, propertyTitle) => trackEvent('property_view', { property_code: propertyCode, property_title: propertyTitle }),
  property_cta_click: (propertyCode, ctaType) => trackEvent('property_cta_click', { property_code: propertyCode, cta_type: ctaType }),

  // Calculadora
  calculator_use: (inputs) => trackEvent('calculator_use', { inputs }),
  calculator_result_view: (results) => trackEvent('calculator_result_view', { results }),

  // Formularios
  form_start: (formId) => trackEvent('form_start', { form_id: formId }),
  form_submit: (formId, success) => trackEvent('form_submit', { form_id: formId, success }),
  form_error: (formId, error) => trackEvent('form_error', { form_id: formId, error }),

  // WhatsApp
  whatsapp_click: (context) => trackEvent('whatsapp_click', { context }),

  // Navegación
  page_view: (pageName) => trackEvent('page_view', { page_name: pageName }),

  // Legal
  legal_service_request: (serviceType) => trackEvent('legal_service_request', { service_type: serviceType }),
}

// Inicializar page view automático en SPA
export function initAnalytics(router) {
  if (typeof window === 'undefined') return

  let currentPath = window.location.pathname
  trackEvent('page_view', { page_name: currentPath })

  // Escuchar cambios de ruta (React Router v6)
  if (router && router.subscribe) {
    router.subscribe((location) => {
      if (location.pathname !== currentPath) {
        currentPath = location.pathname
        trackEvent('page_view', { page_name: currentPath })
      }
    })
  }
}

// Helper para obtener router en componentes
export function usePageTracking() {
  // Se usa en App.jsx con useLocation
  // Ver implementación en App.jsx
}