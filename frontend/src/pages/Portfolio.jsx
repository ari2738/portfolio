import React, { useState } from 'react'
import Navbar     from '../components/Navbar'
import Hero       from '../components/Hero'
import StatsBar   from '../components/StatsBar'
import Projects   from '../components/Projects'
import Skills     from '../components/Skills'
import Experience from '../components/Experience'
import Contact    from '../components/Contact'
import Footer     from '../components/Footer'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('Home')

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', border: '1px solid var(--border)', minHeight: '100vh' }}>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <StatsBar />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}
