import React, { useState, useMemo } from 'react'
import { submitLead } from '../../utils/lead.js'

// Formulario de captación de leads reutilizable con campos dinámicos.
// Envía payload estructurado a n8n/CRM (ver src/utils/lead.js).
export default function LeadForm({
  intent = 'consulta-general',
  source = 'web',
  property = null,
  submitLabel = 'Enviar solicitud',
  compact = false,
  fields = null, // Nuevo: array de definiciones de campos dinámicos
}) {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  // Inicializar form state con campos por defecto o dinámicos
  const defaultFields = useMemo(() => [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'phone', label: 'Teléfono', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    ...(!compact ? [{ name: 'message', label: 'Mensaje', type: 'textarea', placeholder: 'Cuéntanos sobre tu proyecto u objetivo…', required: false }] : []),
  ], [compact])

  const activeFields = fields || defaultFields

  // Inicializar estado del formulario
  React.useEffect(() => {
    const initialState = {}
    activeFields.forEach(f => {
      if (f.type === 'checkbox' || f.type === 'multiselect') {
        initialState[f.name] = []
      } else {
        initialState[f.name] = ''
      }
    })
    setForm(initialState)
  }, [activeFields])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const checked = e.target.checked
    
    if (type === 'checkbox') {
      // Para checkboxes múltiples, value es un array
      const current = form[name] || []
      if (checked) {
        setForm({ ...form, [name]: [...current, value] })
      } else {
        setForm({ ...form, [name]: current.filter(v => v !== value) })
      }
    } else if (type === 'select-multiple' || e.target.multiple) {
      // Para multiselect nativo
      const selected = Array.from(e.target.selectedOptions).map(opt => opt.value)
      setForm({ ...form, [name]: selected })
    } else {
      setForm({ ...form, [name]: value })
    }
    
    if (errors[name]) setErrors({ ...errors, [name]: undefined })
  }

  const validate = (v) => {
    const errs = {}
    activeFields.forEach(field => {
      const value = v[field.name]
      if (field.required) {
        if (field.type === 'checkbox' || field.type === 'multiselect') {
          if (!value || value.length === 0) {
            errs[field.name] = `${field.label} es obligatorio.`
          }
        } else if (!value?.trim()) {
          errs[field.name] = `${field.label} es obligatorio.`
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errs[field.name] = 'Ingresa un email válido.'
        }
      }
    })
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
    if (result.ok) {
      // Reset form
      const initialState = {}
      activeFields.forEach(f => {
        if (f.type === 'checkbox' || f.type === 'multiselect') {
          initialState[f.name] = []
        } else {
          initialState[f.name] = ''
        }
      })
      setForm(initialState)
    }
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
      {activeFields.map((field) => {
        const fieldErrors = errors[field.name]
        const fieldValue = form[field.name]

        const renderField = () => {
          switch (field.type) {
            case 'textarea':
              return (
                <div className="form__group" key={field.name}>
                  <label htmlFor={`lf-${field.name}-${intent}`}>{field.label}</label>
                  <textarea
                    id={`lf-${field.name}-${intent}`}
                    name={field.name}
                    placeholder={field.placeholder || ''}
                    value={fieldValue || ''}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors}
                    rows={4}
                  />
                  {fieldErrors && <span className="form__error">{fieldErrors}</span>}
                </div>
              )

            case 'select':
              return (
                <div className="form__group" key={field.name}>
                  <label htmlFor={`lf-${field.name}-${intent}`}>{field.label}</label>
                  <select
                    id={`lf-${field.name}-${intent}`}
                    name={field.name}
                    value={fieldValue || ''}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors}
                  >
                    <option value="">Seleccionar</option>
                    {(field.options || []).map((opt, idx) => (
                      <option key={idx} value={typeof opt === 'object' ? opt.value : opt}>
                        {typeof opt === 'object' ? opt.label : opt}
                      </option>
                    ))}
                  </select>
                  {fieldErrors && <span className="form__error">{fieldErrors}</span>}
                </div>
              )

            case 'multiselect':
              return (
                <div className="form__group form__group--multiselect" key={field.name}>
                  <label htmlFor={`lf-${field.name}-${intent}`}>{field.label}</label>
                  <select
                    id={`lf-${field.name}-${intent}`}
                    name={field.name}
                    multiple
                    value={fieldValue || []}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors}
                    style={{ minHeight: '100px' }}
                  >
                    {(field.options || []).map((opt, idx) => (
                      <option key={idx} value={typeof opt === 'object' ? opt.value : opt}>
                        {typeof opt === 'object' ? opt.label : opt}
                      </option>
                    ))}
                  </select>
                  <small style={{ color: 'var(--ink-mute)', fontSize: '0.7rem' }}>Mantén Ctrl/Cmd para seleccionar múltiples</small>
                  {fieldErrors && <span className="form__error">{fieldErrors}</span>}
                </div>
              )

            case 'checkbox':
              return (
                <div className="form__group form__group--checkbox" key={field.name}>
                  <label>{field.label}</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                    {(field.options || []).map((opt, idx) => {
                      const optValue = typeof opt === 'object' ? opt.value : opt
                      const optLabel = typeof opt === 'object' ? opt.label : opt
                      const isChecked = Array.isArray(fieldValue) && fieldValue.includes(optValue)
                      return (
                        <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'normal' }}>
                          <input
                            type="checkbox"
                            name={field.name}
                            value={optValue}
                            checked={isChecked}
                            onChange={handleChange}
                          />
                          <span>{optLabel}</span>
                        </label>
                      )
                    })}
                  </div>
                  {fieldErrors && <span className="form__error">{fieldErrors}</span>}
                </div>
              )

            case 'number':
            case 'text':
            case 'email':
            case 'tel':
            default:
              return (
                <div className="form__group" key={field.name}>
                  <label htmlFor={`lf-${field.name}-${intent}`}>{field.label}</label>
                  <input
                    id={`lf-${field.name}-${intent}`}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder || ''}
                    value={fieldValue || ''}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors}
                  />
                  {fieldErrors && <span className="form__error">{fieldErrors}</span>}
                </div>
              )
          }
        }

        return renderField()
      })}

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