import { useEffect, useState } from 'react'
import { profile, ui } from '../data/content'
import { useScrollSpy, useTema, useScrollProgress, useUptime } from '../lib/hooks'
import { useT } from '../lib/i18n'
import { Sun, Moon, Menu, Search, Globe } from './Icons'

const ids = ui.nav.map((n) => n.id)

export default function StatusBar({ onBukaMenu, onBukaPalette }) {
  const [t, bahasa, gantiBahasa] = useT()
  const aktif = useScrollSpy(ids)
  const [tema, gantiTema] = useTema()
  const progres = useScrollProgress()
  const uptime = useUptime(profile.mulaiKarier)
  const [jam, setJam] = useState('')

  useEffect(() => {
    const perbarui = () => {
      try {
        setJam(
          new Intl.DateTimeFormat(bahasa === 'id' ? 'id-ID' : 'en-GB', {
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
    const timer = setInterval(perbarui, 30000)
    return () => clearInterval(timer)
  }, [bahasa])

  return (
    <div className="statusbar">
      <div className="wrap">
        <a href="#atas" className="brand">
          <span className="badge">{profile.inisial}</span>
          <span className="brand-nama">{profile.nama}</span>
        </a>

        <div className="health">
          <span className="pulse" aria-hidden="true" />
          <span>{t(ui.label.layananNormal)}</span>
          {uptime && (
            <span className="uptime-live mono" title={t(ui.label.uptimeKarier)}>
              · {uptime}
            </span>
          )}
          {jam && <span className="jam">· {jam} WIB</span>}
        </div>

        <nav className="nav" aria-label="Navigasi utama">
          {ui.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={aktif === n.id ? 'active' : ''}>
              {t(n.label)}
            </a>
          ))}
        </nav>

        <div className="bar-aksi">
          <button
            className="icon-btn palette-btn"
            onClick={onBukaPalette}
            aria-label={t(ui.label.cariPerintah)}
            title={`${t(ui.label.cariPerintah)}  (Ctrl+K)`}
          >
            <Search width="16" height="16" />
            <span className="kbd-hint mono">⌘K</span>
          </button>

          <button
            className="icon-btn lang-btn"
            onClick={gantiBahasa}
            aria-label={t(ui.label.gantiBahasa)}
            title={t(ui.label.gantiBahasa)}
          >
            <Globe width="15" height="15" />
            <span className="mono">{bahasa === 'id' ? 'ID' : 'EN'}</span>
          </button>

          <button
            className="icon-btn"
            onClick={gantiTema}
            aria-label={tema === 'dark' ? t(ui.label.temaTerang) : t(ui.label.temaGelap)}
            title={tema === 'dark' ? t(ui.label.temaTerang) : t(ui.label.temaGelap)}
          >
            {tema === 'dark' ? <Sun /> : <Moon />}
          </button>

          <button
            className="icon-btn menu-btn"
            onClick={onBukaMenu}
            aria-label={t(ui.label.menu)}
            title={t(ui.label.menu)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Progres scroll — bergaya seperti progress bar deployment */}
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progres})` }} />
      </div>
    </div>
  )
}
