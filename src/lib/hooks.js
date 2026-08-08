import { useEffect, useRef, useState } from 'react'

export const kurangGerak = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Menambahkan kelas .is-in ke semua elemen [data-reveal] saat masuk layar */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
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
  }, [])
}

/* Menandai menu navigasi sesuai bagian yang sedang dilihat */
export function useScrollSpy(ids) {
  const [aktif, setAktif] = useState(ids[0])
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
  }, [ids.join(',')])
  return aktif
}

/* Menghitung angka naik saat elemen terlihat */
export function useCountUp(target, { desimal = 0, durasi = 1100 } = {}) {
  const ref = useRef(null)
  const [nilai, setNilai] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (kurangGerak()) {
      setNilai(target)
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
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, desimal, durasi])
  return [ref, nilai]
}

/* Tema gelap / terang, tersimpan di localStorage */
export function useTema() {
  const [tema, setTema] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('tema') || 'dark'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('tema', tema)
  }, [tema])
  return [tema, () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))]
}
