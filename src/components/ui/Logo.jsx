import React from 'react'

export default function Logo({ variant = 'blue', size = 'md' }) {
  const height = size === 'lg' ? '48px' : size === 'sm' ? '28px' : '36px'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <img
        src="/logo-prosaffie.jpeg"
        alt="Prosaffie Logo"
        style={{ height, objectFit: 'contain', borderRadius: '4px', display: 'block' }}
        onError={(e) => {
          e.target.style.display = 'none'
        }}
      />
      <span style={{ fontSize: size === 'lg' ? '1.5rem' : '1.2rem', fontWeight: 700, color: variant === 'light' ? '#fff' : '#0f172a', letterSpacing: '-0.5px' }}>
        Prosaffie
      </span>
    </div>
  )
}
