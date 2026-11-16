# SAFFIE ASESORÍA & GESTIÓN INMOBILIARIA — DOCUMENTO MAESTRO DEL PROYECTO

> **Propósito:** Este documento centraliza TODO el conocimiento técnico y de diseño aplicado en la web.
> Es la fuente única de verdad para continuar el desarrollo, hacer mantenimiento o incorporar nuevos agentes/developers.
> **Última actualización:** 2026-08-22

---

## 1. IDENTIDAD DEL PROYECTO

| Campo | Valor |
|---|---|
| Nombre | Saffie |
| Razón social | Saffie Asesoría & Gestión Inmobiliaria SpA |
| Tagline | Asesoría & Gestión Inmobiliaria |
| Rubro | Firma inmobiliaria boutique en Santiago de Chile |
| Servicios | Corretaje (compra/venta), administración de arriendos, asesoría de inversión, subsidios habitacionales |
| Idioma | Español de Chile (`es-CL` / `es_CL`) |
| Posicionamiento | "Luxury Editorial Architectural" — nivel US$5–15K de diseño |

---

## 2. STACK TECNOLÓGICO

| Tecnología | Versión | Uso |
|---|---|---|
| React | ^18.3.1 | Framework UI (StrictMode activado) |
| react-router-dom | ^7.18.2 | Enrutamiento SPA (BrowserRouter) |
| Vite | ^6.0.7 | Bundler + dev server |
| @vitejs/plugin-react | ^4.3.4 | Plugin React para Vite |

**Sin** frameworks CSS (todo es CSS artesanal), **sin** Tailwind, **sin** librerías de UI externas.
Despliegue: **Vercel** (carpeta `.vercel/` vinculada).

### Scripts npm
```bash
npm run dev       # Servidor desarrollo
npm run build     # Build producción → /dist
npm run preview   # Preview del build
```

### Alternativa Windows
`run_vite.bat` ejecuta `node_modules\.bin\vite --host --port 5173`

---

## 3. ARQUITECTURA DE CARPETAS

```
/
├── index.html                  # Shell HTML: meta SEO base, OG, fuentes Google
├── vercel.json                 # Rewrites SPA
├── vite.config.js              # Config mínima (solo plugin react)
├── run_vite.bat                # Lanzador dev en Windows
├── public/                     # Estáticos servidos tal cual
│   ├── logo-saffie.jpeg        # LOGO ORIGINAL (JPG) ← fuente de verdad
│   ├── logo-saffie.png         # Copia PNG del logo original
│   ├── favicon.svg             # Favicon SVG tipográfico (navy + "S" dorada)
│   ├── robots.txt              # Allow all + sitemap
│   └── sitemap.xml             # Sitemap con las 12 rutas
├── src/
│   ├── main.jsx                # Entry: StrictMode + BrowserRouter
│   ├── App.jsx                 # Rutas + RouteEffects (scroll & reveal)
│   ├── index.css               # DESIGN SYSTEM completo (~2.500 líneas)
│   ├── config_backup.js        # ⚠ CONTENIDO MASTER v3.0 (respaldo editorial)
│   ├── components/
│   │   ├── Icon.jsx            # Sistema de iconos SVG inline
│   │   ├── home/               # Secciones de Home (8 componentes)
│   │   ├── layout/             # Header.jsx, Footer.jsx
│   │   └── ui/                 # Reutilizables: Logo, LeadForm, PropertyCard,
│   │                           # SectionHead, PageHero, CTASection, WhatsAppFloat
│   ├── data/
│   │   ├── site.js             # Configuración central del sitio (activa)
│   │   └── properties.js       # Capa de datos inmobiliarios (schema documentado)
│   ├── hooks/
│   │   └── useSEO.js           # SEO por página + JSON-LD schemas
│   ├── pages/                  # 12 páginas
│   └── utils/
│       ├── format.js           # formatUF, formatCLP, ufToCLP
│       ├── lead.js             # Envío de leads al webhook
│       └── whatsapp.js         # Links wa.me contextuales
├── dist/                       # Build de producción generado
└── respaldo_2026-08-22/        # Respaldo completo del proyecto
```

---

## 4. REGLAS DE MARCA (CRÍTICAS — NO VIOLAR)

1. **NO modificar el logo ni los colores principales del brand** (regla explícita en `config_backup.js`).
2. El logo se sirve desde `/public/logo-saffie.jpeg` (original JPG).
3. El logo visible en pantalla NO es una imagen: es un **SVG tipográfico recreado** en `src/components/ui/Logo.jsx` con:
   - "SAFFIE" → Cormorant Garamond 600, 40px, azul firma
   - Línea regla dorada 272×1.4
   - "ASESORÍA & GESTIÓN INMOBILIARIA" → Montserrat 500, 11px, gris azulado
   - Ambas líneas **justificadas borde a borde** (`textLength="272"` + `lengthAdjust="spacing"`)
4. Variantes del logo: `blue` (default) · `navy` · `light`.

