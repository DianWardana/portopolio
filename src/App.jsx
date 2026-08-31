import { useCallback, useEffect, useState } from 'react'
import { profile, ui } from './data/content'
import { useReveal, useScrollSpy } from './lib/hooks'

import Pembuka from './components/Pembuka'
import StatusBar from './components/StatusBar'
import MobileNav from './components/MobileNav'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import PipelineSection from './components/PipelineSection'
import StatusSection from './components/StatusSection'
import TopologySection from './components/TopologySection'
import StackSection from './components/StackSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'

const ids = ui.nav.map((n) => n.id)

export default function App() {
  const aktif = useScrollSpy(ids)

  const [menuBuka, setMenuBuka] = useState(false)
  const [paletteBuka, setPaletteBuka] = useState(false)

  /* Jembatan Stack → Project: klik ikon tool memfilter daftar project */
  const [tagLuar, setTagLuar] = useState(null)
  const [asalFilter, setAsalFilter] = useState(null)

  useReveal()

  const pilihDariStack = useCallback((tag, namaTool) => {
    if (!tag) return
    setTagLuar(tag)
    setAsalFilter(namaTool)
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }, [])

  const resetFilter = useCallback(() => {
    setTagLuar(null)
    setAsalFilter(null)
  }, [])

  /* Pintasan papan ketik global */
  useEffect(() => {
    const onKey = (e) => {
      const diInput = ['INPUT', 'TEXTAREA'].includes(e.target?.tagName)

      // Ctrl/Cmd + K → command palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteBuka((v) => !v)
        setMenuBuka(false)
        return
      }
      // "/" sebagai pintasan cepat, kecuali sedang mengetik di kolom isian
      if (e.key === '/' && !diInput && !paletteBuka) {
        e.preventDefault()
        setPaletteBuka(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteBuka])

  return (
    <>
      <Pembuka />

      <a className="skip" href="#pipeline">
        {ui.label.lewati}
      </a>

      <StatusBar
        onBukaMenu={() => setMenuBuka(true)}
        onBukaPalette={() => setPaletteBuka(true)}
      />

      <MobileNav buka={menuBuka} tutup={() => setMenuBuka(false)} aktif={aktif} />

      <CommandPalette buka={paletteBuka} tutup={() => setPaletteBuka(false)} />

      <main>
        <Hero />
        <Metrics />
        <ProjectsSection tagLuar={tagLuar} asalFilter={asalFilter} resetFilter={resetFilter} />
        <PipelineSection />
        <StatusSection />
        <TopologySection />
        <div className="wrap stack-experience-grid">
          <StackSection compact onPilihTag={pilihDariStack} />
          <ExperienceSection compact />
        </div>
        <ContactSection />
      </main>

      <footer className="foot">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {profile.nama}
          </span>
          <span>{ui.footer}</span>
        </div>
      </footer>
    </>
  )
}
