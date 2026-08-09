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

  /* Isi kalau sudah punya. Kosongkan ('') untuk menyembunyikan tombolnya. */
  github: '',
  linkedin: '',
  cv: '', // contoh: 'cv-dian.pdf' (taruh filenya di folder /public)

  /* File foto ada di folder /public. Tulis nama filenya saja. */
  foto: 'foto-profil.png',

  /* Dipakai untuk penghitung "uptime karier" hidup di navbar. */
  mulaiKarier: '2019-05-01',
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
    nilai: 7,
    sufiks: ' tahun',
    desimal: 0,
    label: 'Pengalaman langsung',
    catatan: 'sejak Mei 2019',
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
  {
    id: 'deploy',
    nama: 'Deploy',
    durasi: 'on demand',
    ringkas: 'Deploy manual ke server & VPS: Apache2, PHP/CI4, MySQL, Docker multi-container.',
    tools: ['Apache2', 'Docker', 'Git'],
    log: [
      '$ git pull origin main',
      'Already up to date.',
      '$ docker compose up -d --build',
      'Container app_web    Started',
      'Container app_db     Running',
      'Container app_cache  Running',
      '13 container aktif',
    ],
  },
  {
    id: 'network',
    nama: 'Network',
    durasi: 'managed',
    ringkas: 'VLAN segmentation, MikroTik queue & firewall, bandwidth management, filtering.',
    tools: ['MikroTik', 'Ruijie', 'UniFi'],
    log: [
      '$ /ip firewall filter print',
      'Firewall rules   : 100+ aktif',
      'Blocked domain   : YouTube, apps filter',
      'VLAN segment     : 6 zona aktif',
      'Bandwidth queue  : per-user limit aktif',
    ],
  },
  {
    id: 'secure',
    nama: 'Harden',
    durasi: 'baseline',
    ringkas: 'SSH port custom, root login dimatikan, UFW whitelist-based, Fail2Ban aktif.',
    tools: ['UFW', 'Fail2Ban', 'SSH'],
    log: [
      '$ fail2ban-client status sshd',
      'Currently banned : 312 IP',
      'Total banned     : 1.847 IP',
      'UFW default: deny (incoming)',
      'Root login: disabled',
    ],
  },
  {
    id: 'backup',
    nama: 'Backup',
    durasi: 'cron',
    ringkas: 'Backup database multi-instance otomatis via cron, strategi recovery siap pakai.',
    tools: ['Cron', 'MySQL', 'MariaDB'],
    log: [
      '$ crontab -l | grep backup',
      '0 2 * * * /scripts/db-backup-all.sh',
      'Backup db_produksi  : ok  [02:00]',
      'Backup db_laporan   : ok  [02:04]',
      'Backup db_arsip     : ok  [02:07]',
      'Retention: 30 hari',
    ],
  },
  {
    id: 'resolve',
    nama: 'Resolve',
    durasi: 'on-call',
    ringkas: 'Troubleshooting real case: HTTP 500, network drop, service mati, akses terkunci.',
    tools: ['Bash', 'journalctl', 'tcpdump'],
    log: [
      '$ journalctl -u apache2 --since "1h ago"',
      'Error: PHP Fatal error CI4 config',
      'Action: fix env, reload apache2',
      'Service restored in < 5 menit',
      'Root cause: env variable missing after deploy',
    ],
  },
  {
    id: 'monitor',
    nama: 'Monitor',
    durasi: '24/7',
    ringkas: 'Sistem tidak pernah tidur. Dashboard Grafana & Netdata selalu terbuka.',
    tools: ['Grafana', 'Prometheus', 'Netdata'],
    log: [
      '$ netdata-cli status',
      'CPU usage    : 12% (normal)',
      'RAM free     : 4.1 GB / 8 GB',
      'Disk I/O     : 18 MB/s',
      'Alert aktif  : 0',
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
export const kategoriStack = ['Semua', 'Linux/Server', 'Network', 'Virtualisasi', 'Database', 'Security', 'Monitoring', 'Field']

/* `proyek` = daftar tag project yang memakai tool ini.
 * Dipakai untuk fitur klik ikon → filter project otomatis. */
export const stack = [
  // Linux/Server
  { nama: 'Linux (Ubuntu)', kategori: 'Linux/Server', level: 5, catatan: '20.04 / 22.04 / 24.04 production', proyek: 'Linux' },
  { nama: 'Apache2', kategori: 'Linux/Server', level: 5, catatan: 'web server & reverse proxy hybrid', proyek: 'Linux' },
  { nama: 'Bash Scripting', kategori: 'Linux/Server', level: 4, catatan: 'automation, cron job, maintenance', proyek: 'Automation' },
  { nama: 'SSH Hardening', kategori: 'Linux/Server', level: 5, catatan: 'custom port, disable root, key-based auth', proyek: 'Security' },
  { nama: 'DNS & SSL', kategori: 'Linux/Server', level: 4, catatan: "Certbot, Let's Encrypt, domain management", proyek: 'Linux' },
  // Network
  { nama: 'MikroTik', kategori: 'Network', level: 5, catatan: 'queue, firewall, bandwidth, whitelist', proyek: 'MikroTik' },
  { nama: 'VLAN / Switch', kategori: 'Network', level: 4, catatan: 'Ruijie, UniFi, segmentasi jaringan', proyek: 'VLAN' },
  { nama: 'Network Design', kategori: 'Network', level: 4, catatan: 'LAN skala kecil–menengah, troubleshoot', proyek: 'Network' },
  { nama: 'Ruijie', kategori: 'Network', level: 5, catatan: 'Whitelist management, AP Mesh deployment, AI Roaming optimization', proyek: 'VLAN' },
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
    judul: 'Blueprint Sistem dari Analisa Alur Bisnis',
    subjudul: 'Menerjemahkan cara kerja departemen lain menjadi rancangan siap bangun',
    tahun: '2025—kini',
    status: 'aktif',
    tag: ['Blueprint'],
    deskripsi:
      'Menganalisa alur kerja departemen lain, memetakan proses yang sedang berjalan, lalu menyusunnya menjadi blueprint sistem yang siap dikerjakan tim developer. Peran ini menjembatani kebutuhan pengguna di lapangan dengan orang yang menuliskan kodenya — dua pihak yang sering bicara dalam bahasa yang berbeda.',
    hasil: [
      'Alur kerja departemen dipetakan lebih dulu sebelum satu baris kode ditulis',
      'Blueprint diserahkan ke developer dalam bentuk yang langsung bisa dikerjakan',
      'Mengurangi selisih antara apa yang dibutuhkan pengguna dan apa yang akhirnya dibangun',
    ],
    stack: ['Analisa Proses', 'Dokumentasi', 'Blueprint Sistem'],
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
      'Menganalisa alur bisnis departemen lain, menyusunnya menjadi blueprint sistem, lalu menyerahkannya ke tim developer',
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
      'Menjadi titik kontak pertama user di sisi IT — dari keluhan harian sampai perbaikan langsung di lokasi klien',
    ],
  },
]

