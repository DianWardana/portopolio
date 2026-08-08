import { useEffect, useState } from 'react'
import { profile, ui } from '../data/content'
import { useScrollSpy, useTema } from '../lib/hooks'
import { Sun, Moon } from './Icons'

const ids = ui.nav.map((n) => n.id)

export default function StatusBar() {
  const aktif = useScrollSpy(ids)
  const [tema, gantiTema] = useTema()
  const [jam, setJam] = useState('')

  useEffect(() => {
    const perbarui = () => {
      try {
        setJam(
          new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: profile.zonaWaktu,
          }).format(new Date())
        )
      } catch {
        setJam('')
      }
    }
    perbarui()
    const t = setInterval(perbarui, 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="statusbar">
      <div className="wrap">
        <a href="#atas" className="brand">
          <span className="badge">{profile.inisial}</span>
          <span>{profile.nama}</span>
        </a>

        <div className="health">
          <span className="pulse" aria-hidden="true" />
          <span>semua layanan normal</span>
          {jam && <span style={{ color: 'var(--ink-faint)' }}>· {jam} WIB</span>}
        </div>

        <nav className="nav">
          {ui.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={aktif === n.id ? 'active' : ''}>
              {n.label}
            </a>
          ))}
        </nav>

        <button
          className="icon-btn"
          onClick={gantiTema}
          aria-label={tema === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
          title={tema === 'dark' ? 'Tema terang' : 'Tema gelap'}
        >
          {tema === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  )
}
