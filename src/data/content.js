/* ============================================================
 *  ISI PORTOFOLIO — EDIT FILE INI SAJA
 * ============================================================
 *  Semua teks, project, skill, dan pengalaman ada di sini.
 *  Kamu tidak perlu menyentuh file lain untuk mengganti konten.
 *  Setelah edit: simpan -> git commit -> git push -> otomatis ter-deploy.
 *
 *  GAMBAR / FILE
 *  -------------
 *  Semua file di folder /public ditulis TANPA garis miring depan.
 *  Contoh: 'foto-profil.png', bukan '/foto-profil.png'.
 *  Prefix '/portopolio/' ditambahkan otomatis saat build.
 * ============================================================ */

import { tahunPenuh, tahunRingkas } from '../lib/waktu'

/* ------------------------------------------------------------
 *  0. TANGGAL ACUAN KARIER
 * ------------------------------------------------------------
 *  Ubah di sini saja. Semua angka lama bekerja di situs —
 *  penghitung di navbar, kartu metrik, dan rinciannya —
 *  dihitung otomatis dari tiga tanggal ini, jadi tidak perlu
 *  diperbarui manual tiap tahun.
 * ---------------------------------------------------------- */
export const MULAI_KARIER = '2019-05-01' // hari pertama sebagai IT Support (vendor)
export const MULAI_SYSADMIN = '2025-02-01' // pindah ke PT Jayamas Medica Industri Tbk

/* ------------------------------------------------------------
 *  1. IDENTITAS
 * ---------------------------------------------------------- */
export const profile = {
  nama: 'Dian Rizki Wardana',
  inisial: 'DRW',
  judulBaris1: 'System',
  judulBaris2: 'Administrator',
  tagline: 'Saya menjaga server tetap hidup, jaringan tetap stabil, dan 400+ user tetap produktif — termasuk saat tidak ada yang sadar ada masalah.',
  lokasi: 'Mojokerto, Jawa Timur',
  zonaWaktu: 'Asia/Jakarta',
  ketersediaan: 'open',
  labelKetersediaan: 'Terbuka untuk peluang baru',
  email: 'dianwardana.tech@gmail.com',

  /* Kosongkan ('') untuk menyembunyikan tombol/tautannya. */
  github: 'https://github.com/DianWardana',
  linkedin: 'https://www.linkedin.com/in/dianrizkiw/',
  cv: '', // contoh: 'cv-dian.pdf' (taruh filenya di folder /public)

  /* File foto ada di folder /public. Tulis nama filenya saja. */
  foto: 'foto-profil.png',

  /* Dipakai untuk penghitung "uptime karier" hidup di navbar. */
  mulaiKarier: MULAI_KARIER,
}

/* ------------------------------------------------------------
 *  2. ANGKA RINGKAS
 * ---------------------------------------------------------- */
/* `tren` = data grafik mini (sparkline) di kartu. Isi 8–14 angka.
 * Angkanya relatif — yang penting bentuk grafiknya, bukan skalanya. */
export const metrik = [
  {
    nilai: 99,
    sufiks: '%',
    desimal: 0,
    label: 'Uptime rata-rata',
    catatan: 'lingkungan produksi',
    tren: [97.8, 98.4, 99.1, 98.9, 99.4, 99.2, 99.6, 99.3, 99.7, 99.5, 99.8, 99.6],
  },
  {
    nilai: tahunPenuh(MULAI_KARIER),
    sufiks: ' tahun',
    desimal: 0,
    label: 'Pengalaman langsung',
    /* Dirinci per fase supaya jelas mana yang IT support dan mana
       yang sysadmin. Keduanya dihitung dari tanggal acuan di atas. */
    catatan: `${tahunRingkas(MULAI_KARIER, MULAI_SYSADMIN)} th IT support · ${tahunRingkas(
      MULAI_SYSADMIN
    )} th sysadmin`,
    tren: [1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7],
  },
  {
    nilai: 1000,
    sufiks: '+',
    label: 'Tiket diselesaikan',
    catatan: 'IT support & sysadmin',
    tren: [120, 180, 260, 330, 410, 500, 590, 680, 760, 850, 930, 1000],
  },
  {
    nilai: 400,
    sufiks: '+',
    label: 'User aktif dikelola',
    catatan: 'lingkungan high-demand',
    tren: [90, 130, 170, 210, 240, 280, 310, 330, 360, 380, 395, 400],
  },
]

/* ------------------------------------------------------------
 *  3. PIPELINE — Alur Kerja Harian Sysadmin
 * ---------------------------------------------------------- */
