import React from 'react'

// ============================================================================
// LOGOTIPO SAFFIE — SVG tipográfico justificado
// Ambas líneas calzan borde a borde (textLength + lengthAdjust).
// variant: 'blue' · 'navy' · 'light'
// ============================================================================

const VARIANTS = {
  blue: { name: '#365FD9', sub: '#55648f', rule: '#ab8b57' },
  navy: { name: '#0e1a2b', sub: '#55648f', rule: '#ab8b57' },
  light: { name: '#f5f2ea', sub: 'rgba(245,242,234,0.6)', rule: '#c9b287' },
}

export default function Logo({ variant = 'blue', className = '' }) {
  const c = VARIANTS[variant] || VARIANTS.blue

  return (
    <svg
      className={`logo-svg ${className}`}
      viewBox="0 0 320 68"
      role="img"
      aria-label="Saffie — Asesoría & Gestión Inmobiliaria"
    >
      <text
        x="160"
        y="34"
        textAnchor="middle"
        textLength="320"
        lengthAdjust="spacing"
        fontSize="40"
        fontWeight="600"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fill={c.name}
      >
        SAFFIE
      </text>

      <rect x="0" y="46" width="320" height="1.4" fill={c.rule} />

      <text
        x="160"
        y="65"
        textAnchor="middle"
        textLength="320"
        lengthAdjust="spacing"
        fontSize="11"
        fontWeight="500"
        fontFamily="'Montserrat', sans-serif"
        fill={c.sub}
      >
        ASESORÍA &amp; GESTIÓN INMOBILIARIA
      </text>
    </svg>
  )
}
