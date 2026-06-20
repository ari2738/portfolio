import React, { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus('error'); return
    }
    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
    fontSize: 13, background: 'var(--bg)', color: 'var(--text)',
    outline: 'none', fontFamily: 'inherit',
  }

  return (
    <section id="contact" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ padding: '28px', borderRight: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.4, marginBottom: 10 }}>
          Let's build something together
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 20 }}>
          Open to internship roles in ML engineering, full-stack development, or data engineering.
          Available from 2025. Always happy to connect and discuss ideas.
        </p>
        {[
          { icon: 'ti-mail',           label: 'Email',    val: 'shanmugamarigaran@gmail.com',        href: 'shanmugamarigaran@gmail.com' },
          { icon: 'ti-map-pin',        label: 'Location', val: 'Tiruvannamalai, Tamil Nadu, India', href: null },
          { icon: 'ti-brand-linkedin', label: 'LinkedIn', val: 'https://www.linkedin.com/in/abirami-shanmugam-7551a12b6',    href: 'https://www.linkedin.com/in/abirami-shanmugam-7551a12b6' },
          { icon: 'ti-brand-github',   label: 'GitHub',   val: 'https://github.com/ari2738',         href: 'https://github.com/ari2738' },
        ].map(c => (
          <div key={c.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 0', borderBottom: '1px solid var(--border)',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 'var(--radius)',
              background: 'var(--bg2)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 14, color: 'var(--text2)',
            }}>
              <i className={`ti ${c.icon}`} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{c.label}</div>
              {c.href
                ? <a href={c.href} style={{ fontSize: 13, color: 'var(--text)' }}>{c.val}</a>
                : <div style={{ fontSize: 13 }}>{c.val}</div>
              }
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '28px' }}>
        <div className="section-title">Send a message</div>

        {['name','email','subject'].map(field => (
          <div key={field} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input style={inputStyle} type={field === 'email' ? 'email' : 'text'}
              placeholder={field === 'name' ? 'John Smith' : field === 'email' ? 'john@company.com' : 'Internship opportunity'}
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })} />
          </div>
        ))}

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>Message</label>
          <textarea style={{ ...inputStyle, resize: 'none', height: 80 }}
            placeholder="Tell me about the role..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })} />
        </div>

        {status === 'success' && (
          <div style={{ fontSize: 12, color: 'var(--green)', background: 'var(--green-lt)', padding: '8px 12px', borderRadius: 'var(--radius)', marginBottom: 10 }}>
            Message sent successfully!
          </div>
        )}
        {status === 'error' && (
          <div style={{ fontSize: 12, color: '#A32D2D', background: '#FCEBEB', padding: '8px 12px', borderRadius: 'var(--radius)', marginBottom: 10 }}>
            Please fill all fields and try again.
          </div>
        )}

        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
          onClick={handleSubmit} disabled={loading}>
          <i className="ti ti-send" /> {loading ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </section>
  )
}
