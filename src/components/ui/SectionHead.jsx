import React from 'react'

// Encabezado editorial de sección reutilizable.
export default function SectionHead({ eyebrow, title, lead, align = 'start', dark = false, children }) {
  return (
    <div
      className={`section-head ${align === 'center' ? 'section-head--center' : ''}`}
      data-reveal
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  )
}
