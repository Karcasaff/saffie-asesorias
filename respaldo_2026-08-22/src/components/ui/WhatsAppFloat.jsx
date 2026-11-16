import React, { useEffect, useState } from 'react'
import { site, whatsappDefaultMessage } from '../../data/site.js'
import { whatsappLink } from '../../utils/whatsapp.js'

// Botón flotante de WhatsApp — discreto y accesible.
export default function WhatsAppFloat() {
  const [href, setHref] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setHref(whatsappLink(whatsappDefaultMessage))
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-float ${visible ? 'wa-float--visible' : ''}`}
      aria-label={`Hablar con un asesor por WhatsApp`}
      title="Hablar con un asesor"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.16L2 22l4.95-1.58A9.9 9.9 0 1 0 12.04 2Zm5.77 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-.98.23-3.34-.7-2.83-1.12-4.6-4.02-4.74-4.21-.13-.19-1.12-1.5-1.12-2.86s.71-2.03.97-2.31c.25-.27.55-.34.73-.34h.53c.17 0 .4-.06.62.48l.85 2.07c.07.14.12.3.02.49-.09.19-.14.3-.28.47l-.42.49c-.13.14-.28.29-.12.56.15.27.68 1.12 1.46 1.82 1 .89 1.84 1.17 2.1 1.3.27.14.42.12.58-.07l.83-.97c.19-.24.36-.19.6-.11l1.72.81c.24.12.4.18.46.28.05.11.05.63-.18 1.25Z" />
      </svg>
      <span className="wa-float__label">WhatsApp</span>
    </a>
  )
}
