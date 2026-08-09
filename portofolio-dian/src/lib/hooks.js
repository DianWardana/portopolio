import { useCallback, useEffect, useRef, useState } from 'react'

export const kurangGerak = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------
 *  Menambahkan kelas .is-in ke semua elemen [data-reveal]
 *  saat elemen masuk layar. Dipanggil ulang tiap kali bahasa
 *  atau jumlah section berubah lewat `kunci`.
 * ---------------------------------------------------------- */
export function useReveal(kunci = '') {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]:not(.is-in)')
    if (kurangGerak()) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [kunci])
}

/* ------------------------------------------------------------
 *  Menandai menu navigasi sesuai bagian yang sedang dilihat
 * ---------------------------------------------------------- */
export function useScrollSpy(ids) {
  const [aktif, setAktif] = useState(ids[0])
  const kunci = ids.join(',')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const terlihat = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (terlihat) setAktif(terlihat.target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.05, 0.3] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [kunci])

  return aktif
}

/* ------------------------------------------------------------
 *  Menghitung angka naik saat elemen terlihat
 * ---------------------------------------------------------- */
export function useCountUp(target, { desimal = 0, durasi = 1100 } = {}) {
  const ref = useRef(null)
  const [nilai, setNilai] = useState(0)
  const [sudah, setSudah] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (kurangGerak()) {
      setNilai(target)
      setSudah(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const mulai = performance.now()
        const tick = (now) => {
          const p = Math.min((now - mulai) / durasi, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setNilai(Number((target * eased).toFixed(desimal)))
          if (p < 1) requestAnimationFrame(tick)
          else setSudah(true)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, desimal, durasi])

  return [ref, nilai, sudah]
}

/* ------------------------------------------------------------
 *  Tema gelap / terang, tersimpan di localStorage.
 *  Kalau belum pernah dipilih, ikut preferensi sistem.
 *
 *  Memakai satu store bersama di level modul, bukan useState
 *  per komponen. Tema dipakai di status bar, menu mobile,
 *  command palette, dan terminal — kalau tiap komponen punya
 *  state sendiri, mereka jadi tidak sinkron: mengubah tema di
 *  navbar tidak akan terbaca oleh tombol di menu mobile.
 * ---------------------------------------------------------- */
function bacaTemaAwal() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const tersimpan = window.localStorage.getItem('tema')
    if (tersimpan === 'dark' || tersimpan === 'light') return tersimpan
  } catch {
    /* Safari mode privat memblokir localStorage — jangan sampai crash */
  }
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

let temaSaatIni = bacaTemaAwal()
const pendengarTema = new Set()

function terapkanTema(nilai) {
  if (nilai !== 'dark' && nilai !== 'light') return
  temaSaatIni = nilai
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', nilai)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', nilai === 'dark' ? '#0d141c' : '#eef1f5')
  }
  try {
    window.localStorage.setItem('tema', nilai)
  } catch {
    /* mode privat / storage diblokir — abaikan saja */
  }
  pendengarTema.forEach((fn) => fn(nilai))
}

// Terapkan sedini mungkin supaya tidak ada kedipan tema saat halaman dibuka
if (typeof document !== 'undefined') terapkanTema(temaSaatIni)

export function useTema() {
  const [tema, setTemaLokal] = useState(temaSaatIni)

  useEffect(() => {
    pendengarTema.add(setTemaLokal)
    setTemaLokal(temaSaatIni) // samakan kalau sempat berubah sebelum mount
    return () => pendengarTema.delete(setTemaLokal)
  }, [])

  const set = useCallback((nilai) => terapkanTema(nilai), [])
  const ganti = useCallback(
    () => terapkanTema(temaSaatIni === 'dark' ? 'light' : 'dark'),
    []
  )

  return [tema, ganti, set]
}

/* ------------------------------------------------------------
 *  Progres scroll halaman, 0 → 1.
 *  Dipakai untuk bar tipis di bawah status bar.
 * ---------------------------------------------------------- */
export function useScrollProgress() {
  const [progres, setProgres] = useState(0)

  useEffect(() => {
    let frame = 0
    const hitung = () => {
      frame = 0
      const doc = document.documentElement
      const bisaScroll = doc.scrollHeight - doc.clientHeight
      setProgres(bisaScroll > 0 ? Math.min(doc.scrollTop / bisaScroll, 1) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(hitung)
    }
    hitung()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return progres
}

/* ------------------------------------------------------------
 *  Penghitung "uptime karier" yang berjalan hidup.
 *  Format: 5t 213h 07:42:19
 * ---------------------------------------------------------- */
export function useUptime(sejak) {
  const [teks, setTeks] = useState('')

  useEffect(() => {
    const awal = new Date(sejak).getTime()
    if (Number.isNaN(awal)) return

    const format = () => {
      const detikTotal = Math.max(0, Math.floor((Date.now() - awal) / 1000))
      const tahun = Math.floor(detikTotal / 31557600)
      const sisa = detikTotal - tahun * 31557600
      const hari = Math.floor(sisa / 86400)
      const jam = Math.floor((sisa % 86400) / 3600)
      const menit = Math.floor((sisa % 3600) / 60)
      const detik = sisa % 60
      const pad = (n) => String(n).padStart(2, '0')
      setTeks(`${tahun}t ${hari}h ${pad(jam)}:${pad(menit)}:${pad(detik)}`)
    }

    format()
    const timer = setInterval(format, 1000)
    return () => clearInterval(timer)
  }, [sejak])

  return teks
}

/* ------------------------------------------------------------
 *  Efek mesin ketik. Menghormati prefers-reduced-motion:
 *  kalau pengguna minta gerak minimal, teks langsung penuh.
 * ---------------------------------------------------------- */
export function useTypewriter(teks, { kecepatan = 26, jeda = 400, aktif = true } = {}) {
  const [keluar, setKeluar] = useState('')
  const [selesai, setSelesai] = useState(false)

  useEffect(() => {
    const isi = String(teks || '')
    if (!aktif || kurangGerak()) {
      setKeluar(isi)
      setSelesai(true)
      return
    }

    setKeluar('')
    setSelesai(false)
    let i = 0
    let timer
    let mulai

    const ketik = () => {
      i += 1
      setKeluar(isi.slice(0, i))
      if (i < isi.length) {
        timer = setTimeout(ketik, kecepatan)
      } else {
        setSelesai(true)
      }
    }

    mulai = setTimeout(ketik, jeda)
    return () => {
      clearTimeout(mulai)
      clearTimeout(timer)
    }
  }, [teks, kecepatan, jeda, aktif])

  return [keluar, selesai]
}

/* ------------------------------------------------------------
 *  Mendeteksi lebar layar (untuk navigasi mobile)
 * ---------------------------------------------------------- */
export function useMediaQuery(query) {
  const [cocok, setCocok] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const ubah = (e) => setCocok(e.matches)
    setCocok(mq.matches)
    mq.addEventListener('change', ubah)
    return () => mq.removeEventListener('change', ubah)
  }, [query])

  return cocok
}

/* ------------------------------------------------------------
 *  Mengunci scroll body (dipakai saat menu mobile / palette buka)
 * ---------------------------------------------------------- */
export function useKunciScroll(aktif) {
  useEffect(() => {
    if (!aktif) return
    const asli = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = asli
    }
  }, [aktif])
}
