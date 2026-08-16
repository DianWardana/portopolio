import { useCallback, useEffect, useRef, useState } from 'react'
import {
  profile,
  projects,
  stack,
  layananStatus,
  perintahTerminal,
  ui,
} from '../data/content'
import { kurangGerak, useTema } from '../lib/hooks'
import { aset } from '../lib/aset'
import { Arrow, Terminal } from './Icons'

/**
 * ========================================================
 * TECH STACK - Updated 2026
 * ========================================================
 * Frontend: React + Vite (this component)
 * Backend: CodeIgniter 4 (PHP 8.2+)
 * Infrastructure: Nginx + Ubuntu Server 22.04
 * Database: MySQL 8.0
 * Security: HTTPS + AES-256 Encryption
 * ========================================================
 * 
 * 🔧 BUG FIX: Console text visibility on light mode
 * ✅ Fixed: CSS variables updated in styles.css
 * ✅ Terminal text now clearly visible in both modes
 * ========================================================
 */

/* Perintah bawaan yang ditangani langsung oleh kode (bukan dari content.js) */
const PERINTAH_SISTEM = ['help', 'clear', 'goto', 'theme', 'cv', 'date']

/* Chip perintah cepat — penting untuk pengunjung HP yang
 * tidak akan repot-repot mengetik di keyboard virtual. */
const CHIP = ['whoami', 'about', 'projects', 'skills', 'status', 'neofetch', 'contact']

const SEKSI_VALID = ['pipeline', 'status', 'arsitektur', 'stack', 'projects', 'pengalaman', 'kontak']

const SAMBUTAN = [
  {
    t: 'acc',
    v: `${profile.nama.toLowerCase().replace(/\s+/g, '-')} — konsol portofolio`,
  },
  { t: 'out', v: 'Ketik "help" lalu Enter untuk melihat daftar perintah.' },
  { t: 'out', v: '' },
]

/* Lama berkarier dalam tahun, dihitung dari profile.mulaiKarier.
 * Dibuat otomatis supaya angkanya tidak basi tiap ganti tahun. */
function tahunKarier() {
  const a = new Date(profile.mulaiKarier)
  if (Number.isNaN(a.getTime())) return 0
  const b = new Date()
  let n = b.getFullYear() - a.getFullYear()
  const belumUlangTahun =
    b.getMonth() < a.getMonth() ||
    (b.getMonth() === a.getMonth() && b.getDate() < a.getDate())
  if (belumUlangTahun) n -= 1
  return Math.max(n, 0)
}

