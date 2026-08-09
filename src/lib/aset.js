/* ============================================================
 *  HELPER PATH ASET
 * ============================================================
 *  Semua file di folder /public HARUS diakses lewat fungsi ini.
 *
 *  Kenapa? Karena situs ini di-deploy ke GitHub Pages dengan
 *  base '/portopolio/' (lihat vite.config.js). Kalau kamu tulis
 *  path absolut seperti '/icons/ruijie.svg', browser akan mencari
 *  di https://user.github.io/icons/ruijie.svg → 404.
 *
 *  Dengan aset('icons/ruijie.svg') hasilnya otomatis benar:
 *    dev      → /icons/ruijie.svg
 *    produksi → /portopolio/icons/ruijie.svg
 *
 *  Kalau suatu saat nama repo berubah, cukup ubah `base` di
 *  vite.config.js — semua path ikut menyesuaikan sendiri.
 * ============================================================ */

export function aset(path = '') {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/+$/, '')}/${String(path).replace(/^\/+/, '')}`
}
