import React from 'react'

const items = [
  { icon: 'ti-school',      title: 'B.E — Computer Science', sub: 'Tiruvannamalai · 2023 – 2027', date: '2023–2027',
    desc: 'Specialized in machine learning and full-stack development. Built 8+ end-to-end projects spanning ML, data engineering, and web development.' },
  { icon: 'ti-trophy',      title: 'AWS Cloud Quest — Round 2', sub: 'Amazon Web Services Competition', date: '2024',
    desc: 'Advanced to Round 2 covering core AWS services, architecture design, EC2, S3, Lambda, and cloud-native deployment strategies.' },
  { icon: 'ti-certificate', title: 'Anthropic Claude 101 Certificate', sub: 'Skilljar — Anthropic', date: '2024',
    desc: 'Completed foundational certification in working with Claude AI models, prompt engineering, and responsible AI usage.' },
]

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)' }}>
      <div className="section-title">Education & Achievements</div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex', gap: 14, padding: '14px 0',
          borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius)',
            background: 'var(--bg2)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 16, color: 'var(--text2)', flexShrink: 0,
          }}>
            <i className={`ti ${item.icon}`} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{item.sub}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 5, lineHeight: 1.6 }}>{item.desc}</div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)', whiteSpace: 'nowrap' }}>{item.date}</div>
        </div>
      ))}
    </section>
  )
}