export default function ContactSection() {
  const [, gantiTema, setTema] = useTema()

  const [baris, setBaris] = useState(SAMBUTAN)
  const [input, setInput] = useState('')
  const [riwayat, setRiwayat] = useState([])
  const [posisi, setPosisi] = useState(-1)
  const [mengetik, setMengetik] = useState(false)

  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const antreanRef = useRef([])
  const timerRef = useRef(null)
  const sudahDeepLink = useRef(false)

  const daftarPerintah = [...new Set([...PERINTAH_SISTEM, ...Object.keys(perintahTerminal)])].sort()

  /* ---------- Menampilkan output baris demi baris (efek ketik) ---------- */
  const tampilkan = useCallback((keluaran) => {
    if (kurangGerak()) {
      setBaris((b) => [...b, ...keluaran])
      return
    }
    antreanRef.current = [...antreanRef.current, ...keluaran]
    if (timerRef.current) return

    setMengetik(true)
    const tick = () => {
      const berikut = antreanRef.current.shift()
      if (!berikut) {
        timerRef.current = null
        setMengetik(false)
        return
      }
      setBaris((b) => [...b, berikut])
      timerRef.current = setTimeout(tick, berikut.v ? 45 : 20)
    }
    timerRef.current = setTimeout(tick, 40)
  }, [])

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current)
  }, [])

  /* Selalu gulir ke bawah saat ada baris baru */
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [baris])

  const gulirKe = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* ---------- Mesin perintah ---------- */
  const jalankan = useCallback(
    (mentah) => {
      const utuh = mentah.trim()
      if (!utuh) return

      const [cmd, ...argumen] = utuh.toLowerCase().split(/\s+/)
      const arg = argumen.join(' ')

      setRiwayat((r) => [utuh, ...r])
      setPosisi(-1)
      setBaris((b) => [...b, { t: 'cmd', v: utuh }])

      const keluaran = []
      const tulis = (v, tipe = 'out') => keluaran.push({ t: tipe, v })

      /* --- clear --- */
      if (cmd === 'clear') {
        antreanRef.current = []
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        setMengetik(false)
        setBaris([])
        return
      }

      /* --- help --- */
      if (cmd === 'help') {
        tulis('Perintah yang tersedia:', 'acc')
        tulis('')
        tulis('  help               tampilkan daftar ini')
        tulis('  whoami             identitas singkat')
        tulis('  about              sedikit lebih panjang')
        tulis('  projects           daftar project')
        tulis('  skills             daftar tools per kategori')
        tulis('  status             ringkasan uptime & insiden')
        tulis('  uptime             angka operasional')
        tulis('  contact            cara menghubungi saya')
        tulis('  neofetch           kartu profil ala terminal')
        tulis('  goto <bagian>      lompat ke bagian halaman')
        tulis('  theme <dark|light> ganti tema')
        tulis('  cv                 buka berkas CV')
        tulis('  date               waktu lokal saya')
        tulis('  clear              kosongkan layar')
        tulis('')
        tulis('Tip: tekan Tab untuk melengkapi perintah.', 'ok')
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- goto <bagian> --- */
      if (cmd === 'goto') {
        if (!arg) {
          tulis(`penggunaan: goto <${SEKSI_VALID.join('|')}>`, 'err')
        } else if (SEKSI_VALID.includes(arg)) {
          tulis(`menuju #${arg}...`, 'ok')
          setTimeout(() => gulirKe(arg), 260)
        } else {
          tulis(`bagian tidak dikenal: ${arg}`, 'err')
          tulis(`pilihan: ${SEKSI_VALID.join(', ')}`)
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- theme --- */
      if (cmd === 'theme') {
        if (arg === 'dark' || arg === 'light') {
          setTema(arg)
          tulis(`tema diubah ke ${arg}`, 'ok')
        } else if (!arg) {
          gantiTema()
          tulis('tema dibalik', 'ok')
        } else {
          tulis('penggunaan: theme <dark|light>', 'err')
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- cv --- */
      if (cmd === 'cv') {
        if (profile.cv) {
          tulis('membuka CV...', 'ok')
          window.open(aset(profile.cv), '_blank', 'noreferrer')
        } else {
          tulis('CV belum diunggah. Hubungi saya lewat email untuk memintanya.', 'ok')
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- date --- */
      if (cmd === 'date') {
        try {
          tulis(
            new Intl.DateTimeFormat('id-ID', {
              dateStyle: 'full',
              timeStyle: 'medium',
              timeZone: profile.zonaWaktu,
            }).format(new Date()) + ' WIB'
          )
        } catch {
          tulis(new Date().toString())
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- perintah dari content.js --- */
      const isi = perintahTerminal[cmd]

      if (isi === undefined) {
        tulis(`perintah tidak ditemukan: ${cmd}`, 'err')
        tulis('Ketik "help" untuk melihat yang tersedia.')
        tulis('')
        tampilkan(keluaran)
        return
      }

      if (isi === 'PROJECTS') {
        tulis(`total ${projects.length} project`, 'acc')
        tulis('')
        projects.forEach((p) => tulis(`  ${p.tahun}  ${p.status.padEnd(9)} ${p.judul}`))
        tulis('')
        tulis('Ketik "goto projects" untuk membuka detailnya.', 'ok')
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
        tulis(`  lokasi    ${profile.lokasi}`)
        tulis('')
        tulis('Balasan biasanya di bawah 24 jam.', 'ok')
      } else if (isi === 'STATUS') {
        tulis('status layanan — 90 hari terakhir', 'acc')
        tulis('')
        layananStatus.forEach((l) => {
          const jml = l.insiden.length
          const tanda = jml === 0 ? 'ok  ' : 'warn'
          tulis(`  [${tanda}] ${String(l.uptime).padEnd(6)} ${l.nama}  (${jml} insiden)`,
            jml === 0 ? 'ok' : 'out')
        })
        tulis('')
        tulis('Ketik "goto status" untuk membaca detail tiap insiden.', 'ok')
      } else if (isi === 'NEOFETCH') {
        const seni = [
          '     ___     ',
          '    /   \\    ',
          '   | o o |   ',
          '   |  ^  |   ',
          '   | \\_/ |   ',
          '    \\___/    ',
        ]
        const info = [
          `${profile.nama}`,
          '─'.repeat(28),
          `Peran     : System Administrator`,
          `Lokasi    : ${profile.lokasi}`,
          `Uptime    : ${tahunKarier()} tahun`,
          `Shell     : bash`,
          `OS        : Ubuntu Server 22.04 LTS`,
          `Stack     : ${stack.length} tools`,
          `Project   : ${projects.length}`,
          `Email     : ${profile.email}`,
        ]
        const total = Math.max(seni.length, info.length)
        for (let i = 0; i < total; i += 1) {
          tulis(`${(seni[i] || ' '.repeat(13)).padEnd(15)}${info[i] || ''}`, i === 0 ? 'acc' : 'out')
        }
      } else {
        isi.forEach((l) => tulis(l))
      }

      tulis('')
      tampilkan(keluaran)
    },
    [gantiTema, setTema, tampilkan]
  )

  /* ---------- Deep link: ?cmd=whoami ---------- */
  useEffect(() => {
    if (sudahDeepLink.current) return
    const params = new URLSearchParams(window.location.search)
    const cmd = params.get('cmd')
    if (!cmd) return
    sudahDeepLink.current = true
    setTimeout(() => {
      gulirKe('kontak')
      setTimeout(() => jalankan(cmd), 500)
    }, 700)
  }, [jalankan])

  /* ---------- Autocomplete dengan Tab ---------- */
  const lengkapi = () => {
    const parsial = input.trim().toLowerCase()
    if (!parsial || parsial.includes(' ')) return

    const cocok = daftarPerintah.filter((c) => c.startsWith(parsial))
    if (cocok.length === 1) {
      const perlu = cocok[0] === 'goto' || cocok[0] === 'theme'
      setInput(cocok[0] + (perlu ? ' ' : ''))
    } else if (cocok.length > 1) {
      setBaris((b) => [
        ...b,
        { t: 'cmd', v: input },
        { t: 'out', v: cocok.join('   ') },
        { t: 'out', v: '' },
      ])
      // isi bagian awal yang sama untuk semua kandidat
      let prefiks = cocok[0]
      cocok.forEach((c) => {
        while (!c.startsWith(prefiks)) prefiks = prefiks.slice(0, -1)
      })
      setInput(prefiks)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') {
      jalankan(input)
      setInput('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      lengkapi()
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
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setBaris([])
    }
  }

  const klikChip = (cmd) => {
    jalankan(cmd)
    inputRef.current?.focus()
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
              <span>{ui.label.konsolJudul}</span>
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
                  autoCapitalize="off"
                  autoCorrect="off"
                  aria-label="Masukkan perintah terminal"
                />
                {mengetik && <span className="term-busy mono">…</span>}
              </div>
            </div>

            {/* Chip perintah cepat — supaya terminal tetap berguna di HP */}
            <div className="term-chips">
              {CHIP.map((c) => (
                <button key={c} className="term-chip mono" onClick={() => klikChip(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hint">{ui.label.hintTerminal}</div>
      </div>
    </section>
  )
}