/* ------------------------------------------------------------
 *  9. SERTIFIKASI
 * ---------------------------------------------------------- */
export const sertifikasi = [
  { nama: 'MikroTik Certified Network Associate (MTCNA)', penerbit: 'MikroTik', tahun: '', url: '' },
  { nama: 'Linux Server Administration', penerbit: 'Praktik Mandiri', tahun: '', url: '' },
]

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
  pipelineJudul: 'Cara saya menjaga sistem tetap hidup',
  pipelineDeskripsi: 'Klik tiap tahap untuk melihat apa yang sebenarnya saya kerjakan sehari-hari.',
  statusJudul: 'Riwayat uptime & insiden',
  statusDeskripsi: 'Angka uptime mudah diklaim. Ini kejadian nyatanya: apa yang rusak, kenapa, dan apa yang saya ubah supaya tidak terulang. Arahkan kursor ke batang berwarna untuk detailnya.',
  stackJudul: 'Alat yang saya pakai di lapangan',
  stackDeskripsi: 'Disaring per kategori. Semua sudah teruji di production — bukan cuma lab. Klik satu ikon untuk melihat project yang memakainya.',
  projectsJudul: 'Yang sudah saya kerjakan',
  projectsDeskripsi: 'Pilih satu untuk membuka detail dan hasilnya.',
  pengalamanJudul: 'Riwayat pekerjaan',
  kontakJudul: 'Mari bicara',
  kontakDeskripsi: 'Balasan biasanya di bawah 24 jam. Atau coba terminal di samping — ketik "help".',
  footer: 'Dibangun dengan React dan Vite. Di-deploy otomatis lewat GitHub Actions.',

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
