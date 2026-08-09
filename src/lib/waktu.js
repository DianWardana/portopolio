/* ============================================================
 *  PERHITUNGAN DURASI KARIER
 * ============================================================
 *  Dipakai supaya angka lama bekerja di situs ini tidak pernah
 *  basi. Tanggal ditulis sekali di content.js, sisanya dihitung
 *  sendiri setiap halaman dibuka.
 * ============================================================ */

/* Selisih dua tanggal dalam bulan penuh.
 * `sampai` boleh dikosongkan — artinya "sampai hari ini". */
export function bulanAntara(mulai, sampai) {
  const a = new Date(mulai)
  const b = sampai ? new Date(sampai) : new Date()
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0

  let bulan = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  // Belum lewat tanggalnya di bulan berjalan → bulan itu belum genap
  if (b.getDate() < a.getDate()) bulan -= 1
  return Math.max(bulan, 0)
}

/* Tahun penuh saja, untuk angka besar di kartu metrik. */
export function tahunPenuh(mulai, sampai) {
  return Math.floor(bulanAntara(mulai, sampai) / 12)
}

/* Durasi ringkas dengan satu desimal, format Indonesia.
 *   69 bulan → '5,8'
 *   18 bulan → '1,5'
 *   24 bulan → '2'      (desimal nol dibuang supaya tidak jadi '2,0')
 */
export function tahunRingkas(mulai, sampai) {
  const nilai = bulanAntara(mulai, sampai) / 12
  const dibulatkan = Math.round(nilai * 10) / 10
  return Number.isInteger(dibulatkan)
    ? String(dibulatkan)
    : dibulatkan.toFixed(1).replace('.', ',')
}

/* Durasi panjang: '5 th 9 bln'. Dipakai kalau butuh lebih tepat. */
export function durasiPanjang(mulai, sampai) {
  const total = bulanAntara(mulai, sampai)
  const th = Math.floor(total / 12)
  const bl = total % 12
  const bagian = []
  if (th) bagian.push(`${th} th`)
  if (bl || !th) bagian.push(`${bl} bln`)
  return bagian.join(' ')
}
