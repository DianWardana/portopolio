/* ============================================================
 *  ISI PORTOFOLIO — EDIT FILE INI SAJA
 * ============================================================
 *  Semua teks, project, skill, dan pengalaman ada di sini.
 *  Kamu tidak perlu menyentuh file lain untuk mengganti konten.
 *  Setelah edit: simpan -> git commit -> git push -> otomatis ter-deploy.
 *
 *  DUA BAHASA
 *  ----------
 *  Teks bisa ditulis dua cara:
 *    'Halo'                          → dipakai untuk ID dan EN
 *    { id: 'Halo', en: 'Hello' }     → ikut tombol bahasa di navbar
 *  Kalau `en` belum diisi, otomatis pakai teks Indonesia. Aman.
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
  tagline: {
    id: 'Saya menjaga server tetap hidup, jaringan tetap stabil, dan 400+ user tetap produktif — termasuk saat tidak ada yang sadar ada masalah.',
    en: 'I keep servers alive, networks stable, and 400+ users productive — including when nobody notices anything was wrong.',
  },
  lokasi: { id: 'Mojokerto, Jawa Timur', en: 'Mojokerto, East Java, Indonesia' },
  zonaWaktu: 'Asia/Jakarta',
  ketersediaan: 'open',
  labelKetersediaan: {
    id: 'Terbuka untuk peluang baru',
    en: 'Open to new opportunities',
  },
  email: 'dianwardana.tech@gmail.com',

  /* Isi kalau sudah punya. Kosongkan ('') untuk menyembunyikan tombolnya. */
  github: '',
  linkedin: '',
  cv: '', // contoh: 'cv-dian.pdf' (taruh filenya di folder /public)

  /* File foto ada di folder /public. Tulis nama filenya saja. */
  foto: 'foto-profil.png',

  /* Dipakai untuk penghitung "uptime karier" hidup di navbar. */
  mulaiKarier: '2019-01-01',
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
    label: { id: 'Uptime rata-rata', en: 'Average uptime' },
    catatan: { id: 'lingkungan produksi', en: 'production environment' },
    tren: [97.8, 98.4, 99.1, 98.9, 99.4, 99.2, 99.6, 99.3, 99.7, 99.5, 99.8, 99.6],
  },
  {
    nilai: 5,
    sufiks: { id: ' tahun', en: ' years' },
    desimal: 0,
    label: { id: 'Pengalaman langsung', en: 'Hands-on experience' },
    catatan: { id: 'lingkungan produksi', en: 'production environment' },
    tren: [1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5],
  },
  {
    nilai: 1000,
    sufiks: '+',
    label: { id: 'Tiket diselesaikan', en: 'Tickets resolved' },
    catatan: { id: 'IT support & sysadmin', en: 'IT support & sysadmin' },
    tren: [120, 180, 260, 330, 410, 500, 590, 680, 760, 850, 930, 1000],
  },
  {
    nilai: 400,
    sufiks: '+',
    label: { id: 'User aktif dikelola', en: 'Active users managed' },
    catatan: { id: 'lingkungan high-demand', en: 'high-demand environment' },
    tren: [90, 130, 170, 210, 240, 280, 310, 330, 360, 380, 395, 400],
  },
]

/* ------------------------------------------------------------
 *  3. PIPELINE — Alur Kerja Harian Sysadmin
 * ---------------------------------------------------------- */
