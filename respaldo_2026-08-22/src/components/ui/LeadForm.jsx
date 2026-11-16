import React, { useState } from 'react'
import { submitLead } from '../../utils/lead.js'

// Formulario de captación de leads reutilizable.
// Envía payload estructurado a n8n/CRM (ver src/utils/lead.js).
export default function LeadForm({
  intent = 'consulta-general',
  source = 'web',
  property = null, // código o referencia de propiedad
  submitLabel = 'Enviar solicitud',
  compact = false,
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: undefined })
  }

  const validate = (v) => {
    const errs = {}
    if (!v.name?.trim()) errs.name = 'Ingresa tu nombre.'
    if (!v.email?.trim()) {
      errs.email = 'Ingresa tu email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      errs.email = 'Ingresa un email válido.'
    }
    if (!v.phone?.trim()) errs.phone = 'Ingresa tu teléfono.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('sending')
    const result = await submitLead({
      ...form,
      intent,
      property,
      source,
    })
    setStatus(result.ok ? 'success' : 'error')
    if (result.ok) setForm({ name: '', email: '', phone: '', message: '' })
  }

  if (status === 'success') {
    return (
      <div className="form__success">
        <p>Solicitud recibida. Un asesor Saffie se pondrá en contacto contigo a la brevedad.</p>
      </div>
    )
  }

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <div className="form__group">
          <label htmlFor={`lf-name-${intent}`}>Nombre</label>
          <input
            id={`lf-name-${intent}`}
            name="name"
            type="text"
            placeholder="Tu nombre completo"
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="form__error">{errors.name}</span>}
        </div>

        <div className="form__group">
          <label htmlFor={`lf-phone-${intent}`}>Teléfono</label>
          <input
            id={`lf-phone-${intent}`}
            name="phone"
            type="tel"
            placeholder="+56 9 0000 0000"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <span className="form__error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form__group">
        <label htmlFor={`lf-email-${intent}`}>Email</label>
        <input
          id={`lf-email-${intent}`}
          name="email"
          type="email"
          placeholder="tucorreo@email.com"
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="form__error">{errors.email}</span>}
      </div>

      {!compact && (
        <div className="form__group">
          <label htmlFor={`lf-msg-${intent}`}>Mensaje</label>
          <textarea
            id={`lf-msg-${intent}`}
            name="message"
            placeholder="Cuéntanos sobre tu proyecto u objetivo…"
            value={form.message}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="form__footer">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando…' : submitLabel}
        </button>

        <p className="contact__privacy">Confidencial • Sin compromiso</p>
      </div>

      {status === 'error' && (
        <p className="form__error">No pudimos enviar tu solicitud. Inténtalo nuevamente.</p>
      )}
    </form>
  )
}
