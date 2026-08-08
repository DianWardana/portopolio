/* ============================================================
 *  ISI PORTOFOLIO — EDIT FILE INI SAJA
 * ============================================================
 *  Semua teks, project, skill, dan pengalaman ada di sini.
 *  Kamu tidak perlu menyentuh file lain untuk mengganti konten.
 *  Setelah edit: simpan -> git commit -> git push -> otomatis ter-deploy.
 * ============================================================ */

/* ------------------------------------------------------------
 *  1. IDENTITAS
 * ---------------------------------------------------------- */
export const profile = {
  nama: 'Dian Rizki Wardana',
  inisial: 'DRW',
  judulBaris1: 'System',
  judulBaris2: 'Administrator',
  tagline:
    'Saya jaga server tetap hidup, jaringan tetap stabil, dan 800+ user tetap produktif — termasuk saat tidak ada yang sadar ada masalah.',
  lokasi: 'Mojokerto, Jawa Timur',
  zonaWaktu: 'Asia/Jakarta',
  ketersediaan: 'open',
  labelKetersediaan: 'Terbuka untuk peluang baru',
  email: 'rizkidian212@gmail.com',
  github: '',
  linkedin: '',
  cv: '',
  // Taruh foto di folder /public, lalu tulis '/foto.jpg' (atau .png, .webp)
  // Kosongkan ('') kalau belum punya — akan tampil inisial sebagai gantinya.
  foto: '/foto-profil.png',
}

/* ------------------------------------------------------------
 *  2. ANGKA RINGKAS
 * ---------------------------------------------------------- */
export const metrik = [
  { nilai: 99, sufiks: '%', desimal: 0, label: 'Uptime rata-rata', catatan: 'lingkungan produksi' },
  { nilai: 5, sufiks: ' tahun', desimal: 0, label: 'Pengalaman langsung', catatan: 'production environment' },
  { nilai: 1000, sufiks: '+', label: 'Tiket diselesaikan', catatan: 'IT support & sysadmin' },
  { nilai: 800, sufiks: '+', label: 'User aktif dikelola', catatan: 'high demand environment' },
]

/* ------------------------------------------------------------
 *  3. PIPELINE — diganti jadi "Alur Kerja Harian Sysadmin"
 * ---------------------------------------------------------- */
export const pipeline = [
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
      'Whitelist rules  : 48 aktif',
      'Blocked domain   : YouTube, apps filter',
      'VLAN segment     : 6 zona aktif',
      'Bandwidth queue  : per-user limit aktif',
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
]

/* ------------------------------------------------------------
 *  4. TOOLS & SKILL
 * ---------------------------------------------------------- */
export const kategoriStack = ['Semua', 'Linux/Server', 'Network', 'Virtualisasi', 'Database', 'Security', 'Monitoring', 'Field']

export const stack = [
  // Linux/Server
  { nama: 'Linux (Ubuntu)', kategori: 'Linux/Server', level: 5, catatan: '20.04 / 22.04 / 24.04 production' },
  { nama: 'Apache2', kategori: 'Linux/Server', level: 5, catatan: 'web server & reverse proxy hybrid' },
  { nama: 'Bash Scripting', kategori: 'Linux/Server', level: 4, catatan: 'automation, cron job, maintenance' },
  { nama: 'SSH Hardening', kategori: 'Linux/Server', level: 5, catatan: 'custom port, disable root, key-based auth' },
  { nama: 'DNS & SSL', kategori: 'Linux/Server', level: 4, catatan: 'Certbot, Let\'s Encrypt, domain management' },
  // Network
  { nama: 'MikroTik', kategori: 'Network', level: 5, catatan: 'queue, firewall, bandwidth, whitelist' },
  { nama: 'VLAN / Switch', kategori: 'Network', level: 4, catatan: 'Ruijie, UniFi, segmentasi jaringan' },
  { nama: 'Network Design', kategori: 'Network', level: 4, catatan: 'LAN skala kecil–menengah, troubleshoot' },
  // Virtualisasi & Container
  { nama: 'Docker', kategori: 'Virtualisasi', level: 4, catatan: 'multi-container, ±13 container running' },
  { nama: 'VMware ESXi', kategori: 'Virtualisasi', level: 4, catatan: 'ESXi, Workstation, VM management' },
  { nama: 'Proxmox', kategori: 'Virtualisasi', level: 3, catatan: 'basic usage, VM & container' },
  // Database
  { nama: 'MySQL / MariaDB', kategori: 'Database', level: 4, catatan: 'basic–intermediate, backup otomatis' },
  { nama: 'phpMyAdmin', kategori: 'Database', level: 4, catatan: 'management & troubleshoot' },
  // Security
  { nama: 'UFW Firewall', kategori: 'Security', level: 5, catatan: 'whitelist-based, deny by default' },
  { nama: 'Fail2Ban', kategori: 'Security', level: 5, catatan: 'block ratusan IP brute force' },
  { nama: 'Server Hardening', kategori: 'Security', level: 4, catatan: 'access control, network restriction' },
  // Monitoring
  { nama: 'Grafana', kategori: 'Monitoring', level: 4, catatan: 'dashboard server & service' },
  { nama: 'Prometheus', kategori: 'Monitoring', level: 3, catatan: 'metrics scraping & alerting' },
  { nama: 'Netdata', kategori: 'Monitoring', level: 4, catatan: 'real-time server monitoring' },
  // Field
  { nama: 'CCTV (Hikvision)', kategori: 'Field', level: 4, catatan: 'instalasi indoor & outdoor' },
  { nama: 'Jaringan Alarm Bank', kategori: 'Field', level: 4, catatan: 'instalasi & maintenance' },
  { nama: 'Access Control', kategori: 'Field', level: 3, catatan: 'door access system' },
]