export const pipeline = [
  {
    id: 'monitor',
    nama: 'Monitor',
    durasi: '24/7',
    ringkas: {
      id: 'Sistem tidak pernah tidur. Dashboard Grafana & Netdata selalu terbuka.',
      en: 'Systems never sleep. Grafana & Netdata dashboards stay open all day.',
    },
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
    ringkas: {
      id: 'SSH port custom, root login dimatikan, UFW whitelist-based, Fail2Ban aktif.',
      en: 'Custom SSH port, root login disabled, whitelist-based UFW, Fail2Ban running.',
    },
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
    ringkas: {
      id: 'Deploy manual ke server & VPS: Apache2, PHP/CI4, MySQL, Docker multi-container.',
      en: 'Manual deploys to on-prem servers & VPS: Apache2, PHP/CI4, MySQL, multi-container Docker.',
    },
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
    ringkas: {
      id: 'VLAN segmentation, MikroTik queue & firewall, bandwidth management, filtering.',
      en: 'VLAN segmentation, MikroTik queues & firewall, bandwidth management, content filtering.',
    },
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
    ringkas: {
      id: 'Backup database multi-instance otomatis via cron, strategi recovery siap pakai.',
      en: 'Automated multi-instance database backups via cron, with a tested recovery playbook.',
    },
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
    ringkas: {
      id: 'Troubleshooting real case: HTTP 500, network drop, service mati, akses terkunci.',
      en: 'Real-world troubleshooting: HTTP 500s, network drops, dead services, lockouts.',
    },
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
    nama: { id: 'Server Produksi (4 node)', en: 'Production servers (4 nodes)' },
    uptime: 99.94,
    insiden: [
      {
        hariLalu: 12,
        tingkat: 'gangguan',
        durasi: '8 menit',
        judul: { id: 'Apache2 gagal reload setelah deploy', en: 'Apache2 failed to reload after deploy' },
        sebab: {
          id: 'Variable environment CI4 hilang saat deploy — PHP fatal error, HTTP 500 di satu vhost.',
          en: 'A CI4 environment variable went missing during deploy — PHP fatal error, HTTP 500 on one vhost.',
        },
        solusi: {
          id: 'Ketahuan dari alert Grafana sebelum ada user lapor. Perbaiki .env, reload Apache2, tambahkan pengecekan env ke skrip deploy supaya tidak terulang.',
          en: 'Caught by a Grafana alert before any user reported it. Fixed .env, reloaded Apache2, and added an env check to the deploy script so it cannot repeat.',
        },
      },
      {
        hariLalu: 41,
        tingkat: 'gangguan',
        durasi: '15 menit',
        judul: { id: 'Disk usage 92% di server database', en: 'Disk usage hit 92% on the database server' },
        sebab: {
          id: 'Log Docker menumpuk tanpa rotasi, ditambah arsip backup lama yang belum terhapus.',
          en: 'Docker logs piled up without rotation, plus old backup archives that were never pruned.',
        },
        solusi: {
          id: 'Bersihkan dengan docker prune, aktifkan log rotation, pasang alert di ambang 80% supaya ketahuan jauh sebelum kritis.',
          en: 'Cleared with docker prune, enabled log rotation, and set an alert at the 80% threshold to catch it far earlier.',
        },
      },
    ],
  },
  {
    nama: { id: 'Jaringan & VLAN (6 zona)', en: 'Network & VLAN (6 zones)' },
    uptime: 99.87,
    insiden: [
      {
        hariLalu: 27,
        tingkat: 'down',
        durasi: '22 menit',
        judul: { id: 'Uplink switch core putus', en: 'Core switch uplink went down' },
        sebab: {
          id: 'Kabel uplink antara switch core dan distribusi longgar setelah pekerjaan rapikan rak.',
          en: 'The uplink cable between core and distribution switch worked loose after rack tidying work.',
        },
        solusi: {
          id: 'Isolasi cepat dari topologi, ganti patch cable, labeli ulang seluruh port uplink dan foto kondisi rak sebagai dokumentasi.',
          en: 'Isolated quickly using the topology map, replaced the patch cable, relabelled every uplink port and photographed the rack as documentation.',
        },
      },
      {
        hariLalu: 63,
        tingkat: 'gangguan',
        durasi: '11 menit',
        judul: { id: 'Bandwidth jenuh di jam sibuk', en: 'Bandwidth saturated at peak hour' },
        sebab: {
          id: 'Beberapa klien melakukan update besar bersamaan tanpa batas queue per-user.',
          en: 'Several clients ran large updates at the same time with no per-user queue limit.',
        },
        solusi: {
          id: 'Terapkan queue per-user di MikroTik dan prioritaskan traffic aplikasi kerja di atas traffic hiburan.',
          en: 'Applied per-user queues on MikroTik and prioritised work-app traffic over entertainment traffic.',
        },
      },
    ],
  },
  {
    nama: { id: 'Backup Otomatis', en: 'Automated backups' },
    uptime: 100,
    insiden: [],
  },
  {
    nama: { id: 'Monitoring Stack', en: 'Monitoring stack' },
    uptime: 99.98,
    insiden: [
      {
        hariLalu: 55,
        tingkat: 'gangguan',
        durasi: '6 menit',
        judul: { id: 'Prometheus berhenti scraping satu target', en: 'Prometheus stopped scraping one target' },
        sebab: {
          id: 'Container exporter mati setelah restart host dan tidak diset restart otomatis.',
          en: 'The exporter container died after a host restart and had no automatic restart policy.',
        },
        solusi: {
          id: 'Set restart: unless-stopped di compose, dan tambah alert khusus untuk target yang hilang dari Prometheus.',
          en: 'Set restart: unless-stopped in compose, and added a dedicated alert for targets missing from Prometheus.',
        },
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
  judul: { id: 'Arsitektur yang saya bangun', en: 'The architecture I built' },
  deskripsi: {
    id: 'Sederhanaan dari infrastruktur yang saya kelola sehari-hari. Klik tiap node untuk melihat perannya, spesifikasi, dan alasan di balik keputusannya.',
    en: 'A simplified view of the infrastructure I run day to day. Click any node to see its role, specs, and the reasoning behind each decision.',
  },
  node: [
    {
      id: 'isp',
      nama: 'ISP / WAN',
      jenis: 'wan',
      x: 500,
      y: 48,
      detail: {
        peran: { id: 'Jalur internet masuk', en: 'Inbound internet link' },
        spek: ['Dedicated line + backup link', 'Failover otomatis', 'Public IP statis'],
        catatan: {
          id: 'Dua jalur dipakai supaya kantor tidak berhenti kerja saat satu provider bermasalah. Failover diuji berkala, bukan cuma diasumsikan jalan.',
          en: 'Two links so the office keeps working when one provider fails. Failover is tested regularly, not just assumed to work.',
        },
      },
    },
    {
      id: 'mikrotik',
      nama: 'MikroTik',
      jenis: 'router',
      x: 500,
      y: 158,
      detail: {
        peran: { id: 'Router utama, firewall, bandwidth manager', en: 'Core router, firewall, bandwidth manager' },
        spek: ['48 firewall rule whitelist-based', 'Queue per-user aktif', 'Filtering YouTube & aplikasi non-produktif', 'NAT + port forwarding terkontrol'],
        catatan: {
          id: 'Firewall pakai prinsip deny by default — hanya yang perlu yang dibuka. Queue per-user mencegah satu orang menghabiskan bandwidth seluruh kantor.',
          en: 'The firewall is deny-by-default — only what is needed gets opened. Per-user queues stop one person from eating the whole office bandwidth.',
        },
      },
    },
    {
      id: 'core',
      nama: 'Switch Core',
      jenis: 'switch',
      x: 500,
      y: 268,
      detail: {
        peran: { id: 'Distribusi VLAN ke seluruh zona', en: 'Distributes VLANs across every zone' },
        spek: ['Ruijie managed switch', '6 VLAN aktif', 'Trunk port ke switch akses', 'Port uplink berlabel & terdokumentasi'],
        catatan: {
          id: 'Segmentasi VLAN memisahkan zona server, karyawan, tamu, CCTV, dan perangkat lapangan. Kalau satu zona bermasalah, zona lain tidak ikut terbawa.',
          en: 'VLAN segmentation separates the server, staff, guest, CCTV, and field-device zones. When one zone has a problem, the others are unaffected.',
        },
      },
    },
    {
      id: 'vlan-srv',
      nama: 'VLAN Server',
      jenis: 'switch',
      x: 190,
      y: 372,
      detail: {
        peran: { id: 'Zona khusus server produksi', en: 'Dedicated production server zone' },
        spek: ['Akses dibatasi per-IP', 'Tidak bisa diakses langsung dari VLAN tamu', 'Traffic antar zona lewat firewall'],
        catatan: {
          id: 'Server tidak pernah berada di segmen yang sama dengan laptop karyawan. Ini lapis pertahanan paling murah dan paling sering dilewatkan orang.',
          en: 'Servers never share a segment with staff laptops. It is the cheapest layer of defence and the one most often skipped.',
        },
      },
    },
    {
      id: 'vlan-user',
      nama: 'VLAN User',
      jenis: 'switch',
      x: 500,
      y: 372,
      detail: {
        peran: { id: 'Zona karyawan & tamu', en: 'Staff & guest zone' },
        spek: ['400+ user aktif', 'Bandwidth per-user dibatasi', 'Guest terisolasi dari jaringan internal'],
        catatan: {
          id: 'Zona dengan jumlah perangkat terbesar. Tamu benar-benar terisolasi — bisa internet, tidak bisa menyentuh apa pun di dalam.',
          en: 'The zone with the most devices. Guests are genuinely isolated — internet yes, internal resources no.',
        },
      },
    },
    {
      id: 'vlan-field',
      nama: 'VLAN Field',
      jenis: 'switch',
      x: 810,
      y: 372,
      detail: {
        peran: { id: 'CCTV, alarm bank, access control', en: 'CCTV, bank alarm, access control' },
        spek: ['NVR & kamera indoor/outdoor', 'Jaringan alarm bank', 'Door access system'],
        catatan: {
          id: 'Perangkat lapangan sering punya firmware lama yang tidak bisa di-update. Solusinya bukan memaksa update, tapi mengurungnya di VLAN sendiri.',
          en: 'Field devices often run old firmware that cannot be updated. The answer is not forcing updates, but fencing them into their own VLAN.',
        },
      },
    },
    {
      id: 'esxi',
      nama: 'VMware ESXi',
      jenis: 'server',
      x: 90,
      y: 480,
      detail: {
        peran: { id: 'Host virtualisasi', en: 'Virtualisation host' },
        spek: ['Beberapa VM produksi', 'Snapshot sebelum tiap perubahan besar', 'Resource dialokasikan per beban kerja'],
        catatan: {
          id: 'Snapshot diambil sebelum tiap perubahan besar. Bukan karena pesimis, tapi karena rollback 2 menit jauh lebih murah daripada rebuild 2 jam.',
          en: 'Snapshots are taken before every major change. Not pessimism — a two-minute rollback is far cheaper than a two-hour rebuild.',
        },
      },
    },
    {
      id: 'docker',
      nama: 'Docker Host',
      jenis: 'vm',
      x: 290,
      y: 480,
      detail: {
        peran: { id: '±13 container aplikasi produksi', en: '~13 production application containers' },
        spek: ['Web app (PHP / CodeIgniter 4)', 'Database & cache', 'Exporter monitoring', 'Docker prune terjadwal'],
        catatan: {
          id: 'Docker prune dijadwalkan supaya disk tidak membengkak pelan-pelan — masalah klasik yang baru terasa saat server sudah penuh.',
          en: 'Docker prune runs on a schedule so the disk does not creep full — a classic problem you only notice once the server is already out of space.',
        },
      },
    },
    {
      id: 'ap',
      nama: 'AP Mesh',
      jenis: 'ap',
      x: 500,
      y: 480,
      detail: {
        peran: { id: 'Wi-Fi untuk seluruh area kerja', en: 'Wi-Fi covering the whole work area' },
        spek: ['Ruijie AP Mesh', 'AI Roaming optimization', 'Whitelist MAC untuk zona sensitif', 'SSID terpisah per VLAN'],
        catatan: {
          id: 'AI Roaming diaktifkan supaya perangkat berpindah AP tanpa memutus sesi — keluhan "wifi putus-putus saat jalan" hilang setelah ini.',
          en: 'AI Roaming keeps devices moving between APs without dropping sessions — the "wifi cuts out when I walk" complaints stopped after this.',
        },
      },
    },
    {
      id: 'backup',
      nama: 'Backup Server',
      jenis: 'storage',
      x: 700,
      y: 480,
      detail: {
        peran: { id: 'Backup database multi-instance', en: 'Multi-instance database backups' },
        spek: ['Cron harian jam 02:00', 'Retensi 30 hari', 'Verifikasi backup otomatis', 'Prosedur recovery terdokumentasi'],
        catatan: {
          id: 'Backup yang tidak pernah diuji bukan backup, cuma harapan. Restore diuji berkala supaya angka "zero data loss" ada buktinya.',
          en: 'An untested backup is not a backup, it is a hope. Restores are tested regularly so "zero data loss" has evidence behind it.',
        },
      },
    },
    {
      id: 'monitoring',
      nama: 'Monitoring',
      jenis: 'server',
      x: 900,
      y: 480,
      detail: {
        peran: { id: 'Grafana + Prometheus + Netdata', en: 'Grafana + Prometheus + Netdata' },
        spek: ['Dashboard tunggal untuk semua server', 'Alert sebelum jadi insiden', 'Data historis untuk analisis tren'],
        catatan: {
          id: 'Tujuannya bukan grafik yang bagus, tapi tahu duluan sebelum user tahu. Sebagian besar insiden di halaman status ini ketahuan dari sini.',
          en: 'The point is not pretty graphs, it is knowing before users do. Most incidents on the status page above were caught here first.',
        },
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
  { nama: 'NVR & CCTV', kategori: 'Field', level: 4, catatan: 'instalasi indoor & outdoor', proyek: '' },
  { nama: 'Jaringan Alarm Bank', kategori: 'Field', level: 4, catatan: 'instalasi & maintenance', proyek: '' },
  { nama: 'Access Control', kategori: 'Field', level: 3, catatan: 'door access system', proyek: '' },
]

/* ------------------------------------------------------------
 *  7. PROJECT
 * ---------------------------------------------------------- */
export const projects = [
  {
    judul: {
      id: 'Deploy & Kelola 4 Server: On-Premise, VPS, Backup',
      en: 'Deploying & Managing 4 Servers: On-Premise, VPS, Backup',
    },
    subjudul: {
      id: 'Security, monitoring, backup, dan recovery dalam satu skema',
      en: 'Security, monitoring, backup, and recovery in one scheme',
    },
    tahun: '2025',
    status: 'produksi',
    tag: ['Linux', 'Docker', 'Security', 'Backup'],
    deskripsi: {
      id: 'Mengelola 4 server produksi secara bersamaan dengan peran yang berbeda: web server, database server, monitoring, dan backup. Setiap server dikonfigurasi dengan hardening penuh, monitoring real-time, dan skema backup-recovery yang terstruktur.',
      en: 'Running four production servers at once with distinct roles: web, database, monitoring, and backup. Each is fully hardened, monitored in real time, and covered by a structured backup-and-recovery scheme.',
    },
    hasil: [
      { id: 'Uptime 99%+ dipertahankan di semua 4 server selama operasional', en: '99%+ uptime sustained across all four servers in production' },
      { id: 'Skema backup otomatis multi-database berjalan tanpa intervensi manual', en: 'Automated multi-database backups run with zero manual intervention' },
      { id: 'Fail2Ban memblokir 1.800+ IP berbahaya lintas server', en: 'Fail2Ban blocked 1,800+ malicious IPs across servers' },
      { id: 'Recovery time teruji — service pulih dalam hitungan menit', en: 'Recovery time proven — services restored within minutes' },
    ],
    stack: ['Ubuntu Server', 'Apache2', 'Docker', 'UFW', 'Fail2Ban', 'Grafana', 'Cron'],
    repo: '',
    demo: '',
  },
  {
    judul: { id: 'Infrastruktur Jaringan Multi-VLAN', en: 'Multi-VLAN Network Infrastructure' },
    subjudul: {
      id: 'Segmentasi zona, bandwidth management, dan filtering terpusat',
      en: 'Zone segmentation, bandwidth management, and centralised filtering',
    },
    tahun: '2025',
    status: 'produksi',
    tag: ['Network', 'MikroTik', 'VLAN'],
    deskripsi: {
      id: 'Merancang dan mengimplementasikan infrastruktur jaringan dengan segmentasi VLAN untuk memisahkan zona kerja, server, dan tamu. MikroTik dikonfigurasi dengan queue per-user, firewall whitelist, dan filtering konten untuk 400+ user.',
      en: 'Designed and implemented a network with VLAN segmentation separating the work, server, and guest zones. MikroTik handles per-user queues, whitelist firewalling, and content filtering for 400+ users.',
    },
    hasil: [
      { id: '6 zona VLAN aktif — traffic antar zona terkontrol penuh', en: '6 active VLAN zones — inter-zone traffic fully controlled' },
      { id: 'Bandwidth per-user terbatas dan terdistribusi merata', en: 'Per-user bandwidth capped and evenly distributed' },
      { id: 'Filtering YouTube & aplikasi non-produktif berjalan otomatis', en: 'Automatic filtering of YouTube and non-productive apps' },
      { id: '400+ user terlayani dengan stabilitas jaringan terjaga', en: '400+ users served with network stability maintained' },
    ],
    stack: ['MikroTik RouterOS', 'Ruijie Managed Switch', 'UniFi AP', 'VLAN'],
    repo: '',
    demo: '',
  },
  {
    judul: { id: 'Monitoring Stack: Grafana + Prometheus + Netdata', en: 'Monitoring Stack: Grafana + Prometheus + Netdata' },
    subjudul: {
      id: 'Visibilitas penuh atas server dan service produksi',
      en: 'Full visibility over production servers and services',
    },
    tahun: '2025',
    status: 'aktif',
    tag: ['Monitoring', 'Grafana', 'Prometheus'],
    deskripsi: {
      id: 'Membangun stack monitoring untuk semua server produksi menggunakan Grafana sebagai dashboard utama, Prometheus untuk metrik, dan Netdata untuk real-time monitoring. Alert dikonfigurasi untuk kondisi kritis sebelum jadi insiden.',
      en: 'Built a monitoring stack for every production server: Grafana as the main dashboard, Prometheus for metrics, Netdata for real-time views. Alerts fire on critical conditions before they become incidents.',
    },
    hasil: [
      { id: 'Visibilitas CPU, RAM, disk, dan network di semua server dalam satu dashboard', en: 'CPU, RAM, disk, and network visibility for all servers in one dashboard' },
      { id: 'Alert proaktif — masalah terdeteksi sebelum user merasakan dampak', en: 'Proactive alerting — issues caught before users feel the impact' },
      { id: 'Troubleshooting lebih cepat dengan data historis dan tren', en: 'Faster troubleshooting using historical data and trends' },
    ],
    stack: ['Grafana', 'Prometheus', 'Netdata', 'Docker'],
    repo: '',
    demo: '',
  },
  {
    judul: { id: 'Otomatisasi Backup Database Multi-Instance', en: 'Automated Multi-Instance Database Backups' },
    subjudul: {
      id: 'Backup terjadwal, recovery teruji, zero data loss',
      en: 'Scheduled backups, tested recovery, zero data loss',
    },
    tahun: '2025',
    status: 'aktif',
    tag: ['Backup', 'MySQL', 'Automation'],
    deskripsi: {
      id: 'Merancang dan mengimplementasikan sistem backup otomatis untuk multiple database MySQL/MariaDB menggunakan cron job dan bash script. Termasuk verifikasi backup, notifikasi status, dan prosedur recovery yang terdokumentasi.',
      en: 'Designed and implemented automated backups for multiple MySQL/MariaDB databases using cron jobs and bash scripts — including backup verification, status notifications, and a documented recovery procedure.',
    },
    hasil: [
      { id: 'Semua database produksi ter-backup otomatis setiap malam', en: 'Every production database backed up automatically each night' },
      { id: 'Retensi 30 hari — histori backup selalu tersedia', en: '30-day retention — backup history always available' },
      { id: 'Prosedur recovery teruji dan terdokumentasi untuk setiap database', en: 'Recovery procedure tested and documented for every database' },
      { id: 'Zero data loss dalam 3+ tahun operasional', en: 'Zero data loss across 3+ years of operation' },
    ],
    stack: ['Bash', 'Cron', 'MySQL', 'MariaDB'],
    repo: '',
    demo: '',
  },
  {
    judul: { id: 'Docker Multi-Container untuk Aplikasi Produksi', en: 'Multi-Container Docker for Production Apps' },
    subjudul: {
      id: '±13 container berjalan stabil di server on-premise',
      en: '~13 containers running stably on on-premise servers',
    },
    tahun: '2025',
    status: 'produksi',
    tag: ['Docker', 'Linux', 'PHP'],
    deskripsi: {
      id: 'Mengatur dan memelihara ±13 container Docker yang berjalan bersamaan di server produksi on-premise, mencakup web app, database, cache, dan service pendukung. Termasuk resource control, maintenance rutin, dan troubleshooting production error.',
      en: 'Set up and maintain ~13 Docker containers running side by side on on-premise production servers — web apps, databases, cache, and supporting services — including resource control, routine maintenance, and production error troubleshooting.',
    },
    hasil: [
      { id: '±13 container aktif berjalan stabil tanpa konflik resource', en: '~13 active containers running stably with no resource conflicts' },
      { id: 'Docker prune terjadwal — disk tidak membengkak', en: 'Scheduled Docker prune — disk usage stays under control' },
      { id: 'HTTP 500 dan config error CI4 dapat ditangani langsung di level container', en: 'HTTP 500s and CI4 config errors handled directly at the container level' },
    ],
    stack: ['Docker', 'Docker Compose', 'PHP', 'CodeIgniter 4', 'Apache2'],
    repo: '',
    demo: '',
  },
]

/* ------------------------------------------------------------
 *  8. PENGALAMAN KERJA
 * ---------------------------------------------------------- */
export const pengalaman = [
  {
    posisi: { id: 'IT Support / System Administrator', en: 'IT Support / System Administrator' },
    perusahaan: { id: 'Multi-perusahaan (±15 klien serentak)', en: 'Multi-company (~15 concurrent clients)' },
    periode: { id: '2019 — sekarang', en: '2019 — present' },
    poin: [
      {
        id: 'Mengelola infrastruktur IT untuk ±15 perusahaan secara bersamaan, termasuk server, jaringan, dan end-user support',
        en: 'Manage IT infrastructure for ~15 companies simultaneously — servers, networks, and end-user support',
      },
      {
        id: 'Handle 400+ user aktif di lingkungan produksi dengan target uptime 99%+',
        en: 'Support 400+ active users in production with a 99%+ uptime target',
      },
      {
        id: 'Menangani instalasi & maintenance CCTV (Hikvision), jaringan alarm bank, sistem telepon, dan access control',
        en: 'Handle installation & maintenance of CCTV (Hikvision), bank alarm networks, phone systems, and access control',
      },
      {
        id: 'Deploy dan kelola 4 server produksi secara bersamaan dengan skema backup, monitoring, dan security terpadu',
        en: 'Deploy and run four production servers concurrently with integrated backup, monitoring, and security',
      },
      {
        id: 'Merancang infrastruktur jaringan LAN skala kecil–menengah dari nol termasuk VLAN, firewall, dan bandwidth management',
        en: 'Design small-to-medium LAN infrastructure from scratch, including VLANs, firewalls, and bandwidth management',
      },
    ],
  },
]

/* ------------------------------------------------------------
 *  9. SERTIFIKASI
 * ---------------------------------------------------------- */
export const sertifikasi = [
  { nama: 'MikroTik Certified Network Associate (MTCNA)', penerbit: 'MikroTik', tahun: '', url: '' },
  { nama: 'Linux Server Administration', penerbit: { id: 'Praktik Mandiri', en: 'Self-directed practice' }, tahun: '', url: '' },
]

/* ------------------------------------------------------------
 *  10. TERMINAL INTERAKTIF
 * ---------------------------------------------------------- */
/* Nilai berupa array = teks biasa.
 * Nilai berupa string KAPITAL = perintah khusus yang ditangani kode:
 *   'CONTACT' 'PROJECTS' 'STACK' 'STATUS' 'NEOFETCH'
 * Perintah goto / theme / cv / lang / clear / help ditangani otomatis. */
export const perintahTerminal = {
  whoami: {
    id: [
      'nama    : Dian Rizki Wardana',
      'peran   : IT Support / System Administrator',
      'fokus   : Linux server, networking, security, on-prem infra',
      'prinsip : sistem yang baik adalah sistem yang tidak pernah dibicarakan',
    ],
    en: [
      'name      : Dian Rizki Wardana',
      'role      : IT Support / System Administrator',
      'focus     : Linux servers, networking, security, on-prem infra',
      'principle : a good system is one nobody ever has to talk about',
    ],
  },
  about: {
    id: [
      'Saya senang membuat infrastruktur yang tidak pernah jadi berita.',
      'Server yang selalu hidup, jaringan yang stabil, backup yang bisa dipercaya.',
      '',
      '5 tahun pengalaman langsung di production environment,',
      'mengelola 400+ user dan ±15 perusahaan sekaligus.',
      '',
      'Di luar kantor: utak-atik homelab dan kopi hitam tanpa gula.',
    ],
    en: [
      'I like building infrastructure that never makes the news.',
      'Servers that stay up, networks that stay stable, backups you can trust.',
      '',
      '5 years of hands-on production experience,',
      'supporting 400+ users across ~15 companies at once.',
      '',
      'Outside work: tinkering with a homelab and black coffee, no sugar.',
    ],
  },
  uptime: {
    id: [
      'sistem aktif 5 tahun',
      'uptime rata-rata: 99%',
      'insiden terbuka : 0',
      'fail2ban aktif  : 1.847 IP diblokir',
    ],
    en: [
      'system active for 5 years',
      'average uptime  : 99%',
      'open incidents  : 0',
      'fail2ban active : 1,847 IPs blocked',
    ],
  },
  sudo: {
    id: ['Maaf, kamu tidak ada di daftar sudoers. Kejadian ini dilaporkan.'],
    en: ['Sorry, you are not in the sudoers file. This incident will be reported.'],
  },
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
    { id: 'pipeline', label: { id: 'Alur Kerja', en: 'Workflow' } },
    { id: 'status', label: { id: 'Status', en: 'Status' } },
    { id: 'arsitektur', label: { id: 'Arsitektur', en: 'Architecture' } },
    { id: 'stack', label: { id: 'Stack', en: 'Stack' } },
    { id: 'projects', label: { id: 'Project', en: 'Projects' } },
    { id: 'pengalaman', label: { id: 'Pengalaman', en: 'Experience' } },
    { id: 'kontak', label: { id: 'Kontak', en: 'Contact' } },
  ],
  hero: {
    ctaUtama: { id: 'Lihat project', en: 'View projects' },
    ctaKedua: { id: 'Salin email', en: 'Copy email' },
    tersalin: { id: 'Email tersalin', en: 'Email copied' },
    unduhCv: { id: 'Unduh CV', en: 'Download CV' },
  },
  pipelineJudul: { id: 'Cara saya menjaga sistem tetap hidup', en: 'How I keep systems alive' },
  pipelineDeskripsi: {
    id: 'Klik tiap tahap untuk melihat apa yang sebenarnya saya kerjakan sehari-hari — atau tekan Jalankan untuk melihat semuanya berurutan.',
    en: 'Click any stage to see what I actually do day to day — or press Run to watch the whole sequence.',
  },
  statusJudul: { id: 'Riwayat uptime & insiden', en: 'Uptime & incident history' },
  statusDeskripsi: {
    id: 'Angka uptime mudah diklaim. Ini kejadian nyatanya: apa yang rusak, kenapa, dan apa yang saya ubah supaya tidak terulang. Arahkan kursor ke batang berwarna untuk detailnya.',
    en: 'Uptime numbers are easy to claim. Here is what actually happened: what broke, why, and what I changed so it would not repeat. Hover any coloured bar for details.',
  },
  stackJudul: { id: 'Alat yang saya pakai di lapangan', en: 'Tools I use in the field' },
  stackDeskripsi: {
    id: 'Disaring per kategori. Semua sudah teruji di production — bukan cuma lab. Klik satu ikon untuk melihat project yang memakainya.',
    en: 'Filtered by category. All battle-tested in production, not just in a lab. Click an icon to see the projects that use it.',
  },
  projectsJudul: { id: 'Yang sudah saya kerjakan', en: 'What I have built' },
  projectsDeskripsi: { id: 'Pilih satu untuk membuka detail dan hasilnya.', en: 'Pick one to open the details and outcomes.' },
  pengalamanJudul: { id: 'Jejak pekerjaan', en: 'Work history' },
  kontakJudul: { id: 'Mari bicara', en: "Let's talk" },
  kontakDeskripsi: {
    id: 'Balasan biasanya di bawah 24 jam. Atau coba terminal di samping — ketik "help".',
    en: 'I usually reply within 24 hours. Or try the terminal beside this — type "help".',
  },
  footer: {
    id: 'Dibangun dengan React dan Vite. Di-deploy otomatis lewat GitHub Actions.',
    en: 'Built with React and Vite. Deployed automatically via GitHub Actions.',
  },

  /* Label kecil yang dipakai di banyak tempat */
  label: {
    semua: { id: 'Semua', en: 'All' },
    lewati: { id: 'Lewati ke konten', en: 'Skip to content' },
    layananNormal: { id: 'semua layanan normal', en: 'all systems normal' },
    menu: { id: 'Menu', en: 'Menu' },
    tutup: { id: 'Tutup', en: 'Close' },
    cariPerintah: { id: 'Cari halaman atau perintah…', en: 'Search pages or commands…' },
    buka: { id: 'Buka', en: 'Go to' },
    tindakan: { id: 'Tindakan', en: 'Actions' },
    temaTerang: { id: 'Tema terang', en: 'Light theme' },
    temaGelap: { id: 'Tema gelap', en: 'Dark theme' },
    salinEmail: { id: 'Salin email', en: 'Copy email' },
    cetakCv: { id: 'Cetak / simpan PDF', en: 'Print / save as PDF' },
    gantiBahasa: { id: 'Switch to English', en: 'Ganti ke Bahasa Indonesia' },
    jalankan: { id: 'Jalankan', en: 'Run' },
    hentikan: { id: 'Hentikan', en: 'Stop' },
    ulangi: { id: 'Ulangi', en: 'Replay' },
    berjalan: { id: 'berjalan', en: 'running' },
    selesai: { id: 'selesai', en: 'done' },
    hasil: { id: 'hasil', en: 'outcomes' },
    stack: { id: 'stack', en: 'stack' },
    lihatKode: { id: 'Lihat kode', en: 'View code' },
    bukaDemo: { id: 'Buka demo', en: 'Open demo' },
    sertifikasi: { id: 'Sertifikasi', en: 'Certifications' },
    hariTerakhir: { id: '90 hari terakhir', en: 'last 90 days' },
    hariIni: { id: 'hari ini', en: 'today' },
    peran: { id: 'Peran', en: 'Role' },
    spesifikasi: { id: 'Spesifikasi', en: 'Specs' },
    kenapa: { id: 'Kenapa begitu', en: 'Why it is built this way' },
    pilihNode: { id: 'Pilih salah satu node di diagram untuk melihat detailnya.', en: 'Select a node in the diagram to see its details.' },
    dipakaiDi: { id: 'dipakai di', en: 'used in' },
    project: { id: 'project', en: 'projects' },
    kosongProject: { id: 'Belum ada project dengan tag ini. Pilih tag lain.', en: 'No projects with this tag yet. Try another one.' },
    resetFilter: { id: 'Tampilkan semua', en: 'Show all' },
    difilterDari: { id: 'Difilter dari stack', en: 'Filtered from stack' },
    hintTerminal: {
      id: 'Tab untuk melengkapi perintah · panah atas untuk mengulang · "clear" untuk mengosongkan layar',
      en: 'Tab to autocomplete · up arrow for history · "clear" to wipe the screen',
    },
    konsolJudul: { id: 'konsol — coba ketik sesuatu', en: 'console — try typing something' },
    uptimeKarier: { id: 'uptime', en: 'uptime' },
  },
}
