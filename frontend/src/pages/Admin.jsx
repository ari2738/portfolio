import React, { useEffect, useState } from 'react'
import axios from 'axios'

const inputStyle = {
  width: '100%', padding: '8px 12px',
  border: '1px solid var(--border)', borderRadius: 'var(--radius)',
  fontSize: 13, background: 'var(--bg)', color: 'var(--text)',
  fontFamily: 'inherit', outline: 'none', marginBottom: 10,
}

const EMPTY_PROJECT = { name:'', description:'', tech_stack:'', category:'ML', status:'live', github_url:'', demo_url:'', icon:'folder', color:'blue' }

export default function Admin() {
  const [tab, setTab]           = useState('projects')
  const [projects, setProjects] = useState([])
  const [skills, setSkills]     = useState({})
  const [messages, setMessages] = useState([])
  const [form, setForm]         = useState(EMPTY_PROJECT)
  const [skillForm, setSkillForm] = useState({ name:'', category:'Machine Learning', level: 75 })
  const [toast, setToast]       = useState('')
  const [editing, setEditing]   = useState(null)

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  useEffect(() => { fetchAll() }, [])
  const fetchAll = () => {
    axios.get('/api/projects').then(r => setProjects(r.data))
    axios.get('/api/skills').then(r => setSkills(r.data))
    axios.get('/api/messages').then(r => setMessages(r.data))
  }

  const saveProject = async () => {
    if (!form.name || !form.description || !form.tech_stack) return showToast('Fill all required fields')
    if (editing) {
      await axios.put(`/api/projects/${editing}`, form)
      showToast('Project updated!')
      setEditing(null)
    } else {
      await axios.post('/api/projects', form)
      showToast('Project added!')
    }
    setForm(EMPTY_PROJECT)
    fetchAll()
  }

  const deleteProject = async id => {
    if (!confirm('Delete this project?')) return
    await axios.delete(`/api/projects/${id}`)
    showToast('Deleted'); fetchAll()
  }

  const editProject = p => {
    setEditing(p.id)
    setForm({ ...p, tech_stack: p.tech_stack.join(', ') })
    setTab('projects')
    window.scrollTo(0, 0)
  }

  const saveSkill = async () => {
    if (!skillForm.name) return showToast('Enter skill name')
    await axios.post('/api/skills', skillForm)
    showToast('Skill added!'); setSkillForm({ name:'', category:'Machine Learning', level: 75 }); fetchAll()
  }

  const deleteSkill = async id => {
    await axios.delete(`/api/skills/${id}`)
    showToast('Deleted'); fetchAll()
  }

  const deleteMessage = async id => {
    await axios.delete(`/api/messages/${id}`)
    showToast('Deleted'); fetchAll()
  }

  const labelStyle = { fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 4 }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 0 40px' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 24px', borderBottom:'1px solid var(--border)', position:'sticky', top:0, background:'var(--bg)', zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#378ADD' }} />
          <span style={{ fontSize:14, fontWeight:600 }}>Admin Panel</span>
        </div>
        <a href="/"><button className="btn-outline" style={{ fontSize:12, padding:'6px 14px' }}><i className="ti ti-arrow-left" /> View Portfolio</button></a>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', top:70, right:24, background:'#111', color:'#fff', fontSize:12, padding:'10px 16px', borderRadius:'var(--radius)', zIndex:999 }}>{toast}</div>
      )}

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, padding:'16px 24px 0', borderBottom:'1px solid var(--border)' }}>
        {['projects','skills','messages'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontSize:12, padding:'7px 16px', borderRadius:'var(--radius) var(--radius) 0 0',
            border:'1px solid var(--border)', borderBottom: tab===t ? '1px solid var(--bg)' : '1px solid var(--border)',
            background: tab===t ? 'var(--bg)' : 'var(--bg2)',
            color: tab===t ? 'var(--text)' : 'var(--text2)', fontWeight: tab===t ? 600 : 400, cursor:'pointer',
            marginBottom: tab===t ? '-1px' : 0,
          }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>

      <div style={{ padding:'24px' }}>

        {/* PROJECTS TAB */}
        {tab === 'projects' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            {/* Form */}
            <div>
              <div className="section-title">{editing ? 'Edit Project' : 'Add New Project'}</div>
              <label style={labelStyle}>Project name *</label>
              <input style={inputStyle} placeholder="BookNest" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />

              <label style={labelStyle}>Description *</label>
              <textarea style={{...inputStyle, resize:'none', height:70}} placeholder="What does this project do?" value={form.description} onChange={e => setForm({...form, description:e.target.value})} />

              <label style={labelStyle}>Tech stack * (comma separated)</label>
              <input style={inputStyle} placeholder="React, Flask, PostgreSQL" value={form.tech_stack} onChange={e => setForm({...form, tech_stack:e.target.value})} />

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select style={{...inputStyle, marginBottom:0}} value={form.category} onChange={e => setForm({...form, category:e.target.value})}>
                    <option>ML</option><option>Web</option><option>Data</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select style={{...inputStyle, marginBottom:0}} value={form.status} onChange={e => setForm({...form, status:e.target.value})}>
                    <option value="live">Live</option><option value="wip">In Progress</option>
                  </select>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:10 }}>
                <div>
                  <label style={labelStyle}>Color</label>
                  <select style={{...inputStyle, marginBottom:0}} value={form.color} onChange={e => setForm({...form, color:e.target.value})}>
                    {['blue','teal','amber','purple','coral'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Icon (Tabler name)</label>
                  <input style={{...inputStyle, marginBottom:0}} placeholder="folder" value={form.icon} onChange={e => setForm({...form, icon:e.target.value})} />
                </div>
              </div>

              <label style={{...labelStyle, marginTop:10}}>GitHub URL</label>
              <input style={inputStyle} placeholder="https://github.com/..." value={form.github_url} onChange={e => setForm({...form, github_url:e.target.value})} />

              <label style={labelStyle}>Demo URL</label>
              <input style={inputStyle} placeholder="https://yourproject.vercel.app" value={form.demo_url} onChange={e => setForm({...form, demo_url:e.target.value})} />

              <div style={{ display:'flex', gap:8 }}>
                <button className="btn-primary" onClick={saveProject}><i className="ti ti-check" /> {editing ? 'Update Project' : 'Add Project'}</button>
                {editing && <button className="btn-outline" onClick={() => { setEditing(null); setForm(EMPTY_PROJECT) }}>Cancel</button>}
              </div>
            </div>

            {/* Project list */}
            <div>
              <div className="section-title">All Projects ({projects.length})</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {projects.map(p => (
                  <div key={p.id} className="card" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:'var(--text2)', marginTop:2 }}>{p.category} · {p.status}</div>
                      <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{p.tech_stack.slice(0,3).join(', ')}</div>
                    </div>
                    <div style={{ display:'flex', gap:6 }}>
                      <button onClick={() => editProject(p)} style={{ fontSize:11, padding:'4px 10px', border:'1px solid var(--border)', borderRadius:'var(--radius)', background:'var(--bg)', cursor:'pointer' }}>
                        <i className="ti ti-edit" />
                      </button>
                      <button onClick={() => deleteProject(p.id)} style={{ fontSize:11, padding:'4px 10px', border:'1px solid #F09595', borderRadius:'var(--radius)', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer' }}>
                        <i className="ti ti-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {tab === 'skills' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            <div>
              <div className="section-title">Add Skill</div>
              <label style={labelStyle}>Skill name</label>
              <input style={inputStyle} placeholder="TensorFlow" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name:e.target.value})} />
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={skillForm.category} onChange={e => setSkillForm({...skillForm, category:e.target.value})}>
                <option>Machine Learning</option><option>Frontend</option><option>Backend</option><option>Database & Cloud</option>
              </select>
              <label style={labelStyle}>Level: {skillForm.level}%</label>
              <input type="range" min={10} max={100} step={5} value={skillForm.level} style={{ width:'100%', marginBottom:12 }}
                onChange={e => setSkillForm({...skillForm, level: parseInt(e.target.value)})} />
              <button className="btn-primary" onClick={saveSkill}><i className="ti ti-plus" /> Add Skill</button>
            </div>
            <div>
              <div className="section-title">All Skills</div>
              {Object.entries(skills).map(([cat, sks]) => (
                <div key={cat} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:'var(--text3)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.05em' }}>{cat}</div>
                  {sks.map(sk => (
                    <div key={sk.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid var(--border)' }}>
                      <span style={{ fontSize:12 }}>{sk.name} <span style={{ color:'var(--text3)' }}>({sk.level}%)</span></span>
                      <button onClick={() => deleteSkill(sk.id)} style={{ fontSize:11, padding:'3px 8px', border:'1px solid #F09595', borderRadius:'var(--radius)', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer' }}>
                        <i className="ti ti-trash" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {tab === 'messages' && (
          <div>
            <div className="section-title">Messages ({messages.length})</div>
            {messages.length === 0 ? (
              <div style={{ fontSize:13, color:'var(--text2)' }}>No messages yet.</div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {messages.map(m => (
                  <div key={m.id} className="card">
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600 }}>{m.name} <span style={{ fontWeight:400, color:'var(--text2)' }}>— {m.email}</span></div>
                        <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>{m.subject}</div>
                        <div style={{ fontSize:13, color:'var(--text)', marginTop:8, lineHeight:1.6 }}>{m.message}</div>
                        <div style={{ fontSize:11, color:'var(--text3)', marginTop:8 }}>{new Date(m.created_at).toLocaleString()}</div>
                      </div>
                      <button onClick={() => deleteMessage(m.id)} style={{ fontSize:11, padding:'4px 10px', border:'1px solid #F09595', borderRadius:'var(--radius)', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', flexShrink:0 }}>
                        <i className="ti ti-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
