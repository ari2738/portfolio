import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px', borderTop: '1px solid var(--border)',
    }}>
      <span style={{ fontSize: 12, color: 'var(--text3)' }}>
        Built with React · Flask · PostgreSQL · Deployed on Vercel
      </span>
      <div style={{ display: 'flex', gap: 16 }}>
        {[
          { label: 'GitHub',   href: 'https://github.com/ari2738' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abirami-shanmugam-7551a12b6' },
          { label: 'Resume',   href: '/Abirami_Resume.pdf' },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ fontSize: 12, color: 'var(--text2)' }}>{l.label}</a>
        ))}
      </div>
    </footer>
  )
}
