import React from 'react'

const stats = [
  { n: '8+',  l: 'Projects built' },
  { n: '12+', l: 'Technologies' },
  { n: '4',   l: 'Live deployments' },
  { n: '2027',l: 'Graduating' },
]

export default function StatsBar() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
      borderBottom: '1px solid var(--border)',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: '16px 24px', textAlign: 'center',
          borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{s.n}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s.l}</div>
        </div>
      ))}
    </div>
  )
}
