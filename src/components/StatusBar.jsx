import { profile, ui } from '../data/content'
import { useScrollSpy, useTema, useScrollProgress, useUptime } from '../lib/hooks'
import { Sun, Moon, Menu, Search } from './Icons'

const ids = ui.nav.map((n) => n.id)

export default function StatusBar({ onBukaMenu, onBukaPalette }) {
  const aktif = useScrollSpy(ids)
  const [tema, gantiTema] = useTema()
  const progres = useScrollProgress()
  const uptime = useUptime(profile.mulaiKarier)

  return (
    <div className="statusbar">
      <div className="wrap">
        <a href="#atas" className="brand">
          <span className="badge">{profile.inisial}</span>
          <span className="brand-nama">{profile.nama}</span>
        </a>

        {/* Indikator kesehatan + uptime karier yang berjalan hidup.
            Ditulis satu baris penuh (nowrap) supaya tidak pernah
            terpecah jadi beberapa baris di dalam bar setinggi 60px. */}
        <div className="health">
          <span className="pulse" aria-hidden="true" />
          <span className="health-teks">{ui.label.layananNormal}</span>
          {uptime && (
            <span className="uptime-live mono" title="uptime karier">
              {uptime}
            </span>
          )}
        </div>

        <nav className="nav" aria-label="Navigasi utama">
          {ui.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={aktif === n.id ? 'active' : ''}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="bar-aksi">
          <button
            className="icon-btn palette-btn"
            onClick={onBukaPalette}
            aria-label={ui.label.cariPerintah}
            title={`${ui.label.cariPerintah}  (Ctrl+K)`}
          >
            <Search width="16" height="16" />
            <span className="kbd-hint mono">Ctrl K</span>
          </button>

          <button
            className="icon-btn"
            onClick={gantiTema}
            aria-label={tema === 'dark' ? ui.label.temaTerang : ui.label.temaGelap}
            title={tema === 'dark' ? ui.label.temaTerang : ui.label.temaGelap}
          >
            {tema === 'dark' ? <Sun /> : <Moon />}
          </button>

          <button
            className="icon-btn menu-btn"
            onClick={onBukaMenu}
            aria-label={ui.label.menu}
            title={ui.label.menu}
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
