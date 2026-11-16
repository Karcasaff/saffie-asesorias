import React from 'react'

const paths = {
  home: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4h8l10 10-8 8L3 12Z" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 5.6" />
      <path d="M18 14.6c2.4.7 4 2.9 4 5.4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13-2 7 5.5-3 5.5 3-2-7" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19H14a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.5" />
    </>
  ),
  ear: (
    <>
      <path d="M6 10a6 6 0 0 1 12 0c0 3-2 4-2 6" />
      <path d="M10 20a2 2 0 1 0 4 0v-3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.5-4.5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16" />
      <path d="M7 8h10" />
      <path d="m7 8-3.5 6a3 3 0 0 0 6 0L7 8Z" />
      <path d="m17 8-3.5 6a3 3 0 0 0 6 0L17 8Z" />
      <path d="M7 20h10" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
    </>
  ),
  arrow: <path d="M4 12h16M13 5l7 7-7 7" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14 8h3V4.5h-3c-2.2 0-4 1.8-4 4V11H7.5v3.5H10V21h3.5v-6.5h2.7l.8-3.5h-3.5V8.7c0-.4.3-.7.5-.7Z" />
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3" />
    </>
  ),
}

export default function Icon({ name, size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || null}
    </svg>
  )
}