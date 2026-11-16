// Formateo de valores inmobiliarios (Chile)

export function formatUF(value) {
  if (value == null) return '—'
  return `UF ${value.toLocaleString('es-CL', { maximumFractionDigits: 2 })}`
}

export function formatCLP(value) {
  if (value == null) return '—'
  return `$${value.toLocaleString('es-CL')}`
}

// Referencia UF aproximada solo con fines de visualización opcional.
// [PLACEHOLDER] La UF real debe obtenerse de una API oficial (ej. SII).
export function ufToCLP(uf, ufValue = null) {
  if (!ufValue) return null
  return Math.round(uf * ufValue)
}
