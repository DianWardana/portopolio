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
import { useT } from '../lib/i18n'
import { aset } from '../lib/aset'
import { Arrow, Terminal } from './Icons'

/* Perintah bawaan yang ditangani langsung oleh kode (bukan dari content.js) */
const PERINTAH_SISTEM = ['help', 'clear', 'goto', 'theme', 'lang', 'cv', 'date']

/* Chip perintah cepat — penting untuk pengunjung HP yang
 * tidak akan repot-repot mengetik di keyboard virtual. */
const CHIP = ['whoami', 'about', 'projects', 'skills', 'status', 'neofetch', 'contact']

const SEKSI_VALID = ['pipeline', 'status', 'arsitektur', 'stack', 'projects', 'pengalaman', 'kontak']

export default function ContactSection() {
  const [t, bahasa, gantiBahasa] = useT()
  const [, gantiTema, setTema] = useTema()

  const [baris, setBaris] = useState([])
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

  /* ---------- Sambutan awal, ikut bahasa aktif ---------- */
  useEffect(() => {
    antreanRef.current = []
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setBaris([
      {
        t: 'acc',
        v: `${profile.nama.toLowerCase().replace(/\s+/g, '-')} — ${
          bahasa === 'id' ? 'konsol portofolio' : 'portfolio console'
        }`,
      },
      {
        t: 'out',
        v:
          bahasa === 'id'
            ? 'Ketik "help" lalu Enter untuk melihat daftar perintah.'
            : 'Type "help" then Enter to list available commands.',
      },
      { t: 'out', v: '' },
    ])
  }, [bahasa])

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
        tulis(bahasa === 'id' ? 'Perintah yang tersedia:' : 'Available commands:', 'acc')
        tulis('')
        tulis(`  help              ${bahasa === 'id' ? 'tampilkan daftar ini' : 'show this list'}`)
        tulis(`  whoami            ${bahasa === 'id' ? 'identitas singkat' : 'quick identity'}`)
        tulis(`  about             ${bahasa === 'id' ? 'sedikit lebih panjang' : 'a little longer'}`)
        tulis(`  projects          ${bahasa === 'id' ? 'daftar project' : 'list projects'}`)
        tulis(`  skills            ${bahasa === 'id' ? 'daftar tools per kategori' : 'tools by category'}`)
        tulis(`  status            ${bahasa === 'id' ? 'ringkasan uptime & insiden' : 'uptime & incident summary'}`)
        tulis(`  uptime            ${bahasa === 'id' ? 'angka operasional' : 'operational numbers'}`)
        tulis(`  contact           ${bahasa === 'id' ? 'cara menghubungi saya' : 'how to reach me'}`)
        tulis(`  neofetch          ${bahasa === 'id' ? 'kartu profil ala terminal' : 'terminal-style profile card'}`)
        tulis(`  goto <section>    ${bahasa === 'id' ? 'lompat ke bagian halaman' : 'jump to a page section'}`)
        tulis(`  theme <dark|light> ${bahasa === 'id' ? 'ganti tema' : 'switch theme'}`)
        tulis(`  lang <id|en>      ${bahasa === 'id' ? 'ganti bahasa' : 'switch language'}`)
        tulis(`  date              ${bahasa === 'id' ? 'waktu lokal saya' : 'my local time'}`)
        tulis(`  clear             ${bahasa === 'id' ? 'kosongkan layar' : 'wipe the screen'}`)
        tulis('')
        tulis(
          bahasa === 'id'
            ? 'Tip: tekan Tab untuk melengkapi perintah.'
            : 'Tip: press Tab to autocomplete.',
          'ok'
        )
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- goto <section> --- */
      if (cmd === 'goto') {
        if (!arg) {
          tulis(`${bahasa === 'id' ? 'penggunaan' : 'usage'}: goto <${SEKSI_VALID.join('|')}>`, 'err')
        } else if (SEKSI_VALID.includes(arg)) {
          tulis(`${bahasa === 'id' ? 'menuju' : 'navigating to'} #${arg}...`, 'ok')
          setTimeout(() => gulirKe(arg), 260)
        } else {
          tulis(`${bahasa === 'id' ? 'bagian tidak dikenal' : 'unknown section'}: ${arg}`, 'err')
          tulis(`${bahasa === 'id' ? 'pilihan' : 'options'}: ${SEKSI_VALID.join(', ')}`)
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- theme --- */
      if (cmd === 'theme') {
        if (arg === 'dark' || arg === 'light') {
          setTema(arg)
          tulis(`${bahasa === 'id' ? 'tema diubah ke' : 'theme set to'} ${arg}`, 'ok')
        } else if (!arg) {
          gantiTema()
          tulis(bahasa === 'id' ? 'tema dibalik' : 'theme toggled', 'ok')
        } else {
          tulis(`${bahasa === 'id' ? 'penggunaan' : 'usage'}: theme <dark|light>`, 'err')
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- lang --- */
      if (cmd === 'lang') {
        if ((arg === 'id' || arg === 'en') && arg !== bahasa) {
          gantiBahasa()
          return
        }
        if (!arg) {
          gantiBahasa()
          return
        }
        tulis(`${bahasa === 'id' ? 'bahasa sudah' : 'language already'}: ${arg}`, 'ok')
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- cv --- */
      if (cmd === 'cv') {
        if (profile.cv) {
          tulis(bahasa === 'id' ? 'membuka CV...' : 'opening CV...', 'ok')
          window.open(aset(profile.cv), '_blank', 'noreferrer')
        } else {
          tulis(
            bahasa === 'id'
              ? 'CV belum diunggah. Pakai Ctrl+P untuk menyimpan halaman ini sebagai PDF.'
              : 'No CV uploaded yet. Use Ctrl+P to save this page as a PDF.',
            'ok'
          )
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- date --- */
      if (cmd === 'date') {
        try {
          tulis(
            new Intl.DateTimeFormat(bahasa === 'id' ? 'id-ID' : 'en-GB', {
              dateStyle: 'full',
              timeStyle: 'medium',
              timeZone: profile.zonaWaktu,
            }).format(new Date()) + ' (WIB)'
          )
        } catch {
          tulis(new Date().toString())
        }
        tulis('')
        tampilkan(keluaran)
        return
      }

      /* --- perintah dari content.js --- */
      const isiMentah = perintahTerminal[cmd]

      if (isiMentah === undefined) {
        tulis(`${bahasa === 'id' ? 'perintah tidak ditemukan' : 'command not found'}: ${cmd}`, 'err')
        tulis(
          bahasa === 'id'
            ? 'Ketik "help" untuk melihat yang tersedia.'
            : 'Type "help" to see what is available.'
        )
        tulis('')
        tampilkan(keluaran)
        return
      }

      if (isiMentah === 'PROJECTS') {
        tulis(`${bahasa === 'id' ? 'total' : 'total'} ${projects.length} project`, 'acc')
        tulis('')
        projects.forEach((p) => tulis(`  ${p.tahun}  ${p.status.padEnd(9)} ${t(p.judul)}`))
        tulis('')
        tulis(
          bahasa === 'id'
            ? 'Ketik "goto projects" untuk membuka detailnya.'
            : 'Type "goto projects" to open the details.',
          'ok'
        )
      } else if (isiMentah === 'STACK') {
        const per = {}
        stack.forEach((s) => {
          per[s.kategori] = per[s.kategori] || []
          per[s.kategori].push(s.nama)
        })
        Object.entries(per).forEach(([k, v]) => tulis(`  ${k.padEnd(15)} ${v.join(', ')}`))
      } else if (isiMentah === 'CONTACT') {
        tulis(`  email     ${profile.email}`)
        if (profile.github) tulis(`  github    ${profile.github}`)
        if (profile.linkedin) tulis(`  linkedin  ${profile.linkedin}`)
        tulis(`  ${bahasa === 'id' ? 'lokasi' : 'location'}    ${t(profile.lokasi)}`)
        tulis('')
        tulis(
          bahasa === 'id'
            ? 'Balasan biasanya di bawah 24 jam.'
            : 'I usually reply within 24 hours.',
          'ok'
        )
      } else if (isiMentah === 'STATUS') {
        tulis(bahasa === 'id' ? 'status layanan — 90 hari terakhir' : 'service status — last 90 days', 'acc')
        tulis('')
        layananStatus.forEach((l) => {
          const jml = l.insiden.length
          const tanda = jml === 0 ? 'ok ' : 'warn'
          tulis(
            `  [${tanda}] ${String(l.uptime).padEnd(6)} ${t(l.nama)}  (${jml} ${
              bahasa === 'id' ? 'insiden' : 'incidents'
            })`,
            jml === 0 ? 'ok' : 'out'
          )
        })
        tulis('')
        tulis(
          bahasa === 'id'
            ? 'Ketik "goto status" untuk membaca detail tiap insiden.'
            : 'Type "goto status" to read each incident in full.',
          'ok'
        )
      } else if (isiMentah === 'NEOFETCH') {
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
          `${bahasa === 'id' ? 'Peran' : 'Role'}      : System Administrator`,
          `${bahasa === 'id' ? 'Lokasi' : 'Location'}  : ${t(profile.lokasi)}`,
          `Uptime    : 5 ${bahasa === 'id' ? 'tahun' : 'years'}`,
          `Shell     : bash`,
          `OS        : Ubuntu Server 22.04 LTS`,
          `Stack     : ${stack.length} tools`,
          `Projects  : ${projects.length}`,
          `Email     : ${profile.email}`,
        ]
        const total = Math.max(seni.length, info.length)
        for (let i = 0; i < total; i += 1) {
          tulis(`${(seni[i] || ' '.repeat(13)).padEnd(15)}${info[i] || ''}`, i === 0 ? 'acc' : 'out')
        }
      } else {
        t(isiMentah).forEach((l) => tulis(l))
      }

      tulis('')
      tampilkan(keluaran)
    },
    [bahasa, gantiBahasa, gantiTema, setTema, t, tampilkan]
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
      setInput(cocok[0] + (cocok[0] === 'goto' || cocok[0] === 'theme' || cocok[0] === 'lang' ? ' ' : ''))
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
          <h2>{t(ui.kontakJudul)}</h2>
          <p>{t(ui.kontakDeskripsi)}</p>
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
                <span className="lbl">{bahasa === 'id' ? 'lokasi' : 'location'}</span>
                <span>{t(profile.lokasi)}</span>
              </div>
            </div>
          </div>

          <div className="term" data-reveal>
            <header>
              <Terminal width="13" height="13" />
              <span>{t(ui.label.konsolJudul)}</span>
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

        <div className="hint">{t(ui.label.hintTerminal)}</div>
      </div>
    </section>
  )
}
