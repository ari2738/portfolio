import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = ''

const colorMap = {
  blue:   { bg: 'var(--blue-lt)',   color: 'var(--blue)' },
  teal:   { bg: 'var(--teal-lt)',   color: 'var(--teal)' },
  amber:  { bg: 'var(--amber-lt)',  color: 'var(--amber)' },
  purple: { bg: 'var(--purple-lt)', color: 'var(--purple)' },
  coral:  { bg: 'var(--coral-lt)',  color: 'var(--coral)' },
}

const categories = ['All', 'ML', 'Web', 'Data']

export default function Projects() {
  const [projects, setProjects]   = useState([])
  const [filter, setFilter]       = useState('All')
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/projects`)
      .then(r => { setProjects(r.data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', borderBottom: '1px solid var(--border)' }}>
      <div style={{ borderRight: '1px solid var(--border)', padding: '20px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Filter</div>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            width: '100%', padding: '7px 8px', borderRadius: 'var(--radius)',
            border: 'none', cursor: 'pointer', marginBottom: 2, textAlign: 'left',
            background: filter === cat ? 'var(--bg2)' : 'transparent',
            color: filter === cat ? 'var(--text)' : 'var(--text2)',
            fontWeight: filter === cat ? 500 : 400, fontSize: 12,
          }}>
            <i className={`ti ti-${cat === 'All' ? 'layout-grid' : cat === 'ML' ? 'brain' : cat === 'Web' ? 'layout' : 'chart-bar'}`}
               style={{ fontSize: 14 }} />
            {cat === 'All' ? 'All projects' : cat === 'ML' ? 'Machine learning' : cat === 'Web' ? 'Full-stack' : 'Data engineering'}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Projects</span>
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>{filtered.length} projects</span>
        </div>

        {loading && <div style={{ color: 'var(--text2)', fontSize: 13 }}>Loading projects...</div>}
        {error && <div style={{ color: '#A32D2D', fontSize: 13 }}>Error: {error} — is your backend running?</div>}

        {!loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(p => {
              const c = colorMap[p.color] || colorMap.blue
              return (
                <div key={p.id} className="card" style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, alignItems: 'start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius)', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    <i className={`ti ti-${p.icon}`} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                      <span className={`badge badge-${p.status}`}>{p.status === 'live' ? 'Live' : 'In progress'}</span>
                      <span className={`badge badge-${p.category.toLowerCase()}`}>{p.category}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 8 }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {p.tech_stack.map(t => (
                        <span key={t} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {p.demo_url && (
                      <a href={p.demo_url} target="_blank" rel="noreferrer">
                        <button style={{ fontSize: 11, padding: '5px 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <i className="ti ti-external-link" style={{ fontSize: 11 }} /> Demo
                        </button>
                      </a>
                    )}
                    {p.github_url && (
                      <a href={p.github_url} target="_blank" rel="noreferrer">
                        <button style={{ fontSize: 11, padding: '5px 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <i className="ti ti-brand-github" style={{ fontSize: 11 }} /> Code
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
