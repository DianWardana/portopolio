import { createContext, useContext, useEffect, useState } from 'react'

/* ============================================================
 *  DUA BAHASA — INDONESIA / INGGRIS
 * ============================================================
 *  Cara pakai di content.js:
 *
 *    judul: 'Teks sama untuk dua bahasa'          → dipakai apa adanya
 *    judul: { id: 'Halo dunia', en: 'Hello world' } → ikut bahasa aktif
 *
 *  Kalau field `en` belum diisi, otomatis jatuh ke bahasa Indonesia.
 *  Jadi kamu bisa menerjemahkan sedikit-sedikit tanpa merusak situs.
 * ============================================================ */

const KonteksBahasa = createContext({ bahasa: 'id', gantiBahasa: () => {} })

function deteksiAwal() {
  if (typeof window === 'undefined') return 'id'
  try {
    const tersimpan = window.localStorage.getItem('bahasa')
    if (tersimpan === 'id' || tersimpan === 'en') return tersimpan
  } catch {
    /* localStorage bisa diblokir (Safari mode privat) — abaikan */
  }
  // Pengunjung dari luar negeri langsung dapat versi Inggris
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export function PenyediaBahasa({ children }) {
  const [bahasa, setBahasa] = useState(deteksiAwal)

  useEffect(() => {
    try {
      window.localStorage.setItem('bahasa', bahasa)
    } catch {
      /* diabaikan dengan sengaja */
    }
    document.documentElement.lang = bahasa
  }, [bahasa])

  const gantiBahasa = () => setBahasa((b) => (b === 'id' ? 'en' : 'id'))

  return (
    <KonteksBahasa.Provider value={{ bahasa, gantiBahasa }}>
      {children}
    </KonteksBahasa.Provider>
  )
}

/* Mengembalikan [t, bahasa, gantiBahasa]
 * t('teks')            → 'teks'
 * t({id:'a', en:'b'})  → 'a' atau 'b' sesuai bahasa aktif
 * t(['a','b'])         → array ikut diterjemahkan per item
 */
export function useT() {
  const { bahasa, gantiBahasa } = useContext(KonteksBahasa)

  const t = (nilai) => {
    if (nilai == null) return nilai
    if (Array.isArray(nilai)) return nilai.map(t)
    if (typeof nilai === 'object') {
      return nilai[bahasa] ?? nilai.id ?? nilai.en ?? ''
    }
    return nilai
  }

  return [t, bahasa, gantiBahasa]
}