/* ------------------------------------------------------------
 *  5. PROJECT
 * ---------------------------------------------------------- */
export const projects = [
  {
    judul: 'Deploy & Manage 4 Server Produksi Serentak',
    subjudul: 'Security, monitoring, backup, dan recovery dalam satu skema',
    tahun: '2024',
    status: 'produksi',
    tag: ['Linux', 'Docker', 'Security', 'Backup'],
    deskripsi:
      'Mengelola 4 server produksi secara bersamaan dengan peran yang berbeda: web server, database server, monitoring, dan backup. Setiap server dikonfigurasi dengan hardening penuh, monitoring real-time, dan skema backup-recovery yang terstruktur.',
    hasil: [
      'Uptime 99%+ dipertahankan di semua 4 server selama operasional',
      'Skema backup otomatis multi-database berjalan tanpa intervensi manual',
      'Fail2Ban memblokir 1.800+ IP berbahaya lintas server',
      'Recovery time teruji — service pulih dalam hitungan menit',
    ],
    stack: ['Ubuntu Server', 'Apache2', 'Docker', 'UFW', 'Fail2Ban', 'Grafana', 'Cron'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Infrastruktur Jaringan Multi-VLAN',
    subjudul: 'Segmentasi zona, bandwidth management, dan filtering terpusat',
    tahun: '2023',
    status: 'produksi',
    tag: ['Network', 'MikroTik', 'VLAN'],
    deskripsi:
      'Merancang dan mengimplementasikan infrastruktur jaringan dengan segmentasi VLAN untuk memisahkan zona kerja, server, dan tamu. MikroTik dikonfigurasi dengan queue per-user, firewall whitelist, dan filtering konten untuk 800+ user.',
    hasil: [
      '6 zona VLAN aktif — traffic antar zona terkontrol penuh',
      'Bandwidth per-user terbatas dan terdistribusi merata',
      'Filtering YouTube & aplikasi non-produktif berjalan otomatis',
      '800+ user terlayani dengan stabilitas jaringan terjaga',
    ],
    stack: ['MikroTik RouterOS', 'Ruijie Managed Switch', 'UniFi AP', 'VLAN'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Monitoring Stack: Grafana + Prometheus + Netdata',
    subjudul: 'Visibilitas penuh atas server dan service produksi',
    tahun: '2023',
    status: 'aktif',
    tag: ['Monitoring', 'Grafana', 'Prometheus'],
    deskripsi:
      'Membangun stack monitoring untuk semua server produksi menggunakan Grafana sebagai dashboard utama, Prometheus untuk metrik, dan Netdata untuk real-time monitoring. Alert dikonfigurasi untuk kondisi kritis sebelum jadi insiden.',
    hasil: [
      'Visibilitas CPU, RAM, disk, dan network di semua server dalam satu dashboard',
      'Alert proaktif — masalah terdeteksi sebelum user merasakan dampak',
      'Troubleshooting lebih cepat dengan data historis dan tren',
    ],
    stack: ['Grafana', 'Prometheus', 'Netdata', 'Docker'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Otomatisasi Backup Database Multi-Instance',
    subjudul: 'Backup terjadwal, recovery teruji, zero data loss',
    tahun: '2022',
    status: 'aktif',
    tag: ['Backup', 'MySQL', 'Automation'],
    deskripsi:
      'Merancang dan mengimplementasikan sistem backup otomatis untuk multiple database MySQL/MariaDB menggunakan cron job dan bash script. Termasuk verifikasi backup, notifikasi status, dan prosedur recovery yang terdokumentasi.',
    hasil: [
      'Semua database produksi ter-backup otomatis setiap malam',
      'Retensi 30 hari — histori backup selalu tersedia',
      'Prosedur recovery teruji dan terdokumentasi untuk setiap database',
      'Zero data loss dalam 3+ tahun operasional',
    ],
    stack: ['Bash', 'Cron', 'MySQL', 'MariaDB'],
    repo: '',
    demo: '',
  },
  {
    judul: 'Docker Multi-Container untuk Aplikasi Produksi',
    subjudul: '±13 container berjalan stabil di server on-premise',
    tahun: '2023',
    status: 'produksi',
    tag: ['Docker', 'Linux', 'PHP'],
    deskripsi:
      'Mengatur dan memelihara ±13 container Docker yang berjalan bersamaan di server produksi on-premise, mencakup web app, database, cache, dan service pendukung. Termasuk resource control, maintenance rutin, dan troubleshooting production error.',
    hasil: [
      '±13 container aktif berjalan stabil tanpa konflik resource',
      'Docker prune terjadwal — disk tidak membengkak',
      'HTTP 500 dan config error CI4 dapat ditangani langsung di level container',
    ],
    stack: ['Docker', 'Docker Compose', 'PHP', 'CodeIgniter 4', 'Apache2'],
    repo: '',
    demo: '',
  },
]

/* ------------------------------------------------------------
 *  6. PENGALAMAN KERJA
 * ---------------------------------------------------------- */
export const pengalaman = [
  {
    posisi: 'IT Support / System Administrator',
    perusahaan: 'Multi-perusahaan (±15 klien serentak)',
    periode: '2019 — sekarang',
    poin: [
      'Mengelola infrastruktur IT untuk ±15 perusahaan secara bersamaan, termasuk server, jaringan, dan end-user support',
      'Handle 800+ user aktif di lingkungan produksi dengan target uptime 99%+',
      'Menangani instalasi & maintenance CCTV (Hikvision), jaringan alarm bank, sistem telepon, dan access control',
      'Deploy dan kelola 4 server produksi secara bersamaan dengan skema backup, monitoring, dan security terpadu',
      'Merancang infrastruktur jaringan LAN skala kecil–menengah dari nol termasuk VLAN, firewall, dan bandwidth management',
    ],
  },
]

/* ------------------------------------------------------------
 *  7. SERTIFIKASI
 * ---------------------------------------------------------- */
export const sertifikasi = [
  { nama: 'MikroTik Certified Network Associate (MTCNA)', penerbit: 'MikroTik', tahun: '', url: '' },
  { nama: 'Linux Server Administration', penerbit: 'Praktik Mandiri', tahun: '', url: '' },
]

/* ------------------------------------------------------------
 *  8. TERMINAL INTERAKTIF
 * ---------------------------------------------------------- */
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
    '5 tahun pengalaman langsung di production environment,',
    'mengelola 800+ user dan ±15 perusahaan sekaligus.',
    '',
    'Di luar kantor: utak-atik homelab dan kopi hitam tanpa gula.',
  ],
  uptime: [
    'sistem aktif 5 tahun',
    'uptime rata-rata: 99%',
    'insiden terbuka : 0',
    'fail2ban aktif  : 1.847 IP diblokir',
  ],
  contact: 'CONTACT',
  projects: 'PROJECTS',
  skills: 'STACK',
  sudo: ['Maaf, kamu tidak ada di daftar sudoers. Kejadian ini dilaporkan.'],
}

/* ------------------------------------------------------------
 *  9. TEKS ANTARMUKA
 * ---------------------------------------------------------- */
export const ui = {
  nav: [
    { id: 'pipeline', label: 'Alur Kerja' },
    { id: 'stack', label: 'Stack' },
    { id: 'projects', label: 'Project' },
    { id: 'pengalaman', label: 'Pengalaman' },
    { id: 'kontak', label: 'Kontak' },
  ],
  hero: { ctaUtama: 'Lihat project', ctaKedua: 'Salin email' },
  pipelineJudul: 'Cara saya menjaga sistem tetap hidup',
  pipelineDeskripsi: 'Klik tiap tahap untuk melihat apa yang sebenarnya saya kerjakan sehari-hari.',
  stackJudul: 'Alat yang saya pakai di lapangan',
  stackDeskripsi: 'Disaring per kategori. Semua sudah teruji di production — bukan cuma lab.',
  projectsJudul: 'Yang sudah saya kerjakan',
  projectsDeskripsi: 'Pilih satu untuk membuka detail dan hasilnya.',
  pengalamanJudul: 'Jejak pekerjaan',
  kontakJudul: 'Mari bicara',
  kontakDeskripsi: 'Balasan biasanya di bawah 24 jam. Atau coba terminal di samping — ketik "help".',
  footer: 'Dibangun dengan React dan Vite. Di-deploy otomatis lewat GitHub Actions.',
}
