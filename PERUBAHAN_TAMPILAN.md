# Catatan Perubahan Tampilan

Semua teks, angka, tautan, struktur section, slug, dan urutan navigasi **tidak
diubah sama sekali**. Yang berubah hanya lapisan tampilan.

---

## Ringkasan angka

| | Sebelum | Sesudah |
|---|---|---|
| Baris `styles.css` | 3.218 | 2.805 |
| `backdrop-filter` | 20 | 0 |
| Nilai `border-radius` unik | 19 | 4 |
| Ukuran font unik | 27 | 7 langkah |
| `@keyframes` | 13 | 6 |
| Warna aksen | 5 | 1 + 3 warna status |
| Permintaan font pihak ketiga | 2 | 0 |

CSS terkirim: 38,2 kB (gzip 8,15 kB).

---

## 1. Latar halaman

**Dihapus seluruhnya:** lima lapisan latar (`.aurora` dengan 4 gumpalan
`blur(55px)` yang beranimasi tanpa henti, `.aurora-kisi`, `.aurora-tekstur`
berisi butiran + vignette, dan kisi hero `.hero-grid-bg`).

Diganti satu gradasi datar `--bg → --bg-2 → --bg`.

Ini perubahan dengan dampak terbesar. Empat elemen blur besar yang bergerak
terus-menerus adalah penyebab utama halaman terasa penuh, sekaligus beban
GPU terberat saat digulir di ponsel.

## 2. Sistem permukaan

Karena tidak ada lagi lapisan warna di belakang, semua panel kaca diganti
permukaan solid. Ke-20 `backdrop-filter` dibuang, termasuk blok cadangan
`@supports` yang menyertainya.

Nama variabel `--kaca`, `--kaca-kuat`, `--kaca-tepi` **tetap dipertahankan**
sebagai alias ke `--panel`, jadi seluruh aturan lama tidak perlu disentuh.
Kalau suatu saat mau balik ke gaya kaca, cukup ubah definisinya di `:root`.

## 3. Warna

Satu aksen brand: **amber** (`#f0a03c`, `#a96200` di tema terang).

`--cyan` dan `--violet` dijadikan alias ke `--ink-dim`. Keduanya memang
nyaris tak dipakai di CSS (2 dan 0 kemunculan), praktis hanya hidup di
gumpalan aurora yang sudah dihapus.

`--green`, `--amber`, `--rose` **dipertahankan** karena di halaman status
ketiganya menyampaikan keadaan nyata (normal / gangguan / down), bukan hiasan.

## 4. Bentuk

Dari 19 nilai radius jadi 4:

- `var(--r)` = 12px untuk semua panel, kartu, tombol, input
- `var(--r-pill)` = 999px untuk chip filter dan pill status
- `50%` untuk titik dan lingkaran
- `2px` khusus batang 90 hari di halaman status

## 5. Tipografi

- **Open Sans → Geist.** Di-host sendiri di `src/fonts/geist-variable.woff2`
  (70 kB, variable 100–900).
- **JetBrains Mono dipertahankan** dan ikut di-host sendiri. Mono di sini
  semantik, bukan dekorasi.
- Tag `<link>` Google Fonts dilepas dari `index.html`. Dua permintaan pihak
  ketiga hilang dari jalur render.
- 27 ukuran font dipadatkan jadi 7 langkah: `--t-2xs` (12px) sampai
  `--t-2xl` (clamp 30–44px).
- **Hero `h1`:** `clamp(50px, 11vw, 104px)` uppercase, `line-height: 0.88`,
  `letter-spacing: -0.05em` → `clamp(38px, 6vw, 68px)`, huruf normal,
  `line-height: 1.05`, `letter-spacing: -0.02em`, `font-weight: 600`.

## 6. Ruang dan irama

- `.section-head` margin bawah 36px → 56px
- `section.band` padding `clamp(64px, 10vw, 116px)` → `clamp(72px, 11vw, 128px)`
- `border-top` di tiap `section.band` dihapus; jarak antar-section sudah
  cukup jadi pembatas

## 7. Gerak

**Dihapus:**

- Layar pembuka (`Pembuka.jsx` beserta CSS-nya). Situs load di bawah satu
  detik; layar 1,9 detik hanya menciptakan penantian yang tadinya tidak ada.
- Efek mesin ketik di tagline hero. Teks langsung tampil.
- Sparkline di empat kartu metrik. Angka dan label tetap utuh.
- Drift gumpalan aurora dan drift kisi.

**Dipertahankan:** reveal saat scroll, hitung-naik angka metrik, denyut
titik status, seluruh hover state, dan semua interaksi (Ctrl+K, terminal,
filter project, diagram topologi).

---

## Yang sengaja TIDAK diubah

**Eyebrow di tiap section.** Ada 7 label kecil (`alur kerja`, `uptime`,
`arsitektur`, `stacks`, `arsip pekerjaan`, `karier`, `kontak`) untuk 9
section. Semuanya mengulang h2 di bawahnya dan bisa dihapus tanpa kehilangan
makna, tapi itu menyentuh teks. Kalau mau menghapusnya, buang baris
`<span className="eyebrow">…</span>` di `section-head` masing-masing
komponen. Judul h2 sudah cukup menerangkan isi section.

**Tiga interaksi "pintar" yang saling bersaing:** Command Palette (Ctrl+K),
terminal di section kontak, dan mobile nav. Untuk kesan lebih simple lagi,
pilih satu sebagai andalan. Saran: pertahankan terminal, dan hapus petunjuk
`Ctrl K` yang terlihat di status bar (`StatusBar.jsx`, elemen `.kbd-hint`).

**Tanda pisah panjang di teks** (60 di `data/content.js`). Itu tulisan Anda.

**`useTypewriter` di `lib/hooks.js`** masih diekspor walau tidak lagi
dipakai. Dibiarkan supaya mudah dipasang kembali.

---

## Cara menjalankan

```bash
npm install
npm run dev      # pengembangan
npm run build    # produksi, hasil di dist/
```

`base` di `vite.config.js` tetap `/portopolio/` seperti semula.
