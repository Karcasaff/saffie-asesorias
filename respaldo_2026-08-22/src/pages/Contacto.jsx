import React, { useState } from 'react'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import { submitLead } from '../utils/lead.js'
import { site, whatsappDefaultMessage } from '../data/site.js'
import { whatsappLink } from '../utils/whatsapp.js'

const motives = [
  'Comprar',
  'Arrendar',
  'Vender',
  'Administrar',
  'Invertir',
  'Subsidios',
  'Otro',
]

export default function Contacto() {
  useSEO({
    title: 'Contacto',
    description:
      'Conversemos: compra, venta, arriendo, administración o inversión inmobiliaria en Santiago. Respuesta personalizada y confidencial.',
    path: '/contacto',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Contacto', path: '/contacto' },
    ]),
  })

  const [form, setForm] = useState({ name: '', email: '', phone: '', motive: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const waHref = whatsappLink(whatsappDefaultMessage)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: undefined })
  }

  const validate = (v) => {
    const errs = {}
    if (!v.name?.trim()) errs.name = 'Ingresa tu nombre.'
    if (!v.email?.trim()) errs.email = 'Ingresa tu email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Ingresa un email válido.'
    if (!v.phone?.trim()) errs.phone = 'Ingresa tu teléfono.'
    if (!v.motive) errs.motive = 'Selecciona un motivo.'
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
      intent: form.motive,
      source: '/contacto',
    })
    setStatus(result.ok ? 'success' : 'error')
    if (result.ok) setForm({ name: '', email: '', phone: '', motive: '', message: '' })
  }

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Contacto', href: '/contacto' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos."
        lead="Cuéntanos qué necesitas. Te responderemos de forma personalizada y confidencial."
        crumbs={crumbs}
      />

      <section className="contact">
        <div className="container">
          <div className="contact__grid">
            <div className="contact__aside" data-reveal>
              <p className="lead">Prefieres hablar directo?</p>

              {waHref && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Hablar por WhatsApp
                </a>
              )}

              <div className="contact__detail">
                <b>Correo</b>
                <span>{site.contact.email}</span> {/* [PLACEHOLDER] */}
              </div>

              <div className="contact__detail">
                <b>Teléfono / WhatsApp</b>
                <span>{site.contact.phone}</span> {/* [PLACEHOLDER] */}
              </div>

              <div className="contact__detail">
                <b>Cobertura</b>
                <span>{site.contact.coverage}</span>
              </div>

              <div className="contact__detail">
                <b>Horario</b>
                <span>Lunes a viernes · 9:00 — 19:00</span> {/* [PLACEHOLDER] */}
              </div>
            </div>

            {status === 'success' ? (
              <div className="form__success" data-reveal>
                <p>Mensaje recibido. Un asesor Saffie se pondrá en contacto contigo a la brevedad.</p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate data-reveal style={{ '--reveal-delay': '150ms' }}>
                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="c-name">Nombre</label>
                    <input id="c-name" name="name" type="text" placeholder="Tu nombre completo"
                      value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
                    {errors.name && <span className="form__error">{errors.name}</span>}
                  </div>
                  <div className="form__group">
                    <label htmlFor="c-phone">Teléfono</label>
                    <input id="c-phone" name="phone" type="tel" placeholder="+56 9 0000 0000"
                      value={form.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
                    {errors.phone && <span className="form__error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" name="email" type="email" placeholder="tucorreo@email.com"
                      value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                    {errors.email && <span className="form__error">{errors.email}</span>}
                  </div>
                  <div className="form__group">
                    <label htmlFor="c-motive">Motivo</label>
                    <select id="c-motive" name="motive" value={form.motive}
                      onChange={handleChange} aria-invalid={!!errors.motive}>
                      <option value="">Selecciona un motivo</option>
                      {motives.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    {errors.motive && <span className="form__error">{errors.motive}</span>}
                  </div>
                </div>

                <div className="form__group">
                  <label htmlFor="c-message">Mensaje</label>
                  <textarea id="c-message" name="message"
                    placeholder="Cuéntanos sobre tu proyecto u objetivo inmobiliario…"
                    value={form.message} onChange={handleChange} />
                </div>

                <div className="form__footer">
                  <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                  </button>
                  <p className="contact__privacy">Confidencial • Sin compromiso</p>
                </div>

                {status === 'error' && (
                  <p className="form__error">No pudimos enviar tu mensaje. Inténtalo nuevamente.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
