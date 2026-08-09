import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'
import { kurangGerak } from '../lib/hooks'

/* ============================================================
 *  LAYAR PEMBUKA
 * ============================================================
 *  Tiga aturan yang membuatnya membantu, bukan mengganggu:
 *
 *  1. Maksimal 1,2 detik lalu hilang sendiri. Tidak ada tombol
 *     yang harus diklik. Situs ini muat di bawah satu detik, jadi
 *     layar ini tidak boleh menciptakan penantian baru.
 *
 *  2. Sekali per sesi, bukan tiap muat ulang. Disimpan di
 *     sessionStorage — orang yang bolak-balik halaman tidak
 *     dipaksa menonton ulang. Terhapus sendiri saat tab ditutup.
 *
 *  3. Dilewati sepenuhnya kalau pengguna meminta gerak minimal.
 *
 *  Isi halaman tetap dirender di belakangnya sejak awal, jadi
 *  mesin pencari dan crawler tautan tetap membaca situs dengan
 *  utuh walau layar ini sedang tampil.
 * ============================================================ */

const KUNCI = 'pembuka-tampil'
const DURASI = 1900 // ms sebelum mulai memudar
const MEMUDAR = 500 // ms lama transisi memudar

export default function Pembuka() {
  const [tahap, setTahap] = useState('cek') // cek → tampil → memudar → selesai
  const [ketikan, setKetikan] = useState('')
  const timer = useRef([])

  const sapaan = `Hi, saya ${profile.nama.split(' ')[0]}`

  useEffect(() => {
    let lewati = false
    try {
      lewati = sessionStorage.getItem(KUNCI) === '1'
    } catch {
      /* sessionStorage bisa diblokir — anggap saja belum pernah tampil */
    }

    if (lewati || kurangGerak()) {
      setTahap('selesai')
      return
    }

    try {
      sessionStorage.setItem(KUNCI, '1')
    } catch {
      /* diabaikan dengan sengaja */
    }

    setTahap('tampil')
    document.body.style.overflow = 'hidden'

    /* Ketik satu per satu. Waktunya diatur supaya sapaan sudah utuh
       jauh sebelum layar mulai memudar — kalau huruf terakhir baru
       muncul di detik terakhir, orang tidak sempat membacanya. */
    const MULAI_KETIK = 180
    const jedaHuruf = Math.min(40, (DURASI - 600) / sapaan.length)
    sapaan.split('').forEach((_, i) => {
      timer.current.push(
        setTimeout(() => setKetikan(sapaan.slice(0, i + 1)), MULAI_KETIK + i * jedaHuruf)
      )
    })

    timer.current.push(setTimeout(() => setTahap('memudar'), DURASI))
    timer.current.push(
      setTimeout(() => {
        setTahap('selesai')
        document.body.style.overflow = ''
      }, DURASI + MEMUDAR)
    )

    return () => {
      timer.current.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [sapaan])

  if (tahap === 'selesai' || tahap === 'cek') return null

  return (
    <div
      className={`pembuka${tahap === 'memudar' ? ' memudar' : ''}`}
      // Disembunyikan dari pembaca layar: isinya cuma sapaan hiasan,
      // dan halaman aslinya sudah ada di belakang.
      aria-hidden="true"
    >
      <div className="pembuka-kartu">
        <p className="pembuka-teks">
          {ketikan}
          <span className="pembuka-kursor" />
        </p>
      </div>
    </div>
  )
}
