// ============================================================================
// ENVÍO DE LEADS — PUNTO ÚNICO DE INTEGRACIÓN
// ----------------------------------------------------------------------------
// Envía un payload estructurado al webhook configurado en
// VITE_LEAD_WEBHOOK_URL (n8n → CRM → IA → asignación → WhatsApp).
//
// PAYLOAD:
// { name, email, phone, intent, property, message, source, timestamp }
//
// Si no hay webhook configurado, el lead se registra en consola (modo dev)
// para no perder información durante la puesta en marcha.
// ============================================================================

const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL

export async function submitLead({ name, email, phone, intent, property, message, source }) {
  const payload = {
    name: name?.trim(),
    email: email?.trim()?.toLowerCase(),
    phone: phone?.trim(),
    intent: intent || 'consulta-general',
    property: property || null,
    message: message?.trim() || '',
    source: source || 'web',
    timestamp: new Date().toISOString(),
  }

  if (!WEBHOOK_URL) {
    console.info(
      '[SAFFIE LEAD] Webhook no configurado (VITE_LEAD_WEBHOOK_URL). Payload:',
      payload
    )
    return { ok: true }
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return { ok: true }
  } catch (error) {
    console.error('[SAFFIE LEAD] Error enviando lead:', error)
    return { ok: false }
  }
}
