import React, { useState } from 'react'

export default function Navbar({ activeSection, setActiveSection }) {
  const links = ['Home', 'Projects', 'Skills', 'Experience', 'Contact']

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', height: '52px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#378ADD' }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>Abirami.dev</span>
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        {links.map(link => (
          <button key={link} onClick={() => {
            setActiveSection(link)
            document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
          }} style={{
            fontSize: 12, padding: '5px 10px',
            borderRadius: 'var(--radius)', border: 'none',
            background: activeSection === link ? 'var(--bg2)' : 'transparent',
            color: activeSection === link ? 'var(--text)' : 'var(--text2)',
            fontWeight: activeSection === link ? 500 : 400,
            cursor: 'pointer',
          }}>{link}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <a href="/Abirami_Resume.pdf" download>
          <button className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>
            <i className="ti ti-download" /> Resume
          </button>
        </a>
        <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Hire me
        </button>
      </div>
    </nav>
  )
}