### Colores oficiales (tokens activos en index.css)

```css
--ink:        #365FD9;  /* Azul firma — color principal de texto/marca */
--ink-soft:   #4d70db;  /* Texto secundario */
--ink-mute:   #7288e0;  /* Texto terciario */
--ivory:      #ffffff;  /* Fondo base */
--cream:      #f6f8fe;  /* Superficie alterna blanco azulado */
--gold:       #ab8b57;  /* Acento champagne */
--gold-soft:  #c9b287;  /* Dorado sobre fondos oscuros */
--line:       #dde5fa;  /* Hairlines azul claro */
--navy:       #0e1a2b;  /* Secciones oscuras / botones primarios */
--navy-2:     #122238;
--brand-blue: #365FD9;
```

> Nota histórica: el azul original del logo JPEG era #324DD8; el sistema evolucionó a #365FD9 como azul firma del sitio.

### Paleta de respaldo (config_backup.js — variante editorial marfil)

`blue:#324DD8 · navy:#0b1220 · ivory:#F5F0E8 · text:#0d0d0d · muted:#4a4a4a · border:#e8e8e8`

### Tipografías (Google Fonts, cargadas en index.html)

| Fuente | Roles | Pesos |
|---|---|---|
| Cormorant Garamond | Display/títulos (serif elegante) | 400–700 + itálicas |
| Montserrat | Cuerpo, botones, labels (sans) | 300–700 |

Preconexión configurada: `fonts.googleapis.com` + `fonts.gstatic.com`.

---

## 5. DESIGN SYSTEM (index.css)

- **Contenedor:** `--container: 1240px`, gutters fluidos `clamp(1.25rem, 4vw, 3rem)`
- **Ritmo vertical:** `--section-pad: clamp(5rem, 10vw, 9rem)`
- **Motion:** easing `cubic-bezier(0.22, 1, 0.36, 1)` en 3 velocidades (180/320/700ms)
- **Sombra card:** `0 18px 44px rgba(19,31,51,.12)`
- **Focus visible:** outline dorado 2px offset 3px (accesibilidad)
- **Selección de texto:** dorado translúcido

### Clases primitivas reutilizables
`.container` `.eyebrow` (+::before línea dorada) `.section-head` `(--center)` `.section-title` (clamp 2.1→3.4rem, text-wrap balance) `.lead` `.btn` `--primary|--outline|--light-outline` `.link-line`

### Animación de revelado
Patrón global `data-reveal` + clase `.is-visible` gestionado por **IntersectionObserver** en `App.jsx > RouteEffects`:
- `rootMargin: '0px 0px -40px 0px'`, `threshold: 0.08`
- Se reinicia en cada cambio de ruta junto con scroll-to-top instantáneo.

---

## 6. MAPA DE RUTAS (React Router v7)

| Ruta | Página (src/pages/) |
|---|---|
| `/` | Home.jsx |
| `/propiedades` | Propiedades.jsx |
| `/propiedades/:slug` | PropiedadDetalle.jsx |
| `/vender` | Vender.jsx |
| `/arrendar` | Arrendar.jsx |
| `/administracion` | Administracion.jsx |
| `/inversion` | Inversion.jsx |
| `/subsidios` | Subsidios.jsx |
| `/nosotros` | Nosotros.jsx |
| `/contacto` | Contacto.jsx |
| `/portal` | Portal.jsx |
| `*` | NotFound.jsx (404) |

Layout global: `<Header /> <main>{routes}</main> <Footer /> <WhatsAppFloat />`

Navegación principal (site.js): Propiedades · Vender · Arrendar · Administración · Inversión · Subsidios · Nosotros

---

## 7. CAPA DE DATOS — PROPIEDADES (properties.js)

⚠️ **Las 6 propiedades actuales son DEMO** (imágenes Unsplash, precios de ejemplo). El schema está diseñado para migrar a CMS/API/CRM sin cambios de UI:

```js
{
  id, code ('SF-001'), slug, title,
  operation: 'venta' | 'arriendo',
  propertyType: 'departamento' | 'casa' | 'oficina',
  price: Number (UF), currency: 'UF',
  expenses: Number|null,          // gastos comunes en UF
  commune, neighborhood, city,
  bedrooms, bathrooms, parking, storage, area, areaTotal,
  images: [url], description, features: [string],
  status: 'disponible' | 'reservada' | 'vendida',
  featured: Boolean,
  coords: { lat, lng } | null     // preparado para mapa futuro
}
```

**Utilidades exportadas:** `getFeatured()` · `getBySlug()` · `getSimilar(property)` (misma operación, máx 3) · `getComunas()` · `getPropertyTypes()`

**Formateo monetario chileno:** `formatUF` (UF con separador es-CL), `formatCLP`, `ufToCLP` (requiere valor UF de API oficial — pendiente).

---

## 8. SISTEMA SEO (useSEO.js)