export const pipeline = [
  /* ---------- FASE 1: FONDASI ----------
     Infrastruktur harus berdiri lebih dulu. Tidak ada gunanya
     merancang sistem kalau tempat menjalankannya belum siap. */
  {
    id: 'konfigurasi',
    fase: 'Fondasi',
    nama: 'Konfigurasi',
    durasi: 'baseline',
    ringkas:
      'Menyiapkan server dari kondisi kosong: sistem operasi, paket dasar, layanan, dan pengguna. Setiap langkah dicatat supaya bisa diulang persis di server berikutnya.',
    tools: ['Ubuntu Server', 'Bash', 'Apache2'],
    log: [
      '$ hostnamectl set-hostname app-prod-01',
      '$ apt update && apt upgrade -y',
      '$ timedatectl set-timezone Asia/Jakarta',
      'User & group  : dibuat, sudo dibatasi per peran',
      'Layanan dasar : apache2, mysql, docker',
      'Dokumentasi   : tiap langkah dicatat saat dikerjakan',
    ],
  },
  {
    id: 'jaringan',
    fase: 'Fondasi',
    nama: 'Jaringan',
    durasi: 'managed',
    ringkas:
      'Menentukan alamat, segmentasi VLAN, dan jalur akses. Server tidak pernah ditaruh di segmen yang sama dengan laptop karyawan.',
    tools: ['MikroTik', 'VLAN', 'PPTP'],
    log: [
      '$ /ip firewall filter print',
      'Firewall rules : 100+ aktif',
      'VLAN aktif     : 6 zona terpisah',
      'Simple queue   : batas bandwidth per user',
      'PPTP           : jalur akses dari luar kantor',
      'Zona server    : tidak dapat dijangkau VLAN tamu',
    ],
  },
  {
    id: 'security',
    fase: 'Fondasi',
    nama: 'Security',
    durasi: 'wajib',
    ringkas:
      'Pengerasan dilakukan sebelum layanan dibuka, bukan sesudah ada masalah. Termasuk notifikasi setiap login yang masuk ke server.',
    tools: ['UFW', 'Fail2Ban', 'SSH'],
    log: [
      '$ ufw status verbose',
      'Default          : deny (incoming)',
      '$ fail2ban-client status sshd',
      'Currently banned : 312 IP',
      'Root login       : disabled',
      'Notifikasi login : terkirim ke Telegram',
    ],
  },

  /* ---------- FASE 2: PERANCANGAN ----------
     Tahap yang paling sering dilewati orang, dan paling sering
     jadi sebab sistem selesai dibangun tapi tidak terpakai. */
  {
    id: 'analisa',
    fase: 'Perancangan',
    nama: 'Analisa Bisnis',
    durasi: 'awal',
    ringkas:
      'Memetakan cara kerja departemen yang meminta — mencari apa yang sebenarnya dibutuhkan, bukan sekadar menuruti apa yang diminta di permukaan.',
    tools: ['Wawancara', 'Observasi', 'Pemetaan Proses'],
    log: [
      '# Permintaan     : sistem pencatatan aset',
      '# Departemen     : Umum & GA',
      'Proses berjalan  : dicatat manual di spreadsheet',
      'Titik masalah    : data ganda, sulit ditelusuri',
      'Kebutuhan nyata  : riwayat perpindahan aset',
      'Catatan          : yang diminta != yang dibutuhkan',
    ],
  },
  {
    id: 'flowchart',
    fase: 'Perancangan',
    nama: 'Flowchart',
    durasi: 'sepakat',
    ringkas:
      'Menuangkan alur proses jadi gambar, supaya semua pihak melihat gambaran yang sama sebelum satu baris kode ditulis.',
    tools: ['Flowchart', 'Review', 'Persetujuan'],
    log: [
      '# Alur disusun lalu ditinjau bersama pemohon',
      'Aktor          : staf gudang, admin, manajer',
      'Titik putusan  : 4 percabangan',
      'Revisi         : 2 kali sebelum disepakati',
      'Status         : disetujui sebelum lanjut',
    ],
  },
  {
    id: 'blueprint',
    fase: 'Perancangan',
    nama: 'Blueprint',
    durasi: 'serah',
    ringkas:
      'Rancangan yang siap dikerjakan developer: struktur data, hak akses, dan batasan. Developer menerima rancangan, bukan tebakan.',
    tools: ['Blueprint Sistem', 'Struktur Data', 'Hak Akses'],
    log: [
      '# Blueprint diserahkan ke tim developer',
      'Entitas    : aset, lokasi, riwayat, pengguna',
      'Hak akses  : 3 peran dengan batas berbeda',
      'Batasan    : aset tidak dihapus, hanya ditandai',
      'Lampiran   : flowchart + contoh tampilan',
    ],
  },

  /* ---------- FASE 3: RILIS ---------- */
  {
    id: 'testing',
    fase: 'Rilis',
    nama: 'Testing',
    durasi: 'iterasi',
    ringkas:
      'Diuji terhadap flowchart yang sudah disepakati, bukan terhadap selera. Yang belum sesuai dikembalikan ke developer.',
    tools: ['Test Case', 'Git', 'Review'],
    log: [
      '$ git checkout develop',
      'Test case      : 24 skenario',
      'Lolos          : 21',
      'Dikembalikan   : 3 ke developer',
      'Acuan uji      : flowchart yang disepakati',
    ],
  },
  {
    id: 'staging',
    fase: 'Rilis',
    nama: 'Staging',
    durasi: 'cermin',
    ringkas:
      'Dijalankan di lingkungan yang menyerupai produksi. Kalau gagal di sini, tidak ada satu pun pengguna yang terdampak.',
    tools: ['Docker', 'Git Flow', 'Apache2'],
    log: [
      '$ git flow release start v1.2.0',
      '$ docker compose -f staging.yml up -d',
      'Container      : 5 aktif',
      'Data           : salinan produksi yang disamarkan',
      'Diuji oleh     : pemohon langsung, bukan saya',
    ],
  },
  {
    id: 'deploy',
    fase: 'Rilis',
    nama: 'Deploy',
    durasi: 'terjadwal',
    ringkas:
      'Rilis ke produksi mengikuti langkah yang sudah tertulis. Reverse proxy mengarahkan subdomain ke layanan yang benar.',
    tools: ['Git Flow', 'Docker', 'Reverse Proxy'],
    log: [
      '$ git flow release finish v1.2.0',
      '$ git pull origin main',
      '$ docker compose up -d --build',
      'Container app_web    Started',
      'Reverse proxy        : subdomain diarahkan',
      'Langkah              : mengikuti dokumentasi rilis',
    ],
  },

  /* ---------- FASE 4: OPERASIONAL ----------
     Rilis bukan garis akhir. Di sinilah sistem hidup atau mati. */
  {
    id: 'backup',
    fase: 'Operasional',
    nama: 'Backup',
    durasi: 'cron',
    ringkas:
      'Sistem baru masuk skema backup di hari rilis, bukan menyusul kemudian. Setiap backup diikuti percobaan restore.',
    tools: ['Cron', 'MySQL', 'Telegram'],
    log: [
      '$ crontab -l | grep backup',
      '0 2 * * * /scripts/db-backup-all.sh',
      'Retensi        : 30 hari',
      'Uji restore    : dijalankan tiap backup',
      'Notifikasi     : status terkirim ke Telegram',
    ],
  },
  {
    id: 'monitoring',
    fase: 'Operasional',
    nama: 'Monitoring',
    durasi: '24/7',
    ringkas:
      'Target baru ditambahkan ke Prometheus dan healthcheck. Tujuannya sederhana: tahu duluan sebelum pengguna tahu.',
    tools: ['Prometheus', 'Grafana', 'Healthcheck'],
    log: [
      '$ curl -s localhost:9090/api/v1/targets',
      'Target aktif   : semua up',
      'Dashboard      : ditambahkan ke Grafana',
      'Healthcheck    : cek tiap 60 detik',
      'Alert          : dikirim saat layanan mati',
      'Insiden aktif  : 0',
    ],
  },
]

/* ------------------------------------------------------------
 *  4. STATUS PAGE — riwayat uptime & insiden
 * ---------------------------------------------------------- */
/* Tiap layanan menampilkan 90 batang (90 hari terakhir).
 * Default semua hijau. Yang perlu kamu isi hanya `insiden`:
 *   hariLalu → 0 = hari ini, 1 = kemarin, 89 = paling kiri
 *   tingkat  → 'gangguan' (kuning) atau 'down' (merah)
 * Ini bagian yang paling dibaca recruiter — ceritakan cara kamu
 * menangani masalah, bukan cuma klaim angka uptime. */
