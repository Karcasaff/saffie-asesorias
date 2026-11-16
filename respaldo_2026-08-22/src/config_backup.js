// ============================================================================
// SAFFIE ASESORÍA & GESTIÓN INMOBILIARIA — CONFIGURACIÓN MASTER v3.0
// Sitio rediseño nivel US$5-15K — Luxury Editorial Architectural
// ----------------------------------------------------------------------------
// Esta configuración centraliza todo el contenido editable.
// NO modificar el logo ni los colores principales del brand.
// ----------------------------------------------------------------------------

export const brand = {
  name: 'Saffie',
  tagline: 'Asesoría & Gestión Inmobiliaria',
  description:
    'Asesoría & Gestión Inmobiliaria para comprar, vender o invertir con visión, análisis y respaldo.',
  // Logo original — servir desde /public/logo-saffie.jpeg. NO modificar.
  logo: '/logo-saffie.jpeg',
}

// ----------------------------------------------------------------------------
// TOKENS DE MARCA (derivados del logo original #324DD8)
// ----------------------------------------------------------------------------
export const colors = {
  // Azul firma del logo
  blue: '#324DD8',
  // Navy profundo para secciones de autoridad
  navy: '#0b1220',
  // Marfil cálido para fondos editoriales
  ivory: '#F5F0E8',
  // Texto y elementos
  text: '#0d0d0d',
  muted: '#4a4a4a',
  // Blanco puro
  white: '#ffffff',
  // Bordes sutiles
  border: '#e8e8e8',
}

// ----------------------------------------------------------------------------
// NAVEGACIÓN PRINCIPAL
// ----------------------------------------------------------------------------
export const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
]

// ----------------------------------------------------------------------------
// HERO / CINEMATOGRÁFICO
// ----------------------------------------------------------------------------
export const hero = {
  // Fotografía arquitectónica premium (reemplazar URL por la propia de Saffie)
  image:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
  // Label pequeño "SAFFIE ASESORÍA & GESTIÓN INMOBILIARIA"
  label: 'Saffie',
  // H1 principal
  title: 'DECISIONES INMOBILIARIAS QUE MERECEN UNA MIRADA DIFERENTE.',
  // Subtítulo destacable
  highlight: ['RESPALDO', 'VISIÓN', 'ESTRATEGIA'],
  // Descripción
  subtitle:
    'Acompañamos decisiones de compra, venta e inversión inmobiliaria con información, análisis y criterio.',
  // CTAs principales
  ctaPrimary: 'SOLICITAR ASESORÍA',
  ctaSecondary: 'CONVERSAR CON SAFFIE',
}

// ----------------------------------------------------------------------------
// MARCA STATEMENT (sección después del Hero)
// ----------------------------------------------------------------------------
export const brandStatement = {
  title: 'UNA PROPIEDAD ES UNA DECISIÓN. UNA DECISIÓN PUEDE CAMBIAR UN PATRIMONIO.',
  text:
    'En Saffie creemos que comprar, vender o invertir en una propiedad requiere mucho más que información. Requiere criterio. Requiere análisis. Y, sobre todo, requiere alguien que entienda lo que realmente está en juego.',
  // Esta sección tiene estilo de página de revista arquitectónica
}

// ----------------------------------------------------------------------------
// SERVICIOS (rediseño editorial — no 4 tarjetas)
// ----------------------------------------------------------------------------
export const services = {
  label: 'NUESTROS SERVICIOS',
  h2: 'ASESORAMOS DECISIONES. NO SOLO TRANSACCIONES.',
  items: [
    {
      number: '01',
      title: 'COMPRA',
      description:
        'Encontramos y evaluamos propiedades de acuerdo con tus objetivos.',
      // Cada item tiene imagen asociada en el render
    },
    {
      number: '02',
      title: 'VENTA',
      description:
        'Posicionamos tu propiedad y diseñamos una estrategia para maximizar su oportunidad.',
    },
    {
      number: '03',
      title: 'INVERSIÓN',
      description:
        'Analizamos rentabilidad, riesgo, mercado y potencial.',
    },
    {
      number: '04',
      title: 'ASESORÍA ESTRATÉGICA',
      description:
        'Diseñamos contigo una estrategia inmobiliaria personalizada.',
    },
  ],
}

