import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = ''  // use relative path for proxying

const catStyle = {
  'Machine Learning': { bg: 'var(--purple-lt)', color: 'var(--purple)', icon: 'ti-brain',   bar: '#7F77DD' },
  'Frontend':         { bg: 'var(--blue-lt)',   color: 'var(--blue)',   icon: 'ti-layout',  bar: '#378ADD' },
  'Backend':          { bg: 'var(--teal-lt)',   color: 'var(--teal)',   icon: 'ti-server',  bar: '#1D9E75' },
  'Database & Cloud': { bg: 'var(--amber-lt)',  color: 'var(--amber)',  icon: 'ti-database',bar: '#EF9F27' },
}

export default function Skills() {
  const [grouped, setGrouped] = useState({})
  const [error, setError]     = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/skills`)
      .then(r => setGrouped(r.data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <section id="skills" style={{ padding: '28px 24px', borderBottom: '1px solid var(--border)' }}>
      <div className="section-title">Skills</div>
      {error && <div style={{ color: '#A32D2D', fontSize: 13 }}>Error: {error} — is your backend running?</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
        {Object.entries(grouped).map(([cat, skills]) => {
          const s = catStyle[cat] || catStyle['Frontend']
          return (
            <div key={cat} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: 'var(--radius)', background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  <i className={`ti ${s.icon}`} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{cat}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {skills.map(sk => (
                  <div key={sk.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>{sk.name}</span>
                    <div style={{ width: 64, height: 4, background: 'var(--bg2)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ width: `${sk.level}%`, height: '100%', background: s.bar, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}