export const layananStatus = [
  {
    nama: 'Server Produksi (4 node)',
    uptime: 99.94,
    insiden: [
      {
        hariLalu: 12,
        tingkat: 'gangguan',
        durasi: '8 menit',
        judul: 'Apache2 gagal reload setelah deploy',
        sebab: 'Variable environment CI4 hilang saat deploy — PHP fatal error, HTTP 500 di satu vhost.',
        solusi: 'Ketahuan dari alert Grafana sebelum ada user lapor. Perbaiki .env, reload Apache2, tambahkan pengecekan env ke skrip deploy supaya tidak terulang.',
      },
      {
        hariLalu: 41,
        tingkat: 'gangguan',
        durasi: '15 menit',
        judul: 'Disk usage 92% di server database',
        sebab: 'Log Docker menumpuk tanpa rotasi, ditambah arsip backup lama yang belum terhapus.',
        solusi: 'Bersihkan dengan docker prune, aktifkan log rotation, pasang alert di ambang 80% supaya ketahuan jauh sebelum kritis.',
      },
    ],
  },
  {
    nama: 'Jaringan & VLAN (6 zona)',
    uptime: 99.87,
    insiden: [
      {
        hariLalu: 27,
        tingkat: 'down',
        durasi: '22 menit',
        judul: 'Uplink switch core putus',
        sebab: 'Kabel uplink antara switch core dan distribusi longgar setelah pekerjaan rapikan rak.',
        solusi: 'Isolasi cepat dari topologi, ganti patch cable, labeli ulang seluruh port uplink dan foto kondisi rak sebagai dokumentasi.',
      },
      {
        hariLalu: 63,
        tingkat: 'gangguan',
        durasi: '11 menit',
        judul: 'Bandwidth jenuh di jam sibuk',
        sebab: 'Beberapa klien melakukan update besar bersamaan tanpa batas queue per-user.',
        solusi: 'Terapkan queue per-user di MikroTik dan prioritaskan traffic aplikasi kerja di atas traffic hiburan.',
      },
    ],
  },
  {
    nama: 'Backup Otomatis',
    uptime: 100,
    insiden: [],
  },
  {
    nama: 'Monitoring Stack',
    uptime: 99.98,
    insiden: [
      {
        hariLalu: 55,
        tingkat: 'gangguan',
        durasi: '6 menit',
        judul: 'Prometheus berhenti scraping satu target',
        sebab: 'Container exporter mati setelah restart host dan tidak diset restart otomatis.',
        solusi: 'Set restart: unless-stopped di compose, dan tambah alert khusus untuk target yang hilang dari Prometheus.',
      },
    ],
  },
]

/* ------------------------------------------------------------
 *  5. TOPOLOGI JARINGAN — diagram interaktif
 * ---------------------------------------------------------- */
/* Koordinat memakai kanvas 1000 x 560. Ubah x/y untuk menggeser node.
 * `jenis` menentukan warna: wan, router, switch, ap, server, vm, storage, field */
export const topologi = {
  judul: 'Arsitektur yang saya bangun',
  deskripsi: 'Sederhanaan dari infrastruktur yang saya kelola sehari-hari. Klik tiap node untuk melihat perannya, spesifikasi, dan alasan di balik keputusannya.',
  node: [
    {
      id: 'isp',
      nama: 'ISP / WAN',
      jenis: 'wan',
      x: 500,
      y: 48,
      detail: {
        peran: 'Jalur internet masuk',
        spek: ['Dedicated line + backup link', 'Failover otomatis', 'Public IP statis'],
        catatan: 'Dua jalur dipakai supaya kantor tidak berhenti kerja saat satu provider bermasalah. Failover diuji berkala, bukan cuma diasumsikan jalan.',
      },
    },
    {
      id: 'mikrotik',
      nama: 'MikroTik',
      jenis: 'router',
      x: 500,
      y: 158,
      detail: {
        peran: 'Router utama, firewall, bandwidth manager',
        spek: ['100+ rule firewall aktif', 'Queue per-user aktif', 'Web filtering & VLAN', 'PPTP + NAT terkontrol'],
        catatan: 'Firewall pakai prinsip deny by default — hanya yang perlu yang dibuka. Queue per-user mencegah satu orang menghabiskan bandwidth seluruh kantor.',
      },
    },
    {
      id: 'core',
      nama: 'Switch Core',
      jenis: 'switch',
      x: 500,
      y: 268,
      detail: {
        peran: 'Distribusi VLAN ke seluruh zona',
        spek: ['Ruijie managed switch', '6 VLAN aktif', 'Trunk port ke switch akses', 'Port uplink berlabel & terdokumentasi'],
        catatan: 'Segmentasi VLAN memisahkan zona server, karyawan, tamu, CCTV, dan perangkat lapangan. Kalau satu zona bermasalah, zona lain tidak ikut terbawa.',
      },
    },
    {
      id: 'vlan-srv',
      nama: 'VLAN Server',
      jenis: 'switch',
      x: 190,
      y: 372,
      detail: {
        peran: 'Zona khusus server produksi',
        spek: ['Akses dibatasi per-IP', 'Tidak bisa diakses langsung dari VLAN tamu', 'Traffic antar zona lewat firewall'],
        catatan: 'Server tidak pernah berada di segmen yang sama dengan laptop karyawan. Ini lapis pertahanan paling murah dan paling sering dilewatkan orang.',
      },
    },
    {
      id: 'vlan-user',
      nama: 'VLAN User',
      jenis: 'switch',
      x: 500,
      y: 372,
      detail: {
        peran: 'Zona karyawan & tamu',
        spek: ['400+ user aktif', 'Bandwidth per-user dibatasi', 'Guest terisolasi dari jaringan internal'],
        catatan: 'Zona dengan jumlah perangkat terbesar. Tamu benar-benar terisolasi — bisa internet, tidak bisa menyentuh apa pun di dalam.',
      },
    },
    {
      id: 'vlan-field',
      nama: 'VLAN Field',
      jenis: 'switch',
      x: 810,
      y: 372,
      detail: {
        peran: 'CCTV, alarm bank, access control',
        spek: ['NVR & kamera indoor/outdoor', 'Jaringan alarm bank', 'Door access system'],
        catatan: 'Perangkat lapangan sering punya firmware lama yang tidak bisa di-update. Solusinya bukan memaksa update, tapi mengurungnya di VLAN sendiri.',
      },
    },
    {
      id: 'esxi',
      nama: 'VMware ESXi',
      jenis: 'server',
      x: 90,
      y: 480,
      detail: {
        peran: 'Host virtualisasi',
        spek: ['Beberapa VM produksi', 'Snapshot sebelum tiap perubahan besar', 'Resource dialokasikan per beban kerja'],
        catatan: 'Snapshot diambil sebelum tiap perubahan besar. Bukan karena pesimis, tapi karena rollback 2 menit jauh lebih murah daripada rebuild 2 jam.',
      },
    },
    {
      id: 'docker',
      nama: 'Docker Host',
      jenis: 'vm',
      x: 290,
      y: 480,
      detail: {
        peran: '±13 container aplikasi produksi',
        spek: ['Web app (PHP / CodeIgniter 4)', 'Database & cache', 'Exporter monitoring', 'Docker prune terjadwal'],
        catatan: 'Docker prune dijadwalkan supaya disk tidak membengkak pelan-pelan — masalah klasik yang baru terasa saat server sudah penuh.',
      },
    },
    {
      id: 'ap',
      nama: 'AP Mesh',
      jenis: 'ap',
      x: 500,
      y: 480,
      detail: {
        peran: 'Wi-Fi untuk seluruh area kerja',
        spek: ['Ruijie AP Mesh', 'AI Roaming optimization', 'Whitelist MAC untuk zona sensitif', 'SSID terpisah per VLAN'],
        catatan: 'AI Roaming diaktifkan supaya perangkat berpindah AP tanpa memutus sesi — keluhan "wifi putus-putus saat jalan" hilang setelah ini.',
      },
    },
    {
      id: 'backup',
      nama: 'Backup Server',
      jenis: 'storage',
      x: 700,
      y: 480,
      detail: {
        peran: 'Backup database multi-instance',
        spek: ['Cron harian jam 02:00', 'Retensi 30 hari', 'Verifikasi backup otomatis', 'Prosedur recovery terdokumentasi'],
        catatan: 'Backup yang tidak pernah diuji bukan backup, cuma harapan. Restore diuji berkala supaya angka "zero data loss" ada buktinya.',
      },
    },
    {
      id: 'monitoring',
      nama: 'Monitoring',
      jenis: 'server',
      x: 900,
      y: 480,
      detail: {
        peran: 'Grafana + Prometheus + Netdata',
        spek: ['Dashboard tunggal untuk semua server', 'Alert sebelum jadi insiden', 'Data historis untuk analisis tren'],
        catatan: 'Tujuannya bukan grafik yang bagus, tapi tahu duluan sebelum user tahu. Sebagian besar insiden di halaman status ini ketahuan dari sini.',
      },
    },
  ],
  koneksi: [
    ['isp', 'mikrotik'],
    ['mikrotik', 'core'],
    ['core', 'vlan-srv'],
    ['core', 'vlan-user'],
    ['core', 'vlan-field'],
    ['vlan-srv', 'esxi'],
    ['vlan-srv', 'docker'],
    ['vlan-user', 'ap'],
    ['vlan-field', 'backup'],
    ['vlan-srv', 'monitoring'],
  ],
}

