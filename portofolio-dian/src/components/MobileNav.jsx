import { useEffect, useRef } from 'react'
import { profile, ui } from '../data/content'
import { useKunciScroll, useTema } from '../lib/hooks'
import { useT } from '../lib/i18n'
import { Close, Sun, Moon, Globe, Copy, Printer, Arrow } from './Icons'
import { aset } from '../lib/aset'

/* Menu navigasi untuk layar kecil.
 * Sebelumnya .nav di-hide di bawah 900px tanpa pengganti —
 * pengunjung HP tidak punya cara berpindah section sama sekali. */
export default function MobileNav({ buka, tutup, aktif }) {
  const [t, bahasa, gantiBahasa] = useT()
  const [tema, gantiTema] = useTema()
  const panelRef = useRef(null)

  useKunciScroll(buka)

  useEffect(() => {
    if (!buka) return
    const onKey = (e) => e.key === 'Escape' && tutup()
    window.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a, button')?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [buka, tutup])

  const pergiKe = (id) => {
    tutup()
    // beri waktu sheet menutup dulu supaya scroll tidak tersendat
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const salinEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
    tutup()
  }

  return (
    <div className={`sheet${buka ? ' open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!buka}>
      <div className="sheet-tirai" onClick={tutup} />

      <div className="sheet-panel" ref={panelRef}>
        <header className="sheet-head">
          <span className="eyebrow">{t(ui.label.menu)}</span>
          <button className="icon-btn" onClick={tutup} aria-label={t(ui.label.tutup)}>
            <Close />
          </button>
        </header>

        <nav className="sheet-nav">
          {ui.nav.map((n, i) => (
            <button
              key={n.id}
              className={`sheet-link${aktif === n.id ? ' active' : ''}`}
              onClick={() => pergiKe(n.id)}
            >
              <span className="mono num">{String(i + 1).padStart(2, '0')}</span>
              <span>{t(n.label)}</span>
              <Arrow className="arw" width="14" height="14" />
            </button>
          ))}
        </nav>

        <div className="sheet-aksi">
          <button className="btn" onClick={salinEmail}>
            <Copy width="14" height="14" />
            {t(ui.label.salinEmail)}
          </button>

          <button className="btn" onClick={gantiTema}>
            {tema === 'dark' ? <Sun width="14" height="14" /> : <Moon width="14" height="14" />}
            {tema === 'dark' ? t(ui.label.temaTerang) : t(ui.label.temaGelap)}
          </button>

          <button className="btn" onClick={gantiBahasa}>
            <Globe width="14" height="14" />
            {bahasa === 'id' ? 'English' : 'Indonesia'}
          </button>

          <button
            className="btn"
            onClick={() => {
              tutup()
              setTimeout(() => window.print(), 200)
            }}
          >
            <Printer width="14" height="14" />
            {t(ui.label.cetakCv)}
          </button>

          {profile.cv && (
            <a className="btn solid" href={aset(profile.cv)} target="_blank" rel="noreferrer">
              {t(ui.hero.unduhCv)}
            </a>
          )}
        </div>

        <footer className="sheet-foot mono">
          <span className="pulse" aria-hidden="true" />
          {t(ui.label.layananNormal)}
        </footer>
      </div>
    </div>
  )
}
