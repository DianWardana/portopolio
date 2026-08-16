# Perbaikan Portofolio — 16 Agustus 2026

Tiga hal yang kamu laporkan sudah diperbaiki. Paket ini hanya berisi berkas yang
benar-benar berubah, dengan struktur folder yang sama seperti project-mu, jadi bisa
langsung ditimpa.

## Cara pakai

```bash
unzip portfolio-fix-2026.zip
cd portfolio-fix-2026
cp -r src/*    /path/ke/portofolio-dian/src/
cp -r public/* /path/ke/portofolio-dian/public/
```

Lalu:

```bash
npm run dev
```

Sudah saya build di sini dan lolos tanpa error (`vite build`, 49 modul).

---

## 1. Konsol tema terang — teks tidak terlihat

**Penyebabnya bukan yang saya kira sebelumnya.** Baris output (`.tline`) memang sudah
diperbaiki di paket lalu, tapi yang tidak terlihat di screenshot-mu adalah **teks yang
kamu ketik sendiri** — elemen `<input>`-nya.

Di `styles.css` baris ~1392:

```css
.term-input input {
  color: var(--ink);   /* ← ini masalahnya */
}
```

Di tema terang `--ink` bernilai `#0b141c` (nyaris hitam), sementara badan terminal
sengaja tetap gelap (`#0f1922`). Hitam di atas hitam — hilang.

Perbaikannya mematok warna input secara eksplisit, karena terminal selalu gelap di
kedua tema:

```css
[data-theme='light'] .term-input input {
  color: #e9eef4;
  -webkit-text-fill-color: #e9eef4;  /* Safari/iOS mengabaikan color pada input */
  caret-color: #3fbf87;
}
```

Saya juga menimpa `--ink`, `--ink-dim`, dan `--ink-faint` di dalam `.term-body` supaya
elemen apa pun yang ditambahkan ke terminal nanti ikut aman tanpa perlu ditambal satu
per satu. `color-scheme: dark` ditambahkan agar scrollbar bawaan peramban ikut gelap.

## 2. Logo Nginx, PHP, dan CodeIgniter

Ikon diambil dari Simple Icons lewat `ICON_MAP` di `StackSection.jsx`. Tool baru yang
kemarin ditambahkan ke `content.js` belum punya entri di sana, jadi komponen jatuh ke
placeholder dua huruf — itulah "NG", "PH", "CO" yang kamu lihat.

Tiga entri ditambahkan:

```js
nginx: si('nginx', '009639'),
'php 8.2+': { gelap: si('php', 'A9B4E0'), terang: si('php', '777BB4') },
'codeigniter 4': si('codeigniter', 'EF4223'),
```

PHP dibuat dua versi warna mengikuti pola yang sudah ada di berkas itu: ungu resminya
(`#777BB4`) cukup gelap dan kurang menonjol di atas latar tema gelap.

Kunci di `ICON_MAP` harus **persis sama** dengan `nama` di `content.js` (huruf kecil).
Jadi kalau nanti kamu mengubah `'PHP 8.2+'` menjadi `'PHP 8'`, entri ikonnya perlu ikut
diubah, kalau tidak placeholder-nya muncul lagi.

## 3. Project Backup Panel belum muncul

Memang belum pernah ditambahkan ke array `projects` — sebelumnya hanya masuk ke
dokumentasi terpisah. Sekarang sudah ada sebagai project paling atas, dengan tag
`Backend`, `Backup`, `MySQL`, `Security`, `Docker`.

Sekalian saya tambahkan dukungan **tangkapan layar** di kartu project, karena
sebelumnya belum ada. Field baru yang opsional:

```js
gambar: 'img/backup-panel-audit-trail.png',
gambarAlt: 'Halaman Audit Trail Log di Backup Panel, ...',
```

Kalau `gambar` diisi, `ProjectsSection.jsx` merender `<figure class="proj-shot">`
berisi gambar dan keterangannya. Kalau kosong, tidak ada yang berubah — jadi project
lamamu aman. Path-nya dibungkus `aset()` sesuai catatan di `aset.js`, supaya tidak 404
saat dideploy ke sub-folder GitHub Pages.

Screenshot-nya saya taruh di `public/img/backup-panel-audit-trail.png` (nama file
dirapikan dari `BACKUP_PANEL_AUDIT_TRAIL_SCREENSHOT.png`).

## 4. Bonus — tab filter "Backend"

`kategoriStack` di `content.js` belum memuat `'Backend'`, jadi PHP dan CodeIgniter
hanya muncul di tab "Semua" dan tidak bisa difilter tersendiri. Sudah ditambahkan
setelah `Linux/Server`.

---

## Berkas yang berubah

| Berkas | Perubahan |
|---|---|
| `src/styles.css` | Perbaikan warna input konsol tema terang; gaya `.proj-shot` |
| `src/components/StackSection.jsx` | Tiga entri ikon baru |
| `src/components/ProjectsSection.jsx` | Dukungan render tangkapan layar |
| `src/data/content.js` | Project Backup Panel; kategori `Backend` |
| `public/img/backup-panel-audit-trail.png` | Tangkapan layar (baru) |

## Yang perlu dicek setelah menimpa

- Ketik sesuatu di konsol saat **tema terang** — teksnya harus terbaca
- Bagian Stack: Nginx, PHP, dan CodeIgniter tampil dengan logo, bukan huruf
- Bagian Project: Backup Panel muncul paling atas, klik untuk melihat tangkapan layarnya
- Tab filter "Backend" muncul di bagian Stack

Satu catatan: ikon Simple Icons dimuat dari CDN, jadi butuh koneksi internet saat
pertama kali dimuat. Kalau nanti kamu ingin situsnya tetap utuh saat offline, ikon-ikon
itu bisa diunduh ke `public/icons/` dan dirujuk lewat `aset()` seperti yang sudah kamu
lakukan untuk Ruijie dan VS Code.