/* ------------------------------------------------------------
 *  6. TOOLS & SKILL
 * ---------------------------------------------------------- */
export const kategoriStack = ['Semua', 'Linux/Server', 'Backend', 'Network', 'Virtualisasi', 'Database', 'Security', 'Monitoring', 'Workflow', 'Field']

/* `proyek` = daftar tag project yang memakai tool ini.
 * Dipakai untuk fitur klik ikon → filter project otomatis. */
export const stack = [
  // Linux/Server
  { nama: 'Linux (Ubuntu)', kategori: 'Linux/Server', level: 5, catatan: '20.04 / 22.04 / 24.04 production', proyek: 'Linux' },
  { nama: 'Nginx', kategori: 'Linux/Server', level: 5, catatan: 'reverse proxy, load balancing, performance tuning', proyek: 'Linux' },
  { nama: 'Apache2', kategori: 'Linux/Server', level: 5, catatan: 'web server & reverse proxy hybrid', proyek: 'Linux' },
  { nama: 'Bash Scripting', kategori: 'Linux/Server', level: 4, catatan: 'automation, cron job, maintenance', proyek: 'Automation' },
  { nama: 'SSH Hardening', kategori: 'Linux/Server', level: 5, catatan: 'custom port, disable root, key-based auth', proyek: 'Security' },
  { nama: 'DNS & SSL', kategori: 'Linux/Server', level: 4, catatan: "Certbot, Let's Encrypt, domain management", proyek: 'Linux' },
  // Network
  { nama: 'MikroTik', kategori: 'Network', level: 5, catatan: 'queue, firewall, bandwidth, whitelist', proyek: 'MikroTik' },
  { nama: 'VLAN / Switch', kategori: 'Network', level: 4, catatan: 'Ruijie, UniFi, segmentasi jaringan', proyek: 'VLAN' },
  { nama: 'Network Design', kategori: 'Network', level: 4, catatan: 'LAN skala kecil–menengah, troubleshoot', proyek: 'Network' },
  { nama: 'Ruijie', kategori: 'Network', level: 5, catatan: 'Whitelist management, AP Mesh deployment, AI Roaming optimization', proyek: 'VLAN' },
  // Backend & Framework
  { nama: 'PHP 8.2+', kategori: 'Backend', level: 4, catatan: 'server-side scripting, REST API development', proyek: 'Backend' },
  { nama: 'CodeIgniter 4', kategori: 'Backend', level: 4, catatan: 'lightweight MVC framework, migrations, ORM', proyek: 'Backend' },
  // Virtualisasi & Container
  { nama: 'Docker', kategori: 'Virtualisasi', level: 4, catatan: 'multi-container, ±13 container running', proyek: 'Docker' },
  { nama: 'VMware ESXi', kategori: 'Virtualisasi', level: 4, catatan: 'ESXi, Workstation, VM management', proyek: 'Linux' },
  { nama: 'Proxmox', kategori: 'Virtualisasi', level: 3, catatan: 'basic usage, VM & container', proyek: 'Docker' },
  // Database
  { nama: 'MySQL / MariaDB', kategori: 'Database', level: 4, catatan: 'basic–intermediate, backup otomatis', proyek: 'MySQL' },
  { nama: 'phpMyAdmin', kategori: 'Database', level: 4, catatan: 'management & troubleshoot', proyek: 'MySQL' },
  // Security
  { nama: 'UFW Firewall', kategori: 'Security', level: 5, catatan: 'whitelist-based, deny by default', proyek: 'Security' },
  { nama: 'Fail2Ban', kategori: 'Security', level: 5, catatan: 'block ratusan IP brute force', proyek: 'Security' },
  { nama: 'Server Hardening', kategori: 'Security', level: 4, catatan: 'access control, network restriction', proyek: 'Security' },
  // Monitoring
  { nama: 'Grafana', kategori: 'Monitoring', level: 4, catatan: 'dashboard server & service', proyek: 'Grafana' },
  { nama: 'Prometheus', kategori: 'Monitoring', level: 3, catatan: 'metrics scraping & alerting', proyek: 'Prometheus' },
  { nama: 'Netdata', kategori: 'Monitoring', level: 4, catatan: 'real-time server monitoring', proyek: 'Monitoring' },
  // Workflow — alur kerja & version control
  { nama: 'Git', kategori: 'Workflow', level: 4, catatan: 'branching, merge, penelusuran riwayat rilis', proyek: 'Version Control' },
  { nama: 'Git Flow', kategori: 'Workflow', level: 4, catatan: 'model branching untuk tim developer', proyek: 'Version Control' },
  { nama: 'VS Code', kategori: 'Workflow', level: 4, catatan: 'editor utama, remote SSH ke server', proyek: 'Version Control' },
  { nama: 'Dokumentasi Teknis', kategori: 'Workflow', level: 5, catatan: 'langkah deploy & konfigurasi server', proyek: 'Dokumentasi' },
  // Field
  { nama: 'NVR & CCTV', kategori: 'Field', level: 4, catatan: '300+ titik, instalasi indoor & outdoor', proyek: 'Field' },
  { nama: 'Jaringan Alarm Bank', kategori: 'Field', level: 4, catatan: 'instalasi & maintenance', proyek: 'Field' },
  { nama: 'Access Control', kategori: 'Field', level: 3, catatan: 'door access system', proyek: 'Field' },
  { nama: 'PABX', kategori: 'Field', level: 4, catatan: 'instalasi & maintenance jaringan telepon', proyek: 'Field' },
]

