# Panduan Portofolio

Versi ini memperbaiki navigasi mobile, path ikon, konsistensi data, dan meta tag —
plus menambah 5 fitur interaktif dan seluruh polesan tampilan.

---

## 1. Cara memasang (5 menit)

Di folder repo lama kamu, **hapus dulu** file dan folder ini:

```
sysadmin-portfolio-dian/          <- folder duplikat versi lama
dist/                             <- hasil build, tidak boleh ikut di-commit
public/foto-profil - Copy.png     <- file duplikat
public/icons/Ruijie.svg_...zip    <- arsip zip ikut ter-deploy, tidak perlu
.github/workflows/static.yml      <- WAJIB dihapus (lihat bagian 3)
```

Lalu salin seluruh isi folder ini ke repo, timpa yang lama. Setelah itu:

```bash
npm install
npm run dev      # cek di http://localhost:5173
npm run build    # pastikan build lolos
git add -A
git commit -m "Perbaikan navigasi mobile, path aset, dan fitur interaktif"
git push
```

---

## 2. WAJIB diganti sebelum deploy

Buka **`index.html`** dan ganti semua `https://dianwardana.github.io/portopolio/`
dengan alamat GitHub Pages-mu yang sebenarnya. Ada di 5 tempat:
`canonical`, `og:url`, `og:image`, `twitter:image`.

URL `og:image` **harus absolut**. Crawler WhatsApp dan LinkedIn tidak bisa membaca
path relatif — kalau salah, link yang kamu bagikan akan tampil polos tanpa gambar.

Kalau nama repo bukan `portopolio`, ubah juga `base` di `vite.config.js`.
Semua path aset ikut menyesuaikan otomatis, tidak ada yang perlu diubah lagi.

---

## 3. Kenapa `static.yml` harus dihapus

Sebelumnya ada dua workflow yang sama-sama ter-trigger pada push ke `main`:
`deploy.yml` (build dari sumber) dan `static.yml` (deploy folder statis).
Keduanya berebut environment `github-pages`, jadi versi yang tayang bisa acak —
kadang build terbaru, kadang folder `dist` lama yang ikut ter-commit.

`deploy.yml` yang baru sudah memakai `concurrency` supaya hanya satu deploy
berjalan sekaligus, dan `npm ci` supaya hasil build di server sama persis
dengan di laptopmu.

Sekali saja di GitHub: **Settings → Pages → Source = "GitHub Actions"**.

---

## 4. Mengedit konten

Hampir semua yang ingin kamu ubah ada di **`src/data/content.js`**.
Kamu tidak perlu menyentuh file lain.

### Dua bahasa

Teks bisa ditulis dua cara:

```js
judul: 'Halo'                        // dipakai untuk ID dan EN
judul: { id: 'Halo', en: 'Hello' }   // ikut tombol bahasa di navbar
```

Kalau `en` belum diisi, otomatis jatuh ke teks Indonesia. Aman —
kamu bisa menerjemahkan sedikit-sedikit tanpa merusak situs.

### Gambar dan file

Semua file di folder `/public` ditulis **tanpa garis miring depan**:

```js
foto: 'foto-profil.png'    // BENAR
foto: '/foto-profil.png'   // SALAH — akan 404 di GitHub Pages
```

Alasannya ada di komentar `src/lib/aset.js`. Ini penyebab ikon Ruijie-mu
tidak muncul di versi lama: path `/icons/ruijie.svg` dicari di root domain,
padahal situs berada di sub-folder `/portopolio/`.

### Menambah ikon tool baru

1. Tambah tool di array `stack` (`content.js`)
2. Tambah barisnya di `ICON_MAP` (`src/components/StackSection.jsx`)
   - Ikon dari internet: `'https://cdn.simpleicons.org/slug/warna'`
   - Ikon file sendiri: `aset('icons/namafile.svg')` — **selalu** pakai `aset()`

### Mengisi insiden di halaman status

Di array `layananStatus`. Yang perlu kamu isi hanya `insiden`:

```js
{
  hariLalu: 12,             // 0 = hari ini, 89 = paling kiri
  tingkat: 'gangguan',      // 'gangguan' (kuning) atau 'down' (merah)
  durasi: '8 menit',
  judul:  { id: '...', en: '...' },
  sebab:  { id: '...', en: '...' },   // akar masalah
  solusi: { id: '...', en: '...' },   // penanganan & pencegahan
}
```

Isi dengan kejadian nyata. Bagian ini yang paling dibaca recruiter —
menunjukkan cara kamu berpikir saat sistem bermasalah jauh lebih kuat
daripada klaim angka uptime.

### Menggeser node topologi

Di objek `topologi`. Koordinat memakai kanvas `1000 x 560`, tinggal ubah `x` / `y`.
Tambah/hapus garis di array `koneksi` berupa pasangan `['id-a', 'id-b']`.

---

## 5. Yang belum diisi

Di `content.js` bagian `profile`, tiga field ini masih kosong:

```js
github: '',      // tombol GitHub tersembunyi selama kosong
linkedin: '',    // tombol LinkedIn tersembunyi selama kosong
cv: '',          // isi 'cv-dian.pdf' setelah menaruh filenya di /public
```

Selama `cv` kosong, tombolnya otomatis berganti jadi "Cetak / simpan PDF"
yang memakai stylesheet cetak — Ctrl+P menghasilkan CV rapi langsung dari situs.

---

## 6. Fitur baru — ringkasan

| Fitur | Lokasi | Catatan |
|---|---|---|
| Menu mobile | tombol ☰ di navbar | perbaikan paling penting |
| Command palette | `Ctrl/Cmd + K` atau `/` | navigasi cepat + aksi |
| Status page | section "Status" | klik batang kuning/merah |
| Topologi interaktif | section "Arsitektur" | klik node untuk detail |
| Stack → Project | klik ikon di section Stack | angka di pojok = jumlah project |
| Pipeline auto-play | tombol "Jalankan" | log mengetik per baris |
| Terminal upgrade | section Kontak | Tab autocomplete, chip perintah |
| Deep link terminal | `?cmd=whoami` di URL | enak dikirim ke recruiter |
| Sparkline metrik | kartu angka | grafik mini |
| Uptime hidup | navbar | menghitung dari `mulaiKarier` |
| Progres scroll | garis tipis di navbar | |
| Dua bahasa ID/EN | tombol 🌐 di navbar | otomatis EN untuk pengunjung luar |
| Stylesheet cetak | `Ctrl + P` | project otomatis terbuka semua |

### Perintah terminal

```
help  whoami  about  projects  skills  status  uptime  contact
neofetch  goto <section>  theme <dark|light>  lang <id|en>  cv  date  clear
```

Tekan **Tab** untuk melengkapi, **panah atas** untuk mengulang, **Ctrl+L** untuk mengosongkan.

---

## 7. Catatan teknis

- Tema disimpan di satu store bersama (`src/lib/hooks.js`), bukan state per komponen.
  Tema dipakai di 4 tempat; kalau masing-masing punya state sendiri, tombol di
  menu mobile akan tidak sinkron dengan tombol di navbar.
- Semua animasi menghormati `prefers-reduced-motion`.
- Akses `localStorage` dibungkus `try/catch` — Safari mode privat memblokirnya
  dan tanpa penjagaan itu situs bisa gagal tampil sama sekali.
- Sudah diuji: 46 pemeriksaan render dan interaksi, nol error konsol.
