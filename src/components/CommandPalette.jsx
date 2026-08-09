import { useEffect, useMemo, useRef, useState } from 'react'
import { profile, projects, ui } from '../data/content'
import { useKunciScroll, useTema } from '../lib/hooks'
import { Search, Arrow, Sun, Copy, Terminal } from './Icons'
import { aset } from '../lib/aset'

/* Palet perintah ala editor kode — Ctrl/Cmd + K.
 * Detail kecil, tapi langsung terbaca "orang ini kerja di terminal". */
export default function CommandPalette({ buka, tutup }) {
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
      grup: ui.label.buka,
      label: n.label,
      ikon: Arrow,
      jalan: () => pergiKe(n.id),
    }))

    const proyek = projects.map((p) => ({
      grup: ui.label.project,
      label: p.judul,
      catatan: p.tahun,
      ikon: Arrow,
      jalan: () => pergiKe('projects'),
    }))

    const aksi = [
      {
        grup: ui.label.tindakan,
        label: 'Ganti tema terang / gelap',
        ikon: Sun,
        jalan: () => {
          gantiTema()
          tutup()
        },
      },
      {
        grup: ui.label.tindakan,
        label: ui.label.salinEmail,
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
        grup: ui.label.tindakan,
        label: 'Buka konsol interaktif',
        ikon: Terminal,
        jalan: () => pergiKe('kontak'),
      },
    ]

    if (profile.cv) {
      aksi.push({
        grup: ui.label.tindakan,
        label: ui.hero.unduhCv,
        ikon: Arrow,
        jalan: () => {
          window.open(aset(profile.cv), '_blank', 'noreferrer')
          tutup()
        },
      })
    }

    return [...nav, ...proyek, ...aksi]
  }, [])

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
    <div className="cmd" role="dialog" aria-modal="true" aria-label={ui.label.cariPerintah}>
      <div className="cmd-tirai" onClick={tutup} />

      <div className="cmd-panel">
        <div className="cmd-input">
          <Search width="16" height="16" />
          <input
            ref={inputRef}
            value={kueri}
            onChange={(e) => setKueri(e.target.value)}
            onKeyDown={onKey}
            placeholder={ui.label.cariPerintah}
            spellCheck="false"
            autoComplete="off"
            aria-label={ui.label.cariPerintah}
          />
          <kbd className="mono">esc</kbd>
        </div>

        <div className="cmd-list" ref={daftarRef}>
          {hasil.length === 0 && <div className="cmd-kosong mono">tidak ada hasil</div>}

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
          <span>↑↓ pilih</span>
          <span>↵ buka</span>
          <span>esc tutup</span>
        </footer>
      </div>
    </div>
  )
}