// ----------------------------------------------------------------------------
// "THE SAFFIE STANDARD" — sección navy icónica
// ----------------------------------------------------------------------------
export const saffieStandard = {
  background: 'navy', // usa --saffie-navy
  title: 'EL ESTÁNDAR SAFFIE',
  subtitle: 'NO TOMAMOS DECISIONES A LA LIGERA.',
  items: [
    { label: 'ANALIZAMOS', description: 'Investigamos y evaluamos cada circunstancia' },
    { label: 'COMPARAMOS', description: 'Comparamos alternativas para el mejor resultado' },
    { label: 'ESTRATEGIZAMOS', description: 'Diseñamos la ruta óptima para tu patrimonio' },
    { label: 'ACOMPAÑAMOS', description: 'Estamos contigo hasta materializar el objetivo' },
  ],
}

// ----------------------------------------------------------------------------
// AUTHORITY SECTION
// ----------------------------------------------------------------------------
export const authority = {
  title: 'INFORMACIÓN PARA DECIDIR. CRITERIO PARA AVANZAR.',
  markers: [
    {
      number: '01',
      title: 'MERCADO',
      text: 'Entendemos el contexto del inmueble y la zona.',
    },
    {
      number: '02',
      title: 'PROPIEDAD',
      text: 'Analizamos la oportunidad única de cada activo.',
    },
    {
      number: '03',
      title: 'PATRIMONIO',
      text: 'Pensamos en el largo plazo y la preservación de valor.',
    },
  ],
}

// ----------------------------------------------------------------------------
// BEYOND THE PROPERTY
// ----------------------------------------------------------------------------
export const beyondProperty = {
  title: 'MÁS ALLÁ DE LA PROPIEDAD',
  subtitle:
    'Una buena decisión inmobiliaria no comienza con una dirección. Comienza con una pregunta: ¿Qué quieres construir?',
  pathways: [
    {
      title: 'BUY',
      label: 'Encontrar la propiedad correcta.',
      hint: 'Selección rigurosa alineada a tus objetivos.',
    },
    {
      title: 'SELL',
      label: 'Encontrar el comprador correcto.',
      hint: 'Estrategia de posicionamiento y exposición.',
    },
    {
      title: 'INVEST',
      label: 'Encontrar la oportunidad correcta.',
      hint: 'Análisis de rentabilidad y potencial de crecimiento.',
    },
  ],
}

// ----------------------------------------------------------------------------
// PROCESO (transformado — editorial)
// ----------------------------------------------------------------------------
export const process = {
  label: 'OUR PROCESS',
  h2: 'CADA DECISIÓN TIENE SU PROPIO CAMINO.',
  steps: [
    {
      number: '01',
      title: 'ESCUCHAMOS',
      description:
        'Entendemos tus necesidades, objetivos y situación actual.',
    },
    {
      number: '02',
      title: 'ANALIZAMOS',
      description:
        'Investigamos y evaluamos opciones del mercado para ti.',
    },
    {
      number: '03',
      title: 'COMPARAMOS',
      description:
        'Comparamos alternativas para que tomes la mejor decisión.',
    },
    {
      number: '04',
      title: 'DECIDIMOS',
      description:
        'Te asesoramos para que tomes decisiones con seguridad y respaldo.',
    },
    {
      number: '05',
      title: 'ACOMPAÑAMOS',
      description:
        'Te acompañamos en todo el proceso, hasta lograr tu objetivo.',
    },
  ],
}

// ----------------------------------------------------------------------------
// THE ADVISORY APPROACH
// ----------------------------------------------------------------------------
export const advisoryApproach = {
  title: 'NO SOMOS INTERMEDIARIOS. SOMOS ASESORES.',
  text:
    'Nuestro trabajo no termina cuando encontramos una propiedad. Nuestro trabajo consiste en ayudarte a entender si realmente tiene sentido para ti.',
  pillars: ['ANÁLISIS', 'ESTRATEGIA', 'NEGOCIACIÓN', 'ACOMPAÑAMIENTO'],
}

// ----------------------------------------------------------------------------
// FEATURED PROPERTY (editorial cover, no portal card)
// ----------------------------------------------------------------------------
export const featuredProperty = {
  image:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  location: 'Ubicación privilegiada',
  type: 'Tipo de propiedad',
  surface: 'Superficie',
  status: 'Disponible',
  cta: 'VER PROPIEDAD →',
}

