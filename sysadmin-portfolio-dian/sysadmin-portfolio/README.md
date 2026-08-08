# Portofolio DevOps — React + Vite

Situs portofolio satu halaman untuk DevOps / Platform / SRE Engineer.
Ringan (±55 KB JS ter-gzip), tanpa library UI, tanpa animasi berat.
Semua isi diatur dari **satu file**: `src/data/content.js`.

---

## 1. Jalankan di komputer sendiri

Butuh Node.js versi 18 ke atas.

```bash
npm install     # sekali saja
npm run dev     # buka http://localhost:5173
```

Perintah lain:

```bash
npm run build     # menghasilkan folder dist/
npm run preview   # melihat hasil build secara lokal
```

---

## 2. Mengganti isi konten

Buka `src/data/content.js`. File itu dibagi jadi 9 bagian bernomor:

| Bagian | Isi | Muncul di |
| --- | --- | --- |
| 1 | `profile` — nama, tagline, email, sosial media | Hero & kontak |
| 2 | `metrik` — angka ringkas | Strip di bawah hero |
| 3 | `pipeline` — tahapan rilis + log | Bagian Pipeline |
| 4 | `stack` — tools & level | Bagian Stack |
| 5 | `projects` — daftar pekerjaan | Bagian Project |
| 6 | `pengalaman` — riwayat kerja | Bagian Pengalaman |
| 7 | `sertifikasi` | Panel di samping pengalaman |
| 8 | `perintahTerminal` — isi konsol interaktif | Bagian Kontak |
| 9 | `ui` — semua label antarmuka | Seluruh halaman |

Simpan file, halaman langsung ikut berubah saat `npm run dev` jalan.

### Menambah project baru

Buka bagian **5. PROJECT**, lalu tempel blok ini di paling atas array `projects`:

```js
{
  judul: 'Nama Project',
  subjudul: 'Satu kalimat singkat soal dampaknya',
  tahun: '2026',
  status: 'produksi',            // 'produksi' | 'aktif' | 'arsip'
  tag: ['Kubernetes', 'CI/CD'],  // otomatis jadi tombol filter
  deskripsi: 'Dua sampai tiga kalimat menjelaskan masalah dan solusinya.',
  hasil: [
    'Pakai angka kalau bisa — waktu deploy turun 40%',
    'Poin kedua',
  ],
  stack: ['Terraform', 'AWS', 'Argo CD'],
  repo: 'https://github.com/username/repo',   // '' kalau tidak ada
  demo: '',                                    // '' kalau tidak ada
},
```

Catatan:
- Tag baru otomatis muncul sebagai tombol filter. Tidak perlu daftar manual.
- Kalau `repo` dan `demo` diisi `''`, tombolnya hilang sendiri.
- Warna badge status mengikuti nilai `status`: hijau (produksi), biru (aktif), abu (arsip).

### Menambah perintah terminal

Di bagian **8**, tambahkan satu baris:

```js
export const perintahTerminal = {
  // ...yang sudah ada
  homelab: [
    '3 node Raspberry Pi 5 dengan k3s',
    'Storage: Longhorn · Ingress: Traefik',
  ],
}
```

Perintah baru otomatis muncul saat pengunjung mengetik `help`.

### Mengganti judul tab & preview link

Ada di `index.html`: `<title>`, `<meta name="description">`, dan tag `og:`.

### Mengganti warna

Di `src/styles.css` paling atas, blok `:root`. Ubah `--amber` untuk warna aksen.
Blok `[data-theme='light']` mengatur versi tema terang.

### Menambahkan CV

Taruh file di folder `public/`, misalnya `public/cv.pdf`,
lalu di `content.js` isi `cv: '/cv.pdf'`. Tombol "Unduh CV" akan muncul.

---

## 3. Deploy ke GitHub Pages

Repo ini sudah berisi workflow di `.github/workflows/deploy.yml`.
Setiap `git push` ke branch `main` akan otomatis build dan publish.

**Langkah pertama kali:**

1. Buat repo baru di GitHub (misal namanya `portfolio`).
2. Dari folder proyek ini:

   ```bash
   git init
   git add .
   git commit -m "portofolio awal"
   git branch -M main
   git remote add origin https://github.com/USERNAME/portfolio.git
   git push -u origin main
   ```

3. Di GitHub: **Settings → Pages → Build and deployment → Source**, pilih
   **GitHub Actions**. (Bukan "Deploy from a branch".)
4. Buka tab **Actions**, tunggu workflow selesai (sekitar 1 menit).
5. Situs terbit di `https://USERNAME.github.io/portfolio/`

**Update berikutnya** cukup:

```bash
git add .
git commit -m "tambah project baru"
git push
```

### Soal base path

Vite perlu tahu situs berada di sub-folder atau tidak. Workflow sudah mengurus ini:

- Repo bernama `USERNAME.github.io` → base `/` → situs di `https://USERNAME.github.io/`
- Repo bernama lain, misal `portfolio` → base `/portfolio/`

Tidak ada yang perlu diubah manual.

### Kalau mau pakai domain sendiri

1. Buat file `public/CNAME` berisi satu baris: `portfolio.domainkamu.com`
2. Arahkan DNS domain ke GitHub Pages (CNAME ke `USERNAME.github.io`).
3. Di `vite.config.js`, ubah baris `base` jadi `base: '/'`.

---

## 4. Struktur file

```
.
├── .github/workflows/deploy.yml   # otomatisasi deploy
├── index.html                     # judul tab, meta, font
├── vite.config.js                 # base path
├── public/                        # file statis (CV, CNAME, gambar)
└── src/
    ├── main.jsx
    ├── App.jsx                    # urutan bagian halaman
    ├── styles.css                 # semua gaya + token warna
    ├── data/content.js            # ← ISI PORTOFOLIO ADA DI SINI
    ├── lib/hooks.js               # reveal, scroll-spy, hitung angka, tema
    └── components/
        ├── StatusBar.jsx          # navigasi sticky + jam + tema
        ├── Hero.jsx               # panel deploy animasi
        ├── Metrics.jsx
        ├── PipelineSection.jsx    # tahapan bisa diklik
        ├── StackSection.jsx       # filter kategori
        ├── ProjectsSection.jsx    # filter tag + kartu bisa dibuka
        ├── ExperienceSection.jsx
        ├── ContactSection.jsx     # terminal interaktif
        └── Icons.jsx              # ikon SVG inline
```

---

## 5. Catatan teknis

- Tidak ada library animasi, ikon, atau chart. Hanya React + CSS.
- Animasi memakai `IntersectionObserver`, bukan library scroll.
- `prefers-reduced-motion` dihormati: semua animasi mati kalau pengguna memintanya.
- Navigasi keyboard berfungsi, fokus terlihat, ada link "lewati ke konten".
- Tema tersimpan di `localStorage`.
