import React from 'react'

export default function Hero() {
  return (
    <section id="home" style={{
      display: 'grid', gridTemplateColumns: '1fr 280px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ padding: '40px 28px', borderRight: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1D9E75' }} />
          <span style={{ fontSize: 11, color: 'var(--text2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Available for internship · Tiruvannamalai, India
          </span>
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.2, marginBottom: 6 }}>
          Hi, I'm <span style={{ color: 'var(--blue)' }}>Abirami</span>
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 18 }}>
          B.E CSE Student · Full-Stack Developer
        </p>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 420, marginBottom: 24 }}>
          I build end-to-end intelligent applications — from training deep learning models
          to shipping production-ready web apps. Passionate about solving real problems
          with clean code and data-driven thinking.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn-primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <i className="ti ti-folder" /> View Projects
          </button>
          <a href="https://github.com/ari2738" target="_blank" rel="noreferrer">
            <button className="btn-outline"><i className="ti ti-brand-github" /> GitHub</button>
          </a>
          <a href="https://www.linkedin.com/in/abirami-shanmugam-7551a12b6" target="_blank" rel="noreferrer">
            <button className="btn-outline"><i className="ti ti-brand-linkedin" /> LinkedIn</button>
          </a>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 20 }}>
          {['Python','React.js','Flask','Machine Learning','Django','PostgreSQL'].map(tag => (
            <span key={tag} style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 999,
              background: 'var(--blue-lt)', color: 'var(--blue-dk)', fontWeight: 500
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            border: '2px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'var(--blue-lt)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 600, color: 'var(--blue-dk)',
            }}>A</div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, color: 'var(--teal)',
            background: 'var(--teal-lt)', padding: '4px 10px', borderRadius: 999,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1D9E75' }} />
            Open to work
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: 'ti-brand-github',   label: 'https://github.com/ari2738',    href: 'https://github.com/ari2738' },
            { icon: 'ti-brand-linkedin', label: 'https://www.linkedin.com/in/abirami-shanmugam-7551a12b6', href: 'https://www.linkedin.com/in/abirami-shanmugam-7551a12b6' },
            { icon: 'ti-mail',           label: 'shanmugamarigaran@gmail.com',     href: 'shanmugamarigaran@gmail.com' },
          ].map(s => (
            <a key={s.icon} href={s.href} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--text2)' }}>
              <i className={`ti ${s.icon}`} style={{ fontSize: 14 }} />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}