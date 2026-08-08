import { useEffect, useRef, useState } from 'react'
import { profile, projects, stack, perintahTerminal, ui } from '../data/content'
import { Arrow, Terminal } from './Icons'

const sambutan = [
  { t: 'acc', v: `${profile.nama.toLowerCase().replace(/\s+/g, '-')} — konsol portofolio` },
  { t: 'out', v: 'Ketik "help" lalu Enter untuk melihat daftar perintah.' },
  { t: 'out', v: '' },
]

export default function ContactSection() {
  const [baris, setBaris] = useState(sambutan)
  const [input, setInput] = useState('')
  const [riwayat, setRiwayat] = useState([])
  const [posisi, setPosisi] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [baris])

  const daftarPerintah = ['help', 'clear', ...Object.keys(perintahTerminal)]

  const jalankan = (mentah) => {
    const cmd = mentah.trim().toLowerCase()
    if (!cmd) return
    setRiwayat((r) => [cmd, ...r])
    setPosisi(-1)

    const keluaran = []
    const tulis = (v, t = 'out') => keluaran.push({ t, v })

    if (cmd === 'clear') {
      setBaris([])
      return
    }

    if (cmd === 'help') {
      tulis('Perintah yang tersedia:', 'acc')
      daftarPerintah.forEach((c) => tulis(`  ${c}`))
      tulis('')
    } else if (perintahTerminal[cmd]) {
      const isi = perintahTerminal[cmd]

      if (isi === 'PROJECTS') {
        tulis(`total ${projects.length} project`, 'acc')
        projects.forEach((p) => tulis(`  ${p.tahun}  ${p.status.padEnd(9)} ${p.judul}`))
        tulis('')
        tulis('Gulir ke bagian Project untuk detailnya.', 'ok')
      } else if (isi === 'STACK') {
        const per = {}
        stack.forEach((s) => {
          per[s.kategori] = per[s.kategori] || []
          per[s.kategori].push(s.nama)
        })
        Object.entries(per).forEach(([k, v]) => tulis(`  ${k.padEnd(15)} ${v.join(', ')}`))
      } else if (isi === 'CONTACT') {
        tulis(`  email     ${profile.email}`)
        if (profile.github) tulis(`  github    ${profile.github}`)
        if (profile.linkedin) tulis(`  linkedin  ${profile.linkedin}`)
        tulis('')
        tulis('Balasan biasanya di bawah 24 jam.', 'ok')
      } else {
        isi.forEach((l) => tulis(l))
      }
      tulis('')
    } else {
      tulis(`perintah tidak ditemukan: ${cmd}`, 'err')
      tulis('Ketik "help" untuk melihat yang tersedia.')
      tulis('')
    }

    setBaris((b) => [...b, { t: 'cmd', v: cmd }, ...keluaran])
  }

  const onKey = (e) => {
    if (e.key === 'Enter') {
      jalankan(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const p = Math.min(posisi + 1, riwayat.length - 1)
      if (riwayat[p] !== undefined) {
        setPosisi(p)
        setInput(riwayat[p])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const p = posisi - 1
      setPosisi(p)
      setInput(p >= 0 ? riwayat[p] || '' : '')
    }
  }

  return (
    <section className="band" id="kontak">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">kontak</span>
          <h2>{ui.kontakJudul}</h2>
          <p>{ui.kontakDeskripsi}</p>
        </div>

        <div className="contact-grid">
          <div data-reveal>
            <div className="contact-links">
              <a className="clink" href={`mailto:${profile.email}`}>
                <span className="lbl">email</span>
                <span>{profile.email}</span>
                <Arrow className="arw" width="14" height="14" />
              </a>
              {profile.github && (
                <a className="clink" href={profile.github} target="_blank" rel="noreferrer">
                  <span className="lbl">github</span>
                  <span>{profile.github.replace(/^https?:\/\//, '')}</span>
                  <Arrow className="arw" width="14" height="14" />
                </a>
              )}
              {profile.linkedin && (
                <a className="clink" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <span className="lbl">linkedin</span>
                  <span>{profile.linkedin.replace(/^https?:\/\//, '')}</span>
                  <Arrow className="arw" width="14" height="14" />
                </a>
              )}
              <div className="clink" style={{ cursor: 'default' }}>
                <span className="lbl">lokasi</span>
                <span>{profile.lokasi}</span>
              </div>
            </div>
          </div>

          <div className="term" data-reveal>
            <header>
              <Terminal width="13" height="13" />
              <span>konsol — coba ketik sesuatu</span>
            </header>
            <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
              {baris.map((l, i) =>
                l.t === 'cmd' ? (
                  <div className="tline cmd" key={i}>
                    <span className="prompt">visitor@portfolio:~$ </span>
                    {l.v}
                  </div>
                ) : (
                  <div className={`tline ${l.t}`} key={i}>
                    {l.v || '\u00a0'}
                  </div>
                )
              )}
              <div className="tline term-input">
                <span className="prompt">visitor@portfolio:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck="false"
                  autoComplete="off"
                  aria-label="Masukkan perintah terminal"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hint">
          Tekan panah atas untuk mengulang perintah sebelumnya · "clear" untuk mengosongkan layar
        </div>
      </div>
    </section>
  )
}