// ----------------------------------------------------------------------------
// MARKET INTELLIGENCE (preparada para contenido futuro)
// ----------------------------------------------------------------------------
export const marketIntelligence = {
  title: 'SAFFIE MARKET',
  subtitle: 'PERSPECTIVAS DEL MERCADO INMOBILIARIO.',
  sections: [
    { title: 'MERCADO', description: 'Análisis de tendencias y contexto' },
    { title: 'INVERSIÓN', description: 'Oportunidades y proyecciones' },
    { title: 'TENDENCIAS', description: 'Nuevas direcciones del sector' },
  ],
}

// ----------------------------------------------------------------------------
// TESTIMONIALS —Experiencias Saffie (sin inventar clientes reales)
// ----------------------------------------------------------------------------
export const testimonials = {
  label: 'EXPERIENCIAS SAFFIE',
  intro:
    'Cuando existan testimonios reales, este espacio se llenará con voces de clientes autorizados.',
  institutional: [
    'Metodología propia de análisis de mercado',
    'Enfoque en decisiones patrimoniales, no en transacciones',
    'Acompañamiento personalizado desde la consulta inicial',
  ],
}

// ----------------------------------------------------------------------------
// FINAL CTA CINEMATOGRÁFICO
// ----------------------------------------------------------------------------
export const finalCTA = {
  backgroundImage:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
  overlayColor: 'rgba(10, 18, 32, 0.85)', // --saffie-navy opacity
  title: 'TU PRÓXIMA DECISIÓN MERECE UNA BUENA ESTRATEGIA.',
  subtitle: 'Conversemos sobre tu objetivo inmobiliario.',
  ctaPrimary: 'SOLICITAR ASESORÍA',
  ctaSecondary: 'HABLAR CON SAFFIE',
}

// ----------------------------------------------------------------------------
// CONTACTO (editorial minimalista)
// ----------------------------------------------------------------------------
export const contact = {
  label: 'LET\'S TALK REAL ESTATE',
  subtitle: 'CONVERSEMOS.',
  fields: [
    { name: 'nombre', label: 'NOMBRE', placeholder: 'Tu nombre completo', type: 'text' },
    { name: 'email', label: 'EMAIL', placeholder: 'tucorreo@email.com', type: 'email' },
    { name: 'telefono', label: 'TELÉFONO', placeholder: '+56 9 0000 0000', type: 'tel' },
    {
      name: 'tipo',
      label: 'TIPO DE ASESORÍA',
      options: ['Compra', 'Venta', 'Inversión', 'Asesoría personalizada'],
      placeholder: 'Selecciona el tipo',
    },
    { name: 'mensaje', label: 'MENSAJE', placeholder: 'Cuéntanos sobre tu proyecto...', type: 'textarea' },
  ],
  cta: 'ENVIAR SOLICITUD',
  privacy:
    'CONFIDENCIAL • PERSONALIZADO • SIN COMPROMISO. Al enviar este formulario aceptas nuestra política de privacidad.',
}

// ----------------------------------------------------------------------------
// FOOTER
// ----------------------------------------------------------------------------
export const footer = {
  navSections: [
    { title: 'Saffie', links: ['Inicio', 'Servicios', 'Nosotros', 'Proceso', 'Testimonios', 'Contacto'] },
    { title: 'SERVICIOS', links: ['Compra de propiedades', 'Venta de propiedades', 'Inversión inmobiliaria', 'Asesoría personalizada'] },
    { title: 'CONTACTO', links: ['Datos oficiales', '[CIUDAD]', '[TELÉFONO]', '[EMAIL]'] },
  ],
  description:
    'Asesoría & Gestión Inmobiliaria para comprar, vender o invertir con visión, análisis y respaldo.',
  copyright: '© {year} Saffie Asesoría & Gestión Inmobiliaria',
  social: ['Instagram', 'Facebook', 'LinkedIn'],
}

// ----------------------------------------------------------------------------
// IMÁGENES (Unsplash premium — reemplazar fácilmente)
// ----------------------------------------------------------------------------
export const images = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
  about:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  contact:
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80',
  featured:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
}

// ----------------------------------------------------------------------------
// ADVISORY TYPES (para formulario y navegación)
// ----------------------------------------------------------------------------
export const advisoryTypes = ['Compra', 'Venta', 'Inversión', 'Asesoría personalizada']