Hook por página que gestiona en `<head>`:
- `document.title` con patrón `"Título | Saffie"` o `"Saffie — tagline"`
- meta description, Open Graph completos (og:url, og:type, og:locale=es_CL…)
- link canonical dinámico `${site.url}${path}`
- **JSON-LD schema.org** inyectable por página (se limpia al desmontar)

**Schemas reutilizables:**
- `realEstateAgentSchema()` → tipo RealEstateAgent con área servida Santiago/CL
- `breadcrumbSchema(items)` → BreadcrumbList

SEO base estático en `index.html`: description, theme-color #0e1a2b, robots index/follow, og:image=/logo-saffie.jpeg, twitter:card summary, favicon SVG + fallback JPG.

**Archivos generados en dist/:**
- `robots.txt` → Allow all + apunta a sitemap en dominio canónico
- `sitemap.xml` → 12 URLs priorizadas (home 1.0, propiedades 0.9 daily, servicios 0.7–0.8 monthly)

---

## 9. INTEGRACIONES Y VARIABLES DE ENTORNO (.env)

```bash
VITE_SITE_URL          # URL canónica (default https://saffie-asesorias.vercel.app)
VITE_WHATSAPP_NUMBER   # Formato internacional sin "+", ej: 56912345678
VITE_LEAD_WEBHOOK_URL  # Webhook n8n/CRM para leads
```

### WhatsApp (utils/whatsapp.js)
- Constructor `whatsappLink(message, context)` → `https://wa.me/{num}?text=...`
- Mensajes contextuales predefinidos: general, sell, rent, admin, invest, subsidy, visit(property), property(property)
- Botón flotante global: `WhatsAppFloat`

### Captura de leads (utils/lead.js)
Punto único `submitLead({name,email,phone,intent,property,message,source})`:
1. Normaliza datos (trim, email lowercase)
2. Agrega `timestamp` ISO y `source` (default 'web')
3. POST JSON a `VITE_LEAD_WEBHOOK_URL`
4. **Fallback seguro:** si no hay webhook, loguea payload en consola (modo dev no pierde leads)

Pipeline previsto: webhook → CRM → IA → asignación → WhatsApp.

---

## 10. DESPLIEGUE VERCEL

- Proyecto vinculado (`.vercel/project.json`)
- `vercel.json` con rewrite SPA: todas las rutas sin `/assets/` → `/index.html`
  ```json
  { "rewrites": [{ "source": "/((?!assets/).*)", "destination": "/index.html" }] }
  ```
- Dominio actual: `https://saffie-asesorias.vercel.app`

---

## 11. ASSETS DEL LOGO (inventario)

| Archivo | Ubicación | Descripción |
|---|---|---|
| logo-saffie.jpeg | public/ | Original JPG (673×222) — FUENTE DE VERDAD, no modificar |
| logo-saffie.png | public/ + raíz | Conversión PNG transparente del original |
| logo-saffie-web.png | raíz | Render 2720×680 del SVG tipográfico de la web, fondo transparente |
| logo-saffie-web.jpg | raíz | Ídem con fondo blanco (calidad 95%) |
| favicon.svg | public/ | Navy #0e1a2b, "S" serif dorada #c9b287, regla azul #365FD9 |

Método de exportación del logo web: HTML+SVG renderizado con Edge headless
(`--headless=new --force-device-scale-factor=1 --window-size=2720,680 --default-background-color=00000000`)
con Google Fonts embebidas vía @import.

---

## 12. PLACEHOLDERS PENDIENTES (CHECKLIST PARA PRODUCCIÓN)

- [ ] Comprar dominio propio y actualizar `VITE_SITE_URL` + sitemap + robots
- [ ] Teléfono real → `site.contact.phone` y `VITE_WHATSAPP_NUMBER`
- [ ] Email real → `contacto@saffieasesorias.cl` (confirmar)
- [ ] Redes sociales reales (Instagram, LinkedIn) — hoy `'#'`
- [ ] Reemplazar 6 propiedades demo por inventario real (CMS/API/CRM)
- [ ] Conectar `VITE_LEAD_WEBHOOK_URL` (n8n → CRM)
- [ ] Valor UF desde API oficial (SII) para conversión CLP
- [ ] Testimonios reales de clientes autorizados
- [ ] Coordenadas reales por propiedad (mapa)
- [ ] Fotografías propias (hoy Unsplash temporal)

---

## 13. CONVENCIONES DE CÓDIGO

- JSX con comentarios-bloque de cabecera estilo banner (`// ====…`) explicando propósito
- Comentarios `[PLACEHOLDER]` marcan todo dato pendiente
- Componentes funcionales + hooks (sin clases)
- CSS global único con custom properties (sin CSS-in-JS ni módulos)
- Nombres de rutas/slugs en minúscula sin tildes
- `import.meta.env.*` para toda configuración externa
- Estructura de imports: React → librerías → componentes → data/utils

---

*Documento generado automáticamente a partir del análisis integral del codebase.*