/* ------------------------------------------------------------
 *  7. PROJECT
 * ---------------------------------------------------------- */
export const projects = [
  {
    judul: 'Backup Panel — Sistem Backup Database Terenkripsi',
    subjudul: 'Aplikasi web sendiri untuk mengelola backup lintas server, dengan audit trail penuh',
    tahun: '2026—kini',
    status: 'produksi',
    tag: ['Backend', 'Backup', 'MySQL', 'Security', 'Docker'],
    gambar: 'img/backup-panel-audit-trail.png',
    gambarAlt: 'Halaman Audit Trail Log di Backup Panel, menampilkan riwayat aktivitas backup dan restore',
    deskripsi:
      'Aplikasi internal yang saya bangun sendiri untuk menggantikan kumpulan skrip bash yang sebelumnya tersebar di beberapa server. Backend memakai CodeIgniter 4, antarmuka memakai React, dan seluruh eksekusi backup berjalan lewat SSH ke server target — termasuk yang databasenya berada di dalam container Docker. Setiap berkas hasil mysqldump dienkripsi AES-256 sebelum disimpan, dan setiap tindakan pengguna tercatat di audit trail: siapa, kapan, server mana, dan apa yang diubah.',
    hasil: [
      'Backup instan maupun terjadwal untuk banyak server dan database dari satu dasbor',
      'Seluruh berkas backup tersimpan terenkripsi (.sql.enc, AES-256-CBC) — bukan dump mentah',
      'Kredensial sensitif (kunci SSH, sandi database, token bot) disimpan terenkripsi di database, hasil audit keamanan internal',
      'Setiap backup diverifikasi lewat proses dekripsi dan validasi sebelum dianggap berhasil',
      'Audit trail mencatat seluruh aktivitas pengguna dan sistem, dapat difilter per tanggal',
      'Notifikasi Telegram real-time untuk keberhasilan, kegagalan, dan proses restore',
      'Pembersihan otomatis berkas lama mengikuti kebijakan retensi per database',
    ],
    stack: ['CodeIgniter 4', 'PHP 8.2+', 'React', 'Nginx', 'MySQL 8.0', 'Docker', 'SSH', 'OpenSSL', 'Telegram Bot API'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Infrastruktur 4 Server: Development, Staging, Backup, Production',
    subjudul: 'Empat lingkungan terpisah, satu domain, dikelola sendirian',
    tahun: '2025—kini',
    status: 'produksi',
    tag: ['Linux', 'Docker', 'Network'],
    deskripsi:
      'Membangun dan mengelola empat server dengan peran yang sengaja dipisah: development untuk uji coba, staging untuk verifikasi sebelum rilis, backup untuk pemulihan, dan production yang berjalan di VPS. Sebagian layanan berjalan di atas Docker, sebagian native — dipilih menurut kebutuhan tiap aplikasi, bukan karena sedang tren. Seluruhnya dapat diakses lewat satu domain dengan pemisahan per subdomain menggunakan reverse proxy.',
    hasil: [
      'Empat lingkungan terpisah — perubahan diuji di development dan staging sebelum menyentuh production',
      'Satu domain untuk semua layanan, dipisah rapi per subdomain lewat reverse proxy',
      'Docker dipakai di tempat yang memang menguntungkan, tidak dipaksakan ke seluruh layanan',
      'Seluruh siklus deploy dan maintenance dikerjakan sendiri, tanpa tim infrastruktur terpisah',
    ],
    stack: ['Ubuntu Server', 'Docker', 'Apache2', 'Reverse Proxy', 'VPS', 'Git'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Hardening Server & Notifikasi Login Real-time',
    subjudul: 'Setiap akses yang masuk ke server langsung muncul di Telegram saya',
    tahun: '2025—kini',
    status: 'produksi',
    tag: ['Security', 'Linux', 'Automation'],
    deskripsi:
      'Mengeraskan sisi keamanan seluruh server dengan UFW dan Fail2Ban, lalu menambahkan lapisan yang sering dilewatkan orang: notifikasi. Setiap login yang berhasil masuk ke server langsung mengirim pesan ke Telegram, jadi akses yang tidak dikenali ketahuan dalam hitungan detik — bukan saat audit bulanan, atau lebih buruk lagi, tidak ketahuan sama sekali.',
    hasil: [
      'UFW dan Fail2Ban aktif dan diverifikasi benar-benar berjalan di seluruh server, bukan sekadar terpasang',
      'Notifikasi Telegram real-time untuk setiap login yang masuk',
      'Percobaan brute force diblokir otomatis sebelum sempat berulang',
      'Jejak akses terpantau tanpa perlu membuka log satu per satu',
    ],
    stack: ['UFW', 'Fail2Ban', 'SSH', 'Telegram Bot API', 'Bash'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Backup Terjadwal dengan Uji Restore Otomatis',
    subjudul: 'Backup yang tidak pernah diuji bukan backup, cuma harapan',
    tahun: '2025—kini',
    status: 'produksi',
    tag: ['Backup', 'MySQL', 'Automation'],
    deskripsi:
      'Menjalankan backup terjadwal untuk server dan database, dilengkapi notifikasi status setiap kali proses selesai. Yang membedakan: setiap backup diikuti percobaan restore, sehingga keandalannya benar-benar terbukti — bukan sekadar arsip yang menumpuk dan baru dibuka pertama kali saat keadaan sudah darurat.',
    hasil: [
      'Backup berjalan otomatis tanpa intervensi manual',
      'Notifikasi status terkirim setiap kali backup selesai — berhasil maupun gagal',
      'Uji restore dijalankan pada setiap backup, jadi keandalannya terbukti sebelum dibutuhkan',
      'Prosedur pemulihan terdokumentasi dan sudah pernah dijalankan sungguhan',
    ],
    stack: ['Bash', 'Cron', 'MySQL', 'MariaDB', 'Telegram Bot API'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Monitoring & Healthcheck Seluruh Server',
    subjudul: 'Tahu duluan sebelum user tahu',
    tahun: '2025—kini',
    status: 'aktif',
    tag: ['Monitoring', 'Grafana', 'Prometheus'],
    deskripsi:
      'Memasang Prometheus untuk pengumpulan metrik dan Grafana sebagai dashboard tunggal bagi semua server. Ditambah healthcheck monitor terpisah yang mengirim notifikasi begitu ada server mati atau tidak bisa dijangkau — sehingga gangguan ketahuan dari sisi luar, bukan hanya dari dalam server yang sedang bermasalah itu sendiri.',
    hasil: [
      'CPU, RAM, disk, dan jaringan seluruh server terpantau dalam satu dashboard',
      'Healthcheck mengirim notifikasi begitu ada server mati atau offline',
      'Sebagian besar gangguan tertangani sebelum ada user yang sempat melapor',
      'Data historis dipakai untuk membaca tren, bukan cuma kondisi sesaat',
    ],
    stack: ['Prometheus', 'Grafana', 'Netdata', 'Docker'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Jaringan MikroTik Multi-VLAN untuk 400+ User',
    subjudul: '100+ rule firewall, segmentasi VLAN, dan pembagian bandwidth',
    tahun: '2025—kini',
    status: 'produksi',
    tag: ['Network', 'MikroTik', 'VLAN'],
    deskripsi:
      'Mengelola jaringan berbasis MikroTik untuk lingkungan dengan 400+ user aktif. Mencakup lebih dari 100 rule firewall, segmentasi VLAN antar zona, simple queue untuk membagi bandwidth per user, web filtering, serta jalur PPTP untuk akses dari luar kantor.',
    hasil: [
      '100+ rule firewall aktif dengan prinsip hanya membuka yang memang diperlukan',
      'Segmentasi VLAN memisahkan zona kerja, server, dan perangkat lapangan',
      'Simple queue mencegah satu user menghabiskan bandwidth seluruh kantor',
      'Web filtering berjalan otomatis; PPTP menyediakan jalur akses dari luar kantor',
    ],
    stack: ['MikroTik RouterOS', 'VLAN', 'Simple Queue', 'PPTP', 'Web Filtering'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Operasional 300+ Titik CCTV',
    subjudul: 'Dipastikan menyala dan terekam setiap hari',
    tahun: '2025—kini',
    status: 'produksi',
    tag: ['Field', 'Network'],
    deskripsi:
      'Bertanggung jawab atas lebih dari 300 titik CCTV yang harus dipastikan menyala dan terekam setiap hari. Mencakup pengecekan rutin, penanganan titik yang mati, dan koordinasi perbaikan supaya tidak ada periode kosong pada rekaman — karena rekaman baru terasa nilainya justru saat dibutuhkan mendadak.',
    hasil: [
      '300+ titik kamera diperiksa dan dipastikan aktif setiap hari',
      'Titik yang mati ditangani cepat supaya tidak ada jeda rekaman',
      'Perangkat lapangan dipisahkan ke VLAN sendiri agar tidak mengganggu zona lain',
    ],
    stack: ['NVR', 'CCTV', 'VLAN', 'MikroTik'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Alur Pengembangan Software: dari Permintaan Departemen sampai Monitoring',
    subjudul: 'Tujuh tahap tetap yang saya jalankan untuk setiap permintaan sistem baru',
    tahun: '2025—kini',
    status: 'aktif',
    tag: ['Blueprint', 'Dokumentasi', 'Automation'],
    deskripsi:
      'Setiap permintaan pembuatan software dari departemen lain melewati alur yang sama, bukan ditangani seadanya menurut siapa yang meminta. Saya berada di sepanjang alur itu: menerjemahkan kebutuhan bisnis jadi rancangan, menyerahkannya ke developer, lalu mengurus sisi rilis sampai sistemnya berjalan dan terpantau. Alur yang tetap membuat hasilnya bisa diperkirakan dan kesalahan yang sama tidak terulang.',
    hasil: [
      'Setiap permintaan melewati alur yang sama, jadi hasilnya bisa diperkirakan',
      'Kebutuhan dipetakan lebih dulu — memperkecil selisih antara yang diminta dan yang dibangun',
      'Developer menerima rancangan yang siap dikerjakan, bukan tebakan',
      'Sistem baru masuk skema backup dan pemantauan di hari rilis, bukan menyusul kemudian',
      'Tahap demi tahapnya bisa dilihat di bagian Alur Kerja di atas halaman ini',
    ],
    stack: ['Analisa Proses', 'Flowchart', 'Blueprint Sistem', 'Git Flow', 'Docker', 'Prometheus'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Version Control Git Flow sebagai Project Administrator',
    subjudul: 'Menjaga riwayat rilis tetap tertelusur, dan mendokumentasikan tiap langkah deploy',
    tahun: '2025—kini',
    status: 'aktif',
    tag: ['Version Control', 'Dokumentasi', 'Automation'],
    deskripsi:
      'Bertindak sebagai project administrator untuk version control tim developer: mengatur model branching Git Flow, menjaga alur dari fitur sampai rilis tetap rapi, dan memastikan setiap perubahan yang masuk produksi bisa ditelusuri asalnya. Di sisi saya sendiri, setiap langkah deployment dan konfigurasi server didokumentasikan — supaya pekerjaan bisa diulang, diperiksa, dan diserahkan tanpa bergantung pada ingatan satu orang.',
    hasil: [
      'Model branching Git Flow diterapkan konsisten oleh tim developer',
      'Setiap perubahan yang masuk produksi dapat ditelusuri sampai ke asalnya',
      'Langkah deployment terdokumentasi, jadi rilis berikutnya tidak dimulai dari nol',
      'Konfigurasi server tercatat rapi — pemulihan dan serah terima jadi jauh lebih cepat',
    ],
    stack: ['Git', 'Git Flow', 'VS Code', 'Dokumentasi Teknis', 'Docker'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Jaringan Terpadu 2 KCP Bank Mandiri: Internet, Telepon, CCTV, Alarm',
    subjudul: 'Dari perencanaan sampai serah terima — empat sistem dalam satu kantor',
    tahun: '2019—2025',
    status: 'arsip',
    tag: ['Field', 'Network', 'Support'],
    deskripsi:
      'Merencanakan dan mengimplementasikan seluruh infrastruktur pendukung untuk kantor cabang pembantu Bank Mandiri di Sukoharjo dan Sragen: jaringan internet, jaringan telepon, sistem CCTV, dan alarm system. Pekerjaan dimulai dari survei lokasi dan perencanaan jalur — bukan sekadar memasang perangkat yang jalurnya sudah ditentukan orang lain.',
    hasil: [
      'Empat sistem berbeda dirancang dan dipasang dalam satu lingkungan kantor',
      'Jalur kabel direncanakan sejak awal, bukan disesuaikan setelah perangkat datang',
      'Lingkungan perbankan menuntut kerapian dan dokumentasi yang tidak bisa ditawar',
      'Diserahterimakan dalam kondisi siap operasional',
    ],
    stack: ['Jaringan LAN', 'PABX', 'CCTV', 'Alarm System', 'Cabling'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Migrasi Perangkat Jaringan Bank Tanpa Mengganggu Jam Operasional',
    subjudul: 'Dikerjakan pukul 19.00–04.00 supaya nasabah tidak pernah merasakannya',
    tahun: '2019—2025',
    status: 'arsip',
    tag: ['Field', 'Network'],
    deskripsi:
      'Memindahkan perangkat jaringan lokal di beberapa kantor cabang pembantu Bank Mandiri, antara lain KCP Purwantoro dan Tawangmangu. Seluruh pekerjaan dijadwalkan mulai pukul 19.00 sampai 04.00, karena kantor bank tidak boleh berhenti melayani. Jendela waktunya tetap: apa pun yang terjadi di lapangan, pagi harinya semua sudah harus berjalan normal.',
    hasil: [
      'Nol gangguan pada jam operasional — nasabah dan pegawai tidak merasakan perpindahannya',
      'Bekerja dalam jendela tetap sembilan jam, tanpa pilihan menunda ke hari berikutnya',
      'Pelabelan dan pemetaan diselesaikan sebelum hari-H supaya waktu di lokasi tidak terbuang',
      'Rencana mundur disiapkan untuk tiap tahap, bukan sekadar berharap semuanya lancar',
    ],
    stack: ['Jaringan LAN', 'Switch', 'Cabling', 'Dokumentasi Jaringan'],
    repo: '',
    demo: '',
  },
  {
    judul: 'CCTV 34 Titik Kantor BPN se-Jawa Tengah, Terpantau dari Satu Layar',
    subjudul: 'Kantor tersebar di banyak kota, pemantauan terpusat di Semarang',
    tahun: '2019—2025',
    status: 'arsip',
    tag: ['Field', 'Network', 'Support'],
    deskripsi:
      'Memasang 34 titik CCTV di kantor-kantor BPN yang tersebar di Jawa Tengah, lalu menyatukan seluruhnya agar dapat dipantau dari satu monitor di kantor pusat BPN Semarang. Tantangan sebenarnya bukan memasang kameranya, melainkan membuat lokasi-lokasi yang terpisah jauh tampil dalam satu layar yang masih bisa dibaca oleh satu orang.',
    hasil: [
      '34 titik kamera aktif tersebar di banyak kantor di seluruh Jawa Tengah',
      'Seluruh lokasi disatukan ke satu layar pemantauan di kantor pusat Semarang',
      'Pemantauan yang tadinya menuntut datang ke lokasi kini cukup dari satu tempat',
      'Jaringan disiapkan supaya rekaman tetap dapat diakses lintas kantor',
    ],
    stack: ['CCTV', 'NVR', 'Jaringan LAN', 'Remote Monitoring'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Support IT & Infrastruktur untuk 30+ Klien',
    subjudul: 'Hampir enam tahun sebagai vendor — satu orang, puluhan lokasi',
    tahun: '2019—2025',
    status: 'arsip',
    tag: ['Field', 'Network', 'Support'],
    deskripsi:
      'Selama hampir enam tahun menangani kebutuhan IT lebih dari 30 klien perusahaan dan perorangan sebagai vendor pengadaan barang dan jasa. Cakupannya luas: dari instalasi jaringan internet, telepon, dan alarm, sampai perawatan komputer, printer, CCTV, PABX, dan access control — sering kali di lokasi dan kondisi jaringan yang tidak pernah sama antar klien.',
    hasil: [
      '30+ klien perusahaan dan perorangan ditangani secara bersamaan',
      'Instalasi dan maintenance jaringan internet, jaringan telepon, dan jaringan alarm',
      'Perawatan perangkat: komputer, printer, CCTV, PABX, alarm, dan access control',
      'Terbiasa masuk ke lingkungan asing dan memetakan jaringannya sendiri tanpa dokumentasi',
    ],
    stack: ['Jaringan LAN', 'PABX', 'CCTV', 'Access Control', 'Alarm', 'Printer'],
    repo: '',
    demo: '',
  },
]

/* ------------------------------------------------------------
 *  8. PENGALAMAN KERJA
 * ---------------------------------------------------------- */
export const pengalaman = [
  {
    posisi: 'IT Support / System Administrator',
    perusahaan: 'PT Jayamas Medica Industri Tbk',
    periode: 'Februari 2025 — sekarang',
    poin: [
      'Daily support untuk 400+ user aktif: setup perangkat baru, pencatatan aset, dan pencatatan task agar setiap permintaan terlacak',
      'Mengelola 4 server dengan peran terpisah — development, staging, backup, dan production di VPS — sebagian berjalan di atas Docker, sebagian native',
      'Menyatukan seluruh layanan di bawah satu domain lewat reverse proxy, dipisah per subdomain',
      'Mengeraskan sisi keamanan dengan UFW dan Fail2Ban, ditambah notifikasi Telegram untuk setiap login yang masuk ke server',
      'Menjalankan backup terjadwal dengan notifikasi status dan uji restore pada setiap backup — bukan sekadar backup yang tidak pernah dibuka',
      'Memasang pemantauan Prometheus + Grafana dan healthcheck monitor yang mengirim notifikasi saat ada server mati atau offline',
      'Menjalankan alur tetap tujuh tahap untuk tiap permintaan software: analisa bisnis, flowchart, blueprint, testing, staging, deploy, lalu backup dan monitoring',
      'Bertindak sebagai project administrator untuk version control tim developer — mengatur model branching Git Flow dan menjaga riwayat rilis tetap tertelusur',
      'Mendokumentasikan setiap langkah deployment dan konfigurasi server, supaya pekerjaan bisa diulang dan diserahkan tanpa bergantung pada ingatan',
      'Mengelola jaringan MikroTik: 100+ rule firewall aktif, web filtering, simple queue, VLAN, dan PPTP',
      'Memastikan 300+ titik CCTV menyala dan terpantau setiap hari',
    ],
  },
  {
    posisi: 'IT Support — Vendor Pengadaan Barang & Jasa',
    perusahaan: '30+ klien perusahaan dan perorangan',
    periode: 'Mei 2019 — Januari 2025',
    poin: [
      'Menangani support IT untuk lebih dari 30 klien perusahaan dan perorangan secara bersamaan',
      'Instalasi dan maintenance jaringan internet, jaringan telepon, serta jaringan alarm',
      'Instalasi dan perawatan perangkat: komputer, printer, CCTV, PABX, alarm, dan access control',
      'Menangani project berskala institusi: jaringan terpadu kantor cabang Bank Mandiri, migrasi perangkat di luar jam operasional, dan 34 titik CCTV kantor BPN se-Jawa Tengah',
      'Menjadi titik kontak pertama user di sisi IT — dari keluhan harian sampai perbaikan langsung di lokasi klien',
    ],
  },
]

/* ------------------------------------------------------------
 *  9. SERTIFIKASI
 * ---------------------------------------------------------- */
/* Selama array ini kosong, kolom "Sertifikasi" otomatis disembunyikan
 * dan daftar riwayat pekerjaan melebar memenuhi lebar penuh.
 *
 * Untuk memunculkannya lagi, cukup isi array ini — tidak ada file lain
 * yang perlu disentuh. Formatnya:
 *
 *   { nama: 'MikroTik Certified Network Associate (MTCNA)',
 *     penerbit: 'MikroTik',
 *     tahun: '2026',
 *     url: 'https://...' },   // kosongkan '' kalau tidak ada tautan
 */
export const sertifikasi = []

/* ------------------------------------------------------------
 *  10. TERMINAL INTERAKTIF
 * ---------------------------------------------------------- */
/* Nilai berupa array = teks biasa.
 * Nilai berupa string KAPITAL = perintah khusus yang ditangani kode:
 *   'CONTACT' 'PROJECTS' 'STACK' 'STATUS' 'NEOFETCH'
 * Perintah goto / theme / cv / lang / clear / help ditangani otomatis. */
export const perintahTerminal = {
  whoami: [
      'nama    : Dian Rizki Wardana',
      'peran   : IT Support / System Administrator',
      'fokus   : Linux server, networking, security, on-prem infra',
      'prinsip : sistem yang baik adalah sistem yang tidak pernah dibicarakan',
    ],
  about: [
      'Saya senang membuat infrastruktur yang tidak pernah jadi berita.',
      'Server yang selalu hidup, jaringan yang stabil, backup yang bisa dipercaya.',
      '',
      '7 tahun pengalaman langsung di lapangan sejak Mei 2019 —',
      'dari vendor yang melayani 30+ klien, kini in-house',
      'menangani 400+ user, 4 server, dan 300+ titik CCTV.',
      '',
      'Di luar kantor: utak-atik homelab dan kopi hitam tanpa gula.',
    ],
  uptime: [
      'sistem aktif 7 tahun',
      'uptime rata-rata: 99%',
      'insiden terbuka : 0',
      'fail2ban aktif  : 1.847 IP diblokir',
    ],
  sudo: ['Maaf, kamu tidak ada di daftar sudoers. Kejadian ini dilaporkan.'],
  contact: 'CONTACT',
  projects: 'PROJECTS',
  skills: 'STACK',
  status: 'STATUS',
  neofetch: 'NEOFETCH',
}

/* ------------------------------------------------------------
 *  11. TEKS ANTARMUKA
 * ---------------------------------------------------------- */
export const ui = {
  nav: [
    { id: 'pipeline', label: 'Alur Kerja' },
    { id: 'status', label: 'Status' },
    { id: 'arsitektur', label: 'Arsitektur' },
    { id: 'stack', label: 'Stack' },
    { id: 'projects', label: 'Project' },
    { id: 'pengalaman', label: 'Pengalaman' },
    { id: 'kontak', label: 'Kontak' },
  ],
  hero: {
    ctaUtama: 'Lihat project',
    ctaKedua: 'Salin email',
    tersalin: 'Email tersalin',
    unduhCv: 'Unduh CV',
  },
  pipelineJudul: 'Dari server kosong sampai sistem terpantau',
  pipelineDeskripsi: 'Sebelas tahap tetap yang saya jalankan: tiga tahap menyiapkan fondasi infrastruktur, lalu delapan tahap dari permintaan sistem sampai berjalan dan terpantau. Klik tiap tahap untuk melihat isinya.',
  statusJudul: 'Riwayat uptime & insiden',
  statusDeskripsi: 'Angka uptime mudah diklaim. Ini kejadian nyatanya: apa yang rusak, kenapa, dan apa yang saya ubah supaya tidak terulang. Arahkan kursor ke batang berwarna untuk detailnya.',
  stackJudul: 'Alat yang saya pakai di lapangan',
  stackDeskripsi: 'Disaring per kategori. Semua sudah teruji di production — bukan cuma lab. Klik satu ikon untuk melihat project yang memakainya.',
  projectsJudul: 'Yang sudah saya kerjakan',
  projectsDeskripsi: 'Pilih satu untuk membuka detail dan hasilnya.',
  pengalamanJudul: 'Riwayat pekerjaan',
  kontakJudul: 'Mari bicara',
  kontakDeskripsi: 'Balasan biasanya di bawah 24 jam. Atau coba terminal di samping — ketik "help".',
  footer: 'Frontend: React + Vite · Backend: PHP 8.2 + CodeIgniter 4 · Server: Nginx + Ubuntu · DB: MySQL 8.0',

  /* Label kecil yang dipakai di banyak tempat */
  label: {
    semua: 'Semua',
    lewati: 'Lewati ke konten',
    layananNormal: 'semua layanan normal',
    menu: 'Menu',
    tutup: 'Tutup',
    cariPerintah: 'Cari halaman atau perintah…',
    buka: 'Buka',
    tindakan: 'Tindakan',
    temaTerang: 'Tema terang',
    temaGelap: 'Tema gelap',
    salinEmail: 'Salin email',
    hasil: 'hasil',
    stack: 'stack',
    lihatKode: 'Lihat kode',
    bukaDemo: 'Buka demo',
    sertifikasi: 'Sertifikasi',
    hariTerakhir: '90 hari terakhir',
    hariIni: 'hari ini',
    peran: 'Peran',
    spesifikasi: 'Spesifikasi',
    kenapa: 'Kenapa begitu',
    pilihNode: 'Pilih salah satu node di diagram untuk melihat detailnya.',
    dipakaiDi: 'dipakai di',
    project: 'project',
    kosongProject: 'Belum ada project dengan tag ini. Pilih tag lain.',
    resetFilter: 'Tampilkan semua',
    difilterDari: 'Difilter dari stack',
    hintTerminal: 'Tab untuk melengkapi perintah · panah atas untuk mengulang · "clear" untuk mengosongkan layar',
    konsolJudul: 'konsol — coba ketik sesuatu',
    uptimeKarier: 'uptime',
  },
}
