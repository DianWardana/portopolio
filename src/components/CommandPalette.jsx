import { useEffect, useMemo, useRef, useState } from 'react'
import { profile, projects, ui } from '../data/content'
import { useKunciScroll, useTema } from '../lib/hooks'
import { useT } from '../lib/i18n'
import { Search, Arrow, Sun, Moon, Globe, Copy, Printer, Terminal } from './Icons'
import { aset } from '../lib/aset'

/* Palet perintah ala editor kode — Ctrl/Cmd + K.
 * Detail kecil, tapi langsung terbaca "orang ini kerja di terminal". */
export default function CommandPalette({ buka, tutup }) {
  const [t, bahasa, gantiBahasa] = useT()
  const [, gantiTema] = useTema()
  const [kueri, setKueri] = useState('')
  const [sorot, setSorot] = useState(0)
  const inputRef = useRef(null)
  const daftarRef = useRef(null)

  useKunciScroll(buka)

  const pergiKe = (id) => {
    tutup()
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const perintah = useMemo(() => {
    const nav = ui.nav.map((n) => ({
      grup: t(ui.label.buka),
      label: t(n.label),
      ikon: Arrow,
      jalan: () => pergiKe(n.id),
    }))

    const proyek = projects.map((p) => ({
      grup: t(ui.label.project),
      label: t(p.judul),
      catatan: p.tahun,
      ikon: Arrow,
      jalan: () => pergiKe('projects'),
    }))

    const aksi = [
      {
        grup: t(ui.label.tindakan),
        label: t(ui.label.temaTerang) + ' / ' + t(ui.label.temaGelap),
        ikon: Sun,
        jalan: () => {
          gantiTema()
          tutup()
        },
      },
      {
        grup: t(ui.label.tindakan),
        label: bahasa === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia',
        ikon: Globe,
        jalan: () => {
          gantiBahasa()
          tutup()
        },
      },
      {
        grup: t(ui.label.tindakan),
        label: t(ui.label.salinEmail),
        catatan: profile.email,
        ikon: Copy,
        jalan: async () => {
          try {
            await navigator.clipboard.writeText(profile.email)
          } catch {
            window.location.href = `mailto:${profile.email}`
          }
          tutup()
        },
      },
      {
        grup: t(ui.label.tindakan),
        label: t(ui.label.cetakCv),
        ikon: Printer,
        jalan: () => {
          tutup()
          setTimeout(() => window.print(), 200)
        },
      },
      {
        grup: t(ui.label.tindakan),
        label: bahasa === 'id' ? 'Buka konsol interaktif' : 'Open interactive console',
        ikon: Terminal,
        jalan: () => pergiKe('kontak'),
      },
    ]

    if (profile.cv) {
      aksi.push({
        grup: t(ui.label.tindakan),
        label: t(ui.hero.unduhCv),
        ikon: Arrow,
        jalan: () => {
          window.open(aset(profile.cv), '_blank', 'noreferrer')
          tutup()
        },
      })
    }

    return [...nav, ...proyek, ...aksi]
  }, [bahasa])

  const hasil = useMemo(() => {
    const q = kueri.trim().toLowerCase()
    if (!q) return perintah
    return perintah.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        (p.catatan || '').toLowerCase().includes(q) ||
        p.grup.toLowerCase().includes(q)
    )
  }, [kueri, perintah])

  useEffect(() => setSorot(0), [kueri])

  useEffect(() => {
    if (buka) {
      setKueri('')
      setSorot(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [buka])

  useEffect(() => {
    const el = daftarRef.current?.querySelector('.cmd-item.sorot')
    el?.scrollIntoView({ block: 'nearest' })
  }, [sorot])

  if (!buka) return null

  const onKey = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      tutup()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSorot((s) => (hasil.length ? (s + 1) % hasil.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSorot((s) => (hasil.length ? (s - 1 + hasil.length) % hasil.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      hasil[sorot]?.jalan()
    }
  }

  let grupTerakhir = null

  return (
    <div className="cmd" role="dialog" aria-modal="true" aria-label={t(ui.label.cariPerintah)}>
      <div className="cmd-tirai" onClick={tutup} />

      <div className="cmd-panel">
        <div className="cmd-input">
          <Search width="16" height="16" />
          <input
            ref={inputRef}
            value={kueri}
            onChange={(e) => setKueri(e.target.value)}
            onKeyDown={onKey}
            placeholder={t(ui.label.cariPerintah)}
            spellCheck="false"
            autoComplete="off"
            aria-label={t(ui.label.cariPerintah)}
          />
          <kbd className="mono">esc</kbd>
        </div>

        <div className="cmd-list" ref={daftarRef}>
          {hasil.length === 0 && (
            <div className="cmd-kosong mono">
              {bahasa === 'id' ? 'tidak ada hasil' : 'no results'}
            </div>
          )}

          {hasil.map((p, i) => {
            const Ikon = p.ikon
            const grupBaru = p.grup !== grupTerakhir
            grupTerakhir = p.grup
            return (
              <div key={p.label + i}>
                {grupBaru && <div className="cmd-grup eyebrow">{p.grup}</div>}
                <button
                  className={`cmd-item${i === sorot ? ' sorot' : ''}`}
                  onMouseEnter={() => setSorot(i)}
                  onClick={p.jalan}
                >
                  <Ikon width="14" height="14" />
                  <span className="cmd-label">{p.label}</span>
                  {p.catatan && <span className="cmd-catatan mono">{p.catatan}</span>}
                </button>
              </div>
            )
          })}
        </div>

        <footer className="cmd-foot mono">
          <span>↑↓ {bahasa === 'id' ? 'pilih' : 'navigate'}</span>
          <span>↵ {bahasa === 'id' ? 'buka' : 'open'}</span>
          <span>esc {bahasa === 'id' ? 'tutup' : 'close'}</span>
        </footer>
      </div>
    </div>
  )
}
